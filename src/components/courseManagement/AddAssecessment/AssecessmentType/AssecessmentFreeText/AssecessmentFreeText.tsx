import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import {
  addAnswer,
  addPoint,
  addQuestion,
  removeQuestion,
} from "@/redux/reducer/AssessmentReducer";
import { RootState } from "@/redux/store";
import { CircleX } from "lucide-react";
import { forwardRef, useImperativeHandle, useState } from "react";

interface AssecessmentTypeProps {
  i: number;
  type: string;
}

interface Validatable {
  validate: () => boolean;
}

const AssecessmentFreeText = forwardRef<Validatable, AssecessmentTypeProps>(
  ({ i, type }, ref) => {
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

    const validateAssecessmentFreeText = () => {
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
      validate: validateAssecessmentFreeText,
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
                value={questionOption[i]?.point}
                min={0}
                type="number"
              />
            </div>
          </div>
          {errors.point && (
            <p className="text-red-500 text-sm">{errors.point}</p>
          )}
        </div>
        <div className="">
          <h6 className="text-base text-black font-calibri pb-3">
            Enter Question
          </h6>
          <div className="flex justify-between items-center border border-[#D9D9D9] rounded-md w-full px-4 py-3 mb-5">
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
              }}
              value={questionOption[i]?.question}
            />
          </div>
          {errors.question && (
            <p className="text-red-500 text-sm">{errors.question}</p>
          )}
          <div className="">
            <label className="mb-3 text-[#515151] text-base block font-calibri">
              Answer Keywords (Enter Comma Separated keywords)
            </label>
            <textarea
              placeholder="Keywords1, Keywords2, keywords3"
              className="py-4 px-3 w-full border border-[#D9D9D9] placeholder:text-neutral-400 outline-none rounded-md resize-none"
              rows={8}
              onChange={(e) => {
                dispatch(
                  addAnswer({
                    answer: e?.target?.value,
                    i,
                  })
                );
              }}
              value={questionOption[i]?.answer}
            />
            {errors.answer && (
              <p className="text-red-500 text-sm">{errors.answer}</p>
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default AssecessmentFreeText;
