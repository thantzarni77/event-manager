import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import axiosClient from "../../axios-client";

type Props = {
  children?: React.ReactNode;
  currentPath?: string;
};

const IsLoginAndAdmin = ({ children }: Props) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");
  const isOkay = useRef(false);

  useEffect(() => {
    if (!token) {
      navigate("/landing");
      isOkay.current = true;
    }

    if (token) {
      axiosClient.get("/user").then(({ data }) => {
        if (data.role == "user") {
          navigate(-1);
          isOkay.current = true;
        }
      });
    }

    isOkay.current = true;
  }, [token, navigate]);

  if (isOkay.current) {
    return <>{children}</>;
  }
};

export default IsLoginAndAdmin;
