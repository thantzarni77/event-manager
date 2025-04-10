import { useState, useEffect, useRef, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MainContext } from "../../context/MainContext";
import { User } from "../../context/MainContextProvider";

const GoogleCallback = () => {
  const [data, setData] = useState<Data | null>(null);
  const { setUser } = useContext(MainContext);
  const hasFetched = useRef(false);
  const location = useLocation();
  const navigate = useNavigate();

  type Data = {
    user: User;
    access_token: string;
    token_type: string;
  };

  useEffect(() => {
    if (hasFetched.current) return;

    hasFetched.current = true;

    fetch(`http://localhost:8000/api/auth/callback${location.search}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data);
        localStorage.setItem("access_token", data.access_token);
      })
      .then(() => {
        fetch(`http://localhost:8000/api/user`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setUser(data);
          });
      })
      .then(() => {
        navigate("/");
      });
  }, [location.search, setUser, navigate, data]);

  return <span className="min-h-screen">Redirecting to home....</span>;
};

export default GoogleCallback;
