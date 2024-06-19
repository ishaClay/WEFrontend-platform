import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/auth/Auth";
import RegisterTrainer from "./pages/auth/RegisterTrainer";

import Assessment from "./pages/Assessment";
import AssessmentResult from "./pages/AssessmentResult";
import ChangePassword from "./pages/ChangePassword";
import Company from "./pages/Company";
import CompanyRegister from "./pages/CompanyRegister";
import Compose from "./pages/Compose";
import CourseEmrolledToEmployeePopup from "./pages/CourseEmrolledToEmployeePopup";
import CoursesAllCourse from "./pages/CoursesAllCourse";
import CoursesAllocate from "./pages/CoursesAllocate";
import CoursesEmrolledToEmployeeInvitePopup from "./pages/CoursesEmrolledToEmployeePopupInvite";
import CoursesRecommended from "./pages/CoursesRecommended";
import CoursesViewAllocatePopup from "./pages/CoursesViewAllocatePopup";
import Dashbord from "./pages/Dashbord";
import EmployeeAssessmentResult from "./pages/EmployeeAssessmentResult";
import EmployeeAssessmentResultFirst from "./pages/EmployeeAssessmentResultFirst";
import EmployeeCompleted from "./pages/EmployeeCompleted";
import EmployeeCompletedSecond from "./pages/EmployeeCompletedSecond";
import EmployeeDashbord from "./pages/EmployeeDashbord";
import EmployeeFqs from "./pages/EmployeeFaq";
import EmployeeList from "./pages/EmployeeList";
import EmployeeMsg from "./pages/EmployeeMsg";
import EmployeePermission from "./pages/EmployeePermission";
import EmployeeProgress from "./pages/EmployeeProgress";
import EmployeeRodemap from "./pages/EmployeeRodemap";
import EmployeeSendInvitation from "./pages/EmployeeSendInvitation";
import EmployeeSupportRequest from "./pages/EmployeeSupportRequest";
import EmployeeSupportRequestFirst from "./pages/EmployeeSupportRequestFirst";
import EmployeeSupportRequestSecond from "./pages/EmployeeSupportRequestSecond";
import FaqsList from "./pages/FaqsList";
import InProgress from "./pages/InProgress";
import IndividualEmployee from "./pages/IndividualEmployee";
import LiveSession from "./pages/LiveSession";
import MaturityAssessmentResult from "./pages/MaturityAssessmentResult";
import MaturityAssessmentRoadmapActionView from "./pages/MaturityAssessmentRoadmapActionView";
import MaturityAssessmentRoadmapAfterbuild from "./pages/MaturityAssessmentRoadmapAfterbuild";
import MaturityAssessmentRoadmapAssignActionItem from "./pages/MaturityAssessmentRoadmapAssignActionItem";
import MaturityAssessmentRoadmapHistory from "./pages/MaturityAssessmentRoadmapHistory";
import MaturityAssessmentRoadmapSetTarget from "./pages/MaturityAssessmentRoadmapSetTarget";
import MaturityLevelActionItem from "./pages/MaturityLevelActionItem";
import MaturityLevelActionableMeasurePopup from "./pages/MaturityLevelActionableMeasurePopup";
import MaturityLevelAnswersPopup from "./pages/MaturityLevelAnswersPopup";
import MaturityLevelPage from "./pages/MaturityLevelPage";
import MessagePopup from "./pages/MessagePopup";
import Messaging from "./pages/Messaging";
import Module from "./pages/Module";
import ModuleFrist from "./pages/ModuleFrist";
import EmployeeAssessmentResultPopup from "./pages/EmployeeAssessmentResultPopup";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./lib/constants";
import { changeTheme } from "./services/apiServices/theme";
import { useSelector } from "react-redux";
import Register from "./pages/auth/Register";
import { Toaster } from "./components/ui/toaster";
import CourseManagement from "./pages/courseManagement";
import SelectLevel from "./pages/SelectLevel";
import TeaserScore from "./pages/TeaserScore";
import QuestionPage from "./pages/QuestionPage";
import RegisterTrainee from "./pages/auth/RegisterTrainee";
import SavedAssesment from "./pages/SavedAssesment";
import TrainingDocument from "./pages/TrainingDocument";
import SupportAddNewTicket from "./pages/SupportAddNewTicket";
import SupportAnswer from "./pages/SupportAnswer";
import SupportDetails from "./pages/SupportDetails";
import SmeAdminDropdonw from "./pages/SmeAdminDropdonw";
import MyCoursesSocial from "./pages/MyCoursesSocial";
import ModulePdf from "./pages/ModulePdf";
import ModuleVideo from "./pages/ModuleVideo";
import ModulePdfDetail from "./pages/ModulePdfDetail";
import RatingPopup from "./pages/RatingPopup";
import UserManual from "./pages/UserManual";
import MyCourses from "./pages/MyCourses";
import MyCoursesAllSecond from "./pages/MyCoursesAllSecond";
import TeamMemberDropdown from "./pages/TeamMemberDropdown";
import MyCoursesInformaction from "./pages/MyCoursesInformaction";
import MyCoursesAll from "./pages/MyCoursesAll";
import MyAccomplishmentsCertifications from "./pages/MyAccomplishmentsCertifications";
import MyAccomplishments from "./pages/MyAccomplishments";
import ProfileSetting from "./pages/ProfileSetting";
import DashboardLayout from "./components/layouts/DashboardLayout";
import EnrollmentRequest from "./pages/courseManagement/EnrollmentRequest";
import EnrolledCourse from "./pages/courseManagement/EnrolledCourse";
import ResetPassword from "./pages/auth/ResetPassword";
import AllCoursesPage from "./pages/courseManagement/AllCourses";
import AuthLayout from "./Layout/AuthLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import RootLayout from "./Layout/RootLayout";

function App() {
  const { clientId } = useSelector((state: any) => state.user);

  const { data: themes } = useQuery({
    queryKey: [QUERY_KEYS.themeChanges],
    queryFn: () => changeTheme(clientId as string),
  });

  document.documentElement.style.setProperty(
    "--rkp-button-color",
    themes?.data?.data?.buttonColor
  );
  document.documentElement.style.setProperty(
    "--rkp-font-family",
    themes?.data?.data?.fontFamily
  );
  document.documentElement.style.setProperty(
    "--rkp-primary-color",
    themes?.data?.data?.primaryColor
  );
  document.documentElement.style.setProperty(
    "--rkp-secondary-color",
    themes?.data?.data?.secondaryColor
  );
  document.documentElement.style.setProperty(
    "--rkp-text-color",
    themes?.data?.data?.textColor
  );

  const router = createBrowserRouter([
    {
      path: "/",
			element: <AuthLayout />,
			children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/auth",
          element: <Auth />
        },
        {
          path: "/trainer",
          element: <RegisterTrainer />
        },
        {
          path: "/resetpassword",
          element: <ResetPassword />
        },
        {
          path: "/register",
          element: <Register />
        },
        {
          path: "/registertrainee",
          element: <RegisterTrainee />
        },
        {
          path: "/company",
          element: <Company />
        },
      ]
    },
    {
      path: "/",
			element:  <ProtectedRoute>
                  <RootLayout />
                </ProtectedRoute>,
			children: [
        {
          path: "/assessment",
          element: <Assessment />
        },
        {
          path: "/question",
          element: <QuestionPage />
        },
        {
          path: "/teaserscore",
          element: <TeaserScore />
        },
        {
          path: "/companyregister",
          element: <CompanyRegister />
        },
        {
          path: "/maturelevel",
          element: <MaturityLevelPage />
        },
        {
          path: "/selectlevel",
          element: <SelectLevel />
        },
        {
          path: "/maturitylevelactionitem",
          element: <MaturityLevelActionItem />
        },
        {
          path: "/savedassesment",
          element: <SavedAssesment />
        },
        {
          path: "/dashbord",
          element: <Dashbord />
        },
        {
          path: "/maturitylevelactionablepopup",
          element: <MaturityLevelActionableMeasurePopup />
        },
        {
          path: "/maturitylevelanswerspopup",
          element: <MaturityLevelAnswersPopup />
        },
        {
          path: "/coursesrecommended",
          element: <CoursesRecommended />
        },
        {
          path: "/courseemrolledemployeepopup",
          element: <CourseEmrolledToEmployeePopup />
        },
        {
          path: "/courseviewallocatepopup",
          element: <CoursesViewAllocatePopup />
        },
        {
          path: "/coursesemrolledtoemployeeinvitepopup",
          element: <CoursesEmrolledToEmployeeInvitePopup />
        },
        {
          path: "/allocatedcourses",
          element: <CoursesAllocate />
        },
        {
          path: "/employeelist",
          element: <EmployeeList />
        },
        {
          path: "/employeeprogress",
          element: <EmployeeProgress />
        },
        {
          path: "/faqslist",
          element: <FaqsList />
        },
        {
          path: "/employeesendinvitation",
          element: <EmployeeSendInvitation />
        },
        {
          path: "/trainingdocument",
          element: <TrainingDocument />
        },
        {
          path: "/supportticket",
          element: <SupportAddNewTicket />
        },
        {
          path: "/supportdetails",
          element: <SupportDetails />
        },
        {
          path: "/supportanswer",
          element: <SupportAnswer />
        },
        {
          path: "/supportaddnewticket",
          element: <SupportAddNewTicket />
        },
        {
          path: "/employeepermission",
          element: <EmployeePermission />
        },
        {
          path: "/individualemployee",
          element: <IndividualEmployee />
        },
        {
          path: "/messaging",
          element: <Messaging />
        },
        {
          path: "/compose",
          element: <Compose />
        },
        {
          path: "/smeadmindropdonw",
          element: <SmeAdminDropdonw />
        },
        {
          path: "/allcourses",
          element: <CoursesAllCourse />
        },
        {
          path: "/maturityassessmentroadmap",
          element: <MaturityAssessmentRoadmapAfterbuild />
        },
        {
          path: "/maturityassessmentroadmaphistory",
          element: <MaturityAssessmentRoadmapHistory />
        },
        { 
          path:"/maturityassessmentroadmapactionview", 
          element: <MaturityAssessmentRoadmapActionView /> 
        },
        { 
          path:"/maturityassessmentroadmapassignactionitem", 
          element: <MaturityAssessmentRoadmapAssignActionItem /> 
        },
        { 
          path:"/maturityassessmentroadmapsettarget", 
          element: <MaturityAssessmentRoadmapSetTarget /> 
        },
        { 
          path:"/maturityassessmentresult", 
          element: <MaturityAssessmentResult /> 
        },
        { 
          path:"/employeedashbord", 
          element: <EmployeeDashbord /> 
        },
        { 
          path:"/mycourses", 
          element: <MyCourses /> 
        },
        { 
          path:"/inprogress", 
          element: <InProgress /> 
        },
        { 
          path:"/employeecompleted", 
          element: <EmployeeCompleted /> 
        },
        { 
          path:"/employeecompletedsecond", 
          element: <EmployeeCompletedSecond /> 
        },
        { 
          path:"/mycoursesall", 
          element: <MyCoursesAll /> 
        },
        { 
          path:"/mycoursesallsecond", 
          element: <MyCoursesAllSecond /> 
        },
        { 
          path:"/teammemberdropdown", 
          element: <TeamMemberDropdown /> 
        },
        { 
          path:"/mycoursesinformaction", 
          element: <MyCoursesInformaction /> 
        },
        { 
          path:"/mycoursessocial", 
          element: <MyCoursesSocial /> 
        },
        { 
          path:"/module", 
          element: <Module /> 
        },
        { 
          path:"/modulefrist", 
          element: <ModuleFrist /> 
        },
        { 
          path:"/modulepdf", 
          element: <ModulePdf /> 
        },
        { 
          path:"/modulevideo", 
          element: <ModuleVideo /> 
        },
        { 
          path:"/modulepdfdetail", 
          element: <ModulePdfDetail /> 
        },
        { 
          path:"/livesession", 
          element: <LiveSession /> 
        },
        { 
          path:"/ratingpopup", 
          element: <RatingPopup /> 
        },
        { 
          path:"/employeefaq", 
          element: <EmployeeFqs /> 
        },
        { 
          path:"/usermanual", 
          element: <UserManual /> 
        },
        { 
          path:"/employeesupportrequest", 
          element: <EmployeeSupportRequest /> 
        },
        { 
          path:"/employeesupportrequestfirst", 
          element: <EmployeeSupportRequestFirst /> 
        },
        { 
          path:"/employeesupportrequestsecond", 
          element: <EmployeeSupportRequestSecond /> 
        },
        { 
          path:"/employeemsg", 
          element: <EmployeeMsg /> 
        },
        { 
          path:"/messagepopup", 
          element: <MessagePopup /> 
        },
        { 
          path:"/myaccomplishmentscertifications", 
          element: <MyAccomplishmentsCertifications /> 
        },
        { 
          path:"/myaccomplishments", 
          element: <MyAccomplishments /> 
        },
        { 
          path:"/assessmentresult", 
          element: <AssessmentResult /> 
        },
        { 
          path:"/profilesetting", 
          element: <ProfileSetting /> 
        },
        { 
          path:"/changepassword", 
          element: <ChangePassword /> 
        },
        { 
          path:"/employeeassessmentresult", 
          element: <EmployeeAssessmentResult /> 
        },
        { 
          path:"/employeeassessmentresultfirst", 
          element: <EmployeeAssessmentResultFirst /> 
        },
        { 
          path:"/employeerodemap", 
          element: <EmployeeRodemap /> 
        },
        { 
          path:"/employeeassessmentresultpopup", 
          element: <EmployeeAssessmentResultPopup /> 
        },
        { 
          path:"/trainer", 
          element: <DashboardLayout /> 
        },
        { 
            path:"/allcourse", 
            element: <AllCoursesPage /> 
        },
        { 
            path:"/enrolledrequest", 
            element: <EnrollmentRequest /> 
        },
        { 
            path:"/enrolledcourses", 
            element: <EnrolledCourse /> 
        },
        { 
            path:"/coursemanagement", 
            element: <CourseManagement /> 
        },
      ]
    },
  ])

  return (
    <div className="App mx-auto">
      <Toaster />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
