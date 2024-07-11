import { sidebarLayout } from "@/lib/utils";
import { useEffect, useState } from "react";
import { IconType } from "react-icons/lib";
import { Outlet } from "react-router-dom";
import HeaderCourse from "../HeaderCourse";
import Sidebar from "../Sidebar";
import EmployeeMessaging from "../EmployeeMessage/EmployeeMessaging";

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
      <div className="w-full m-5 relative">
        <HeaderCourse />
        <div>
          <div
            className={`${
              Role === "employee"
                ? "h-[calc(100vh-110px)]"
                : "h-[calc(100vh-162px)]"
            } overflow-auto`}
          >
            <Outlet />
          </div>
        </div>
        {Role === "employee" && (
          <div className="absolute bottom-0 right-0 bg-white">
            <EmployeeMessaging />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardLayout;
