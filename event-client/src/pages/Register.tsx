import { createRef, useContext, useEffect, useState } from "react";
import { LuLogIn } from "react-icons/lu";
import { Link, useNavigate } from "react-router";
import LoginWithGoogle from "../components/LoginWithGoogle";
import { MainContext } from "../context/MainContext";
import axiosClient from "../axios-client";

const Register = () => {
  type Errors = {
    username: string[];
    email: string[];
    password: string[];
    password_confirmation: string[];
  };

  const { token, setToken, setUser, loginUrl } = useContext(MainContext);
  const navigate = useNavigate();

  const [errors, setErrors] = useState<Errors>();

  const userNameRef = createRef<HTMLInputElement>();
  const emailRef = createRef<HTMLInputElement>();
  const passwordRef = createRef<HTMLInputElement>();
  const confirmPasswordRef = createRef<HTMLInputElement>();

  useEffect(() => {
    if (token != null) {
      navigate(-1);
    }
  }, [navigate, token]);

  const registerUserHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const payload = {
      username: userNameRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      password_confirmation: confirmPasswordRef.current?.value,
    };

    axiosClient
      .post("signup", payload)
      .then(({ data }) => {
        setToken(data.access_token);
        setUser(data.user);
      })
      .catch(({ response }) => {
        setErrors(response.data.errors);
      });
    // .then(() => {
    //   navigate("/");
    // });
  };

  if (token == null) {
    return (
      <div className="mx-auto my-4 flex min-h-screen w-full flex-col items-center gap-4">
        <h1 className="text-xl font-bold">Register an account here</h1>
        <form
          className="mx-auto flex w-[80%] flex-col items-center gap-1"
          onSubmit={registerUserHandler}
        >
          <div className="my-2 flex w-full flex-col lg:w-[50%]">
            <label htmlFor="username">Username</label>
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
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </g>
              </svg>
              <input
                type="input"
                name="username"
                ref={userNameRef}
                required
                placeholder="Username"
                pattern="[A-Za-z][A-Za-z0-9\-]*"
                minLength={3}
                maxLength={30}
                title="Only letters, numbers or dash"
              />
            </label>
            {errors?.username && (
              <div className="validator-hint">{errors.username[0]}</div>
            )}
            {/* <p className="validator-hint">
            Must be 3 to 30 characters
            <br />
            containing only letters, numbers or dash
          </p> */}
          </div>

          <div className="flex w-full flex-col lg:w-[50%]">
            <label htmlFor="email">Email</label>
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
                name="email"
                ref={emailRef}
                placeholder="mail@site.com"
                required
              />
            </label>
            {errors?.email && (
              <div className="text-sm text-red-400">{errors.email[0]}</div>
            )}
            <div className="validator-hint hidden">
              Enter valid email address
            </div>
          </div>

          {errors?.password && <div>{errors.password[0]}</div>}
          <div className="my-2 flex w-full flex-col lg:w-[50%]">
            <label htmlFor="password">Password</label>
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
                name="password"
                ref={passwordRef}
                placeholder="Password"
                minLength={8}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              />
            </label>
          </div>

          {errors?.password_confirmation && (
            <div>{errors.password_confirmation[0]}</div>
          )}
          <div className="flex w-full flex-col lg:w-[50%]">
            <label htmlFor="password_confirmation">Confirm Password</label>
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
                name="password_confirmation"
                ref={confirmPasswordRef}
                placeholder="Confirm Password"
                minLength={8}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              />
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-primary my-2 w-full lg:w-[50%]"
          >
            <LuLogIn size={"20px"} />
            Register
          </button>

          {loginUrl && (
            <a href={loginUrl} className="btn btn-info my-2 w-full lg:w-[50%]">
              <LoginWithGoogle />
            </a>
          )}
        </form>

        <span>
          Already have an account ? Login{" "}
          <Link to={"/login"} className="text-info underline">
            Here
          </Link>
        </span>
      </div>
    );
  }
};

export default Register;
