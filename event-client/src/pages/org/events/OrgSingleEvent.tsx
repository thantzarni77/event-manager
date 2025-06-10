const OrgSingleEvent = () => {
  return (
    <tr>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="h-12 w-12 rounded">
              <img
                src={"/images/events/ALBS3.jpg"}
                alt="Avatar Tailwind CSS Component"
              />
            </div>
          </div>
          <div>
            <div className="text-sm">{"Alice in borderland S3"}</div>
          </div>
        </div>
      </td>
      <td>
        <div className="flex items-center gap-2">
          <span>{"Aug 23 - Aug 31"}</span>
        </div>
      </td>
      <td>{"Movie"}</td>
      <td>{"Avex Theater"}</td>
      <td>{"25-05-25"}</td>
    </tr>
  );
};

export default OrgSingleEvent;
