import { FaSearch } from "react-icons/fa";
import { MdFilterAltOff } from "react-icons/md";

import { searchUsers } from "../../../helper/api/apiFunctions";
import FormError from "../../../helper/FormError";
import { getError } from "../../../helper/api/errorHandler";

import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { MainContext } from "../../../context/MainContext";

type User = {
  id: number;
  name: string;
  email: string;
  profile: null | string;
  role: string;
  provider: string;
};

export interface SearchUserPayload {
  searchKey: string | null;
  type: string;
}

type SearchKey = Omit<SearchUserPayload, "type">;

type Props = {
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  allRadioRef?: React.RefObject<HTMLInputElement | null>;
};

const SearchUser = ({ setUsers, allRadioRef }: Props) => {
  const queryClient = useQueryClient();
  const { backendError, setBackendError } = useContext(MainContext);

  const { register, handleSubmit, reset } = useForm<SearchUserPayload>();

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

  //wrapper function to pass type args
  const onFormSubmit = (formData: SearchKey) => {
    const payload = {
      searchKey: formData.searchKey,
      type: "search",
    };
    userSearchHandler(payload);
  };

  const userSearchHandler = (payload: SearchUserPayload) => {
    searchUserMutate.mutate(payload);
  };
  return (
    <form
      method="GET"
      onSubmit={handleSubmit(onFormSubmit)}
      className="flex items-center gap-4"
    >
      <label className="input">
        <svg
          className="h-[1.5em] opacity-50"
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
          {...register("searchKey")}
          placeholder="Search user's name or email"
        />
        {backendError && <FormError message={backendError} />}
      </label>
      <button
        disabled={searchUserMutate.isPending}
        type="submit"
        className="btn btn-primary"
      >
        <FaSearch />
      </button>
      {allRadioRef && (
        <button
          disabled={searchUserMutate.isPending}
          type="button"
          className="btn btn-error"
          onClick={() => {
            allRadioRef.current?.click();
            reset();
            searchUserMutate.mutate({
              searchKey: "",
              type: "",
            });
          }}
        >
          <MdFilterAltOff />
        </button>
      )}
    </form>
  );
};

export default SearchUser;
