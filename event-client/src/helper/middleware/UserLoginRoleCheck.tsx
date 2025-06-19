import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { MainContext } from "../../context/MainContext";
import axiosClient from "../api/axios-client";

type Props = {
  children: React.ReactNode;
};

const UserLoginRoleCheck = ({ children }: Props) => {
  const navigate = useNavigate();
  const { user } = useContext(MainContext);
  const token = localStorage.getItem("access_token");
  const isOkay = useRef(false);

  useEffect(() => {
    if (token) {
      axiosClient.get("/user").then(({ data }) => {
        switch (data?.role) {
          case "user":
            isOkay.current = true;
            navigate("/home");
            break;

          case "superadmin":
            navigate("/admin/dashboard");
            break;

          case "admin":
            navigate("/admin/dashboard");
            break;

          case "org_admin":
            navigate("/org-admin/dashboard");
            break;

          case "org_user":
            navigate("org-user/dashboard");
            break;
        }
      });
    } else {
      navigate("/landing");
    }
  }, [token, navigate, user?.role]);

  if (isOkay.current) {
    return <>{children}</>;
  }
};

export default UserLoginRoleCheck;
