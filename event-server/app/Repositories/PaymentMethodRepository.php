<?php
namespace App\Repositories;

use App\Interfaces\PaymentMethodRepositoryInterface;
use App\Models\PaymentMethod;
use Illuminate\Validation\ValidationException;

class PaymentMethodRepository implements PaymentMethodRepositoryInterface
{
    public function listPayment()
    {
        $payments = PaymentMethod::select('id', 'account_no', 'account_type', 'account_name')->orderBy('account_name')->get();

        return response(compact('payments'));
    }

    public function singlePaymentInfo($id)
    {
        $singlePayment = PaymentMethod::where('id', $id)->select('id', 'account_no', 'account_type', 'account_name')->first();

        return response(compact('singlePayment'));

    }

    public function addPayment($request)
    {
        $this->checkValidation($request, 'add');

        PaymentMethod::create([
            'account_type' => $request->account_type,
            'account_no'   => $request->account_no,
            'account_name' => $request->account_name,
        ]);

        return response(201);
    }

    public function updatePayment($request)
    {
        $this->checkValidation($request, 'update');

        PaymentMethod::where('id', $request->paymentID)->update([
            'account_type' => $request->account_type,
            'account_no'   => $request->account_no,
            'account_name' => $request->account_name,
        ]);

        return response(202);
    }

    public function deletePayment($request)
    {
        PaymentMethod::where('id', $request['payment_id'])->delete();

        return response(200);
    }

    //check validation
    private function checkValidation($request, $action)
    {
        $rules = [
            'account_no'   => "required|min:5|max:12",
            'account_name' => 'required|max:20',
            "account_type" => "required",
        ];

        $messages = [

            'account_no.min' => "Too few numbers! Is that a valid account ?",
            'account_no.max' => "Account number count cannot be more than 10",
        ];

        $request->validate($rules, $messages);

        //check if exact record is entered again
        $exactRecord = PaymentMethod::where('account_no', $request->account_no)
            ->where('account_name', $request->account_name)
            ->where('account_type', $request->account_type)
            ->first();

        if ($exactRecord) {
            if ($action == 'update') {

                // allow self to update with exact record
                $id = $$exactRecord['id'];

                if ($id == $request->paymentID) {
                    return;
                }
            }

            throw ValidationException::withMessages(
                ['account_name' => 'This name already exists',
                    'account_no'    => 'This number already exists',
                    'account_type'  => 'This account already exists']);

        }

    }
}
