<?php
namespace App\Http\Controllers;

use App\Models\User;
use GuzzleHttp\Exception\ClientException;
use Laravel\Socialite\Facades\Socialite;

class SocialLoginController extends Controller
{
    //redirect
    public function redirect()
    {
        return response()->json([
            'url' => Socialite::driver('google')
                ->stateless()
                ->redirect()
                ->getTargetUrl(),
        ]);

    }

    //callback
    public function callback()
    {
        try {
            $socialiteUser = Socialite::driver('google')->stateless()->user();

        } catch (ClientException $e) {

            return response()->json(['error' => 'Invalid credentials provided.'], 422);
        }

        $user = User::updateOrCreate([
            'provider_id' => $socialiteUser->id,
        ], [
            'name'           => $socialiteUser->name,
            'email'          => $socialiteUser->email,
            // 'profile'        => $socialiteUser->avatar,
            'role'           => 'user',
            'provider'       => 'google',
            'provider_id'    => $socialiteUser->id,
            'provider_token' => $socialiteUser->token,
        ]);

        return response()->json([
            'user'         => $user,
            'access_token' => $user->createToken('google-token')->plainTextToken,
            'token_type'   => 'Bearer',
        ]);

    }

}
