<?php
namespace App\Repositories;

use App\Interfaces\UserRepositoryInterface;
use App\Models\User;

class UserRepository implements UserRepositoryInterface
{
    public function list()
    {
        $users = User::select(
            'users.id',
            'users.name',
            'users.role',
            'users.email',
            'users.profile',
            'users.provider',
            'orgs.name as org_name'
        )
            ->leftJoin('orgs', 'orgs.id', 'users.org_id')
            ->orderBy('users.name')
            ->get();

        return response(compact('users'));
    }

    public function search($request)
    {
        $type      = $request['type'];
        $searchKey = $request['searchKey'];

        if ($type == "filter") {
            if ($searchKey == "org") {

                $searchedUsers = User::whereIn('users.role', ['org_admin', 'org_user'])
                    ->select(
                        'users.id',
                        'users.name',
                        'users.role',
                        'users.email',
                        'users.profile',
                        'users.provider',
                        'orgs.name as org_name'
                    )
                    ->leftJoin('orgs', 'orgs.id', 'users.org_id')
                    ->orderBy('orgs.name')
                    ->get();
            } else {
                $searchedUsers = User::where('role', $searchKey)->get();
            }

        } else {
            $searchedUsers = User::where('users.name', 'like', '%' . $searchKey . '%')
                ->orWhere('users.email', 'like', '%' . $searchKey . '%')
                ->select(
                    'users.id',
                    'users.name',
                    'users.role',
                    'users.email',
                    'users.profile',
                    'users.provider',
                    'orgs.name as org_name'
                )
                ->leftJoin('orgs', 'orgs.id', 'users.org_id')
                ->orderBy('users.name')
                ->get();

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
