import { AccordionOption } from "@/types";
import EnrolledCourseDetailsItems from "./EnrolledCourseDetailsItems";
import Accordions from "@/components/comman/Accordions";
import EnrollCourseEmployeeDetailsList from "./EnrollCourseEmployeeDetailsList";
import { CohortGroupType, EnrolledCoursesType } from "@/types/enroll";

const EnrolledCourseDetailsList = ({ data }: EnrolledCoursesType | any) => {
  const accordionItems: AccordionOption[] = data?.cohortGroup?.map(
    (item: CohortGroupType) => {
      return {
        title: <EnrolledCourseDetailsItems data={item} />,
        content: <EnrollCourseEmployeeDetailsList data={item} />,
      };
    }
  );
  return (
    <div className="">
      <Accordions
        items={accordionItems}
        rounded={false}
        className="sm:mt-[25px] mt-0"
        itemsClass="md:p-5 p-3 sm:mx-0 mx-3"
      />
    </div>
  );
};

export default EnrolledCourseDetailsList;
