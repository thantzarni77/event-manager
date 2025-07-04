import { useEffect } from "react";
import { useNavigate } from "react-router";
import axiosClient from "../api/axios-client";

type Props = {
  children: React.ReactNode;
};

const IsLoginAndUser = ({ children }: Props) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (!token) {
      navigate("/landing");
    }

    if (token) {
      axiosClient.get("/user").then(({ data }) => {
        if (data.role != "user") {
          navigate("/admin/dashboard");
        }
      });
    }
  }, [token, navigate]);

  return <>{children}</>;
};

export default IsLoginAndUser;
