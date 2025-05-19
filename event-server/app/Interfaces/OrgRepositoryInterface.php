<?php
namespace App\Interfaces;

use Illuminate\Http\Request;

interface OrgRepositoryInterface
{
    public function listOrg();
    public function addOrg(Request $request);
    public function editOrg(Request $request);
    public function getDetail($id);
}
