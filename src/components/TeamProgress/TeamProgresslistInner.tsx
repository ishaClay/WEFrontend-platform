import ActionItemsList from "./ActionItemsList";
import course_image from "@/assets/images/courselist.png";
import EnrolledCourses from "./EnrolledCourses";
import CustomCarousel from "../comman/CustomCarousel";

const TeamProgresslistInner = () => {
  const actionItems = [
    {
      title:
        "Lead in energy efficiency through continuous optimization and strategic energy management.",
      updateBy: "First Name Last Name",
      updateDate: "15/03/2024",
      targetDate: "15/03/2024",
      ActualDate: "15/03/2024",
    },
    {
      title:
        "Lead in energy efficiency through continuous optimization and strategic energy management.",
      updateBy: "First Name Last Name",
      updateDate: "15/03/2024",
      targetDate: "15/03/2024",
      ActualDate: "15/03/2024",
    },
    {
      title:
        "Lead in energy efficiency through continuous optimization and strategic energy management.",
      updateBy: "First Name Last Name",
      updateDate: "15/03/2024",
      targetDate: "15/03/2024",
      ActualDate: "15/03/2024",
    },
  ];

  const enrolledCourses = [
    {
      image: course_image,
      review: "recommended",
      title:
        "Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity",
    },
    {
      image: course_image,
      review: "recommended",
      title:
        "Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity",
    },
    {
      image: course_image,
      review: "recommended",
      title:
        "Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity",
    },
  ];
  return (
    <div className="grid xl:grid-cols-2 grid-cols-1 gap-[30px] pt-5 border-t border-[#D9D9D9]">
      <div className="col-span-1 rounded-xl border border-[#D9D9D9]">
        <div className="py-3 px-4 border-b border-[#D9D9D9]">
          <h5 className="text-base font-abhaya text-black font-semibold">
            Action Items
          </h5>
        </div>
        <div className="">
          {actionItems.map((data, index) => {
            return <ActionItemsList key={index} data={data} />;
          })}
        </div>
      </div>
      <div className="col-span-1 rounded-xl border border-[#D9D9D9]">
        <div className="py-3 px-4 border-b border-[#D9D9D9]">
          <h5 className="text-base font-abhaya text-black font-semibold">
            Enrolled Courses
          </h5>
        </div>
        <div className="px-5 py-20">
          <CustomCarousel containerClassName="">
            {enrolledCourses.map((data, index) => {
              return <EnrolledCourses key={index} data={data} />;
            })}
          </CustomCarousel>
        </div>
      </div>
    </div>
  );
};

export default TeamProgresslistInner;
