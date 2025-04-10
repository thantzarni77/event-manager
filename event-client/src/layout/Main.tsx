import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Helper/Footer";
import ScrollToTop from "../components/ScrollToTop";

const Main = () => {
  return (
    <div>
      {/* <ScrollRestoration /> */}
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;
