import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/auth/Auth";
import RegisterTrainer from "./pages/auth/RegisterTrainer";

import Company from "./pages/Company";
import RegisterTrainee from "./pages/auth/RegisterTrainee";
import Assessment from "./pages/Assessment";
import QuestionPage from "./pages/QuestionPage";
import MaturityLevelPage from "./pages/MaturityLevelPage";
import TeaserScore from "./pages/TeaserScore";
import SelectLevel from "./pages/SelectLevel";
import MaturityLevelActionItem from "./pages/MaturityLevelActionItem";
import MaturityLevelActionableMeasurePopup from "./pages/MaturityLevelActionableMeasurePopup";
import MaturityLevelAnswersPopup from "./pages/MaturityLevelAnswersPopup";
import CoursesRecommended from "./pages/CoursesRecommended";
import SavedAssesment from "./pages/SavedAssesment";
import CourseEmrolledToEmployeePopup from "./pages/CourseEmrolledToEmployeePopup";
import CoursesViewAllocatePopup from "./pages/CoursesViewAllocatePopup";
import CoursesEmrolledToEmployeeInvitePopup from "./pages/CoursesEmrolledToEmployeePopupInvite";
import CoursesAllocate from "./pages/CoursesAllocate";
import EmployeeList from "./pages/EmployeeList";
import EmployeeProgress from "./pages/EmployeeProgress";
import FaqsList from "./pages/FaqsList";
import EmployeeSendInvitation from "./pages/EmployeeSendInvitation";
import TrainingDocument from "./pages/TrainingDocument";
import SupportTicket from "./pages/SupportTicket";
import SupportDetails from "./pages/SupportDetails";
import SupportAnswer from "./pages/SupportAnswer";
import SupportAddNewTicket from "./pages/SupportAddNewTicket";
import EmployeePermission from "./pages/EmployeePermission";
import IndividualEmployee from "./pages/IndividualEmployee";
import Messaging from "./pages/Messaging";
import Compose from "./pages/Compose";
import SmeAdminDropdonw from "./pages/SmeAdminDropdonw";
import CoursesAllCourse from "./pages/CoursesAllCourse";
import MaturityAssessmentRoadmapAfterbuild from "./pages/MaturityAssessmentRoadmapAfterbuild";
import MaturityAssessmentRoadmapHistory from "./pages/MaturityAssessmentRoadmapHistory";
import MaturityAssessmentRoadmapActionView from "./pages/MaturityAssessmentRoadmapActionView";
import MaturityAssessmentRoadmapAssignActionItem from "./pages/MaturityAssessmentRoadmapAssignActionItem";
import Dashbord from "./pages/Dashbord";
import MaturityAssessmentRoadmapSetTarget from "./pages/MaturityAssessmentRoadmapSetTarget";
import MaturityAssessmentResult from "./pages/MaturityAssessmentResult";
import EmployeeDashbord from "./pages/EmployeeDashbord";
import MyCourses from "./pages/MyCourses";
import InProgress from "./pages/InProgress";
import EmployeeCompleted from "./pages/EmployeeCompleted";
import EmployeeCompletedSecond from "./pages/EmployeeCompletedSecond";
import MyCoursesAll from "./pages/MyCoursesAll";
import MyCoursesAllSecond from "./pages/MyCoursesAllSecond";
import TeamMemberDropdown from "./pages/TeamMemberDropdown";
import MyCoursesInformaction from "./pages/MyCoursesInformaction";
import MyCoursesSocial from "./pages/MyCoursesSocial";
import Module from "./pages/Module";
import ModulePdf from "./pages/ModulePdf";
import ModuleVideo from "./pages/ModuleVideo";
import ModulePdfDetail from "./pages/ModulePdfDetail";
import LiveSession from "./pages/LiveSession";
import RatingPopup from "./pages/RatingPopup";
import EmployeeFqs from "./pages/EmployeeFaq";
import UserManual from "./pages/UserManual";
import EmployeeSupportRequest from "./pages/EmployeeSupportRequest";
import EmployeeSupportRequestFirst from "./pages/EmployeeSupportRequestFirst";
import EmployeeSupportRequestSecond from "./pages/EmployeeSupportRequestSecond";
import EmployeeMsg from "./pages/EmployeeMsg";
import MessagePopup from "./pages/MessagePopup";
import CompanyRegister from "./pages/CompanyRegister";
import MyAccomplishmentsCertifications from "./pages/MyAccomplishmentsCertifications";
import MyAccomplishments from "./pages/MyAccomplishments";
import AssessmentResult from "./pages/AssessmentResult";
import ProfileSetting from "./pages/ProfileSetting";
import ChangePassword from "./pages/ChangePassword";
import EmployeeAssessmentResult from "./pages/EmployeeAssessmentResult";
import EmployeeAssessmentResultFirst from "./pages/EmployeeAssessmentResultFirst";
import EmployeeRodemap from "./pages/EmployeeRodemap";
import ModuleFrist from "./pages/ModuleFrist";
import EmployeeAssessmentResultPopup from "./pages/EmployeeAssessmentResultPopup";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./lib/constants";
import { changeTheme } from "./services/apiServices/theme";
import { useSelector } from "react-redux";
import Register from "./pages/auth/Register";
import { Toaster } from "./components/ui/toaster";

function App() {
  const { clientId } = useSelector((state: any) => state.user);

  const { data: themes } = useQuery({
    queryKey: [QUERY_KEYS.themeChanges],
    queryFn: () => changeTheme(clientId as string),
  });

  return (
    <div className="App max-w-[1500px] mx-auto">
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/trainer" element={<RegisterTrainer />} />
        <Route path="/register" element={<Register />} />
        <Route path="/registertrainee" element={<RegisterTrainee />} />
        <Route path="/company" element={<Company />} />
        <Route path="/companyregister" element={<CompanyRegister />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/question" element={<QuestionPage />} />
        <Route path="/maturelevel" element={<MaturityLevelPage />} />
        <Route path="/teaserscore" element={<TeaserScore />} />
        <Route path="/selectlevel" element={<SelectLevel />} />

        <Route
          path="/maturitylevelactionitem"
          element={<MaturityLevelActionItem />}
        />
        <Route
          path="/maturitylevelactionablepopup"
          element={<MaturityLevelActionableMeasurePopup />}
        />
        <Route
          path="/maturitylevelanswerspopup"
          element={<MaturityLevelAnswersPopup />}
        />
        <Route path="/coursesrecommended" element={<CoursesRecommended />} />
        <Route path="/savedassesment" element={<SavedAssesment />} />
        <Route
          path="/courseemrolledemployeepopup"
          element={<CourseEmrolledToEmployeePopup />}
        />
        <Route
          path="/courseviewallocatepopup"
          element={<CoursesViewAllocatePopup />}
        />
        <Route
          path="/coursesemrolledtoemployeeinvitepopup"
          element={<CoursesEmrolledToEmployeeInvitePopup />}
        />
        <Route path="/allocatedcourses" element={<CoursesAllocate />} />
        <Route path="/employeelist" element={<EmployeeList />} />
        <Route path="/employeeprogress" element={<EmployeeProgress />} />
        <Route path="/faqslist" element={<FaqsList />} />
        <Route
          path="/employeesendinvitation"
          element={<EmployeeSendInvitation />}
        />
        <Route path="/trainingdocument" element={<TrainingDocument />} />
        <Route path="/supportticket" element={<SupportTicket />} />

        <Route path="/supportdetails" element={<SupportDetails />} />
        <Route path="/supportanswer" element={<SupportAnswer />} />
        <Route path="/supportaddnewticket" element={<SupportAddNewTicket />} />
        <Route path="/employeepermission" element={<EmployeePermission />} />
        <Route path="/individualemployee" element={<IndividualEmployee />} />
        <Route path="/messaging" element={<Messaging />} />
        <Route path="/compose" element={<Compose />} />
        <Route path="/smeadmindropdonw" element={<SmeAdminDropdonw />} />
        <Route path="/allcourses" element={<CoursesAllCourse />} />
        <Route
          path="/maturityassessmentroadmap"
          element={<MaturityAssessmentRoadmapAfterbuild />}
        />
        <Route
          path="/maturityassessmentroadmaphistory"
          element={<MaturityAssessmentRoadmapHistory />}
        />
        <Route
          path="/maturityassessmentroadmapactionview"
          element={<MaturityAssessmentRoadmapActionView />}
        />
        <Route
          path="/maturityassessmentroadmapassignactionitem"
          element={<MaturityAssessmentRoadmapAssignActionItem />}
        />
        <Route path="/dashbord" element={<Dashbord />} />
        <Route
          path="/maturityassessmentroadmapsettarget"
          element={<MaturityAssessmentRoadmapSetTarget />}
        />
        <Route
          path="/maturityassessmentresult"
          element={<MaturityAssessmentResult />}
        />
        {/* semiemployee */}
        <Route path="/employeedashbord" element={<EmployeeDashbord />} />
        <Route path="/mycourses" element={<MyCourses />} />
        <Route path="/inprogress" element={<InProgress />} />
        <Route path="/employeecompleted" element={<EmployeeCompleted />} />
        <Route
          path="/employeecompletedsecond"
          element={<EmployeeCompletedSecond />}
        />
        <Route path="/mycoursesall" element={<MyCoursesAll />} />
        <Route path="/mycoursesallsecond" element={<MyCoursesAllSecond />} />
        <Route path="/teammemberdropdown" element={<TeamMemberDropdown />} />
        <Route
          path="/mycoursesinformaction"
          element={<MyCoursesInformaction />}
        />
        <Route path="/mycoursessocial" element={<MyCoursesSocial />} />
        <Route path="/module" element={<Module />} />
        <Route path="/modulefrist" element={<ModuleFrist />} />
        <Route path="/modulepdf" element={<ModulePdf />} />
        <Route path="/modulevideo" element={<ModuleVideo />} />
        <Route path="/modulepdfdetail" element={<ModulePdfDetail />} />
        <Route path="/livesession" element={<LiveSession />} />
        <Route path="/ratingpopup" element={<RatingPopup />} />
        <Route path="/employeefaq" element={<EmployeeFqs />} />
        <Route path="/usermanual" element={<UserManual />} />
        <Route
          path="/employeesupportrequest"
          element={<EmployeeSupportRequest />}
        />
        <Route
          path="/employeesupportrequestfirst"
          element={<EmployeeSupportRequestFirst />}
        />
        <Route
          path="/employeesupportrequestsecond"
          element={<EmployeeSupportRequestSecond />}
        />
        <Route path="/employeemsg" element={<EmployeeMsg />} />
        <Route path="/messagepopup" element={<MessagePopup />} />
        <Route
          path="/myaccomplishmentscertifications"
          element={<MyAccomplishmentsCertifications />}
        />
        <Route path="/myaccomplishments" element={<MyAccomplishments />} />
        <Route path="/assessmentresult" element={<AssessmentResult />} />
        <Route path="/profilesetting" element={<ProfileSetting />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route
          path="/employeeassessmentresult"
          element={<EmployeeAssessmentResult />}
        />
        <Route
          path="/employeeassessmentresultfirst"
          element={<EmployeeAssessmentResultFirst />}
        />
        <Route path="/employeerodemap" element={<EmployeeRodemap />} />
        <Route
          path="/employeeassessmentresultpopup"
          element={<EmployeeAssessmentResultPopup />}
        />
      </Routes>
    </div>
  );
}

export default App;
