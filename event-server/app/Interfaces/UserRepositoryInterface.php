<?php
namespace App\Interfaces;

use Illuminate\Http\Request;

interface UserRepositoryInterface
{
    public function list();

    public function search(Request $request);

    public function roleChange(Request $request);
}
