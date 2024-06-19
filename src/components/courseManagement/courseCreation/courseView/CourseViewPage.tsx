import Accordions from "@/components/comman/Accordions";
import CourseViewCardList from "./CourseViewCardList";
import { AccordionOption } from "@/types";
import CourseViewCardInner from "./CourseViewCardInner";

const CourseViewPage = () => {
  const CourseViewCard = [
    {
      moduleName: "Chapter 1 - Intro",
      sectionId: 3,
      reading: "50m Reading",
    },
    {
      moduleName: "Chapter 2 - Basics",
      sectionId: 3,
      reading: "50m Reading",
    },
  ];

  const accordionItems: AccordionOption[] = CourseViewCard.map((item) => {
    return {
      title: <CourseViewCardList data={item} />,
      content: <CourseViewCardInner />,
    };
  });
  return (
    <div>
      <Accordions items={accordionItems} padding={false} background />
    </div>
  );
};

export default CourseViewPage;
