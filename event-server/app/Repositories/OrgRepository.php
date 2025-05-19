<?php
namespace App\Repositories;

use App\Interfaces\OrgRepositoryInterface;
use App\Models\Org;
use App\Models\User;

class OrgRepository implements OrgRepositoryInterface
{
    public function listOrg()
    {

        $orgMemberCounts = User::groupBy('org_id')
            ->selectRaw('org_id , COUNT(*)  as member_count')
            ->get();

        $orgs = Org::select('id', 'name', 'profile', 'description')
            ->when(request()->filled('type'), function ($query) {
                $query->orderBy(request()->input('column'), request()->input('type'));
            })
            ->orderBy('name')
            ->get();

        return response()->json((compact('orgs', 'orgMemberCounts')));
    }

    public function addOrg($request)
    {
        $this->checkValidation($request);

        $orgData = $this->prepareData($request);

        $path = null;
        if ($request->hasFile('orgProfile')) {
            $path               = $request->file('orgProfile')->store('org_profiles', 'public');
            $orgData['profile'] = $path;
        }

        $org = Org::create($orgData);

        User::where('id', $request->orgAdminID)->update([
            'role'   => 'org_admin',
            'org_id' => $org['id'],
        ]);

        return response(201);
    }

    public function getDetail($id)
    {
        $rows = Org::select(
            'orgs.id as org_id',
            'orgs.name as org_name',
            'orgs.profile as org_profile',
            'orgs.description as org_description',
            'users.id as user_id',
            'users.name as user_name',
            'users.email as user_email',
            'users.profile as user_profile',
            'users.role as user_role'
        )
            ->leftJoin('users', 'users.org_id', 'orgs.id')
            ->where('orgs.id', $id)
            ->get();

        // get org info from the first row
        $org = $rows->first();

        $members = $rows
            ->map(function ($row) {
                return [
                    'id'      => $row->user_id,
                    'name'    => $row->user_name,
                    'email'   => $row->user_email,
                    'profile' => $row->user_profile,
                    'role'    => $row->user_role,
                ];
            })
            ->sortBy(fn($user) => $user['role'] === 'org_admin' ? 0 : 1) // show org admin first
            ->values();

        $orgData = [
            'org'     => [
                'name'        => $org->org_name,
                'profile'     => $org->org_profile,
                'description' => $org->org_description,
            ],
            'members' => $members,
        ];

        return response()->json((compact('orgData')));
    }

    private function checkValidation($request)
    {
        $rules = [
            'name'        => 'required|max:40|unique:orgs,name',
            'description' => 'required|max:500',
            'orgAdminID'  => 'required|numeric|min:1|unique:orgs,admin_id,',
            'orgProfile'  => 'required|file|mimes:jpg,jpeg,png,svg,gif|max:5120',

        ];

        $messages = [
            'orgAdminID.min'    => 'You must select an admin',
            'orgAdminID.unique' => 'This user is already an org admin',
        ];

        $request->validate($rules, $messages);
    }

    private function prepareData($request)
    {
        return [

            'name'        => $request->name,
            'description' => $request->description,
            'admin_id'    => $request->orgAdminID,

        ];
    }
}
