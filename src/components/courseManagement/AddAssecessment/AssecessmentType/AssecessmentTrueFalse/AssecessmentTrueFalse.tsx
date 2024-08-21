import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import {
  addAnswer,
  addPoint,
  addQuestion,
  removeQuestion,
} from "@/redux/reducer/AssessmentReducer";
import { RootState } from "@/redux/store";
import { CircleX } from "lucide-react";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

interface AssecessmentTypeProps {
  i: number;
  type: string;
  assecessmentQuestion: any;
}

interface Validatable {
  validate: () => boolean;
}

const AssecessmentTrueFalse = forwardRef<Validatable, AssecessmentTypeProps>(
  ({ i, type, assecessmentQuestion }, ref) => {
    const dispatch = useAppDispatch();

    const { questionOption } = useAppSelector(
      (state: RootState) => state.assessment
    );

    const [errors, setErrors] = useState({
      question: "",
      point: "",
      answer: "",
    });
    const handleRemove = (i: number) => {
      dispatch(removeQuestion({ i }));
    };

    const validateAssecessmentTrueFalse = () => {
      let valid = true;
      const newErrors = {
        question: "",
        point: "",
        answer: "",
      };

      // Validate question
      const questionValue = questionOption?.[i]?.question?.trim() || "";
      if (!questionValue) {
        newErrors.question = "Question is required";
        valid = false;
      }
      if (questionValue?.length > 250) {
        newErrors.question =
          "You can not write questionValue more than 250 characters.";
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

      setErrors(newErrors);
      return valid;
    };

    useImperativeHandle(ref, () => ({
      validate: validateAssecessmentTrueFalse,
    }));

    useEffect(() => {
      if (assecessmentQuestion) {
        dispatch(addPoint({ index: i, point: assecessmentQuestion?.point }));
        dispatch(addAnswer({ answer: assecessmentQuestion?.answer, i }));
        dispatch(
          addQuestion({
            index: i,
            question: assecessmentQuestion?.question,
            assessmentType: assecessmentQuestion?.assessmentType,
          })
        );
      }
    }, [assecessmentQuestion]);

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
          <div className="flex items-center gap-3">
            <input
              placeholder="True Or False"
              disabled
              className="border border-[#D9D9D9] bg-[#FBFBFB] rounded-md w-full px-4 py-3  font-base font-calibri text-[#1D2026]"
            />
            <div className="flex items-center">
              <label className="me-3 text-[#515151] text-base font-calibri">
                Point
              </label>
              <input
                className="py-2 px-3 w-[100px] border border-[#D9D9D9]  rounded-md"
                onChange={(e) => {
                  const { value } = e.target;
                  if (value.match(/^[0-9]*$/)) {
                    dispatch(addPoint({ index: i, point: +e.target.value }));
                    setErrors((prev) => ({ ...prev, point: "" }));
                  }
                  return;
                }}
                type="text"
                min={0}
                max={100}
                value={questionOption[i]?.point || ""}
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span></span>
            {errors.point && (
              <p className="text-red-500 text-sm">{errors.point}</p>
            )}
          </div>
        </div>
        <div className="">
          <h6 className="text-base text-black font-calibri pb-1">
            Enter Question
          </h6>
          <div className="flex justify-between items-center border border-[#D9D9D9] rounded-md w-full px-4 py-3">
            <input
              placeholder="Enter the question"
              className=" font-base font-calibri text-[#1D2026] w-full"
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
              value={questionOption[i]?.question}
            />
          </div>
          {errors.question && (
            <p className="text-red-500 text-sm">{errors.question}</p>
          )}
          <div className="mt-5">
            <RadioGroup
              defaultValue={questionOption[i]?.answer}
              onValueChange={(value: any) => {
                dispatch(addAnswer({ answer: value, i }));
                setErrors((prev) => ({ ...prev, answer: "" }));
              }}
              value={questionOption[i]?.answer}
            >
              <div className="flex items-center space-x-2 mb-3">
                <RadioGroupItem
                  value="yes"
                  id="yes"
                  className="w-[24px] h-[24px]"
                />
                <Label htmlFor="yes" className="text-base">
                  Yes
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="no"
                  id="no"
                  className="w-[24px] h-[24px]"
                />
                <Label htmlFor="no" className="text-base">
                  No
                </Label>
              </div>
            </RadioGroup>
            {errors.answer && (
              <p className="text-red-500 text-sm">{errors.answer}</p>
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default AssecessmentTrueFalse;
