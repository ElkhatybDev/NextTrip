<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = [
        'user_id',
        'travel_package_id',
        'booking_reference',
        'status',
        'guests_count',
        'total_amount',
        'currency',
        'traveler_details',
        'confirmed_at',
    ];

    protected function casts(): array
    {
        return [
            'total_amount' => 'decimal:2',
            'traveler_details' => 'array',
            'confirmed_at' => 'datetime',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function package()
    {
        return $this->belongsTo(TravelPackage::class, 'travel_package_id');
    }

    public function payment()
    {
        return $this->hasOne(Payment::class);
    }

    public function receipt()
    {
        return $this->hasOne(Receipt::class);
    }
}
