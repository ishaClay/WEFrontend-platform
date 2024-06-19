import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import AssecessmentModuleSection from "./AssecessmentModuleSection";
import AssecessmentTypeOne from "./AssecessmentType/AssecessmentTypeOne/AssecessmentTypeOne";
import AssecessmentTypeTwo from "./AssecessmentType/AssecessmentTypeTwo/AssecessmentTypeTwo";
import AssecessmentTypeThree from "./AssecessmentType/AssecessmentTypeThree/AssecessmentTypeThree";
import { useState } from "react";
import Modal from "@/components/comman/Modal";
import AssessmentModal from "../courseCreation/courseView/AssessmentModal";

const AssecessmentPage = () => {
  const [isOpenAssessmentModal, setIsOpenAssessmentModal] = useState(false);
  return (
    <div className="bg-white p-5">
      <div className="flex justify-between items-center pb-5 mb-5 border-b border-[#D9D9D9]">
        <h3 className="text-base font-calibri font-bold">Add Assessment</h3>
        <Button
          className="bg-[#42A7C3] px-4 py-2 me-4 font-inter text-xs"
          onClick={() => setIsOpenAssessmentModal(true)}
        >
          <CirclePlus width={20} className="me-2" /> Add Question
        </Button>
      </div>
      <AssecessmentModuleSection />
      <AssecessmentTypeOne />
      <AssecessmentTypeTwo />
      <AssecessmentTypeThree />

      <div className="text-right">
        <Button className="outline-none text-base font-inter text-white bg-[#58BA66] py-6 px-8">
          Save Assessment
        </Button>
      </div>

      <Modal
        open={isOpenAssessmentModal}
        onClose={() => setIsOpenAssessmentModal(false)}
        className="max-w-3xl"
      >
        <AssessmentModal />
      </Modal>
    </div>
  );
};

export default AssecessmentPage;
