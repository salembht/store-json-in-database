<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Scholarship extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'description',
        'amount',
        'deadline',
        'details',
        'eligibility_criteria',
        'provider',
    ];

    protected $casts = [
        'eligibility_criteria' => 'array', 
        'details' => 'array', 
    ];
}
