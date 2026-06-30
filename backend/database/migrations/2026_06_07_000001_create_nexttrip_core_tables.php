<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('api_tokens', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('name')->default('api');
            $table->string('token', 64)->unique();
            $table->timestamp('last_used_at')->nullable();
            $table->timestamp('expires_at')->nullable();
            $table->timestamps();
        });

        Schema::create('traveler_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained()->cascadeOnDelete();
            $table->string('avatar_url')->nullable();
            $table->string('country')->nullable();
            $table->string('city')->nullable();
            $table->string('preferred_language')->default('fra');
            $table->json('preferences')->nullable();
            $table->timestamps();
        });

        Schema::create('agencies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('city')->nullable();
            $table->string('country')->nullable();
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->string('logo_url')->nullable();
            $table->string('status')->default('pending');
            $table->decimal('rating', 3, 2)->default(0);
            $table->timestamps();
        });

        Schema::create('travel_packages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('agency_id')->nullable()->constrained()->nullOnDelete();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('destination');
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2);
            $table->string('currency', 3)->default('MAD');
            $table->unsignedInteger('duration_days')->default(1);
            $table->unsignedInteger('capacity')->nullable();
            $table->date('starts_at')->nullable();
            $table->date('ends_at')->nullable();
            $table->string('image_url')->nullable();
            $table->string('status')->default('draft');
            $table->json('metadata')->nullable();
            $table->timestamps();
        });

        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('travel_package_id')->nullable()->constrained()->nullOnDelete();
            $table->string('booking_reference')->unique();
            $table->string('status')->default('pending');
            $table->unsignedInteger('guests_count')->default(1);
            $table->decimal('total_amount', 10, 2)->default(0);
            $table->string('currency', 3)->default('MAD');
            $table->json('traveler_details')->nullable();
            $table->timestamp('confirmed_at')->nullable();
            $table->timestamps();
        });

        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('booking_id')->constrained()->cascadeOnDelete();
            $table->string('provider')->default('manual');
            $table->string('provider_reference')->nullable();
            $table->string('status')->default('pending');
            $table->decimal('amount', 10, 2)->default(0);
            $table->string('currency', 3)->default('MAD');
            $table->timestamp('paid_at')->nullable();
            $table->json('metadata')->nullable();
            $table->timestamps();
        });

        Schema::create('receipts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('booking_id')->constrained()->cascadeOnDelete();
            $table->string('receipt_number')->unique();
            $table->timestamp('issued_at')->nullable();
            $table->decimal('subtotal', 10, 2)->default(0);
            $table->decimal('tax', 10, 2)->default(0);
            $table->decimal('total', 10, 2)->default(0);
            $table->string('currency', 3)->default('MAD');
            $table->json('billing_details')->nullable();
            $table->timestamps();
        });

        Schema::create('trip_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('request_reference')->unique();
            $table->string('destination');
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->unsignedInteger('travelers_count')->default(1);
            $table->decimal('budget', 10, 2)->nullable();
            $table->string('currency', 3)->default('MAD');
            $table->string('status')->default('open');
            $table->json('preferences')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        Schema::create('trip_offers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('trip_request_id')->constrained()->cascadeOnDelete();
            $table->foreignId('agency_id')->nullable()->constrained()->nullOnDelete();
            $table->string('title');
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2)->default(0);
            $table->string('currency', 3)->default('MAD');
            $table->string('status')->default('sent');
            $table->timestamp('expires_at')->nullable();
            $table->json('details')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('trip_offers');
        Schema::dropIfExists('trip_requests');
        Schema::dropIfExists('receipts');
        Schema::dropIfExists('payments');
        Schema::dropIfExists('bookings');
        Schema::dropIfExists('travel_packages');
        Schema::dropIfExists('agencies');
        Schema::dropIfExists('traveler_profiles');
        Schema::dropIfExists('api_tokens');
    }
};
