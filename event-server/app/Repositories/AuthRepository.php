<?php
namespace App\Repositories;

use App\Interfaces\AuthRepositoryInterface;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthRepository implements AuthRepositoryInterface
{
    //user register
    public function signup($data)
    {
        $user = User::create([
            'name'     => $data['username'],
            'email'    => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        $access_token = $user->createToken('normal')->plainTextToken;
        return response(compact('user', 'access_token'));

    }

    //user login
    public function login($credentials)
    {
        if (! Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Provided email or password is incorrect',
            ], 422);
        }

        $user         = Auth::user();
        $access_token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'access_token'));

    }
    //user logout
    public function logout($user)
    {
        $user->currentAccessToken()->delete();
        return response('', 204);

    }
}
