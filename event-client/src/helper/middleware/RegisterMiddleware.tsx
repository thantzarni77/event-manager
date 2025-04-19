import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { MainContext } from "../../context/MainContext";
import axiosClient from "../../axios-client";

type Props = {
  children?: React.ReactNode;
};

const RegisterMiddleware = ({ children }: Props) => {
  const navigate = useNavigate();
  const { user } = useContext(MainContext);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (token) {
      axiosClient.get("/user").then(({ data }) => {
        switch (data?.role) {
          case "user":
            navigate("/home");
            break;

          default:
            navigate("/admin");
            break;
        }
      });
    } else {
      navigate("/register");
    }
  }, [token, navigate, user?.role]);

  return <>{children}</>;
};

export default RegisterMiddleware;
