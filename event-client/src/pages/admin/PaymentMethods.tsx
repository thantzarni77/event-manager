import { useEffect, useRef, useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";

import axiosClient from "../../axios-client";
import PaymentMethodData from "../../components/admin/PaymentMethodData";

type Payment = {
  account_no: string | number;
  account_name: string;
  account_type: string;
};

const PaymentMethods = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [payments, setPayments] = useState<Payment[]>();

  const modalRef = useRef<HTMLDialogElement>(null);

  const acc_name = useRef<HTMLInputElement>(null);
  const acc_num = useRef<HTMLInputElement>(null);
  const acc_type = useRef<HTMLInputElement>(null);

  useEffect(() => {
    axiosClient.get("/payment/list").then(({ data }) => {
      setPayments(data.payments);
    });
  }, []);

  const paymentAddHandler = (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();

    const payload = {
      account_name: acc_name.current?.value,
      account_no: acc_num.current?.value,
      account_type: acc_type.current?.value,
    };

    axiosClient
      .post("/payment/add", payload)
      .then((response) => {
        if (response.data == "201") {
          window.location.reload();
        }
      })
      .catch(({ response }) => {
        setError(response.data.message);
        setLoading(false);
      });
  };

  return (
    <div className="mx-auto w-full px-10">
      <div className="rounded-box border-base-content/5 bg-base-100 my-2 w-full overflow-x-auto border">
        <table className="table">
          <thead>
            <tr>
              <th>Acc Name</th>
              <th>Acc Type</th>
              <th>Acc Number</th>
            </tr>
          </thead>
          <tbody>
            {payments?.length == 0 && (
              <tr>
                <td>No Data</td>
              </tr>
            )}
            {payments?.map((payment, index) => {
              return (
                <PaymentMethodData
                  key={index}
                  acc_name={payment.account_name}
                  acc_type={payment.account_type}
                  acc_num={payment.account_no}
                />
              );
            })}
          </tbody>
        </table>
      </div>

      <FaCirclePlus
        onClick={() => {
          if (modalRef.current) {
            modalRef.current.showModal();
          }
        }}
        className="text-primary btn btn-circle absolute right-10 bottom-25 z-10 text-[50px]"
      />

      {/* AddPayment*/}
      <dialog ref={modalRef} className="modal w-full">
        <div className="modal-box h-fit w-11/12 max-w-md">
          <h3 className="mb-4 text-lg font-bold">Add Payment Method</h3>
          <form
            onSubmit={paymentAddHandler}
            className="flex flex-col items-start gap-2"
          >
            <div className="flex w-[80%] flex-col">
              <label className="input validator my-2 w-full">
                <input
                  type="text"
                  placeholder="Enter account name"
                  required
                  ref={acc_name}
                />
              </label>
              <div className="validator-hint hidden">
                Please enter account name
              </div>
            </div>

            <div className="flex w-[80%] flex-col">
              <label className="input validator my-2 w-full">
                <input
                  type="text"
                  placeholder="Enter account type"
                  required
                  ref={acc_type}
                />
              </label>
              <div className="validator-hint hidden">
                Please enter account type
              </div>
            </div>
            <div className="flex w-[80%] flex-col">
              <label className="input validator my-2 w-full">
                <input
                  type="text"
                  placeholder="Enter account number"
                  required
                  pattern="[0-9]+"
                  title="Enter valid account number"
                  ref={acc_num}
                />
              </label>
              <div className="validator-hint hidden">
                Please enter account number
              </div>
              {error && (
                <div role="alert" id="alert" className="alert alert-warning">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 22 22"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <span>{error}</span>
                </div>
              )}
            </div>
            <button
              disabled={loading}
              type="submit"
              className="btn btn-primary my-2"
            >
              Add
            </button>
          </form>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-info">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default PaymentMethods;
