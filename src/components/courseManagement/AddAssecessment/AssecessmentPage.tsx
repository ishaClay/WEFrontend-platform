import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import AssecessmentModuleSection from "./AssecessmentModuleSection";
import AssecessmentTypeOne from "./AssecessmentType/AssecessmentTypeOne/AssecessmentTypeOne";
import AssecessmentTypeTwo from "./AssecessmentType/AssecessmentTypeTwo/AssecessmentTypeTwo";
import AssecessmentTypeThree from "./AssecessmentType/AssecessmentTypeThree/AssecessmentTypeThree";
import { Fragment, useState } from "react";
import Modal from "@/components/comman/Modal";
import AssessmentModal from "../courseCreation/courseView/AssessmentModal";
import { useAppSelector } from "@/hooks/use-redux";
import { RootState } from "@/redux/store";

const AssecessmentPage = () => {
  const { selectedQuestionType } = useAppSelector(
    (state: RootState) => state.assessment
  );
  const [isOpenAssessmentModal, setIsOpenAssessmentModal] = useState(false);
  return (
    <div className="bg-white rounded-lg">
      <div className="flex justify-between items-center py-3 px-5 border-b border-[#D9D9D9]">
        <div>
          <h3 className="text-[16px] font-[700] font-nunito">Add Assessment</h3>
          <p className="text-[#606060] text-[15px]">
            Create an assessment to test much your trainees have learnt
          </p>
        </div>
        <Button
          className="bg-[#42A7C3] px-4 py-2 me-4 font-inter text-xs"
          onClick={() => setIsOpenAssessmentModal(true)}
        >
          <CirclePlus width={20} className="me-2" /> Add Question
        </Button>
      </div>
      <div className="p-5">
        <AssecessmentModuleSection />

        {selectedQuestionType?.map((type: string, index: number) => (
          <Fragment key={index}>
            {type === "MultipleChoiceQuestion" && <AssecessmentTypeTwo />}
            {type === "SingleChoiceQuestion" && <AssecessmentTypeOne i={index} type={type} />}
            {type === "HotSpoting" && <AssecessmentTypeThree />}
          </Fragment>
        ))}

        <div className="text-right">
          <Button className="outline-none text-base font-inter text-white bg-[#58BA66] py-6 px-8">
            Save Assessment
          </Button>
        </div>
      </div>

      <Modal
        open={isOpenAssessmentModal}
        onClose={() => setIsOpenAssessmentModal(false)}
        className="max-w-3xl p-0"
      >
        <AssessmentModal setIsOpenAssessmentModal={setIsOpenAssessmentModal} />
      </Modal>
    </div>
  );
};

export default AssecessmentPage;
