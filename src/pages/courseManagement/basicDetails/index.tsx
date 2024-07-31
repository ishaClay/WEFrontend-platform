import CourseStepper from "@/components/comman/CourseStepper";
import CourseAffiliations from "@/components/courseManagement/courseCreation/basicDetails/CourseAffiliations";
import CourseBanner from "@/components/courseManagement/courseCreation/basicDetails/CourseBanner";
import CourseInformation from "@/components/courseManagement/courseCreation/basicDetails/CourseInformation";
import CourseLogistic from "@/components/courseManagement/courseCreation/basicDetails/CourseLogistic";
import CourseSpecifications from "@/components/courseManagement/courseCreation/basicDetails/CourseSpecifications";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BasicDetails = () => {
  const search = window.location.search;
  const paramsTab = new URLSearchParams(search).get("tab") || "0";
  const params = new URLSearchParams(search).get("step") || "0";
  const [step, setStep] = React.useState<string | null>(params || null);
  const paramsId = new URLSearchParams(search).get("id");
  const paramsversion = new URLSearchParams(search).get("version");
  const location = useLocation();
  const navigate = useNavigate();
  const pathName = location?.pathname?.split("/")[1];
  const courseId = location?.pathname?.split("/")[3];

  useEffect(() => {
    if (!!params && !!paramsId && !!paramsversion && !!paramsTab) {
      navigate(
        `/${pathName}/create_course?tab=${paramsTab}&step=${params}&id=${paramsId}&version=${paramsversion}`
      );
      setStep(params);
    } else if (!!paramsId && !!paramsversion && !!paramsTab) {
      navigate(
        `/${pathName}/create_course?tab=${paramsTab}id=${paramsId}&version=${paramsversion}`,
        { replace: true }
      );
      setStep(params);
    } else if (courseId) {
      navigate(
        `/${pathName}/create_course/${courseId}?tab=${paramsTab}&step=${params}&version=${paramsversion}`
      );
      setStep(params);
    } else if (paramsTab === "1" && paramsversion && paramsId) {
      navigate(
        `/${pathName}/create_course?tab=${paramsTab}&id=${paramsId}&version=${paramsversion}`,
        {
          replace: true,
        }
      );
      setStep(params);
    } else {
      navigate(
        `/${pathName}/create_course?tab=${paramsTab}&step=${params}&version=${paramsversion}`,
        {
          replace: true,
        }
      );
      setStep(params);
    }
  }, [paramsId, paramsversion, paramsTab, navigate]);


  return (
    <div>
      <div className="w-full sm:my-10 mt-5 mb-[15px]">
        <CourseStepper
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
      {step === "0" ? (
        <CourseInformation setStep={setStep} />
      ) : step === "1" ? (
        <CourseSpecifications setStep={setStep} />
      ) : step === "2" ? (
        <CourseLogistic setStep={setStep} />
      ) : step === "3" ? (
        <CourseAffiliations setStep={setStep} />
      ) : (
        <CourseBanner />
      )}
    </div>
  );
};

export default BasicDetails;
