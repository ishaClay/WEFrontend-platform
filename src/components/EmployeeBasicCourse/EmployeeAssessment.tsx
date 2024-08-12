import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormError from "../comman/FormError";
import { Fragment } from "react/jsx-runtime";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants";
import { useNavigate, useParams } from "react-router-dom";
import { createEvalute, fetchAssesmentQuestion, fetchAssesmentSingleQuestion } from "@/services/apiServices/assessment";
import { ErrorType } from "@/types/Errors";
import { useToast } from "../ui/use-toast";
import { Loader2 } from "lucide-react";

const schema = z.object({
    assesdmentAnswer: z.array(
        z.object({
            answer: z.union([
                z.string().min(1, "Please select an answer"), // For single choice questions
                z.array(z.string()).nonempty("Please select an answer") // For multiple choice questions
            ])
        })
    )
});

type ValidationSchema = z.infer<typeof schema>;
const EmployeeAssessment = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const { assessmentId } = useParams();
    const queryClient = useQueryClient();
    const userData = JSON.parse(localStorage.getItem("user") as string);
    const search = window.location.search;
    const moduleId = new URLSearchParams(search).get("moduleId");

    const {data: getAssessmentQuestion, isPending: getAssessmentQuestionPending} = useQuery({
        queryKey: [QUERY_KEYS.getAssessmentQuestion, assessmentId],
        queryFn: () => fetchAssesmentQuestion(assessmentId as string),
        enabled: !!assessmentId
    })

    const {data: getAssessmentSingleQuestion, isPending: getAssessmentSingleQuestionPending} = useQuery({
        queryKey: [QUERY_KEYS.getAssessmentSingleQuestion, assessmentId],
        queryFn: () => fetchAssesmentSingleQuestion(assessmentId as string),
        enabled: !!assessmentId
    })

    console.log("getAssessmentSingleQuestion", getAssessmentSingleQuestion);
    

    const { mutate: createEvaluteFun, isPending } = useMutation({
        mutationFn: createEvalute,
        onSuccess: (data) => {
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.fetchEmployeeSingeCourse],
          });
          navigate(`/employee/employee-basic-course/${assessmentId}`);
          toast({
            variant: "success",
            title: data?.data?.message,
          });
        },
        onError: (error: ErrorType) => {
          toast({
            variant: "destructive",
            title: error?.data?.message,
          });
        },
      });

    const assessmentQuestion = getAssessmentQuestion?.data;
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
    } = useForm<ValidationSchema>({
        resolver: zodResolver(schema),
        mode: "all",
        defaultValues: {
            assesdmentAnswer: assessmentQuestion?.map(() => ({
                answer: [] || ""
            }))
        }
    });

    const handleCheckboxChange = (index: number, option: string) => {
        console.log("index, option", index, option, watch(`assesdmentAnswer.${index}.answer`) as string[]);
        
        const currentAnswers = watch(`assesdmentAnswer.${index}.answer`) as string[] || [];
        const newAnswers: any = currentAnswers?.includes(option)
            ? currentAnswers?.filter(ans => ans !== option)
            : [...currentAnswers, option];

        setValue(`assesdmentAnswer.${index}.answer`, newAnswers);
    };

    const onSubmit = async (data: FieldValues) => {
        console.log("data123456", data);
        const payload = assessmentQuestion?.map((item, i) => {
            return {
                quesId: item?.id,
                emp: userData?.query?.detailsid,
                module: moduleId,
                answer: data?.assesdmentAnswer[i]?.answer
            }
        })
        createEvaluteFun(payload);
    };

    return (
        getAssessmentSingleQuestionPending || getAssessmentQuestionPending ? <span className="flex items-center justify-center py-10"><Loader2 className="w-5 h-5 animate-spin" /></span> : <div className="lg:bg-white bg-transparent rounded-xl border border-[#D9D9D9] overflow-hidden">
            <div className="flex items-center justify-between sm:p-[18px] p-[15px] bg-[#F3F3F3] border-b border-[#D9D9D9]">
                <div>
                    <h4 className="text-[20px] font-[Calibri] text-[#000000] mb-[6px]">
                        <span className="text-[20px] font-[Calibri] text-[#606060] mr-1">
                            Section :
                        </span>
                        {getAssessmentSingleQuestion?.data?.module?.title}
                    </h4>
                    <h5 className="text-[16px] font-[Calibri] text-[#000000] mb-2">
                        <span className="text-[16px] font-[Calibri] text-[#606060] mr-1">
                            Assessment :{" "}
                        </span>
                        {getAssessmentSingleQuestion?.data?.title}
                    </h5>
                    <h5 className="text-[16px] font-[Calibri] text-[#606060]">
                        {assessmentQuestion?.length || 0} 
                        <span className="mr-1 ml-1">Questions | Duration : </span>
                        {getAssessmentSingleQuestion?.data?.timeDuration?.hours} : {" "}
                        {getAssessmentSingleQuestion?.data?.timeDuration?.minutes} : {" "}
                        {getAssessmentSingleQuestion?.data?.timeDuration?.seconds} Hours {" "}
                    </h5>
                </div>
            </div>
            <div className="grid sm:px-8 sm:py-5 p-[20px] bg-white">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        {
                            assessmentQuestion?.map((data, index) => {
                                console.log("watchwatch", watch(`assesdmentAnswer.${index}.answer`));
                                console.log("1232311", data?.assessmentType === "Single Choice Question" ,data?.option ,  data?.option > 0);
                                
                                return <Fragment key={index}>
                                    {(data?.assessmentType === "Single Choice Question" && data?.option?.length > 0) && <div className="mb-10">
                                        <div className="gap-5 flex items-center justify-between mb-[8px]">
                                            <p className="w-[calc(100%_-_102px)]">
                                                {index + 1}{". "}{data?.question}
                                            </p>
                                            <span className="px-[14px] py-[7px] bg-[#EAEBEA] text-[#000000] rounded-full w-[82px]">
                                                {data?.point} Point
                                            </span>
                                        </div>
                                        <RadioGroup
                                            // value={watch(`assesdmentAnswer.${index}.answer`)}
                                            {...register(
                                                `assesdmentAnswer.${index}.answer`
                                            )}
                                            onValueChange={(value) => setValue(`assesdmentAnswer.${index}.answer`, value)}
                                        // value={watch(`assesdmentAnswer.${index}.answer` || "")}
                                        >
                                            {data?.option?.map((option: any) => (
                                                <div key={option} className="flex items-center space-x-2 mb-3">
                                                    <RadioGroupItem
                                                        value={option}
                                                        id={`option-${index}-${option}`}
                                                        className="border-[#9B9B9B] w-5 h-5"
                                                    />
                                                    <Label
                                                        htmlFor={`option-${index}-${option}`}
                                                        className="text-sm font-sans"
                                                    >
                                                        {option}
                                                    </Label>
                                                </div>
                                            ))}
                                        </RadioGroup>
                                        {errors.assesdmentAnswer?.[index]?.answer && (
                                            <FormError
                                                className="font-calibri not-italic"
                                                message={errors.assesdmentAnswer[index].answer.message}
                                            />
                                        )}
                                    </div>}

                                    {(data?.assessmentType === "Free Text Response") && <div className="mb-10">
                                        <div className="gap-5 flex items-center justify-between mb-[8px]">
                                            <p className="w-[calc(100%_-_102px)]">
                                                {index + 1}{". "}{data?.question}
                                            </p>
                                            <span className="px-[14px] py-[7px] bg-[#EAEBEA] text-[#000000] rounded-full w-[82px]">
                                                {data?.point} Point
                                            </span>
                                        </div>
                                        <textarea
                                            placeholder="Keywords1, Keywords2, keywords3"
                                            className="py-4 px-3 w-full border border-[#D9D9D9] placeholder:text-neutral-400 outline-none rounded-md resize-none"
                                            rows={8}
                                            {...register(
                                                `assesdmentAnswer.${index}.answer`
                                            )}
                                        />
                                        {errors.assesdmentAnswer?.[index]?.answer && (
                                            <FormError
                                                className="font-calibri not-italic"
                                                message={errors.assesdmentAnswer[index].answer.message}
                                            />
                                        )}
                                    </div>}

                                    {
                                        (data?.assessmentType === "Single Choice Question" && data?.option?.length === 0) && <div className="mb-10">
                                            <div className="gap-5 flex items-center justify-between mb-[8px]">
                                                <p className="w-[calc(100%_-_102px)]">
                                                    {index + 1}{". "}{data?.question}
                                                </p>
                                                <span className="px-[14px] py-[7px] bg-[#EAEBEA] text-[#000000] rounded-full w-[82px]">
                                                    {data?.point} Point
                                                </span>
                                            </div>
                                            <RadioGroup
                                                {...register(
                                                    `assesdmentAnswer.${index}.answer`
                                                )}
                                                onValueChange={(value) => setValue(`assesdmentAnswer.${index}.answer`, value)}
                                            >
                                                <div className="flex items-center space-x-2 mb-3">
                                                    <RadioGroupItem
                                                        value="yes"
                                                        id={`option-${index}-yes`}
                                                        className="border-[#9B9B9B] w-5 h-5"
                                                        {...register(
                                                            `assesdmentAnswer.${index}.answer`
                                                        )}
                                                    />
                                                    <Label
                                                        htmlFor={`option-${index}-yes`}
                                                        className="text-sm font-sans"
                                                    >
                                                        True
                                                    </Label>
                                                </div>
                                                <div className="flex items-center space-x-2 mb-3">
                                                    <RadioGroupItem
                                                        value="no"
                                                        id={`option-${index}-no`}
                                                        className="border-[#9B9B9B] w-5 h-5"
                                                        {...register(
                                                            `assesdmentAnswer.${index}.answer`
                                                        )}
                                                    />
                                                    <Label
                                                        htmlFor={`option-${index}-no`}
                                                        className="text-sm font-sans"
                                                    >
                                                        False
                                                    </Label>
                                                </div>
                                            </RadioGroup>
                                            {errors.assesdmentAnswer?.[index]?.answer && (
                                                <FormError
                                                    className="font-calibri not-italic"
                                                    message={errors.assesdmentAnswer[index].answer.message}
                                                />
                                            )}
                                        </div>
                                    }

                                    {data?.assessmentType === "Multiple Choice Question" && <div className="mb-10">
                                        <div className="gap-5 flex items-center justify-between mb-[8px]">
                                            <p className="w-[calc(100%_-_102px)]">
                                                {index + 1}{". "}{data?.question}
                                            </p>
                                            <span className="px-[14px] py-[7px] bg-[#EAEBEA] text-[#000000] rounded-full w-[82px]">
                                                {data?.point} Point
                                            </span>
                                        </div>
                                        {data?.option?.map((option: any, i: number) => (
                                            <div key={i} className="flex items-center space-x-2 mb-3">
                                                <Checkbox
                                                    id={`checkbox-${index}-${option}`}
                                                    checked={watch(`assesdmentAnswer.${index}.answer`)?.includes(option)}
                                                    onCheckedChange={() => handleCheckboxChange(index, option)}
                                                    className="border-[#9B9B9B] w-5 h-5"
                                                />
                                                <Label
                                                    htmlFor={`checkbox-${data?.id}-${i}`}
                                                    className="text-sm font-sans"
                                                    {...register(
                                                        `assesdmentAnswer.${index}.answer`
                                                    )}
                                                >
                                                    {option}
                                                </Label>
                                            </div>
                                        ))}
                                        {errors.assesdmentAnswer?.[index]?.answer && (
                                            <FormError
                                                className="font-calibri not-italic"
                                                message={errors.assesdmentAnswer[index].answer.message}
                                            />
                                        )}
                                    </div>}
                                </Fragment>
                            })
                        }
                    </div>
                    <div className="mt-5 text-end">
                        <Button
                            type="submit"
                            className="py-[10px] px-[30px] bg-[#58BA66] text-color rounded-sm"
                            disabled={isPending}
                        >
                            {isPending && <Loader2 className="w-5 h-5 animate-spin" /> } Submit Assessment
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmployeeAssessment;
