import { createRef, useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
import { ScaleLoader } from "react-spinners";

import UserData from "../../../components/admin/users/UserData";
import SearchUser from "../../../components/admin/users/SearchUser";

type User = {
  id: number;
  name: string;
  email: string;
  profile: null | string;
  role: string;
  org_name?: string | null;
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
        <SearchUser
          setUsers={setUsers}
          allRadioRef={allRadioRef}
          getAllUsers={getAllUsers}
        />

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
          <div className="my-6 min-h-screen overflow-x-auto pb-24">
            <div className="flex items-center gap-4">
              <p>Total Users</p>
              <div className="badge badge-sm badge-secondary font-bold">
                {users.length}
              </div>
            </div>

            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Login Method</th>
                  <th>Org Name</th>
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
                        org_name={user.org_name}
                        loginMethod={user.provider}
                        getAllUsers={getAllUsers}
                      />
                    );
                  })
                ) : (
                  <tr>
                    <td>No user</td>
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
