import { addAnswer, addPoint, addQuestion, removeQuestion } from "@/redux/reducer/AssessmentReducer";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { CircleX } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { RootState } from "@/redux/store";

interface AssecessmentTypeProps {
  i: number;
  type: string;
}

const AssecessmentTrueFalse = ({ i, type }: AssecessmentTypeProps) => {
  const dispatch = useAppDispatch();
  const { questionOption } = useAppSelector((state: RootState) => state.assessment);  
  const handleRemove = (i:number) => {
    dispatch(removeQuestion({ i }));
  }

  return (
    <div className="border border-[#D9D9D9] rounded-lg p-5 mb-5">
      <div className="pb-8">
        <div className="flex justify-between items-center">
          <h6 className="text-base text-black font-calibri pb-3">
            Assessment Type
          </h6>
          <CircleX className="text-[#fb6262] -mt-7 cursor-pointer" onClick={() => handleRemove(i)} />
        </div>
        <div className="flex items-center gap-3">
        <input
          placeholder="True Or False"
          disabled
          className="border border-[#D9D9D9] bg-[#FBFBFB] rounded-md w-full px-4 py-3 outline-none font-base font-calibri text-[#1D2026]"
        />
        <div className="flex items-center">
            <label className="me-3 text-[#515151] text-base font-calibri">
              Point
            </label>
            <input
              className="py-2 px-3 w-[100px] border border-[#D9D9D9] outline-none rounded-md"
              onChange={(e) =>
                dispatch(addPoint({ index: i, point: +e.target.value }))
              }
            />
          </div>
        </div>
      </div>
      <div className="">
        <h6 className="text-base text-black font-calibri pb-1">
          Enter Question
        </h6>
        <div className="flex justify-between items-center border border-[#D9D9D9] rounded-md w-full px-4 py-3 mb-5">
          <input
            placeholder="How would you describe an authoritarian (or controlling) management style?"
            className="outline-none font-base font-calibri text-[#1D2026] w-full"
            onChange={(e) =>
              {dispatch(
                addQuestion({ index: i, question: e.target.value, assessmentType: type })
              )}
            }
          />
        </div>
        <div className="">
          <RadioGroup 
            defaultValue={questionOption[i]?.answer}
            onValueChange={(value: any) => dispatch(addAnswer({answer: value, i}))}
            value={questionOption[i]?.answer}
          >
            <div className="flex items-center space-x-2 mb-3">
              <RadioGroupItem value="yes" id="yes" className="w-[24px] h-[24px]" />
              <Label htmlFor="yes" className="text-base">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="no" className="w-[24px] h-[24px]" />
              <Label htmlFor="no" className="text-base">No</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

export default AssecessmentTrueFalse;
