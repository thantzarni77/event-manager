import React, { Suspense } from "react";
import { Outlet } from "react-router";
// import TopBar from "../../components/admin/TopBar";
// import Dock from "../../components/admin/Dock";

const TopBar = React.lazy(() => import("../../components/admin/TopBar"));
const Dock = React.lazy(() => import("../../components/admin/Dock"));

const Admin = () => {
  return (
    <div className="min-h-screen w-full bg-gray-100">
      <Suspense fallback={<></>}>
        <TopBar />
        <Outlet />
        <Dock />
      </Suspense>
    </div>
  );
};

export default Admin;
