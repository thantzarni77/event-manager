import React, { Suspense, useContext } from "react";
import { Outlet } from "react-router";
import ScrollToTop from "../../components/user/scroll/ScrollToTop";
import { MainContext } from "../../context/MainContext";

const AdminOrgTopBar = React.lazy(
  () => import("../../components/admin/AdminOrgTopBar"),
);
const Dock = React.lazy(() => import("../../components/admin/AdminOrgDock"));

const AdminMainLayout = () => {
  const { isOpen } = useContext(MainContext);
  return (
    <div
      className={`min-h-screen w-full overflow-hidden transition-all duration-200 ${isOpen ? "pl-[178px]" : "pl-[60px]"}`}
    >
      <Suspense fallback={<></>}>
        <ScrollToTop />
        <AdminOrgTopBar />
        <Outlet />
        <Dock />
      </Suspense>
    </div>
  );
};

export default AdminMainLayout;
