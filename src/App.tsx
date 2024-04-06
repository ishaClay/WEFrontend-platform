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
			</Routes>
		</div>
	);
}

export default App;
