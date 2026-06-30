<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TravelPackage extends Model
{
    protected $fillable = [
        'agency_id',
        'title',
        'slug',
        'destination',
        'description',
        'price',
        'currency',
        'duration_days',
        'capacity',
        'starts_at',
        'ends_at',
        'image_url',
        'status',
        'metadata',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'starts_at' => 'date',
            'ends_at' => 'date',
            'metadata' => 'array',
        ];
    }

    public function agency()
    {
        return $this->belongsTo(Agency::class);
    }
}
