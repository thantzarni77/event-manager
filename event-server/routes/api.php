<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\GoogleLoginController;
use App\Http\Controllers\OrgController;
use App\Http\Controllers\PaymentMethodController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'auth:sanctum'], function () {

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::group(['prefix' => "payment", 'middleware' => 'superAdminMiddleware'], function () {
        //get all payment methods
        Route::get('/list', [PaymentMethodController::class, 'listPayment']);

        //get all payment methods
        Route::get('/list/{id}', [PaymentMethodController::class, 'singlePaymentInfo']);

        //add payment methods
        Route::post('/add', [PaymentMethodController::class, 'addPayment']);

        //update payment methods
        Route::post('/update', [PaymentMethodController::class, 'updatePayment']);

        //delete payment
        Route::post('/delete', [PaymentMethodController::class, 'deletePayment']);

    });

    Route::group(['prefix' => "user"], function () {
        //user logout
        Route::get('/destroy', [AuthController::class, 'logout']);

    });

    Route::group(['prefix' => "user", 'middleware' => 'superAdminMiddleware'], function () {
        //promote user
        Route::post('/role-change', [UserController::class, 'roleChange']);

    });

    Route::group(['prefix' => "org", 'middleware' => 'superAdminMiddleware'], function () {
        //add org
        Route::post('/add', [OrgController::class, 'addOrg']);

    });

    Route::group(['prefix' => "users", 'middleware' => 'superAdminMiddleware'], function () {

        //get all users
        Route::get("/list", [UserController::class, 'list']);

        //search users
        Route::post("/list/search", [UserController::class, 'search']);

    }
    );

});

//google login
Route::get('auth', [GoogleLoginController::class, 'redirect']);
Route::get('auth/callback', [GoogleLoginController::class, 'callback']);

Route::post('signup', [AuthController::class, 'signup']);
Route::post('login', [AuthController::class, 'login']);
