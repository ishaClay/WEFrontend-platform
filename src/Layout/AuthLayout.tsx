import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AuthLayout = () => {
  const navigate = useNavigate();

  const userData = localStorage.getItem("userData");
  const user = userData ? JSON.parse(userData) : null;  
  const userToken = user?.accessToken || "";

useEffect(() => {
  if (userToken) {
    navigate("/dashboard");
  } 
//   else if (location.pathname !== "/resetpassword") {
//     navigate("/auth");
//   }
}, [userToken, navigate]);

  return <Outlet />;
};

export default AuthLayout;
