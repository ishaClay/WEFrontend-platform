import { Bell, ChevronLeft, Search } from "lucide-react";
import profile_img from "@/assets/images/face_1.jfif";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import DrawerPage from "./DrawerPage";
import { sidebarLayout } from "@/lib/utils";
import { SidebarItem } from "./layouts/DashboardLayout";
import { Button } from "./ui/button";

type headerTitleProps = {
  title: string;
  subtitle?: string;
};

const EmployeeHeader = ({ title, subtitle }: headerTitleProps) => {
  const [open, setOpen] = useState(false);
  const userData = localStorage.getItem("user");
  const userRole = userData ? JSON.parse(userData)?.query?.role : null;
  // const userRole = 4;
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
              className={`${
                subtitle ? `sm:block hidden` : `block`
              } xl:text-2xl md:text-lg text-[18px] font-bold font-nunito text-black line-clamp-1 capitalize`}
            >
              {title}
            </h4>
            <h4 className="xl:text-2xl md:text-lg text-[18px] font-medium font-nunito sm:text-[#00778B] text-black">
              {subtitle}
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
            <div className="lg:w-[42px] w-[40px] lg:h-[42px] h-[40px] lg:bg-[#F5F5F5] bg-white rounded-full flex justify-center items-center relative cursor-pointer">
              <Bell />
              <div className="w-[22px] h-[22px] rounded-full bg-[#FF5252] text-white absolute top-[-10px] right-[-5px] text-center">
                5
              </div>
            </div>
            <div className="flex gap-3 cursor-pointer">
              <div className="lg:w-[42px] w-[40px] lg:h-[42px] h-[40px] rounded-full overflow-hidden">
                <img src={profile_img} alt="" />
              </div>
              <div className="lg:block hidden">
                <h5 className="xl:text-base text-sm font-nunito text-black font-semibold">
                  Emilla Anderson
                </h5>
                <h6 className="xl:text-base text-sm font-nunito text-black">
                  Team Member
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:invisible visible">
        <DrawerPage sidebarItems={data} open={open} setOpen={setOpen} />
      </div>
    </>
  );
};

export default EmployeeHeader;
