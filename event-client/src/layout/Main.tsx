import { Outlet } from "react-router";

import Navbar from "../components/user/Navbar";
import Footer from "../helper/Footer";
import ScrollToTop from "../components/user/scroll/ScrollToTop";

const Main = () => {
  return (
    <div className="flex min-h-screen flex-col">
      {/* <ScrollRestoration /> */}
      <ScrollToTop />
      <Navbar />
      <span className="flex-1">
        <Outlet />
      </span>
      <Footer />
    </div>
  );
};

export default Main;
