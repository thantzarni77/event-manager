import { useContext, useRef } from "react";
import { Link, useNavigate } from "react-router";

import { FaArrowLeftLong, FaLocationDot } from "react-icons/fa6";
import { HiOutlineViewColumns } from "react-icons/hi2";
import { MdDateRange } from "react-icons/md";
import { PiShoppingCartDuotone } from "react-icons/pi";

import { MainContext } from "../../../context/MainContext";

const EventDetail = () => {
  const { theme } = useContext(MainContext);

  const navigate = useNavigate();

  const modalRef = useRef<HTMLDialogElement>(null);

  return (
    <div className="mx-auto my-4 flex min-h-screen w-[90%] flex-col gap-4 md:w-[80%]">
      <button
        onClick={() => navigate(-1)}
        className="btn btn-info btn-sm w-fit px-6"
      >
        {" "}
        {theme == "dracula" ? (
          <FaArrowLeftLong size={"22px"} />
        ) : (
          <FaArrowLeftLong size={"22px"} color="#ffffff" />
        )}
      </button>

      <h1 className="text-2xl font-bold">Event Title</h1>
      <div className="flex w-full items-center justify-between">
        <p className="flex items-center gap-1">
          <MdDateRange size={"1.3em"} />
          <span>3/5/2025</span>
        </p>
        <div className="flex items-center gap-1">
          <FaLocationDot size={"1.2em"} />
          <span>Event Location</span>
        </div>
      </div>
      <img
        src="/images/events/ALBS3.jpg"
        alt=""
        className="self-center rounded-md hover:grayscale-25 md:h-[500px]"
      />
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis
        modi ea provident, sapiente iste error aut molestiae consequuntur
        laboriosam vero quis veniam voluptatibus culpa suscipit doloribus
        explicabo impedit. Molestias, vero?
      </p>
      <div>
        <h1 className="my-2 font-bold">Ticket Prices</h1>
        <p>Floor - 25000Ks</p>
        <p>Lower Tier - 45000Ks</p>
        <p>Upper Tier - 150,000Ks</p>
      </div>

      {/* Dialog for Seat Plan */}
      <dialog ref={modalRef} id="my_modal_4" className="modal w-full">
        <div className="modal-box h-fit w-11/12 max-w-5xl">
          <h3 className="mb-4 text-lg font-bold">Seat Plan for Stadium</h3>
          <img
            src="/images/seat-plan/sample-seat-plan.jpg"
            alt=""
            className="rounded-md"
          />

          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-info">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      <div className="flex items-center justify-between">
        <button
          className="btn btn-secondary"
          onClick={() => {
            if (modalRef.current) {
              modalRef.current.showModal();
            }
          }}
        >
          <HiOutlineViewColumns size={"22px"} /> View Seats
        </button>

        <Link to={"purchase"} className="btn btn-primary w-fit">
          <PiShoppingCartDuotone size={"22px"} />
          Purchase
        </Link>
      </div>
    </div>
  );
};

export default EventDetail;
