import { createContext } from "react";
import { User } from "./MainContextProvider";

export type Value = {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  data: singleData[];
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  token: string | null;
  setToken: (token: string | null) => void;
};

type singleData = {
  id: string | number;
  title: string;
  type: string;
  image: string;
  location: string;
  date: string;
};

const initialValues: Value = {
  theme: "",
  setTheme: () => {},
  data: [],
  user: null,
  setUser: () => {},
  token: null,
  setToken: () => {},
};

export const MainContext = createContext(initialValues);
