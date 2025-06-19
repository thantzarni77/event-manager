import { useContext, useEffect } from "react";
import Events from "../../pages/user/Events";
import Carousel from "../../helper/Carousel";
import { MainContext } from "../../context/MainContext";
import { useNavigate } from "react-router";
import axiosClient from "../../helper/api/axios-client";

const Home = () => {
  const { user, token, setUser } = useContext(MainContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      if (user?.role == "admin") {
        navigate("/admin");
      }
      axiosClient
        .get("user")
        .then(({ data }) => {
          setUser(data);
          if (data.role == "admin") {
            navigate("/admin");
          }
        })
        .catch((err) => {
          throw err;
        });
    } else {
      navigate("/login");
    }
  }, [token, user?.role, navigate, setUser]);

  if (token && user?.role == "user") {
    return (
      <div className="flex flex-col items-center">
        <Carousel />
        <h1 className="my-6 text-center text-2xl font-bold md:text-3xl">
          Your Go to place for all the events
        </h1>
        <Events />
      </div>
    );
  }
};

export default Home;
