import React from "react";
import EmployeeListSidebar from "../EmployeeListSidebar";
import HeaderCourse from "../HeaderCourse";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex bg-[#F5F7FF] overflow-hidden">
      <div className=" ">
        <EmployeeListSidebar />
      </div>
      <div className="w-full">
        <div className="">
          <HeaderCourse />
        </div>
        <div className="p-4">
          <div className="bg-white p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
