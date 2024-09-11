<?php

namespace App\Http\Controllers;

use App\Models\Scholarship;
use Illuminate\Http\Request;

class ScholarshipController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'amount' => 'required|numeric',
            'deadline' => 'required|date',
            'eligibility_criteria' => 'required|json',
            'details' => 'required|json',
            'provider' => 'required|string',
        ]);

        $scholarship = Scholarship::create($request->all());

        return response()->json($scholarship, 201);
    }
}
