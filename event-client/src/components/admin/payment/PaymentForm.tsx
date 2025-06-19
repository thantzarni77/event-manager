import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import {
  Payment,
  ServerErrors,
} from "../../../pages/admin/payment/PaymentMethods";

import FormError from "../../../helper/FormError";
import { addPayment, updatePayment } from "../../../helper/api/apiFunctions";

export interface PaymentFormData {
  paymentID?: string | number;
  account_name: string;
  account_no: string;
  account_type: string;
}

interface Props {
  isCreate: boolean;
  addModalRef: React.RefObject<HTMLDialogElement | null>;
  singlePayment: Payment | undefined;
  setIsCreate: React.Dispatch<React.SetStateAction<boolean>>;
  serverErrors: ServerErrors;
  setServerErrors: React.Dispatch<React.SetStateAction<ServerErrors>>;
}

const PaymentForm = ({
  isCreate,
  addModalRef,
  singlePayment,
  setIsCreate,
  serverErrors,
  setServerErrors,
}: Props) => {
  const queryClient = useQueryClient();
  const closeButton = useRef<HTMLButtonElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PaymentFormData>({
    defaultValues: {
      account_name: "",

      account_type: "",

      account_no: "",
    },
  });

  useEffect(() => {
    if (isCreate) {
      reset({
        account_name: "",
        account_type: "",
        account_no: "",
      });
    } else if (singlePayment) {
      reset({
        account_name: singlePayment.account_name,
        account_type: singlePayment.account_type,
        account_no: singlePayment.account_no,
      });
    }
  }, [isCreate, reset, singlePayment]);

  const addPaymentMutation = useMutation({
    mutationFn: addPayment,
    onSuccess: (data) => {
      if (data == 201) {
        queryClient.invalidateQueries({ queryKey: ["payments"] });
        closeButton.current?.click();
        setServerErrors({});
        reset();
      }
    },
    onError: (err: AxiosError<{ errors: Record<string, string[]> }>) => {
      if (err.response?.data?.errors) {
        setServerErrors(err.response.data.errors);
      }
    },
  });

  const updatePaymentMutation = useMutation({
    mutationFn: updatePayment,
    onSuccess: (data) => {
      if (data == 202) {
        queryClient.invalidateQueries({ queryKey: ["payments"] });
        setIsCreate(true);
        closeButton.current?.click();
        setServerErrors({});
        reset();
      }
    },
    onError: (err: AxiosError<{ errors: Record<string, string[]> }>) => {
      if (err.response?.data?.errors) {
        setServerErrors(err.response.data.errors);
      }
    },
  });

  const paymentAddHandler = (payload: PaymentFormData) => {
    if (isCreate) {
      addPaymentMutation.mutate(payload);
    } else {
      payload["paymentID"] = singlePayment?.id;
      updatePaymentMutation.mutate(payload);
    }
  };

  return (
    <dialog ref={addModalRef} className="modal w-full">
      <div className="modal-box h-fit w-11/12 max-w-md">
        <h3 className="mb-4 text-lg font-bold">
          {isCreate ? "Add" : "Edit"} Payment Method
        </h3>
        <form
          // key={formKey}
          onSubmit={handleSubmit(paymentAddHandler)}
          className="flex flex-col items-start gap-2"
        >
          <div className="flex w-[80%] flex-col">
            <label
              className={`input ${errors.account_name && "border-2 border-red-400"} my-2 w-full`}
            >
              <input
                type="text"
                {...register("account_name", {
                  required: {
                    value: true,
                    message: "Account name is required",
                  },
                })}
                placeholder="Enter account name"
              />
            </label>
            <div className="validator-hint hidden">
              Please enter account name
            </div>
            {errors.account_name && (
              <FormError message={errors.account_name.message} />
            )}
            {serverErrors.account_name && (
              <FormError message={serverErrors.account_name[0]} />
            )}
          </div>

          <div className="flex w-[80%] flex-col">
            <label
              className={`input ${errors.account_type && "border-2 border-red-400"} my-2 w-full`}
            >
              <input
                type="text"
                placeholder="Enter account type"
                {...register("account_type", {
                  required: {
                    value: true,
                    message: "Account type is required",
                  },
                  min: {
                    value: 2,
                    message: "Invalid account type",
                  },
                })}
              />
            </label>

            {errors.account_type && (
              <FormError message={errors.account_type.message} />
            )}
            {serverErrors.account_type && (
              <FormError message={serverErrors.account_type[0]} />
            )}
          </div>
          <div className="flex w-[80%] flex-col">
            <label
              className={`input ${errors.account_no && "border-2 border-red-400"} my-2 w-full`}
            >
              <input
                type="text"
                placeholder="Enter account number"
                {...register("account_no", {
                  required: {
                    value: true,
                    message: "Account number is required",
                  },
                  minLength: {
                    value: 5,
                    message: "Invalid account number",
                  },
                  pattern: {
                    value: /[0-9]+/,
                    message: "Enter a valid number",
                  },
                })}
              />
            </label>

            {errors.account_no && (
              <FormError message={errors.account_no.message} />
            )}
            {serverErrors.account_no && (
              <FormError message={serverErrors.account_no[0]} />
            )}
          </div>
          <button
            disabled={
              addPaymentMutation.isPending || updatePaymentMutation.isPending
            }
            type="submit"
            className="btn btn-primary my-2"
          >
            {isCreate ? "Add" : "Save Edit"}
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
};

export default PaymentForm;
