import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";

type Props = {
  isAuthenticated?: boolean;
  userRole?: string;
  allowedRoles?: string[];
  currentPath?: string;
  children?: React.ReactNode;
};

const ProtectedRoute = ({
  isAuthenticated = false,
  allowedRoles = [],
  currentPath = "",
  userRole,
  children,
}: Props) => {
  const navigate = useNavigate();

  const isOkay = useRef(false);

  useEffect(() => {
    const isAuthPage = currentPath === "/login" || currentPath === "/register";
    const isProtectedPage = !isAuthPage;

    // if user is already loginned, -> block access to login and register page
    if (isAuthPage && isAuthenticated) {
      navigate(-1);
      return;
    }

    // Redirect unauthenticated users trying to access protected routes
    if (!isAuthenticated && isProtectedPage) {
      navigate("/login");
      return;
    }

    //  Block users without the required role
    const isRoleRestricted =
      allowedRoles.length > 0 && !allowedRoles.includes(userRole);
    if (isRoleRestricted) {
      navigate(-1);
    }

    isOkay.current = true;
  }, [isAuthenticated, userRole, allowedRoles, currentPath, navigate]);

  if (isOkay.current) {
    return <>{children}</>;
  }
};

export default ProtectedRoute;
