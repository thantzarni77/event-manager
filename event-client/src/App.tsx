import React from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";

const Main = React.lazy(() => import("./layout/Main"));

const Home = React.lazy(() => import("./components/user/Home"));
const About = React.lazy(() => import("./pages/user/About"));
const MyEvents = React.lazy(() => import("./pages/user/MyEvents"));
const EventDetail = React.lazy(
  () => import("./components/user/Event/EventDetail"),
);
const Purchase = React.lazy(() => import("./components/user/Purchase"));

const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));
const GoogleCallback = React.lazy(() => import("./components/GoogleCallback"));

const Admin = React.lazy(() => import("./pages/admin/Admin"));
const AdminDashboard = React.lazy(() => import("./pages/admin/AdminDashboard"));
const Landing = React.lazy(() => import("./components/Landing"));

import MainContextProvider from "./context/MainContextProvider";

import LoginMiddleware from "./helper/middleware/LoginMiddleware";
import UserLoginRoleCheck from "./helper/middleware/UserLoginRoleCheck";
import IsLoginAndUser from "./helper/middleware/IsLoginAndUser";

import { Suspense } from "react";
import ManageUsers from "./pages/admin/ManageUsers";
import IsLoginAndAdmin from "./helper/middleware/IsLoginAndAdmin";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<>...</>}>
          <Main />
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

    {
      path: "/admin",
      element: <Admin />,
      children: [
        {
          index: true,
          path: "dashboard",
          element: (
            <IsLoginAndAdmin>
              <AdminDashboard />
            </IsLoginAndAdmin>
          ),
        },
        {
          path: "users/list",
          element: (
            <IsLoginAndAdmin>
              <ManageUsers />
            </IsLoginAndAdmin>
          ),
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
