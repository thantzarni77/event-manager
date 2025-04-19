import { Outlet } from "react-router";

import Navbar from "../components/user/Navbar";
import Footer from "../helper/Footer";
import ScrollToTop from "../components/user/ScrollToTop";

const Main = () => {
  // useEffect(() => {
  //   if (token) {
  //     // axiosClient
  //     //   .get("user")
  //     //   .then(({ data }) => {
  //     //     setUser(data);

  //     if (user?.role == "admin") {
  //       navigate("/admin");
  //     } else {
  //       navigate("/home");
  //     }
  //     // })
  //     // .catch((err) => {
  //     //   throw err;
  //     // });
  //   }
  // }, [user?.role, navigate, setUser, token]);

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

export default Main;
