import { createRef, useState } from "react";
import axiosClient from "../../../axios-client";
import { FaSearch } from "react-icons/fa";
import { MdFilterAltOff } from "react-icons/md";
type User = {
  id: number;
  name: string;
  email: string;
  profile: null | string;
  role: string;
  provider: string;
};

type Props = {
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  allRadioRef?: React.RefObject<HTMLInputElement | null>;
  getAllUsers?: () => void;
};

const SearchUser = ({ setUsers, allRadioRef, getAllUsers }: Props) => {
  const userSearchRef = createRef<HTMLInputElement>();

  const [loading, setLoading] = useState(false);

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
          placeholder="Search user's name or email"
          ref={userSearchRef}
          value={userSearchRef.current?.value}
        />
      </label>
      <button disabled={loading} type="submit" className="btn btn-primary">
        <FaSearch />
      </button>
      {allRadioRef && getAllUsers && (
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
      )}
    </form>
  );
};

export default SearchUser;
