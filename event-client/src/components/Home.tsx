import { useContext, useEffect } from "react";
import Events from "../pages/Events";
import Carousel from "./Helper/Carousel";
import { MainContext } from "../context/MainContext";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";

const Home = () => {
  const { user, setUser, token } = useContext(MainContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token != null && token != undefined) {
      axiosClient
        .get("user")
        .then(({ data }) => {
          setUser(data);
        })
        .catch((err) => {
          throw err;
        });
    } else {
      navigate("/login");
    }
  }, [token, setUser, navigate]);

  if (token != null && user) {
    return (
      <div className="flex flex-col items-center">
        <h1>Hello {user?.name}</h1>
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
