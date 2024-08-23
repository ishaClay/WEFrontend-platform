import EnrolledCourseListItem from "./EnrolledCourseListItem";
import { AccordionOption } from "@/types";
import Accordions from "@/components/comman/Accordions";
import EnrolledCourseDetailsList from "./EnrolledCourseDetailsList";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants";
import {
  fetchEnrollmentAccepted,
  fetchEnrollmentAcceptedFilterData,
} from "@/services/apiServices/enroll";
import { EnrolledCoursesType } from "@/types/enroll";
import { Loader2 } from "lucide-react";
import { useAppSelector } from "@/hooks/use-redux";
import { useEffect, useState } from "react";

const EnrolledCourseList = () => {
  const { UserId } = useAppSelector((state) => state.user);
  const [selectVersion, setSelectVersion] = useState<any>({
    versionId: "",
    trainercompnyId: "",
    index: "",
  });
  const [coursesEnrolleList, setCoursesEnrolleList] = useState<any>([]);

  const { data: enrolledCoursesData, isPending } = useQuery({
    queryKey: [QUERY_KEYS.enrolledCourses],
    queryFn: () => fetchEnrollmentAccepted(UserId),
  });

  useEffect(() => {
    setCoursesEnrolleList(enrolledCoursesData?.data || []);
  }, [enrolledCoursesData]);

  const { data: fetchEnrollmentAcceptedFilterList, isPending: fetchEnrollmentAcceptedFilterPending } = useQuery({
    queryKey: [QUERY_KEYS.fetchEnrollmentAcceptedFilter, {id:  selectVersion?.versionId}],
    queryFn: () => fetchEnrollmentAcceptedFilterData(+UserId, +selectVersion?.versionId),
    enabled: !!selectVersion?.versionId && +selectVersion?.versionId !== 0,
    
  });
  const updateData = () => {
    const indexToReplace = selectVersion?.index;
    const updatedDataA = enrolledCoursesData?.data?.map((item:any, index:number) => {
      
      if (index === indexToReplace) {
        return fetchEnrollmentAcceptedFilterList?.data;
      }
      return item;
    });
    return updatedDataA;
  };
  
  useEffect(() => {
    if(!fetchEnrollmentAcceptedFilterPending){
      setCoursesEnrolleList(updateData());
      setSelectVersion({
        versionId: "",
        trainercompnyId: "",
        index: '',
      })
    }
  }, [fetchEnrollmentAcceptedFilterList, fetchEnrollmentAcceptedFilterPending])

  const accordionItems: AccordionOption[] = coursesEnrolleList?.map(
    (item: EnrolledCoursesType, index:number) => {
      return {
        title: <EnrolledCourseListItem data={item} index={index} selectVersion={selectVersion} isLoading={fetchEnrollmentAcceptedFilterPending}
        setSelectVersion={(e: number, inx:number, trainercompnyId: number) =>setSelectVersion({versionId: e, index: inx, trainercompnyId: trainercompnyId})} />,
        content: <EnrolledCourseDetailsList data={item} />,
      };
    }
  );

  return (
    <div className="sm:px-5 px-[15px] pb-[15px]">
      {isPending ? (
        <span className="py-10 flex justify-center items-center">
          <Loader2 className="w-5 h-5 animate-spin" />
        </span>
      ) : accordionItems?.length > 0 ? (
        <Accordions
          items={accordionItems}
          triggerClassName="sm:flex block"
          itemsClass="sm:px-5 sm:py-4 p-0 sm:border border-0"
          customIconClassName="sm:static absolute right-4 bottom-4"
        />
      ) : (
        <span className="text-center block sm:text-xl text-base">
          No data found
        </span>
      )}
    </div>
  );
};

export default EnrolledCourseList;
