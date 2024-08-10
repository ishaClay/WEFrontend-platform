import EnrollCourseEmployeeDetailsListItem from "./EnrollCourseEmployeeDetailsListItem";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";
import Modal from "@/components/comman/Modal";
import { useState } from "react";
import SessionModalDetails from "./SessionModalDetails";
import { CohortGroupType } from "@/types/enroll";


interface EnrollCourseEmployeeDetailsListProps {
  data: CohortGroupType;
  courseById: number;
  cohortGroupById: number;
}
const EnrollCourseEmployeeDetailsList = ({ data, courseById, cohortGroupById }: EnrollCourseEmployeeDetailsListProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className="">
        {data?.employee && data?.employee?.length > 0 ? data?.employee?.map((item, index) => {
          return (
            <EnrollCourseEmployeeDetailsListItem data={item} key={index} courseById={courseById} cohortGroupById={cohortGroupById} />
          );
        }) : <span className="text-center block text-xl text-neutral-400">No data found</span> }
      </div>
      <div className="flex sm:flex-row flex-col sm:items-start items-center gap-3 mt-5">
        {
          data?.moduleLiveSection?.map((item, i:number) => {
            return <Button 
            key={i}
            variant={"outlinePrimary"}
            className="text-base font-calibri px-2.5"
            onClick={() => setIsOpen(true)}
          >
            <Video />
            {item?.liveSecTitle}
          </Button>
          })
        }
      </div>

      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="max-w-3xl"
      >
        <SessionModalDetails />
      </Modal>
    </div>
  );
};

export default EnrollCourseEmployeeDetailsList;
