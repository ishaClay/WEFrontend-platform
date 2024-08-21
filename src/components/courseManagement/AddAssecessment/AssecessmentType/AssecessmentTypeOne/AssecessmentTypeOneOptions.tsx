import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import {
  addAnswer,
  addOption,
  removeOption,
} from "@/redux/reducer/AssessmentReducer";
import { RootState } from "@/redux/store";
import { Trash2 } from "lucide-react";
import { useEffect } from "react";

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
  assecessmentQuestion: any;
  answer: any;
};

const AssecessmentTypeOneOptions = ({
  data,
  i,
  iIndex,
  setOptions,
  options,
  setErrors,
  assecessmentQuestion,
  answer,
}: optionsProps) => {
  const dispatch = useAppDispatch();
  const { questionOption } = useAppSelector(
    (state: RootState) => state.assessment
  );

  useEffect(() => {
    dispatch(addAnswer({ answer: answer, i }));
  }, [answer]);

  useEffect(() => {
    if (assecessmentQuestion) {
      dispatch(
        addOption({ option: assecessmentQuestion?.[iIndex], i, iIndex })
      );
    }
  }, [assecessmentQuestion]);

  return (
    <div>
      <div className="">
        <div className="space-x-2 flex items-center justify-between">
          <label
            htmlFor={data.optionTitle}
            className="flex items-center w-[98%]"
          >
            <span className="text-sm text-black font-inter w-[80px]">
              Option {iIndex + 1}
            </span>
            <div className="px-4 py-1 border border-[#D9D9D9] rounded-md w-full flex justify-between items-center">
              <input
                placeholder={data.option}
                className="w-full  text-base font-calibri text-black"
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
                    addAnswer({
                      answer: questionOption?.[i]?.answer?.filter(
                        (item: number) => item !== iIndex
                      ),
                      i,
                    })
                  );
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
          </label>
          <div className="w-[2%] text-right">
            <RadioGroup
              onValueChange={(value: any) =>
                dispatch(
                  addAnswer({
                    answer: value,
                    i,
                  })
                )
              }
              value={questionOption[i]?.answer}
              className="flex items-center gap-[34px]"
            >
              <RadioGroupItem
                value={iIndex.toString()}
                id={data?.optionTitle}
                key={data?.optionTitle}
                className="w-[24px] h-[24px]"
              />
            </RadioGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssecessmentTypeOneOptions;
