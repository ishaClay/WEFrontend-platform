import { LogOut } from "@/services/apiServices/authService";
import { ResponseError } from "@/types/Errors";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Logo1 from "../../public/assets/img/logo1.png";
import Logo2 from "../assets/images/logo2.png";
import { PrimaryButton } from "./comman/Button/CustomButton";
import Loading from "./comman/Error/Loading";
import { toast } from "./ui/use-toast";

interface headerProps {
  hasDiffHeader?: boolean;
}

function Header(props: headerProps) {
  const navigate = useNavigate();

  const userData = localStorage?.getItem("user");
  const userToken = !!userData && JSON.parse(userData)?.accessToken;

  const { mutate, isPending } = useMutation({
    mutationFn: LogOut,
    onSuccess: () => {
      localStorage.removeItem("user");
      navigate("/");
    },
    onError: (error: ResponseError) => {
      toast({
        title: "Error",
        description: error?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    },
  });

  const handleLogout = () => {
    const user = JSON.parse(userData as string);
    const userId = user?.query ? user?.query?.id : user?.id;
    mutate(userId);
  };

  const handleGotoDashboard = () => {
    const user = !!userData && JSON.parse(userData)?.query;

    switch (user.role) {
      case "1":
        navigate(`/company/dashboard`);
        break;
      case "2":
        navigate(`/trainer/dashboard`);
        break;
      case "3":
        break;
      case "4":
        break;
      case "5":
        break;
      case "6":
        break;

      default:
        navigate("/");
        break;
    }
  };

  return (
    // Note : This below code is for backup
    <header
      className={`xl:max-w-[1160px] max-w-full w-full mx-auto xl:px-0 px-4 py-7 ${
        props.hasDiffHeader ? "mx-7" : ""
      }`}
    >
      <div className="flex justify-between gap-4">
        <div className="flex items-end">
          <div className={` ${!props.hasDiffHeader ? "xl:mr-7 mr-2" : ""}`}>
            <img
              onClick={() => {
                navigate("/");
              }}
              className="cursor-pointer"
              src={Logo1}
            />
          </div>
          <div className="xl:ml-5 ml-3 text-[#1f1313]">
            <ul className="flex gap-[31px] font-normal text-base leading-5 text-color font-calibri mb-3">
              <li className="group flex items-center gap-[5px]">
                <span className="cursor-pointer">Our Courses</span>
                <img
                  className="w-[6px] h-[6px]"
                  src="../assets/img/Vector 1.png"
                />
              </li>
              <li>Testimonial</li>
              <li>Blogs</li>
              <li>Contact Us</li>
            </ul>
          </div>
        </div>
        <div className="flex items-end">
          <div className="font-bold text-lg text-color">
            {userData ? (
              <div className="flex items-center xl:gap-5 gap-3">
                {((userToken &&
                  !!userData &&
                  JSON.parse(userData)?.query?.pathstatus === "7") ||
                  (JSON.parse(userData)?.query?.pathstatus === "3" &&
                    JSON.parse(userData)?.query?.lastlogout !== null)) && (
                  <PrimaryButton
                    onClick={handleGotoDashboard}
                    name="Go to Dashboard"
                    className="xl:px-[30px] px-[15px] py-2 primary-background !font-calibri text-lg font-bold"
                  />
                )}
                <PrimaryButton
                  onClick={handleLogout}
                  name="Logout"
                  className="xl:px-[60px] px-[45px] py-2 primary-background !font-calibri text-lg font-bold"
                />
              </div>
            ) : (
              <>
                <PrimaryButton
                  onClick={() => {
                    navigate("/register");
                  }}
                  name="Register"
                  className="xl:px-[39px] px-[30px] py-2 primary-background !font-calibri text-lg font-bold"
                />
                <PrimaryButton
                  onClick={() => {
                    navigate("/auth");
                  }}
                  name="Login"
                  className="xl:px-[39px] px-[45px] ml-5 py-2 primary-background !font-calibri text-lg font-bold"
                />
              </>
            )}
          </div>
          <img className="xl:ml-7 ml-2" src={Logo2} />
        </div>
      </div>
      <Loading isLoading={isPending} />
    </header>
  );
}

export default Header;
