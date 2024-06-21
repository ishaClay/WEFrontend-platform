import Header from "@/components/Header";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

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

  return (
    <div>
      <Header />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
