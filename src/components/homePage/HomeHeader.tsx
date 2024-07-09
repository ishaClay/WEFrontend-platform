import SideHeaderLogo from "@/assets/images/logo2.png";
import { LogOut } from "@/services/apiServices/authService";
import { ResponseError } from "@/types/Errors";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../comman/Button/CustomButton";
import Loading from "../comman/Error/Loading";
import { toast } from "../ui/use-toast";
interface headerProps {
  hasDiffHeader?: boolean;
}

function HomeHeader(props: headerProps) {
  const navigate = useNavigate();

  const userData = localStorage?.getItem("user");
  const path = JSON.parse(localStorage?.getItem("path") as string);

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

    switch (+user.role) {
      case 1:
        navigate(`/company/dashboard`);
        break;
      case 2:
        navigate(`/trainer/dashboard`);
        break;
      case 3:
        navigate(`/trainee/dashboard`);
        break;
      case 4:
        navigate(`/employee/dashboard`);
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
              src="../assets/img/logo1.png"
            />
          </div>
          <div className="xl:ml-5 ml-3 text-[#1f1313]">
            <ul className="flex gap-[31px] font-normal text-base leading-5 font-calibri mb-3">
              <li className="group flex items-center gap-[5px]">
                <span className="cursor-pointer">Our Courses</span>
                <img
                  className="w-[6px] h-[6px]"
                  src="../assets/img/Vector 1.png"
                />
              </li>
              <li className="cursor-pointer">Blogs</li>
              <li className="cursor-pointer">Contact Us</li>
            </ul>
          </div>
        </div>
        <div className="flex items-end xl:gap-7 gap-2">
          <div className="font-bold text-lg text-color">
            {userData ? (
              <div className="flex items-center xl:gap-5 gap-3">
                {!!path && (+path === 7 || +path > 3) && (
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
          <img className="" src={SideHeaderLogo} />
        </div>
      </div>
      <Loading isLoading={isPending} />
    </header>
  );
}

export default HomeHeader;
