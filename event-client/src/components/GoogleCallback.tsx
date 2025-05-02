import { useState, useEffect, useRef, useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import { MainContext } from "../context/MainContext";
import { User } from "../context/MainContextProvider";

import { ScaleLoader } from "react-spinners";

import axiosClient from "../axios-client";

const GoogleCallback = () => {
  const [data, setData] = useState<Data | null>(null);
  const { theme, setUser, setToken, user } = useContext(MainContext);
  const hasFetched = useRef(false);
  const location = useLocation();

  const navigate = useNavigate();

  type Data = {
    user: User;
    access_token: string;
    token_type: string;
  };

  useEffect(() => {
    if (hasFetched.current) return;

    hasFetched.current = true;

    axiosClient
      .get(`auth/callback/${location.search}`)
      .then(({ data }) => {
        setData(data);
        setToken(data.access_token);
      })
      .then(() => {
        navigate("/home");
      });
  }, [location.search, setUser, data, setToken, navigate, user]);

  return (
    <div className="mt-[15%] flex min-h-screen flex-col items-center gap-5">
      <p
        className={`text-xl font-bold ${theme == "dracula" ? "text-white" : "text-black"}`}
      >
        Redirecting to home....
      </p>
      <ScaleLoader color="#8BE9FD" />
    </div>
  );
};

export default GoogleCallback;
