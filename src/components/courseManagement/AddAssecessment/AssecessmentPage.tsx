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
  assessmentTitle: "",
  percentage: "",
  timeBound: "no",
  duration: "",
  question: [intialSectionCreation],
};

const AssecessmentPage = () => {
  // const { toast } = useToast();
  // const assecessmentQuestion = useAppSelector(
  //   (state: RootState) => state.assessment
  // );
  // const [isOpenAssessmentModal, setIsOpenAssessmentModal] = useState(false);
  // const [createAssecessment, setCreateAssecessment] = useState<null | any>(
  //   null
  // );
  // // const schema = z.object({
  // //   section: z.string({ required_error: "Section is required" }).min(1, "Section is required"),
  // //   assessmentTitle: z.string({ required_error: "Assessment Title is required" }).min(1, "Assessment Title is required"),
  // //   percentage: z.string({ required_error: "Percentage is required"}).min(1, "Percentage is required"),
  // //   timeBound: z.enum(["yes", "no"], { required_error: "Time Bound is required" }),
  // //   duration: z.string().optional(),
  // //   questions: z.array(
  // //     z.object({
  // //       question: z.string({ required_error: "Question is required" }).min(1, "Question is required"),
  // //       point: z.string({ required_error: "Point is required" }).min(1, "Point is required"),
  // //       option: z.array(z.string({ required_error: "Option is required" })).min(1, "Option is required"),
  // //       assessmentType: z.string({ required_error: "Assessment Type is required" }).min(1, "Assessment Type is required"),
  // //       answer: z.array(z.string({ required_error: "Answer is required" })).min(1, "Answer is required"),
  // //     })
  // //   ),
  // // }).refine(
  // //   (data) => {
  // //     if (data.timeBound === "yes") {
  // //       return data.duration !== undefined && data.duration !== "";
  // //     }
  // //     return true;
  // //   },
  // //   {
  // //     message: "Duration is required",
  // //     path: ["duration"],
  // //   }
  // // );
  // const schema = z
  //   .object({
  //     section: z
  //       .string({ required_error: "Section is required" })
  //       .min(1, "Section is required"),
  //     assessmentTitle: z
  //       .string({ required_error: "Assessment Title is required" })
  //       .min(1, "Assessment Title is required"),
  //     percentage: z
  //       .string({ required_error: "Percentage is required" })
  //       .min(1, "Percentage is required"),
  //     timeBound: z.enum(["yes", "no"], {
  //       required_error: "Time Bound is required",
  //     }),
  //     duration: z.string().optional(),
  //     questions: z.array(
  //       z.object({
  //         question: z
  //           .string({ required_error: "Question is required" })
  //           .min(1, "Question is required"),
  //         point: z
  //           .string({ required_error: "Point is required" })
  //           .min(1, "Point is required"),
  //         // option: z.array(z.string({ required_error: "Option is required" })).min(1, "Option is required"),
  //         options: z.array(
  //           z.object({
  //             option: z
  //               .string({ required_error: "Option is required" })
  //               .min(1, "Option is required"),
  //           })
  //         ),
  //         assessmentType: z
  //           .enum(["MultipleChoiceQuestion", "SingleChoiceQuestion"], {
  //             required_error: "Assessment Type is required",
  //           })
  //           .optional(),
  //         answer: z.union([
  //           z
  //             .array(z.string({ required_error: "Answer is required" }))
  //             .min(
  //               3,
  //               "At least 3 answers are required for MultipleChoiceQuestion"
  //             ),
  //           z.string().min(1, "Answer is required for SingleChoiceQuestion"),
  //         ]),
  //       })
  //     ),
  //   })
  //   .refine(
  //     (data) => {
  //       if (data.timeBound === "yes") {
  //         return data.duration !== undefined && data.duration.trim().length > 0;
  //       }
  //       return true;
  //     },
  //     {
  //       message: "Duration is required when Time Bound is 'yes'",
  //       path: ["duration"],
  //     }
  //   )
  //   .superRefine((data, ctx) => {
  //     data.questions.forEach((question, index) => {
  //       if (question.assessmentType === "MultipleChoiceQuestion") {
  //         if (!Array.isArray(question.answer) || question.answer.length < 3) {
  //           ctx.addIssue({
  //             path: [`questions.${index}.answer`],
  //             message:
  //               "At least 3 answers are required for MultipleChoiceQuestion",
  //             code: z.ZodIssueCode.custom,
  //           });
  //         }
  //       } else if (question.assessmentType === "SingleChoiceQuestion") {
  //         if (!Array.isArray(question.answer) || question.answer.length !== 1) {
  //           ctx.addIssue({
  //             path: [`questions.${index}.answer`],
  //             message: "Exactly 1 answer is required for SingleChoiceQuestion",
  //             code: z.ZodIssueCode.custom,
  //           });
  //         }
  //       }
  //     });
  //   });
  // type ValidationSchema = z.infer<typeof schema>;
  // const {
  //   register,
  //   handleSubmit,
  //   control,
  //   formState: { errors },
  //   watch,
  //   setValue,
  // } = useForm<ValidationSchema>({
  //   resolver: zodResolver(schema),
  //   mode: "all",
  //   defaultValues: {
  //     section: "",
  //     assessmentTitle: "",
  //     percentage: "",
  //     timeBound: "no",
  //     duration: "",
  //     questions: [],
  //   },
  // });
  // const { fields: assecessmentQuestionFields } = useFieldArray({
  //   control,
  //   name: `questions`,
  // });
  // console.log("assecessmentQuestionFields", assecessmentQuestionFields);
  // const {
  //   mutate: createAssessmentQuestionFun,
  //   isPending: assessmentQuestionPending,
  // } = useMutation({
  //   mutationFn: createAssessmentQuestion,
  //   onSuccess: (data) => {
  //     toast({
  //       title: "Success",
  //       description: data?.data?.message,
  //       variant: "success",
  //     });
  //   },
  //   onError: (error: ResponseError) => {
  //     toast({
  //       title: "Error",
  //       description: error?.data?.message || "Internal server error",
  //       variant: "destructive",
  //     });
  //   },
  // });
  // const { mutate: createAssessmentFun, isPending } = useMutation({
  //   mutationFn: createAssessment,
  //   onSuccess: (data) => {
  //     const assecessmentQue = assecessmentQuestion?.questionOption?.map(
  //       (item: any) => {
  //         return {
  //           ...item,
  //           assessmentId: data?.data?.id,
  //         };
  //       }
  //     );
  //     createAssessmentQuestionFun(assecessmentQue);
  //   },
  //   onError: (error: ResponseError) => {
  //     toast({
  //       title: "Error",
  //       description: error?.data?.message || "Internal server error",
  //       variant: "destructive",
  //     });
  //   },
  // });
  // console.log("errors+++", errors);
  // const handleAssecessmentSave = () => {
  //   return;
  // };
  // return;
};

export default AssecessmentPage;
