import { ChangeEvent, createRef, useState } from "react";
import SearchUser from "../users/SearchUser";
import { FaCloudUploadAlt } from "react-icons/fa";
import axiosClient from "../../../axios-client";
import { useNavigate } from "react-router";

type User = {
  id: number;
  name: string;
  email: string;
  profile: null | string;
  role: string;
  provider: string;
};

type AdminInfo = Omit<User, "role" | "provider">;

const AddOrg = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [error, setError] = useState<string>("");
  const [errors, setErrors] = useState();

  const [loading, setLoading] = useState(false);

  const [adminInfo, setAdminInfo] = useState<AdminInfo>({
    id: 0,
    name: "",
    email: "",
    profile: "",
  });

  const [profile, setProfile] = useState<File | null>(null);

  const nameRef = createRef<HTMLInputElement>();
  const descripRef = createRef<HTMLTextAreaElement>();

  const [users, setUsers] = useState<User[]>([]);

  //show image to user and set to profile state
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      setImagePreview(null);
      setError("");
      return;
    }

    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setError("Invalid file type. Only JPG, PNG, GIF, or WEBP allowed.");
      setImagePreview(null);
      return;
    }

    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      setError("File size exceeds 2MB limit.");
      setImagePreview(null);
      return;
    }

    setError("");
    setImagePreview(URL.createObjectURL(file));

    setProfile(file);
  };

  //show selected admin
  const chooseAdminHanlder = (
    id: number,
    name: string,
    profile: string | null,
    email: string,
  ) => {
    setAdminInfo({ id, name, profile, email });
  };

  const navigate = useNavigate();

  const addOrgHandler = (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();

    const formData = new FormData();
    if (profile) {
      formData.append("orgProfile", profile);
    }

    formData.append("name", nameRef.current?.value || "");
    formData.append("description", descripRef.current?.value || "");
    formData.append("orgAdminID", String(adminInfo.id));

    axiosClient
      .post("/org/add", formData)
      .then((response) => {
        if (response.data == "201") {
          setLoading(false);
          navigate("/admin/orgs/list");
        }
      })
      .catch(({ response }) => {
        setLoading(false);
        setErrors(response.data.errors);
      });
  };

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
      <h1 className="text-xl font-bold">Add Org </h1>

      <form
        method="POST"
        encType="multipart/form-data"
        onSubmit={addOrgHandler}
        className="w-full"
      >
        <fieldset className="fieldset my-5 w-full">
          <legend className="fieldset-legend">Organization Name</legend>
          <input
            type="text"
            ref={nameRef}
            className="input w-full"
            placeholder="Add Orgnization Name"
          />
          {errors && errors["name"] && (
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
          )}
        </fieldset>

        <fieldset className="fieldset my-5 w-full">
          <legend className="fieldset-legend">Organization Description</legend>
          <textarea
            rows={5}
            ref={descripRef}
            className="textarea w-full"
            placeholder="Add Organization Description"
          />
          {errors && errors["description"] && (
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
          )}
        </fieldset>

        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend">
            Upload Organization's Profile
          </legend>

          <label className="relative h-52 w-full cursor-pointer overflow-hidden rounded-lg border-2 border-dashed border-gray-300 transition-all hover:border-blue-500">
            {/* Background image */}
            {imagePreview && (
              <div
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${imagePreview})` }}
              />
            )}

            {/* Dim overlay */}
            {imagePreview && (
              <div className="absolute inset-0 z-10 bg-black opacity-40" />
            )}

            {/* Upload Icon */}
            <div className="relative z-20 flex h-full flex-col items-center justify-center">
              <FaCloudUploadAlt size={40} />
              <span className="mt-2 text-sm font-medium">
                {imagePreview ? "Change Image" : "Choose Image"}
              </span>
            </div>

            {/* Invisible file input */}
            <input
              type="file"
              accept="image/*"
              name="orgProfile"
              className="absolute inset-0 cursor-pointer opacity-0"
              onChange={handleImageChange}
            />
          </label>

          <label className="label mt-2 block text-sm text-gray-500">
            Max size 2MB. JPG, PNG, GIF, or WEBP.
          </label>

          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          {errors && errors["orgProfile"] && (
            <div role="alert" id="alert" className="alert alert-warning my-2">
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
          )}
        </fieldset>

        {/* choose admin display */}
        <div className="my-4 flex flex-col items-start">
          <div className="text-base">Choosen Admin for this organization</div>
          <div className="bg-base-200 border-base-300 rounded-box my-3 flex w-[150px] flex-col items-center p-4">
            <h1 className="text-sm">
              {adminInfo.name ? adminInfo.name : "..."}
            </h1>
            <img
              className="my-2 w-[80px]"
              src={adminInfo.profile || "/images/default/profile.png"}
              alt=""
            />
            <h1 className="w-[80%] text-center text-sm break-words">
              {adminInfo.email ? adminInfo.email : "...@..."}
            </h1>
          </div>
        </div>

        {errors && errors["orgAdminID"] && (
          <div role="alert" id="alert" className="alert alert-warning my-2">
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
            <span>{errors["orgAdminID"]}</span>
          </div>
        )}

        <button disabled={loading} type="submit" className="btn btn-primary">
          Create
        </button>
      </form>

      {/* choose admin */}
      <fieldset className="fieldset my-2 w-full">
        <legend className="fieldset-legend">Choose Organization's admin</legend>
        <div className="w-full">
          <SearchUser setUsers={setUsers} />
        </div>

        {users.length > 0 &&
          users.map((user) => {
            if (user.role != "org_admin" && user.role != "org_user") {
              return (
                <div
                  className="border-primary hover:bg-base-300 my-2 flex w-full items-center justify-between gap-5 rounded-xl border-1 p-1 hover:cursor-pointer"
                  key={user.id}
                >
                  <div className="flex items-center gap-5 px-4">
                    <img
                      src={user.profile || "/images/default/profile.png"}
                      alt=""
                      className="w-[50px]"
                    />
                    <div className="text-base">{user.name}</div>
                  </div>
                  <button
                    onClick={() => {
                      chooseAdminHanlder(
                        user.id,
                        user.name,
                        user.profile,
                        user.email,
                      );
                    }}
                    className="btn btn-primary"
                  >
                    Choose
                  </button>
                </div>
              );
            }
          })}
      </fieldset>
    </div>
  );
};

export default AddOrg;
