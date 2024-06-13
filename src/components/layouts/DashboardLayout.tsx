import React from "react";
import EmployeeListSidebar from "../EmployeeListSidebar";
import HeaderCourse from "../HeaderCourse";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex bg-[#F5F7FF] w-[1510px] h-[1310px] overflow-hidden">
      <div className=" ">
        <EmployeeListSidebar />
      </div>
      <div>
        <div className=" ">
          <HeaderCourse />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
