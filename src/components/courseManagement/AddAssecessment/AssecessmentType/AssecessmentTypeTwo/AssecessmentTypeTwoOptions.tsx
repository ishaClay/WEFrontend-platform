import ErrorMessage from "@/components/comman/Error/ErrorMessage";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { addAnswer, addOption, removeOption } from "@/redux/reducer/AssessmentReducer";
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
  setCheckedItems: React.Dispatch<React.SetStateAction<number[]>>
  checkedItems: number[];
  register: any;
  errors: any;
};

const AssecessmentTypeTwoOptions = ({
  data,
  i,
  iIndex,
  setOptions,
  options,
  setCheckedItems,
  checkedItems,
  register,
  errors
}: optionsProps) => {
  const dispatch = useAppDispatch();
  const { questionOption } = useAppSelector(
    (state: RootState) => state.assessment
  );

  useEffect(() => {
    dispatch(addAnswer({ answer: checkedItems, i }));
  }, [checkedItems])
  

  const handleCheck = (inx: number) => {
    setCheckedItems((prev: any) => {
      if (prev.includes(inx)) {
        return prev.filter((item: any) => item !== inx);
      } else {
        return [...prev, inx];
      }
    });
  }

  return (
    <div className="mb-4">
    <div className="space-x-2 flex items-center justify-between">
      <label htmlFor={data.optionTitle} className="flex items-center w-[98%]">
        <span className="text-sm text-black font-inter w-[80px]">
        Option {(iIndex + 1)}
        </span>
        <div className="w-full">
          <div className="px-4 py-1 border border-[#D9D9D9] rounded-md w-full flex justify-between items-center">
            <input
              {...register(`questionOption.${i}.options.${iIndex}.option`)}
              placeholder={data.option}
              className="w-full outline-none text-base font-calibri text-black"
              onChange={(e) => {
                dispatch(addOption({ option: e.target.value, i, iIndex }));
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
          {errors?.questionOption?.[i]?.option?.[iIndex] && <ErrorMessage message={errors?.questionOption?.[i]?.option?.[iIndex]?.message} />}
        </div>
      </label>
      <div className="w-[2%] text-right">
        <Checkbox 
          className="border border-[#D9D9D9] w-[22px] h-[22px]" 
          {...register(`questionOption.${i}.answer.${iIndex}`)}
          onCheckedChange={() => handleCheck(iIndex)}
          checked={questionOption?.find((_, index:number) => index === i)?.answer.includes(iIndex)}
        />
      </div>
    </div>
      {errors?.questionOption?.[i]?.answer && <ErrorMessage message={errors?.questionOption?.[i]?.answer?.[iIndex]?.message} />}
    </div>
  );
};

export default AssecessmentTypeTwoOptions;
