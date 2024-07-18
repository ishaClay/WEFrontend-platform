import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import EmployeeHeader from "./EmployeeHeader";
import MainHeader from "./MainHeader";
function HeaderCourse() {
  const location = useLocation();
  const Role = location.pathname.split("/")[1];

  console.log("Role", location);

  const headerData = useMemo(() => {
    const pathName = location.pathname.split("/").pop();
    console.log("pathName", pathName);
    let title: { label: string; link?: string }[] = [];
    switch (pathName) {
      case "dashboard":
        title = [{ label: "Dashboard" }];
        break;

      case "mycourses":
        title = [{ label: "My Courses" }];
        break;

      case "employee-basic-course":
        title = [{ label: "My Courses" }];
        break;

      case "live-session":
        title = [{ label: "My Courses ", link: "js:" }, { label: "Social" }];
        break;

      case "maturityAssessment":
        title = [
          { label: "Maturity Assessment", link: "js:" },
          { label: "Assessment Result" },
        ];
        break;

      case "certifications":
        title = [{ label: "Certifications" }];
        break;

      case "my-accomplishments":
        title = [
          { label: "Certifications", link: "js:" },
          { label: "My Accomplishments" },
        ];
        break;

      case "retakeAssessment":
        title = [{ label: "Assessment" }];
        break;

      case "my-accomplishments":
        title = [{ label: "My Accomplishments" }];
        break;

      case "faqslist":
        title = [{ label: "Supports", link: "js:" }, { label: "FAQs" }];
        break;

      case "usermenual":
        title = [{ label: "Supports", link: "js:" }, { label: "User Manual" }];
        break;

      case "support-request":
        title = [
          { label: "Supports", link: "js:" },
          { label: "Support Request" },
        ];
        break;

      case "add-new-ticket":
        title = [
          { label: "Support", link: "js:" },
          { label: "Support Ticket", link: "js:" },
          { label: "Add New Ticket" },
        ];
        break;

      case "ticket-details-reply":
        title = [
          { label: "Supports", link: "js:" },
          { label: "Support Request", link: "js:" },
          { label: "ticket details reply" },
        ];
        break;

      case "message":
        title = [{ label: "Message" }];
        break;

      case "compose":
        title = [{ label: "Message", link: "js:" }, { label: "Compose" }];
        break;

      default:
        title = [
          {
            label:
              location.pathname.split("/")[
                location.pathname.split("/")?.length - 2
              ],
            link: "js:",
          },
          { label: "Details" },
        ];
        break;
    }
    return { title };
  }, [location]);
  const maiHeaderData = useMemo(() => {
    const pathName = location.pathname.split("/").pop();
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

      case "employeeinvition":
        title = [
          { label: "Team Management", link: "js:" },
          { label: "Team List", link: "js:" },
          { label: "Team Invition" },
        ];
        break;

      case "schedule-live-session":
        title = [
          { label: "Course Management", link: "js:" },
          { label: "Create Course" },
        ];
        break;

      case "total-live-sessions":
        title = [
          { label: "Course Management", link: "js:" },
          { label: "Create Course" },
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

      case "mycourses":
        title = [
          { label: "Course Management", link: "js:" },
          { label: "My Courses" },
        ];
        break;

      case "message":
        title = [{ label: "Message", link: "js:" }, { label: "Messaging" }];
        break;

      case "compose":
        title = [{ label: "Message", link: "js:" }, { label: "Compose" }];
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

      case "invitation":
        title = [
          { label: "Trainer Management", link: "js:" },
          { label: "Invitation" },
        ];
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

      case "add-new-ticket":
        title = [
          { label: "Support", link: "js:" },
          { label: "Support Ticket", link: "js:" },
          { label: "Add New Ticket" },
        ];
        break;

      case "employeepermission":
        title = [{ label: "Setting" }];
        break;

      case "message":
        title = [{ label: "Message" }];
        break;

      default:
        title = [
          {
            label:
              location.pathname.split("/")[
                location.pathname.split("/")?.length - 2
              ],
            link: "js:",
          },
          { label: "Details" },
        ];
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
        <EmployeeHeader title={headerData?.title} />
      </div>
    </>
  );
}

export default HeaderCourse;
