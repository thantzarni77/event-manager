import { createRef, useContext, useEffect, useState } from "react";

import UserData from "../../../components/admin/users/UserData";
import SearchUser from "../../../components/admin/users/SearchUser";
import { MainContext } from "../../../context/MainContext";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";

import { getAllUsers, searchUsers } from "../../../helper/api/apiFunctions";
import { getError } from "../../../helper/api/errorHandler";
import FormError from "../../../helper/FormError";

import { ScaleLoader } from "react-spinners";

export type Member = {
  id: number;
  name: string;
  email: string;
  profile: null | string;
  role: string;
  org_name?: string | null;
  provider: string;
};

const ManageUsers = () => {
  const queryClient = useQueryClient();

  const [users, setUsers] = useState<Member[]>([]);
  const { backendError, setBackendError } = useContext(MainContext);
  //ref on all radio button and clicking it when calling filter off to avoid confusing ui
  const allRadioRef = createRef<HTMLInputElement>();

  const { data, isLoading, isSuccess }: UseQueryResult<{ users: Member[] }> =
    useQuery({
      queryKey: ["allUsers"],
      queryFn: getAllUsers,
    });

  useEffect(() => {
    if (isSuccess && data) {
      if (data.users) {
        setUsers(data.users);
      }
    }

    return () => {
      setUsers([]);
    };
  }, [data, isSuccess]);

  const searchUserMutate = useMutation({
    mutationFn: searchUsers,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
      setUsers(data.searchedUsers);
      setBackendError("");
    },
    onError: (err) => {
      const message = getError(err);
      setBackendError(message);
    },
  });

  const userSearchHandler = (type: string, searchKey: string) => {
    const payload = {
      type,
      searchKey,
    };
    searchUserMutate.mutate(payload);
  };

  return (
    <div className="mx-auto my-4 min-h-screen w-[90%]">
      <div className="flex w-full flex-col items-start gap-4 md:flex-row md:items-center">
        {/* search users */}
        <SearchUser setUsers={setUsers} allRadioRef={allRadioRef} />

        {/* filter users */}
        <div className="filter">
          <input
            className="btn filter-reset btn-error"
            type="radio"
            name="userRoles"
            aria-label="All"
            ref={allRadioRef}
            onChange={() => {
              userSearchHandler("", "");
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
      {backendError && <FormError message={backendError} />}
      {isLoading || searchUserMutate.isPending ? (
        <div>
          <div className="mt-[15%] flex min-h-screen flex-col items-center gap-5">
            <ScaleLoader color="#8BE9FD" />
          </div>
        </div>
      ) : (
        <>
          <div className="my-6 min-h-screen overflow-x-auto py-5">
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
