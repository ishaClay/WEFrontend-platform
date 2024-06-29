import { Bell, Search } from "lucide-react";
import profile_img from "@/assets/images/face_1.jfif";
import { Input } from "./ui/input";

type headerTitleProps = {
  title: string;
};

const EmployeeHeader = ({ title }: headerTitleProps) => {
  return (
    <div className="flex justify-between items-center pb-4 border-b border-[#F1F1F1]">
      <div className="">
        <h4 className="xl:text-2xl md:text-lg text-[18px] font-bold font-nunito text-black">
          {title}
        </h4>
      </div>
      <div className="flex md:gap-4 gap-2.5">
        <div className="hidden md:flex items-center px-4 py-3 border border-[#D9D9D9] rounded-md">
          <Search className="text-[#D9D9D9]" />
          <Input
            placeholder="Search..."
            className="text-[15px] text-[#A3A3A3] font-inter border-none outline-none py-0 px-2 h-6 placeholder:text-[#A3A3A3]"
          />
        </div>
        <div className="md:hidden block">
          <div className="w-[40px] h-[40px] rounded-full bg-[#F5F5F5] flex justify-center items-center">
            <Search />
          </div>
        </div>
        <div className="md:w-[42px] w-[40px] md:h-[42px] h-[40px] bg-[#F5F5F5] rounded-full flex justify-center items-center relative cursor-pointer">
          <Bell />
          <div className="w-[22px] h-[22px] rounded-full bg-[#FF5252] text-white absolute top-[-10px] right-[-5px] text-center">
            5
          </div>
        </div>
        <div className="flex gap-3 cursor-pointer">
          <div className="md:w-[42px] w-[40px] md:h-[42px] h-[40px] rounded-full overflow-hidden">
            <img src={profile_img} alt="" />
          </div>
          <div className="md:block hidden">
            <h5 className="text-base font-nunito text-black font-semibold">
              Emilla Anderson
            </h5>
            <h6 className="text-base font-nunito text-black">Team Member</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeHeader;
