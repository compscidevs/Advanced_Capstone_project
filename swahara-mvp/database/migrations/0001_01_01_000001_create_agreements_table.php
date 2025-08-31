<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('agreements', function (Blueprint $table) {
            $table->id();
            $table->string('party_a_phone');
            $table->string('party_b_phone');
            $table->json('extracted_terms')->nullable();
            $table->string('status')->default('pending');
            $table->timestamps();

            $table->foreign('party_a_phone')->references('phone_number')->on('users');
            $table->foreign('party_b_phone')->references('phone_number')->on('users');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('agreements');
    }
};