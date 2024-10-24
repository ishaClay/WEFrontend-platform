/* eslint-disable react-hooks/exhaustive-deps */
import "@cyntler/react-doc-viewer/dist/index.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useEffect } from "react";
import "react-phone-number-input/style.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import CompanyProtectedRoute from "./Layout/CompanyProtectedRoute";
import ProtectedRoute from "./Layout/ProtectedRoute";
import DashboardTrainee from "./components/DashboardTrainee";
import DashboardTrainer from "./components/DashboardTrainer";
import EmployeeAssessment from "./components/EmployeeBasicCourse/EmployeeAssessment";
import TrainerDetails from "./components/TrainerManagement/TrainerDetails";
import TrainerDetailsEdit from "./components/TrainerManagement/TrainerDetailsEdit";
import TrainerInvitation from "./components/TrainerManagement/TrainerInvitation";
import Updatecertificate from "./components/certificateTemplete/Updatecertificate";
import Accomplishments from "./components/certifications/Accomplishments";
import Loading from "./components/comman/Error/Loading";
import AssecessmentPage from "./components/courseManagement/AddAssecessment/AssecessmentPage";
import AllCourseTrainee from "./components/courseManagement/MyCourse/AllCourseTrainee";
import MyCourseTrainee from "./components/courseManagement/MyCourse/MyCourseTrainee";
import DashboardLayout from "./components/layouts/DashboardLayout";
import SupportRequest from "./components/support/SupportRequest/SupportRequest";
import { Toaster } from "./components/ui/toaster";
import { useToast } from "./components/ui/use-toast";
import { useAppDispatch, useAppSelector } from "./hooks/use-redux";
import { QUERY_KEYS } from "./lib/constants";
import Assessment from "./pages/Assessment";
import CertificationsPage from "./pages/CertificationsPage";
import CompanyRegister from "./pages/CompanyRegister";
import CoursesAllCourse from "./pages/CoursesAllCourse";
import CoursesAllocate from "./pages/CoursesAllocate";
import CoursesRecommended from "./pages/CoursesRecommended";
import EmployeeDetailsPage from "./pages/EmployeeDetailsPage";
import EmployeeInvitation from "./pages/EmployeeInvitation";
import EmployeeList from "./pages/EmployeeList";
import EmployeePermission from "./pages/EmployeePermission";
import FeatureCourseDetailPage from "./pages/FeatureCourseDetailPage";
import HomeContactPage from "./pages/HomeContactPage";
import HomeOurCoursesPage from "./pages/HomeOurCoursesPage";
import HomePage from "./pages/HomePage";
import MaturityLevelActionItem from "./pages/MaturityLevelActionItem";
import MaturityLevelPage from "./pages/MaturityLevelPage";
import Notification from "./pages/Notification";
import NotificationListPage from "./pages/NotificationListPage";
import OurServicePage from "./pages/OurServicePage";
import QuestionPage from "./pages/QuestionPage";
import SavedAssesment from "./pages/SavedAssesment";
import SelectLevel from "./pages/SelectLevel";
import SupportAddNewTicket from "./pages/SupportAddNewTicket";
import TeaserScore from "./pages/TeaserScore";
import TermsOfServices from "./pages/TermsOfServices";
import TrainerManagementPage from "./pages/TrainerManagement";
import TrainerEditDetails from "./pages/TrainerManagement/TrainerDetailsEdit";
import TrainerSettingPage from "./pages/TrainerSettingPage";
import AllocatedCertificate from "./pages/allocatedCertificate";
import AllocatedCertificateEmployee from "./pages/allocatedCertificateEmployee";
import Auth from "./pages/auth/Auth";
import ChangePasswordPage from "./pages/auth/ChangePasswordPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import Register from "./pages/auth/Register";
import RegisterTrainee from "./pages/auth/RegisterTrainee";
import RegisterTrainer from "./pages/auth/RegisterTrainer";
import ResetPassword from "./pages/auth/ResetPassword";
import BlogDetailsPage from "./pages/blog/BlogDetailsPage";
import BlogPage from "./pages/blog/BlogPage";
import CertificateTempletePage from "./pages/certificateManagement";
import CourseManagement from "./pages/courseManagement";
import AllCoursesPage from "./pages/courseManagement/AllCourses";
import EnrolledCourse from "./pages/courseManagement/EnrolledCourse";
import EnrollmentRequest from "./pages/courseManagement/EnrollmentRequest";
import ScheduleLiveSession from "./pages/courseManagement/ScheduleLiveSession";
import DashboardEmployeePage from "./pages/dashboard/DashboardEmployeePage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import BasicCoursePage from "./pages/employeeBasicCourse/BasicCoursePage";
import CourseLiveSession from "./pages/liveSession/CourseLiveSession";
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
import { setClientId } from "./redux/reducer/CompanyReducer";
import { setPath } from "./redux/reducer/PathReducer";
import { LogOut } from "./services/apiServices/authService";
import { fetchDataByClientwise } from "./services/apiServices/courseSlider";
import { fetchClientwiseMaturityLevel } from "./services/apiServices/maturityLevel";
import { changeTheme } from "./services/apiServices/theme";
import { socket } from "./services/socket";
import { ResponseError } from "./types/Errors";

function App() {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const domain = document.location.origin;
  const { clientId, UserId } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const LOGOUT_TIME = 5 * 60 * 1000;

  const { data: fetchByClientwise, isPending: fetchByClientwisePending } =
    useQuery({
      queryKey: [QUERY_KEYS.fetchDataByClientwise],
      queryFn: () => fetchDataByClientwise(domain),
      // queryFn: () => fetchDataByClientwise("weidev.clay.in"),
    });

  const { data: themes } = useQuery({
    queryKey: [QUERY_KEYS.themeChanges, { fetchByClientwise, clientId }],
    queryFn: () =>
      changeTheme(fetchByClientwise?.data?.data?.id || (clientId as string)),
  });

  const { data: fetchClientmaturitylevel } = useQuery<any>({
    queryKey: [QUERY_KEYS.fetchbyclientMaturity, { clientId }],
    queryFn: () => fetchClientwiseMaturityLevel(clientId as string),
    enabled: !!clientId,
  });

  useEffect(() => {
    if (fetchByClientwise?.data?.data) {
      dispatch(setClientId(fetchByClientwise?.data?.data?.id));
    }
  }, [dispatch, fetchByClientwise?.data?.data]);

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

  const { mutate } = useMutation({
    mutationFn: LogOut,
    onSuccess: () => {
      Cookies.remove("accessToken");
      localStorage.removeItem("user");
      navigate("/auth");
      dispatch(setPath([]));
    },
    onError: (error: ResponseError) => {
      toast({
        title: "Error",
        description: error?.data?.message || "Internal server error",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    socket.on("message recieved", () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.chatList],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.notificationCount],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.chatUserList],
      });
    });

    socket.on("new trainer recieved", () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.notificationCount],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.notificationList],
      });
    });

    socket.on("employee status", (data: any) => {
      console.log("🚀 ~ socket.on ~ data:", data);
      if (
        data?.user?.employeeDetails?.employeeStatus === "Inactive" &&
        data?.user?.id === +UserId
      ) {
        mutate(data?.user?.id);
      }
    });
  }, [UserId]);

  useEffect(() => {
    if (fetchClientmaturitylevel) {
      document.documentElement.style.setProperty(
        "--introductory-pillar",
        fetchClientmaturitylevel?.data?.[0]?.color
      );
      document.documentElement.style.setProperty(
        "--intermediate-pillar",
        fetchClientmaturitylevel?.data?.[1]?.color
      );
      document.documentElement.style.setProperty(
        "--advanced-pillar",
        fetchClientmaturitylevel?.data?.[2]?.color
      );
    }
  }, [fetchClientmaturitylevel]);

  const handleLogout = () => {
    mutate(userData?.query.id);
  };

  const resetTimer = () => {
    const currentTime: any = Date.now();
    localStorage.setItem("lastActiveTime", currentTime); // Store the current time
  };

  const checkLogoutTime = () => {
    const lastActiveTime: any = localStorage.getItem("lastActiveTime");
    if (lastActiveTime && Date.now() - lastActiveTime > LOGOUT_TIME) {
      mutate(userData?.query.id);
    }
  };

  useEffect(() => {
    // Check the last active time on component mount
    const lastActiveTime: any = localStorage.getItem("lastActiveTime");
    if (lastActiveTime && Date.now() - lastActiveTime > LOGOUT_TIME) {
      handleLogout(); // Log out if more than 5 minutes have passed
    }

    // Add event listeners for user activity
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keypress", resetTimer);

    const handleVisibilityChange = () => {
      resetTimer;
      if (document.visibilityState === "visible") {
        checkLogoutTime(); // Check logout time when the tab becomes visible
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Reset the timer when the component mounts
    resetTimer();

    // Clean up event listeners on component unmount
    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keypress", resetTimer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    // Start the timer on component mount

    // Reset timer on user activity
    const resetTimer = () => {
      startLogoutTimer();
    };
    let logoutTimer: any;

    const startLogoutTimer = () => {
      // Clear any existing timer
      clearTimeout(logoutTimer);

      // Set a new timer for 10 minutes
      logoutTimer = setTimeout(() => {
        handleLogout();
      }, 600000);
    };

    // Add event listeners for user activity
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keypress", resetTimer);

    // Clean up event listeners and timer on component unmount
    return () => {
      clearTimeout(logoutTimer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keypress", resetTimer);
    };
  }, [navigate]);

  return (
    <div className="App mx-auto">
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/membership" element={<OurServicePage />} />
        <Route path="/contact" element={<HomeContactPage />} />
        <Route path="/our-courses" element={<HomeOurCoursesPage />} />
        <Route path="/our-courses/:id" element={<FeatureCourseDetailPage />} />
        <Route
          path="/feature-course/:id"
          element={<FeatureCourseDetailPage />}
        />
        <Route path="/auth" element={<Auth />} />
        <Route path="/trainer-regestration" element={<RegisterTrainer />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/employee_register" element={<RegisterTrainee />} />
        <Route path="/inviteRegister" element={<RegisterTrainer />} />
        <Route path="/companyregister" element={<CompanyRegister />} />
        <Route path="/termsofservices" element={<TermsOfServices />} />
        <Route path="/privacypolicy" element={<PrivacyPolicyPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/blogDetails/:id" element={<BlogDetailsPage />} />
        <Route path="/termsofservices" element={<TermsOfServices />} />

        <Route path="/reset-password" element={<ChangePasswordPage />} />
        <Route
          path="/assessment"
          element={
            <CompanyProtectedRoute>
              <Assessment />
            </CompanyProtectedRoute>
          }
        />
        <Route
          path="/savedassesment"
          element={
            <CompanyProtectedRoute>
              <SavedAssesment />
            </CompanyProtectedRoute>
          }
        />
        <Route
          path="/question"
          element={
            <CompanyProtectedRoute>
              <QuestionPage />
            </CompanyProtectedRoute>
          }
        />
        <Route
          path="/retakeAssessment"
          element={
            <CompanyProtectedRoute>
              <QuestionPage />
            </CompanyProtectedRoute>
          }
        />
        <Route
          path="/maturelevel"
          element={
            <CompanyProtectedRoute>
              <MaturityLevelPage />
            </CompanyProtectedRoute>
          }
        />
        <Route
          path="/score"
          element={
            <CompanyProtectedRoute>
              <TeaserScore />
            </CompanyProtectedRoute>
          }
        />
        <Route
          path="/selectlevel"
          element={
            <CompanyProtectedRoute>
              <SelectLevel />
            </CompanyProtectedRoute>
          }
        />
        <Route
          path="/maturitylevelactionitem"
          element={
            <CompanyProtectedRoute>
              <MaturityLevelActionItem />
            </CompanyProtectedRoute>
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
          <Route
            path="employeelist/edit/:id"
            element={<TrainerEditDetails />}
          />
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
          <Route
            path="employee-basic-course/:courseId"
            element={<BasicCoursePage />}
          />
          <Route
            path="employee-assessment/:assessmentId"
            element={<EmployeeAssessment />}
          />
          <Route path="message" element={<MessagePage />} />
          <Route path="message/compose" element={<ComposePage />} />
          <Route path="notification-list" element={<NotificationListPage />} />
          <Route
            path="notification/:notificationId"
            element={<Notification />}
          />
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
          <Route path="my-accomplishments/:id" element={<Accomplishments />} />
          <Route path="faqslist" element={<FaqsListPage />} />
          <Route path="usermenual" element={<UserManualPage />} />
          <Route
            path="support-request/add-new-ticket"
            element={<SupportAddNewTicket />}
          />
          <Route
            path="support-request/ticket-details/:id"
            element={<TicketDetailsReplyPage />}
          />
          <Route path="employeepermission" element={<EmployeePermission />} />
          <Route path="support-request" element={<SupportRequestPage />} />
          <Route
            path="ticket-details-reply"
            element={<TicketDetailsReplyPage />}
          />
          <Route path="retakeAssessment" element={<QuestionPage />} />
          <Route path="notification-list" element={<NotificationListPage />} />
          <Route
            path="notification/:notificationId"
            element={<Notification />}
          />
          <Route
            path="employee-basic-course/:versionId"
            element={<BasicCoursePage />}
          />
          <Route
            path="employee-assessment/:assessmentId"
            element={<EmployeeAssessment />}
          />
        </Route>

        <Route
          path="/trainee"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="CourseLiveSession" element={<CourseLiveSession />} />
          <Route
            path="schedule-live-session"
            element={<ScheduleLiveSession />}
          />
          <Route
            path="schedule-live-session/edit/:id"
            element={<ScheduleLiveSession />}
          />
          <Route path="dashboard" element={<DashboardTrainee />} />
          <Route path="mycourses" element={<MyCourseTrainee />} />
          <Route path="allcourse" element={<AllCourseTrainee />} />
          <Route path="create_course" element={<CourseManagement />} />
          <Route
            path="create_course/:courseId"
            element={<CourseManagement />}
          />
          <Route path="add_assessment" element={<AssecessmentPage />} />
          <Route path="add_assessment/:assId" element={<AssecessmentPage />} />
          <Route
            path="employee-basic-course/:courseId"
            element={<BasicCoursePage />}
          />
          <Route
            path="employee-assessment/:assessmentId"
            element={<EmployeeAssessment />}
          />
          <Route path="enrolledrequest" element={<EnrollmentRequest />} />
          <Route path="enrolledcourses" element={<EnrolledCourse />} />
          <Route
            path="certificate-template"
            element={<CertificateTempletePage />}
          />
          <Route
            path="certificate-template/updatecertificate/:id"
            element={<Updatecertificate />}
          />
          <Route path="usermenual" element={<UserManualPage />} />
          <Route
            path="allocated-certificate"
            element={<AllocatedCertificate />}
          />
          <Route
            path="allocated-certificate-employee"
            element={<AllocatedCertificateEmployee />}
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
          <Route path="notification-list" element={<NotificationListPage />} />
          <Route
            path="notification/:notificationId"
            element={<Notification />}
          />
          <Route
            path="support-request/ticket-details/:id"
            element={<TicketDetailsReplyPage />}
          />
          <Route
            path="allocated-certificate/allocateEmploye/:id"
            element={<AllocatedCertificateEmployee />}
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
          <Route path="dashboard" element={<DashboardTrainer />} />
          <Route path="allcourse" element={<AllCoursesPage />} />
          <Route path="enrolledrequest" element={<EnrollmentRequest />} />
          <Route path="enrolledcourses" element={<EnrolledCourse />} />
          <Route path="create_course" element={<CourseManagement />} />
          <Route
            path="create_course/:courseId"
            element={<CourseManagement />}
          />
          <Route path="add_assessment" element={<AssecessmentPage />} />
          <Route path="add_assessment/:assId" element={<AssecessmentPage />} />
          <Route
            path="trainer-management"
            element={<TrainerManagementPage />}
          />
          <Route
            path="trainer-management/edit/:id"
            element={<TrainerDetailsEdit />}
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
            path="allocated-certificate-employee"
            element={<AllocatedCertificateEmployee />}
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
            path="allocated-certificate/allocateEmploye/:id"
            element={<AllocatedCertificateEmployee />}
          />
          <Route
            path="schedule-live-session"
            element={<ScheduleLiveSession />}
          />
          <Route
            path="schedule-live-session/edit/:id"
            element={<ScheduleLiveSession />}
          />
          <Route path="CourseLiveSession" element={<CourseLiveSession />} />
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
          <Route
            path="employee-assessment/:assessmentId"
            element={<EmployeeAssessment />}
          />
          <Route path="setting" element={<TrainerSettingPage />} />
        </Route>
      </Routes>
      <Loading isLoading={fetchByClientwisePending} />
    </div>
  );
}

export default App;
