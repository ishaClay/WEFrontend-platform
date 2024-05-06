import Footer from "@/components/Footer";
import Question from "@/components/comman/Question";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { QUERY_KEYS } from "@/lib/constants";
import {
	setActivePillar,
	setGettedAnswer,
	setPillarName,
	setQuestion,
} from "@/redux/reducer/QuestionReducer";
import { fetchClientwisePillarList, fetchPillarList } from "@/services/apiServices/pillar";
import { fetchQuestionAnswerList, fetchQuestionList } from "@/services/apiServices/question";
import { Pillar } from "@/types/Pillar";
import { QuestionType } from "@/types/Question";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Apply from "/assets/img/Apply.png";
import Assess from "/assets/img/Assess.png";
import Attainproficiency from "/assets/img/Attainproficiency.png";
import Correct from "/assets/img/Correct.png";
import Home from "/assets/img/Home.png";
import Learn from "/assets/img/Learn.png";
import LeftArrow from "/assets/img/LeftArrow.png";
import ProgressIndicator from "/assets/img/ProgressIndicator.png";
import SetTargets from "/assets/img/SetTargets.png";
import TreePlantingWhite from "/assets/img/TreePlantingWhite.png";

const QuestionPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { clientId, UserId } = useSelector((state: any) => state.user);
	console.log(UserId);
	
	const { activePillar, allPillar } = useSelector(
		(state: any) => state.question
	);
	const question = useSelector((state: any) => state.question);

	const [totalQuestions, setTotalQuestions] = useState(0);
	const [totalAttemptedQuestions, setTotalAttemptedQuestions] = useState(0);

	const { data: pillarList } = useQuery({
		queryKey: [QUERY_KEYS.pillarList],
		queryFn: () => fetchPillarList(),
	});

	const { data: clientwisePillarList } = useQuery({
		queryKey: [QUERY_KEYS.clientwisePillarList],
		queryFn: () => fetchClientwisePillarList(clientId?.toString()),
	});

	const { data: fetchQuestionAnswer } = useQuery({
		queryKey: [QUERY_KEYS.getQuestionAnswer],
		queryFn: () => fetchQuestionAnswerList(UserId.id?.toString()),
	});

	const allQ = question?.[activePillar];

	useEffect(() => {
		if (fetchQuestionAnswer?.data?.data && Array.isArray(allQ)) {
			let updatedAnswers = [...allQ];
			fetchQuestionAnswer.data.data.forEach((j: any) => {
				if (j) {
					const c = allQ.find((i) => i?.id === j?.questionId?.id);
					if (c) {
						const d = c.options.find((o: any) => o?.optionId === j?.selectedOptions[0]?.optionId);
						if (d) {
							const updatedOption = { ...d, checked: true };
							const updatedOptions = c.options.map((o: any) =>
								o.optionId === updatedOption.optionId ? updatedOption : o
							);

							const updatedC = { ...c, options: updatedOptions };

							const index = updatedAnswers.findIndex((itemA) => updatedC.id === itemA.id);
							if (index !== -1) {
								updatedAnswers[index] = updatedC;
							}
						}
					}
				}
			});

			dispatch(setGettedAnswer(updatedAnswers));
		}
	}, [fetchQuestionAnswer?.data?.data?.length, allPillar?.length, activePillar, allQ?.length]);


	useEffect(() => {
		const pillarName = (clientwisePillarList?.data?.data?.length > 0 ? clientwisePillarList?.data?.data : pillarList?.data?.data)?.map(
			(i: Pillar) => i?.pillarName
		);
		if (pillarName?.length) {
			dispatch(setPillarName(pillarName));
		}
	}, [pillarList?.data?.data, clientwisePillarList?.data?.data]);

	useEffect(() => {
		if (!activePillar && (clientwisePillarList?.data?.data?.length > 0 ? clientwisePillarList?.data?.data : pillarList?.data?.data)) {
			if (clientwisePillarList?.data?.data?.length > 0) {
				dispatch(setActivePillar(clientwisePillarList?.data?.data[0]?.pillarName));
			} else {
				dispatch(setActivePillar(pillarList?.data?.data[0]?.pillarName));
			}
		}
	}, [pillarList?.data?.data, clientwisePillarList?.data?.data]);

	const { data: questionList } = useQuery({
		queryKey: [QUERY_KEYS.questionList],
		queryFn: () => fetchQuestionList(clientId?.toString()),
	});

	useEffect(() => {
		allPillar?.forEach((i: string) => {
			if (questionList?.data?.data) {
				dispatch(setQuestion({ q: questionList?.data?.data?.[i], p: i }));
			}
		});
	}, [allPillar?.length, questionList?.data?.data]);

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

	useEffect(() => {
		let totalQuestions = 0;
		let totalAttemptedQuestions = 0;

		allPillar?.forEach((pillar: string) => {
			const pillarQuestions = question[pillar];
			if (pillarQuestions && pillarQuestions.length > 0) {
				totalQuestions += pillarQuestions.length;
				totalAttemptedQuestions += pillarQuestions.filter((que: QuestionType) =>
					que.options.some((opt) => opt.checked)
				).length;
			}
		});

		setTotalQuestions(totalQuestions);
		setTotalAttemptedQuestions(totalAttemptedQuestions);
	}, [allPillar?.length, question]);

	const currentAttemptedTotal = Array.isArray(question?.[activePillar])
		? question[activePillar].filter((que: QuestionType) =>
			que.options.some((opt) => opt.checked)
		).length
		: 0;

	const handleSubmit = (event: any) => {
		event.preventDefault();
		let allQueAns: any = {};
		allPillar.forEach((pillar: string) => {
			allQueAns[pillar] = question[pillar];
		});
		navigate("/teaserscore");
	};

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
					{allPillar.map((category: string, index: number) => {
						return (
							<div
								key={index}
								className={`w-[169px] h-[88px] p-3 rounded-[9px] shadow-[0px_6px_5.300000190734863px_0px_#00000040] items-center cursor-pointer ${activePillar === category ? "bg-[#64A70B]" : "bg-[#EDF0F4]"
									}`}
								onClick={() => dispatch(setActivePillar(category))}>
								<div className="flex gap-2">
									<div className="flex flex-col gap-1">
										<div className="w-8 h-8">
											{/* {category.icon && (
												<img
													src={category.icon}
													alt="img"
													className="w-8 h-8 object-cover"
												/>
											)} */}
										</div>
										<p
											className={`text-nowrap ${activePillar === category
												? "text-white"
												: "text-[#848181]"
												}`}>
											{(index / (allPillar.length - 1)) * 100} %
										</p>
									</div>
									<div>
										<h2
											className={`leading-[19px] ${activePillar === category
												? "text-white"
												: "text-[#3A3A3A]"
												}`}>
											{category}
										</h2>
										<p
											className={`text-[12px] leading-[14.65px] ${activePillar === category
												? "text-white"
												: "text-[#848181]"
												}`}>
											My progress {index} / {allPillar.length - 1}
										</p>
									</div>
								</div>

								<Slider
									defaultValue={[(index / (allPillar.length - 1)) * 100]}
									max={100}
									step={1}
									className="bg-red-50"
									classNameThumb="hidden"
									classNameRange={`${!(activePillar === category) && "!bg-[#64A70B]"
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
						<Question />
					</div>
					<div className="w-[271px] text-[18px] leading-[21.97px] font-normal ml-[27px]">
						<h2 className="h-[42px] bg-teal text-white font-bold rounded-bl-[22.9px] pl-[17px] text-[18px] leading-[21.97px] items-center flex">
							Current Progress
						</h2>
						<div className="flex items-center gap-3 mt-[9px] justify-between h-[31px] font-bold text-[16px] leading-5">
							<span className="ml-[18px] text-teal">Attempted</span>
							<p className="text-teal">
								{currentAttemptedTotal}/{question?.[activePillar]?.length || 0}
							</p>
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
								<p>
									{totalAttemptedQuestions}/{totalQuestions}
								</p>
								<span className="mr-2">
									<IoIosArrowDown className="w-[14px] h-[14px]" />
								</span>
							</div>
							<div className="font-normal text-[#3a3a3a]">
								{allPillar.map((category: string, index: number) => {
									return (
										<div className="flex mt-3" key={index}>
											<div
												className={`w-full flex justify-between font-normal pb-2 pt-[10px] ${index !== allPillar.length - 1 &&
													"border-b border--solid border-[#EAEAEA]"
													}`}>
												<p>{category}</p>
												<div className="flex gap-[10px]">
													<div className="flex gap-1">
														{Array.isArray(question[category]) &&
															question[category]?.map(
																(i: QuestionType, index: number) => {
																	return (
																		<p
																			key={index}
																			className={`w-3 h-3 ${i.options.some(
																				(o) => o?.checked === true
																			)
																				? "bg-[#64A70B]"
																				: "bg-[#D8D0D0]"
																				}`}></p>
																	);
																}
															)}
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

							<Button
								className="bg-[#335561] hover:bg-[#335561] text-white rounded text-[21px] leading-[25.63px] w-full mt-[18px]"
								onClick={handleSubmit}>
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
