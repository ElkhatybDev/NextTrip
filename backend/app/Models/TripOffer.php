<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TripOffer extends Model
{
    protected $fillable = [
        'trip_request_id',
        'agency_id',
        'title',
        'description',
        'price',
        'currency',
        'status',
        'expires_at',
        'details',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'expires_at' => 'datetime',
            'details' => 'array',
        ];
    }

    public function agency()
    {
        return $this->belongsTo(Agency::class);
    }

    public function tripRequest()
    {
        return $this->belongsTo(TripRequest::class);
    }
}
