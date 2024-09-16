import Cookies from "js-cookie";
import React from "react";
import { Navigate } from "react-router-dom";

const CompanyProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;
  const userToken = Cookies.get("accessToken") || "";

  console.log(
    "!userToken || +user?.query?.role !== 1",
    !userToken,
    +user?.query?.role !== 1,
    +user?.query?.role !== 4
  );

  if (!userToken && (+user?.query?.role !== 1 || +user?.query?.role !== 4)) {
    return <Navigate to={"/auth"} />;
  }
  return <>{children}</>;
};

export default CompanyProtectedRoute;
