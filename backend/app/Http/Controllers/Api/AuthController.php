<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Agency;
use App\Models\ApiToken;
use App\Models\TravelerProfile;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function signup(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'phone' => ['nullable', 'string', 'max:40'],
            'password' => ['required', 'string', 'min:8'],
            'role' => ['nullable', Rule::in(['traveler', 'agency'])],
            'agency_name' => ['required_if:role,agency', 'nullable', 'string', 'max:255'],
            'business_email' => ['required_if:role,agency', 'nullable', 'email', 'max:255'],
            'license_number' => ['nullable', 'string', 'max:120'],
        ]);

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'] ?? null,
            'password' => $data['password'],
            'role' => $data['role'] ?? 'traveler',
            'status' => ($data['role'] ?? 'traveler') === 'agency' ? 'pending' : 'active',
        ]);

        if ($user->role === 'traveler') {
            TravelerProfile::create(['user_id' => $user->id]);
        }

        if ($user->role === 'agency') {
            Agency::create([
                'user_id' => $user->id,
                'name' => $data['agency_name'] ?? $user->name,
                'slug' => Str::slug($data['agency_name'] ?? $user->name).'-'.$user->id,
                'email' => $data['business_email'] ?? $user->email,
                'phone' => $data['phone'] ?? null,
                'description' => isset($data['license_number'])
                    ? 'Registration/license: '.$data['license_number']
                    : null,
                'status' => 'pending',
            ]);
        }

        return response()->json($this->issueToken($user), 201);
    }

    public function login(Request $request)
    {
        $data = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $user = User::where('email', $data['email'])->first();

        if (! $user || ! Hash::check($data['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Invalid credentials.'],
            ]);
        }

        if ($user->status === 'blocked') {
            throw ValidationException::withMessages([
                'email' => ['This account is blocked.'],
            ]);
        }

        return response()->json($this->issueToken($user));
    }

    public function social(Request $request)
    {
        $data = $request->validate([
            'provider' => ['required', Rule::in(['google', 'facebook'])],
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'role' => ['nullable', Rule::in(['traveler', 'agency'])],
            'agency_name' => ['required_if:role,agency', 'nullable', 'string', 'max:255'],
            'business_email' => ['nullable', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:40'],
        ]);

        $role = $data['role'] ?? 'traveler';
        $user = User::where('email', $data['email'])->first();

        if (! $user) {
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'phone' => $data['phone'] ?? null,
                'password' => Str::random(48),
                'role' => $role,
                'status' => $role === 'agency' ? 'pending' : 'active',
            ]);

            if ($user->role === 'traveler') {
                TravelerProfile::create(['user_id' => $user->id]);
            }

            if ($user->role === 'agency') {
                Agency::create([
                    'user_id' => $user->id,
                    'name' => $data['agency_name'] ?? $user->name,
                    'slug' => Str::slug($data['agency_name'] ?? $user->name).'-'.$user->id,
                    'email' => $data['business_email'] ?? $user->email,
                    'phone' => $data['phone'] ?? null,
                    'description' => ucfirst($data['provider']).' social signup.',
                    'status' => 'pending',
                ]);
            }
        }

        if ($user->status === 'blocked') {
            throw ValidationException::withMessages([
                'email' => ['This account is blocked.'],
            ]);
        }

        return response()->json($this->issueToken($user));
    }

    public function me(Request $request)
    {
        return response()->json([
            'user' => $request->user()->loadMissing(['agency', 'travelerProfile']),
        ]);
    }

    public function logout(Request $request)
    {
        $request->attributes->get('api_token')?->delete();

        return response()->json(['message' => 'Logged out.']);
    }

    private function issueToken(User $user): array
    {
        $plainToken = bin2hex(random_bytes(32));

        ApiToken::create([
            'user_id' => $user->id,
            'name' => 'frontend',
            'token' => hash('sha256', $plainToken),
            'expires_at' => now()->addDays(30),
        ]);

        return [
            'token' => $plainToken,
            'token_type' => 'Bearer',
            'user' => $user->loadMissing(['agency', 'travelerProfile']),
        ];
    }
}
