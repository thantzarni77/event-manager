import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";

import { LuLogIn } from "react-icons/lu";
import { FaEye } from "react-icons/fa";
import { IoIosEyeOff } from "react-icons/io";

import LoginWithGoogle from "../components/LoginWithGoogle";
import { MainContext } from "../context/MainContext";

import setRoute from "../helper/setRoute";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getGoogleLoginURL,
  GoogleLoginURL,
  login,
} from "../helper/api/apiFunctions";
import FormError from "../helper/FormError";
import { getError } from "../helper/api/errorHandler";

export interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  //access query client
  const queryClient = useQueryClient();

  const { token, setToken, setUser, backendError, setBackendError } =
    useContext(MainContext);

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  //show hide toggle
  const pwdToggle = () => {
    setShowPassword((prev) => !prev);
  };

  //hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    mode: "onBlur",
  });

  //get google login url
  const { data } = useQuery<GoogleLoginURL>({
    queryKey: ["googleURL"],
    queryFn: getGoogleLoginURL,
  });

  //login mutation
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setToken(data.access_token);
      setUser(data.user);
      const route = setRoute(data.user.role);
      queryClient.invalidateQueries({ queryKey: ["googleURL"] });
      setBackendError("");
      navigate(`${route}`);
    },
    onError: (err) => {
      const message = getError(err);
      setBackendError(message);
    },
  });

  const loginHandler = (payload: LoginFormData) => {
    loginMutation.mutate(payload);
  };

  if (token == null) {
    return (
      <div className="mx-auto my-4 flex min-h-screen w-full flex-col items-center gap-4">
        <h1 className="text-xl font-bold">Login here</h1>
        <div className="flex w-full flex-col items-center">
          <form
            className="mx-auto flex w-[80%] flex-col items-center gap-1"
            onSubmit={handleSubmit(loginHandler)}
          >
            <div className="flex w-full flex-col lg:w-[50%]">
              <label htmlFor="">Email</label>
              <label
                className={`input my-2 w-full ${errors.email || backendError ? "border-2 border-red-400" : ""}`}
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
                  placeholder="mail@gmail.com"
                  {...register("email", {
                    required: { value: true, message: "Email is required" },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Enter a valid email address",
                    },
                  })}
                />
              </label>
              {errors.email && <FormError message={errors.email.message} />}
            </div>

            <div className="my-2 flex w-full flex-col lg:w-[50%]">
              <label htmlFor="">Password</label>
              <label
                className={`input my-2 w-full ${errors.password || backendError ? "border-2 border-red-400" : ""}`}
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
                  {...register("password", {
                    required: { value: true, message: "Password is required" },
                  })}
                  placeholder="Password"
                />

                {!showPassword ? (
                  <div
                    onClick={pwdToggle}
                    className="text-[18px] hover:cursor-pointer"
                  >
                    <FaEye />
                  </div>
                ) : (
                  <div
                    onClick={pwdToggle}
                    className="text-[18px] hover:cursor-pointer"
                  >
                    <IoIosEyeOff />
                  </div>
                )}
              </label>
              {backendError && <FormError message={backendError} />}
              {errors.password && (
                <FormError message={errors.password.message} />
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
              disabled={loginMutation.isPending}
              type="submit"
              className="btn btn-primary my-2 w-full lg:w-[50%]"
            >
              <LuLogIn size={"20px"} />
              Login
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
