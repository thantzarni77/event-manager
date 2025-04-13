<?php
namespace App\Interfaces;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use Illuminate\Http\Request;

interface AuthRepositoryInterface
{
    public function signup(SignupRequest $request);
    public function login(LoginRequest $request);
    public function logout(Request $request);
}
