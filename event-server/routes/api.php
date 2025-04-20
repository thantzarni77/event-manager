<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\GoogleLoginController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'auth:sanctum'], function () {

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::group(['prefix' => "user"], function () {
        //user logout
        Route::get('/destroy', [AuthController::class, 'logout']);

        Route::middleware('superAdminMiddleware')->group(function () {
            //promote user
            Route::post('/role-change', [UserController::class, 'roleChange']);

        });

    });

    Route::group(['prefix' => "users"], function () {

        //get all users
        Route::get("/list", [UserController::class, 'list']);

        //search users
        Route::post("/list/search", [UserController::class, 'search']);

    });

});

//google login
Route::get('auth', [GoogleLoginController::class, 'redirect']);
Route::get('auth/callback', [GoogleLoginController::class, 'callback']);

Route::post('signup', [AuthController::class, 'signup']);
Route::post('login', [AuthController::class, 'login']);
