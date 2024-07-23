import "@cyntler/react-doc-viewer/dist/index.css";
import { useQuery } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import TrainerDetails from "./components/TrainerManagement/TrainerDetails";
import TrainerInvitation from "./components/TrainerManagement/TrainerInvitation";
import Accomplishments from "./components/certifications/Accomplishments";
import AssecessmentPage from "./components/courseManagement/AddAssecessment/AssecessmentPage";
import MyCourse from "./components/courseManagement/AllCourse/MyCourse";
import DashboardLayout from "./components/layouts/DashboardLayout";
import SupportRequest from "./components/support/SupportRequest/SupportRequest";
import { Toaster } from "./components/ui/toaster";
import { useAppSelector } from "./hooks/use-redux";
import { QUERY_KEYS } from "./lib/constants";
import Assessment from "./pages/Assessment";
import AssessmentResult from "./pages/AssessmentResult";
import CertificationsPage from "./pages/CertificationsPage";
import CompanyRegister from "./pages/CompanyRegister";
import Compose from "./pages/Compose";
import CourseEmrolledToEmployeePopup from "./pages/CourseEmrolledToEmployeePopup";
import CoursesAllCourse from "./pages/CoursesAllCourse";
import CoursesAllocate from "./pages/CoursesAllocate";
import CoursesEmrolledToEmployeeInvitePopup from "./pages/CoursesEmrolledToEmployeePopupInvite";
import CoursesRecommended from "./pages/CoursesRecommended";
import Dashbord from "./pages/Dashbord";
import EmployeeAssessmentResult from "./pages/EmployeeAssessmentResult";
import EmployeeAssessmentResultFirst from "./pages/EmployeeAssessmentResultFirst";
import EmployeeAssessmentResultPopup from "./pages/EmployeeAssessmentResultPopup";
import EmployeeCompleted from "./pages/EmployeeCompleted";
import EmployeeCompletedSecond from "./pages/EmployeeCompletedSecond";
import EmployeeDashbord from "./pages/EmployeeDashbord";
import EmployeeDetailsPage from "./pages/EmployeeDetailsPage";
import EmployeeFqs from "./pages/EmployeeFaq";
import EmployeeInvitation from "./pages/EmployeeInvitation";
import EmployeeList from "./pages/EmployeeList";
import EmployeeMsg from "./pages/EmployeeMsg";
import EmployeePermission from "./pages/EmployeePermission";
import EmployeeRodemap from "./pages/EmployeeRodemap";
import EmployeeSendInvitation from "./pages/EmployeeSendInvitation";
import EmployeeSupportRequest from "./pages/EmployeeSupportRequest";
import EmployeeSupportRequestFirst from "./pages/EmployeeSupportRequestFirst";
import EmployeeSupportRequestSecond from "./pages/EmployeeSupportRequestSecond";
import FaqsList from "./pages/FaqsList";
import Home from "./pages/Home";
import HomePage from "./pages/HomePage";
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
import ModulePdf from "./pages/ModulePdf";
import ModulePdfDetail from "./pages/ModulePdfDetail";
import ModuleVideo from "./pages/ModuleVideo";
import MyAccomplishments from "./pages/MyAccomplishments";
import MyAccomplishmentsCertifications from "./pages/MyAccomplishmentsCertifications";
import MyCourses from "./pages/MyCourses";
import MyCoursesAll from "./pages/MyCoursesAll";
import MyCoursesAllSecond from "./pages/MyCoursesAllSecond";
import MyCoursesInformaction from "./pages/MyCoursesInformaction";
import MyCoursesSocial from "./pages/MyCoursesSocial";
import Notification from "./pages/Notification";
import NotificationListPage from "./pages/NotificationListPage";
import ProfileSetting from "./pages/ProfileSetting";
import QuestionPage from "./pages/QuestionPage";
import RatingPopup from "./pages/RatingPopup";
import SavedAssesment from "./pages/SavedAssesment";
import SelectLevel from "./pages/SelectLevel";
import SmeAdminDropdonw from "./pages/SmeAdminDropdonw";
import SupportAddNewTicket from "./pages/SupportAddNewTicket";
import SupportAnswer from "./pages/SupportAnswer";
import SupportDetails from "./pages/SupportDetails";
import TeamMemberDropdown from "./pages/TeamMemberDropdown";
import TeaserScore from "./pages/TeaserScore";
import TermsOfServices from "./pages/TermsOfServices";
import TrainerManagementPage from "./pages/TrainerManagement";
import TrainingDocument from "./pages/TrainingDocument";
import UserManual from "./pages/UserManual";
import AllocatedCertificate from "./pages/allocatedCertificate";
import Auth from "./pages/auth/Auth";
import ChangePasswordPage from "./pages/auth/ChangePasswordPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import Register from "./pages/auth/Register";
import RegisterTrainee from "./pages/auth/RegisterTrainee";
import RegisterTrainer from "./pages/auth/RegisterTrainer";
import ResetPassword from "./pages/auth/ResetPassword";
import CertificateTempletePage from "./pages/certificateManagement";
import CourseManagement from "./pages/courseManagement";
import AllCoursesPage from "./pages/courseManagement/AllCourses";
import EnrolledCourse from "./pages/courseManagement/EnrolledCourse";
import EnrollmentRequest from "./pages/courseManagement/EnrollmentRequest";
import LiveSessionsCalendar from "./pages/courseManagement/LiveSessionsCalendar";
import ScheduleLiveSession from "./pages/courseManagement/ScheduleLiveSession";
import TotalLiveSessions from "./pages/courseManagement/TotalLiveSessions";
import DashboardEmployeePage from "./pages/dashboard/DashboardEmployeePage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import BasicCoursePage from "./pages/employeeBasicCourse/BasicCoursePage";
import LiveSessionPage from "./pages/employeeBasicCourse/LiveSessionPage";
import MaturityAssessmentPage from "./pages/maturityAssessment/MaturityAssessmentPage";
import ComposePage from "./pages/message/ComposePage";
import MessagePage from "./pages/message/MessagePage";
import MyCoursesList from "./pages/myCourse";
import PrivacyPolicyPage from "./pages/privacyPolicy/PrivacyPolicyPage";
import FaqsListPage from "./pages/support/FaqsListPage";
import SupportRequestPage from "./pages/support/SupportRequestPage";
import TicketDetailsReplyPage from "./pages/support/TicketDetailsReplyPage";
import TrainingDocumentPage from "./pages/support/TrainingDocumentPage";
import UserManualPage from "./pages/support/UserManualPage";
import TeamProgress from "./pages/teamProgress/TeamProgress";
import { changeTheme } from "./services/apiServices/theme";
import Updatecertificate from "./components/certificateTemplete/Updatecertificate";

function App() {
  const { clientId } = useAppSelector((state) => state.user);

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

  return (
    <div className="App mx-auto">
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/landing" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/trainer-regestration" element={<RegisterTrainer />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/employee_register" element={<Register />} />
        <Route path="/inviteRegister" element={<RegisterTrainee />} />
        <Route path="/companyregister" element={<CompanyRegister />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/question" element={<QuestionPage />} />
        <Route path="/maturelevel" element={<MaturityLevelPage />} />
        <Route path="/teaserscore" element={<TeaserScore />} />
        <Route path="/selectlevel" element={<SelectLevel />} />
        <Route path="/termsofservices" element={<TermsOfServices />} />
        <Route path="/privacypolicy" element={<PrivacyPolicyPage />} />
        <Route
          path="/maturitylevelactionitem"
          element={<MaturityLevelActionItem />}
        />

        <Route path="/savedassesment" element={<SavedAssesment />} />
        <Route
          path="/maturitylevelactionablepopup"
          element={
            <ProtectedRoute>
              <MaturityLevelActionableMeasurePopup />
            </ProtectedRoute>
          }
        />
        <Route
          path="/maturitylevelanswerspopup"
          element={
            <ProtectedRoute>
              <MaturityLevelAnswersPopup />
            </ProtectedRoute>
          }
        />
        <Route
          path="/courseemrolledemployeepopup"
          element={
            <ProtectedRoute>
              <CourseEmrolledToEmployeePopup />
            </ProtectedRoute>
          }
        />
        <Route
          path="/coursesemrolledtoemployeeinvitepopup"
          element={
            <ProtectedRoute>
              <CoursesEmrolledToEmployeeInvitePopup />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employeelist"
          element={
            <ProtectedRoute>
              <EmployeeList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/faqslist"
          element={
            <ProtectedRoute>
              <FaqsList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employeesendinvitation"
          element={
            <ProtectedRoute>
              <EmployeeSendInvitation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/trainingdocument"
          element={
            <ProtectedRoute>
              <TrainingDocument />
            </ProtectedRoute>
          }
        />
        <Route
          path="/supportticket"
          element={
            <ProtectedRoute>
              <SupportAddNewTicket />
            </ProtectedRoute>
          }
        />

        <Route
          path="/supportdetails"
          element={
            <ProtectedRoute>
              <SupportDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/supportanswer"
          element={
            <ProtectedRoute>
              <SupportAnswer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/supportaddnewticket"
          element={
            <ProtectedRoute>
              <SupportAddNewTicket />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employeepermission"
          element={
            <ProtectedRoute>
              <EmployeePermission />
            </ProtectedRoute>
          }
        />
        <Route
          path="/individualemployee"
          element={
            <ProtectedRoute>
              <IndividualEmployee />
            </ProtectedRoute>
          }
        />
        <Route
          path="/messaging"
          element={
            <ProtectedRoute>
              <Messaging />
            </ProtectedRoute>
          }
        />
        <Route
          path="/compose"
          element={
            <ProtectedRoute>
              <Compose />
            </ProtectedRoute>
          }
        />
        <Route
          path="/smeadmindropdonw"
          element={
            <ProtectedRoute>
              <SmeAdminDropdonw />
            </ProtectedRoute>
          }
        />
        <Route
          path="/maturityassessmentroadmap"
          element={
            <ProtectedRoute>
              <MaturityAssessmentRoadmapAfterbuild />
            </ProtectedRoute>
          }
        />
        <Route
          path="/maturityassessmentroadmaphistory"
          element={
            <ProtectedRoute>
              <MaturityAssessmentRoadmapHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/maturityassessmentroadmapactionview"
          element={
            <ProtectedRoute>
              <MaturityAssessmentRoadmapActionView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/maturityassessmentroadmapassignactionitem"
          element={
            <ProtectedRoute>
              <MaturityAssessmentRoadmapAssignActionItem />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashbord"
          element={
            <ProtectedRoute>
              <Dashbord />
            </ProtectedRoute>
          }
        />
        <Route
          path="/maturityassessmentroadmapsettarget"
          element={
            <ProtectedRoute>
              <MaturityAssessmentRoadmapSetTarget />
            </ProtectedRoute>
          }
        />
        <Route
          path="/maturityassessmentresult"
          element={
            <ProtectedRoute>
              <MaturityAssessmentResult />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employeedashbord"
          element={
            <ProtectedRoute>
              <EmployeeDashbord />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mycourses"
          element={
            <ProtectedRoute>
              <MyCourses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inprogress"
          element={
            <ProtectedRoute>
              <InProgress />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employeecompleted"
          element={
            <ProtectedRoute>
              <EmployeeCompleted />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employeecompletedsecond"
          element={
            <ProtectedRoute>
              <EmployeeCompletedSecond />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mycoursesall"
          element={
            <ProtectedRoute>
              <MyCoursesAll />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mycoursesallsecond"
          element={
            <ProtectedRoute>
              <MyCoursesAllSecond />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teammemberdropdown"
          element={
            <ProtectedRoute>
              <TeamMemberDropdown />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mycoursesinformaction"
          element={
            <ProtectedRoute>
              <MyCoursesInformaction />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mycoursessocial"
          element={
            <ProtectedRoute>
              <MyCoursesSocial />
            </ProtectedRoute>
          }
        />
        <Route
          path="/module"
          element={
            <ProtectedRoute>
              <Module />
            </ProtectedRoute>
          }
        />
        <Route
          path="/modulefrist"
          element={
            <ProtectedRoute>
              <ModuleFrist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/modulepdf"
          element={
            <ProtectedRoute>
              <ModulePdf />
            </ProtectedRoute>
          }
        />
        <Route
          path="/modulevideo"
          element={
            <ProtectedRoute>
              <ModuleVideo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/modulepdfdetail"
          element={
            <ProtectedRoute>
              <ModulePdfDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/livesession"
          element={
            <ProtectedRoute>
              <LiveSession />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ratingpopup"
          element={
            <ProtectedRoute>
              <RatingPopup />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employeefaq"
          element={
            <ProtectedRoute>
              <EmployeeFqs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/usermanual"
          element={
            <ProtectedRoute>
              <UserManual />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employeesupportrequest"
          element={
            <ProtectedRoute>
              <EmployeeSupportRequest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employeesupportrequestfirst"
          element={
            <ProtectedRoute>
              <EmployeeSupportRequestFirst />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employeesupportrequestsecond"
          element={
            <ProtectedRoute>
              <EmployeeSupportRequestSecond />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employeemsg"
          element={
            <ProtectedRoute>
              <EmployeeMsg />
            </ProtectedRoute>
          }
        />
        <Route
          path="/messagepopup"
          element={
            <ProtectedRoute>
              <MessagePopup />
            </ProtectedRoute>
          }
        />
        <Route
          path="/myaccomplishmentscertifications"
          element={
            <ProtectedRoute>
              <MyAccomplishmentsCertifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/myaccomplishments"
          element={
            <ProtectedRoute>
              <MyAccomplishments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/assessmentresult"
          element={
            <ProtectedRoute>
              <AssessmentResult />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profilesetting"
          element={
            <ProtectedRoute>
              <ProfileSetting />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employeeassessmentresult"
          element={
            <ProtectedRoute>
              <EmployeeAssessmentResult />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employeeassessmentresultfirst"
          element={
            <ProtectedRoute>
              <EmployeeAssessmentResultFirst />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employeerodemap"
          element={
            <ProtectedRoute>
              <EmployeeRodemap />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employeeassessmentresultpopup"
          element={
            <ProtectedRoute>
              <EmployeeAssessmentResultPopup />
            </ProtectedRoute>
          }
        />

        <Route
          path="/company"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<DashboardPage />} />
          <Route
            path="maturityAssessment"
            element={<MaturityAssessmentPage />}
          />
          <Route path="allocatedcourses" element={<CoursesAllocate />} />
          <Route path="coursesrecommended" element={<CoursesRecommended />} />
          <Route path="allcourses" element={<CoursesAllCourse />} />
          <Route path="employeelist" element={<EmployeeList />} />
          <Route path="employeelist/:id" element={<EmployeeDetailsPage />} />
          <Route path="faqslist" element={<FaqsListPage />} />
          <Route path="trainingdocument" element={<TrainingDocumentPage />} />
          <Route path="support-request" element={<SupportRequestPage />} />

          <Route
            path="support-request/add-new-ticket"
            element={<SupportAddNewTicket />}
          />
          <Route
            path="support-request/ticket-details/:id"
            element={<TicketDetailsReplyPage />}
          />
          <Route path="teamProgress" element={<TeamProgress />} />
          <Route path="employeepermission" element={<EmployeePermission />} />
          <Route
            path="employeelist/employeeinvition"
            element={<EmployeeInvitation />}
          />
          <Route path="message" element={<MessagePage />} />
          <Route path="message/compose" element={<ComposePage />} />
          <Route path="notification-list" element={<NotificationListPage />} />
          <Route
            path="notification/:notificationId"
            element={<Notification />}
          />
          <Route path="messaging" element={<Messaging />} />
        </Route>

        <Route
          path="/employee"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<DashboardEmployeePage />} />
          <Route
            path="maturityAssessment"
            element={<MaturityAssessmentPage />}
          />
          <Route path="mycourses" element={<MyCoursesList />} />
          <Route path="certifications" element={<CertificationsPage />} />
          <Route path="my-accomplishments" element={<Accomplishments />} />
          <Route path="faqslist" element={<FaqsListPage />} />
          <Route path="usermenual" element={<UserManualPage />} />
          <Route
            path="support-request/add-new-ticket"
            element={<SupportAddNewTicket />}
          />
          <Route path="employeepermission" element={<EmployeePermission />} />
          <Route path="support-request" element={<SupportRequestPage />} />
          <Route
            path="ticket-details-reply"
            element={<TicketDetailsReplyPage />}
          />
          <Route path="retakeAssessment" element={<QuestionPage />} />
          <Route path="message" element={<MessagePage />} />
          <Route path="message/compose" element={<ComposePage />} />
          <Route path="notification-list" element={<NotificationListPage />} />
          <Route
            path="notification/:notificationId"
            element={<Notification />}
          />
          <Route path="employee-basic-course" element={<BasicCoursePage />} />
          <Route path="live-session" element={<LiveSessionPage />} />
        </Route>

        <Route
          path="/trainee"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="mycourses" element={<MyCourse />} />
          <Route path="allcourse" element={<AllCoursesPage />} />
          <Route path="create_course" element={<CourseManagement />} />
          <Route
            path="create_course/:courseId"
            element={<CourseManagement />}
          />
          <Route
            path="add_assessment"
            element={<AssecessmentPage />}
          />
          <Route path="enrolledrequest" element={<EnrollmentRequest />} />
          <Route path="enrolledcourses" element={<EnrolledCourse />} />
          <Route
            path="certificate-template"
            element={<CertificateTempletePage />}
          />
          {/* <Route
            path="certificate-template/updatecertificate/:id"
            element={<Updatecertificate />}
          /> */}
          <Route
            path="allocated-certificate"
            element={<AllocatedCertificate />}
          />
          <Route path="support-faqslist" element={<FaqsListPage />} />
          <Route path="trainingdocument" element={<TrainingDocumentPage />} />
          <Route path="support-request" element={<SupportRequestPage />} />
          <Route path="employeepermission" element={<EmployeePermission />} />
          <Route path="message" element={<MessagePage />} />
          <Route path="message/compose" element={<ComposePage />} />
          <Route
            path="support-request/add-new-ticket"
            element={<SupportAddNewTicket />}
          />
          <Route
            path="support-request/ticket-details/:id"
            element={<TicketDetailsReplyPage />}
          />
        </Route>

        <Route
          path="/trainer"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="allcourse" element={<AllCoursesPage />} />
          <Route path="enrolledrequest" element={<EnrollmentRequest />} />
          <Route path="enrolledcourses" element={<EnrolledCourse />} />
          <Route path="create_course" element={<CourseManagement />} />
          <Route
            path="create_course/:courseId"
            element={<CourseManagement />}
          />
          <Route
            path="add_assessment"
            element={<AssecessmentPage />}
          />
          <Route
            path="trainer-management"
            element={<TrainerManagementPage />}
          />
          <Route
            path="trainer-management/details/:id"
            element={<TrainerDetails />}
          />
          <Route
            path="trainer-management/invitation"
            element={<TrainerInvitation />}
          />
          <Route
            path="certificate-template"
            element={<CertificateTempletePage />}
          />
          <Route
            path="certificate-template/updatecertificate/:id"
            element={<Updatecertificate />}
          />
          <Route
            path="allocated-certificate"
            element={<AllocatedCertificate />}
          />
          <Route path="support-faqslist" element={<FaqsListPage />} />
          <Route path="support-request" element={<SupportRequest />} />
          <Route
            path="support-training-documnet"
            element={<TrainingDocumentPage />}
          />
          <Route
            path="support-request/ticket-details/:id"
            element={<TicketDetailsReplyPage />}
          />
          <Route
            path="support-request/add-new-ticket"
            element={<SupportAddNewTicket />}
          />
          <Route
            path="schedule-live-session"
            element={<ScheduleLiveSession />}
          />
          <Route path="total-live-sessions" element={<TotalLiveSessions />} />
          <Route path="live-sessions-calendar" element={<LiveSessionsCalendar />} />
          <Route path="message" element={<MessagePage />} />
          <Route path="message/compose" element={<ComposePage />} />
          <Route path="notification-list" element={<NotificationListPage />} />
          <Route
            path="notification/:notificationId"
            element={<Notification />}
          />
          <Route
            path="employee-basic-course/:courseId"
            element={<BasicCoursePage />}
          />
          <Route path="setting" element={<FaqsListPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
