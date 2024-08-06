import { sidebarLayout } from "@/lib/utils";
import { LogOut } from "@/services/apiServices/authService";
import { ResponseError } from "@/types/Errors";
import { useMutation } from "@tanstack/react-query";
import { Bell, ChevronLeft, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BreadcrumbWithCustomSeparator } from "./comman/Breadcrumb";
import Loading from "./comman/Error/Loading";
import Modal from "./comman/Modal";
import DrawerPage from "./DrawerPage";
import { SidebarItem } from "./layouts/DashboardLayout";
import ModalTabs from "./myCourse/ModalTab/ModalTabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import { toast } from "./ui/use-toast";
import { setPath } from "@/redux/reducer/PathReducer";
import { useAppDispatch } from "@/hooks/use-redux";
import { AlertLogOutDialog } from "./Models/AlertLogOut";


const EmployeeHeader = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const userRole = userData?.query?.role;
 
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openType, setOpenType] = useState("");
  const dispatch=useAppDispatch()
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [data, setData] = useState<SidebarItem[]>([]);


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
      ? userData?.query?.fname + "" + userData?.query?.lname
      : userData?.query?.name
      ? userData?.query?.name
      : userData?.query?.email?.split("@")[0]);

  const handleLogout = () => {
    setIsAlertOpen(true)
  };
  
  const handleConfirmLogout = () => {
    mutate(userData?.query?.id);
  }

  return (
    <>
      <div className="lg:px-5 px-0 pt-[15px] lg:bg-white bg-transparent rounded-t-xl sm:pb-5 pb-2.5">
        <div className="flex justify-between items-center border-b border-[#F1F1F1] lg:pb-[11px] pb-5">
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant={"ghost"}
              onClick={() => setOpen(true)}
              className="p-0 h-auto hover:bg-transparent lg:hidden block pr-2.5 bg-transparent"
            >
              <ChevronLeft />
            </Button>
            <h4
              className={`xl:text-2xl md:text-lg text-[18px] font-bold font-nunito text-black line-clamp-1 capitalize`}
            >
              {/* {title} */}
              <h3 className="xl:text-2xl md:text-lg text-[18px] font-bold font-nunito text-black capitalize leading-[22px] h-auto mb-2">
                Welcome {userData?.query?.name?.split("@")[0]}
              </h3>
              <BreadcrumbWithCustomSeparator />
            </h4>
          </div>
          <div className="flex items-center lg:gap-4 gap-2.5">
            <div className="hidden lg:flex items-center px-4 py-3 border border-[#D9D9D9] rounded-md">
              <Search className="text-[#D9D9D9]" />
              <Input
                placeholder="Search..."
                className="text-[15px] text-[#A3A3A3] font-inter border-none outline-none py-0 px-2 h-6 placeholder:text-[#A3A3A3]"
              />
            </div>
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
              <DropdownMenuTrigger className="outline-none">
                <div className="flex items-center gap-3 cursor-pointer">
                  <div className="overflow-hidden">
                    <Avatar className="lg:w-[42px] w-[40px] lg:h-[42px] h-[40px] rounded-full ">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-slate-300 uppercase">
                        {userName?.charAt(0) + "" + userName?.charAt(1)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="lg:block hidden text-left">
                    <h5 className="xl:text-base text-sm font-nunito text-black font-semibold capitalize">
                      {userName}
                    </h5>
                    <h6 className="xl:text-base text-sm font-nunito text-black">
                      {userRole === "4" && "Employee"}
                    </h6>
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
