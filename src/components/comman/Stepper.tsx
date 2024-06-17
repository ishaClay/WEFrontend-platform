import { Fragment } from "react";

type StepperProps = {
  currentStep: number;
  steps: string[];
  onChangeStep?: (step: number) => void;
};

const Stepper = ({ currentStep, steps, onChangeStep }: StepperProps) => {
  const activeColor = (index: number) =>
    currentStep === index || currentStep > index ? "bg-orange" : "bg-muted";

  const activeTextColor = (index: number) =>
    currentStep === index ? "text-orange" : "text-grey";

  const activeColorLine = (index: number) =>
    currentStep > index ? "bg-orange" : "bg-muted";

  const isFinalStep = (index: number) => index === steps.length - 1;
  return (
    <div className="mt-[-17px] flex items-center justify-center">
      {steps.map((step, index) => (
        <Fragment key={index}>
          <div
            className={`relative flex cursor-pointer items-center justify-center rounded-full bg-muted ${activeColor(
              index
            )}`}
            onClick={() => {
              currentStep > index && onChangeStep?.(index);
            }}
          >
            <div
              className={`h-8 w-8 px-4 flex items-center justify-center rounded-full ${
                currentStep === index
                  ? "bg-[#00778B] text-white"
                  : "bg-[#D9D9D9] text-black"
              }`}
            >
              {index + 1}
            </div>
            <h3
              className={`absolute top-full w-[200px] text-center font-calibri mt-[6px] text-sm ${
                currentStep === index ? "text-[#00778B]" : "text-grey"
              } ${activeTextColor(index)}`}
            >
              {step}
            </h3>
          </div>
          {isFinalStep(index) ? null : (
            <div
              className={`h-[2px] w-[300px] ${activeColorLine(index)}`}
            ></div>
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default Stepper;
