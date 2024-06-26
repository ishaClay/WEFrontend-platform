import { MoveLeft } from "lucide-react";
import EnrolledCourseList from "./EnrolledCourseList";

const EnrolledCourcesPage = () => {
  const userData = JSON.parse(localStorage.getItem("user") as string);

  console.log("userData", userData);
  return (
    <div>
      <div className="flex justify-between items-center py-2 px-4 border-b border-[#D9D9D9] mb-7">
        <div>
          <h6 className="text-base font-bold font-nunito">Enrolled Courses</h6>
          <p className="text-[#606060] text-[15px] font-abhaya leading-[16px]">
            {+userData?.query?.role === 2
              ? "Here are all the companies and their cohorts who’ve been involved in this course"
              : "The full list of your courses that are currently enrolled in by companies"}
          </p>
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
