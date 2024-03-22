import LeftArrow from "/assets/img/LeftArrow.png";
import Home from "/assets/img/Home.png";
import TreePlantingWhite from "/assets/img/TreePlantingWhite.png";
import Assess from "/assets/img/Assess.png";
import SetTargets from "/assets/img/SetTargets.png";
import Learn from "/assets/img/Learn.png";
import Apply from "/assets/img/Apply.png";
import Attainproficiency from "/assets/img/Attainproficiency.png";
import Correct from "/assets/img/Correct.png";
import Light from "/assets/img/Light On.png";
import Morale from "/assets/img/Morale.png";
import Neighbour from "/assets/img/Neighbour.png";
import PathSteps from "/assets/img/Path Steps.png";
import TreePlantingBlack from "/assets/img/TreePlantingBlack.png";
import WeakFinancialGrowth from "/assets/img/Weak Financial Growth.png";
import Question from "@/components/comman/Question";
import ProgressIndicator from "/assets/img/ProgressIndicator.png";

const QuestionPage = () => {
	const paths = [
		{
			name: "Engage",
			img: Correct,
			status: "checked",
		},
		{
			name: "Assess",
			img: Assess,
			status: "indeterminate",
		},
		{
			name: "Set Targets",
			img: SetTargets,
			status: "pending",
		},
		{
			name: "Learn",
			img: Learn,
			status: "pending",
		},
		{
			name: "Apply",
			img: Apply,
			status: "pending",
		},
		{
			name: "Attain proficiency",
			img: Attainproficiency,
			status: "pending",
		},
	];
	const categorys = [
		{
			title: "Environment",
			progress: "0/5",
			icon: TreePlantingBlack,
			percentange: 0,
			active: true,
		},
		{
			title: "Social",
			progress: "1/5",
			icon: Neighbour,
			percentange: 20,
		},
		{
			title: "Economic",
			progress: "2/5",
			icon: WeakFinancialGrowth,
			percentange: 40,
		},
		{
			title: "Governance",
			progress: "3/5",
			icon: Morale,
			percentange: 60,
		},
		{
			title: "Technology & Innovation",
			progress: "4/5",
			icon: Light,
			percentange: 80,
		},
		{
			title: " Strategic Integration",
			progress: "5/5",
			icon: PathSteps,
			percentange: 100,
		},
	];
	const questions = [
		{
			category: "Environment",
			no: "1",
			question:
				"How aware is your organisation of the concept and importance of achieving Net Zero emissions by 2050.",
			options: [
				{
					optionid: "1",
					option: "Not aware, or aware but taking no action",
				},
				{
					optionid: "2",
					option:
						"Moderately aware and proactive, but with some knowledge gaps and steps taken towards implementation of a plan",
				},
				{
					optionid: "3",
					option:
						"Very aware and proactive, with a good understanding of Net Zero goals and a well-executed action plan",
				},
			],
			hint: true,
		},
		{
			category: "Environment",
			no: "2",
			question:
				"How does your organisation approach energy management and conduct energy assessments",
			options: [
				{
					optionid: "1",
					option:
						"We do not monitor energy consumption or focus on energy efficiency, and we have not conducted ",
				},
				{
					optionid: "2",
					option:
						"We monitor energy consumption and implement energy-saving measures",
				},
				{
					optionid: "3",
					option:
						"We systematically track and optimise energy consumption and efficiency, complemented by regular energy assessments and audits to identify, and capitalise on energy-saving opportunities.",
				},
			],
			hint: false,
		},
		{
			category: "Environment",
			no: "3",
			question:
				"A. How does your business approach waste management to reduce environmental impact and promote sustainability",
			options: [
				{
					optionid: "1",
					option:
						"We have no specific waste management policy or practices in place",
				},
				{
					optionid: "2",
					option:
						"We actively manage waste, recycling, across various processes, but there is room for improvement",
				},
				{
					optionid: "3",
					option:
						" We have a comprehensive waste management policy and plan with a focus on minimising waste generation, promoting recycling, and implementing circular economy practices.",
				},
			],
			hint: false,
		},
		{
			category: "Environment",
			no: "4",
			question:
				"To what extent has your organisation evaluated and acted upon incorporating renewable energy systems",
			options: [
				{
					optionid: "1",
					option:
						"We have not yet considered or explored the possibility of incorporating renewable energy into our business",
				},
				{
					optionid: "2",
					option:
						"We have started to assess the potential of renewable energy systems but have not made any definitive plans ",
				},
				{
					optionid: "3",
					option:
						"We have extensively incorporated renewable energy systems into our business",
				},
			],
			hint: false,
		},
		{
			category: "Environment",
			no: "5",
			question:
				"How do you manage transportation and logistics to minimise environmental impacts, track and report emissions",
			options: [
				{
					optionid: "1",
					option:
						"We do not consider environmental impacts or track emissions of our transportation and logistics",
				},
				{
					optionid: "2",
					option:
						"We make some efforts to track and report transportation and logistics, to optimise and reduce emissions",
				},
				{
					optionid: "3",
					option:
						"We have a comprehensive optimisation strategy to minimise environmental and social impact.",
				},
			],
			hint: false,
		},
	];
	return (
		<div className="font-calibri font-normal">
			<div className="h-[44px] bg-teal text-white flex justify-between items-center pl-12 pr-[166px] text-lg leading-[21.97px]">
				<div className="flex gap-[9px]">
					<button className="flex items-center gap-2">
						<img src={LeftArrow} alt="arrow" width={22} height={22} />
						<span>back</span>
					</button>
					<img
						src={Home}
						alt="home"
						width={23}
						height={23}
						className="cursor-pointer"
					/>
				</div>

				<button className="flex items-center gap-3 border border-solid border-white w-[166px] justify-center">
					<img src={TreePlantingWhite} alt="tree" width={24} height={30} />
					Environmental
				</button>
			</div>
			<div className="h-[120px] font-Poppins font-medium text-[12.85px] leading-[16.64px] text-[#3A3A3A] flex justify-center pb-3 pt-[13px]">
				<div className="relative flex gap-[79.4px] items-center">
					{paths.map((path) => {
						return (
							<div className="flex flex-col self-end items-center">
								{path.status === "checked" ? (
									<img
										src={Correct}
										alt="img"
										width={59.6}
										height={59.6}
										className="mt-[13.4]"
									/>
								) : path.status === "indeterminate" ? (
									<img
										src={Assess}
										alt="img"
										width={70}
										height={70}
										className="mt-[7px]"
									/>
								) : (
									<img
										src={path.img}
										alt="img"
										width={59.6}
										height={59.6}
										className="mt-[15.4px]"
									/>
								)}
								<p className="">{path.name}</p>
							</div>
						);
					})}
					<div className="absolute top-[47.5px] left-3 right-10 border-2 border-dashed border-[#585858] -z-10"></div>
				</div>
			</div>
			<div className="h-[129px] bg-[#E7E7E8] flex justify-center">
				<div className="flex gap-[31px] items-center">
					{categorys.map((category) => {
						return (
							<div
								className={`w-[169px] h-[88px] rounded-[9px] p-3 shadow-[0px_6px_5.300000190734863px_0px_#00000040] items-center ${
									category.active ? "bg-[#64A70B]" : "bg-[#EDF0F4]"
								}`}>
								<div className="flex gap-3">
									<img
										src={category.icon}
										alt="img"
										className="w-10 h-10 object-cover"
									/>
									<div>
										<h2
											className={`leading-[19px] ${
												category.active ? "text-white" : "#3A3A3A"
											}`}>
											{category.title}
										</h2>
										<p
											className={`text-[12px] leading-[14.65px] ${
												category.active ? "text-white" : "text-[#848181]"
											}`}>
											My progress {category.progress}
										</p>
									</div>
								</div>
								<p
									className={`${
										category.active ? "text-white" : "text-[#848181]"
									}`}>
									{" "}
									{category.percentange} %
								</p>
							</div>
						);
					})}
				</div>
			</div>
			<div className="mt-[89px] ml-[177px] flex">
				<div className="bg-[#EFEEEE] flex gap-12 flex-col pr-[98px]">
					{questions.map((question) => {
						return <Question question={question} />;
					})}
				</div>
				<div className="w-[271px]">
					<h2 className="h-[42px] bg-te">Current Progress</h2>
					<div className="flex items-center gap-3 mt-[9px]">
						<span>Attempted</span>
						<p>0/5</p>
						<img
							src={ProgressIndicator}
							alt="progressbar"
							width={24}
							height={24}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default QuestionPage;
