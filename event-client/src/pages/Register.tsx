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

  const { token, setToken, setUser } = useContext(MainContext);

  const navigate = useNavigate();

  const [errors, setErrors] = useState<Errors>();
  const [loading, setLoading] = useState(false);

  const userNameRef = createRef<HTMLInputElement>();
  const emailRef = createRef<HTMLInputElement>();
  const passwordRef = createRef<HTMLInputElement>();
  const confirmPasswordRef = createRef<HTMLInputElement>();

  // const eyesOn = useRef<HTMLDivElement | null>(null);
  // const eyesOff = useRef<HTMLDivElement | null>(null);
  // const eyesOnConfirm = useRef<HTMLDivElement | null>(null);
  // const eyesOffConfirm = useRef<HTMLDivElement | null>(null);

  //fetch google login url
  const [loginUrl, setLoginUrl] = useState("");

  useEffect(() => {
    axiosClient
      .get("auth")
      .then(({ data }) => {
        setLoginUrl(data.url);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  // const pwdToggle = () => {
  //   if (!passwordRef.current) return;

  //   const currentType = passwordRef.current.type;
  //   // passwordRef.current.type = currentType === "password" ? "text" : "password";

  //   if (currentType == "password") {
  //     if (eyesOn.current) eyesOn.current.style.display = "none";

  //     if (eyesOff.current) eyesOff.current.style.display = "block";

  //     passwordRef.current.type = "text";
  //   } else {
  //     if (eyesOn.current) eyesOn.current.style.display = "block";

  //     if (eyesOff.current) eyesOff.current.style.display = "none";

  //     passwordRef.current.type = "password";
  //   }
  // };

  // const pwdConfirmToggle = () => {
  //   if (!confirmPasswordRef.current) return;

  //   const isPassword = confirmPasswordRef.current.type === "password";
  //   confirmPasswordRef.current.type = isPassword ? "text" : "password";

  //   if (eyesOnConfirm.current)
  //     eyesOnConfirm.current.style.display = isPassword ? "none" : "block";
  //   if (eyesOffConfirm.current)
  //     eyesOffConfirm.current.style.display = isPassword ? "block" : "none";
  // };

  const registerUserHandler = (event: React.FormEvent) => {
    setLoading(true);
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
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch(({ response }) => {
        setErrors(response.data.errors);
        setLoading(false);
      });
  };

  if (token == null) {
    return (
      <div className="mx-auto my-4 flex min-h-screen w-full flex-col items-center gap-4">
        <h1 className="text-xl font-bold">Register an account here</h1>
        <div className="flex w-full flex-col items-center">
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
                  pattern="[A-Za-z0-9\-]+( [A-Za-z0-9\-]+)*"
                  minLength={3}
                  maxLength={30}
                  title="Only letters, numbers or dash"
                />
              </label>
              {errors?.username && (
                <div role="alert" className="alert alert-warning">
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
                  <span>{errors.username[0]}</span>
                </div>
              )}
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
                <div role="alert" className="alert alert-warning">
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
                  <span>{errors.email[0]}</span>
                </div>
              )}
              <div className="validator-hint hidden">
                Enter valid email address
              </div>
            </div>

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

                {/* <div
                  onClick={pwdToggle}
                  ref={eyesOn}
                  className="text-[18px] hover:cursor-pointer"
                >
                  <FaEye />
                </div>
                <div
                  onClick={pwdToggle}
                  className="hidden text-[18px] hover:cursor-pointer"
                  ref={eyesOff}
                >
                  <IoIosEyeOff />
                </div> */}
              </label>
              <p className="text-sm text-gray-400">
                Must be more than 8 characters, including number, lowercase
                letter, uppercase letter
              </p>
              {errors?.password && (
                <div role="alert" className="alert alert-warning">
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
                  <span>{errors.password[0]}</span>
                </div>
              )}
            </div>

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

              {/* <div
                onClick={pwdConfirmToggle}
                ref={eyesOnConfirm}
                className="text-[18px] hover:cursor-pointer"
              >
                <FaEye />
              </div>
              <div
                onClick={pwdConfirmToggle}
                className="hidden text-[18px] hover:cursor-pointer"
                ref={eyesOffConfirm}
              >
                <IoIosEyeOff />
              </div> */}
              {errors?.password_confirmation && (
                <div role="alert" className="alert alert-warning">
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
                  <span>{errors.password_confirmation[0]}</span>
                </div>
              )}
            </div>

            <button
              disabled={loading}
              type="submit"
              className="btn btn-primary my-2 w-full lg:w-[50%]"
            >
              <LuLogIn size={"20px"} />
              Register
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
          </div>
        </div>

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
