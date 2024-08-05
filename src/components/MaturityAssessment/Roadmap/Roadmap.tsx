import Stepper from "@/components/comman/Stepper";
import { UserRole } from "@/types/UserRole";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import Assign from "./Assign";
import SetTarget from "./SetTarget";

const Roadmap = ({
  showButton,
  isEdit,
  setIsEdit,
}: {
  showButton: number;
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
}) => {
  const pathStatus = JSON.parse(localStorage.getItem("path") as string);
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const [step, setStep] = React.useState(0);

  useEffect(() => {
    if (
      !isEdit &&
      ((userData?.query?.role === UserRole.Company && pathStatus > 5) ||
        showButton !== 0)
    ) {
      setStep(2);
    } else {
      setStep(0);
    }
  }, [isEdit, pathStatus, showButton, userData]);

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
        <SetTarget setStep={setStep} setIsEdit={setIsEdit} />
      ) : (
        step === 2 && (
          <div className="w-full">
            <Assign setStep={setStep} setIsEdit={setIsEdit} />
          </div>
        )
      )}
    </div>
  );
};

export default Roadmap;
