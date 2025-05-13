const SingleOrg = () => {
  return (
    <div className="card bg-base-100 image-full my-2 w-[520px] shadow-sm hover:cursor-pointer md:w-96">
      <figure>
        <img
          src="https://www.designtagebuch.de/wp-content/uploads/mediathek/2023/11/sony-music-logo-2023-1100x825.jpg"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Sony Music</h2>
        <p>
          Sony Music Entertainment, commonly known as Sony Music, is an American
          multinational music company owned by Japanese conglomerate Sony Group
          Corporation.
        </p>
        <div className="flex items-center justify-between">
          <h1 className="w-fit">Members - 123</h1>
          <h1 className="w-fit">Events - 23</h1>
        </div>
      </div>
    </div>
  );
};

export default SingleOrg;
