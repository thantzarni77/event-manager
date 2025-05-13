import { Link } from "react-router";
import SingleOrg from "../../components/admin/SingleOrg";

const Organizations = () => {
  return (
    <div className="mx-auto my-4 flex min-h-screen w-[90%] flex-col items-start">
      <Link to={"/admin/orgs/add"} className="btn btn-primary">
        Add Organization
      </Link>
      <div className="my-5 flex min-h-screen w-full flex-wrap items-center justify-center gap-5 pb-24">
        <SingleOrg />
        <SingleOrg />
        <SingleOrg />
        <SingleOrg />
        <SingleOrg />
        <SingleOrg />
        <SingleOrg />
        <SingleOrg />
        <SingleOrg />
      </div>
    </div>
  );
};

export default Organizations;
