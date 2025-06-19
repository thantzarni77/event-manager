import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { MdOutlineFileUpload } from "react-icons/md";
import SearchUser from "../users/SearchUser";
import { ScaleLoader } from "react-spinners";
import { useForm } from "react-hook-form";
import FormError from "../../../helper/FormError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addOrg, updateOrg } from "../../../helper/api/apiFunctions";

export interface Admin {
  id?: number | undefined;
  name: string;
  email: string;
  profile: null | string;
  role?: string;
}

interface InitialValues {
  id?: number | undefined;
  name: string;
  profile: string;
  description: string;
}

interface Props {
  mode: string;
  initialValues?: InitialValues;
  currentAdmin?: Admin;
}

type User = {
  id: number;
  name: string;
  email: string;
  profile: null | string;
  role: string;
  provider: string;
};

interface OrgFormData {
  name: string;
  description: string;
  orgProfile: FileList;
  orgAdminID?: number | string;
}

const OrgForm = ({ mode, initialValues, currentAdmin }: Props) => {
  const queryClient = useQueryClient();
  const [imagePreview, setImagePreview] = useState<string | null | undefined>(
    null,
  );

  const [adminInfo, setAdminInfo] = useState<Admin>({
    id: 0,
    name: "",
    email: "",
    profile: "",
  });

  const [users, setUsers] = useState<User[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OrgFormData>({
    mode: "all",
  });

  const VALID_IMAGE_TYPES = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
  ];
  const MAX_IMAGE_SIZE_BYTES = 2 * 1024 * 1024; // 2MB

  const handleFileChangeAndPreview = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (
        VALID_IMAGE_TYPES.includes(file.type) &&
        file.size <= MAX_IMAGE_SIZE_BYTES
      ) {
        if (imagePreview) URL.revokeObjectURL(imagePreview);
        setImagePreview(URL.createObjectURL(file));
      } else {
        if (imagePreview) URL.revokeObjectURL(imagePreview);
        setImagePreview(null);
      }
    } else {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
  };

  const {
    onChange: rhfOnChange,
    onBlur: rhfOnBlur,
    name,
    ref,
  } = register("orgProfile", {
    required: mode == "create" ? "Profile image is required." : false,
    validate: {
      hasFileOrIsEditModeWithExistingImage: (files: FileList) => {
        if (
          mode === "edit" &&
          initialValues &&
          (!files || files.length === 0)
        ) {
          return true;
        }
        return (
          (files && files.length > 0) ||
          (mode === "create" ? "Please select an image file." : true)
        );
      },
      isValidType: (files: FileList) => {
        if (!files || files.length === 0) return true;
        const file = files[0];
        return (
          VALID_IMAGE_TYPES.includes(file.type) ||
          "Invalid file type. Only JPG, PNG, GIF, or WEBP allowed."
        );
      },
      isCorrectSize: (files: FileList) => {
        if (!files || files.length === 0) return true;
        const file = files[0];
        return (
          file.size <= MAX_IMAGE_SIZE_BYTES ||
          `File size exceeds ${MAX_IMAGE_SIZE_BYTES / (1024 * 1024)}MB limit.`
        );
      },
    },
  });

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

  //set org admin id
  useEffect(() => {
    setValue("orgAdminID", adminInfo.id, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [adminInfo.id, setValue]);

  //show old data in edit mode
  useEffect(() => {
    if (mode == "edit") {
      if (initialValues?.profile) {
        setImagePreview(
          `${import.meta.env.VITE_API_BASE_URL}/storage/${initialValues.profile}`,
        );
      }
      if (currentAdmin) {
        setAdminInfo(currentAdmin);
      }
    }
  }, [mode, initialValues, currentAdmin]);

  const addOrgMutation = useMutation({
    mutationFn: addOrg,
    onSuccess: (data) => {
      if (data == 201) {
        navigate("/admin/orgs/list");
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const updateOrgMutation = useMutation({
    mutationFn: updateOrg,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["orgs"],
      });

      queryClient.invalidateQueries({
        queryKey: ["singleOrg", String(initialValues?.id)],
      });

      if (data == 201) {
        navigate("/admin/orgs/list");
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const orgFormHandler = (orgData: OrgFormData) => {
    const orgFormData = new FormData();

    if (orgData.orgProfile) {
      const orgProfileFileList: FileList = orgData.orgProfile;
      let fileToUpload: File | undefined = undefined;
      fileToUpload = orgProfileFileList[0];
      orgFormData.append("orgProfile", fileToUpload);
    }

    orgFormData.append("name", orgData.name);
    orgFormData.append("description", orgData.description);
    orgFormData.append("orgAdminID", String(orgData.orgAdminID));

    if (mode == "create") {
      addOrgMutation.mutate(orgFormData);
    } else {
      orgFormData.append("orgID", String(initialValues?.id)); // need to specify which org
      if (currentAdmin?.id != adminInfo.id) {
        orgFormData.append("oldAdminID", String(currentAdmin?.id));
      }

      updateOrgMutation.mutate(orgFormData);
    }
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
      <h1 className="text-xl font-bold">
        {mode == "create" ? "Create" : "Edit"} Org{" "}
      </h1>

      {/* display only when data are ready in edit mode  */}
      {mode == "edit" && !initialValues && adminInfo.id == 0 ? (
        <div className="mt-[10%]">
          <div className="flex min-h-screen flex-col items-center gap-5">
            <ScaleLoader color="#8BE9FD" />
          </div>
        </div>
      ) : (
        <>
          <form
            method="POST"
            encType="multipart/form-data"
            onSubmit={handleSubmit(orgFormHandler)}
            className="w-full"
          >
            <fieldset className="fieldset my-5 w-full">
              <legend className="fieldset-legend">Organization Name</legend>
              <input
                type="text"
                defaultValue={initialValues && initialValues.name}
                {...register("name", {
                  required: {
                    value: true,
                    message: "Organization name is required",
                  },
                  maxLength: {
                    value: 50,
                    message: "Org name cannot be more than 50 words",
                  },
                })}
                className="input w-full"
                placeholder="Add Orgnization Name"
              />
              {errors.name && <FormError message={errors.name.message} />}
            </fieldset>

            <fieldset className="fieldset my-5 w-full">
              <legend className="fieldset-legend">
                Organization Description
              </legend>
              <textarea
                rows={5}
                defaultValue={initialValues && initialValues.description}
                {...register("description", {
                  required: {
                    value: true,
                    message: "Description is required",
                  },
                  maxLength: {
                    value: 300,
                    message: "Org name cannot be more than 300 words",
                  },
                })}
                className="textarea w-full"
                placeholder="Add Organization Description"
              />
              {errors.description && (
                <FormError message={errors.description.message} />
              )}
            </fieldset>

            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">
                Upload Organization's Profile
              </legend>

              <label
                className={`relative h-52 w-full cursor-pointer overflow-hidden rounded-lg border-2 border-dashed ${errors.orgProfile ? "border-red-400" : "border-gray-300"} transition-all hover:border-blue-500`}
              >
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
                  <MdOutlineFileUpload size={40} />
                  <span className="mt-2 text-sm font-medium">
                    {imagePreview ? "Change Image" : "Choose Image"}
                  </span>
                </div>

                {/* Invisible file input */}
                <input
                  type="file"
                  accept="image/*"
                  name={name}
                  ref={ref}
                  onBlur={rhfOnBlur}
                  onChange={(e) => {
                    rhfOnChange(e);
                    handleFileChangeAndPreview(e);
                  }}
                  className="absolute inset-0 cursor-pointer opacity-0"
                />
              </label>

              <label className="label mt-2 block text-sm text-gray-500">
                Max size 2MB. JPG, PNG, GIF, or WEBP.
              </label>

              {errors.orgProfile && (
                <FormError message={errors.orgProfile.message} />
              )}
            </fieldset>

            {/* choose admin display */}
            <div className="my-4 flex flex-col items-start">
              <div className="text-base">
                Choosen Admin for this organization
              </div>
              <div className="bg-base-200 border-base-300 rounded-box my-3 flex w-[150px] flex-col items-center p-4">
                <input
                  disabled
                  hidden
                  type="text"
                  value={adminInfo.id}
                  {...register("orgAdminID")}
                />
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

            {errors.orgAdminID && (
              <FormError message={errors.orgAdminID.message} />
            )}

            <button
              disabled={
                mode == "create"
                  ? addOrgMutation.isPending
                  : updateOrgMutation.isPending
              }
              type="submit"
              className="btn btn-primary"
            >
              {mode == "create" ? "Create" : "Update"}
            </button>
          </form>

          {/* choose admin */}
          <fieldset className="fieldset my-2 w-full">
            <legend className="fieldset-legend">
              Choose Organization's admin
            </legend>
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
        </>
      )}
    </div>
  );
};

export default OrgForm;
