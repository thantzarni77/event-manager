import { Link } from "react-router";
import OrgSingleEvent from "./events/OrgSingleEvent";

const OrgEvents = () => {
  return (
    <div className="mx-auto my-2 w-[90%] px-3 pt-3 pb-24">
      <div>
        <Link to={"/org-admin/add/events"} className="btn btn-primary">
          Add Events
        </Link>
      </div>
      <div className="my-4 flex w-full flex-col gap-5">
        <ul className="list bg-base-100 rounded-box shadow-md">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Type</th>
                <th>Location</th>
                <th>Created at </th>
              </tr>
            </thead>
            <tbody>
              <OrgSingleEvent />
              <OrgSingleEvent />
              <OrgSingleEvent />
              <OrgSingleEvent />
              <OrgSingleEvent />
              <OrgSingleEvent />
              <OrgSingleEvent />
            </tbody>
          </table>
        </ul>
      </div>
    </div>
  );
};

export default OrgEvents;
