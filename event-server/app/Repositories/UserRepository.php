<?php
namespace App\Repositories;

use App\Interfaces\UserRepositoryInterface;
use App\Models\User;

class UserRepository implements UserRepositoryInterface
{
    public function list()
    {
        $users = User::orderBy('name')->get();
        return response(compact('users'));
    }

    public function search($request)
    {
        $type      = $request['type'];
        $searchKey = $request['searchKey'];

        if ($type == "filter") {
            $searchedUsers = User::where('role', $searchKey)->get();
        } else {
            $searchedUsers = User::where('name', 'like', '%' . $searchKey . '%')->orWhere('email', 'like', '%' . $searchKey . '%')->get();

        }

        return response(compact('searchedUsers'));
    }

    public function roleChange($request)
    {
        $userID     = $request['userID'];
        $changeType = $request['changeType'];

        $currentRole = User::select("role")->where('id', $userID)->value('role');

        if ($changeType == "promote") {
            switch ($currentRole) {
                case 'user':
                    User::where('id', $userID)->update(['role' => 'admin']);
                    break;
            }

        } else {
            switch ($currentRole) {
                case 'admin':
                    User::where('id', $userID)->update(['role' => 'user']);
                    break;
            }

        }

        return response(200);
    }

}
