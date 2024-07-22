import { Fragment } from "react";

type StepperProps = {
  currentStep: number;
  steps: string[];
  onChangeStep?: (step: number) => void;
};

const CourseStepper = ({ currentStep, steps, onChangeStep }: StepperProps) => {
  const activeColor = (index: number) =>
    currentStep === index || currentStep > index ? "bg-muted" : "bg-muted";

  const activeTextColor = (index: number) =>
    currentStep === index ? "text-orange" : "text-grey";
  return (
    <div>
      <div className="mt-[-17px] flex items-center justify-between relative">
        {steps.map((step, index) => (
          <Fragment key={step}>
            <div
              className={`relative flex cursor-pointer items-center justify-center rounded-full flex-col bg-transparent ${activeColor(
                index
              )}`}
              onClick={() => {
                currentStep > index && onChangeStep?.(index);
              }}
            >
              <div
                className={`h-8 w-8 px-4 flex items-center justify-center rounded-full z-50 ${
                  currentStep === index
                    ? "bg-[#00778B] text-white"
                    : "bg-[#D9D9D9] text-black"
                }`}
              >
                {index + 1}
              </div>
              <h3
                className={`w-full font-calibri mt-[6px] text-sm sm:block hidden ${
                  currentStep === index ? "text-[#00778B]" : "text-grey"
                } ${
                  index === 0
                    ? "text-left"
                    : index === 3
                    ? "text-right"
                    : index === 4
                    ? "text-right"
                    : "text-center"
                } ${activeTextColor(index)}`}
              >
                {step}
              </h3>
            </div>
          </Fragment>
        ))}
        <div className="h-[2px] 2xl:w-[95%] xl:w-[90%] sm:w-[88%] bg-muted absolute top-[18px] m-auto left-0 right-0 z-10"></div>
      </div>
      {/* <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <Fragment key={index}>
            <h3
              className={`w-full font-calibri mt-[6px] text-sm sm:block hidden ${
                currentStep === index ? "text-[#00778B]" : "text-grey"
              } ${
                index === 0
                  ? "text-left"
                  : index === 3
                  ? "text-right"
                  : index === 4
                  ? "text-right"
                  : "text-center"
              } ${activeTextColor(index)}`}
            >
              {step}
            </h3>
          </Fragment>
        ))}
      </div> */}
    </div>
  );
};

export default CourseStepper;
