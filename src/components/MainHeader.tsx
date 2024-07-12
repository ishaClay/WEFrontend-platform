import { RxHamburgerMenu } from "react-icons/rx";
import Logo2 from "../assets/images/logo2.png";
import { VscBellDot } from "react-icons/vsc";
import { IoMdArrowDropdown } from "react-icons/io";

const MainHeader = () => {
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

            <span>Hi, Evergrow</span>
            {/* <img className="  w-[11px] h-[15px] text-[#3A3A3A]" src="../assets/img/Dropdown.png" alt="Dropdown" /> */}
            <IoMdArrowDropdown className=" w-[20px] h-[20px] mt-[2px] " />
          </div>
          <div className="ml-[10px] mt-[14px]">
            <img className="  w-[136px] h-[105px]" src={Logo2} alt="Logo 2" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
