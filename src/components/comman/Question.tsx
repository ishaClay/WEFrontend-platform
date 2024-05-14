import { setAnswer } from "@/redux/reducer/QuestionReducer";
import { Option, QuestionType } from "@/types/Question";
import { useDispatch, useSelector } from "react-redux";
import Suggestion from "/assets/img/Suggestion.png";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addAnswer, removeAnswer } from "@/services/apiServices/question";
import { ErrorType } from "@/types/Errors";
import { useToast } from "../ui/use-toast";
import { QUERY_KEYS } from "@/lib/constants";
import { Answer } from "@/types/Answer";

const Question = () => {
	const dispatch = useDispatch();

	const question = useSelector((state: any) => state.question);

	const { activePillar } = useSelector((state: any) => state.question);

	const userId = useSelector((state: any) => state.user.UserId);

	const queryClient = useQueryClient();

	const { toast } = useToast();


	const { mutate: addanswer } = useMutation({
		mutationFn: (question: Answer) => addAnswer(question),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.getQuestionAnswer],
			});
		},
		onError: (error: ErrorType) => {
			toast({
				variant: "destructive",
				title: error.data.message,
			});
		},
	});

	const { mutate: removeanswer } = useMutation({
		mutationFn: (question: any) => removeAnswer(question),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.getQuestionAnswer] });
		},
		onError: (error: ErrorType) => {
			toast({
				variant: "destructive",
				title: error.data.message,
			});
		},
	});

	const handleChange = (questionId: any, selectedOptions: any) => {

		if (selectedOptions.checked === true) {

			removeanswer({ userId: userId, questionId: questionId });
			selectedOptions.checked = false;

		} else {
			addanswer({ userId: userId, questionId: questionId, selectedOptions: [selectedOptions] })
		}
	};


	return (
		<>
			{Array.isArray(question[activePillar]) &&
				question[activePillar]?.map((i: QuestionType, index: number) => {
					return (
						<div
							className="relative bg-white min-h-[321px] pb-3 rounded-[15.34px] shadow-[0px_4px_4px_0px_#00000040] w-[773px] max-w-full"
							key={index}>
							<div className="py-[17px] bg-[#EEF9FD] flex items-center px-9 mt-[72px]">
								<h2 className="text-[#002A3A] font-bold leading-[17.77px]">
									{index + 1}. {i.title}
								</h2>
							</div>
							<div className="mt-[21px] flex flex-col gap-[17px] px-10">
								{i.options.map((option: Option, oIndex: number, arr) => {
									return (
										<div key={oIndex}>
											<div
												className="inline-flex items-center cursor-pointer"
												onClick={() => {
													handleChange(i.id, option)
													dispatch(
														setAnswer({
															qId: index,
															oId: oIndex,
															arr: arr,
														})
													);
												}}>
												<input
													type="radio"
													className=" cursor-pointer"
													checked={option?.checked ? true : false}
												/>
												<span className="ml-[9px]">{option.name}</span>
											</div>
										</div>
									);
								})}
							</div>

							<div className="absolute flex items-center justify-center top-0 left-0 bg-teal text-white w-[207.83px] h-[52.15px] rounded-br-[62.27px] font-bold text-[18px] leading-[21.97px]">
								{activePillar} {index + 1}/{question[activePillar]?.length}
							</div>
							{question.hint && (
								<img
									src={Suggestion}
									alt="Suggestion"
									className="absolute top-5 right-12 w-8 h-8 cursor-auto"
								/>
							)}
						</div>
					);
				})}


		</>
	);
};

export default Question;
