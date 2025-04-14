import { MdDateRange } from "react-icons/md";

import { format } from "date-fns";
import { Link } from "react-router";
import { FaLocationDot } from "react-icons/fa6";

type Props = {
  id: string | number;
  title: string;
  type: string;
  image: string;
  location: string;
  date: string;
};

const Event = ({ id, title, type, image, location, date }: Props) => {
  return (
    <Link to={`events/${id}`}>
      <div className="card bg-base-300 h-[350px] w-96 cursor-pointer shadow-sm transition-transform duration-300 hover:scale-105 hover:shadow-lg lg:w-[350px]">
        <figure>
          <img
            className="transition-all duration-300 hover:grayscale-45"
            src={image}
            alt="Event"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {title}
            <div className="badge badge-secondary transition-all duration-300">
              NEW
            </div>
          </h2>
          <h2 className="text-info flex items-center justify-between font-bold">
            <div className="flex items-center gap-1">
              <MdDateRange size={"1.7em"} />{" "}
              <span className="text-md">
                {format(new Date(date), "dd MMMM yyyy")}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <FaLocationDot size={"1.2em"} />
              <span>{location}</span>
            </div>
          </h2>
          <p>
            A card component has a figure, a body part, and inside body there
            are title and actions parts
          </p>
          <div className="card-actions justify-end">
            <div className="badge badge-outline hover:bg-primary transition-all duration-300">
              {type}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Event;
