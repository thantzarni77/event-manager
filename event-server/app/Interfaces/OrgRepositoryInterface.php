<?php
namespace App\Interfaces;

use Illuminate\Http\Request;

interface OrgRepositoryInterface
{
    public function addOrg(Request $request);
}
