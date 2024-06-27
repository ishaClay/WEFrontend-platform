import { sidebarLayout } from "@/lib/utils";
import { useEffect, useState } from "react";
import { IconType } from "react-icons/lib";
import { Outlet } from "react-router-dom";
import HeaderCourse from "../HeaderCourse";
import Sidebar from "../Sidebar";

interface SidebarItem {
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
  // const userRole = 2;
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
      <div>
        <Sidebar sidebarItems={data} />
      </div>
      <div className="w-full">
        <HeaderCourse />
        <div className="p-4 ">
          <div className="h-[calc(100vh-152px)] overflow-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
