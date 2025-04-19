import { useEffect } from "react";
import { useNavigate } from "react-router";

type Props = {
  children?: React.ReactNode;
  currentPath?: string;
};

const LoginMiddleware = ({ currentPath, children }: Props) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (token) {
      // axiosClient.get("/user").then(({ data }) => {
      //   switch (data?.role) {
      //     case "user":
      //       navigate("/home");
      //       break;

      //     default:
      //       navigate("/admin");
      //       break;
      //   }
      // });
      navigate(-1);
    } else {
      navigate(`${currentPath}`);
    }
  }, [token, navigate, currentPath]);

  return <>{children}</>;
};

export default LoginMiddleware;
