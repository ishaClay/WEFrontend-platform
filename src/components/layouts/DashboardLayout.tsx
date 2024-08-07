import { sidebarLayout } from "@/lib/utils";
import { useContext, useEffect, useState } from "react";
import { IconType } from "react-icons/lib";
import { Outlet } from "react-router-dom";
import EmployeeMessaging from "../EmployeeMessage/EmployeeMessaging";
import HeaderCourse from "../HeaderCourse";
import Sidebar from "../Sidebar";
import { SidebarContext } from "@/context/Sidebarcontext";

export interface SidebarItem {
  label: string;
  Icon: IconType;
  link: string;
  children: {
    label: string;
    link: string;
  }[];
}

const DashboardLayout = () => {
  const userData = localStorage.getItem("user");
  const userRole = userData ? JSON.parse(userData)?.query?.role : null;
  const location = window.location.pathname;
  const Role = location.split("/")[1];
  const { sidebarOpen } = useContext(SidebarContext);
  console.log("sidebarOpen", sidebarOpen);
  
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
    <div className="flex bg-[#F5F7FF] overflow-hidden">
      <div className="lg:block hidden">
        <Sidebar sidebarItems={data} />
      </div>
      <div className={`relative ${sidebarOpen ? "w-[calc(100%-260px)]" : "w-[calc(100%-60px)]"}`}>
        <HeaderCourse />
        <div>
          <div
            className={`${
              Role === "employee"
                ? "h-[calc(100vh-130px)]"
                : "sm:h-[calc(100vh-120px)] h-[calc(100vh-164px)]"
            } overflow-auto p-5`}
          >
            <Outlet />
          </div>
        </div>
        {Role === "employee" && (
          <div className="absolute lg:bottom-0 lg:right-5 bottom-[20px] right-[20px] lg:bg-white bg-transparent z-[50]">
            <EmployeeMessaging />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardLayout;
