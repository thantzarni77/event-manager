<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\GoogleLoginController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'auth:sanctum'], function () {

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    //user logout
    Route::get('/user/destroy', [AuthController::class, 'logout']);

});

//google login
Route::get('auth', [GoogleLoginController::class, 'redirect']);
Route::get('auth/callback', [GoogleLoginController::class, 'callback']);

Route::post('signup', [AuthController::class, 'signup']);
Route::post('login', [AuthController::class, 'login']);
