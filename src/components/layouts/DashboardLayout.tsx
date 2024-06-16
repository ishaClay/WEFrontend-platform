import { useEffect, useState } from "react";
import { BsTicketPerforated } from "react-icons/bs";
import { FaUserGroup } from "react-icons/fa6";
import { FiSettings } from "react-icons/fi";
import { LuMapPin } from "react-icons/lu";
import { PiEnvelopeThin } from "react-icons/pi";
import { RiShutDownLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { TfiBook } from "react-icons/tfi";
import { Outlet } from "react-router-dom";
import HeaderCourse from "../HeaderCourse";
import Sidebar from "../Sidebar";

interface SidebarItem {
  label: string;
  Icon: JSX.Element;
  link: string;
  children?: {
    label: string;
    link: string;
  }[];
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

const TarinerSidebar: SidebarItem[] = [
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
    label: "Trainer Management",
    Icon: <FaUserGroup size={22} />,
    link: "/trainer/trainer-management",
    children: [],
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
  const [num, setNum] = useState(3);
  const [data, setData] = useState<SidebarItem[]>([]);
  0;
  useEffect(() => {
    setNum(1);
    switch (num) {
      case 3:
        setData(TarinerSidebar);
        break;

      case 2:
        setData(sidebar2);
        break;
    }
  }, [num]);

  return (
    <div className="flex bg-[#F5F7FF] overflow-hidden">
      <div>
        <Sidebar sidebarItems={data} />
        {/* <EmployeeListSidebar /> */}
      </div>
      <div className="w-full">
        <HeaderCourse />
        <div className="p-4 h-[calc(100vh-135px)] overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
