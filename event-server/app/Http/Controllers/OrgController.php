<?php
namespace App\Http\Controllers;

use App\Interfaces\OrgRepositoryInterface;
use Illuminate\Http\Request;

class OrgController extends Controller
{
    private OrgRepositoryInterface $orgRepositoryInterface;
    public function __construct(OrgRepositoryInterface $orgRepositoryInterface)
    {
        $this->orgRepositoryInterface = $orgRepositoryInterface;
    }

    public function addOrg(Request $request)
    {
        return $this->orgRepositoryInterface->addOrg($request);
    }
}
