import { SidebarContext } from "@/context/Sidebarcontext";
import { useAppDispatch } from "@/hooks/use-redux";
import { sidebarLayout } from "@/lib/utils";
import { setPath } from "@/redux/reducer/PathReducer";
import { LogOut } from "@/services/apiServices/authService";
import { ResponseError } from "@/types/Errors";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { Bell, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { BreadcrumbWithCustomSeparator } from "./comman/Breadcrumb";
import Loading from "./comman/Error/Loading";
import Modal from "./comman/Modal";
import DrawerPage from "./DrawerPage";
import { SidebarItem } from "./layouts/DashboardLayout";
import { AlertLogOutDialog } from "./Models/AlertLogOut";
import ModalTabs from "./myCourse/ModalTab/ModalTabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { toast } from "./ui/use-toast";

const EmployeeHeader = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const userRole = userData?.query?.role;
  const { setSidebarOpen, sidebarOpen } = useContext(SidebarContext);

  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openType, setOpenType] = useState("");
  const dispatch = useAppDispatch();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [data, setData] = useState<SidebarItem[]>([]);

  const { mutate, isPending } = useMutation({
    mutationFn: LogOut,
    onSuccess: () => {
      Cookies.remove("accessToken");
      localStorage.removeItem("user");
      navigate("/auth");
      dispatch(setPath([]));
    },
    onError: (error: ResponseError) => {
      toast({
        title: "Error",
        description: error?.data?.message || "Internal server error",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    switch (+userRole) {
      case 1:
        setData(sidebarLayout.companySidebar);
        break;
      case 2:
        setData(sidebarLayout.TarinerSidebar);
        break;
      case 3:
        setData(sidebarLayout.TarineeSidebar);
        break;
      case 4:
        setData(sidebarLayout.companyEmployeeSidebar);
        break;
    }
  }, [userRole]);

  const userName =
    userData &&
    (userData?.query?.fname && userData?.query?.lname
      ? userData?.query?.fname
      : userData?.query?.email?.split("@")[0]);

  const handleLogout = () => {
    setIsAlertOpen(true);
  };

  const handleConfirmLogout = () => {
    Cookies.remove("accessToken");
    mutate(userData?.query?.id);
  };

  return (
    <>
      <div className="lg:bg-white bg-transparent rounded-t-xl">
        <Button
          variant={"ghost"}
          type="button"
          className="lg:block hidden h-auto shadow-xl p-1 top-8 bg-white rounded-lg rounded-tl-none rounded-bl-none hover:bg-white absolute left-0 "
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? (
            <ChevronLeft className="sm:w-8 sm:h-8 h-6 w-6" />
          ) : (
            <ChevronRight className="sm:w-8 sm:h-8 h-6 w-6" />
          )}
        </Button>
        <div className="flex justify-between items-center lg:border-b border-[#F1F1F1] px-5 sm:h-[130px] h-[70px]">
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant={"ghost"}
              onClick={() => setOpen(true)}
              className="p-0 h-auto hover:bg-transparent lg:hidden block pr-2.5 bg-transparent"
            >
              <ChevronLeft />
            </Button>
            <div
              className={`xl:text-2xl lg:pl-8 md:text-lg text-[18px] font-bold font-droid text-black line-clamp-1 capitalize`}
            >
              {/* {title} */}
              <h3 className="xl:text-2xl md:text-lg text-[18px] font-bold font-droid text-black capitalize leading-[22px] h-auto mb-2">
                Welcome
                {/* {userData?.query?.name?.split("@")[0]} */}
              </h3>
              <BreadcrumbWithCustomSeparator />
            </div>
          </div>
          <div className="flex-col justify-end md:flex hidden">
            <div className="flex gap-[22px]">
              <Link
                to={`/`}
                className="cursor-pointer text-[#63953B] 2xl:text-[48px] xl:text-[30px] text-[24px] font-abhaya font-bold"
              >
                G O I N G
              </Link>
              <Link
                to={`/`}
                className="cursor-pointer text-[#376513] 2xl:text-[48px] xl:text-[30px] text-[24px] font-abhaya font-bold"
              >
                G R E E N
              </Link>
            </div>
          </div>
          <div className="flex items-center lg:gap-4 gap-2.5">
            <div className="lg:hidden block">
              <div className="w-[40px] h-[40px] rounded-full bg-white flex justify-center items-center">
                <Search />
              </div>
            </div>
            <Link
              to={"/employee/notification-list"}
              className="lg:w-[42px] w-[40px] lg:h-[42px] h-[40px] lg:bg-[#F5F5F5] bg-white rounded-full flex justify-center items-center relative cursor-pointer"
            >
              <Bell />
              {/* <div className="w-[22px] h-[22px] rounded-full bg-[#FF5252] text-white absolute top-[-10px] right-[-5px] text-center">
                5
              </div> */}
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="">
                <div className="flex items-center gap-3 cursor-pointer">
                  <div className="overflow-hidden">
                    <Avatar className="lg:w-[42px] w-[40px] lg:h-[42px] h-[40px] rounded-full ">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-slate-300 uppercase">
                        {userData?.query?.fname?.charAt(0) +
                          userData?.query?.lname?.charAt(0) ||
                          userData?.query?.email?.split("@")[0]?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex items-center">
                    <div className="lg:block hidden text-left">
                      <h5 className="xl:text-base text-sm font-droid text-black font-medium capitalize">
                        Hi, {userName}
                      </h5>
                      <h6 className="xl:text-sm text-xs font-droid leading-1 text-black">
                        {+userRole === 4 && "Employee"}
                      </h6>
                      <p className="xl:text-sm text-xs max-w-[150px] truncate capitalize">
                        {userData?.company?.userDetails?.name}
                      </p>
                    </div>
                    <IoMdArrowDropdown className="w-[20px] h-[20px] ml-2" />
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => {
                    setIsOpen(true);
                    setOpenType("profile");
                  }}
                >
                  User Settings
                </DropdownMenuItem>
                {/* <DropdownMenuItem
                  onClick={() => {
                    setIsOpen(true);
                    setOpenType("account");
                  }}
                >
                  Account Setting
                </DropdownMenuItem> */}
                <DropdownMenuItem onClick={handleLogout}>
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* <div className="lg:block hidden">
              <img
                className="md:w-[136px] md:h-[105px] w-[100px] h-[75px]"
                src={Logo2}
                alt="Logo 2"
              />
            </div> */}
          </div>
        </div>
      </div>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="lg:max-w-[610px] sm:max-w-xl max-w-[335px] p-5 rounded-xl"
        header="Settings"
        titleClassName="font-droid text-xl text-black font-bold"
      >
        <ModalTabs tab={openType} handleClose={() => setIsOpen(false)} />
      </Modal>
      <div className="lg:invisible visible">
        <DrawerPage sidebarItems={data} open={open} setOpen={setOpen} />
      </div>
      {isPending && <Loading isLoading={isPending} />}
      <AlertLogOutDialog
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        onConfirm={handleConfirmLogout}
      />
    </>
  );
};

export default EmployeeHeader;
