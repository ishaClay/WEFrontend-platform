import { useMemo } from "react";
import EmployeeHeader from "./EmployeeHeader";
import MainHeader from "./MainHeader";
import { useLocation } from "react-router-dom";
function HeaderCourse() {
  const location = useLocation();
  const Role = location.pathname.split("/")[1];

  console.log("Role", location);

  const headerData = useMemo(() => {
    const pathName = location.pathname.split("/")[2];
    console.log("pathName", pathName);
    let title = "";
    let subtitle = "";
    switch (pathName) {
      case "dashboard":
        title = "Dashboard";
        subtitle = "";
        break;

      case "mycourses":
        title = "My Courses";
        subtitle = "";
        break;

      case "employee-basic-course":
        title = "My Courses";
        subtitle = "";
        break;

      case "live-session":
        title = "My Courses /";
        subtitle = "Social";
        break;

      case "maturityAssessment":
        title = "Maturity Assessment / ";
        subtitle = "Assessment Result";
        break;

      case "certifications":
        title = "Certifications";
        subtitle = "";
        break;

      case "my-accomplishments":
        title = "My Accomplishments";
        subtitle = "";
        break;

      case "faqslist":
        title = "Supports / ";
        subtitle = "FAQs";
        break;

      case "usermenual":
        title = "Supports / ";
        subtitle = "User Manual";
        break;

      case "support-training-documnet":
        title = "Supports / ";
        subtitle = "User Manual";
        break;

      case "support-request":
        title = "Supports / ";
        subtitle = "Support request";
        break;

      case "ticket-details-reply":
        title = "Supports / ";
        subtitle = "Support request";
        break;

      case "message":
        title = "Message";
        subtitle = "";
        break;

      default:
        break;
    }
    return { title, subtitle };
  }, [location]);
  const maiHeaderData = useMemo(() => {
    const pathName = location.pathname.split("/")[2];
    console.log("pathName", pathName);
    let title = "";
    switch (pathName) {
      case "dashboard":
        title = "Dashboard";
        break;

      case "enrolledrequest":
        title = "Course Management";
        break;

      case "enrolledcourses":
        title = "Course Management";
        break;

      case "allcourse":
        title = "Course Management";
        break;

      case "create_course":
        title = "Course Management";
        break;

      case "employee-basic-course":
        title = "Course Management";
        break;

      case "trainer-management":
        title = "Trainer Management";
        break;

      case "certificate-template":
        title = "Certificate Management";
        break;

      case "allocated-certificate":
        title = "Certificate Management";
        break;

      case "support-faqslist":
        title = "Support";
        break;

      case "support-training-documnet":
        title = "Support";
        break;

      case "support-request":
        title = "Support";
        break;

      case "message":
        title = "Message";
        break;

      default:
        break;
    }
    return { title };
  }, [location]);
  return (
    <>
      <div className={`${Role === "employee" ? "hidden" : "block"}`}>
        <MainHeader title={maiHeaderData?.title} />
      </div>
      <div className={`${Role === "employee" ? "block" : "hidden"}`}>
        <EmployeeHeader
          title={headerData?.title}
          subtitle={headerData?.subtitle}
        />
      </div>
    </>
  );
}

export default HeaderCourse;
