import { BiLogOut } from "react-icons/bi";
import { MdManageAccounts } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router";
import axiosClient from "../../axios-client";
import { useContext } from "react";
import { MainContext } from "../../context/MainContext";

const Dock = () => {
  const { setToken, setUser, user } = useContext(MainContext);
  const navigate = useNavigate();
  const location = useLocation();

  const logoutController = () => {
    axiosClient.get("user/destroy").then((response) => {
      if (response.status === 204) {
        setToken(null);
        setUser(null);
        navigate("/landing");
      }
    });
  };

  const currentPath = location.pathname;

  const dockItemClass = (isActive: boolean) =>
    `relative flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200 ease-out hover:scale-110 hover:-translate-y-1
   ${isActive ? "bg-primary text-black shadow-lg" : ""}`;

  return (
    <div className="fixed bottom-0 left-1/2 z-50 w-full -translate-x-1/2">
      <div className="bg-base-300 flex items-end justify-center gap-3 px-3 py-1 shadow-lg backdrop-blur-md sm:gap-4 sm:px-4 sm:py-2">
        <ul className="flex gap-3 sm:gap-4">
          {/* Home */}
          <li className="tooltip tooltip-top" data-tip="Home">
            <Link
              to={"dashboard"}
              className={dockItemClass(currentPath == "/admin/dashboard")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 lg:h-8 lg:w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </Link>
          </li>

          {/* Manage Users */}
          {user?.role == "superadmin" && (
            <li className="tooltip tooltip-top" data-tip="Manage Users">
              <Link
                to="users/list"
                className={dockItemClass(currentPath == "/admin/users/list")}
              >
                <MdManageAccounts className="text-2xl lg:text-[32px]" />
              </Link>
            </li>
          )}

          {/* Details */}
          <li className="tooltip tooltip-top" data-tip="Details">
            <a className={dockItemClass(currentPath == "/")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 lg:h-8 lg:w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </a>
          </li>

          {/* Stats */}
          <li className="tooltip tooltip-top" data-tip="Stats">
            <a className={dockItemClass(currentPath == "/")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 lg:h-8 lg:w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </a>
          </li>

          {/* Logout */}
          <li className="tooltip tooltip-top" data-tip="Logout">
            <button
              onClick={logoutController}
              className={dockItemClass(currentPath == "")}
            >
              <BiLogOut className="text-2xl lg:text-[32px]" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dock;
