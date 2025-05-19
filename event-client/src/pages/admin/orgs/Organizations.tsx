import { Link } from "react-router";
import SingleOrg from "../../../components/admin/orgs/SingleOrg";
import { createRef, useCallback, useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
import { ScaleLoader } from "react-spinners";
import { FaFilter } from "react-icons/fa6";
import { MdFilterAltOff } from "react-icons/md";

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
  const [orgs, setOrgs] = useState<Org[] | null>();
  const [memberCount, setMemberCount] = useState<Membercount[]>();

  const [loading, setLoading] = useState(true);
  const [option, setOption] = useState("asc");
  const [url, setUrl] = useState("/org/list");

  const selectRef = createRef<HTMLSelectElement>();

  //fetch Org data
  const fetchData = useCallback(() => {
    axiosClient
      .get(url)
      .then(({ data }) => {
        setOrgs(data.orgs);
        setMemberCount(data.orgMemberCounts);
        setLoading(false);
      })
      .catch((err) => {
        throw err;
      });
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const orgFilter = (e: React.FormEvent) => {
    e.preventDefault();
    const filterType = selectRef.current?.value;

    const result = filterType?.split(",");

    setLoading(true);

    if (result) setOption(result[1]);

    setOrgs(null);

    setUrl(
      `/org/list?column=${result && result[0]}&type=${result && result[1]}`,
    );

    fetchData();
  };

  return (
    <div className="mx-auto my-4 flex min-h-screen w-[90%] flex-col items-start">
      <div className="flex flex-col items-start gap-5 md:flex-row md:items-center">
        <Link to={"/admin/orgs/add"} className="btn btn-primary">
          Add Organization
        </Link>
        <form
          onSubmit={orgFilter}
          className="items flex gap-5"
          defaultValue={option}
        >
          <select ref={selectRef} className="select">
            <option disabled={true} value="">
              Filter by --
            </option>
            <option value="">Event Count (High-Low)</option>
            <option>Event Count (Low-High)</option>
            <option value={"name, asc"}>Alphabetical (A-Z)</option>
            <option value={"name, desc"}>Alphabetical (Z-A)</option>
          </select>
          <button type="submit" className="btn btn-secondary">
            <FaFilter />
            Filter
          </button>
        </form>

        <button
          className="btn btn-error"
          onClick={() => {
            setUrl("/org/list");
            setLoading(true);
            fetchData();
          }}
        >
          <MdFilterAltOff />
          Clear Filter
        </button>
      </div>
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
