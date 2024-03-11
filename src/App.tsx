import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Auth from "./pages/auth/Auth";
import RegisterTrainer from "./pages/auth/RegisterTrainer";
import Register from "./pages/auth/Register";
import Company from "./pages/Company";
import RegisterTrainee from "./pages/auth/RegisterTrainee";

function App() {
  return (
    <div className="App max-w-[1500px] mx-auto">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/trainer" element={<RegisterTrainer />} />
        <Route path="/registertrainer" element={<Register />} />
        <Route path="/registertrainee" element={<RegisterTrainee />} />
        <Route path="/company" element={<Company />} />
      </Routes>
    </div>
  );
}

export default App;
