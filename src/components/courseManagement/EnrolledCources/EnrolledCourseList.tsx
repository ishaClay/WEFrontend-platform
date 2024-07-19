import EnrolledCourseListItem from "./EnrolledCourseListItem";
import { AccordionOption } from "@/types";
import Accordions from "@/components/comman/Accordions";
import EnrolledCourseDetailsList from "./EnrolledCourseDetailsList";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants";
import { fetchEnrollmentAccepted } from "@/services/apiServices/enroll";
import { useSelector } from "react-redux";
import { EnrolledCoursesType } from "@/types/enroll";
import { Loader2 } from "lucide-react";

const EnrolledCourseList = () => {
  const { UserId } = useSelector((state: any) => state.user);
  const { data: enrolledCoursesData, isPending } = useQuery({
    queryKey: [QUERY_KEYS.enrolledCourses],
    queryFn: () => fetchEnrollmentAccepted(UserId),
  });
  
  const accordionItems: AccordionOption[] = enrolledCoursesData?.data.map((item: EnrolledCoursesType) => {
    return {
      title: <EnrolledCourseListItem data={item} />,
      content: <EnrolledCourseDetailsList data={item} />,
    };
  })

  return (
    <div className="sm:px-5 px-4 pb-4">
      {isPending ? <span className="py-10 flex justify-center items-center"><Loader2 className="w-5 h-5 animate-spin" /></span> : accordionItems?.length > 0 ? <Accordions
        items={accordionItems}
        triggerClassName="sm:flex block"
        itemsClass="sm:p-5 p-0"
        customIconClassName="sm:static absolute right-4 bottom-4"
      /> : <span className="text-center block text-xl">No data found</span> }
    </div>
  );
};

export default EnrolledCourseList;
