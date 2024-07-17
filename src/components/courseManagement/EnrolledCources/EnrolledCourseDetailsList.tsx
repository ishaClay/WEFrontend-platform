import { AccordionOption } from "@/types";
import EnrolledCourseDetailsItems from "./EnrolledCourseDetailsItems";
import Accordions from "@/components/comman/Accordions";
import EnrollCourseEmployeeDetailsList from "./EnrollCourseEmployeeDetailsList";

const EnrolledCourseDetailsList = () => {
  const detailsList = [
    {
      cohortGroup: 1,
      enrolledCompanies: 2,
      enrolledEmployees: 10,
      buttonAction: "onging",
      startDate: "20-05-2024",
      endDate: "30-05-2024",
    },
    {
      cohortGroup: 1,
      enrolledCompanies: 2,
      enrolledEmployees: 10,
      buttonAction: "upging",
      startDate: "20-05-2024",
      endDate: "30-05-2024",
    },
    {
      cohortGroup: 1,
      enrolledCompanies: 2,
      enrolledEmployees: 10,
      buttonAction: "Completed",
      startDate: "20-05-2024",
      endDate: "30-05-2024",
    },
  ];

  const accordionItems: AccordionOption[] = detailsList.map((item) => {
    return {
      title: <EnrolledCourseDetailsItems data={item} />,
      content: <EnrollCourseEmployeeDetailsList />,
    };
  });
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
