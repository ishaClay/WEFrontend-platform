import EmployeeListSidebar from "../EmployeeListSidebar";
import HeaderCourse from "../HeaderCourse";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import { RxDashboard } from "react-icons/rx";
import { RiShutDownLine } from "react-icons/ri";
import { LuMapPin } from "react-icons/lu";
import { FaUserGroup } from "react-icons/fa6";
import { PiEnvelopeThin } from "react-icons/pi";
import { BsTicketPerforated } from "react-icons/bs";
import { TfiBook } from "react-icons/tfi";
import { FiSettings } from "react-icons/fi";
import { useEffect, useState } from "react";

interface SidebarItem {
  label: string;
  Icon: JSX.Element;
  link: string;
  children?: any;
}

const sidebar2: SidebarItem[] = [
  {
    label: "Dashboard",
    Icon: <RxDashboard size={22} />,
    link: "/dashbord",
    children: [],
  },
  {
    label: "Course Management",
    Icon: <TfiBook size={22} />,
    link: "#",
    children: [
      {
        label: "Allocated Courses",
        link: "/allocatedcourses",
      },
      {
        label: "Recommended Courses",
        link: "/coursesrecommended",
      },
      {
        label: "All Courses",
        link: "/allcourses",
      },
    ],
  },
  {
    label: "Team Management",
    Icon: <FaUserGroup size={22} />,
    link: "#",
    children: [
      {
        label: "Team List",
        link: "/employeelist",
      },
      {
        label: "Team Progress",
        link: "/employeeprogress",
      },
    ],
  },
  {
    label: "Support",
    Icon: <BsTicketPerforated size={22} />,
    link: "#",
    children: [
      {
        label: "FAQ's",
        link: "/faqslist",
      },
      {
        label: "User Manual",
        link: "/trainingdocument",
      },
      {
        label: "Support Request",
        link: "/supportticket",
      },
    ],
  },
  {
    label: "Setting",
    Icon: <FiSettings size={22} />,
    link: "/employeepermission",
    children: [],
  },
  {
    label: "Message",
    Icon: <PiEnvelopeThin size={22} />,
    link: "/messaging",
    children: [],
  },
  {
    label: "Employee Management",
    Icon: <FaUserGroup size={22} />,
    link: "#",
    children: [
      {
        label: "Team List",
        link: "/employeelist",
      },
      {
        label: "Team Progress",
        link: "/employeeprogress",
      },
    ],
  },
  {
    label: "Logout",
    Icon: <RiShutDownLine size={22} />,
    link: "/login",
    children: [],
  },
];

const sidebar1: SidebarItem[] = [
  {
    label: "Dashboard",
    Icon: <RxDashboard size={22} />,
    link: "/dashbord",
    children: [],
  },
  {
    label: "Maturity Assessment",
    Icon: <LuMapPin size={22} />,
    link: "/maturityassessmentroadmap",
    children: [],
  },
  {
    label: "Course Management",
    Icon: <TfiBook size={22} />,
    link: "#",
    children: [
      {
        label: "Enrollment Requests",
        link: "/trainer/enrolledrequest",
      },
      {
        label: "Enrolled Courses",
        link: "/trainer/enrolledcourses",
      },
      {
        label: "All Courses",
        link: "/trainer/allcourse",
      },
      {
        label: "Live Sessions",
        link: "/trainer/allcourses",
      },
    ],
  },
  {
    label: "Team Management",
    Icon: <FaUserGroup size={22} />,
    link: "#",
    children: [
      {
        label: "Team List",
        link: "/employeelist",
      },
      {
        label: "Team Progress",
        link: "/employeeprogress",
      },
    ],
  },
  {
    label: "Support",
    Icon: <BsTicketPerforated size={22} />,
    link: "#",
    children: [
      {
        label: "FAQ's",
        link: "/faqslist",
      },
      {
        label: "User Manual",
        link: "/trainingdocument",
      },
      {
        label: "Support Request",
        link: "/supportticket",
      },
    ],
  },
  {
    label: "Setting",
    Icon: <FiSettings size={22} />,
    link: "/employeepermission",
    children: [],
  },
  {
    label: "Message",
    Icon: <PiEnvelopeThin size={22} />,
    link: "/messaging",
    children: [],
  },
  {
    label: "Logout",
    Icon: <RiShutDownLine size={22} />,
    link: "/login",
    children: [],
  },
];

const DashboardLayout = () => {
  const [num, setNum] = useState(1);
  const [data, setData]: any = useState([]);

  useEffect(() => {
    setNum(1);
    switch (num) {
      case 1:
        setData(sidebar1);
        break;

      case 2:
        setData(sidebar2);
        break;
    }
  }, []);

  return (
    <div className="flex bg-[#F5F7FF] overflow-hidden">
      <div>
        <Sidebar sidebarItems={data} />
        {/* <EmployeeListSidebar /> */}
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
