import { useContext, useEffect } from "react";
import { Link, Navigate } from "react-router";

import { MainContext } from "../context/MainContext";

const Navbar = () => {
  const { theme, setTheme, setToken } = useContext(MainContext);

  //set theme to localstorage and change theme
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const logoutController = () => {
    setToken(null);

    return <Navigate to={"/"} />;
  };

  return (
    <div className="navbar bg-base-100 sticky top-0 z-50 opacity-90 shadow-sm backdrop-blur-xl">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-200 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/" className="text-base">
                Home
              </Link>
            </li>
            <li>
              <a className="text-base"> Portfolio</a>
            </li>
            <li>
              <a className="text-base">About</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Main center title */}
      <div className="navbar-center">
        <Link to={"/"} className="btn btn-ghost text-xl">
          Ticketer
        </Link>
      </div>

      <div className="navbar-end flex items-center">
        {/* theme switcher */}
        <div className="themeSwitcher">
          <label className="swap swap-rotate items-center">
            {/* use this only for ui and state changing  */}
            <input
              type="checkbox"
              className="theme-controller"
              checked={theme == "dracula"}
              onChange={() =>
                setTheme((prev) => (prev == "dracula" ? "cupcake" : "dracula"))
              }
            />

            {/* sun icon */}
            <svg
              className="swap-off h-6 w-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* moon icon */}
            <svg
              className="swap-on h-6 w-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
        </div>

        {/* search button */}
        <button className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {" "}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />{" "}
          </svg>
        </button>

        {/* notification */}
        <div className="dropdown dropdown-end">
          <button
            className="btn btn-ghost btn-circle"
            tabIndex={0}
            role="button"
          >
            {" "}
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />{" "}
              </svg>
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button>

          <div
            tabIndex={0}
            className="dropdown-content card card-sm bg-base-100 z-1 w-80 shadow-md lg:w-96"
          >
            {/* notification section */}
            <div className="card-body flex flex-col items-center">
              <div className="flex w-full items-center">
                <div className="badge badge-secondary badge-sm text-base font-bold">
                  1
                </div>

                <p className="text-end hover:cursor-pointer">
                  Mark all as read
                </p>
              </div>
              <hr className="w-full text-gray-500" />

              {/* notification messages */}
              <div className="flex w-full flex-col items-center gap-2">
                <div className="card bg-base-300 border-info hover:bg-base-200 w-full rounded border-b-1 p-2 hover:cursor-pointer">
                  <p>1d ago</p>
                  <p className="text-[14px]">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Maiores autem accusamus obcaecati, laboriosam eveniet
                  </p>
                </div>

                <div className="card bg-base-100 hover:bg-base-200 w-full rounded border-b-1 p-2 hover:cursor-pointer">
                  <p>2d ago</p>
                  <p className="text-[14px]">Hello Test Message</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Dropdown */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-8 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="text-base">Profile</a>
            </li>
            <li>
              <Link className="text-base" to={"my-events"}>
                My Events
              </Link>
            </li>

            <li>
              <a className="text-base">Settings</a>
            </li>
            <li>
              <a className="text-base" onClick={logoutController}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
