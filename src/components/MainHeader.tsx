import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { VscBellDot } from "react-icons/vsc";
import Logo2 from "../assets/images/logo2.png";
import Modal from "./comman/Modal";
import ModalTabs from "./myCourse/ModalTab/ModalTabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const MainHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openType, setOpenType] = useState("");
  const userData = JSON.parse(localStorage.getItem("user") as string);
  return (
    <header className="  bg-[#FAFAFA] h-[120px]">
      <div className=" text-[#3A3A3A] font-[calibri] flex justify-between ">
        <ul className="flex  font-[400px] text-[16px] gap-8 ">
          <li className="mt-[48px] ml-[20px]">
            <RxHamburgerMenu className="w-8 h-8" />
          </li>

          <li className="text-[#00778B] mt-[50px]">MyDashboard</li>
        </ul>

        <div className="flex ">
          <div className="  text-[14px]  flex items-center space-x-2 relative">
            {/* <img src={icon} alt="bell" /> */}
            <VscBellDot className=" h-[50px] w-[20px] mr-[15px] " />

            <DropdownMenu>
              <DropdownMenuTrigger>
                Hi, {userData?.query?.email?.split("@")[0]}
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
            {/* <img className="  w-[11px] h-[15px] text-[#3A3A3A]" src="../assets/img/Dropdown.png" alt="Dropdown" /> */}
            <IoMdArrowDropdown className=" w-[20px] h-[20px] mt-[2px] " />
          </div>
          <div className="ml-[10px] mt-[14px]">
            <img className="  w-[136px] h-[105px]" src={Logo2} alt="Logo 2" />
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
        <ModalTabs tab={openType} />
      </Modal>
    </header>
  );
};

export default MainHeader;
