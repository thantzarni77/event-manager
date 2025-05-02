import { useContext } from "react";
import { MainContext } from "../../context/MainContext";

const AdminDashboard = () => {
  const { user } = useContext(MainContext);
  return (
    <div>
      Hello {user?.name}
      Welcome to Admin Dashboard
    </div>
  );
};

export default AdminDashboard;
