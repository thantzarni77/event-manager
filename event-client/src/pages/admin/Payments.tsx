const Payments = () => {
  return (
    <div className="mx-auto w-full px-2">
      <div className="rounded-box border-base-content/5 bg-base-100 my-2 w-full overflow-x-auto border">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Acc Name</th>
              <th>Acc Type</th>
              <th>Acc Number</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Blue</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h3 className="text-neutral mt-5 mb-2">Add Payment Method</h3>
      <form action="" className="flex flex-col items-start gap-2">
        <input type="text" placeholder="Account Name" className="input" />
        <input type="text" placeholder="Account Type" className="input" />
        <input type="text" placeholder="Account Number" className="input" />
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
    </div>
  );
};

export default Payments;
