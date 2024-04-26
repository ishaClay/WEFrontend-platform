import { Option, QuestionType } from "@/types/Question";
import { useSelector } from "react-redux";
// import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import Suggestion from "/assets/img/Suggestion.png";

const Question = () => {
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
							{/* <RadioGroup
								defaultValue=""
								className="mt-[21px] flex flex-col gap-[17px] px-10">
								{i.options.map((option: Option) => (
									<div key={option.optionId} className="flex items-start">
										<RadioGroupItem
											value={option.optionId}
											id={option.optionId}
											className="border-[#EAE5E5] text-[#64A70B] mt-[3px]"
										/>
										<p className="overflow-hidden text-wrap w-full whitespace-nowrap max-w-[632px] ml-2">
											{option.name}
										</p>
									</div>
								))}
							</RadioGroup> */}
							<div className="mt-[21px] flex flex-col gap-[17px] px-10">
								{i.options.map((option: Option) => (
									<div className="flex items-center">
										<div>
											<input
												type="radio"
												name={option.optionId}
												id={option.optionId}
												value={option.optionId}
												className="border-[#EAE5E5] text-[#64A70B]"
											/>
										</div>
										<span className="overflow-hidden text-wrap w-full whitespace-nowrap max-w-[632px] ml-2">
											{option.name}
										</span>
									</div>
								))}
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
