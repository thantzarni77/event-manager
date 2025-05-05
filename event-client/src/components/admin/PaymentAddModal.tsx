import { forwardRef, useEffect, useRef, useState } from "react";
import { Payment } from "../../pages/admin/PaymentMethods";

type PaymentAddModalProps = {
  paymentAddHandler: (
    accName: string | undefined,
    accNum: string | undefined,
    accType: string | undefined,
  ) => void;
  errors: Payment | null | undefined;
  loading: boolean;
  exposeSetFormData: (fn: (data: PaymentState) => void) => void;
};

type PaymentState = Omit<Payment, "id">;

const PaymentAddModal = forwardRef<HTMLDialogElement, PaymentAddModalProps>(
  ({ paymentAddHandler, errors, loading, exposeSetFormData }, addModalRef) => {
    const closeButton = useRef<HTMLButtonElement>(null);

    const [formData, setFormData] = useState<PaymentState>({
      account_name: "",
      account_no: "",
      account_type: "",
    });

    useEffect(() => {
      exposeSetFormData(setFormData);
    }, [exposeSetFormData]);

    return (
      <dialog ref={addModalRef} className="modal w-full">
        <div className="modal-box h-fit w-11/12 max-w-md">
          <h3 className="mb-4 text-lg font-bold">Add Payment Method</h3>
          <form
            onSubmit={(e: React.FormEvent) => {
              e.preventDefault();
              paymentAddHandler(
                formData.account_name,
                formData.account_no,
                formData.account_type,
              );
            }}
            className="flex flex-col items-start gap-2"
          >
            <div className="flex w-[80%] flex-col">
              <label className="input validator my-2 w-full">
                <input
                  type="text"
                  placeholder="Enter account name"
                  required
                  value={formData.account_name}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      account_name: e.target.value,
                    }))
                  }
                />
              </label>
              <div className="validator-hint hidden">
                Please enter account name
              </div>
              {errors && errors["account_name"] && (
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
                  <span>{errors["account_name"]}</span>
                </div>
              )}
            </div>

            <div className="flex w-[80%] flex-col">
              <label className="input validator my-2 w-full">
                <input
                  type="text"
                  placeholder="Enter account type"
                  required
                  value={formData.account_type}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      account_type: e.target.value,
                    }))
                  }
                />
              </label>
              <div className="validator-hint hidden">
                Please enter account type
              </div>
              {errors && errors["account_type"] && (
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
                  <span>{errors["account_type"]}</span>
                </div>
              )}
            </div>
            <div className="flex w-[80%] flex-col">
              <label className="input validator my-2 w-full">
                <input
                  type="text"
                  placeholder="Enter account number"
                  required
                  pattern="[0-9]+"
                  title="Enter valid account number"
                  value={formData.account_no}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      account_no: e.target.value,
                    }))
                  }
                />
              </label>
              <div className="validator-hint hidden">
                Please enter account number
              </div>
              {errors && errors["account_no"] && (
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
                  <span>{errors["account_no"]}</span>
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
              <button
                onClick={() => {
                  closeButton.current?.click();
                }}
                className="btn btn-info"
                ref={closeButton}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    );
  },
);

export default PaymentAddModal;
