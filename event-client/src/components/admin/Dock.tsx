import { MdManageAccounts, MdOutlinePayment } from "react-icons/md";
import { Link, matchPath, useLocation } from "react-router";

import { useContext } from "react";
import { MainContext } from "../../context/MainContext";
import { VscOrganization } from "react-icons/vsc";
import { BsCalendar2Event } from "react-icons/bs";
import { GoSidebarCollapse } from "react-icons/go";
import { IoHomeOutline } from "react-icons/io5";
import { FaBuildingUser } from "react-icons/fa6";
import Logout from "../../helper/Logout";

const Dock = () => {
  const { user } = useContext(MainContext);
  const location = useLocation();

  const currentPath = location.pathname;

  const { isOpen, setIsOpen } = useContext(MainContext);

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

          {/* Stats */}
          <li>
            <a className={dockItemClass(currentPath == "/")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
            <span
              className={`transition-opacity duration-200 ${isOpen ? "opacity-100" : "opacity-0"} overflow-hidden whitespace-nowrap`}
            >
              Stats
            </span>
          </li>
        </ul>

        <ul>
          <li className="hover:bg-base-200 mx-2 rounded-xl py-2 hover:cursor-pointer">
            <Logout isIcon={true} />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dock;
