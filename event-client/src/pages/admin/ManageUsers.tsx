import React, { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import { ScaleLoader } from "react-spinners";

const UserData = React.lazy(() => import("../../components/admin/UserData"));

type User = {
  id: number;
  name: string;
  email: string;
  profile: null | string;
  role: string;
  provider: string;
};

const ManageUsers = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosClient.get("/users/list").then(({ data }) => {
      setUsers(data.users);
      setLoading(false);
    });
  }, []);
  return (
    <div className="mx-auto my-4 w-[90%]">
      {loading ? (
        <div>
          {" "}
          <div className="mt-[15%] flex min-h-screen flex-col items-center gap-5">
            <ScaleLoader color="#8BE9FD" />
          </div>
        </div>
      ) : (
        <>
          <form className="flex items-center gap-4">
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
              <input type="search" className="grow" placeholder="Search" />
            </label>
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </form>

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
                {users?.map((user) => {
                  return (
                    <UserData
                      key={user.id}
                      name={user.name}
                      role={user.role}
                      profile={user.profile}
                      loginMethod={user.provider}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default ManageUsers;
