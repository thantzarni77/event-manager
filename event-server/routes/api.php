<?php

use App\Http\Controllers\SocialLoginController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('auth', [SocialLoginController::class, 'redirect']);
Route::get('auth/callback', [SocialLoginController::class, 'callback']);
