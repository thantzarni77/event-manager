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

import MainContextProvider from "./context/MainContextProvider";
import Admin from "./pages/admin/Admin";
import AdminDashboard from "./pages/admin/AdminDashboard";

import UserLoginRoleCheck from "./helper/middleware/UserLoginRoleCheck";
import RegisterMiddleware from "./helper/middleware/RegisterMiddleware";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
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
        { path: "my-events", element: <MyEvents /> },
        { path: "events/:id", element: <EventDetail /> },
        { path: "events/:id/purchase", element: <Purchase /> },
        {
          path: "/login",
          index: true,
          element: (
            <UserLoginRoleCheck>
              <Login />
            </UserLoginRoleCheck>
          ),
        },
        {
          path: "/register",
          element: (
            <RegisterMiddleware>
              <Register />
            </RegisterMiddleware>
          ),
        },
        { path: "/auth/google", element: <GoogleCallback /> },
      ],
    },
    {
      path: "/admin",
      element: <Admin />,
      children: [{ index: true, element: <AdminDashboard /> }],
    },
  ]);

  return (
    <MainContextProvider>
      <RouterProvider router={router} />
    </MainContextProvider>
  );
};

export default App;
