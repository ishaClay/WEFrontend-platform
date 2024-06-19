import CourseViewCardInnerList from "./CourseViewCardInnerList";
import ManagementIcon from "@/assets/images/management.png";
import PlayVideo from "@/assets/images/play_video.png";
import AssesmentTest from "@/assets/images/assesment_test.png";
import FinancialManagement from "@/assets/images/financial_management.png";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { useState } from "react";
import Modal from "@/components/comman/Modal";
import AssessmentModal from "./AssessmentModal";

const CourseViewCardInner = () => {
  const CourseCardList = [
    {
      questionImage: ManagementIcon,
      question: "How to manage financial management?",
      durationType: "Video l Duration :",
      duration: "10 min",
    },
    {
      questionImage: PlayVideo,
      question: "Financial management",
      durationType: "Pdf l Duration :",
      duration: "10 min",
    },
    {
      questionImage: AssesmentTest,
      question: "Management",
      durationType: "Ppt l Duration :",
      duration: "10 min",
    },
    {
      questionImage: FinancialManagement,
      question: "Assesment Test",
      durationType: "Duration :",
      duration: "10 min",
      Percentage: "70%",
    },
  ];

  const [isOpenAssessmentModal, setIsOpenAssessmentModal] = useState(false);

  return (
    <div className="">
      <div>
        {CourseCardList.map((data, index) => {
          return <CourseViewCardInnerList key={index} data={data} />;
        })}

        <div className="text-right m-5">
          <Button className="bg-[#42A7C3] px-4 py-2 me-4 font-inter text-xs">
            <CirclePlus width={20} className="me-2" /> Section
          </Button>
          <Button
            className="bg-[#42A7C3] px-4 py-2 font-inter text-xs"
            onClick={() => setIsOpenAssessmentModal(true)}
          >
            <CirclePlus width={20} className="me-2" /> Add Assessment
          </Button>
        </div>
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

export default CourseViewCardInner;
