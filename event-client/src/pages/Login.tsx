import { createRef, useContext, useState } from "react";
import { LuLogIn } from "react-icons/lu";
import { Link, useNavigate } from "react-router";
import LoginWithGoogle from "../components/LoginWithGoogle";
import { MainContext } from "../context/MainContext";
import axiosClient from "../axios-client";

const Login = () => {
  const { token, loginUrl, setToken, setUser } = useContext(MainContext);
  const [error, setError] = useState<string | undefined | null>();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const emailRef = createRef<HTMLInputElement>();
  const passwordRef = createRef<HTMLInputElement>();

  const loginHandler = (event: React.FormEvent) => {
    setLoading(true);
    event.preventDefault();

    const payload = {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    };

    axiosClient
      .post("login", payload)
      .then(({ data }) => {
        setToken(data.access_token);
        setUser(data.user);
      })
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch(({ response }) => {
        setError(response.data.message);
        setLoading(false);
      });
  };

  if (token == null) {
    return (
      <div className="mx-auto my-4 flex min-h-screen w-full flex-col items-center gap-4">
        <h1 className="text-xl font-bold">Login here</h1>
        <div className="flex w-full flex-col items-center">
          <form
            className="mx-auto flex w-[80%] flex-col items-center gap-1"
            onSubmit={loginHandler}
          >
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
                <input
                  type="email"
                  placeholder="mail@site.com"
                  required
                  ref={emailRef}
                />
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
                  ref={passwordRef}
                  required
                  placeholder="Password"
                  minLength={8}
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                />
              </label>
              {error && (
                <div role="alert" id="alert" className="alert alert-warning">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 22 22"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <span>{error}</span>
                </div>
              )}
            </div>

            <p className="my-1">
              Forget Your Password ? Click{" "}
              <Link to={"#"} className="text-info underline">
                Here
              </Link>{" "}
              to reset.
            </p>

            <button
              disabled={loading}
              type="submit"
              className="btn btn-primary my-2 w-full lg:w-[50%]"
            >
              <LuLogIn size={"20px"} />
              Login
            </button>
          </form>

          <div className="flex w-[80%] flex-col items-center">
            {loginUrl && (
              <a
                href={loginUrl}
                className="btn btn-info my-2 w-full hover:cursor-pointer lg:w-[50%]"
              >
                <LoginWithGoogle />
              </a>
            )}

            <span>
              Don't have an account ? Register{" "}
              <Link to={"/register"} className="text-info underline">
                Here
              </Link>
            </span>
          </div>
        </div>
      </div>
    );
  }
};

export default Login;
