<?php
namespace App\Repositories;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Interfaces\AuthRepositoryInterface;
use Illuminate\Validation\ValidationException;

class AuthRepository implements AuthRepositoryInterface
{
    //user register
    public function signup($request)
    {

        $data = $this->checkValidation($request);

        $user = User::create([
            'name'     => $data['username'],
            'email'    => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        $access_token = $user->createToken('normal')->plainTextToken;
        return response()->json((compact('user', 'access_token')));

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
        return response()->json((compact('user', 'access_token')));

    }
    //user logout
    public function logout($user)
    {
        $user->currentAccessToken()->delete();
        return response('', 204);

    }

    private function checkValidation($request) {

      $rules = [
        'username' => 'required',
        'email' => 'required|unique:users,email' ,
        'password' => 'required|min:8',
      ];

      $messages = [
        'email.unique' => 'The choosen email is already registered'
      ];

      $validator = Validator::make($request, $rules, $messages);

      if ($validator->fails()) {
        throw ValidationException::withMessages($validator->errors()->toArray());
      }

      $validatedData = $validator->validated();

      return $validatedData;

    }


}
