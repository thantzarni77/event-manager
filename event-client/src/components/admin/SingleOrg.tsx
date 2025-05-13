import { Org } from "../../pages/admin/Organizations";

type Props = Org;

const SingleOrg = ({ name, profile, description }: Props) => {
  return (
    <div className="card bg-base-100 image-full my-2 w-[520px] shadow-sm hover:cursor-pointer md:w-96">
      <figure>
        <img
          src={`${import.meta.env.VITE_API_BASE_URL}/storage/${profile}`}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
        <div className="flex items-center justify-between">
          <h1 className="w-fit">Members - 123</h1>
          <h1 className="w-fit">Events - 23</h1>
        </div>
      </div>
    </div>
  );
};

export default SingleOrg;
