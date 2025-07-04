import { useEffect, useState } from "react";
import type { Value } from "./MainContext";
import { MainContext } from "./MainContext";
import axiosClient from "../helper/api/axios-client";

export type User = {
  id: number;
  name: string;
  email: string;
  email_verified_at: null;
  profile: null | string;
  role: string;
  org_id: null | string;
  provider: string;
  provider_id: null | string | number;
  provider_token: null | string | number;
  created_at: string;
  updated_at: string;
};

//sample data
const data = [
  {
    id: 1,
    title: "YOASOBI HALL TOUR 2025",
    type: "Concert",
    image: "/images/events/YOASOBI_2025.webp",
    location: "Forum LA Inglewood",
    date: "2025-03-25",
  },
  {
    id: 2,
    title: "Alice in Borderland Season 3",
    type: "Movie",
    image: "/images/events/ALBS3.jpg",
    location: "Avex Theater",
    date: "2025-03-28",
  },
  {
    id: 3,
    title: "Alice in Borderland Season 3",
    type: "Movie",
    image: "/images/events/ALBS3.jpg",
    location: "Avex Theater",
    date: "2025-03-29",
  },
  {
    id: 4,
    title: "Alice in Borderland Season 3",
    type: "Movie",
    image: "/images/events/ALBS3.jpg",
    location: "Avex Theater",
    date: "2025-04-25",
  },
  {
    id: 5,
    title: "Alice in Borderland Season 3",
    type: "Movie",
    image: "/images/events/ALBS3.jpg",
    location: "Avex Theater",
    date: "2025-04-01",
  },
  {
    id: 6,
    title: "YOASOBI HALL TOUR 2025",
    type: "Concert",
    image: "/images/events/YOASOBI_2025.webp",
    location: "Forum LA Inglewood",
    date: "2025-04-02",
  },
  {
    id: 7,
    title: "YOASOBI HALL TOUR 2025",
    type: "Concert",
    image: "/images/events/YOASOBI_2025.webp",
    location: "Forum LA Inglewood",
    date: "2025-03-26",
  },
  {
    id: 8,
    title: "YOASOBI HALL TOUR 2025",
    type: "Concert",
    image: "/images/events/YOASOBI_2025.webp",
    location: "Forum LA Inglewood",
    date: "2025-04-29",
  },
  {
    id: 9,
    title: "YOASOBI HALL TOUR 2025",
    type: "Concert",
    image: "/images/events/YOASOBI_2025.webp",
    location: "Forum LA Inglewood",
    date: "2025-05-26",
  },
  {
    id: 10,
    title: "Alice in Borderland Season 3",
    type: "Movie",
    image: "/images/events/ALBS3.jpg",
    location: "Avex Theater",
    date: "2025-03-26",
  },
];

const MainContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dracula",
  );

  const [user, setUser] = useState<User | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  const [token, _setToken] = useState(localStorage.getItem("access_token"));

  const [backendError, setBackendError] = useState("");

  const setToken = (token: string | null) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("access_token", token);
    } else {
      localStorage.removeItem("access_token");
    }
  };

  useEffect(() => {
    if (token) {
      axiosClient.get("user").then(({ data }) => {
        setUser(data);
      });
    }
  }, [token]);

  const values: Value = {
    theme,
    setTheme,
    data,
    user,
    setUser,
    token,
    setToken,
    isOpen,
    setIsOpen,
    backendError,
    setBackendError,
  };

  return <MainContext.Provider value={values}>{children}</MainContext.Provider>;
};

export default MainContextProvider;
