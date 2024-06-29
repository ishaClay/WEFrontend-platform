import Stepper from "@/components/comman/Stepper";
import CourseAffiliations from "@/components/courseManagement/courseCreation/basicDetails/CourseAffiliations";
import CourseBanner from "@/components/courseManagement/courseCreation/basicDetails/CourseBanner";
import CourseInformation from "@/components/courseManagement/courseCreation/basicDetails/CourseInformation";
import CourseLogistic from "@/components/courseManagement/courseCreation/basicDetails/CourseLogistic";
import CourseSpecifications from "@/components/courseManagement/courseCreation/basicDetails/CourseSpecifications";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BasicDetails = () => {
  const [step, setStep] = React.useState(1);
  const search = window.location.search;
  const paramsTab = new URLSearchParams(search).get("tab") || "";
  const params = new URLSearchParams(search).get("step") || "";
  const paramsId = new URLSearchParams(search).get("id");
  const paramsversion = new URLSearchParams(search).get("version");
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!!params && !!paramsId && !!paramsversion && !!paramsTab) {
      navigate(
        `/${location?.pathname?.split("/")[1]}/create_course?tab=${paramsTab}&step=${parseInt(
          params
        )}&id=${paramsId}&version=${paramsversion}`,
        {
          replace: true,
        }
      );
      setStep(parseInt(params));
    } else if (!!paramsId && !!paramsversion && !!paramsTab) {
      navigate(
        `/${location?.pathname?.split("/")[1]}/create_course?tab=${paramsTab}id=${paramsId}&version=${paramsversion}`,
        { replace: true }
      );
    } else {
      navigate(`/${location?.pathname?.split("/")[1]}/create_course?tab=${paramsTab}&step=${0}`, {
        replace: true,
      });
      setStep(0);
    }
  }, [params, step, paramsId, paramsversion, paramsTab]);

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
        <CourseInformation />
      ) : step === 1 ? (
        <CourseSpecifications />
      ) : step === 2 ? (
        <CourseLogistic />
      ) : step === 3 ? (
        <CourseAffiliations />
      ) : (
        <CourseBanner />
      )}
    </div>
  );
};

export default BasicDetails;
