import { useContext, useEffect } from "react";
import Events from "../pages/Events";
import Carousel from "./Helper/Carousel";
import { MainContext } from "../context/MainContext";
import { useNavigate } from "react-router";

const Home = () => {
  const access_token = localStorage.getItem("access_token");
  const { user, setUser } = useContext(MainContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (access_token != null && access_token != undefined) {
      fetch(`http://localhost:8000/api/user`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((user) => {
          setUser(user);
        });
    } else {
      navigate("/login");
    }
  }, [access_token, setUser, navigate]);
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
};

export default Home;
