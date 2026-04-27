<?php

use App\Http\Controllers\Api\ContactController;
use Illuminate\Support\Facades\Route;

Route::post('/contact', [COntactController::class, 'store'])
    ->middleware('throttle:10,1');