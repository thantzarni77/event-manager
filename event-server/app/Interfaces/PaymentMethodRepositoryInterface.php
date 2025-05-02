<?php
namespace App\Interfaces;

use Illuminate\Http\Request;

interface PaymentMethodRepositoryInterface
{
    public function listPayment();
    public function addPayment(Request $requset);
}
