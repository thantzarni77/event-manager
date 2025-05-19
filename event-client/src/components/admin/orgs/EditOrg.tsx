import { useEffect, useState } from "react";
import OrgForm, { Admin } from "./OrgForm";
import axiosClient from "../../../axios-client";
import { useParams } from "react-router";

const EditOrg = () => {
  const [initialValues, setInitialValues] = useState();
  const [orgAdmin, setOrgAdmin] = useState();

  const { id } = useParams();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    axiosClient
      .get(`/org/detail/${id}`, {
        signal: signal,
      })
      .then(({ data }) => {
        setInitialValues(data.orgData.org);
        const admin = data.orgData.members.filter(
          (member: Admin) => member.role == "org_admin",
        );
        return admin;
      })
      .then((admin) => {
        setOrgAdmin(admin[0]);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("successfully aborted");
        } else {
          console.log(err);
        }
      });

    return () => controller.abort();
  }, [id]);

  if (initialValues && orgAdmin) {
    return (
      <OrgForm
        mode={"edit"}
        initialValues={initialValues}
        currentAdmin={orgAdmin}
      />
    );
  }
};

export default EditOrg;
