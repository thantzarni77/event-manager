import { createRef, useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import { ScaleLoader } from "react-spinners";
import { FaSearch } from "react-icons/fa";
import { MdFilterAltOff } from "react-icons/md";

import UserData from "../../components/admin/UserData";

type User = {
  id: number;
  name: string;
  email: string;
  profile: null | string;
  role: string;
  provider: string;
};

const ManageUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const userSearchRef = createRef<HTMLInputElement>();
  //ref on all radio button and clicking it when calling filter off to avoid confusing ui
  const allRadioRef = createRef<HTMLInputElement>();

  const getAllUsers = () => {
    setLoading(true);
    axiosClient.get("/users/list").then(({ data }) => {
      setUsers(data.users);
      setLoading(false);
    });
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const userSearchHandler = (
    type: string,
    value: string | undefined = undefined,
  ) => {
    setLoading(true);

    const payload = {
      searchKey: value || userSearchRef.current?.value,
      type,
    };

    axiosClient.post("/users/list/search", payload).then(({ data }) => {
      setUsers(data.searchedUsers);
      setLoading(false);
    });
  };

  return (
    <div className="mx-auto my-4 min-h-screen w-[90%]">
      <div className="flex w-full flex-col items-start gap-4 md:flex-row md:items-center">
        {/* search users */}
        <form
          method="GET"
          onSubmit={(e) => {
            e.preventDefault();
            userSearchHandler("search");
          }}
          className="flex items-center gap-4"
        >
          <label className="input">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              className="grow"
              placeholder="Search user's name"
              ref={userSearchRef}
              value={userSearchRef.current?.value}
            />
          </label>
          <button disabled={loading} type="submit" className="btn btn-primary">
            <FaSearch />
          </button>
          <button
            disabled={loading}
            type="button"
            className="btn btn-error"
            onClick={() => {
              allRadioRef.current?.click();
              getAllUsers();
            }}
          >
            <MdFilterAltOff />
          </button>
        </form>

        {/* filter users */}
        <div className="filter">
          <input
            className="btn filter-reset btn-error"
            type="radio"
            name="userRoles"
            aria-label="All"
            ref={allRadioRef}
            onChange={() => {
              getAllUsers();
            }}
          />
          <input
            className="btn"
            type="radio"
            name="userRoles"
            aria-label="User"
            onChange={() => {
              userSearchHandler("filter", "user");
            }}
          />
          <input
            className="btn"
            type="radio"
            name="userRoles"
            aria-label="Org"
            onChange={() => {
              userSearchHandler("filter", "org");
            }}
          />
          <input
            className="btn"
            type="radio"
            name="userRoles"
            aria-label="Admin"
            onChange={() => {
              userSearchHandler("filter", "admin");
            }}
          />
        </div>
      </div>
      {loading ? (
        <div>
          <div className="mt-[15%] flex min-h-screen flex-col items-center gap-5">
            <ScaleLoader color="#8BE9FD" />
          </div>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th className="text-neutral">Name</th>
                  <th className="text-neutral">Role</th>
                  <th className="text-neutral">Login Method</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users?.map((user) => {
                    return (
                      <UserData
                        key={user.id}
                        id={user.id}
                        name={user.name}
                        role={user.role}
                        profile={user.profile}
                        loginMethod={user.provider}
                        getAllUsers={getAllUsers}
                      />
                    );
                  })
                ) : (
                  <tr>
                    <td className="text-neutral">No user</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default ManageUsers;
