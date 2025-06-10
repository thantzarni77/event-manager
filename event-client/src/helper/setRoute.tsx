const setRoute = (role: string) => {
  switch (role) {
    case "user":
      return "/home";
    case "superadmin":
      return "/admin/dashboard";
    case "admin":
      return "/admin/dashboard";

    case "org_admin":
      return "/org-admin/dashboard";
    case "org_user":
      return "org-user/dashboard";
  }
};

export default setRoute;
