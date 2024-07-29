import { Button } from "@/components/ui/button";
import { CirclePlus, Loader2 } from "lucide-react";
import AssecessmentModuleSection from "./AssecessmentModuleSection";
import AssecessmentTypeOne from "./AssecessmentType/AssecessmentTypeOne/AssecessmentTypeOne";
import AssecessmentTypeTwo from "./AssecessmentType/AssecessmentTypeTwo/AssecessmentTypeTwo";
import { Fragment, useRef, useState } from "react";
import Modal from "@/components/comman/Modal";
import AssessmentModal from "../courseCreation/courseView/AssessmentModal";
import { useAppSelector } from "@/hooks/use-redux";
import { RootState } from "@/redux/store";
import AssecessmentFreeText from "./AssecessmentType/AssecessmentFreeText/AssecessmentFreeText";
import AssecessmentTrueFalse from "./AssecessmentType/AssecessmentTrueFalse/AssecessmentTrueFalse";
import { useMutation } from "@tanstack/react-query";
import {
  createAssessment,
  createAssessmentQuestion,
} from "@/services/apiServices/assessment";
import { ResponseError } from "@/types/Errors";
import { useToast } from "@/components/ui/use-toast";
import { AssecessmentCreation, QuestionCreation } from "@/types/assecessment";

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
    },
    onError: (error: ResponseError) => {
      toast({
        title: "Error",
        description: error?.data?.message || "Internal server error",
        variant: "destructive",
      });
    },
  });

  const { mutate: createAssessmentFun, isPending } = useMutation({
    mutationFn: createAssessment,
    onSuccess: (data) => {
      const assecessmentQue = assecessmentQuestion?.questionOption?.map(
        (item: any) => {
          return {
            ...item,
            assessmentId: data?.data?.id,
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
      createAssessmentFun(createAssecessment);
    }
    return;
    console.log(
      "createAssecessment",
      createAssecessment,
      assecessmentQuestion?.questionOption
    );
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
        <Button
          className="bg-[#42A7C3] px-4 py-2 me-4 font-inter text-xs"
          onClick={() => setIsOpenAssessmentModal(true)}
        >
          <CirclePlus width={20} className="me-2" /> Add Question
        </Button>
      </div>
      <div className="p-5">
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
            >
              {isPending ||
                (assessmentQuestionPending && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ))}
              Save Assessment
            </Button>
          </div>
        </form>
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
