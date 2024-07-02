import { AccordionOption } from "@/types";
import Accordions from "../comman/Accordions";
import ModuleCardList from "./ModuleCardList";
import ModuleCourseViewCard from "./ModuleCourseViewCard";

const Module = () => {
  const moduleCourseCard = [
    {
      moduleName: "Chapter 1 - Intro",
      sectionId: 1,
      duration: "00:30:00",
    },
    {
      moduleName: "Chapter 2 - Basics",
      sectionId: 3,
      duration: "00:04:42",
    },
  ];

  const accordionItems: AccordionOption[] = moduleCourseCard.map((item) => {
    return {
      title: <ModuleCardList data={item} />,
      content: <ModuleCourseViewCard />,
    };
  });

  return (
    <div>
      <Accordions items={accordionItems} border={false} />
    </div>
  );
};

export default Module;
