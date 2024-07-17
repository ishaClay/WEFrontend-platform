import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import EmployeeHeader from "./EmployeeHeader";
import MainHeader from "./MainHeader";
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
    let title: { label: string; link?: string }[] = [];
    switch (pathName) {
      case "dashboard":
        title = [{ label: "Dashboard" }];
        break;

      case "enrolledrequest":
        title = [
          { label: "Course Management", link: "js:" },
          { label: "Enrolled Request" },
        ];
        break;

      case "coursesrecommended":
        title = [
          { label: "Course Management", link: "js:" },
          { label: "Recommended Course" },
        ];
        break;

      case "enrolledcourses":
        title = [
          { label: "Course Management", link: "js:" },
          { label: "Enrolled Course" },
        ];
        break;

      case "allocatedcourses":
        title = [
          { label: "Course Management", link: "js:" },
          { label: "Course Allocation" },
        ];
        break;

      case "employeelist":
        title = [
          { label: "Team Management", link: "js:" },
          { label: "Team List" },
        ];
        break;

      case "teamProgress":
        title = [
          { label: "Team Management", link: "js:" },
          { label: "Team Progress" },
        ];
        break;

      case "maturityAssessment":
        title = [{ label: "Maturity Assessment" }];
        break;

      case "allcourse":
        title = [
          { label: "Course Management", link: "js:" },
          { label: "All Course" },
        ];
        break;

      case "allcourses":
        title = [
          { label: "Course Management", link: "js:" },
          { label: "All Course" },
        ];
        break;

      case "create_course":
        title = [
          { label: "Course Management", link: "js:" },
          { label: "Create Course" },
        ];
        break;

      case "employee-basic-course":
        title = [
          { label: "Course Management", link: "js:" },
          { label: "Employee Basic Course" },
        ];
        break;

      case "trainer-management":
        title = [{ label: "Trainer Management" }];
        break;

      case "certificate-template":
        title = [
          { label: "Certificate Management", link: "js:" },
          { label: "Certificate List" },
        ];
        break;

      case "allocated-certificate":
        title = [
          { label: "Certificate Management", link: "js:" },
          { label: "Certificate Allocation" },
        ];
        break;

      case "support-faqslist":
        title = [{ label: "Support", link: "js:" }, { label: "FAQ’s" }];
        break;

      case "faqslist":
        title = [{ label: "Support", link: "js:" }, { label: "FAQ’s" }];
        break;

      case "support-training-documnet":
        title = [
          { label: "Support", link: "js:" },
          { label: "Training Document" },
        ];
        break;

      case "trainingdocument":
        title = [
          { label: "Support", link: "js:" },
          { label: "Training Document" },
        ];
        break;

      case "support-request":
        title = [
          { label: "Support", link: "js:" },
          { label: "Support Ticket" },
        ];
        break;

      case "employeepermission":
        title = [
          { label: "Setting", link: "js:" },
          { label: "Team Permission" },
        ];
        break;

      case "message":
        title = [{ label: "Message" }];
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
