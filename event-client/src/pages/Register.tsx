import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { LuLogIn } from "react-icons/lu";
import { FaEye } from "react-icons/fa6";
import { IoIosEyeOff } from "react-icons/io";

import LoginWithGoogle from "../components/LoginWithGoogle";
import { MainContext } from "../context/MainContext";

import setRoute from "../helper/setRoute";

import {
  getGoogleLoginURL,
  GoogleLoginURL,
  signup,
} from "../helper/api/apiFunctions";
import { useForm } from "react-hook-form";
import FormError from "../helper/FormError";
import { getError } from "../helper/api/errorHandler";

export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const Register = () => {
  const queryClient = useQueryClient();

  const { token, setToken, setUser, backendError, setBackendError } =
    useContext(MainContext);

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [conShowPassword, setConshowPassword] = useState(false);

  const pwdToggle = (box: string) => {
    if (box == "password") {
      setShowPassword((prev) => !prev);
    } else {
      setConshowPassword((prev) => !prev);
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    mode: "onBlur",
  });

  const passwordValue = watch("password");

  //get google login url
  const { data } = useQuery<GoogleLoginURL>({
    queryKey: ["googleURL"],
    queryFn: getGoogleLoginURL,
  });

  //handle register
  const registerMutation = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      setToken(data.access_token);
      setUser(data.user);
      const route = setRoute(data.user.role);
      setBackendError("");
      queryClient.invalidateQueries({ queryKey: ["googleURL"] });
      navigate(`${route}`);
    },
    onError: (err) => {
      const message = getError(err);
      setBackendError(message);
    },
  });

  const registerUserHandler = (payload: RegisterFormData) => {
    registerMutation.mutate(payload);
  };

  if (token == null) {
    return (
      <div className="mx-auto my-4 flex min-h-screen w-full flex-col items-center gap-4">
        <h1 className="text-xl font-bold">Register an account here</h1>
        <div className="flex w-full flex-col items-center">
          <form
            className="mx-auto flex w-[80%] flex-col items-center gap-1"
            onSubmit={handleSubmit(registerUserHandler)}
          >
            <div className="my-2 flex w-full flex-col lg:w-[50%]">
              <label htmlFor="name">Username</label>
              <label
                className={`input my-2 w-full ${errors.username ? "border-2 border-red-400" : ""}`}
              >
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
                  placeholder="Username"
                  {...register("username", {
                    required: {
                      value: true,
                      message: "Username is required",
                    },
                    minLength: {
                      value: 1,
                      message: "Username should be more than one word",
                    },
                    maxLength: {
                      value: 30,
                      message: "Username should not be more than 30 words",
                    },
                  })}
                />
              </label>
              {errors.username && (
                <FormError message={errors.username.message} />
              )}
            </div>

            <div className="flex w-full flex-col lg:w-[50%]">
              <label htmlFor="email">Email</label>
              <label
                className={`input my-2 w-full ${errors.email ? "border-2 border-red-400" : ""}`}
              >
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
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email is required",
                    },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Enter a valid email address",
                    },
                  })}
                  placeholder="mail@site.com"
                />
              </label>
              {errors.email && <FormError message={errors.email.message} />}
            </div>

            <div className="my-2 flex w-full flex-col lg:w-[50%]">
              <label htmlFor="password">Password</label>
              <label
                className={`input my-2 w-full ${errors.password ? "border-2 border-red-400" : ""}`}
              >
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
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Password"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is required",
                    },
                    minLength: {
                      value: 8,
                      message: "Password should be at least 8 words",
                    },
                    pattern: {
                      value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                      message:
                        "Must be more than 8 characters, including number, lowercase letter, uppercase letter",
                    },
                  })}
                />

                {!showPassword ? (
                  <div
                    onClick={() => pwdToggle("password")}
                    className="text-[18px] hover:cursor-pointer"
                  >
                    <FaEye />
                  </div>
                ) : (
                  <div
                    onClick={() => pwdToggle("password")}
                    className="text-[18px] hover:cursor-pointer"
                  >
                    <IoIosEyeOff />
                  </div>
                )}
              </label>
              <p className="text-sm text-gray-400">
                Must be more than 8 characters, including number, lowercase
                letter, uppercase letter
              </p>
              {errors.password && (
                <FormError message={errors.password.message} />
              )}
            </div>

            <div className="flex w-full flex-col lg:w-[50%]">
              <label htmlFor="password_confirmation">Confirm Password</label>
              <label
                className={`input my-2 w-full ${errors.password_confirmation ? "border-2 border-red-400" : ""}`}
              >
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
                  type={conShowPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  {...register("password_confirmation", {
                    required: {
                      value: true,
                      message: "Confirmation password is required",
                    },
                    validate: (value) =>
                      value == passwordValue || "Passwords do not match",
                    minLength: {
                      value: 8,
                      message: "Password should be at least 8 words",
                    },
                    pattern: {
                      value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                      message:
                        "Must be more than 8 characters, including number, lowercase letter, uppercase letter",
                    },
                  })}
                />

                {!conShowPassword ? (
                  <div
                    onClick={() => pwdToggle("confirm")}
                    className="text-[18px] hover:cursor-pointer"
                  >
                    <FaEye />
                  </div>
                ) : (
                  <div
                    onClick={() => pwdToggle("confirm")}
                    className="text-[18px] hover:cursor-pointer"
                  >
                    <IoIosEyeOff />
                  </div>
                )}
              </label>
              {errors.password_confirmation && (
                <FormError message={errors.password_confirmation.message} />
              )}
              {backendError && <FormError message={backendError} />}
            </div>

            <button
              disabled={registerMutation.isPending}
              type="submit"
              className="btn btn-primary my-2 w-full lg:w-[50%]"
            >
              <LuLogIn size={"20px"} />
              Register
            </button>
          </form>

          <div className="flex w-[80%] flex-col items-center">
            {data && data.url && (
              <a
                href={data.url}
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
