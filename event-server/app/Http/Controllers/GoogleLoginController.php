<?php
namespace App\Http\Controllers;

use App\Interfaces\GoogleLoginRepositoryInterface;

class GoogleLoginController extends Controller
{
    private GoogleLoginRepositoryInterface $googleLoginRepositoryInterface;

    public function __construct(GoogleLoginRepositoryInterface $googleLoginRepositoryInterface)
    {
        $this->googleLoginRepositoryInterface = $googleLoginRepositoryInterface;
    }

    public function redirect()
    {
        return $this->googleLoginRepositoryInterface->redirect();
    }

    public function callback()
    {
        return $this->googleLoginRepositoryInterface->callback();
    }
}
