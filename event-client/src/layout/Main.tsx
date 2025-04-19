import { Outlet } from "react-router";

import Navbar from "../components/user/Navbar";
import Footer from "../helper/Footer";
import ScrollToTop from "../components/user/scroll/ScrollToTop";

const Main = () => {
  return (
    <div className="flex min-h-screen flex-col">
      {/* <ScrollRestoration /> */}
      <ScrollToTop />
      {/* {user?.role == "user" && <Navbar />} */}
      <Navbar />
      <span className="flex-1">
        <Outlet />
      </span>
      {/* {user?.role == "user" && <Footer />} */}
      <Footer />
    </div>
  );
};

export default Main;
