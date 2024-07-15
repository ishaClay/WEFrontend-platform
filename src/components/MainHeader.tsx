import Logo2 from "../assets/images/logo2.png";
import { VscBellDot } from "react-icons/vsc";
import { IoMdArrowDropdown } from "react-icons/io";
import { useEffect, useState } from "react";
import DrawerPage from "./DrawerPage";
import { sidebarLayout } from "@/lib/utils";
import { SidebarItem } from "./layouts/DashboardLayout";
import { AlignLeft } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Modal from "./comman/Modal";
import ModalTabs from "./myCourse/ModalTab/ModalTabs";

type mainHeraderProps = {
  title: string;
};

const MainHeader = ({ title }: mainHeraderProps) => {
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openType, setOpenType] = useState("");
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const userRole = userData?.query?.role;
  const [data, setData] = useState<SidebarItem[]>([]);
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
  return (
    <>
      <header className="sm:bg-[#FAFAFA] bg-transparent">
        <div className=" text-[#3A3A3A] font-[calibri] first-line:items-center justify-between xl:px-6 sm:px-5 px-4 w-full sm:flex hidden h-[120px] sm:leading-[120px] leading-[90px]">
          <ul className="flex items-center font-normal text-[16px] sm:gap-5 gap-3">
            <li className="">
              <AlignLeft
                className="sm:w-8 sm:h-8 h-6 w-6"
                onClick={() => setOpen(true)}
              />
            </li>

            <li className="xl:text-2xl md:text-lg text-[18px] font-bold font-nunito text-black line-clamp-1 capitalize">
              {title}
            </li>
          </ul>

          <div className="flex xl:gap-4 sm:gap-3 gap-1">
            <div className="text-sm flex items-center xl:gap-9 sm:gap-6 gap-3 relative">
              <VscBellDot className="w-[24px] h-[24px] " />

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
                    <DropdownMenuItem>Log Out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="">
              <img
                className="md:w-[136px] md:h-[105px] w-[100px] h-[75px]"
                src={Logo2}
                alt="Logo 2"
              />
            </div>
          </div>
        </div>
        <div className="p-5 text-[#3A3A3A] font-[calibri] items-center justify-between w-full sm:hidden block">
          <div className="flex items-center font-normal text-[16px] sm:gap-5 gap-3 justify-between">
            <div className="flex items-center gap-2.5">
              <div className="">
                <AlignLeft
                  className="sm:w-8 sm:h-8 h-6 w-6"
                  onClick={() => setOpen(true)}
                />
              </div>

              <p className="text-xl font-bold font-nunito text-black line-clamp-1 capitalize">
                {title}
              </p>
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
                    <DropdownMenuItem>Log Out</DropdownMenuItem>
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
    </>
  );
};

export default MainHeader;
