import { Button } from "@/components/ui/button";
import EvaluateQuestionsDetailsItem from "./EvaluateQuestionsDetailsItem";

type evaluteModalProps = {
  data: {
    modalId: number;
    sessionId: number;
    assessmentId: number;
    questions: {
      questionId: number;
      pointId: number;
      desription: string;
      answer: string;
      keyWords: string;
    }[];
    page1: number;
    page2: number;
  };
};
const EvaluateModalDetailsItem = ({ data }: evaluteModalProps) => {
  return (
    <div className="sm:p-5 p-4 border-b border-[#D9D9D9]">
      <div className="">
        <div className="flex items-center pb-3">
          <h5 className="sm:text-base text-sm font-calibri font-bold pe-5">
            Module :<span>{data.modalId}</span>
          </h5>
          <h5 className="sm:text-base text-sm font-calibri font-bold">
            Session :<span>{data.sessionId}</span>
          </h5>
        </div>
        <h5 className="sm:text-base text-sm font-calibri font-bold pb-3">
          Assessment :<span>{data.assessmentId}</span>
        </h5>

        <div className="space-y-6">
          {data.questions.map((item: any, index: number) => {
            return <EvaluateQuestionsDetailsItem key={index} item={item} />;
          })}
        </div>
      </div>
      <div className="mt-5 flex sm:flex-row flex-col items-center justify-between gap-4">
        <div className="flex items-center">
          <span className="px-3 py-2 border border-solid rounded-sm border-[#D9D9D9] text-[#1D2026] font-calibri sm:text-4xl text-[26px] cursor-pointer">
            {data.page1}
          </span>
          <span className="px-3 py-2 text-[#1D2026] font-bold font-calibri sm:text-4xl text-[26px] cursor-pointer">
            /{data.page2}
          </span>
        </div>
        <div className="">
          <Button className="outline-none sm:text-base text-sm font-calibri text-white bg-[#58BA66] py-6 px-8 sm:h-[52px] h-10 sm:w-[137px] w-[154px]">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EvaluateModalDetailsItem;
