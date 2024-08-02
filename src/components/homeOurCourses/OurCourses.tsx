import courseImage from "@/assets/images/Course_image.png";
import atuImage from "@/assets/images/atu.png";
import HomeHeader from "../homePage/HomeHeader";
import HomeFooter from "../homePage/HomeFooter";
import OurCourseList from "./OurCourseList";
const OurCourses = () => {
  const course = [
    {
      image: courseImage,
      title:
        "Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity",
      image1: atuImage,
    },
    {
      image: courseImage,
      title:
        "Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity",
      image1: atuImage,
    },
    {
      image: courseImage,
      title:
        "Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity",
      image1: atuImage,
    },
  ];
  return (
    <>
      <HomeHeader />
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:max-w-[1160px] max-w-full w-full mx-auto xl:px-0 md:px-3 px-4 py-7">
        {course.map((data: any, index: number) => {
          return <OurCourseList key={index} data={data} />;
        })}
      </div>
      <HomeFooter />
    </>
  );
};

export default OurCourses;
