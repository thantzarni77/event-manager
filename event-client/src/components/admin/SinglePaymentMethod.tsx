import { MdDeleteOutline } from "react-icons/md";
// import axiosClient from "../../axios-client";
import { FaEdit } from "react-icons/fa";
import { Payment } from "../../pages/admin/PaymentMethods";
import axiosClient from "../../axios-client";

type Props = {
  id: string | number;
  acc_name: string;
  acc_type: string;
  acc_num: string | undefined;
  setSelectedID: React.Dispatch<React.SetStateAction<string | number>>;
  deleteDialog: React.RefObject<HTMLDialogElement | null>;
  editModalRef: React.RefObject<HTMLDialogElement | null>;

  setSinglePayment: React.Dispatch<React.SetStateAction<Payment | undefined>>;
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
}: Props) => {
  const getIndiPayment = (id: string | number) => {
    axiosClient
      .get(`/payment/list/${id}`)
      .then(({ data }) => {
        setSinglePayment(data.singlePayment);
      })
      .then(() => {
        editModalRef.current?.showModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
            className="btn btn-info p-[5px] md:p-2"
            onClick={() => {
              getIndiPayment(id);
            }}
          >
            <FaEdit className="text-[20px]" />
          </button>
        </td>
      </tr>
    </>
  );
};

export default SinglePaymentMethod;
