import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axiosClient from "../../../axios-client";
import { ScaleLoader } from "react-spinners";

interface OrgMember {
  name: string;
  email: string;
  profile: string | null;
  role: "org_admin" | "org_member" | string; // add other roles if needed
}

interface OrgDetails {
  name: string;
  profile: string | null;
  description: string | null;
}

interface OrgResponse {
  org: OrgDetails;
  members: OrgMember[];
}

const OrgDetail = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [orgData, setOrgData] = useState<OrgResponse>();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    axiosClient
      .get(`/org/detail/${id}`, {
        signal: signal,
      })
      .then(({ data }) => {
        setOrgData(data.orgData);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("successfully aborted");
        } else {
          console.log(err);
        }
      });

    return () => controller.abort();
  }, [id]);

  return (
    <div className="mx-auto my-3 w-[90%] max-w-4xl p-6 pb-24">
      <div className="flex items-center justify-between">
        <button
          className="btn btn-secondary"
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </button>
      </div>
      {orgData ? (
        <>
          {/* Organization  Name/Image*/}
          <div className="mt-4 mb-6">
            <h1 className="mb-4 text-3xl font-bold">{orgData.org.name}</h1>

            <div className="relative w-full overflow-hidden rounded-2xl shadow">
              <img
                src={`${import.meta.env.VITE_API_BASE_URL}/storage/${orgData.org.profile}`}
                alt="Organization"
                className="h-64 w-full object-cover"
              />

              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                <p className="text-sm leading-relaxed md:text-base">
                  {orgData.org.description}
                </p>
              </div>
            </div>
          </div>
          {/* Events */}
          <div className="mb-8">
            <div className="mb-4 flex items-center gap-4">
              <h2 className="text-xl font-semibold">Hosted Events </h2>
              <div className="badge badge-sm badge-secondary font-bold">1</div>
            </div>

            <div className="grid grid-cols-1 gap-4 hover:cursor-pointer sm:grid-cols-2 md:grid-cols-3">
              <div className="group bg-base-200 overflow-hidden rounded-xl shadow transition duration-300 hover:scale-[1.02] hover:shadow-lg">
                <div className="relative">
                  <img
                    src="/images/events/ALBS3.jpg"
                    alt="Annual Tech Meetup"
                    className="h-40 w-full object-cover transition duration-300 group-hover:brightness-90"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold">Annual Tech Meetup</h3>
                  <p className="text-sm">June 15, 2025</p>
                </div>
              </div>
            </div>
          </div>
          {/* Org Members List */}
          <div className="mt-8">
            <div className="mb-4 flex items-center gap-4">
              <h2 className="text-xl font-semibold">Organization Members</h2>
              <div className="badge badge-sm badge-secondary font-bold">
                {orgData.members.length}
              </div>
            </div>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {orgData.members.map((singleOrg, index) => {
                return (
                  <li
                    key={index}
                    className="bg-base-200 flex items-start gap-4 rounded-xl p-4 shadow transition duration-300 hover:shadow-md"
                  >
                    <img
                      src={
                        singleOrg.profile
                          ? singleOrg.profile
                          : "/images/default/profile.png"
                      }
                      alt="name"
                      className="h-14 w-14 rounded-full border object-cover"
                    />
                    <div>
                      <p className="text-lg font-semibold">{singleOrg.name}</p>
                      <p className="text-sm">{singleOrg.email}</p>
                      <p className="text-info text-sm font-semibold">
                        {singleOrg.role == "org_admin" ? "Admin" : "Member"}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      ) : (
        <div className="mt-[10%]">
          <div className="flex min-h-screen flex-col items-center gap-5">
            <ScaleLoader color="#8BE9FD" />
          </div>
        </div>
      )}
    </div>
  );
};

export default OrgDetail;
