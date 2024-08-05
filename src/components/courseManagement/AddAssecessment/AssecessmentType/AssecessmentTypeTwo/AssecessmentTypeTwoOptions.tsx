import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import {
  addAnswer,
  addOption,
  removeOption,
} from "@/redux/reducer/AssessmentReducer";
import { RootState } from "@/redux/store";
import { Trash2 } from "lucide-react";

type optionsProps = {
  data: {
    optionTitle: string;
    option: string;
  };
  i: number;
  iIndex: number;
  options: any[];
  setOptions: React.Dispatch<React.SetStateAction<any>>;
  setErrors: React.Dispatch<React.SetStateAction<any>>;
};

const AssecessmentTypeTwoOptions = ({
  data,
  i,
  iIndex,
  setOptions,
  options,
  setErrors,
}: optionsProps) => {
  const dispatch = useAppDispatch();
  const { questionOption } = useAppSelector(
    (state: RootState) => state.assessment
  );

  const handleCheck = (inx: number) => {
    const currentAnswers = questionOption[i]?.answer || [];

    const updatedCheckedItems = currentAnswers.includes(inx)
      ? currentAnswers.filter((item: number) => item !== inx)
      : [...currentAnswers, inx];

    dispatch(addAnswer({ answer: updatedCheckedItems, i }));
    setErrors((prev: any) => ({
      ...prev,
      answer: "",
    }));
  };

  return (
    <div className="mb-4">
      <div className="space-x-2 flex items-center justify-between">
        <label htmlFor={data.optionTitle} className="flex items-center w-[98%]">
          <span className="text-sm text-black font-inter w-[80px]">
            Option {iIndex + 1}
          </span>
          <div className="w-full">
            <div className="px-4 py-1 border border-[#D9D9D9] rounded-md w-full flex justify-between items-center">
              <input
                placeholder={data.option}
                className="w-full outline-none text-base font-calibri text-black"
                onChange={(e) => {
                  dispatch(addOption({ option: e.target.value, i, iIndex }));
                  const updatedOptions = [...options];
                  updatedOptions[iIndex] = {
                    ...updatedOptions[iIndex],
                    option: e.target.value,
                  };
                  setOptions(updatedOptions);

                  setErrors((prev: any) => ({
                    ...prev,
                    options: prev.options.map((option: string, index: number) =>
                      index === iIndex ? "" : option
                    ),
                  }));
                }}
                value={questionOption[i]?.option?.[iIndex]}
              />
              <Button
                className="px-4 py-1 bg-[#FFD2D2] text-[#FF5252] rounded-sm hover:bg-[#FFD2D2]"
                onClick={() => {
                  if (options.length <= 1) return;
                  const updatedOptions = options.filter(
                    (_, index) => index !== iIndex
                  );
                  setOptions(updatedOptions);
                  dispatch(
                    removeOption({
                      i,
                      iIndex,
                    })
                  );
                }}
              >
                <Trash2 width={18} />
              </Button>
            </div>
          </div>
        </label>
        <div className="w-[2%] text-right">
          <Checkbox
            className="border border-[#D9D9D9] w-[22px] h-[22px]"
            onCheckedChange={() => handleCheck(iIndex)}
            checked={questionOption[i]?.answer?.includes(iIndex) || false}
          />
        </div>
      </div>
    </div>
  );
};

export default AssecessmentTypeTwoOptions;
