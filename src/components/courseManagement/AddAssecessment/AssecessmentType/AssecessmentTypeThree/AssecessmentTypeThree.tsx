import { Button } from "@/components/ui/button";
import AssecessmentTypeThreeOptions from "./AssecessmentTypeThreeOptions";
import { Fragment, useState } from "react";
import { useAppDispatch } from "@/hooks/use-redux";
import { addPoint, addQuestion } from "@/redux/reducer/AssessmentReducer";

interface AssecessmentTypeProps {
  i: number;
  type: string;
}

const AssecessmentTypeThree = ({ i, type }: AssecessmentTypeProps) => {
  const dispatch = useAppDispatch();

  const [options, setOptions] = useState([
    {
      optionTitle: `Option 1:`,
      option: "",
    },
  ]);

  const addOption = () => {
    const newOption = {
      optionTitle: `Option ${options.length + 1}:`,
      option: "",
    };
    setOptions([...options, newOption]);
  };

  return (
    <div className="border border-[#D9D9D9] rounded-lg p-5 mb-5">
      <div className="pb-8">
        <h6 className="text-base text-black font-calibri pb-3">
          Assessment Type
        </h6>
        <input
          placeholder="Single Choice Question"
          className="border border-[#D9D9D9] rounded-md w-full px-4 py-3 outline-none font-base font-calibri text-[#1D2026]"
        />
      </div>
      <div className="pb-8">
        <h6 className="text-base text-black font-calibri pb-3">
          Enter Question
        </h6>
        <div className="flex justify-between items-center border border-[#D9D9D9] rounded-md w-full px-4 py-1">
          <input
            placeholder="How would you describe an authoritarian (or controlling) management style?"
            className="outline-none font-base font-calibri text-[#1D2026] w-full"
            onChange={(e) =>
              dispatch(
                addQuestion({ index: i, question: e.target.value, assessmentType: type })
              )
            }
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
        <div className="text-right">
          <Button
            className="bg-transparent text-[#4285F4] text-base font-calibri text-right mb-5 hover:bg-transparent"
            onClick={addOption}
          >
            + Add Option
          </Button>
        </div>
        {options.map((data, index) => {
          return (
            <Fragment key={index}>
              <AssecessmentTypeThreeOptions
                data={data}
                i={i}
                iIndex={index}
                options={options}
                setOptions={setOptions}
              />
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default AssecessmentTypeThree;
