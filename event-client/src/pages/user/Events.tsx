import { useContext, useRef, useState } from "react";

import { FaFilter } from "react-icons/fa6";
import { compareAsc, format, isValid, parseISO } from "date-fns";

import Event from "../../components/user/Event/Event";
import { MdFilterAltOff } from "react-icons/md";
import { MainContext } from "../../context/MainContext";

const Events = () => {
  const { data } = useContext(MainContext);

  const [filter, setFilter] = useState<string | null>("All");

  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);

  const [events, setEvents] = useState(data);

  //handle date filter
  const dateFilterHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //get value from ref
    const startDateStr = startDateRef.current?.value;
    const endDateStr = endDateRef.current?.value;

    //convert them to iso date
    const startDate = startDateStr ? parseISO(startDateStr) : null;
    const endDate = endDateStr ? parseISO(endDateStr) : null;

    const filteredData = data.filter((item) => {
      const itemDate = parseISO(item.date);
      if (!isValid(itemDate)) return false;

      //return true if date is not given, so it can continue filter
      const startCondition = startDate
        ? compareAsc(startDate, itemDate) !== 1
        : true;
      const endCondition = endDate
        ? compareAsc(endDate, itemDate) !== -1
        : true;

      return startCondition && endCondition;
    });

    setEvents(filteredData);
  };

  //min date for date choosing
  const minDate = format(new Date(), "yyyy-MM-dd");

  return (
    <div className="flex w-[90%] flex-col items-center">
      {/* Clear Filter */}
      {data.length !== events.length && (
        <button
          className="btn btn-info mb-2"
          onClick={() => {
            setEvents(data);
          }}
        >
          <MdFilterAltOff size={"18px"} />
          Clear All Filter
        </button>
      )}

      {/* Filter Section */}
      <div className="flex items-center gap-5">
        {/* <FaFilter size={"20px"} className="mt-[-8px]" /> */}
        <div className="mt-4 mb-6 filter">
          <input
            className="btn filter-reset btn-info"
            type="radio"
            name="filter"
            aria-label="All"
            onChange={(e) => {
              setFilter(e.target.ariaLabel);
            }}
          />
          <input
            className="btn"
            type="radio"
            name="filter"
            aria-label="Concert"
            onChange={(e) => {
              setFilter(e.target.ariaLabel);
            }}
          />
          <input
            className="btn"
            type="radio"
            name="filter"
            aria-label="Movie"
            onChange={(e) => {
              setFilter(e.target.ariaLabel);
            }}
          />
        </div>
      </div>

      {/* Date Filter */}
      <div className="mb-6">
        <form onSubmit={dateFilterHandler} className="flex items-center gap-5">
          <div>
            <p>Starts From</p>
            <input
              ref={startDateRef}
              type="date"
              className="input"
              min={minDate}
            />
          </div>

          <div>
            <p>Ends To</p>
            <input
              ref={endDateRef}
              type="date"
              className="input"
              min={minDate}
            />
          </div>
          <button type="submit" className="btn btn-primary mt-5">
            <FaFilter />
            Filter
          </button>
        </form>
      </div>

      {/* Event Cards */}
      <div className="flex w-full flex-wrap items-center justify-center gap-8 lg:gap-18">
        {events.map((single, index) => {
          if (filter == "All" || filter == single.type) {
            return (
              <Event
                key={index}
                id={single.id}
                title={single.title}
                type={single.type}
                image={single.image}
                location={single.location}
                date={single.date}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default Events;
