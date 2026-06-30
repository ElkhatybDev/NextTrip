<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TripRequest extends Model
{
    protected $fillable = [
        'user_id',
        'request_reference',
        'destination',
        'start_date',
        'end_date',
        'travelers_count',
        'budget',
        'currency',
        'status',
        'preferences',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'start_date' => 'date',
            'end_date' => 'date',
            'budget' => 'decimal:2',
            'preferences' => 'array',
        ];
    }

    public function offers()
    {
        return $this->hasMany(TripOffer::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
