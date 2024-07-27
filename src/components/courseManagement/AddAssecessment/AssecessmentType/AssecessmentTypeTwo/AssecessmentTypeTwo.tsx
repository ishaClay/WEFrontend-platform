import ErrorMessage from "@/components/comman/Error/ErrorMessage";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks/use-redux";
import {
  addPoint,
  addQuestion,
  removeQuestion,
} from "@/redux/reducer/AssessmentReducer";
import { CircleX } from "lucide-react";
import { Fragment, useState } from "react";
import AssecessmentTypeTwoOptions from "./AssecessmentTypeTwoOptions";

interface AssecessmentTypeProps {
  i: number;
  type: string;
  errors: any;
  register: any;
  setValue: any;
  watch: any;
}

const AssecessmentTypeTwo = ({
  i,
  type,
  errors,
  register,
  setValue,
  watch,
}: AssecessmentTypeProps) => {
  const dispatch = useAppDispatch();
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [options, setOptions] = useState([
    {
      optionTitle: `Option 1:`,
      option: "",
    },
  ]);

  console.log("+++++++", setValue, watch);

  const addOption = () => {
    const newOption = {
      optionTitle: `Option ${options.length + 1}:`,
      option: "",
    };
    setOptions([...options, newOption]);
  };

  const handleRemove = (i: number) => {
    dispatch(removeQuestion({ i }));
  };

  console.log("errors?.questions?.[i]", errors?.questions?.[i]);

  return (
    <div className="border border-[#D9D9D9] rounded-lg p-5 mb-5">
      <div className="pb-8">
        <div className="flex justify-between items-center">
          <h6 className="text-base text-black font-calibri pb-3">
            Assessment Type
          </h6>
          <CircleX
            className="text-[#fb6262] -mt-7 cursor-pointer"
            onClick={() => handleRemove(i)}
          />
        </div>
        <input
          placeholder="Multiple Choice Question"
          disabled
          className="bg-[#FBFBFB] border border-[#D9D9D9] rounded-md w-full px-4 py-3 outline-none font-base font-calibri text-[#1D2026]"
        />
      </div>
      <div className="pb-8">
        <h6 className="text-base text-black font-calibri pb-3">
          Enter Question
        </h6>
        <div className="flex justify-between items-center border border-[#D9D9D9] rounded-md w-full px-4 py-1">
          <input
            {...register(`questions.${i}.question`)}
            placeholder="How would you describe an authoritarian (or controlling) management style?"
            className="outline-none font-base font-calibri text-[#1D2026] w-full"
            onChange={(e) =>
              dispatch(
                addQuestion({
                  index: i,
                  question: e.target.value,
                  assessmentType: type,
                })
              )
            }
          />
          <div className="flex items-center">
            <label className="me-3 text-[#515151] text-base font-calibri">
              Point
            </label>
            <input
              {...register(`questions.${i}.point`)}
              className="py-2 px-3 w-[100px] border border-[#D9D9D9] outline-none rounded-md"
              onChange={(e) =>
                dispatch(addPoint({ index: i, point: +e.target.value }))
              }
            />
          </div>
        </div>
        {errors?.questions?.[i]?.question && (
          <ErrorMessage message={errors?.questions?.[i]?.question?.message} />
        )}
        {errors?.questions?.[i]?.point && (
          <ErrorMessage message={errors?.questions?.[i]?.point?.message} />
        )}
      </div>
      <div className="">
        <div className="text-right">
          <Button
            className="bg-transparent text-[#4285F4] text-base font-calibri text-right mb-5 hover:bg-transparent"
            onClick={addOption}
            type="button"
          >
            + Add Option
          </Button>
        </div>
        {options.map((data, index) => {
          return (
            <Fragment key={index}>
              <AssecessmentTypeTwoOptions
                data={data}
                i={i}
                iIndex={index}
                options={options}
                setOptions={setOptions}
                setCheckedItems={setCheckedItems}
                checkedItems={checkedItems}
                register={register}
                errors={errors}
              />
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default AssecessmentTypeTwo;
