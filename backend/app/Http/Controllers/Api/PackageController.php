<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TravelPackage;

class PackageController extends Controller
{
    public function index()
    {
        return TravelPackage::with('agency')
            ->where('status', 'published')
            ->orderBy('id')
            ->paginate(12);
    }

    public function show(TravelPackage $package)
    {
        abort_unless($package->status === 'published', 404);

        return $package->load('agency');
    }
}
