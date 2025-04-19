import { useContext } from "react";
import { MainContext } from "../../context/MainContext";

type Props = {
  name: string;
  role: string;
  loginMethod: string;
  profile: string | null;
};

const UserData = ({ name, role, loginMethod, profile }: Props) => {
  const { user } = useContext(MainContext);
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
        <td className="text-neutral">{role}</td>
        <td className="text-neutral">{loginMethod}</td>
        <th>
          <button className="btn btn-sm btn-info">details</button>
        </th>
      </tr>
    </>
  );
};

export default UserData;
