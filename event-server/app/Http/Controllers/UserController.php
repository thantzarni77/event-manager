<?php
namespace App\Http\Controllers;

use App\Interfaces\UserRepositoryInterface;
use Illuminate\Http\Request;

class UserController extends Controller
{
    private UserRepositoryInterface $userRepositoryInterface;
    public function __construct(UserRepositoryInterface $userRepositoryInterface)
    {
        $this->userRepositoryInterface = $userRepositoryInterface;
    }

    public function list()
    {
        return $this->userRepositoryInterface->list();
    }

    public function search(Request $request)
    {
        return $this->userRepositoryInterface->search($request);
    }

    public function roleChange(Request $request)
    {
        return $this->userRepositoryInterface->roleChange($request);
    }
}
