import { setPath } from "@/redux/reducer/PathReducer";
import { LogOut } from "@/services/apiServices/authService";
import { UserRole } from "@/types/UserRole";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { FC, ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "./ui/use-toast";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const dispatch = useDispatch();
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;
  const userToken = Cookies.get('accessToken') || "";
  const location = useLocation();
  const routeUser = location?.pathname?.split("/")[1];
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: LogOut,
    onSuccess: () => {
      toast({
        title: "Error",
        description: "Session Expired. Please Login Again",
        variant: "destructive",
      });
      Cookies.remove('accessToken');
      localStorage.removeItem("user");
      navigate("/");
      dispatch(setPath([]));
    },
  });

  useEffect(() => {
    if (!userToken) {
      mutate(JSON.parse(localStorage.getItem("user") as string)?.query?.id)
    }
  }, [userToken]);

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
