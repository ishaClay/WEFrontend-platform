import Apply from "/assets/img/Apply.png";
import Assess from "/assets/img/Assess.png";
import Attainproficiency from "/assets/img/Attainproficiency.png";
import Correct from "/assets/img/Correct.png";
import Home from "/assets/img/Home.png";
import Learn from "/assets/img/Learn.png";
import LeftArrow from "/assets/img/LeftArrow.png";
import SetTargets from "/assets/img/SetTargets.png";
import TreePlantingWhite from "/assets/img/TreePlantingWhite.png";
// import Light from "/assets/img/Light On.png";
// import Morale from "/assets/img/Morale.png";
// import Neighbour from "/assets/img/Neighbour.png";
// import PathSteps from "/assets/img/Path Steps.png";
// import TreePlantingBlack from "/assets/img/TreePlantingBlack.png";
// import WeakFinancialGrowth from "/assets/img/Weak Financial Growth.png";
import Footer from "@/components/Footer";
import Question from "@/components/comman/Question";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { QUERY_KEYS } from "@/lib/constants";
import { fetchPillarList } from "@/services/apiServices/pillar";
import { fetchQuestionList } from "@/services/apiServices/question";
import { Pillar } from "@/types/Pillar";
import { useQuery } from "@tanstack/react-query";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import ProgressIndicator from "/assets/img/ProgressIndicator.png";
import { Fragment, useEffect, useState } from "react";
import { QuestionType } from "@/types/Question";

const QuestionPage = () => {
	const navigate = useNavigate();

	const [activePillar, setActivePillar] = useState<string>("");
	console.log("activePillar", activePillar);

	const { data: pillarList } = useQuery({
		queryKey: [QUERY_KEYS.pillarList],
		queryFn: () => fetchPillarList(),
	});

	useEffect(() => {
		if (!activePillar) {
			setActivePillar(pillarList?.data?.data[0]?.pillarName);
		}
	}, [pillarList?.data?.data]);

	const { data: questionList } = useQuery({
		queryKey: [QUERY_KEYS.questionList],
		queryFn: () => fetchQuestionList("6"),
	});

	console.log(
		"questionList?.data?.data?.activePillar",
		Object.keys(questionList?.data?.data || {})
	);

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

	const progressbar = [
		{
			category: "Environment",
			questionAttemps: [1, 1, 1, 1, 1],
		},
		{
			category: "Social",
			questionAttemps: [1, 0, 1, 0, 0],
		},
		{
			category: "Economic",
			questionAttemps: [0, 0, 0, 0, 0],
		},
		{
			category: "Governance",
			questionAttemps: [0, 1, 1, 0, 0],
		},
		{
			category: "Technology & Innovation",
			questionAttemps: [0, 1, 1, 1, 0],
		},
		{
			category: " Strategic Integration",
			questionAttemps: [0, 1, 1, 0, 0],
		},
	];

	return (
		<div className="font-calibri font-normal">
			<div className="h-[44px] bg-teal text-white flex justify-between items-center lg:pl-12 lg:pr-[166px] px-4 text-lg leading-[21.97px]">
				<div className="flex gap-[9px]">
					<button
						className="flex items-center gap-2"
						onClick={() => {
							navigate("/");
						}}>
						<img src={LeftArrow} alt="arrow" width={22} height={22} />
						<span>back</span>
					</button>
					<img
						src={Home}
						alt="home"
						width={23}
						height={23}
						className="cursor-pointer"
						onClick={() => {
							navigate("/");
						}}
					/>
				</div>

				<button className="flex items-center gap-3 border border-solid border-white w-[166px] justify-center">
					<img src={TreePlantingWhite} alt="tree" width={24} height={30} />
					Environmental
				</button>
			</div>
			<div className="h-[120px] font-Poppins font-medium text-[12.85px] leading-[16.64px] text-[#3A3A3A] flex justify-center pb-3 pt-[13px]">
				<div className="relative lg:gap-[79.4px] justify-between flex min-w-[640px] md:w-auto items-center mx-5">
					{paths.map((path, index: number) => {
						return (
							<div className="flex flex-col self-end items-center" key={index}>
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
			<div className="min-h-[129px] bg-[#E7E7E8] flex justify-center">
				<div className="flex gap-[31px] items-center flex-wrap p-3 justify-center">
					{pillarList?.data?.data.map((category: Pillar, index: number) => {
						return (
							<div
								key={index}
								className={`w-[169px] h-[88px] p-3 rounded-[9px] shadow-[0px_6px_5.300000190734863px_0px_#00000040] items-center cursor-pointer ${activePillar === category.pillarName
									? "bg-[#64A70B]"
									: "bg-[#EDF0F4]"
									}`}
								onClick={() => setActivePillar(category.pillarName)}>
								<div className="flex gap-2">
									<div className="flex flex-col gap-1">
										<div className="w-8 h-8">
											{category.icon && (
												<img
													src={category.icon}
													alt="img"
													className="w-8 h-8 object-cover"
												/>
											)}
										</div>
										<p
											className={`text-nowrap ${activePillar === category.pillarName
												? "text-white"
												: "text-[#848181]"
												}`}>
											{" "}
											{(index / (pillarList?.data?.data.length - 1)) * 100} %
										</p>
									</div>
									<div>
										<h2
											className={`leading-[19px] ${activePillar === category.pillarName
												? "text-white"
												: "#3A3A3A"
												}`}>
											{category.pillarName}
										</h2>
										<p
											className={`text-[12px] leading-[14.65px] ${activePillar === category.pillarName
												? "text-white"
												: "text-[#848181]"
												}`}>
											My progress {index} / {pillarList?.data?.data.length - 1}
										</p>
									</div>
								</div>

								<Slider
									defaultValue={[
										(index / (pillarList?.data?.data.length - 1)) * 100,
									]}
									max={100}
									step={1}
									className="bg-red-50"
									classNameThumb="hidden"
									classNameRange={`${!(activePillar === category.pillarName) && "!bg-[#64A70B]"
										}`}
									disabled
								/>
							</div>
						);
					})}
				</div>
			</div>

			<form>
				<div className="mt-[89px] ml-[177px] flex flex-wrap justify-between">
					<div className="bg-[#EFEEEE] flex gap-12 flex-col pr-[98px] pb-[68px]] w-[871px] max-w-full">
						{questionList?.data?.data?.[activePillar]?.map(
							(question: QuestionType, index: number, arr: QuestionType[]) => {
								return (
									<Fragment key={index}>
										<Question question={question} index={index} arr={arr} />
									</Fragment>
								);
							}
						)}
					</div>
					<div className="w-[271px] text-[18px] leading-[21.97px] font-normal ml-[27px]">
						<h2 className="h-[42px] bg-teal text-white font-bold rounded-bl-[22.9px] pl-[17px] text-[18px] leading-[21.97px] items-center flex">
							Current Progress
						</h2>
						<div className="flex items-center gap-3 mt-[9px] justify-between h-[31px] font-bold text-[16px] leading-5">
							<span className="ml-[18px] text-teal">Attempted</span>
							<p className="text-teal">0/5</p>
							<img
								src={ProgressIndicator}
								alt="progressbar"
								width={24}
								height={24}
								className="mr-[34px]"
							/>
						</div>
						<div className="ml-[14px] mt-[17px] w-[267px]">
							<div className="flex items-center justify-between font-bold	">
								<span>Attempted</span>
								<p>14/30</p>
								<span className="mr-2">
									<IoIosArrowDown className="w-[14px] h-[14px]" />
								</span>
							</div>
							<div className="font-normal text-[#3a3a3a]">
								{(questionList?.data?.data ? Object.keys(questionList?.data?.data) : []).map((category, index: number) => {
									console.log("questionList?.data?.data?.category", questionList?.data?.data);

									const categoryData = questionList?.data?.data?.[category] || []; // Handle null or undefined case
									return (
										<div className="flex mt-3" key={index}>
											<div className={`w-full flex justify-between font-normal pb-2 pt-[10px] ${progressbar.length - 1 !== index && "border-b border--solid border-[#EAEAEA]"}`}>
												<p>{category}</p>
												<div className="flex gap-[10px]">
													<div className="flex gap-1">
														{categoryData.map((question, index: number) => {
															console.log("question", question);

															return (
																<p key={index} className={`w-3 h-3 bg-[#ffffff]`}>
																</p>
															);
														})}
													</div>
												</div>
											</div>
											<span className="mr-2 ml-[11px] mt-[10px]">
												<IoIosArrowDown className="w-[14px] h-[14px]" />
											</span>
										</div>
									);
								})}
							</div>


							<Button className="bg-[#335561] hover:bg-[#335561] text-white rounded text-[21px] leading-[25.63px] w-full mt-[18px]"
								onClick={() => navigate("/companyregister")}
							>
								Submit & Continue
							</Button>
						</div>
					</div>
				</div>
			</form>

			<div className="mt-[238px]">
				<Footer />
			</div>
		</div>
	);
};

export default QuestionPage;
