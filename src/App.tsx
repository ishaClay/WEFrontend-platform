import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/auth/Auth";
import RegisterTrainer from "./pages/auth/RegisterTrainer";
import Register from "./pages/auth/Register";
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
function App() {
	return (
		<div className="App max-w-[1500px] mx-auto">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/auth" element={<Auth />} />
				<Route path="/trainer" element={<RegisterTrainer />} />
				<Route path="/register" element={<Register />} />
				<Route path="/registertrainee" element={<RegisterTrainee />} />
				<Route path="/company" element={<Company />} />
				<Route path="/assessment" element={<Assessment />} />
				<Route path="/question" element={<QuestionPage />} />
				<Route path="/maturelevel" element={<MaturityLevelPage />} />
				<Route path="/teaserscore" element={<TeaserScore />} />
				<Route path="/selectlevel" element={<SelectLevel />} />	
		    	<Route path="/maturitylevelactionitem" element={<MaturityLevelActionItem />} />
                <Route path="/maturitylevelactionablepopup" element={<MaturityLevelActionableMeasurePopup />} />
				<Route path="/maturitylevelanswerspopup" element={<MaturityLevelAnswersPopup />} />
				<Route path="/coursesrecommended" element={<CoursesRecommended />} />
				<Route path="/savedassesment" element={<SavedAssesment />} />
				<Route path="/courseemrolledemployeepopup" element={<CourseEmrolledToEmployeePopup />} />
				<Route path="/courseviewallocatepopup" element={<CoursesViewAllocatePopup />} />
				<Route path="/coursesemrolledtoemployeeinvitepopup" element={<CoursesEmrolledToEmployeeInvitePopup />} />
				<Route path="/coursesallocate" element={<CoursesAllocate />} />
				<Route path="/employeelist" element={<EmployeeList />} />
				<Route path="/employeeprogress" element={<EmployeeProgress />} />
				<Route path="/faqslist" element={<FaqsList />} />
				<Route path="/employeesendinvitation" element={<EmployeeSendInvitation />} />
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
				<Route path="/Coursesallcourse" element={<CoursesAllCourse />} />
				<Route path="/maturityassessmentroadmap" element={<MaturityAssessmentRoadmapAfterbuild />} />
				<Route path="/maturityassessmentroadmaphistory" element={<MaturityAssessmentRoadmapHistory />} />
				<Route path="/maturityassessmentroadmapactionview" element={<MaturityAssessmentRoadmapActionView />} />
				<Route path="/maturityassessmentroadmapassignactionitem" element={<MaturityAssessmentRoadmapAssignActionItem/>} />
			</Routes>
		</div>
	);
}

export default App;
