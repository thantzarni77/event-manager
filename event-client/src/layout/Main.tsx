import { Outlet, useNavigate } from "react-router-dom";

import Navbar from "../components/user/Navbar";
import Footer from "../components/user/Helper/Footer";
import ScrollToTop from "../components/user/ScrollToTop";
import { useContext, useEffect } from "react";
import { MainContext } from "../context/MainContext";
import axiosClient from "../axios-client";

const Main = () => {
  const { user, token, setUser } = useContext(MainContext);
  const navigate = useNavigate();

  useEffect(() => {
    axiosClient
      .get("user")
      .then(({ data }) => {
        setUser(data);
        if (data.role == "admin") {
          navigate("/admin");
        } else {
          navigate("/home");
        }
      })
      .catch((err) => {
        throw err;
      });
  }, [user?.role, navigate, token, setUser]);

  return (
    <div>
      {/* <ScrollRestoration /> */}
      <ScrollToTop />
      {/* {user?.role == "user" && <Navbar />} */}
      <Navbar />
      <Outlet />
      {/* {user?.role == "user" && <Footer />} */}
      <Footer />
    </div>
  );
};

export default Main;
