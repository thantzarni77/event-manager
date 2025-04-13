<?php
namespace App\Interfaces;

interface GoogleLoginRepositoryInterface
{
    public function redirect();
    public function callback();
}
