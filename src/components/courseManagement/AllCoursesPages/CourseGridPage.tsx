/* eslint-disable @typescript-eslint/ban-ts-comment */
import Modal from "@/components/comman/Modal";
import { RecommendedCourses } from "@/types/RecommendedCourses";
import { AllCourse, Pillarcourse } from "@/types/allcourses";
import { useState } from "react";
import CohortModel from "./CohortModel";
import GridCard from "./GridCard";

type dataGridProps = {
  data: AllCourse[];
  reCommendedCourses: RecommendedCourses[];
  selectedCourse: Pillarcourse | null;
};

const CourseGridPage = ({ data, selectedCourse }: dataGridProps) => {
  const [isCohortShow, setIsCohortShow] = useState<null | AllCourse>(null);

  return (
    <>
      <Modal
        open={!!isCohortShow}
        onClose={() => setIsCohortShow(null)}
        className="w-[560px]"
      >
        <CohortModel isCohortShow={isCohortShow} />
      </Modal>
      {data?.map((allcourse: AllCourse) => {
        const maturityLevel =
          selectedCourse &&
          allcourse?.courseData?.find(
            (item) =>
              item.fetchPillar?.pillarName === selectedCourse?.pillarName
          );

        return (
          <GridCard
            allcourse={allcourse}
            maturityLevel={maturityLevel}
            setIsCohortShow={setIsCohortShow}
          />
        );
      })}
    </>
  );
};

export default CourseGridPage;
