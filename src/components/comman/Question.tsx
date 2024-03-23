import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import Suggestion from "/assets/img/Suggestion.png";

interface QuestionProps {
	category: string;
	no: string;
	question: string;
	options: {
		optionid: string;
		option: string;
	}[];
	hint: boolean;
}
[];

const Question = ({ question }: { question: QuestionProps }) => {
	return (
		<div className="relative bg-white min-h-[321px] pb-3 rounded-[15.34px] shadow-[0px_4px_4px_0px_#00000040] max-w-[773px]">
			<div className="min-h-[52px] bg-[#EEF9FD] flex items-center pl-9 mt-[72px]">
				<h2 className="text-[#002A3A] font-bold leading-[17.77px]">
					{question.no}. {question.question}
				</h2>
			</div>
			<RadioGroup
				defaultValue=""
				className="mt-[21px] flex flex-col gap-[17px] px-10">
				{question.options.map((option) => (
					<div key={option.optionid} className="flex items-start">
						<RadioGroupItem
							value={option.optionid}
							id={option.optionid}
							className="border-[#EAE5E5] text-[#EAE5E5] mt-[3px]"
						/>
						<p className="overflow-hidden text-wrap w-full whitespace-nowrap max-w-[632px] ml-2">
							{option.option}
						</p>
					</div>
				))}
			</RadioGroup>

			<div className="absolute flex items-center justify-center top-0 left-0 bg-teal text-white w-[207.83px] h-[52.15px] rounded-br-[62.27px] font-bold text-[18px] leading-[21.97px]">
				{question.category} {question.no}/5
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
};

export default Question;
