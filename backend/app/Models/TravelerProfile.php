<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TravelerProfile extends Model
{
    protected $fillable = [
        'user_id',
        'avatar_url',
        'country',
        'city',
        'preferred_language',
        'preferences',
    ];

    protected function casts(): array
    {
        return [
            'preferences' => 'array',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
