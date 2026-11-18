<?php

namespace Tests\Feature;

use App\Models\Agency;
use App\Models\ApiToken;
use App\Models\TripOffer;
use App\Models\TripRequest;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Tests\TestCase;

class AgencyDashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_agency_dashboard_includes_traveler_context_for_requests_and_offers(): void
    {
        $traveler = User::factory()->create([
            'name' => 'Demo Traveler',
            'email' => 'traveler@example.test',
            'role' => 'traveler',
            'status' => 'active',
        ]);
        $agencyUser = User::factory()->create([
            'role' => 'agency',
            'status' => 'active',
        ]);
        $agency = Agency::create([
            'user_id' => $agencyUser->id,
            'name' => 'Atlas Voyages',
            'slug' => 'atlas-voyages',
            'email' => 'agency@example.test',
            'status' => 'approved',
        ]);
        $tripRequest = TripRequest::create([
            'user_id' => $traveler->id,
            'request_reference' => 'NTRQ-20260717-ABC123',
            'destination' => 'Marrakech',
            'travelers_count' => 2,
            'currency' => 'MAD',
        ]);

        TripOffer::create([
            'trip_request_id' => $tripRequest->id,
            'agency_id' => $agency->id,
            'title' => 'Marrakech city break',
            'price' => 2500,
            'currency' => 'MAD',
        ]);

        $response = $this
            ->withToken($this->issueToken($agencyUser))
            ->getJson('/api/dashboards/agency');

        $response
            ->assertOk()
            ->assertJsonPath('trip_requests.0.user.email', 'traveler@example.test')
            ->assertJsonPath('offers.0.trip_request.user.email', 'traveler@example.test');
    }

    private function issueToken(User $user): string
    {
        $plainToken = Str::random(64);

        ApiToken::create([
            'user_id' => $user->id,
            'name' => 'test',
            'token' => hash('sha256', $plainToken),
            'expires_at' => now()->addDay(),
        ]);

        return $plainToken;
    }
}
