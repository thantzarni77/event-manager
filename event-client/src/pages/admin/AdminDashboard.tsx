import { useContext } from "react";
import { MainContext } from "../../context/MainContext";

const AdminDashboard = () => {
  const { user } = useContext(MainContext);
  return (
    <div className="text-black">
      Hello {user?.name}
      Welcome to Admin Dashboard
    </div>
  );
};

export default AdminDashboard;
