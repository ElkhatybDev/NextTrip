<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Receipt extends Model
{
    protected $fillable = [
        'booking_id',
        'receipt_number',
        'issued_at',
        'subtotal',
        'tax',
        'total',
        'currency',
        'billing_details',
    ];

    protected function casts(): array
    {
        return [
            'issued_at' => 'datetime',
            'subtotal' => 'decimal:2',
            'tax' => 'decimal:2',
            'total' => 'decimal:2',
            'billing_details' => 'array',
        ];
    }

    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }
}
