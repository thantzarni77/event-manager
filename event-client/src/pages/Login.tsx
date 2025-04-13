import { useContext, useEffect } from "react";
import { LuLogIn } from "react-icons/lu";
import { Link, useNavigate } from "react-router";
import LoginWithGoogle from "../components/LoginWithGoogle";
import { MainContext } from "../context/MainContext";

const Login = () => {
  const { token, loginUrl } = useContext(MainContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (token != null) {
      navigate(-1);
    }
  }, [navigate, token]);

  if (token == null) {
    return (
      <div className="mx-auto my-4 flex min-h-screen w-full flex-col items-center gap-4">
        <h1 className="text-xl font-bold">Login here</h1>
        <form className="mx-auto flex w-[80%] flex-col items-center gap-1">
          <div className="flex w-full flex-col lg:w-[50%]">
            <label htmlFor="">Email</label>
            <label className="input validator my-2 w-full">
              <svg
                className="h-[1.3em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input type="email" placeholder="mail@site.com" required />
            </label>
            <div className="validator-hint hidden">
              Enter valid email address
            </div>
          </div>

          <div className="my-2 flex w-full flex-col lg:w-[50%]">
            <label htmlFor="">Password</label>
            <label className="input validator my-2 w-full">
              <svg
                className="h-[1.3em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                  <circle
                    cx="16.5"
                    cy="7.5"
                    r=".5"
                    fill="currentColor"
                  ></circle>
                </g>
              </svg>
              <input
                type="password"
                required
                placeholder="Password"
                minLength={8}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              />
            </label>
          </div>

          <p className="my-1">
            Forget Your Password ? Click{" "}
            <Link to={"#"} className="text-info underline">
              Here
            </Link>{" "}
            to reset.
          </p>

          <button
            type="submit"
            className="btn btn-primary my-2 w-full lg:w-[50%]"
          >
            <LuLogIn size={"20px"} />
            Login
          </button>

          {loginUrl && (
            <a href={loginUrl} className="btn btn-info my-2 w-full lg:w-[50%]">
              <LoginWithGoogle />
            </a>
          )}

          <span>
            Don't have an account ? Register{" "}
            <Link to={"/register"} className="text-info underline">
              Here
            </Link>
          </span>
        </form>
      </div>
    );
  }
};

export default Login;
