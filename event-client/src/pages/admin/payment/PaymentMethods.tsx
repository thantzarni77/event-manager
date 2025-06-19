import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import PaymentForm from "../../../components/admin/payment/PaymentForm";
import SinglePaymentMethod from "../../../components/admin/payment/SinglePaymentMethod";

import {
  deletePayment,
  getAllPayments,
} from "../../../helper/api/apiFunctions";

import { FaCirclePlus } from "react-icons/fa6";
import { ScaleLoader } from "react-spinners";

export type Payment = {
  id: string | number;
  account_no: string | undefined;
  account_name: string;
  account_type: string;
};

export type PaymentState = {
  account_name: string;
  account_no: string;
  account_type: string;
};

export type ServerErrors = {
  account_type?: string[];
  account_no?: string[];
  account_name?: string[];
};

const PaymentMethods = () => {
  const queryClient = useQueryClient();

  //payment form mode
  const [isCreate, setIsCreate] = useState(true);

  //single payment
  const [singlePayment, setSinglePayment] = useState<Payment | undefined>();

  //payment id from child
  const [selectedID, setSelectedID] = useState<string | number>("");

  //all payments from db
  const [payments, setPayments] = useState<Payment[]>();

  //errors from server
  const [serverErrors, setServerErrors] = useState<ServerErrors>({});

  //dialog boxes
  const paymentFormModalRef = useRef<HTMLDialogElement>(null);

  // const editModalRef = useRef<HTMLDialogElement>(null);
  const deleteDialog = useRef<HTMLDialogElement>(null);

  const { data, isSuccess, isPending } = useQuery({
    queryKey: ["payments"],
    queryFn: getAllPayments,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setPayments(data.payments);
    }
  }, [data, isSuccess]);

  const deletePaymentMutation = useMutation({
    mutationFn: deletePayment,
    onSuccess: (data) => {
      if (data == 200) {
        queryClient.invalidateQueries({ queryKey: ["payments"] });
      }
    },
  });

  //delete payment
  const deletePaymentHandler = () => {
    const payload = {
      payment_id: selectedID,
    };

    deletePaymentMutation.mutate(payload);
  };

  return (
    <div className="mx-auto w-full px-10">
      {isPending && (
        <div className="mt-[15%] flex items-center">
          <ScaleLoader color="#8BE9FD" className="mx-auto" />
        </div>
      )}
      <div className="rounded-box border-base-content/5 bg-base-100 my-2 w-full overflow-x-auto border">
        {data?.payments && (
          <table className="table">
            <thead>
              <tr>
                <th>Acc Name</th>
                <th>Acc Type</th>
                <th>Acc Number</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {payments?.length == 0 && (
                <tr>
                  <td>No Data</td>
                </tr>
              )}

              {payments?.map((payment) => {
                return (
                  <SinglePaymentMethod
                    key={payment.id}
                    id={payment.id}
                    acc_name={payment.account_name}
                    acc_type={payment.account_type}
                    acc_num={payment.account_no}
                    deleteDialog={deleteDialog}
                    setSelectedID={setSelectedID}
                    editModalRef={paymentFormModalRef}
                    setSinglePayment={setSinglePayment}
                    setIsCreate={setIsCreate}
                    setServerErrors={setServerErrors}
                  />
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <FaCirclePlus
        onClick={() => {
          if (paymentFormModalRef.current) {
            setServerErrors({});
            setIsCreate(true);
            paymentFormModalRef.current.showModal();
          }
        }}
        className="text-primary btn btn-circle absolute right-10 bottom-25 z-10 text-[50px]"
      />

      <PaymentForm
        isCreate={isCreate}
        addModalRef={paymentFormModalRef}
        singlePayment={singlePayment}
        setIsCreate={setIsCreate}
        serverErrors={serverErrors}
        setServerErrors={setServerErrors}
      />

      {/* DeletePayment */}
      <dialog ref={deleteDialog} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Attention !</h3>
          <p className="py-4">Are you sure you want to delete?</p>
          <div className="modal-action">
            <form method="dialog">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => deletePaymentHandler()}
                  className="btn btn-success"
                >
                  Yes
                </button>
                <button className="btn btn-error">No</button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default PaymentMethods;
