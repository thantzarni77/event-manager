import { createBrowserRouter, RouterProvider } from "react-router-dom";

import About from "./pages/About";
import Main from "./layout/Main";
import MyEvents from "./pages/MyEvents";
import Home from "./components/Home";
import EventDetail from "./components/Event/EventDetail";
import Purchase from "./components/Purchase";
import Login from "./pages/Login";
import Register from "./pages/Register";
import GoogleCallback from "./components/Helper/GoogleCallback";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/auth/google",
          element: <GoogleCallback />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "events/:id",
          element: <EventDetail />,
        },
        {
          path: "events/:id/purchase",
          element: <Purchase />,
        },
        {
          path: "my-events",
          element: <MyEvents />,
        },
        {
          path: "about",
          element: <About />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
