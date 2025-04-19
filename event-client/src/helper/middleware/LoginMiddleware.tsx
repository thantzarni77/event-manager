import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";

type Props = {
  children?: React.ReactNode;
  currentPath?: string;
};

const LoginMiddleware = ({ currentPath, children }: Props) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");
  const isOkay = useRef(false);

  useEffect(() => {
    if (token) {
      navigate(-1);
      isOkay.current = true;
    } else {
      navigate(`${currentPath}`);
      isOkay.current = true;
    }
  }, [token, navigate, currentPath]);

  if (isOkay.current) {
    return <>{children}</>;
  }
};

export default LoginMiddleware;
