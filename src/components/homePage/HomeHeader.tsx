import main_logo from "@/assets/images/logo.png";
import SideHeaderLogo from "@/assets/images/logo2.png";
import vector from "@/assets/images/Vector_menu.png";
import { RegisterContext } from "@/context/RegisterContext";
import { LogOut } from "@/services/apiServices/authService";
import { ResponseError } from "@/types/Errors";
import { useMutation } from "@tanstack/react-query";
import { Menu } from "lucide-react";
import { useContext, useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../comman/Button/CustomButton";
import Loading from "../comman/Error/Loading";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";

interface headerProps {
  hasDiffHeader?: boolean;
}

function HomeHeader(props: headerProps) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { setSelectedRole, setShowRegistrationForm } =
    useContext(RegisterContext);

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

  const handleClickRegister = () => {
    navigate("/register");
    setShowRegistrationForm(false);
    setSelectedRole(null);
  };

  return (
    // Note : This below code is for backup
    <div className=" sticky top-0 h-full z-[9] lg:shadow-none shadow-md bg-white">
      <header
        className={`xl:max-w-[1160px] max-w-full w-full mx-auto xl:px-0 px-4 py-7 ${
          props.hasDiffHeader ? "mx-7" : ""
        }`}
      >
        <div className="lg:block hidden">
          <div className="flex justify-between gap-4">
            <div className="flex items-end">
              <div
                className={` ${
                  !props.hasDiffHeader ? "xl:mr-[22px] mr-2" : ""
                }`}
              >
                <img
                  onClick={() => {
                    navigate("/");
                  }}
                  className="cursor-pointer"
                  src={main_logo}
                />
              </div>
              <div className="text-[#1f1313]">
                <ul className="flex gap-[31px] font-normal text-base leading-5 font-calibri mb-3">
                  <li className="group flex items-center gap-[5px]">
                    <span className="cursor-pointer">Our Courses</span>
                    <img className="w-[6px] h-[6px]" src={vector} />
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
                    {JSON.parse(userData)?.query.role === 1 &&
                    !!path &&
                    (+path === 7 || +path > 3) ? (
                      <PrimaryButton
                        onClick={handleGotoDashboard}
                        name="Go to Dashboard"
                        className="xl:px-[30px] px-[15px] py-2 primary-background !font-calibri text-lg font-bold"
                      />
                    ) : (
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
                      onClick={handleClickRegister}
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
        </div>
        <div className="lg:hidden block">
          <div className="flex justify-between items-center relative">
            <div
              className={` ${!props.hasDiffHeader ? "xl:mr-[22px] mr-2" : ""}`}
            >
              <img
                onClick={() => {
                  navigate("/");
                }}
                className="cursor-pointer w-[108px] h-[71px]"
                src={main_logo}
              />
            </div>
            <ClickAwayListener onClickAway={() => setOpen(false)}>
              <div className="">
                <Button
                  onClick={() => setOpen(!open)}
                  type="button"
                  className="bg-transparent text-black p-0"
                >
                  <Menu />
                </Button>
                <div
                  className={`z-50 absolute bg-white w-full min-h-[269px] h-full ${
                    open
                      ? "bottom-[-310px] visible opacity-100"
                      : "bottom-[-350px] invisible opacity-0"
                  }  duration-500 ease-in-out right-0 rounded-xl`}
                >
                  <div className="px-7 py-5 flex items-center justify-between flex-col w-full h-full">
                    <ul className="flex flex-col gap-2 mb-[14px] w-full">
                      <li className="group flex items-center justify-between border-b border-[#B9B9B9] pb-2">
                        <span className="cursor-pointer">Our Courses</span>
                        <img src={vector} alt="icon" />
                      </li>
                      <li className="group flex items-center justify-between border-b border-[#B9B9B9] pb-2">
                        <span className="cursor-pointer">Blogs</span>
                        {/* <img src={vector} alt="icon" /> */}
                      </li>
                      <li className="group flex items-center justify-between border-b border-[#B9B9B9] pb-2">
                        <span className="cursor-pointer">Contact Us</span>
                        {/* <img src={vector} alt="icon" /> */}
                      </li>
                    </ul>
                    <div className="flex flex-col gap-3 w-full">
                      <div className="font-bold text-lg text-color">
                        {userData ? (
                          <div className="flex sm:flex-row flex-col items-center xl:gap-5 gap-3">
                            {!!path && (+path === 7 || +path > 3) && (
                              <PrimaryButton
                                onClick={handleGotoDashboard}
                                name="Go to Dashboard"
                                className="xl:px-[30px] px-[15px] py-2 primary-background !font-calibri text-lg font-bold sm:w-auto w-full"
                              />
                            )}
                            <PrimaryButton
                              onClick={handleLogout}
                              name="Logout"
                              className="xl:px-[60px] px-[45px] py-2 primary-background !font-calibri text-lg font-bold sm:w-auto w-full"
                            />
                          </div>
                        ) : (
                          <div className="flex sm:flex-row flex-col items-center xl:gap-5 gap-3">
                            <PrimaryButton
                              onClick={handleClickRegister}
                              name="Register"
                              className="xl:px-[39px] px-[30px] py-2 primary-background !font-calibri text-lg font-bold sm:w-auto w-full"
                            />
                            <PrimaryButton
                              onClick={() => {
                                navigate("/auth");
                              }}
                              name="Login"
                              className="xl:px-[39px] px-[45px] py-2 primary-background !font-calibri text-lg font-bold sm:w-auto w-full"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ClickAwayListener>
          </div>
        </div>
        <Loading isLoading={isPending} />
      </header>
    </div>
  );
}

export default HomeHeader;
