<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Agency extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'slug',
        'description',
        'city',
        'country',
        'phone',
        'email',
        'logo_url',
        'status',
        'rating',
    ];

    protected function casts(): array
    {
        return [
            'rating' => 'decimal:2',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function packages()
    {
        return $this->hasMany(TravelPackage::class);
    }
}
