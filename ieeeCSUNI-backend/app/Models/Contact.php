<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $fillable = [
        'tipo', 'nombre', 'email', 'mensaje',
        'carrera', 'ciclo',
        'tipo_evento', 'fecha_probable',
        'area_experticia',
    ];
}
