import MaturityLevel from "./MaturityLevel";
import MyAction from "./MyAction";
import MyCourses from "./MyCourses";
import RecentCourses from "./RecentCourses";
import LiveSessions from "./LiveSessions";
import EmployeeHeader from "../EmployeeHeader";

const DashboardEmployee = () => {
  return (
    <div className="lg:bg-white bg-transparent rounded-xl px-5 py-2.5">
      <div>
        <EmployeeHeader title="Dashboard" />
      </div>
      <div className="py-5">
        <MaturityLevel />
        <MyAction />
        <MyCourses />
        <RecentCourses />
        <LiveSessions />
      </div>
    </div>
  );
};

export default DashboardEmployee;
