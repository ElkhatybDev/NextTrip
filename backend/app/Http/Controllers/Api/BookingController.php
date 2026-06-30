<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Payment;
use App\Models\Receipt;
use App\Models\TravelPackage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class BookingController extends Controller
{
    public function index(Request $request)
    {
        return Booking::with(['package.agency', 'payment', 'receipt'])
            ->where('user_id', $request->user()->id)
            ->latest()
            ->paginate(12);
    }

    public function store(Request $request)
    {
        abort_unless(in_array($request->user()->role, ['traveler', 'admin'], true), 403);

        $data = $request->validate([
            'travel_package_id' => ['required', 'exists:travel_packages,id'],
            'guests_count' => ['required', 'integer', 'min:1'],
            'traveler_details' => ['nullable', 'array'],
            'payment_provider' => ['nullable', 'string', 'max:80'],
        ]);

        $package = TravelPackage::findOrFail($data['travel_package_id']);
        abort_unless($package->status === 'published' || $request->user()->role === 'admin', 422, 'This package is not available for booking.');

        if ($package->capacity !== null) {
            $reservedGuests = Booking::where('travel_package_id', $package->id)
                ->whereIn('status', ['pending', 'confirmed'])
                ->sum('guests_count');

            abort_if($reservedGuests + $data['guests_count'] > $package->capacity, 422, 'This package does not have enough remaining places.');
        }

        $total = $package->price * $data['guests_count'];

        $booking = DB::transaction(function () use ($request, $package, $data, $total) {
            $booking = Booking::create([
                'user_id' => $request->user()->id,
                'travel_package_id' => $package->id,
                'booking_reference' => 'NTB-'.now()->format('Ymd').'-'.Str::upper(Str::random(6)),
                'status' => 'confirmed',
                'guests_count' => $data['guests_count'],
                'total_amount' => $total,
                'currency' => $package->currency,
                'traveler_details' => $data['traveler_details'] ?? null,
                'confirmed_at' => now(),
            ]);

            Payment::create([
                'booking_id' => $booking->id,
                'provider' => $data['payment_provider'] ?? 'manual',
                'status' => 'confirmed',
                'amount' => $total,
                'currency' => $package->currency,
                'paid_at' => now(),
            ]);

            Receipt::create([
                'booking_id' => $booking->id,
                'receipt_number' => 'NTR-'.now()->format('Ymd').'-'.Str::upper(Str::random(6)),
                'issued_at' => now(),
                'subtotal' => $total,
                'tax' => 0,
                'total' => $total,
                'currency' => $package->currency,
            ]);

            return $booking;
        });

        return response()->json($booking->load(['package.agency', 'payment', 'receipt']), 201);
    }

    public function show(Request $request, Booking $booking)
    {
        abort_unless($booking->user_id === $request->user()->id || $request->user()->role === 'admin', 403);

        return $booking->load(['package.agency', 'payment', 'receipt']);
    }
}
