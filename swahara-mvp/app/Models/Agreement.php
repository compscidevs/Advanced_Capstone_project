<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Agreement extends Model
{
    use HasFactory;

    protected $fillable = [
        'party_a_phone',
        'party_b_phone',
        'extracted_terms', // JSON string
        'status',
    ];

    // Cast extracted_terms as array for easy access
    protected $casts = [
        'extracted_terms' => 'array',
    ];
}