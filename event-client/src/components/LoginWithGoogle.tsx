import { FaGoogle } from "react-icons/fa6";

const LoginWithGoogle = () => {
  return (
    <button className="flex items-center gap-2 hover:cursor-pointer">
      <FaGoogle size={"16px"} />
      <span>Login with Google</span>
    </button>
  );
};

export default LoginWithGoogle;
