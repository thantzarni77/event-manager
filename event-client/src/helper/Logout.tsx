import { createRef, useContext } from "react";
import axiosClient from "../axios-client";
import { MainContext } from "../context/MainContext";
import { useNavigate } from "react-router";
import { RiLogoutBoxLine } from "react-icons/ri";

interface Props {
  isIcon: boolean;
}

const Logout = ({ isIcon }: Props) => {
  const { setUser, setToken } = useContext(MainContext);

  const navigate = useNavigate();

  const { isOpen } = useContext(MainContext);

  const logoutController = () => {
    axiosClient.get("user/destroy").then((response) => {
      if (response.status == 204) {
        setToken(null);
        setUser(null);
        navigate("/landing");
      }
    });
  };

  const confirmRef = createRef<HTMLDialogElement>();
  return (
    <>
      {/* Promote Dialog */}
      <dialog ref={confirmRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Attention !</h3>
          <p className="py-4">Are you sure you want to logout ?</p>
          <div className="modal-action">
            <form method="dialog">
              <div className="flex items-center gap-2">
                <button onClick={logoutController} className="btn btn-success">
                  Yes
                </button>
                <button className="btn btn-error">No</button>
              </div>
            </form>
          </div>
        </div>
      </dialog>

      <li>
        <a
          className="text-base"
          onClick={() => {
            confirmRef.current?.showModal();
          }}
        >
          {isIcon ? (
            <li className="mx-2 flex items-center gap-3">
              <RiLogoutBoxLine className="flex-shrink-0 text-2xl lg:text-[24px]" />
              <span
                className={`transition-opacity duration-200 ${isOpen ? "opacity-100" : "opacity-0"} overflow-hidden whitespace-nowrap`}
              >
                Logout
              </span>
            </li>
          ) : (
            "Logout"
          )}
        </a>
      </li>
    </>
  );
};

export default Logout;
