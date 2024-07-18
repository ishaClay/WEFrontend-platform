import EnrolledCourseListItem from "./EnrolledCourseListItem";
import { AccordionOption } from "@/types";
import Accordions from "@/components/comman/Accordions";
import EnrolledCourseDetailsList from "./EnrolledCourseDetailsList";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants";
import { fetchEnrollmentAccepted } from "@/services/apiServices/enroll";
import { useSelector } from "react-redux";
import { Data } from "@/types/enroll";

const EnrolledCourseList = () => {
  const { UserId } = useSelector((state: any) => state.user);
  const { data: enrolledCoursesData } = useQuery({
    queryKey: [QUERY_KEYS.enrolledCourses],
    queryFn: () => fetchEnrollmentAccepted(UserId),
  });
  console.log("enrolledCoursesData", enrolledCoursesData);
  
  const accordionItems: AccordionOption[] = enrolledCoursesData?.data.map((item:Data) => {
    return {
      title: <EnrolledCourseListItem data={item} />,
      content: <EnrolledCourseDetailsList data={item} />,
    };
  })

  return (
    <div className="sm:px-5 px-4 pb-4">
      {accordionItems ? <Accordions
        items={accordionItems}
        triggerClassName="sm:flex block"
        itemsClass="sm:p-5 p-0"
        customIconClassName="sm:static absolute right-4 bottom-4"
      /> : <span className="text-center block text-xl">No data found</span> }
    </div>
  );
};

export default EnrolledCourseList;
