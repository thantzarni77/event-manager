import { useEffect, useRef, useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";

import axiosClient from "../../axios-client";
import { ScaleLoader } from "react-spinners";
import PaymentEditModal from "../../components/admin/PaymentEditModal";
import PaymentAddModal from "../../components/admin/PaymentAddModal";
import SinglePaymentMethod from "../../components/admin/SinglePaymentMethod";

export type Payment = {
  id: string | number;
  account_no: string | undefined;
  account_name: string;
  account_type: string;
};

type PaymentState = {
  account_name: string;
  account_no: string;
  account_type: string;
};

const PaymentMethods = () => {
  //erros and  loading status
  const [errors, setErrors] = useState<Payment | null>();
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  //payment id from child
  const [selectedID, setSelectedID] = useState<string | number>("");

  //all payments from db
  const [payments, setPayments] = useState<Payment[]>();

  //single payment
  const [singlePayment, setSinglePayment] = useState<Payment>();

  //dialog boxes
  const addModalRef = useRef<HTMLDialogElement>(null);
  const editModalRef = useRef<HTMLDialogElement>(null);
  const deleteDialog = useRef<HTMLDialogElement>(null);

  //get setFormData function from child
  const setFormDataRef = useRef<((data: PaymentState) => void) | null>(null);

  const getAllPayments = () => {
    setPageLoading(true);
    axiosClient.get("/payment/list").then(({ data }) => {
      setPayments(data.payments);
      setPageLoading(false);
    });
  };

  useEffect(() => {
    getAllPayments();
  }, []);

  //add payment
  const paymentAddHandler = (
    accName: string | undefined,
    accNum: string | undefined,
    accType: string | undefined,
  ) => {
    setLoading(true);

    const payload = {
      account_name: accName,
      account_no: accNum,
      account_type: accType,
    };

    axiosClient
      .post("/payment/add", payload)
      .then((response) => {
        if (response.data == "201") {
          getAllPayments();
          setErrors(null);
          setLoading(false);
          addModalRef.current?.close();
        }
      })
      .then(() => {
        if (setFormDataRef.current) {
          setFormDataRef.current({
            account_name: "",
            account_no: "",
            account_type: "",
          });
        }
      })
      .catch(({ response }) => {
        setErrors(response.data.errors);
        setLoading(false);
      });
  };

  //update payment
  const paymentUpdateHandler = (
    id: string | number | undefined,
    accName: string | undefined,
    accNum: string | undefined,
    accType: string | undefined,
  ) => {
    setLoading(true);

    const payload = {
      paymentID: id,
      account_name: accName,
      account_no: accNum,
      account_type: accType,
    };

    axiosClient
      .post("/payment/update", payload)
      .then((response) => {
        if (response.data == "202") {
          getAllPayments();
          setErrors(null);
          setLoading(false);
          editModalRef.current?.close();
        }
      })
      .catch(({ response }) => {
        setErrors(response.data.errors);
        setLoading(false);
      });
  };

  //delete payment
  const deletePayment = () => {
    const payload = {
      payment_id: selectedID,
    };

    axiosClient.post("/payment/delete", payload).then((response) => {
      if (response.data == "200") {
        getAllPayments();
      }
    });
  };

  return (
    <div className="mx-auto w-full px-10">
      {pageLoading && (
        <div className="mt-[15%] flex items-center">
          <ScaleLoader color="#8BE9FD" className="mx-auto" />
        </div>
      )}
      <div className="rounded-box border-base-content/5 bg-base-100 my-2 w-full overflow-x-auto border">
        {!pageLoading && (
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
                    editModalRef={editModalRef}
                    setSinglePayment={setSinglePayment}
                  />
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <FaCirclePlus
        onClick={() => {
          if (addModalRef.current) {
            addModalRef.current.showModal();
          }
        }}
        className="text-primary btn btn-circle absolute right-10 bottom-25 z-10 text-[50px]"
      />

      <PaymentAddModal
        ref={addModalRef}
        paymentAddHandler={paymentAddHandler}
        errors={errors}
        loading={loading}
        exposeSetFormData={(fn) => (setFormDataRef.current = fn)}
      />

      <PaymentEditModal
        ref={editModalRef}
        paymentUpdateHandler={paymentUpdateHandler}
        singlePayment={singlePayment}
        errors={errors}
        loading={loading}
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
                  onClick={() => deletePayment()}
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
