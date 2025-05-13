<?php
namespace App\Repositories;

use App\Interfaces\OrgRepositoryInterface;
use App\Models\Org;
use App\Models\User;

class OrgRepository implements OrgRepositoryInterface
{
    public function listOrg()
    {
        $orgs = Org::select('id', 'name', 'profile', 'description')->get();

        return response(compact('orgs'));
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

    private function checkValidation($request)
    {
        $rules = [
            'name'        => 'required|max:40',
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
