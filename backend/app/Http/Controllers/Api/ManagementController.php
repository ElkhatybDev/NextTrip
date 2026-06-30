<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Agency;
use App\Models\Booking;
use App\Models\Receipt;
use App\Models\TravelPackage;
use App\Models\TravelerProfile;
use App\Models\TripOffer;
use App\Models\TripRequest;
use App\Models\User;
use Illuminate\Support\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class ManagementController extends Controller
{
    public function updateProfile(Request $request)
    {
        $user = $request->user();
        $data = $request->validate([
            'name' => ['sometimes', 'string', 'max:255'],
            'email' => ['sometimes', 'email', 'max:255', Rule::unique('users', 'email')->ignore($user->id)],
            'phone' => ['sometimes', 'nullable', 'string', 'max:40'],
            'avatar_url' => ['sometimes', 'nullable', 'string'],
            'city' => ['sometimes', 'nullable', 'string', 'max:120'],
            'country' => ['sometimes', 'nullable', 'string', 'max:120'],
            'preferred_language' => ['sometimes', 'nullable', 'string', 'max:20'],
            'preferences' => ['sometimes', 'nullable', 'array'],
        ]);

        $user->fill(collect($data)->only(['name', 'email', 'phone', 'avatar_url'])->all())->save();

        if ($user->role === 'traveler') {
            TravelerProfile::updateOrCreate(
                ['user_id' => $user->id],
                collect($data)->only(['city', 'country', 'preferred_language', 'preferences'])->all()
            );
        }

        if ($user->role === 'agency') {
            Agency::where('user_id', $user->id)->update(
                collect($data)->only(['phone', 'city', 'country'])->all()
            );
        }

        return response()->json(['user' => $user->loadMissing(['agency', 'travelerProfile'])]);
    }

    public function updateAgencyProfile(Request $request)
    {
        abort_unless(in_array($request->user()->role, ['agency', 'admin'], true), 403);

        $agency = Agency::where('user_id', $request->user()->id)->firstOrFail();
        $data = $request->validate([
            'name' => ['sometimes', 'string', 'max:255'],
            'description' => ['sometimes', 'nullable', 'string'],
            'city' => ['sometimes', 'nullable', 'string', 'max:120'],
            'country' => ['sometimes', 'nullable', 'string', 'max:120'],
            'phone' => ['sometimes', 'nullable', 'string', 'max:40'],
            'email' => ['sometimes', 'nullable', 'email', 'max:255'],
        ]);

        if (isset($data['name'])) {
            $data['slug'] = Str::slug($data['name']).'-'.$agency->id;
        }

        $agency->fill($data)->save();

        return response()->json(['agency' => $agency->fresh()]);
    }

    public function storePackage(Request $request)
    {
        abort_unless(in_array($request->user()->role, ['agency', 'admin'], true), 403);

        $agency = Agency::where('user_id', $request->user()->id)->first();
        $data = $request->validate([
            'agency_id' => ['sometimes', 'nullable', 'exists:agencies,id'],
            'title' => ['required', 'string', 'max:255'],
            'destination' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'price' => ['required', 'numeric', 'min:0'],
            'currency' => ['nullable', 'string', 'size:3'],
            'duration_days' => ['nullable', 'integer', 'min:1'],
            'capacity' => ['nullable', 'integer', 'min:1'],
            'starts_at' => ['nullable', 'date', 'required_with:ends_at'],
            'ends_at' => ['nullable', 'date', 'after_or_equal:starts_at'],
            'image_url' => ['nullable', 'string', 'max:2048'],
            'status' => ['nullable', Rule::in(['draft', 'published', 'hidden'])],
            'metadata' => ['nullable', 'array'],
        ]);

        $agencyId = $request->user()->role === 'admin'
            ? ($data['agency_id'] ?? $agency?->id)
            : $agency?->id;

        abort_unless($agencyId, 422, 'An agency profile is required to create a package.');

        $package = TravelPackage::create([
            ...$data,
            'agency_id' => $agencyId,
            'slug' => Str::slug($data['title']).'-'.Str::lower(Str::random(6)),
            'currency' => $data['currency'] ?? 'MAD',
            'duration_days' => $data['duration_days'] ?? 1,
            'status' => $data['status'] ?? 'published',
        ]);

        return response()->json($package->load('agency'), 201);
    }

    public function updatePackage(Request $request, TravelPackage $package)
    {
        $this->authorizePackageOwner($request, $package);

        $data = $request->validate([
            'title' => ['sometimes', 'string', 'max:255'],
            'destination' => ['sometimes', 'string', 'max:255'],
            'description' => ['sometimes', 'nullable', 'string'],
            'price' => ['sometimes', 'numeric', 'min:0'],
            'currency' => ['sometimes', 'string', 'size:3'],
            'duration_days' => ['sometimes', 'integer', 'min:1'],
            'capacity' => ['sometimes', 'nullable', 'integer', 'min:1'],
            'starts_at' => ['sometimes', 'nullable', 'date'],
            'ends_at' => ['sometimes', 'nullable', 'date'],
            'image_url' => ['sometimes', 'nullable', 'string', 'max:2048'],
            'status' => ['sometimes', Rule::in(['draft', 'published', 'hidden'])],
            'metadata' => ['sometimes', 'nullable', 'array'],
        ]);

        if (isset($data['title'])) {
            $data['slug'] = Str::slug($data['title']).'-'.$package->id;
        }

        $startsAt = array_key_exists('starts_at', $data) ? $data['starts_at'] : $package->starts_at;
        $endsAt = array_key_exists('ends_at', $data) ? $data['ends_at'] : $package->ends_at;

        abort_if(
            $startsAt && $endsAt && Carbon::parse($endsAt)->lt(Carbon::parse($startsAt)),
            422,
            'Package end date must be after or equal to start date.'
        );

        $package->fill($data)->save();

        return response()->json($package->load('agency'));
    }

    public function deletePackage(Request $request, TravelPackage $package)
    {
        $this->authorizePackageOwner($request, $package);
        $package->delete();

        return response()->json(['message' => 'Package deleted.']);
    }

    public function updateBookingStatus(Request $request, Booking $booking)
    {
        $data = $request->validate([
            'status' => ['required', Rule::in(['pending', 'confirmed', 'cancelled', 'completed'])],
        ]);

        $user = $request->user();
        $isOwner = $booking->user_id === $user->id;
        $isAgency = $user->role === 'agency' && Agency::where('user_id', $user->id)
            ->whereHas('packages', fn ($query) => $query->where('id', $booking->travel_package_id))
            ->exists();

        abort_unless($user->role === 'admin' || $isOwner || $isAgency, 403);

        $booking->status = $data['status'];
        $booking->save();

        return response()->json($booking->load(['user', 'package.agency', 'payment', 'receipt']));
    }

    public function updateTripRequestStatus(Request $request, TripRequest $tripRequest)
    {
        $data = $request->validate([
            'status' => ['required', Rule::in(['open', 'cancelled', 'confirmed', 'offer_selected', 'refused'])],
        ]);

        $user = $request->user();
        abort_unless($user->role === 'admin' || $user->role === 'agency' || $tripRequest->user_id === $user->id, 403);

        $tripRequest->status = $data['status'];
        $tripRequest->save();

        return response()->json($tripRequest->load(['offers.agency', 'user']));
    }

    public function updateOfferStatus(Request $request, TripOffer $offer)
    {
        $data = $request->validate([
            'status' => ['required', Rule::in(['sent', 'selected', 'refused', 'cancelled'])],
        ]);

        $user = $request->user();
        $requestOwner = $offer->tripRequest?->user_id === $user->id;
        $agencyOwner = $user->role === 'agency' && Agency::where('user_id', $user->id)->where('id', $offer->agency_id)->exists();

        abort_unless($user->role === 'admin' || $requestOwner || $agencyOwner, 403);

        $offer->status = $data['status'];
        $offer->save();

        if ($data['status'] === 'selected') {
            $offer->tripRequest?->forceFill(['status' => 'offer_selected'])->save();
            TripOffer::where('trip_request_id', $offer->trip_request_id)
                ->where('id', '!=', $offer->id)
                ->where('status', 'sent')
                ->update(['status' => 'refused']);
        }

        return response()->json($offer->load(['agency', 'tripRequest']));
    }

    public function updateUserStatus(Request $request, User $user)
    {
        abort_unless($request->user()->role === 'admin', 403);

        $data = $request->validate([
            'status' => ['required', Rule::in(['active', 'blocked'])],
        ]);

        $user->status = $data['status'];
        $user->save();

        return response()->json($user->load(['agency', 'travelerProfile']));
    }

    public function updateAgencyStatus(Request $request, Agency $agency)
    {
        abort_unless($request->user()->role === 'admin', 403);

        $data = $request->validate([
            'status' => ['required', Rule::in(['pending', 'approved', 'suspended'])],
        ]);

        $agency->status = $data['status'];
        $agency->save();

        return response()->json($agency->load('user'));
    }

    public function downloadReceipt(Request $request, Receipt $receipt)
    {
        $receipt->load('booking.user', 'booking.package');
        $user = $request->user();
        $agencyOwnsBooking = $user->role === 'agency'
            && Agency::where('user_id', $user->id)
                ->whereHas('packages', fn ($query) => $query->where('id', $receipt->booking?->travel_package_id))
                ->exists();

        abort_unless($user->role === 'admin' || $receipt->booking?->user_id === $user->id || $agencyOwnsBooking, 403);

        return response()->json([
            'receipt' => $receipt,
            'text' => implode("\n", [
                'NEXTTRIP RECEIPT',
                'Receipt: '.$receipt->receipt_number,
                'Booking: '.$receipt->booking?->booking_reference,
                'Traveler: '.$receipt->booking?->user?->name,
                'Package: '.$receipt->booking?->package?->title,
                'Total: '.$receipt->total.' '.$receipt->currency,
                'Issued at: '.$receipt->issued_at,
            ]),
        ]);
    }

    private function authorizePackageOwner(Request $request, TravelPackage $package): void
    {
        if ($request->user()->role === 'admin') {
            return;
        }

        $agencyId = Agency::where('user_id', $request->user()->id)->value('id');
        abort_unless($request->user()->role === 'agency' && $agencyId && $package->agency_id === $agencyId, 403);
    }
}
