import { setAnswer } from "@/redux/reducer/QuestionReducer";
import { Option, QuestionType } from "@/types/Question";
import { useDispatch, useSelector } from "react-redux";
import Suggestion from "/assets/img/Suggestion.png";

const Question = () => {
	const dispatch = useDispatch();

	const question = useSelector((state: any) => state.question);
	const { activePillar } = useSelector((state: any) => state.question);

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
								{i.options.map((option: Option, oIndex: number) => {
									return (
										<div>
											<div
												className="inline-flex items-center cursor-pointer"
												onClick={() => {
													dispatch(
														setAnswer({
															qId: index,
															oId: oIndex,
															isChecked: !option?.checked,
														})
													);
												}}>
												<input
													type="radio"
													className=" cursor-pointer"
													checked={option?.checked}
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
