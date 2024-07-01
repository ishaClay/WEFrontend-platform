import EnrolledCourseList from "./EnrolledCourseList";
import { MoveLeft } from "lucide-react";

const EnrolledCourcesPage = () => {
  return (
    <div>
      <div className="flex justify-between items-center py-2 px-4 border-b border-[#D9D9D9] mb-7">
        <div>
          <h3 className="text-[16px] font-[700] font-nunito mb-1">
            Enrolled Courses
          </h3>
          <p className="text-[#606060] text-[15px]">The full list of your courses that companies are currently enrolled in</p>
        </div>
        <div className="flex items-center">
          <MoveLeft />
          <span className="text-base font-semibold pl-4">Back</span>
        </div>
      </div>
      <EnrolledCourseList />
    </div>
  );
};

export default EnrolledCourcesPage;
