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

    public function singlePaymentInfo($id)
    {
        return $this->paymentMethodRepositoryInterface->singlePaymentInfo($id);

    }

    public function addPayment(Request $request)
    {
        return $this->paymentMethodRepositoryInterface->addPayment($request);
    }

    public function updatePayment(Request $request)
    {
        return $this->paymentMethodRepositoryInterface->updatePayment($request);
    }

    public function deletePayment(Request $request)
    {
        return $this->paymentMethodRepositoryInterface->deletePayment($request);
    }
}
