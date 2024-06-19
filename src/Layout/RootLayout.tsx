import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const RootLayout = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const userData = localStorage.getItem("user");
  	const user = userData ? JSON?.parse(userData) : null; 

	useEffect(() => {
		if (location.pathname === "/") {
			if (user?.accessToken) {
				navigate("/dashboard");
			} else {
				navigate("/auth");
			}
		}
	}, [location]);

	return <Outlet />
};

export default RootLayout;
