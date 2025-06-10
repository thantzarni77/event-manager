import { format } from "date-fns";
import { MdOutlineFileUpload } from "react-icons/md";
import { useNavigate } from "react-router";

const OrgEventAdd = () => {
  const navigate = useNavigate();

  const minDate = format(new Date(), "yyyy-MM-dd");
  return (
    <div className="mx-auto flex w-[85%] flex-col items-center px-8 pb-24 lg:w-[45%]">
      <button
        onClick={() => {
          navigate(-1);
        }}
        className="btn btn-secondary mt-4 mb-2 self-start"
      >
        Back
      </button>
      <h1 className="text-xl font-bold">Add Event</h1>

      <form
        method="POST"
        encType="multipart/form-data"
        // onSubmit={addOrgHandler}
        className="w-full"
      >
        <fieldset className="fieldset my-5 w-full">
          <legend className="fieldset-legend">Event Name</legend>
          <input
            type="text"
            className="input w-full"
            placeholder="Add Event Name"
          />
          {/* {errors && errors["name"] && (
                <div role="alert" id="alert" className="alert alert-warning">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 22 22"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <span>{errors["name"]}</span>
                </div>
              )} */}
        </fieldset>

        <fieldset className="fieldset my-5 w-full">
          <legend className="fieldset-legend">Event Description</legend>
          <textarea
            rows={5}
            // ref={descripRef}
            className="textarea w-full"
            placeholder="Add Event Description"
          />
          {/* {errors && errors["description"] && (
                <div role="alert" id="alert" className="alert alert-warning">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 22 22"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <span>{errors["description"]}</span>
                </div>
              )} */}
        </fieldset>

        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend">Upload Event Image</legend>

          <label className="relative h-52 w-full cursor-pointer overflow-hidden rounded-lg border-2 border-dashed border-gray-300 transition-all hover:border-blue-500">
            {/* Background image */}
            {/* {imagePreview && (
                  <div
                    className="absolute inset-0 z-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${imagePreview})` }}
                  />
                )} */}

            {/* Dim overlay */}
            {/* {imagePreview && (
                  <div className="absolute inset-0 z-10 bg-black opacity-40" />
                )} */}

            {/* Upload Icon */}
            <div className="relative z-20 flex h-full flex-col items-center justify-center">
              <MdOutlineFileUpload size={40} />
              <span className="mt-2 text-sm font-medium">Change Image"</span>
            </div>

            {/* Invisible file input */}
            <input
              type="file"
              accept="image/*"
              name="orgProfile"
              className="absolute inset-0 cursor-pointer opacity-0"
              // onChange={handleImageChange}
            />
          </label>

          <label className="label mt-2 block text-sm text-gray-500">
            Max size 2MB. JPG, PNG, GIF, or WEBP.
          </label>

          {/* {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
              {errors && errors["orgProfile"] && (
                <div
                  role="alert"
                  id="alert"
                  className="alert alert-warning my-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 22 22"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <span>{errors["orgProfile"]}</span>
                </div>
              )} */}
        </fieldset>

        <div className="my-5 flex flex-col">
          <label className="label block text-sm text-gray-500">
            If event is held only one day, choose start date only
          </label>
          <div className="flex items-center gap-4">
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Start Date</legend>
              <input
                type="date"
                className="input w-full"
                placeholder="Choose Event Date"
                min={minDate}
              />
            </fieldset>
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">End Date</legend>
              <input
                type="date"
                className="input w-full"
                placeholder="Choose Event Date"
                min={minDate}
              />
            </fieldset>
          </div>
        </div>

        <button
          // disabled={loading}
          type="submit"
          className="btn btn-primary"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default OrgEventAdd;
