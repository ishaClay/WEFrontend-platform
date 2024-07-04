import Stepper from "@/components/comman/Stepper";
import CourseAffiliations from "@/components/courseManagement/courseCreation/basicDetails/CourseAffiliations";
import CourseBanner from "@/components/courseManagement/courseCreation/basicDetails/CourseBanner";
import CourseInformation from "@/components/courseManagement/courseCreation/basicDetails/CourseInformation";
import CourseLogistic from "@/components/courseManagement/courseCreation/basicDetails/CourseLogistic";
import CourseSpecifications from "@/components/courseManagement/courseCreation/basicDetails/CourseSpecifications";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BasicDetails = () => {
  const [step, setStep] = React.useState(0);
  const search = window.location.search;
  const paramsTab = new URLSearchParams(search).get("tab") || "0";
  const params = new URLSearchParams(search).get("step") || "0";
  const paramsId = new URLSearchParams(search).get("id");
  const paramsversion = new URLSearchParams(search).get("version");
  const location = useLocation();
  const navigate = useNavigate();
  const courseId = location?.pathname?.split("/")[3];
  
  useEffect(() => {
    if (!!params && !!paramsId && !!paramsversion && !!paramsTab) {
      navigate(
        `/${
          location?.pathname?.split("/")[1]
        }/create_course?tab=${paramsTab}&step=${parseInt(
          params
        )}&id=${paramsId}&version=${paramsversion}`
      );
      setStep(parseInt(params));
    } else if (!!paramsId && !!paramsversion && !!paramsTab) {
      navigate(
        `/${
          location?.pathname?.split("/")[1]
        }/create_course?tab=${paramsTab}id=${paramsId}&version=${paramsversion}`,
        { replace: true }
      );
      setStep(parseInt(params));
    }else if(courseId){
      navigate(
        `/${
          location?.pathname?.split("/")[1]
        }/create_course/${courseId}?tab=${paramsTab}&step=${params}&version=${paramsversion}`,
      );
      setStep(parseInt(params));
    } else {
      navigate(
        `/${
          location?.pathname?.split("/")[1]
        }/create_course?tab=${paramsTab}&step=${params}`,
        {
          replace: true,
        }
      );
      setStep(+params);
    }
  }, [params, step, paramsId, paramsversion, paramsTab, navigate]);


  // useEffect(() => {
  //   if(params && paramsId && paramsversion && paramsTab){
  //     console.log("++++++111111", `/${
  //       location?.pathname?.split("/")[1]
  //     }/create_course?tab=${paramsTab}&step=${parseInt(
  //       params
  //     )}&id=${paramsId}&version=${paramsversion}`);
  //     navigate(
  //       `/${
  //         location?.pathname?.split("/")[1]
  //       }/create_course?tab=${paramsTab}&step=${parseInt(
  //         params
  //       )}&id=${paramsId}&version=${paramsversion}`
  //     );
  //   } else if(paramsId && paramsversion && paramsTab){
  //     console.log("++++++22222", `/${
  //       location?.pathname?.split("/")[1]
  //     }/create_course?tab=${paramsTab}id=${paramsId}&version=${paramsversion}`);
  //     navigate(
  //       `/${
  //         location?.pathname?.split("/")[1]
  //       }/create_course?tab=${paramsTab}id=${paramsId}&version=${paramsversion}`,
  //       { replace: true }
  //     );
  //   } else if(!paramsId && !paramsversion){
  //     console.log("++++++33333", `/${
  //       location?.pathname?.split("/")[1]
  //     }/create_course?tab=${paramsTab}&step=${params}`);
  //     navigate(
  //       `/${
  //         location?.pathname?.split("/")[1]
  //       }/create_course?tab=${paramsTab}&step=${params}`,
  //       {
  //         replace: true,
  //       }
  //     );
  //   }
  // }, [params, paramsId, paramsversion, paramsTab])


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
