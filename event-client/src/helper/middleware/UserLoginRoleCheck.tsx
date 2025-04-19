import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { MainContext } from "../../context/MainContext";
import axiosClient from "../../axios-client";

type Props = {
  currentPath?: string;
  children?: React.ReactNode;
};

const UserLoginRoleCheck = ({ currentPath, children }: Props) => {
  const navigate = useNavigate();
  const { user } = useContext(MainContext);
  const token = localStorage.getItem("access_token");
  const isOkay = useRef(false);

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
        isOkay.current = true;
      });
    } else {
      navigate("/landing");
      isOkay.current = true;
    }
  }, [token, navigate, currentPath, user?.role]);

  if (isOkay.current) {
    return <>{children}</>;
  }
};

export default UserLoginRoleCheck;
