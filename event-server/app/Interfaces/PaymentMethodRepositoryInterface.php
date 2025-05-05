<?php
namespace App\Interfaces;

use Illuminate\Http\Request;

interface PaymentMethodRepositoryInterface
{
    public function listPayment();
    public function singlePaymentInfo($id);
    public function addPayment(Request $request);
    public function updatePayment(Request $request);
    public function deletePayment(Request $request);
}
