<?php
namespace App\Repositories;

use App\Interfaces\PaymentMethodRepositoryInterface;
use App\Models\PaymentMethod;
use Illuminate\Validation\ValidationException;

class PaymentMethodRepository implements PaymentMethodRepositoryInterface
{
    public function listPayment()
    {
        $payments = PaymentMethod::select('account_no', 'account_type', 'account_name')->get();

        return response(compact('payments'));
    }

    public function addPayment($request)
    {
        $this->checkValidation($request);

        PaymentMethod::create([
            'account_type' => $request->account_type,
            'account_no'   => $request->account_no,
            'account_name' => $request->account_name,
        ]);

        return response(201);
    }

    //check validation
    private function checkValidation($request)
    {
        $rules = [
            'account_no'   => "required|min:5|max:10",
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

            throw ValidationException::withMessages(
                ['account_name' => 'This name already exists',
                    'account_no'    => 'This number already exists',
                    'account_type'  => 'This account already exists']);

        }

    }
}
