<?php

namespace Database\Seeders;

use App\Models\Agency;
use App\Models\TravelPackage;
use App\Models\TravelerProfile;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $admin = User::firstOrCreate(
            ['email' => 'admin@nexttrip.local'],
            [
                'name' => 'NextTrip Admin',
                'password' => 'password',
                'role' => 'admin',
                'status' => 'active',
            ]
        );

        $agencyUser = User::firstOrCreate(
            ['email' => 'agency@nexttrip.local'],
            [
                'name' => 'Atlas Voyages',
                'password' => 'password',
                'role' => 'agency',
                'status' => 'active',
            ]
        );

        $traveler = User::firstOrCreate(
            ['email' => 'traveler@nexttrip.local'],
            [
                'name' => 'Demo Traveler',
                'password' => 'password',
                'role' => 'traveler',
                'status' => 'active',
            ]
        );

        TravelerProfile::firstOrCreate(['user_id' => $traveler->id]);

        $agency = Agency::firstOrCreate(
            ['slug' => 'atlas-voyages'],
            [
                'user_id' => $agencyUser->id,
                'name' => 'Atlas Voyages',
                'description' => 'Curated Morocco and international trips for NextTrip travelers.',
                'city' => 'Casablanca',
                'country' => 'Morocco',
                'email' => 'agency@nexttrip.local',
                'status' => 'approved',
                'rating' => 4.8,
            ]
        );

        $packages = [
            [
                'slug' => 'marrakech-desert-escape',
                'title' => 'Marrakech Desert Escape',
                'destination' => 'Marrakech, Morocco',
                'description' => 'A compact city and desert experience with riads, food, and guided excursions.',
                'price' => 2490,
                'duration_days' => 4,
                'capacity' => 18,
                'image_url' => 'https://images.pexels.com/photos/32013475/pexels-photo-32013475.jpeg?auto=compress&cs=tinysrgb&w=1200',
                'metadata' => ['category' => 'Culture', 'dealTag' => 'Morocco Deal', 'difficulty' => 'Easy'],
            ],
            [
                'slug' => 'atlas-adventure-circuit',
                'title' => 'Atlas Adventure Circuit',
                'destination' => 'High Atlas, Morocco',
                'description' => 'Mountain villages, scenic valleys, light trekking, and active outdoor days.',
                'price' => 7600,
                'duration_days' => 5,
                'capacity' => 10,
                'image_url' => 'https://images.pexels.com/photos/34100469/pexels-photo-34100469.jpeg?auto=compress&cs=tinysrgb&w=1200',
                'metadata' => ['category' => 'Adventure', 'dealTag' => 'Adventure Pick', 'difficulty' => 'Moderate'],
            ],
            [
                'slug' => 'bali-wellness-retreat',
                'title' => 'Bali Wellness Retreat',
                'destination' => 'Ubud, Bali',
                'description' => 'Tropical greenery, peaceful villas, spa moments, and serene island energy.',
                'price' => 8600,
                'duration_days' => 6,
                'capacity' => 4,
                'image_url' => 'https://images.pexels.com/photos/2412711/pexels-photo-2412711.jpeg?auto=compress&cs=tinysrgb&w=1200',
                'metadata' => ['category' => 'Relax', 'dealTag' => 'Wellness Deal', 'difficulty' => 'Easy'],
            ],
        ];

        foreach ($packages as $package) {
            TravelPackage::firstOrCreate(
                ['slug' => $package['slug']],
                [
                    'agency_id' => $agency->id,
                    'title' => $package['title'],
                    'destination' => $package['destination'],
                    'description' => $package['description'],
                    'price' => $package['price'],
                    'currency' => 'MAD',
                    'duration_days' => $package['duration_days'],
                    'capacity' => $package['capacity'],
                    'starts_at' => now()->addMonth()->toDateString(),
                    'ends_at' => now()->addMonth()->addDays($package['duration_days'])->toDateString(),
                    'image_url' => $package['image_url'],
                    'status' => 'published',
                    'metadata' => [
                        ...$package['metadata'],
                        'details' => $package['description'],
                        'groupSize' => '1-'.$package['capacity'].' travelers',
                        'highlights' => [
                            'Agency-supported itinerary.',
                            'Clear NextTrip booking flow.',
                            'Flexible traveler details and support.',
                        ],
                        'includes' => ['Agency support', 'Trip planning', 'Booking confirmation'],
                        'itinerary' => [
                            ['title' => 'Day 1', 'text' => 'Arrival and first trip moments.'],
                            ['title' => 'Day 2', 'text' => 'Main experience and local discovery.'],
                        ],
                        'notIncluded' => ['Flights', 'Personal expenses'],
                        'availableAddOns' => ['Private transfer', 'Local guide'],
                        'requirements' => ['Valid travel documents'],
                        'reference' => Str::upper(Str::random(8)),
                    ],
                ]
            );
        }

        $admin->touch();
    }
}
