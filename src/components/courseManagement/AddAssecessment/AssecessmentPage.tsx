/* eslint-disable @typescript-eslint/ban-ts-comment */
import Loader from "@/components/comman/Loader";
import Modal from "@/components/comman/Modal";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { RootState } from "@/redux/store";
import {
  createAssessmentQuestion,
  getAssessmentById,
  updateAssessment,
} from "@/services/apiServices/assessment";
import {
  AssecessmentCreation,
  AssessmentById,
  QuestionCreation,
} from "@/types/assecessment";
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
import {
  resetAssessment,
  setAssessment,
  setQuestionType,
} from "@/redux/reducer/AssessmentReducer";

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

export const intialModuleCreation: AssecessmentCreation = {
  section: "",
  title: "",
  percentage: "",
  timeBound: "no",
  duration: "",
  question: [intialSectionCreation],
};

type Validatable = () => boolean;

const AssecessmentPage = () => {
  const { toast } = useToast();
  const { assId } = useParams();
  const dispatch = useAppDispatch();

  const assecessmentQuestion = useAppSelector(
    (state: RootState) => state.assessment
  );
  const [isOpenAssessmentModal, setIsOpenAssessmentModal] = useState(false);
  const [createAssecessment, setCreateAssecessment] = useState<null | any>({
    moduleSection: "",
    title: "",
    passingPercentage: "",
    timeBound: 0,
    timeDuration: "0",
  });

  console.log("createAssecessment", createAssecessment);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { data, isLoading } = useQuery<AssessmentById>({
    queryKey: [QUERY_KEYS.getAssesmentById],
    queryFn: () => getAssessmentById(assId ? assId : ""),
    enabled: !!assId,
  });

  const AssessmentTypeReverseMap: {
    [key: string]: string;
  } = Object.fromEntries(
    Object.entries(AssessmentType).map(([key, value]) => [value, key])
  );

  useEffect(() => {
    if (data?.data) {
      setCreateAssecessment({
        moduleSection: data?.data?.moduleSection?.title,
        title: data?.data?.title,
        passingPercentage: data?.data?.passingPercentage,
        timeBound: +data?.data?.timeBound,
        timeDuration: data?.data?.timeDuration,
      });
    }

    const assessmentTypes = data?.data?.AssessmentQuestion?.map(
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
        data?.data?.AssessmentQuestion?.map((question) => ({
          ...question,
          assessmentType: AssessmentTypeReverseMap[question.assessmentType],
        }));

      if (transformedAssessmentQuestions) {
        dispatch(setAssessment(transformedAssessmentQuestions));
      }
    }
  }, [data?.data]);

  console.log(data, "data");

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
      const courseId = searchParams.get("courseId");
      const id = searchParams.get("id");
      const version = searchParams.get("version");
      const tab = searchParams.get("tab");
      navigate(
        `/trainer/create_course/${courseId ? courseId : id}?tab=${
          tab || 2
        }&version=${version}`
      );
    },
    onError: (error: ResponseError) => {
      toast({
        title: "Error",
        description: error?.data?.message || "Internal server error",
        variant: "destructive",
      });
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
            assessmentId: assId as number,
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

    // Validate moduleSection
    if (!createAssecessment?.moduleSection) {
      newErrors.moduleSection = "moduleSection is required";
      valid = false;
    }

    // Validate title
    if (!createAssecessment?.title) {
      newErrors.title = "title is required";
      valid = false;
    }

    // Validate passingPercentage
    if (!createAssecessment?.passingPercentage) {
      newErrors.passingPercentage = "passingPercentage is required";
      valid = false;
    }

    // Validate timeDuration
    if (!createAssecessment?.timeDuration) {
      newErrors.timeDuration = "timeDuration is required";
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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validateAll() && validateAssecessmentModule()) {
      updateAssessmentFun({ data: createAssecessment, id: assId || "" });
    }
    return;
  };

  console.log("searchParams", searchParams.get("tab"));

  const handleBack = () => {
    const courseId = searchParams.get("courseId");
    const id = searchParams.get("id");
    const version = searchParams.get("version");
    const tab = searchParams.get("tab");
    dispatch(resetAssessment());
    navigate(
      `/trainer/create_course/${courseId ? courseId : id}?tab=${
        tab || 2
      }&version=${version}`
    );
  };

  // /trainer/create_course/28?tab=2&version=26

  return (
    <div className="bg-white rounded-lg">
      <div className="flex justify-between items-center py-3 px-5 border-b border-[#D9D9D9]">
        <div>
          <h3 className="text-[16px] font-[700] font-nunito">Add Assessment</h3>
          <p className="text-[#606060] text-[15px]">
            Create an assessment to test much your trainees have learnt
          </p>
        </div>
        <div>
          <Button
            className="bg-transparent hover:bg-transparent text-black font-semibold text-[16px]"
            onClick={handleBack}
          >
            <IoIosArrowRoundBack size={26} />
            Back
          </Button>
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
              setErrors={setErrors}
            />

            {assecessmentQuestion?.selectedQuestionType?.map(
              (type: string, index: number) => (
                <Fragment key={index}>
                  {type === "MultipleChoiceQuestion" && (
                    <AssecessmentTypeTwo
                      i={index}
                      type={type}
                      ref={(el: any) =>
                        (validationRefs.current[index] = el?.validate)
                      }
                    />
                  )}
                  {type === "SingleChoiceQuestion" && (
                    <AssecessmentTypeOne
                      i={index}
                      type={type}
                      ref={(el: any) =>
                        (validationRefs.current[index] = el?.validate)
                      }
                    />
                  )}
                  {type === "FreeTextResponse" && (
                    <AssecessmentFreeText
                      i={index}
                      type={type}
                      ref={(el: any) =>
                        (validationRefs.current[index] = el?.validate)
                      }
                    />
                  )}
                  {type === "TrueOrFalse" && (
                    <AssecessmentTrueFalse
                      i={index}
                      type={type}
                      ref={(el: any) =>
                        (validationRefs.current[index] = el?.validate)
                      }
                    />
                  )}
                </Fragment>
              )
            )}

            <div className="text-right">
              <Button
                type="submit"
                disabled={isPending || assessmentQuestionPending}
                className="outline-none text-base font-inter text-white bg-[#58BA66] py-6 px-8"
                isLoading={isPending || assessmentQuestionPending}
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
