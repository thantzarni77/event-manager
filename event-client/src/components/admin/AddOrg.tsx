import { ChangeEvent, createRef, useState } from "react";
import SearchUser from "./SearchUser";
import { FaCloudUploadAlt } from "react-icons/fa";
import axiosClient from "../../axios-client";

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
  const [adminInfo, setAdminInfo] = useState<AdminInfo>({
    id: 0,
    name: "",
    email: "",
    profile: "",
  });

  const [profile, setProfile] = useState<File | null>(null);

  const nameRef = createRef<HTMLInputElement>();
  const descripRef = createRef<HTMLTextAreaElement>();

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

  const addOrgHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    if (profile) {
      formData.append("org_profile", profile);
    }

    formData.append("name", nameRef.current?.value || "");
    formData.append("description", descripRef.current?.value || "");
    formData.append("orgAdminID", String(adminInfo.id));

    axiosClient.post("/org/add", formData).then((response) => {
      console.log(response);
    });
  };

  const [users, setUsers] = useState<User[]>([]);
  return (
    <div className="mx-auto flex w-[45%] flex-col items-center px-8 pb-24">
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
        </fieldset>

        <fieldset className="fieldset my-5 w-full">
          <legend className="fieldset-legend">Organization Description</legend>
          <textarea
            rows={5}
            ref={descripRef}
            className="textarea w-full"
            placeholder="Add Organization Description"
          />
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
              name="org_profile"
              className="absolute inset-0 cursor-pointer opacity-0"
              onChange={handleImageChange}
            />
          </label>

          <label className="label mt-2 block text-sm text-gray-500">
            Max size 2MB. JPG, PNG, GIF, or WEBP.
          </label>

          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </fieldset>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>

      <fieldset className="fieldset my-2 w-full">
        <legend className="fieldset-legend">Choose Organization's admin</legend>
        <div className="w-full">
          <SearchUser setUsers={setUsers} />
        </div>

        {users && users.length > 0 ? (
          users.map((user) => {
            if (user.role != "org_admin" && user.role != "org_user") {
              return (
                <div
                  className="border-primary my-3 flex w-full items-center justify-between gap-5 rounded-xl border-1 p-1 hover:cursor-pointer hover:bg-gray-700"
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
          })
        ) : (
          <div className="my-4 text-base">No user found</div>
        )}

        {adminInfo.id != 0 && (
          <div className="flex flex-col items-center">
            <div className="text-base">Choosen Admin for this organization</div>
            <div className="bg-base-200 border-base-300 rounded-box my-3 flex w-[150px] flex-col items-center p-4">
              <h1 className="text-xs">{adminInfo.name}</h1>
              <img
                className="my-2 w-[80px]"
                src={adminInfo.profile || "/images/default/profile.png"}
                alt=""
              />
              <h1 className="">{adminInfo.email}</h1>
            </div>
          </div>
        )}
      </fieldset>
    </div>
  );
};

export default AddOrg;
