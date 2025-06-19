import { MdManageAccounts, MdOutlinePayment } from "react-icons/md";
import { Link, matchPath, useLocation, useNavigate } from "react-router";

import { useContext, useRef } from "react";
import { MainContext } from "../../context/MainContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../helper/api/apiFunctions";

import { VscOrganization } from "react-icons/vsc";
import { BsCalendar2Event } from "react-icons/bs";
import { GoSidebarCollapse } from "react-icons/go";
import { IoHomeOutline } from "react-icons/io5";
import { FaBuildingUser } from "react-icons/fa6";
import { RiLogoutBoxLine } from "react-icons/ri";

const AdminOrgDock = () => {
  const queryClient = useQueryClient();

  const { user, setToken, setUser } = useContext(MainContext);

  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;

  const { isOpen, setIsOpen } = useContext(MainContext);

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: (status) => {
      if (status == 204) {
        setToken(null);
        setUser(null);
        queryClient.clear();
        navigate("/landing");
      }
    },
  });

  const logoutController = () => {
    logoutMutation.mutate();
  };

  const confirmRef = useRef<HTMLDialogElement>(null);

  const dockItemClass = (isActive: boolean) =>
    ` flex items-center rounded-xl transition-all  duration-200 ease-out gap-3 px-2 py-2 transition-all duration-200
   ${isActive ? "bg-primary text-black shadow-lg" : " hover:bg-base-200"}`;

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div
      className={`bg-base-300 fixed top-0 left-0 z-50 h-full shadow-lg transition-all duration-300 ${
        isOpen ? "w-44" : "w-14"
      }`}
    >
      <div className="flex h-full flex-col items-stretch justify-between py-4">
        <ul className="flex flex-col gap-3 px-2 sm:gap-4">
          {/* Toggle Button */}
          <li>
            <button
              className={`hover:bg-base-200 flex w-full items-center justify-center rounded-lg p-2 hover:cursor-pointer ${isOpen ? "bg-base-100" : ""}`}
              onClick={toggleSidebar}
            >
              {isOpen ? (
                <GoSidebarCollapse
                  className={`text-2xl ${isOpen ? "text-primary" : ""}`}
                />
              ) : (
                <GoSidebarCollapse
                  className={`text-2xl ${isOpen ? "text-primary" : ""}`}
                />
              )}
            </button>
          </li>

          {/* Home */}
          <li>
            <Link
              to={"dashboard"}
              className={dockItemClass(
                currentPath == "/admin/dashboard" ||
                  currentPath == "/org-admin/dashboard",
              )}
            >
              <IoHomeOutline className="flex-shrink-0 text-2xl lg:text-[24px]" />
              <span
                className={`transition-opacity duration-200 ${isOpen ? "opacity-100" : "opacity-0"} overflow-hidden whitespace-nowrap`}
              >
                Home
              </span>
            </Link>
          </li>

          {/* Org Members */}
          {user?.role == "org_admin" && (
            <li>
              <Link
                to={"list/members"}
                className={dockItemClass(
                  currentPath == "/org-admin/list/members",
                )}
              >
                <FaBuildingUser className="flex-shrink-0 text-2xl lg:text-[24px]" />
                <span
                  className={`transition-opacity duration-200 ${isOpen ? "opacity-100" : "opacity-0"} overflow-hidden whitespace-nowrap`}
                >
                  Org Members
                </span>
              </Link>
            </li>
          )}

          {/* Org events */}
          {(user?.role == "org_admin" || user?.role == "org_user") && (
            <li>
              <Link
                to={"list/events"}
                className={dockItemClass(
                  currentPath == "/org-admin/list/events" ||
                    currentPath == "/org-admin/add/events",
                )}
              >
                <BsCalendar2Event className="flex-shrink-0 text-2xl lg:text-[24px]" />
                <span
                  className={`transition-opacity duration-200 ${isOpen ? "opacity-100" : "opacity-0"} overflow-hidden whitespace-nowrap`}
                >
                  Org Events
                </span>
              </Link>
            </li>
          )}
          {/* Manage Users */}
          {(user?.role == "superadmin" || user?.role == "admin") && (
            <li>
              <Link
                to="users/list"
                className={dockItemClass(currentPath == "/admin/users/list")}
              >
                <MdManageAccounts className="flex-shrink-0 text-2xl lg:text-[24px]" />
                <span
                  className={`transition-opacity duration-200 ${isOpen ? "opacity-100" : "opacity-0"} overflow-hidden whitespace-nowrap`}
                >
                  Users
                </span>
              </Link>
            </li>
          )}

          {/* Manage Organizations */}
          {(user?.role == "superadmin" || user?.role == "admin") && (
            <li>
              <Link
                to="orgs/list"
                className={dockItemClass(
                  currentPath == "/admin/orgs/list" ||
                    currentPath == "/admin/orgs/add" ||
                    matchPath("/admin/orgs/detail/:id", currentPath)
                    ? true
                    : false,
                )}
              >
                <VscOrganization className="flex-shrink-0 text-2xl lg:text-[24px]" />
                <span
                  className={`transition-opacity duration-200 ${isOpen ? "opacity-100" : "opacity-0"} overflow-hidden whitespace-nowrap`}
                >
                  Orgs
                </span>
              </Link>
            </li>
          )}

          {/* Payment methods */}
          {user?.role == "superadmin" && (
            <li>
              <Link
                to="payment-methods"
                className={dockItemClass(
                  currentPath == "/admin/payment-methods",
                )}
              >
                <MdOutlinePayment className="flex-shrink-0 text-2xl lg:text-[24px]" />
                <span
                  className={`transition-opacity duration-200 ${isOpen ? "opacity-100" : "opacity-0"} overflow-hidden whitespace-nowrap`}
                >
                  Payments
                </span>
              </Link>
            </li>
          )}
        </ul>

        {/* logout */}
        <ul onClick={() => confirmRef.current?.showModal()}>
          <li className="hover:bg-base-200 mx-2 rounded-xl py-2 hover:cursor-pointer">
            <span className="mx-2 flex items-center gap-3">
              <RiLogoutBoxLine className="flex-shrink-0 text-2xl lg:text-[24px]" />
              <span
                className={`transition-opacity duration-200 ${isOpen ? "opacity-100" : "opacity-0"} overflow-hidden whitespace-nowrap`}
              >
                Logout
              </span>
            </span>
          </li>
        </ul>
        {/* Promote Dialog */}
        <dialog ref={confirmRef} className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="text-lg font-bold">Attention !</h3>
            <p className="py-4">Are you sure you want to logout ?</p>
            <div className="modal-action">
              <form method="dialog">
                <div className="flex items-center gap-2">
                  <button
                    onClick={logoutController}
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
    </div>
  );
};

export default AdminOrgDock;
