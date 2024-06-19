import EnrolledCourseList from "./EnrolledCourseList";
import { MoveLeft } from "lucide-react";

const EnrolledCourcesPage = () => {
  return (
    <div>
      <div className="flex justify-between items-center py-5 px-4 border-b border-[#D9D9D9] mb-7">
        <div>
          <h6 className="text-base font-bold">Enrolled Courses</h6>
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
