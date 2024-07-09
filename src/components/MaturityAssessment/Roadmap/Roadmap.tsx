import Stepper from "@/components/comman/Stepper";
import React, { useEffect } from "react";
import Assign from "./Assign";
import SetTarget from "./SetTarget";

const Roadmap = () => {
  const pathStatus = JSON.parse(localStorage.getItem("path") as string);
  const [step, setStep] = React.useState(0);

  useEffect(() => {
    if (pathStatus > 5) {
      setStep(2);
    } else {
      setStep(0);
    }
  }, [pathStatus]);
  return (
    <div className="">
      <div className="w-full my-[40px]">
        <Stepper
          steps={[
            "Select Pillars (that you want to advance on first)",
            "Define Action Item",
            "Assign",
          ]}
          currentStep={step}
          onChangeStep={setStep}
        />
      </div>
      {step === 0 ? (
        <SetTarget setStep={setStep} />
      ) : (
        step === 2 && (
          <div className="w-full">
            <Assign setStep={setStep} />
          </div>
        )
      )}
    </div>
  );
};

export default Roadmap;
