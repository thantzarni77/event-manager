import { Link } from "react-router";
import { Org } from "../../../pages/admin/orgs/Organizations";

type Props = Org;

const SingleOrg = ({ id, name, profile, description, memberCount }: Props) => {
  return (
    <Link
      to={`/admin/orgs/detail/${id}`}
      className="card bg-base-100 image-full my-2 w-[520px] shadow-sm transition duration-300 ease-in-out hover:scale-105 hover:cursor-pointer hover:shadow-md md:w-96"
    >
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
          <h1 className="w-fit">Members - {memberCount}</h1>
          <h1 className="w-fit">Events - 23</h1>
        </div>
      </div>
    </Link>
  );
};

export default SingleOrg;
