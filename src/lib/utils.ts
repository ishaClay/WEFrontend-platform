import { clsx, type ClassValue } from "clsx";
import moment from "moment";
import { AiOutlinePoweroff } from "react-icons/ai";
import { BsTicketPerforated } from "react-icons/bs";
import { FaUserGroup } from "react-icons/fa6";
import { FiSettings } from "react-icons/fi";
import { GrCertificate } from "react-icons/gr";
import { LuMapPin } from "react-icons/lu";
import { PiEnvelopeThin } from "react-icons/pi";
import { RxDashboard } from "react-icons/rx";
import { TfiBook } from "react-icons/tfi";
import { twMerge } from "tailwind-merge";
import Economic from "../assets/images/Economic.svg";
import Environmental from "../assets/images/Environmental.svg";
import Governance from "../assets/images/Governance.svg";
import GreenEconomic from "../assets/images/GreenEconomic.svg";
import GreenEnvironmental from "../assets/images/GreenEnvironmental.svg";
import GreenGovernance from "../assets/images/GreenGovernance.svg";
import GreenSocialGray from "../assets/images/GreenSocial.svg";
import GreenStrategicIntegrationGray from "../assets/images/GreenStratagic.svg";
import GreenTech from "../assets/images/GreenTech.svg";
import SocialGray from "../assets/images/Social.svg";
import StrategicIntegrationGray from "../assets/images/Stratagic.svg";
import Tech from "../assets/images/Tech.svg";
import { FileType } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getImages = (name: string, active?: boolean) => {
  switch (name) {
    case "Social":
      return active ? GreenSocialGray : SocialGray;
    case "Technology & Innovation":
      return active ? GreenTech : Tech;
    case "Economics":
      return active ? GreenEconomic : Economic;
    case "Economic":
      return active ? GreenEconomic : Economic;
    case "Governance":
      return active ? GreenGovernance : Governance;
    case "Enviromental":
      return active ? GreenEnvironmental : Environmental;
    case "Strategic Intergration":
      return active ? GreenStrategicIntegrationGray : StrategicIntegrationGray;
    case "Strategic Integration":
      return active ? GreenStrategicIntegrationGray : StrategicIntegrationGray;
    default:
      return active ? GreenEnvironmental : Environmental;
  }
};

export const sidebarLayout = {
  TarinerSidebar: [
    {
      label: "Dashboard",
      Icon: RxDashboard,
      link: "/trainer/dashboard",
      children: [],
    },
    {
      label: "Course Management",
      Icon: TfiBook,
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
          label: "Erolled Courses",
          link: "/trainer/allcourse",
        },
        {
          label: "Live Sessions",
          link: "/trainer/allcourses",
        },
      ],
    },
    {
      label: "Trainer  Management",
      Icon: FaUserGroup,
      link: "/trainer/trainer-management",
      children: [],
    },
    {
      label: "Certificate Management",
      Icon: LuMapPin,
      link: "#",
      children: [
        {
          label: "Certificate Template",
          link: "/trainer/certificate-template",
        },
        {
          label: "Issued Certificate",
          link: "/trainer/allocated-certificate",
        },
      ],
    },
    {
      label: "Support",
      Icon: BsTicketPerforated,
      link: "#",
      children: [
        {
          label: "FAQ's",
          link: "/trainer/support-faqslist",
        },
        {
          label: "Training Document",
          link: "/trainer/support-training-documnet",
        },
        {
          label: "Support Request",
          link: "/trainer/support-request",
        },
      ],
    },
    {
      label: "Settings",
      Icon: FiSettings,
      link: "/trainer/employeepermission",
      children: [],
    },
    {
      label: "Message",
      Icon: PiEnvelopeThin,
      link: "/trainer/message",
      children: [],
    },
    {
      label: "Logout",
      Icon: AiOutlinePoweroff,
      link: "/auth",
      children: [],
    },
  ],
  TarineeSidebar: [
    {
      label: "Dashboard",
      Icon: RxDashboard,
      link: "/trainee/dashboard",
      children: [],
    },
    {
      label: "Course Management",
      Icon: TfiBook,
      link: "#",
      children: [
        {
          label: "Enrollment Requests",
          link: "/trainee/enrolledrequest",
        },
        {
          label: "All Courses",
          link: "/trainee/allcourse",
        },
        {
          label: "My Courses",
          link: "/trainee/enrolledcourses",
        },
        {
          label: "Enrolled Courses",
          link: "/trainee/enrolledcourses",
        },
      ],
    },
    {
      label: "Certificate Management",
      Icon: LuMapPin,
      link: "#",
      children: [
        {
          label: "Certificate Management",
          link: "/trainee/certificate-template",
        },
        {
          label: "Allocated Certificate",
          link: "/trainee/allocated-certificate",
        },
      ],
    },
    {
      label: "Support",
      Icon: BsTicketPerforated,
      link: "#",
      children: [
        {
          label: "FAQ's",
          link: "/trainee/support-faqslist",
        },
        {
          label: "User Manual",
          link: "/trainee/trainingdocument",
        },
        {
          label: "Support Request",
          link: "/trainee/support-request",
        },
      ],
    },
    {
      label: "Settings",
      Icon: FiSettings,
      link: "/trainee/employeepermission",
      children: [],
    },
    {
      label: "Message",
      Icon: PiEnvelopeThin,
      link: "/trainee/messaging",
      children: [],
    },
    {
      label: "Logout",
      Icon: AiOutlinePoweroff,
      link: "/auth",
      children: [],
    },
  ],
  companySidebar: [
    {
      label: "Dashboard",
      Icon: RxDashboard,
      link: "/company/dashboard",
      children: [],
    },
    {
      label: "Our Sustainability Journey",
      Icon: LuMapPin,
      link: "/company/maturityassessmentroadmap",
      children: [],
    },
    {
      label: "Course Management",
      Icon: TfiBook,
      link: "#",
      children: [
        {
          label: "Erolled Courses",
          link: "/company/allocatedcourses",
        },
        {
          label: "Recommended Courses",
          link: "/company/coursesrecommended",
        },
        {
          label: "All Courses",
          link: "/company/allcourses",
        },
      ],
    },
    {
      label: "Team Management",
      Icon: FaUserGroup,
      link: "#",
      children: [
        {
          label: "Team List",
          link: "/company/employeelist",
        },
        {
          label: "Team Progress",
          link: "/company/employeeprogress",
        },
      ],
    },
    {
      label: "Support",
      Icon: BsTicketPerforated,
      link: "#",
      children: [
        {
          label: "FAQs",
          link: "/company/faqslist",
        },
        {
          label: "User Manual",
          link: "/company/trainingdocument",
        },
        {
          label: "Support Tickets",
          link: "/company/support-request",
        },
      ],
    },
    {
      label: "Settings",
      Icon: FiSettings,
      link: "/company/employeepermission",
      children: [],
    },
    {
      label: "Message",
      Icon: PiEnvelopeThin,
      link: "/company/messaging",
      children: [],
    },
    {
      label: "Logout",
      Icon: AiOutlinePoweroff,
      link: "/auth",
      children: [],
    },
  ],
  companyEmployeeSidebar: [
    {
      label: "Dashboard",
      Icon: RxDashboard,
      link: "/employee/dashboard",
      children: [],
    },
    {
      label: "My Courses",
      Icon: TfiBook,
      link: "/employee/mycourses",
      children: [],
    },
    {
      label: "Our Sustainability Journey",
      Icon: LuMapPin,
      link: "/employee/maturityAssessment",
      children: [],
    },
    {
      label: "Certifications",
      Icon: GrCertificate,
      link: "/employee/certifications",
      children: [],
    },
    {
      label: "Support",
      Icon: BsTicketPerforated,
      link: "#",
      children: [
        {
          label: "FAQ's",
          link: "/employee/faqslist",
        },
        {
          label: "User Manual",
          link: "/employee/usermenual",
        },
        {
          label: "Support Request",
          link: "/employee/support-request",
        },
      ],
    },
    {
      label: "Message",
      Icon: PiEnvelopeThin,
      link: "/employee/message",
      children: [],
    },
    {
      label: "Logout",
      Icon: AiOutlinePoweroff,
      link: "/auth",
      children: [],
    },
  ],
};
export const chatDPColor = (id: number) => {
  const colors = [
    "#0E9CFF",
    "#0077A2",
    "#64A70B",
    "#1FA8DC",
    "#FD9372",
    "#A81F58",
    "#58BA66",
    "#FFA25E",
    "#FF5252",
    "#606060",
  ];
  const colorIndex = id % colors.length;

  return colors[colorIndex];
};
export const TimeFormatter = (dateTime: Date | string) => {
  const today = moment().startOf("day");

  const date = moment(dateTime);

  let formattedTime;

  if (date.isSame(today, "day")) {
    formattedTime = date.format("h:mmA");
  } else if (date.isBefore(today, "day")) {
    formattedTime = date.format("D MMM");
  } else {
    formattedTime = date.format("h:mmA");
  }
  return formattedTime;
};

export const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const handleScrollToBottom = (
  containerRef: React.MutableRefObject<any>
) => {
  const element = containerRef.current;
  const duration = 500;
  const start = element.scrollTop;
  const end = element.scrollHeight - element.clientHeight;
  const startTime = performance.now();

  const animateScroll = (currentTime: any) => {
    const elapsedTime = currentTime - startTime;
    const scrollProgress = Math.min(1, elapsedTime / duration);
    const easedProgress = easeInOutQuad(scrollProgress);
    const scrollTop = start + (end - start) * easedProgress;

    element.scrollTop = scrollTop;

    if (elapsedTime < duration) {
      requestAnimationFrame(animateScroll);
    }
  };

  const easeInOutQuad = (t: number) =>
    t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

  requestAnimationFrame(animateScroll);
};

export const getFileType = (name: number) => {
  const fileType = Object.values(FileType).find((type) => type.enum === name);
  return fileType;
};

export const calculateTotalReadingTime = (sections: any) => {
  let totalHours = 0;
  let totalMinutes = 0;
  let totalSeconds = 0;

  sections.forEach((section: any) => {
    const time = section.isLive ? section.sectionTime : section.readingTime;
    totalHours += time?.hour;
    totalMinutes += time?.minute;
    totalSeconds += time?.second;
  });

  // Convert total seconds to minutes and hours if necessary
  totalMinutes += Math.floor(totalSeconds / 60);
  totalSeconds = totalSeconds % 60;

  totalHours += Math.floor(totalMinutes / 60);
  totalMinutes = totalMinutes % 60;

  // Format the result as a string
  let result = "";
  if (totalHours > 0) {
    result += `${totalHours}hr `;
  }
  if (totalMinutes > 0) {
    result += `${totalMinutes}min `;
  }
  if (totalSeconds > 0 || (totalHours === 0 && totalMinutes === 0)) {
    result += `${totalSeconds}sec`;
  }

  return result.trim();
};

export const getExtension = (filename: string) => {
  return filename && filename?.split(".")?.at(-1)?.toLowerCase();
};

export const fileValidation = (
  filename: string,
  allowedFileTypes: string[] | undefined
) => {
  const fileExtension = getExtension(filename);
  if (
    allowedFileTypes &&
    fileExtension &&
    allowedFileTypes.includes(fileExtension)
  ) {
    return true;
  } else {
    return false;
  }
};
