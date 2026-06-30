<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Agency;
use App\Models\Booking;
use App\Models\Payment;
use App\Models\Receipt;
use App\Models\TravelPackage;
use App\Models\TripOffer;
use App\Models\TripRequest;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function traveler(Request $request)
    {
        return [
            'bookings_count' => Booking::where('user_id', $request->user()->id)->count(),
            'trip_requests_count' => TripRequest::where('user_id', $request->user()->id)->count(),
            'user' => $request->user()->loadMissing('travelerProfile'),
            'bookings' => Booking::with(['package.agency', 'payment', 'receipt'])
                ->where('user_id', $request->user()->id)
                ->latest()
                ->get(),
            'trip_requests' => TripRequest::with('offers.agency')
                ->where('user_id', $request->user()->id)
                ->latest()
                ->get(),
        ];
    }

    public function agency(Request $request)
    {
        abort_unless(in_array($request->user()->role, ['agency', 'admin'], true), 403);

        $agency = Agency::where('user_id', $request->user()->id)->first();

        if (! $agency && $request->user()->role !== 'admin') {
            return [
                'agency' => null,
                'packages_count' => 0,
                'open_trip_requests_count' => 0,
                'packages' => [],
                'bookings' => [],
                'trip_requests' => [],
                'offers' => [],
            ];
        }

        return [
            'agency' => $agency,
            'packages_count' => $agency ? TravelPackage::where('agency_id', $agency->id)->count() : 0,
            'open_trip_requests_count' => TripRequest::where('status', 'open')->count(),
            'packages' => $agency
                ? TravelPackage::with('agency')->where('agency_id', $agency->id)->latest()->get()
                : collect(),
            'bookings' => Booking::with(['user', 'package.agency', 'payment', 'receipt'])
                ->when($agency, function ($query) use ($agency) {
                    $query->whereHas('package', fn ($packageQuery) => $packageQuery->where('agency_id', $agency->id));
                })
                ->latest()
                ->get(),
            'trip_requests' => TripRequest::with('offers.agency')->latest()->get(),
            'offers' => TripOffer::with(['agency', 'tripRequest'])
                ->when($agency, fn ($query) => $query->where('agency_id', $agency->id))
                ->latest()
                ->get(),
        ];
    }

    public function admin(Request $request)
    {
        abort_unless($request->user()->role === 'admin', 403);

        return [
            'users_count' => User::count(),
            'agencies_count' => Agency::count(),
            'packages_count' => TravelPackage::count(),
            'bookings_count' => Booking::count(),
            'trip_requests_count' => TripRequest::count(),
            'users' => User::with(['agency', 'travelerProfile'])->latest()->get(),
            'agencies' => Agency::with('user')->latest()->get(),
            'packages' => TravelPackage::with('agency')->latest()->get(),
            'bookings' => Booking::with(['user', 'package.agency', 'payment', 'receipt'])->latest()->get(),
            'payments' => Payment::with('booking.package')->latest()->get(),
            'receipts' => Receipt::with('booking.package')->latest()->get(),
            'trip_requests' => TripRequest::with(['offers.agency', 'user'])->latest()->get(),
        ];
    }
}
