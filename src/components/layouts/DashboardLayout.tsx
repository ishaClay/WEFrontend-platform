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
        <HeaderCourse />
        <div className="p-4 h-[calc(100vh-135px)] overflow-auto">
          <div className="bg-white p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
