import { Button } from "@/components/ui/button";
import EvaluateQuestionsDetailsItem from "./EvaluateQuestionsDetailsItem";

const EvaluateModalDetailsItem = ({ data }: { data: any }) => {
  return (
    <div className="p-5 border-b border-[#D9D9D9]">
      <div className="">
        <div className="flex items-center pb-3">
          <h5 className="text-base font-calibri font-bold pe-5">
            Module :<span>{data.modalId}</span>
          </h5>
          <h5 className="text-base font-calibri font-bold">
            Session :<span>{data.sessionId}</span>
          </h5>
        </div>
        <h5 className="text-base font-calibri font-bold pb-3">
          Assessment :<span>{data.assessmentId}</span>
        </h5>

        <div className="space-y-6">
          {data.questions.map((item: any, index: number) => {
            return <EvaluateQuestionsDetailsItem key={index} item={item} />;
          })}
        </div>
      </div>
      <div className="mt-5 flex justify-between">
        <div className="flex items-center">
          <span className="px-3 py-2 border border-solid rounded-sm border-[#D9D9D9] text-[#1D2026] font-calibri text-4xl cursor-pointer">
            {data.page1}
          </span>
          <span className="px-3 py-2 text-[#1D2026] font-bold font-calibri text-4xl cursor-pointer">
            /{data.page2}
          </span>
        </div>
        <div className="">
          <Button className="outline-none text-base font-calibri text-white bg-[#58BA66] py-6 px-8">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EvaluateModalDetailsItem;
