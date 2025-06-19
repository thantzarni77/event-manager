import { useNavigate } from "react-router";

const Error = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1 className="text-2xl">Error</h1>
      <button
        onClick={() => {
          navigate(-1);
        }}
        className="rounded-md bg-black p-2 text-white hover:cursor-pointer"
      >
        Back
      </button>
    </div>
  );
};

export default Error;
