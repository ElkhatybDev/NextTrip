<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Agency;
use App\Models\TripOffer;
use App\Models\TripRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TripRequestController extends Controller
{
    public function index(Request $request)
    {
        $query = TripRequest::with('offers');

        if ($request->user()->role === 'traveler') {
            $query->where('user_id', $request->user()->id);
        }

        return $query->latest()->paginate(12);
    }

    public function store(Request $request)
    {
        abort_unless($request->user()->role === 'traveler', 403);

        $data = $request->validate([
            'destination' => ['required', 'string', 'max:255'],
            'start_date' => ['nullable', 'date', 'required_with:end_date'],
            'end_date' => ['nullable', 'date', 'after_or_equal:start_date'],
            'travelers_count' => ['required', 'integer', 'min:1'],
            'budget' => ['nullable', 'numeric', 'min:0'],
            'currency' => ['nullable', 'string', 'size:3'],
            'preferences' => ['nullable', 'array'],
            'notes' => ['nullable', 'string'],
        ]);

        $tripRequest = TripRequest::create([
            ...$data,
            'user_id' => $request->user()->id,
            'request_reference' => 'NTRQ-'.now()->format('Ymd').'-'.Str::upper(Str::random(6)),
            'currency' => $data['currency'] ?? 'MAD',
        ]);

        return response()->json($tripRequest->load('offers'), 201);
    }

    public function show(Request $request, TripRequest $tripRequest)
    {
        abort_unless(
            $tripRequest->user_id === $request->user()->id || in_array($request->user()->role, ['agency', 'admin'], true),
            403
        );

        return $tripRequest->load('offers');
    }

    public function storeOffer(Request $request, TripRequest $tripRequest)
    {
        abort_unless(in_array($request->user()->role, ['agency', 'admin'], true), 403);
        abort_unless($tripRequest->status === 'open', 422, 'This trip request is not open for offers.');

        $data = $request->validate([
            'agency_id' => ['nullable', 'exists:agencies,id'],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'price' => ['required', 'numeric', 'min:0'],
            'currency' => ['nullable', 'string', 'size:3'],
            'expires_at' => ['nullable', 'date'],
            'details' => ['nullable', 'array'],
        ]);

        $agencyId = $request->user()->role === 'admin'
            ? ($data['agency_id'] ?? null)
            : Agency::where('user_id', $request->user()->id)->value('id');

        abort_unless($agencyId, 422, 'An agency profile is required to send an offer.');

        $offer = TripOffer::create([
            ...$data,
            'trip_request_id' => $tripRequest->id,
            'agency_id' => $agencyId,
            'currency' => $data['currency'] ?? 'MAD',
        ]);

        return response()->json($offer, 201);
    }
}
