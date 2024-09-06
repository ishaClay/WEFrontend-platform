import { UserRole } from "@/types/UserRole";
import Cookies from "js-cookie";
import { FC, ReactNode } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;
  const userToken = Cookies.get("accessToken") || "";
  const location = useLocation();
  const routeUser = location?.pathname?.split("/")[1];
  const navigate = useNavigate();

  if (!userToken) {
    return <Navigate to={"/auth"} />;
  } else if (
    UserRole[user?.query?.role].toLowerCase() !== routeUser.toLowerCase()
  ) {
    navigate(-1); // Use useNavigate to go back in the history
    return;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
