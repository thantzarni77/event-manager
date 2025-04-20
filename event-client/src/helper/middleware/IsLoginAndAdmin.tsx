import { useEffect } from "react";
import { useNavigate } from "react-router";
import axiosClient from "../../axios-client";

type Props = {
  children?: React.ReactNode;
};

const IsLoginAndAdmin = ({ children }: Props) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (!token) {
      navigate("/landing");
    }

    if (token) {
      axiosClient.get("/user").then(({ data }) => {
        if (data.role == "user") {
          navigate(-1);
        }
      });
    }
  }, [token, navigate]);

  return <>{children}</>;
};

export default IsLoginAndAdmin;
