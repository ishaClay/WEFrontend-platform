import { SidebarContext } from "@/context/Sidebarcontext";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { sidebarLayout } from "@/lib/utils";
import { LogOut } from "@/services/apiServices/authService";
import { fetchNotificationCount } from "@/services/apiServices/notificationServices";
import { ResponseError } from "@/types/Errors";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AlignLeft } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { IoIosNotificationsOutline, IoMdArrowDropdown } from "react-icons/io";
import { VscBellDot } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import Logo2 from "../assets/images/logo2.png";
import Loading from "./comman/Error/Loading";
import Modal from "./comman/Modal";
import DrawerPage from "./DrawerPage";
import { SidebarItem } from "./layouts/DashboardLayout";
import ModalTabs from "./myCourse/ModalTab/ModalTabs";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { toast } from "./ui/use-toast";
import { BreadcrumbWithCustomSeparator } from "./comman/Breadcrumb";
import { setPath } from "@/redux/reducer/PathReducer";


const MainHeader = () => {
  const navigate = useNavigate();
  const { UserId } = useAppSelector((state) => state.user);

  const [open, setOpen] = useState(false);
  const { setSidebarOpen, sidebarOpen } = useContext(SidebarContext);
  const [isOpen, setIsOpen] = useState(false);
  const [openType, setOpenType] = useState("");
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const userRole = userData?.query?.role;
  const [data, setData] = useState<SidebarItem[]>([]);
  const userID = UserId ? UserId : userData?.query?.id;
  const dispatch = useAppDispatch();
  const pathName = window.location.pathname;
  const currentUser = pathName.split("/")[1];

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

  const { data: notification_count } = useQuery({
    queryKey: [QUERY_KEYS.notificationCount],
    queryFn: () => fetchNotificationCount(userID),
  });
  const { mutate, isPending } = useMutation({
    mutationFn: LogOut,
    onSuccess: () => {
      localStorage.removeItem("user");
      navigate("/");
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

  const handleLogout = () => {
    mutate(userData?.query?.id);
  };
  return (
    <>
      <header className="sm:bg-[#FAFAFA] bg-transparent">
        <div className=" text-[#3A3A3A] font-[calibri] first-line:items-center justify-between xl:px-6 sm:px-5 px-4 w-full sm:flex hidden h-[120px] sm:leading-[120px] leading-[90px]">
          <ul className="flex items-center font-normal text-[16px] sm:gap-5 gap-3">
            <li className="">
              <Button
                type="button"
                variant={"ghost"}
                onClick={() => setOpen(true)}
                className="lg:hidden block h-auto hover:bg-transparent"
              >
                <AlignLeft className="sm:w-8 sm:h-8 h-6 w-6" />
              </Button>
              <Button
                variant={"ghost"}
                type="button"
                className="lg:block hidden h-auto hover:bg-transparent"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <AlignLeft className="sm:w-8 sm:h-8 h-6 w-6" />
              </Button>
            </li>

            <li className="">
              {/* {title} */}
              <h3 className="xl:text-2xl md:text-lg text-[18px] font-bold font-nunito text-black capitalize leading-[22px] h-auto mb-2">
                Welcome {userData?.query?.email?.split("@")[0]}
              </h3>
              <BreadcrumbWithCustomSeparator />
            </li>
          </ul>

          <div className="flex xl:gap-4 sm:gap-3 gap-1">
            <div className="text-sm flex items-center xl:gap-9 sm:gap-6 gap-3 relative">
              <button
                type="button"
                className="relative inline-flex items-center justify-center w-[45px] h-[45px] text-sm  text-center bg-[#F5F5F5] rounded-[50%] focus:ring-4"
              >
                <IoIosNotificationsOutline
                  className="text-[30px]"
                  onClick={() =>
                    dispatch(
                      setPath([
                        {
                          label: "Notification List",
                          link: `/${currentUser}/notification-list`,
                        },
                      ])
                    )
                  }
                />
                {notification_count?.data?.count > 0 && (
                  <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                    {notification_count?.data?.count}
                  </div>
                )}
              </button>
              <div className="flex items-center gap-1">
                <DropdownMenu>
                  <DropdownMenuTrigger className="text-[18px] flex items-center gap-1">
                    Hi, {userData?.query?.email?.split("@")[0]}
                    <IoMdArrowDropdown className="w-[20px] h-[20px]" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => {
                        setIsOpen(true);
                        setOpenType("profile");
                      }}
                    >
                      Profile Setting
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setIsOpen(true);
                        setOpenType("account");
                      }}
                    >
                      Account Setting
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      Log Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="lg:block hidden">
              <img
                className="md:w-[136px] md:h-[105px] w-[100px] h-[75px]"
                src={Logo2}
                alt="Logo 2"
              />
            </div>
          </div>
        </div>
        <div className="sm:p-5 px-5 pt-5 pb-0 text-[#3A3A3A] font-[calibri] items-center justify-between w-full sm:hidden block">
          <div className="flex items-center font-normal text-[16px] sm:gap-5 gap-3 justify-between">
            <div className="flex items-center gap-2.5">
              <div className="">
                <AlignLeft
                  className="sm:w-8 sm:h-8 h-6 w-6"
                  onClick={() => setOpen(true)}
                />
              </div>

              {/* <p className="text-xl font-bold font-nunito text-black line-clamp-1 capitalize">
                {title[title?.length - 1]?.label}
              </p> */}
            </div>
            <div className="w-10 h-10 bg-white rounded-full flex justify-center items-center">
              <VscBellDot className="w-[24px] h-[24px] leading-10" />
            </div>
          </div>

          <div className="flex justify-between py-2.5">
            <div className="text-sm flex items-center xl:gap-9 sm:gap-6 gap-3 relative">
              <div className="flex items-center gap-1">
                <DropdownMenu>
                  <DropdownMenuTrigger className="text-[18px] flex items-center gap-1">
                    Hi, {userData?.query?.email?.split("@")[0]}
                    <IoMdArrowDropdown className="w-[20px] h-[20px]" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => {
                        setIsOpen(true);
                        setOpenType("profile");
                      }}
                    >
                      Profile Setting
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setIsOpen(true);
                        setOpenType("account");
                      }}
                    >
                      Account Setting
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      Log Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="">
              <img className="w-[81px] h-[64px]" src={Logo2} alt="Logo 2" />
            </div>
          </div>
        </div>
      </header>
      <div className="lg:invisible visible">
        <DrawerPage sidebarItems={data} open={open} setOpen={setOpen} />
      </div>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="lg:max-w-[610px] sm:max-w-xl max-w-[335px] p-5 rounded-xl"
        header="Settings"
        titleClassName="font-nunito text-xl text-black font-bold"
      >
        <ModalTabs tab={openType} handleClose={() => setIsOpen(false)} />
      </Modal>
      {isPending && <Loading isLoading={isPending} />}
    </>
  );
};

export default MainHeader;
