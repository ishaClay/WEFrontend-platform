import { UserRole } from "@/types/UserRole";
import Cookies from "js-cookie";
import React from "react";
import { Navigate } from "react-router-dom";

const CompanyProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;
  const userToken = Cookies.get("accessToken") || "";

  if (!userToken || UserRole[user?.query?.role].toLowerCase() !== "company") {
    return <Navigate to={"/auth"} />;
  }
  return <>{children}</>;
};

export default CompanyProtectedRoute;
