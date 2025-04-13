<?php
namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Interfaces\AuthRepositoryInterface;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    private AuthRepositoryInterface $authRepositoryInterface;
    public function __construct(AuthRepositoryInterface $authRepositoryInterface)
    {
        $this->authRepositoryInterface = $authRepositoryInterface;

    }

    public function signup(SignupRequest $request)
    {
        $data = $request->validated();

        return $this->authRepositoryInterface->signup($data);
    }

    //user login
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        return $this->authRepositoryInterface->login($credentials);

    }
    //user logout
    public function logout(Request $request)
    {
        $user = $request->user();

        return $this->authRepositoryInterface->logout($user);

    }
}
