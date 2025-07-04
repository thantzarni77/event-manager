import React from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";

//user main layout
const UserMainLayout = React.lazy(() => import("./layout/UserMainLayout"));

//user main pages
const Home = React.lazy(() => import("./components/user/Home"));
const About = React.lazy(() => import("./pages/user/About"));
const MyEvents = React.lazy(() => import("./pages/user/MyEvents"));
const EventDetail = React.lazy(
  () => import("./components/user/Event/EventDetail"),
);
const Purchase = React.lazy(() => import("./components/user/Purchase"));

//login register
const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));
const GoogleCallback = React.lazy(() => import("./components/GoogleCallback"));

//admin main layout
const AdminMainLayout = React.lazy(
  () => import("./pages/admin/AdminMainLayout"),
);

//admin main pages
const AdminDashboard = React.lazy(() => import("./pages/admin/AdminDashboard"));
const Organizations = React.lazy(
  () => import("./pages/admin/orgs/Organizations"),
);
const PaymentMethods = React.lazy(
  () => import("./pages/admin/payment/PaymentMethods"),
);
const ManageUsers = React.lazy(() => import("./pages/admin/users/ManageUsers"));

//admin secondary pages
const OrgDetail = React.lazy(() => import("./components/admin/orgs/OrgDetail"));
const AddOrg = React.lazy(() => import("./components/admin/orgs/AddOrg"));
const EditOrg = React.lazy(() => import("./components/admin/orgs/EditOrg"));

//org main layout
const OrgMainLayout = React.lazy(() => import("./pages/org/OrgMainLayout"));

//org main pages
const OrgDashboard = React.lazy(() => import("./pages/org/OrgDashboard"));
const OrgEvents = React.lazy(() => import("./pages/org/OrgEvents"));
const Members = React.lazy(() => import("./pages/org/Members"));

//org secondary pages
const OrgEventAdd = React.lazy(() => import("./components/org/OrgEventAdd"));

//landing page
const Landing = React.lazy(() => import("./components/Landing"));

//error
const Error = React.lazy(() => import("./components/Error"));

import MainContextProvider from "./context/MainContextProvider";

import LoginMiddleware from "./helper/middleware/LoginMiddleware";
import UserLoginRoleCheck from "./helper/middleware/UserLoginRoleCheck";
import IsLoginAndUser from "./helper/middleware/IsLoginAndUser";
import IsLoginAndAdmin from "./helper/middleware/IsLoginAndAdmin";

import { Suspense } from "react";

const App = () => {
  const router = createBrowserRouter([
    //user && login register
    {
      path: "/",
      errorElement: <Error />,
      element: (
        <Suspense fallback={<></>}>
          <UserMainLayout />
        </Suspense>
      ),
      children: [
        {
          path: "/landing",
          element: (
            <LoginMiddleware currentPath="/landing">
              <Landing />
            </LoginMiddleware>
          ),
        },
        {
          index: true,
          element: <Navigate to="home" replace />,
        },
        {
          path: "home",
          element: (
            <UserLoginRoleCheck>
              <Home />
            </UserLoginRoleCheck>
          ),
        },
        { path: "about", element: <About /> },
        {
          path: "my-events",
          element: (
            <IsLoginAndUser>
              <MyEvents />
            </IsLoginAndUser>
          ),
        },
        {
          path: "events/:id",
          element: (
            <IsLoginAndUser>
              <EventDetail />
            </IsLoginAndUser>
          ),
        },
        {
          path: "events/:id/purchase",
          element: (
            <IsLoginAndUser>
              <Purchase />
            </IsLoginAndUser>
          ),
        },
        {
          path: "/login",
          index: true,
          element: (
            <LoginMiddleware currentPath="/login">
              <Login />
            </LoginMiddleware>
          ),
        },
        {
          path: "/register",
          element: (
            <LoginMiddleware currentPath={"/register"}>
              <Register />
            </LoginMiddleware>
          ),
        },
        { path: "/auth/google", element: <GoogleCallback /> },
      ],
    },

    //admin && superadmin
    {
      path: "/admin",
      element: <AdminMainLayout />,
      children: [
        {
          path: "dashboard",
          element: (
            <IsLoginAndAdmin>
              <AdminDashboard />
            </IsLoginAndAdmin>
          ),
        },
        {
          index: true,
          element: <Navigate to="/admin/dashboard" replace />,
        },
        {
          path: "users/list",
          element: (
            <IsLoginAndAdmin>
              <ManageUsers />
            </IsLoginAndAdmin>
          ),
        },
        {
          path: "orgs",
          children: [
            {
              path: "list",
              element: (
                <IsLoginAndAdmin>
                  <Organizations />
                </IsLoginAndAdmin>
              ),
            },
            {
              path: "add",
              element: (
                <IsLoginAndAdmin>
                  <AddOrg />
                </IsLoginAndAdmin>
              ),
            },
            {
              path: "detail/:id",
              element: (
                <IsLoginAndAdmin>
                  <OrgDetail />
                </IsLoginAndAdmin>
              ),
            },
            {
              path: "edit/:id",
              element: (
                <IsLoginAndAdmin>
                  <EditOrg />
                </IsLoginAndAdmin>
              ),
            },
          ],
        },
        {
          path: "payment-methods",
          element: (
            <IsLoginAndAdmin>
              <PaymentMethods />
            </IsLoginAndAdmin>
          ),
        },
      ],
    },

    //org admin && org members
    {
      path: "/org-admin",
      element: <OrgMainLayout />,
      children: [
        {
          path: "dashboard",
          element: <OrgDashboard />,
        },
        {
          index: true,
          element: <Navigate to="dashboard" replace />,
        },
        {
          path: "add",
          children: [
            {
              path: "events",
              element: <OrgEventAdd />,
            },
          ],
        },
        {
          path: "list",
          children: [
            {
              path: "members",
              element: <Members />,
            },
            {
              path: "events",
              element: <OrgEvents />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <MainContextProvider>
      <RouterProvider router={router} />
    </MainContextProvider>
  );
};

export default App;
