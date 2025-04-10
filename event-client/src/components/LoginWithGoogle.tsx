import { useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa6";
import { Link } from "react-router";

const LoginWithGoogle = () => {
  const [loginUrl, setLoginUrl] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/auth", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Something went wrong!");
      })
      .then((data) => setLoginUrl(data.url))
      .catch((error) => console.error(error));
  }, []);
  return (
    <div>
      {loginUrl ? (
        <Link className="btn btn-info w-full lg:w-full" to={loginUrl}>
          <FaGoogle size={"16px"} />
          <span>Login with Google</span>
        </Link>
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
};

export default LoginWithGoogle;
