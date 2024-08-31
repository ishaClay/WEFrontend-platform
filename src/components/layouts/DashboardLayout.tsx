import { SidebarContext } from "@/context/Sidebarcontext";
import { ChatBotProvider } from "@/context/chatBotContext";
import { QUERY_KEYS } from "@/lib/constants";
import { sidebarLayout } from "@/lib/utils";
import { pillarLimit } from "@/services/apiServices/pillar";
import { UserRole } from "@/types/UserRole";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { IconType } from "react-icons/lib";
import { Outlet } from "react-router-dom";
import EmployeeMessaging from "../EmployeeMessage/EmployeeMessaging";
import HeaderCourse from "../HeaderCourse";
import Sidebar from "../Sidebar";
import Loading from "../comman/Error/Loading";

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
  const user = userData ? JSON.parse(userData) : null;
  const location = window.location.pathname;
  const Role = location.split("/")[1];
  const { sidebarOpen } = useContext(SidebarContext);

  // const userRole = 4;
  const [data, setData] = useState<SidebarItem[]>([]);

  const { data: selectTargetPillarLimit, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.selectTargetPillarLimit, userData],
    queryFn: () => pillarLimit(user?.query?.detailsid as string),
    enabled: !!user && +user?.query?.role === UserRole.Trainer,
  });

  const TrainerPermission =
    selectTargetPillarLimit &&
    +selectTargetPillarLimit?.data?.certificationAccess === 1
      ? sidebarLayout.TarinerSidebar
      : sidebarLayout.TarinerSidebar?.filter(
          (item) => item?.label !== "Certificate Management"
        );

  useEffect(() => {
    switch (+userRole) {
      case 1:
        setData(sidebarLayout.companySidebar);
        break;
      case 2:
        setData(TrainerPermission);
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
    <ChatBotProvider>
      <div className="lg:flex bg-[#F5F7FF] overflow-hidden">
        <div className="lg:block hidden">
          <Sidebar sidebarItems={data} />
        </div>
        <div
          className={`relative ${
            sidebarOpen
              ? "2xl:w-[calc(100%-260px)] lg:w-[calc(100%-235px)]"
              : "lg:w-[calc(100%-60px)]"
          }`}
        >
          <HeaderCourse />
          <div>
            <div
              className={`${
                Role === "employee"
                  ? "h-[calc(100vh-130px)]"
                  : "sm:h-[calc(100vh-120px)] h-[calc(100vh-144px)]"
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
      <Loading isLoading={isLoading} />
    </ChatBotProvider>
  );
};

export default DashboardLayout;
