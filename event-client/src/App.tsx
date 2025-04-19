import { createBrowserRouter, Navigate, RouterProvider } from "react-router";

import Main from "./layout/Main";

import Home from "./components/user/Home";
import About from "./pages/user/About";
import MyEvents from "./pages/user/MyEvents";
import EventDetail from "./components/user/Event/EventDetail";
import Purchase from "./components/user/Purchase";

import Login from "./pages/Login";
import Register from "./pages/Register";
import GoogleCallback from "./components/GoogleCallback";

import Admin from "./pages/admin/Admin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Landing from "./components/Landing";

import MainContextProvider from "./context/MainContextProvider";

import LoginMiddleware from "./helper/middleware/LoginMiddleware";
import UserLoginRoleCheck from "./helper/middleware/UserLoginRoleCheck";
import IsLoginAndUser from "./helper/middleware/IsLoginAndUser";
import IsLoginAndAdmin from "./helper/middleware/IsLoginAndAdmin";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
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
      element: (
        <UserLoginRoleCheck>
          <Admin />
        </UserLoginRoleCheck>
      ),
      children: [
        {
          index: true,
          element: (
            <IsLoginAndAdmin>
              <AdminDashboard />
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
