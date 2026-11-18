<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_traveler_can_signup_and_receive_api_session(): void
    {
        $response = $this->postJson('/api/auth/signup', [
            'name' => 'NextTrip Traveler',
            'email' => 'traveler@example.test',
            'password' => 'password123',
            'role' => 'traveler',
        ]);

        $response
            ->assertCreated()
            ->assertJsonPath('user.email', 'traveler@example.test')
            ->assertJsonPath('user.role', 'traveler')
            ->assertJsonStructure(['token', 'token_type', 'user' => ['traveler_profile']]);
    }
}
