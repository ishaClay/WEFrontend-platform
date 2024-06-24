import { UserRole } from "@/types/UserRole";
import { FC, ReactNode, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useToast } from "./ui/use-toast";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { toast } = useToast();
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;
  const userToken = user?.accessToken || "";
  const location = useLocation();
  const routeUser = location?.pathname?.split("/")[1];
  const navigate = useNavigate();

  console.log(
    "userToken",
    UserRole[user?.query?.role].toLowerCase(),
    routeUser.toLowerCase()
  );

  useEffect(() => {
    if (!userToken) {
      toast({
        variant: "destructive",
        title: "Login Required!",
      });
    }
  }, []);

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
