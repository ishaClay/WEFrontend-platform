import { addAnswer, addPoint, addQuestion, removeQuestion } from "@/redux/reducer/AssessmentReducer";
import { useAppDispatch } from "@/hooks/use-redux";
import { CircleX } from "lucide-react";

interface AssecessmentTypeProps {
  i: number;
  type: string;
}

const AssecessmentFreeText = ({ i, type }: AssecessmentTypeProps) => {
  const dispatch = useAppDispatch();
  
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
          placeholder="Free Text Response"
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
        <h6 className="text-base text-black font-calibri pb-3">
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
          <label className="mb-3 text-[#515151] text-base block font-calibri">Answer Keywords (Enter Comma Separated keywords)</label>
          <textarea
            placeholder="Keywords1, Keywords2, keywords3"
            className="py-4 px-3 w-full border border-[#D9D9D9] placeholder:text-neutral-400 outline-none rounded-md resize-none"
            rows={8}
            onChange={(e) =>
              {
                dispatch(
                  addAnswer({
                    answer: e?.target?.value,
                    i,
                  })
                )}
            }
          />
        </div>
      </div>
    </div>
  );
};

export default AssecessmentFreeText;
