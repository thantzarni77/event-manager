import { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { MainContext } from "../../context/MainContext";
import axiosClient from "../../axios-client";

const Admin = () => {
  const { setToken, setUser } = useContext(MainContext);
  const navigate = useNavigate();

  const logoutController = () => {
    axiosClient.get("user/destroy").then((response) => {
      if (response.status == 204) {
        setToken(null);
        setUser(null);
        navigate("/login");
      }
    });
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-black p-4 text-white">
        <span>Admin Panel</span>
        <button
          className="mx-20 hover:cursor-pointer"
          onClick={logoutController}
        >
          Logout
        </button>
      </div>

      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Admin;
