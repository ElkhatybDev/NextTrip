<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\ManagementController;
use App\Http\Controllers\Api\NewsletterController;
use App\Http\Controllers\Api\PackageController;
use App\Http\Controllers\Api\TripRequestController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('/signup', [AuthController::class, 'signup']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/social', [AuthController::class, 'social']);

    Route::middleware('api.token')->group(function () {
        Route::get('/me', [AuthController::class, 'me']);
        Route::post('/logout', [AuthController::class, 'logout']);
    });
});

Route::get('/packages', [PackageController::class, 'index']);
Route::get('/packages/{package}', [PackageController::class, 'show']);
Route::post('/newsletter', [NewsletterController::class, 'store']);

Route::middleware('api.token')->group(function () {
    Route::apiResource('bookings', BookingController::class)->only(['index', 'store', 'show']);
    Route::apiResource('trip-requests', TripRequestController::class)->only(['index', 'store', 'show']);
    Route::post('/trip-requests/{tripRequest}/offers', [TripRequestController::class, 'storeOffer']);

    Route::get('/dashboards/traveler', [DashboardController::class, 'traveler']);
    Route::get('/dashboards/agency', [DashboardController::class, 'agency']);
    Route::get('/dashboards/admin', [DashboardController::class, 'admin']);

    Route::patch('/profile', [ManagementController::class, 'updateProfile']);
    Route::patch('/agency/profile', [ManagementController::class, 'updateAgencyProfile']);
    Route::post('/agency/packages', [ManagementController::class, 'storePackage']);
    Route::patch('/packages/{package}', [ManagementController::class, 'updatePackage']);
    Route::delete('/packages/{package}', [ManagementController::class, 'deletePackage']);
    Route::patch('/bookings/{booking}/status', [ManagementController::class, 'updateBookingStatus']);
    Route::patch('/trip-requests/{tripRequest}/status', [ManagementController::class, 'updateTripRequestStatus']);
    Route::patch('/trip-offers/{offer}/status', [ManagementController::class, 'updateOfferStatus']);
    Route::patch('/admin/users/{user}/status', [ManagementController::class, 'updateUserStatus']);
    Route::patch('/admin/agencies/{agency}/status', [ManagementController::class, 'updateAgencyStatus']);
    Route::get('/receipts/{receipt}/download', [ManagementController::class, 'downloadReceipt']);
});
