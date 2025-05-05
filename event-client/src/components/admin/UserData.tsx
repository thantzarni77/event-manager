import { useContext, useRef, useState } from "react";
import { MainContext } from "../../context/MainContext";
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";
import axiosClient from "../../axios-client";
import { IoEyeOutline } from "react-icons/io5";

type Props = {
  id: number | string;
  name: string;
  role: string;
  loginMethod: string;
  profile: string | null;
  getAllUsers: () => void;
};

const UserData = ({
  id,
  name,
  role,
  loginMethod,
  profile,
  getAllUsers,
}: Props) => {
  const { user } = useContext(MainContext);

  const [loading, setLoading] = useState(false);

  const roleChangeHandler = (changeType: string) => {
    setLoading(true);
    const payload = {
      userID: id,
      changeType,
    };

    axiosClient.post("/user/role-change", payload).then(() => {
      setLoading(false);
      getAllUsers();
    });
  };

  const promoteModalRef = useRef<HTMLDialogElement>(null);
  const demoteModalRef = useRef<HTMLDialogElement>(null);

  const openPromoteDialog = () => {
    promoteModalRef.current?.showModal();
  };

  const openDemoteDialog = () => {
    demoteModalRef.current?.showModal();
  };
  return (
    <tr>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <img
                src={profile ? profile : "/images/default/profile.png"}
                alt="Avatar Tailwind CSS Component"
              />
            </div>
          </div>
          <div>
            <div className="text-sm opacity-80">
              {name == user?.name ? "You" : name}
            </div>
          </div>
        </div>
      </td>
      <td>
        <div className="flex items-center gap-2">
          <span>{role}</span>
        </div>
      </td>
      <td>{loginMethod}</td>
      <th className="flex items-center gap-2">
        {id != user?.id && (
          <>
            {role != "admin" && (
              <>
                <button
                  disabled={loading}
                  type="button"
                  onClick={openPromoteDialog}
                  className="btn btn-sm btn-success"
                >
                  <FaArrowUpLong className="text-[18px]" />
                </button>
                {/* Promote Dialog */}
                <dialog
                  ref={promoteModalRef}
                  className="modal modal-bottom sm:modal-middle"
                >
                  <div className="modal-box">
                    <h3 className="text-lg font-bold">Attention !</h3>
                    <p className="py-4">
                      Are you sure you want to promote this user ?
                    </p>
                    <div className="modal-action">
                      <form method="dialog">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => roleChangeHandler("promote")}
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
              </>
            )}
            {role != "user" && (
              <>
                <button
                  disabled={loading}
                  type="button"
                  onClick={openDemoteDialog}
                  className="btn btn-sm btn-error"
                >
                  <FaArrowDownLong className="text-[18px]" />
                </button>
                {/* Demote Dialog */}
                <dialog
                  ref={demoteModalRef}
                  className="modal modal-bottom sm:modal-middle"
                >
                  <div className="modal-box">
                    <h3 className="text-lg font-bold">Attention !</h3>
                    <p className="py-4">
                      Are you sure you want to demote this user ?
                    </p>
                    <div className="modal-action">
                      <form method="dialog">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => roleChangeHandler("demote")}
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
              </>
            )}
          </>
        )}
        <button className="btn btn-sm btn-info">
          <IoEyeOutline className="text-[18px]" />
        </button>
      </th>
    </tr>
  );
};

export default UserData;
