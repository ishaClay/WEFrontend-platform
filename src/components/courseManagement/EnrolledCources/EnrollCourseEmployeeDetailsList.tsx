import Modal from "@/components/comman/Modal";
import { Button } from "@/components/ui/button";
import { CohortGroupType } from "@/types/enroll";
import { Video } from "lucide-react";
import { useState } from "react";
import EnrollCourseEmployeeDetailsListItem from "./EnrollCourseEmployeeDetailsListItem";
import SessionModalDetails from "./SessionModalDetails";

interface EnrollCourseEmployeeDetailsListProps {
  data: CohortGroupType;
  course: any;
}
const EnrollCourseEmployeeDetailsList = ({
  data,
  course,
}: EnrollCourseEmployeeDetailsListProps) => {
  const [isOpen, setIsOpen] = useState<number | null>(null);
  return (
    <div>
      <div className="">
        {data?.employee && data?.employee?.length > 0 ? (
          data?.employee?.map((item, index) => {
            return (
              <EnrollCourseEmployeeDetailsListItem
                data={item}
                key={index}
                course={course}
              />
            );
          })
        ) : (
          <span className="text-center block text-xl text-neutral-400">
            No data found
          </span>
        )}
      </div>
      <div className="flex sm:flex-row flex-col sm:items-start items-center gap-3 mt-5 flex-wrap">
        {data?.moduleLiveSection?.map((item, i: number) => {
          return (
            <Button
              key={i}
              variant={"outlinePrimary"}
              className="text-base font-droid px-2.5"
              onClick={() => setIsOpen(item?.id)}
            >
              <Video />
              {item?.subtitle}
            </Button>
          );
        })}
      </div>

      <Modal
        open={!!isOpen}
        onClose={() => setIsOpen(null)}
        className="max-w-3xl"
      >
        <SessionModalDetails id={isOpen} />
      </Modal>
    </div>
  );
};

export default EnrollCourseEmployeeDetailsList;
