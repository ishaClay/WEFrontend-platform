import { Button } from "@/components/ui/button";
import { CirclePlus, Loader2 } from "lucide-react";
import AssecessmentModuleSection from "./AssecessmentModuleSection";
import AssecessmentTypeOne from "./AssecessmentType/AssecessmentTypeOne/AssecessmentTypeOne";
import AssecessmentTypeTwo from "./AssecessmentType/AssecessmentTypeTwo/AssecessmentTypeTwo";
import { Fragment, useState } from "react";
import Modal from "@/components/comman/Modal";
import AssessmentModal from "../courseCreation/courseView/AssessmentModal";
import { useAppSelector } from "@/hooks/use-redux";
import { RootState } from "@/redux/store";
import AssecessmentFreeText from "./AssecessmentType/AssecessmentFreeText/AssecessmentFreeText";
import AssecessmentTrueFalse from "./AssecessmentType/AssecessmentTrueFalse/AssecessmentTrueFalse";
import { useMutation } from "@tanstack/react-query";
import { createAssessment, createAssessmentQuestion } from "@/services/apiServices/assessment";
import { ResponseError } from "@/types/Errors";
import { useToast } from "@/components/ui/use-toast";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AssecessmentCreation, QuestionCreation } from "@/types/assecessment";

export const intialSectionCreation: QuestionCreation = {
  question: "",
  point: 0,
  options: [{
    option: ""
  }],
  assessmentType: "",
  answer: [""]
};

export const intialModuleCreation: AssecessmentCreation = {
  section: "",
  assessmentTitle: "",
  percentage: "",
  timeBound: "no",
  duration: "",
  question: [intialSectionCreation],
};

const AssecessmentPage = () => {
  const { toast } = useToast()
  const assecessmentQuestion = useAppSelector((state: RootState) => state.assessment);
  const [isOpenAssessmentModal, setIsOpenAssessmentModal] = useState(false);
  const [createAssecessment, setCreateAssecessment] = useState<null | any>(null);
  // const schema = z.object({
  //   section: z.string({ required_error: "Section is required" }).min(1, "Section is required"),
  //   assessmentTitle: z.string({ required_error: "Assessment Title is required" }).min(1, "Assessment Title is required"),
  //   percentage: z.string({ required_error: "Percentage is required"}).min(1, "Percentage is required"),
  //   timeBound: z.enum(["yes", "no"], { required_error: "Time Bound is required" }),
  //   duration: z.string().optional(),
  //   questions: z.array(
  //     z.object({
  //       question: z.string({ required_error: "Question is required" }).min(1, "Question is required"),
  //       point: z.string({ required_error: "Point is required" }).min(1, "Point is required"),
  //       option: z.array(z.string({ required_error: "Option is required" })).min(1, "Option is required"),
  //       assessmentType: z.string({ required_error: "Assessment Type is required" }).min(1, "Assessment Type is required"),
  //       answer: z.array(z.string({ required_error: "Answer is required" })).min(1, "Answer is required"),
  //     })
  //   ),
  // }).refine(
  //   (data) => {
  //     if (data.timeBound === "yes") {
  //       return data.duration !== undefined && data.duration !== "";
  //     }
  //     return true;
  //   },
  //   {
  //     message: "Duration is required",
  //     path: ["duration"],
  //   }
  // );

  const schema = z.object({
    section: z.string({ required_error: "Section is required" }).min(1, "Section is required"),
    assessmentTitle: z.string({ required_error: "Assessment Title is required" }).min(1, "Assessment Title is required"),
    percentage: z.string({ required_error: "Percentage is required" }).min(1, "Percentage is required"),
    timeBound: z.enum(["yes", "no"], { required_error: "Time Bound is required" }),
    duration: z.string().optional(),
    questions: z.array(
      z.object({
        question: z.string({ required_error: "Question is required" }).min(1, "Question is required"),
        point: z.string({ required_error: "Point is required" }).min(1, "Point is required"),
        // option: z.array(z.string({ required_error: "Option is required" })).min(1, "Option is required"),
        options: z.array(
          z.object({
            option: z.string({ required_error: "Option is required" }).min(1, "Option is required"),
          })
        ),
        assessmentType: z.enum(["MultipleChoiceQuestion", "SingleChoiceQuestion"], { required_error: "Assessment Type is required" }).optional(),
        answer: z.union([
          z.array(z.string({ required_error: "Answer is required" })).min(3, "At least 3 answers are required for MultipleChoiceQuestion"),
          z.string().min(1, "Answer is required for SingleChoiceQuestion")
        ])
      })
    ),
  }).refine(
    (data) => {
      if (data.timeBound === "yes") {
        return data.duration !== undefined && data.duration.trim().length > 0;
      }
      return true;
    },
    {
      message: "Duration is required when Time Bound is 'yes'",
      path: ["duration"],
    }
  ).superRefine((data, ctx) => {
    data.questions.forEach((question, index) => {
      if (question.assessmentType === "MultipleChoiceQuestion") {
        if (!Array.isArray(question.answer) || question.answer.length < 3) {
          ctx.addIssue({
            path: [`questions.${index}.answer`],
            message: "At least 3 answers are required for MultipleChoiceQuestion",
            code: z.ZodIssueCode.custom,
          });
        }
      } else if (question.assessmentType === "SingleChoiceQuestion") {
        if (!Array.isArray(question.answer) || question.answer.length !== 1) {
          ctx.addIssue({
            path: [`questions.${index}.answer`],
            message: "Exactly 1 answer is required for SingleChoiceQuestion",
            code: z.ZodIssueCode.custom,
          });
        }
      }
    });
  });


  type ValidationSchema = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<ValidationSchema>({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: {
      section: "",
      assessmentTitle: "",
      percentage: "",
      timeBound: "no",
      duration: "",
      questions: []
    }
  });

  const {
    fields: assecessmentQuestionFields,
    append: appendSection,
    remove: removeSection,
  } = useFieldArray({
    control,
    name: `questions`,
  });

  console.log('assecessmentQuestionFields', assecessmentQuestionFields);
  

  const { mutate: createAssessmentQuestionFun, isPending: assessmentQuestionPending } = useMutation({
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
      const assecessmentQue = assecessmentQuestion?.questionOption?.map((item: any) => {
        return {
          ...item,
          assessmentId: data?.data?.id
        }
      })
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

  console.log("errors+++", errors);
  const handleAssecessmentSave = () => {

    return
    createAssessmentFun(createAssecessment);
    console.log("createAssecessment", createAssecessment, assecessmentQuestion?.questionOption);
  }

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
        <form onSubmit={handleSubmit(handleAssecessmentSave)}>
          <AssecessmentModuleSection
            createAssecessment={createAssecessment}
            setCreateAssecessment={setCreateAssecessment}
            errors={errors}
            register={register}
            setValue={setValue}
            watch={watch}
          />

          {assecessmentQuestion?.selectedQuestionType?.map((type: string, index: number) => (
            <Fragment key={index}>
              {type === "MultipleChoiceQuestion" && (
                <AssecessmentTypeTwo
                  i={index}
                  type={type}
                  errors={errors}
                  register={register}
                  setValue={setValue}
                  watch={watch}
                />
              )}
              {type === "SingleChoiceQuestion" && (
                <AssecessmentTypeOne i={index} type={type} />
              )}
              {type === "FreeTextResponse" && (
                <AssecessmentFreeText i={index} type={type} />
              )}
              {type === "TrueOrFalse" && (
                <AssecessmentTrueFalse i={index} type={type} />
              )}
            </Fragment>
          ))}

          <div className="text-right">
            <Button
              type="submit"
              disabled={isPending || assessmentQuestionPending}
              className="outline-none text-base font-inter text-white bg-[#58BA66] py-6 px-8">
              {isPending || assessmentQuestionPending && <Loader2 className="h-4 w-4 animate-spin" />} Save Assessment
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
