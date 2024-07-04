import Couse_Total from "@/assets/images/couse_total.png";
import Course_Completed from "@/assets/images/course_completed.png";
import Course_Progress from "@/assets/images/course_progress.png";
import MyCoursesItems from "./MyCoursesItems";

const MyCourses = () => {
  const coursesItems = [
    {
      image: Couse_Total,
      title: 9,
      subTitle: "Assigned",
    },
    {
      image: Course_Completed,
      title: 4,
      subTitle: "Open",
    },
    {
      image: Course_Progress,
      title: 3,
      subTitle: "Delayed",
    },
  ];
  return (
    <div className="mb-8">
      <h5 className="text-base text-black font-inter pb-4 font-medium">
        My Courses
      </h5>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {coursesItems.map((data, index) => {
          return <MyCoursesItems data={data} key={index} />;
        })}
      </div>
    </div>
  );
};

export default MyCourses;
