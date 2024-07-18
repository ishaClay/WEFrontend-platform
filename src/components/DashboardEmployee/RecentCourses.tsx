import Course_image from "@/assets/images/Course_image.png";
import RecentCoursesItems from "./RecentCoursesItems";
import { Button } from "../ui/button";
import CustomCarousel from "../comman/CustomCarousel";

const RecentCourses = () => {
  const recentCourseItem = [
    {
      image: Course_image,
      title:
        "Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity",
      subTitle: "Social | 5 modules",
      progressCount: 25,
      progressDes: "1 of 5 Completed",
    },
    {
      image: Course_image,
      title:
        "Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity",
      subTitle: "Social | 5 modules",
      progressCount: 50,
      progressDes: "1 of 5 Completed",
    },
  ];
  return (
    <div className="mb-8">
      <div className="mb-5 flex justify-between items-center">
        <h3 className="font-bold font-nunito xl:text-[22px] text-lg relative pb-1">
          Recent Courses
          <div className="bg-[#64A70B] w-[115px] h-[2px] absolute left-0 bottom-0"></div>
        </h3>
        <Button className="bg-transparent text-base font-bold hover:bg-transparent text-[#00778B] font-nunito">
          View all
        </Button>
      </div>
      <div className="sm:block hidden">
        <div className="grid xl:grid-cols-2 grid-cols-1 gap-6">
          {recentCourseItem.map((data, index) => {
            return <RecentCoursesItems data={data} key={index} />;
          })}
        </div>
      </div>
      <div className="sm:hidden block">
        <CustomCarousel containerClassName="">
          {recentCourseItem.map((data, index) => {
            return <RecentCoursesItems data={data} key={index} />;
          })}
        </CustomCarousel>
      </div>
    </div>
  );
};

export default RecentCourses;
