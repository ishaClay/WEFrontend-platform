import { Button } from "@/components/ui/button";
import { RadioGroup } from "@/components/ui/radio-group";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import {
  addPoint,
  addQuestion,
  removeQuestion,
} from "@/redux/reducer/AssessmentReducer";
import { RootState } from "@/redux/store";
import { CircleX } from "lucide-react";
import { forwardRef, useImperativeHandle, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import AssecessmentTypeOneOptions from "./AssecessmentTypeOneOptions";

interface AssecessmentTypeProps {
  i: number;
  type: string;
}

interface Validatable {
  validate: () => boolean;
}

const AssecessmentTypeOne = forwardRef<Validatable, AssecessmentTypeProps>(
  ({ i, type }, ref) => {
    const dispatch = useAppDispatch();

    const { questionOption } = useAppSelector(
      (state: RootState) => state.assessment
    );

    const [options, setOptions] = useState([
      {
        optionTitle: `Option 1:`,
        option: "",
      },
    ]);
    const [errors, setErrors] = useState({
      question: "",
      point: "",
      options: Array(options.length).fill(""),
      answer: "",
    });

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

    const validateAssecessmentTypeOne = () => {
      let valid = true;
      const newErrors = {
        question: "",
        point: "",
        options: Array(options.length).fill(""),
        answer: "",
      };

      // Validate question
      const questionValue = questionOption?.[i]?.question?.trim() || "";
      if (!questionValue) {
        newErrors.question = "Question is required";
        valid = false;
      }

      // Validate points
      const pointValue = questionOption?.[i]?.point;
      if (!pointValue || pointValue <= 0) {
        newErrors.point = "Points must be a positive integer";
        valid = false;
      }

      // Validate Answer
      const answerValue = questionOption?.[i]?.answer;
      if (!answerValue) {
        newErrors.answer = "Answer is required";
        valid = false;
      }

      // Validate options
      const currentOptions = options.map((option) => option.option.trim());
      if (currentOptions.some((option) => !option)) {
        newErrors.options = currentOptions.map((option) =>
          !option ? "Option is required" : ""
        );
        valid = false;
      }

      setErrors(newErrors);
      return valid;
    };

    useImperativeHandle(ref, () => ({
      validate: validateAssecessmentTypeOne,
    }));

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
            placeholder="Single Choice Question"
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
              placeholder="How would you describe an authoritarian (or controlling) management style?"
              className="outline-none font-base font-calibri text-[#1D2026] w-full"
              onChange={(e) => {
                dispatch(
                  addQuestion({
                    index: i,
                    question: e.target.value,
                    assessmentType: type,
                  })
                );
                setErrors((prev) => ({ ...prev, question: "" }));
              }}
            />
            <div className="flex items-center">
              <label className="me-3 text-[#515151] text-base font-calibri">
                Point
              </label>
              <input
                className="py-2 px-3 w-[100px] border border-[#D9D9D9] outline-none rounded-md"
                onChange={(e) => {
                  dispatch(addPoint({ index: i, point: +e.target.value }));
                  setErrors((prev) => ({ ...prev, point: "" }));
                }}
                type="number"
              />
            </div>
          </div>
          {errors.question && (
            <p className="text-red-500 text-sm">{errors.question}</p>
          )}
          {errors.point && (
            <p className="text-red-500 text-sm">{errors.point}</p>
          )}
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
          <RadioGroup defaultValue="comfortable">
            {options.map((data, index) => {
              return (
                <Fragment key={index}>
                  <AssecessmentTypeOneOptions
                    data={data}
                    i={i}
                    iIndex={index}
                    options={options}
                    setOptions={setOptions}
                    setErrors={setErrors}
                  />
                  {errors.options[index] && (
                    <p className="text-red-500 text-sm">
                      {errors.options[index]}
                    </p>
                  )}
                </Fragment>
              );
            })}
            {errors.answer && (
              <p className="text-red-500 text-sm">{errors.answer}</p>
            )}
          </RadioGroup>
        </div>
      </div>
    );
  }
);

export default AssecessmentTypeOne;
