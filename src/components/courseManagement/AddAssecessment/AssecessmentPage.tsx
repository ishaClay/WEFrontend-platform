/* eslint-disable @typescript-eslint/ban-ts-comment */
import Loader from "@/components/comman/Loader";
import Modal from "@/components/comman/Modal";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import {
  resetAssessment,
  setAssessment,
  setQuestionType,
} from "@/redux/reducer/AssessmentReducer";
import { RootState } from "@/redux/store";
import {
  createAssessment,
  createAssessmentQuestion,
  getAssessmentById,
  getModuleSection,
  updateAssessment,
} from "@/services/apiServices/assessment";
import { QuestionCreation } from "@/types/assecessment";
import { ResponseError } from "@/types/Errors";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CirclePlus } from "lucide-react";
import { Fragment, useEffect, useRef, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import AssessmentModal from "../courseCreation/courseView/AssessmentModal";
import AssecessmentModuleSection from "./AssecessmentModuleSection";
import AssecessmentFreeText from "./AssecessmentType/AssecessmentFreeText/AssecessmentFreeText";
import AssecessmentTrueFalse from "./AssecessmentType/AssecessmentTrueFalse/AssecessmentTrueFalse";
import AssecessmentTypeOne from "./AssecessmentType/AssecessmentTypeOne/AssecessmentTypeOne";
import AssecessmentTypeTwo from "./AssecessmentType/AssecessmentTypeTwo/AssecessmentTypeTwo";

enum AssessmentType {
  SingleChoiceQuestion = "Single Choice Question",
  FreeTextResponse = "Free Text Response",
  TrueOrFalse = "True Or False",
  MultipleChoiceQuestion = "Multiple Choice Question",
}

export const intialSectionCreation: QuestionCreation = {
  question: "",
  point: 0,
  options: [
    {
      option: "",
    },
  ],
  assessmentType: "",
  answer: [""],
};

type Validatable = () => boolean;

const initialState = {
  moduleSection: "",
  title: "",
  passingPercentage: "",
  timeBound: 0,
  timeDuration: {
    hours: 0,
    minutes: 0,
    seconds: 0,
  },
};

const AssecessmentPage = () => {
  const { toast } = useToast();
  const { assId } = useParams();
  const dispatch = useAppDispatch();
  const pathName = window.location.pathname.split("/")[1];  

  const assecessmentQuestion = useAppSelector(
    (state: RootState) => state.assessment
  );
  const [isOpenAssessmentModal, setIsOpenAssessmentModal] = useState(false);
  const [createAssecessment, setCreateAssecessment] = useState<{
    title: string;
    passingPercentage: string;
    timeBound: number;
    timeDuration: {
      hours: number;
      minutes: number;
      seconds: number;
    };
  }>(initialState);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("courseId");
  const id = searchParams.get("id");
  const version = searchParams.get("version");
  const tab = searchParams.get("tab");

  const { data: getAssessmentByIdData, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.getAssesmentById],
    queryFn: () => getAssessmentById(assId ? assId : ""),
    enabled: !!assId,
  });

  console.log("getAssessmentByIdData", getAssessmentByIdData?.data);
  

  const { data: moduleSection } = useQuery({
    queryKey: [QUERY_KEYS.fetchModuleSection],
    queryFn: () => getModuleSection(searchParams.get("moduleId") as string),
  });

  const assessmentData = moduleSection?.data?.data?.assessment;
  useEffect(() => {
    if (getAssessmentByIdData?.data) {
      setCreateAssecessment({
        title: getAssessmentByIdData?.data?.title,
        passingPercentage: getAssessmentByIdData?.data?.passingPercentage,
        timeBound: +getAssessmentByIdData?.data?.timeBound,
        timeDuration: {
          hours: getAssessmentByIdData?.data?.timeDuration?.hours,
          minutes: getAssessmentByIdData?.data?.timeDuration?.minutes,
          seconds: getAssessmentByIdData?.data?.timeDuration?.seconds,
        },
      });
    }
  }, [assessmentData]);  

  useEffect(() => {
    if(assessmentData?.id){
      assessmentData?.[0]?.AssessmentQuestion?.map((item:any) => {
        dispatch(setQuestionType(item?.assessmentType));
      })
    }
  }, [assessmentData])  

  const AssessmentTypeReverseMap: {
    [key: string]: string;
  } = Object.fromEntries(
    Object.entries(AssessmentType).map(([key, value]) => [value, key])
  );

  useEffect(() => {
    if (getAssessmentByIdData?.data?.AssessmentQuestion?.length) {
      const assessmentTypes = getAssessmentByIdData?.data?.AssessmentQuestion?.map(
        (i) => i?.assessmentType
      );
      const transformedAssessmentTypes = assessmentTypes?.map(
        (type) => AssessmentTypeReverseMap[type]
      );
      if (transformedAssessmentTypes) {
        transformedAssessmentTypes.forEach((type) => {
          if (type) {
            dispatch(setQuestionType(type));
          }
        });

        const transformedAssessmentQuestions =
          getAssessmentByIdData?.data?.AssessmentQuestion?.map((question) => ({
            ...question,
            assessmentType: AssessmentTypeReverseMap[question.assessmentType],
          }));

        if (transformedAssessmentQuestions) {
          dispatch(setAssessment(transformedAssessmentQuestions));
        }
      }
    }
  }, [getAssessmentByIdData, dispatch]);

  const {
    mutate: createAssessmentQuestionFun,
    isPending: assessmentQuestionPending,
  } = useMutation({
    mutationFn: createAssessmentQuestion,
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: data?.data?.message,
        variant: "success",
      });
      if(courseId){
        navigate(
          `/${pathName}/create_course/${courseId ? courseId : id}?tab=${
            tab || 2
          }&version=${version}`
        );
      } else {
        navigate(`/${pathName}/create_course?tab=${tab || 2}&id=${id}&version=${version}`);
      }
      dispatch(resetAssessment());
    },
    onError: (error: ResponseError) => {
      toast({
        title: "Error",
        description: error?.data?.message || "Internal server error",
        variant: "destructive",
      });
    },
  });

  const { mutate: createAssessmentFun, isPending: createAssessmentPending } =
    useMutation({
      mutationFn: createAssessment,
      onSuccess: (res) => {
        const assecessmentQue = assecessmentQuestion?.questionOption?.map(
          (item: any) => {
            return {
              ...item,
              // @ts-ignore
              assessment: res?.data?.data?.id,
              // @ts-ignore
              assessmentType: AssessmentType[item.assessmentType],
            };
          }
        );
        if(courseId && +courseId){
          navigate(
            `/${pathName}/create_course/${courseId ? courseId : id}?tab=${
              tab || 2
            }&version=${version}`
          );
        } else {
          navigate(`/${pathName}/create_course?tab=${tab || 2}&id=${id}&version=${version}`);
        }
        createAssessmentQuestionFun(assecessmentQue);
      },
    });

  const { mutate: updateAssessmentFun, isPending } = useMutation({
    mutationFn: updateAssessment,
    onSuccess: () => {
      const assecessmentQue = assecessmentQuestion?.questionOption?.map(
        (item: any) => {
          return {
            ...item,
            // @ts-ignore
            id: item?.id as number,
            // @ts-ignore
            assessmentType: AssessmentType[item.assessmentType],
          };
        }
      );
      createAssessmentQuestionFun(assecessmentQue);
    },
    onError: (error: ResponseError) => {
      toast({
        title: "Error",
        description: error?.data?.message || "Internal server error",
        variant: "destructive",
      });
    },
  });

  const [errors, setErrors] = useState({
    moduleSection: "",
    title: "",
    passingPercentage: "",
    timeBound: "",
    timeDuration: "",
  });

  const validateAssecessmentModule = () => {
    let valid = true;
    const newErrors = {
      moduleSection: "",
      title: "",
      passingPercentage: "",
      timeBound: "",
      timeDuration: "",
    };

    // Validate title
    if (!createAssecessment?.title) {
      newErrors.title = "Assessment Title is required";
      valid = false;
    }
    if (createAssecessment?.title?.length > 250) {
      newErrors.title = "You can not write Assessment Title more than 250 characters.";
      valid = false;
    }

    // Validate passingPercentage
    if (!createAssecessment?.passingPercentage) {
      newErrors.passingPercentage = "Passing Percentage is required";
      valid = false;
    }
    const passingPercentageRegex = /^[0-9]+$/;
    if (!passingPercentageRegex.test(createAssecessment?.passingPercentage)) {
      newErrors.passingPercentage = "Passing Percentage is required and must be a number";
      valid = false;
    }

    // Validate timeDuration
    if (
      !createAssecessment?.timeDuration?.hours &&
      !createAssecessment?.timeDuration?.minutes &&
      !createAssecessment?.timeDuration?.seconds &&
      !!createAssecessment?.timeBound
    ) {
      newErrors.timeDuration = "Time Duration is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const validationRefs = useRef<Array<Validatable | null>>([]);

  const validateAll = () => {
    let isValid = true;
    validationRefs.current.forEach((validate) => {
      if (validate && !validate()) {
        isValid = false;
      }
    });
    return isValid;
  };

  useEffect(() => {
    validateAssecessmentModule();
  }, [createAssecessment]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validateAll() && validateAssecessmentModule()) {
      const payload = {
        ...createAssecessment, timeDuration: {
          hours: +createAssecessment?.timeDuration?.hours || 0,
          minutes: +createAssecessment?.timeDuration?.minutes || 0,
          seconds: +createAssecessment?.timeDuration?.seconds || 0
        }
      }
      if(assId && +assId){
        updateAssessmentFun({
          data: {...payload, moduleSection: searchParams.get("moduleId") || ""},
          id: assId,
        })
      } else{
        createAssessmentFun({
          ...payload,
          module: searchParams.get("moduleId")
            ? searchParams.get("moduleId")
            : "",
        });
      }
    }
    return;
  };

  const handleBack = () => {
    const courseId = searchParams.get("courseId");
    const id = searchParams.get("id");
    const version = searchParams.get("version");
    const tab = searchParams.get("tab");
    dispatch(resetAssessment());
    if(courseId && +courseId && courseId !== null){
      navigate(
        `/${pathName}/create_course/${
          courseId ? courseId : id
        }?tab=${tab}&version=${version}`
      );
    } else {
      navigate(
        `/${pathName}/create_course?tab=${tab}&id=${id}&version=${version}`
      );
    }
  };

  return (
    <div className="bg-white rounded-lg">
      <div className="flex justify-between items-center py-3 px-5 border-b border-[#D9D9D9]">
        <div>
          <h3 className="text-[16px] font-[700] font-nunito">Add Assessment</h3>
          <p className="text-[#606060] text-[15px]">
            Create an assessment to test much your trainees have learnt
          </p>
        </div>
        <div className="flex items-center gap-5">
          <div
            className="bg-transparent inline-flex items-center gap-2 cursor-pointer hover:bg-transparent text-black font-semibold text-[16px]"
            onClick={handleBack}
          >
            <IoIosArrowRoundBack size={26} />
            Back
          </div>
          <Button
            className="bg-[#42A7C3] px-4 py-2 me-4 font-inter text-xs"
            onClick={() => setIsOpenAssessmentModal(true)}
          >
            <CirclePlus width={20} className="me-2" /> Add Question
          </Button>
        </div>
      </div>
      <div className="p-5">
        {isLoading ? (
          <Loader />
        ) : (
          <form onSubmit={handleSubmit}>
            <AssecessmentModuleSection
              createAssecessment={createAssecessment}
              setCreateAssecessment={setCreateAssecessment}
              errors={errors}
              data={getAssessmentByIdData?.data}
              setErrors={setErrors}
              moduleSectionById={moduleSection?.data?.data}
            />

            {(getAssessmentByIdData?.data?.AssessmentQuestion || assecessmentQuestion?.selectedQuestionType)?.map(
              (type: string | any, index: number) => {
                return <Fragment key={index}>
                {(type?.assessmentType === "Multiple Choice Question" || type === "Multiple Choice") && (
                  <AssecessmentTypeTwo
                    i={index}
                    type={type}
                    ref={(el: any) =>
                      (validationRefs.current[index] = el?.validate)
                    }
                    assecessmentQuestion={type}
                  />
                )}
                {((type?.assessmentType === "Single Choice Question" && type?.option?.length > 0) || type === "MCQ") && (
                  <AssecessmentTypeOne
                    i={index}
                    type={type}
                    ref={(el: any) =>
                      (validationRefs.current[index] = el?.validate)
                    }
                    assecessmentQuestion={type}
                  />
                )} 
                {(type?.assessmentType === "Free Text Response" ||type === "Free Text Response") && (
                  <AssecessmentFreeText
                    i={index}
                    type={type}
                    ref={(el: any) =>
                      (validationRefs.current[index] = el?.validate)
                    }
                    assecessmentQuestion={type}
                  />
                )}
                {((type?.assessmentType === "Single Choice Question" && type?.option?.length === 0) || type === "True & False") && (
                  <AssecessmentTrueFalse
                    i={index}
                    type={type}
                    ref={(el: any) =>
                      (validationRefs.current[index] = el?.validate)
                    }
                    assecessmentQuestion={type}
                  />
                )}
              </Fragment>
              }
            )}

            <div className="text-right">
              <Button
                type="submit"
                disabled={createAssessmentPending || assessmentQuestionPending || isPending}
                className="outline-none text-base font-inter text-white bg-[#58BA66] py-6 px-8"
                isLoading={createAssessmentPending || assessmentQuestionPending || isPending}
              >
                Save Assessment
              </Button>
            </div>
          </form>
        )}
      </div>

      <Modal
        open={isOpenAssessmentModal}
        onClose={() => setIsOpenAssessmentModal(false)}
        className="max-w-3xl p-0"
      >
        <AssessmentModal setIsOpenAssessmentModal={setIsOpenAssessmentModal} />
      </Modal>
    </div>
  );
};

export default AssecessmentPage;
