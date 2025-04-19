<?php
namespace App\Repositories;

use App\Interfaces\UserRepositoryInterface;
use App\Models\User;

class UserRepository implements UserRepositoryInterface
{
    public function list()
    {
        $users = User::all();
        return response(compact('users'));
    }
}
