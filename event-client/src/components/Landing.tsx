import { Link } from "react-router";

const Landing = () => {
  return (
    <div className="flex w-full flex-col items-center gap-5">
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <div className="my-8 flex items-center justify-center gap-5">
              <Link className="btn btn-primary w-[40%]" to={"/login"}>
                Login
              </Link>

              <Link className="btn btn-info w-[40%]" to={"/register"}>
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
