import { AccordionOption } from "@/types";
import Accordions from "../comman/Accordions";
import ModuleCardList from "./ModuleCardList";
import ModuleCourseViewCard from "./ModuleCourseViewCard";
import { getSingleCourseType } from "@/types/course";

const Module = ({data} : getSingleCourseType | any) => {
  const accordionItems: AccordionOption[] = data?.course?.module.map((item:any) => {
    return {
      title: <ModuleCardList data={item} />,
      content: <ModuleCourseViewCard data={item} />,
    };
  });

  return (
    <div>
      <Accordions items={accordionItems} border={false} />
    </div>
  );
};

export default Module;
