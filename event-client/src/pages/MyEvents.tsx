import Event from "../components/Event/Event";

const MyEvents = () => {
  return (
    <div className="my-4 flex min-h-screen w-full flex-col items-center">
      <h1 className="my-4 text-2xl font-bold">Your Purchased Events</h1>
      <div className="flex w-[80%] flex-wrap items-center justify-center gap-10 lg:gap-20">
        <Event
          id={1}
          image={"/images/events/YOASOBI_2025.webp"}
          title={"YOASOBI HALL TOUR 2025"}
          type={"Concert"}
          location={"Forum LA Inglewood"}
          date={"2025-05-26"}
        />
        <Event
          id={2}
          image={"/images/events/ALBS3.jpg"}
          title={"TEST MOVIE"}
          type={"Movie"}
          location={"Avex Theater"}
          date={"2025-05-26"}
        />
      </div>
    </div>
  );
};

export default MyEvents;
