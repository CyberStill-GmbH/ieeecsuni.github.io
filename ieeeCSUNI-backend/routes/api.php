<?php

use App\Http\Controllers\Api\ContactController;
use Illuminate\Support\Facades\Route;

Route::post('/contact', [ContactController::class, 'store'])
    ->middleware('throttle:10,1');

Route::options('/{any}', function () {
    return response()->json([], 200);
})->where('any', '.*');