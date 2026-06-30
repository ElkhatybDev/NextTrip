<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\NewsletterSubscription;
use Illuminate\Http\Request;

class NewsletterController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'email' => ['required', 'email', 'max:255'],
            'source' => ['nullable', 'string', 'max:80'],
        ]);

        $subscription = NewsletterSubscription::firstOrCreate(
            ['email' => strtolower($data['email'])],
            ['source' => $data['source'] ?? 'site']
        );

        return response()->json([
            'message' => $subscription->wasRecentlyCreated
                ? 'Newsletter subscription created.'
                : 'Email already subscribed.',
            'subscription' => $subscription,
        ], $subscription->wasRecentlyCreated ? 201 : 200);
    }
}
