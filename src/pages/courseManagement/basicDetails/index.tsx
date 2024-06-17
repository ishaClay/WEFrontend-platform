import Stepper from "@/components/comman/Stepper";
import CourseAffiliations from "@/components/courseManagement/courseCreation/basicDetails/CourseAffiliations";
import CourseBanner from "@/components/courseManagement/courseCreation/basicDetails/CourseBanner";
import CourseInformation from "@/components/courseManagement/courseCreation/basicDetails/CourseInformation";
import CourseLogistic from "@/components/courseManagement/courseCreation/basicDetails/CourseLogistic";
import CourseSpecifications from "@/components/courseManagement/courseCreation/basicDetails/CourseSpecifications";
import React from "react";

const BasicDetails = () => {
  const [step, setStep] = React.useState(0);
  return (
    <div>
      <div className="w-full my-[40px]">
        <Stepper
          steps={[
            "Course Information",
            "Course Details & Specifications",
            "Course Logistic",
            "Course Affiliations",
            "Course Banner",
          ]}
          currentStep={step}
          onChangeStep={setStep}
        />
      </div>
      {step === 0 ? (
        <CourseInformation setStep={setStep} />
      ) : step === 1 ? (
        <CourseSpecifications setStep={setStep} />
      ) : step === 2 ? (
        <CourseLogistic setStep={setStep} />
      ) : step === 3 ? (
        <CourseAffiliations setStep={setStep} />
      ) : (
        <CourseBanner setStep={setStep} />
      )}
    </div>
  );
};

export default BasicDetails;
