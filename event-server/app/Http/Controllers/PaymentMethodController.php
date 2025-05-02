<?php
namespace App\Http\Controllers;

use App\Interfaces\PaymentMethodRepositoryInterface;
use Illuminate\Http\Request;

class PaymentMethodController extends Controller
{
    private PaymentMethodRepositoryInterface $paymentMethodRepositoryInterface;

    public function __construct(PaymentMethodRepositoryInterface $paymentMethodRepositoryInterface)
    {
        $this->paymentMethodRepositoryInterface = $paymentMethodRepositoryInterface;
    }

    public function listPayment()
    {
        return $this->paymentMethodRepositoryInterface->listPayment();
    }

    public function addPayment(Request $request)
    {
        return $this->paymentMethodRepositoryInterface->addPayment($request);
    }
}
