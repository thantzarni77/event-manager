import { Link } from "react-router";
import SingleOrg from "../../components/admin/SingleOrg";
import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import { ScaleLoader } from "react-spinners";

export interface Org {
  id?: string | number;
  name: string;
  profile: string;
  description: string;
}

const Organizations = () => {
  const [orgs, setOrgs] = useState<Org[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosClient
      .get("/org/list")
      .then(({ data }) => {
        setOrgs(data.orgs);
        setLoading(false);
      })
      .catch((err) => {
        throw err;
      });
  }, [orgs]);

  return (
    <div className="mx-auto my-4 flex min-h-screen w-[90%] flex-col items-start">
      <Link to={"/admin/orgs/add"} className="btn btn-primary">
        Add Organization
      </Link>
      <div className="my-5 flex w-full flex-wrap items-center justify-center gap-5 pb-24">
        {loading && (
          <div className="mt-[10%]">
            <div className="flex min-h-screen flex-col items-center gap-5">
              <ScaleLoader color="#8BE9FD" />
            </div>
          </div>
        )}
        {orgs &&
          orgs.map((org) => {
            return (
              <SingleOrg
                key={org.id}
                name={org.name}
                profile={org.profile}
                description={org.description}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Organizations;
