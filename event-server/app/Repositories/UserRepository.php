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

    public function search($request)
    {
        $searchKey = $request['searchKey'];

        $searchedUsers = User::where('name', 'like', '%' . $searchKey . '%')->get();

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
                    User::where('id', $userID)->update(['role' => 'org']);
                    break;
                case 'org':
                    User::where('id', $userID)->update(['role' => 'admin']);
            }

        } else {
            switch ($currentRole) {
                case 'admin':
                    User::where('id', $userID)->update(['role' => 'org']);
                    break;
                case 'org':
                    User::where('id', $userID)->update(['role' => 'user']);
            }

        }

        return response(200);
    }

}
