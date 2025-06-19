import { useEffect, useState } from "react";
import OrgForm from "./OrgForm";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getSingleOrg } from "../../../helper/api/apiFunctions";
import { OrgDetails } from "./OrgDetail";

interface OrgAdmin {
  id?: number;
  name: string;
  email: string;
  profile: null | string;
  role: string;
}

const EditOrg = () => {
  const [initialValues, setInitialValues] = useState<OrgDetails | undefined>();
  const [orgAdmin, setOrgAdmin] = useState<OrgAdmin | undefined>();

  const { id } = useParams();

  const { data, isSuccess } = useQuery({
    queryKey: ["singleOrg", id],
    queryFn: () => {
      return getSingleOrg(id);
    },
  });

  useEffect(() => {
    if (isSuccess && data) {
      setInitialValues(data.orgData.org);
      const admin = data.orgData.members.filter(
        (member) => member.role == "org_admin",
      );
      setOrgAdmin(admin[0]);
    }
  }, [data, isSuccess]);

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
