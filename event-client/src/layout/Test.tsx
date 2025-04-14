import React from "react";
import ScrollToTop from "../components/user/ScrollToTop";
import Navbar from "../components/user/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/user/Helper/Footer";

const Test = () => {
  return (
    <div>
      {/* <ScrollRestoration /> */}
      <ScrollToTop />
      {/* {user?.role == "user" && <Navbar />} */}
      <Navbar />
      <Outlet />
      {/* {user?.role == "user" && <Footer />} */}
      <Footer />
    </div>
  );
};

export default Test;
