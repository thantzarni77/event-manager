import { Link } from "react-router";
import { Org } from "../../../pages/admin/orgs/Organizations";
import { MdPeople } from "react-icons/md";

type Props = Org;

const SingleOrg = ({ id, name, profile, description, memberCount }: Props) => {
  return (
    <Link
      to={`/admin/orgs/detail/${id}`}
      className="card bg-base-100 image-full my-2 h-52 w-[360px] shadow-sm transition duration-300 ease-in-out hover:scale-105 hover:cursor-pointer hover:shadow-md md:h-56 md:w-96"
    >
      <figure>
        <img
          className="rounded"
          src={`${import.meta.env.VITE_API_BASE_URL}/storage/${profile}`}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
        <div className="flex items-center justify-between">
          <h1 className="flex w-fit items-center gap-2">
            <MdPeople className="text-2xl" /> {memberCount}
          </h1>
          <h1 className="w-fit">Events - 23</h1>
        </div>
      </div>
    </Link>
  );
};

export default SingleOrg;
