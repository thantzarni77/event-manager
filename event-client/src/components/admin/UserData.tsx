import { useContext, useState } from "react";
import { MainContext } from "../../context/MainContext";
import { FaDownLong, FaUpLong } from "react-icons/fa6";
import axiosClient from "../../axios-client";

type Props = {
  id: number | string;
  name: string;
  role: string;
  loginMethod: string;
  profile: string | null;
  getAllUsers: () => void;
};

const UserData = ({
  id,
  name,
  role,
  loginMethod,
  profile,
  getAllUsers,
}: Props) => {
  const { user } = useContext(MainContext);

  const [loading, setLoading] = useState(false);

  const roleChangeHandler = (changeType: string) => {
    setLoading(true);
    const payload = {
      userID: id,
      changeType,
    };

    axiosClient.post("/user/role-change", payload).then(() => {
      setLoading(false);
      getAllUsers();
    });
  };
  return (
    <>
      <tr>
        <td className="text-neutral">
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={profile ? profile : "/images/default/profile.png"}
                  alt="Avatar Tailwind CSS Component"
                />
              </div>
            </div>
            <div>
              <div className="text-neutral text-sm opacity-80">
                {name == user?.name ? "You" : name}
              </div>
            </div>
          </div>
        </td>
        <td className="text-neutral">
          <div className="flex items-center gap-2">
            <span>{role}</span>
            {id != user?.id && (
              <>
                {role != "admin" && (
                  <button
                    disabled={loading}
                    type="button"
                    className="tooltip tooltip-top"
                    data-tip="promote"
                    onClick={() => roleChangeHandler("promote")}
                  >
                    <FaUpLong className="bg-success rounded-full p-1 text-[26px] hover:cursor-pointer" />
                  </button>
                )}
                {role != "user" && (
                  <button
                    disabled={loading}
                    type="button"
                    className="tooltip tooltip-top"
                    data-tip="demote"
                    onClick={() => roleChangeHandler("demote")}
                  >
                    <FaDownLong className="bg-error rounded-full p-1 text-[26px] hover:cursor-pointer" />
                  </button>
                )}
              </>
            )}
          </div>
        </td>
        <td className="text-neutral">{loginMethod}</td>
        <th>
          <button className="btn btn-sm btn-info">details</button>
        </th>
      </tr>
    </>
  );
};

export default UserData;
