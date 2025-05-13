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

    //payments
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

    //users
    Route::group(['prefix' => "users", 'middleware' => 'superAndAdminMiddleware'], function () {

        //get all users
        Route::get("/list", [UserController::class, 'list']);

        //search users
        Route::post("/list/search", [UserController::class, 'search']);

    }
    );

    //users/roleChange
    Route::group(['prefix' => "user", 'middleware' => 'superAndAdminMiddleware'], function () {
        //promote user
        Route::post('/role-change', [UserController::class, 'roleChange']);

    });

    //orgs
    Route::group(['prefix' => "org", 'middleware' => 'superAndAdminMiddleware'], function () {
        //list orgs
        Route::get('/list', [OrgController::class, 'listOrg']);

        //add org
        Route::post('/add', [OrgController::class, 'addOrg']);

    });

    //logout
    Route::group(['prefix' => "user"], function () {
        //user logout
        Route::get('/destroy', [AuthController::class, 'logout']);

    });

});

//google login
Route::get('auth', [GoogleLoginController::class, 'redirect']);
Route::get('auth/callback', [GoogleLoginController::class, 'callback']);

//login and singup
Route::post('signup', [AuthController::class, 'signup']);
Route::post('login', [AuthController::class, 'login']);
