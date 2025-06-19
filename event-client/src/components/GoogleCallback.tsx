import { useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import { MainContext } from "../context/MainContext";
import { User } from "../context/MainContextProvider";

import { ScaleLoader } from "react-spinners";

import setRoute from "../helper/setRoute";
import { useQuery } from "@tanstack/react-query";
import { googleLogin } from "../helper/api/apiFunctions";

export interface GoogleLoginData {
  user: User;
  access_token: string;
  token_type: string;
}

const GoogleCallback = () => {
  const { theme, setUser, setToken } = useContext(MainContext);
  const location = useLocation();

  const navigate = useNavigate();

  const { data, isSuccess } = useQuery<GoogleLoginData>({
    queryKey: ["googleLogin", location.search],
    queryFn: () => googleLogin(location.search),
    enabled: !!location.search, // only run if location is present
    retry: false,
    gcTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (isSuccess && data) {
      if (data.user && data.access_token) {
        setUser(data.user);
        setToken(data.access_token);
        const route = setRoute(data.user.role);
        navigate(`${route}`);
      }
    }
  }, [isSuccess, data, navigate, setToken, setUser]);

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
