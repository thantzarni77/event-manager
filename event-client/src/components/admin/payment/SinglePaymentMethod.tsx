import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Payment,
  ServerErrors,
} from "../../../pages/admin/payment/PaymentMethods";

import { getSinglePayment } from "../../../helper/api/apiFunctions";

import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

type Props = {
  id: string | number;
  acc_name: string;
  acc_type: string;
  acc_num: string | undefined;
  setSelectedID: React.Dispatch<React.SetStateAction<string | number>>;
  deleteDialog: React.RefObject<HTMLDialogElement | null>;
  editModalRef: React.RefObject<HTMLDialogElement | null>;
  setSinglePayment: React.Dispatch<React.SetStateAction<Payment | undefined>>;
  setIsCreate: React.Dispatch<React.SetStateAction<boolean>>;
  setServerErrors: React.Dispatch<React.SetStateAction<ServerErrors>>;
};

const SinglePaymentMethod = ({
  id,
  acc_name,
  acc_type,
  acc_num,
  setSelectedID,
  deleteDialog,
  editModalRef,
  setSinglePayment,
  setIsCreate,
  setServerErrors,
}: Props) => {
  const { data, isSuccess, refetch, isFetching } = useQuery({
    queryKey: ["singlePayment"],
    queryFn: () => {
      return getSinglePayment(id);
    },
    enabled: false,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setIsCreate(false);
      setServerErrors({});
      setSinglePayment(data.singlePayment);
      editModalRef.current?.showModal();
    }
  }, [
    isSuccess,
    data,
    editModalRef,
    setSinglePayment,
    setIsCreate,
    setServerErrors,
  ]);

  return (
    <>
      <tr>
        <td>{acc_name}</td>
        <td>{acc_type}</td>
        <td>{acc_num}</td>
        <td className="flex items-center gap-4">
          <button
            className="btn btn-error p-[5px] md:p-2"
            onClick={() => {
              deleteDialog.current?.showModal();
              setSelectedID(id);
            }}
          >
            <MdDeleteOutline className="text-[20px]" />
          </button>
          <button
            disabled={isFetching}
            className="btn btn-info p-[5px] md:p-2"
            onClick={() => refetch()}
          >
            <FaEdit className="text-[20px]" />
          </button>
        </td>
      </tr>
    </>
  );
};

export default SinglePaymentMethod;
