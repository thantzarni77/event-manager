import { Outlet } from "react-router";

import Footer from "../helper/Footer";
import ScrollToTop from "../components/user/scroll/ScrollToTop";
import UserNavbar from "../components/user/UserNavbar";

const UserMainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      {/* <ScrollRestoration /> */}
      <ScrollToTop />
      <UserNavbar />
      <span className="flex-1">
        <Outlet />
      </span>
      <Footer />
    </div>
  );
};

export default UserMainLayout;
