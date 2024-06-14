import course_img from "@/assets/images/Course_image.png";
import EnrolledCourseListItem from "./EnrolledCourseListItem";
import { AccordionOption } from "@/types";
import Accordions from "@/components/comman/Accordions";
import EnrolledCourseDetailsList from "./EnrolledCourseDetailsList";

const EnrolledCourseList = () => {
  const courseListItems = [
    {
      image: course_img,
      rating: 4.5,
      title:
        "Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity",
      trainer: " Trainer Name, Trainer Name",
      enrolledComany: 5,
      enrolledEmployees: 25,
    },
    {
      image: course_img,
      rating: 4.5,
      title:
        "Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity",
      trainer: " Trainer Name, Trainer Name",
      enrolledComany: 5,
      enrolledEmployees: 25,
    },
    {
      image: course_img,
      rating: 4.5,
      title:
        "Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity",
      trainer: " Trainer Name, Trainer Name",
      enrolledComany: 5,
      enrolledEmployees: 25,
    },
  ];

  const accordionItems: AccordionOption[] = courseListItems.map((item) => {
    return {
      title: <EnrolledCourseListItem data={item} />,
      content: <EnrolledCourseDetailsList />,
    };
  });

  return (
    <div>
      <Accordions items={accordionItems} separator />
    </div>
  );
};

export default EnrolledCourseList;
