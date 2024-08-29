import { AccordionOption } from "@/types";
import Accordions from "../comman/Accordions";
import ModuleCardList from "../EmployeeBasicCourse/ModuleCardList";
import ModuleCourseViewCard from "../EmployeeBasicCourse/ModuleCourseViewCard";

const Module = ({ data }: any) => {

  const accordionItems: AccordionOption[] = data?.module?.map(
    (item: any) => {
      return {
        title: <ModuleCardList data={item} />,
        content: <ModuleCourseViewCard data={item} allData={data} />,
      };
    }
  );

  return accordionItems?.length > 0 ? (
    <div>
      <Accordions items={accordionItems} border={false} />
    </div>
  ) : (
    <span className="flex justify-center items-center py-10">
      No Data Found
    </span>
  );
};

export default Module;
