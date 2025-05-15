import { Link } from "react-router";
import SingleOrg from "../../../components/admin/orgs/SingleOrg";
import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
import { ScaleLoader } from "react-spinners";

export interface Org {
  id?: string | number;
  name: string;
  profile: string;
  description: string;
  memberCount?: string | number;
}

interface Membercount {
  org_id: null | number | string;
  member_count: number | string;
}

const Organizations = () => {
  const [orgs, setOrgs] = useState<Org[]>();
  const [memberCount, setMemberCount] = useState<Membercount[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosClient
      .get("/org/list")
      .then(({ data }) => {
        setOrgs(data.orgs);
        setMemberCount(data.orgMemberCounts);
        setLoading(false);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

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
            const match = memberCount?.find(
              (single) => single.org_id === org.id,
            );

            if (match) {
              return (
                <SingleOrg
                  key={org.id}
                  id={org.id}
                  name={org.name}
                  profile={org.profile}
                  description={org.description}
                  memberCount={match.member_count}
                />
              );
            }

            return null;
          })}
      </div>
    </div>
  );
};

export default Organizations;
