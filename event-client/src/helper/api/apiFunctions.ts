import { OrgResponse } from "../../components/admin/orgs/OrgDetail";
import { PaymentFormData } from "../../components/admin/payment/PaymentForm";
import { SearchUserPayload } from "../../components/admin/users/SearchUser";
import { RoleChangePayload } from "../../components/admin/users/UserData";
import { Membercount, Org } from "../../pages/admin/orgs/Organizations";
import { Payment } from "../../pages/admin/payment/PaymentMethods";
import { Member } from "../../pages/admin/users/ManageUsers";
import { LoginFormData } from "../../pages/Login";
import { RegisterFormData } from "../../pages/Register";
import axiosClient from "./axios-client";

export interface GoogleLoginURL {
  url: string;
}

export interface AuthUserData {
  user: {
    id: number;
    name: string;
    email: string;
    email_verified_at: null;
    profile: null | string;
    role: string;
    org_id: null | string;
    provider: string;
    provider_id: null | string | number;
    provider_token: null | string | number;
    created_at: string;
    updated_at: string;
  };
  access_token: string;
}

//get google login url
export const getGoogleLoginURL = async () => {
  const { data } = await axiosClient.get<GoogleLoginURL>("auth");
  return data;
};

//handle google login
export const googleLogin = async (location: string) => {
  const { data } = await axiosClient.get(`auth/callback/${location}`);
  return data;
};

//handle login
export const login = async (FormData: LoginFormData) => {
  const { data } = await axiosClient.post<AuthUserData>("login", FormData);
  return data;
};

//handle register
export const signup = async (FormData: RegisterFormData) => {
  const { data } = await axiosClient.post<AuthUserData>("signup", FormData);
  return data;
};

//logout
export const logout = async () => {
  const { status } = await axiosClient.get<{ status: number }>("user/destroy");
  return status;
};

//search users
export const searchUsers = async (SearchTerm: SearchUserPayload) => {
  const { data } = await axiosClient.post<{ searchedUsers: Member[] }>(
    "/users/list/search",
    SearchTerm,
  );

  return data;
};

//get all users
export const getAllUsers = async () => {
  const { data } = await axiosClient.get<{ users: Member[] }>("/users/list");
  return data;
};

//user role change
export const userRoleChange = async (payload: RoleChangePayload) => {
  const { status } = await axiosClient.post<{ status: number }>(
    "/user/role-change",
    payload,
  );

  return status;
};

//get all organizations
export const getAllOrgs = async (url: string) => {
  const { data } = await axiosClient.get<{
    orgs: Org[];
    orgMemberCounts: Membercount[];
  }>(url);
  return data;
};

//get single org data
export const getSingleOrg = async (id: string | number | undefined) => {
  const { data } = await axiosClient.get<{ orgData: OrgResponse }>(
    `/org/detail/${id}`,
  );

  return data;
};

//add new orgs
export const addOrg = async (orgData: FormData) => {
  const { data } = await axiosClient.post<number>("/org/add", orgData);

  return data;
};

//update org data
export const updateOrg = async (orgData: FormData) => {
  const { data } = await axiosClient.post<number>("/org/update", orgData);
  return data;
};

//get all payments
export const getAllPayments = async () => {
  const { data } = await axiosClient.get<{ payments: Payment[] }>(
    "/payment/list",
  );
  return data;
};

//get single payment data
export const getSinglePayment = async (id: number | string) => {
  const { data } = await axiosClient.get<{ singlePayment: Payment }>(
    `/payment/list/${id}`,
  );
  return data;
};

//add payment
export const addPayment = async (payload: PaymentFormData) => {
  const { data } = await axiosClient.post("/payment/add", payload);
  return data;
};

//update payment
export const updatePayment = async (payload: PaymentFormData) => {
  const { data } = await axiosClient.post<number>("/payment/update", payload);
  return data;
};

//delete payment
export const deletePayment = async (payload: {
  payment_id: string | number;
}) => {
  const { data } = await axiosClient.post("/payment/delete", payload);
  return data;
};
