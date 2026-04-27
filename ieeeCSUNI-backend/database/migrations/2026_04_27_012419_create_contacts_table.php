<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('contacts', function (Blueprint $table) {
            $table->id();
            $table->enum('tipo', ['miembro', 'evento', 'mentor']);
            $table->string('nombre');
            $table->string('email');
            $table->text('mensaje')->nullable();
            // Miembro
            $table->string('carrera')->nullable();
            $table->string('ciclo')->nullable();
            // Evento
            $table->string('tipo_evento')->nullable();
            $table->date('fecha_probable')->nullable();
            // Mentor
            $table->string('area_experiencia')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contacts');
    }
};
