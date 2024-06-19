import { FC, ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useToast } from "./ui/use-toast";

interface ProtectedRouteProps {
	children: ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
	const { toast } = useToast();
	const userData = localStorage.getItem("user");
	const user = userData ? JSON.parse(userData) : null; 
	const userToken = user?.accessToken || "";

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
	}
	return <>{children}</>;
};

export default ProtectedRoute;
