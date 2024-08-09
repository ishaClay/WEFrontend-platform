import { Button } from "@/components/ui/button";
import EvaluateQuestionsDetailsItem from "./EvaluateQuestionsDetailsItem";
import { EvaluteDataEntity } from "@/types/enroll";
import { useState } from "react";

type evaluteModalProps = {
  data: EvaluteDataEntity;
  index: number;
};
const EvaluateModalDetailsItem = ({ data, index }: evaluteModalProps) => {
  const [addTotalPoints, setAddTotalPoints] = useState<string>("");
  const [errors, setErrors] = useState<{type: boolean, message: string}>({type: false, message: ""});
  const totalPoints = data?.evaluations?.reduce((sum:any, evaluation:any) => {
      return sum + evaluation?.question?.point;
  }, 0);

  const handleAddPoints = (value:string) => {
    if(!value?.match(/^[0-9]*$/)){
      setErrors({type: true, message: "Please enter valid number"})
    } else{
      setAddTotalPoints(value)
      setErrors({type: false, message: ""})
    }
  }

  return (
    data?.evaluations && data?.evaluations?.length > 0 && <div className="sm:p-5 p-4 border-b border-[#D9D9D9]">
      <div className="">
        <div className="flex items-center pb-3">
          <h5 className="sm:text-base text-sm font-calibri font-bold pe-5">
            Module :<span className="ml-1">{index +1}</span>
          </h5>
          {/* <h5 className="sm:text-base text-sm font-calibri font-bold">
            Session :<span>{data.sessionId}</span>
          </h5> */}
        </div>
        {/* <h5 className="sm:text-base text-sm font-calibri font-bold pb-3">
          Assessment :<span>{data.assessmentId}</span>
        </h5> */}

        <div className="space-y-6">
          {data?.evaluations?.map((item, index: number) => {
            return <EvaluateQuestionsDetailsItem key={index} item={item || null} index={index} />;
          })}
        </div>
      </div>
      <div className="mt-5 flex sm:flex-row flex-col items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <p className="px-3 py-2 w-[62px] h-[58px] border border-solid rounded-sm border-[#D9D9D9] text-[#1D2026] font-calibri sm:text-4xl text-[26px] cursor-pointer">
            {/* {data.page1} */}
            <input 
              type="text" 
              className="w-full h-full outline-none"
              onChange={(e) => handleAddPoints(e?.target?.value)}
            />
          </p>
          <span className="text-[#1D2026] font-bold font-calibri sm:text-4xl text-[26px] cursor-pointer">
            /{totalPoints}
          </span>
        </div>
        <div className="">
          <Button className="outline-none sm:text-base text-sm font-calibri text-white bg-[#58BA66] py-6 px-8 sm:h-[52px] h-10 sm:w-[137px] w-[154px]">
            Submit
          </Button>
        </div>
      </div>
      {
        (addTotalPoints > totalPoints || errors?.type) && <p className="text-red-500">{errors?.type ? errors?.message : `Points should not be greater than total ${totalPoints} points`}</p>
      }
    </div>
  );
};

export default EvaluateModalDetailsItem;
