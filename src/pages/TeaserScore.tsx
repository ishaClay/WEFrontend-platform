import Footer from "@/components/Footer";
import TeaserScoreHeader from "@/components/TeaserScoreHeader";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { QUERY_KEYS } from "@/lib/constants";
import { getAllassessment } from "@/services/apiServices/assessment";
import { fetchClientwiseMaturityLevel, fetchmaturityLevel } from "@/services/apiServices/maturityLevel";
import { useQuery } from "@tanstack/react-query";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);

const maturityLevel = [
	{
		maturityLevelName: "Introductory",
		rangeStart: 0,
		rangeEnd: 39.9,
		color: "#FF5252",
	},
	{
		maturityLevelName: "Intermediate",
		rangeStart: 40,
		rangeEnd: 69.9,
		color: "#FFD56A",
	},
	{
		maturityLevelName: "Advance",
		rangeStart: 70,
		rangeEnd: 100,
		color: "#D6F5AC",
	},
];

const findMaturityLevel = (score: number) => {
	for (const level of maturityLevel) {
		if (score >= level.rangeStart && score <= level.rangeEnd) {
			return level;
		}
	}
	return null;
};

const TeaserScore = () => {
	const navigate = useNavigate();
	const UserId = useSelector((state: any) => state.user.UserId);
	const { clientId } = useSelector((state: any) => state.user)


	const { data: maturitylevel } = useQuery({
		queryKey: [QUERY_KEYS.maturityLevel],
		queryFn: () => fetchmaturityLevel(),
	});

	const { data: fetchClientmaturitylevel } = useQuery({
		queryKey: [QUERY_KEYS.fetchbyclientMaturity],
		queryFn: () => fetchClientwiseMaturityLevel(clientId as string),
	});

	const { data: allassessmant } = useQuery({
		queryKey: [QUERY_KEYS.totalAssessment],
		queryFn: () => getAllassessment(UserId),
	});

	const score = Number(((+allassessmant?.data?.data?.avTotalpoints / +allassessmant?.data?.data?.avTotalmaxpoint) * 100).toFixed(2));
	const currentLavel = findMaturityLevel(Number(score));


	const data = {
		labels: [currentLavel?.maturityLevelName],
		datasets: [
			{
				label: "Poll",
				data: [score, 100 - Number(score)],
				backgroundColor: [currentLavel?.color, "#E8E8E8"],
			},
		],
	};

	const textCenter = {
		id: "textCenter",
		beforeDatasetDraw(chart: any) {
			const { ctx, data } = chart;
			ctx.save();
			ctx.font = "bold 25px sans-serif";
			ctx.fillStyle = "black";
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillText(
				`${data.datasets[0].data[0]}%`,
				chart.getDatasetMeta(0).data[0].x,
				chart.getDatasetMeta(0).data[0].y
			);
			ctx.restore();
		},
	};

	const options = {
		cutout: "80%",
		plugins: {
			legend: {
				display: false,
			},
			tooltip: {
				callbacks: {
					label: function (context: any) {
						let label = context.label || "";
						if (label) {
							label += ": ";
						}
						label += Math.round(context.parsed) + "%";
						return label;
					},
				},
			},
		},
	};

	const Labels = () => (
		<div className="absolute left-0 top-0 flex flex-col justify-center h-fulzl">
			{(fetchClientmaturitylevel?.data?.data?.length > 0 ? fetchClientmaturitylevel?.data?.data : maturitylevel?.data.data)?.map((label: any, index: number) => {
				return (
					<div
						key={index}
						className="text-sm flex flex-col items-center relative  mt-10 h-6">
						<div
							style={{
								backgroundImage: `linear-gradient(to right, ${label?.color}, ${label?.color}, rgba(255, 82, 82, 0))`,
							}}
							className={`absolute left-0 top-[50px] h-full w-2/4 rounded-l-lg rounded-r-none`}></div>
						<div className="ml-10 mt-[50px] pl-2 rounded-r-lg">
							{label.maturityLevelName}
						</div>
						<div className="ml-10 mt-[0px] pl-2 rounded-r-lg">
							{label?.rangeStart} to {label?.rangeEnd}
						</div>
					</div>


				);
			})}
		</div>
	);

	return (
		<div className="flex flex-col h-screen">
			<TeaserScoreHeader />
			<div className="bg-[url('../assets/img/backgroundscore.png')]">
				<div className="w-full max-w-[800px] mx-auto mt-20 mb-32 flex justify-center">
					<Card className="border-t-8 border-solid border-[#00778B] flex justify-between">
						<div className="mr-0">
							<CardHeader>
								<div className="flex flex-col pl-8 pt-4">
									<div className="flex items-center">
										<CardTitle className="text-xl font-bold">Hooray!</CardTitle>
										<img
											className="w-[32px] h-[32px] ml-3 mb-0"
											src="../assets/img/Green.png"
											alt="Green checkmark"
										/>
									</div>
									<div className="bg-[#64A70B] h-1 w-20 mt-0 ml-0"></div>
								</div>
							</CardHeader>
							<CardContent className=" pr-0 flex">
								<div className="pl-8 flex-1">
									<CardDescription className="text-sm font-[calibri] text-[#002A3A]">
										You've taken the first stride on your sustainability
										journey!🌿
									</CardDescription>
									<p className="font-bold font-[calibri] text-[#002A3A]">
										Curious about your progress?
									</p>
									<p className="text-sm font-[calibri] text-[#002A3A]">
										To view the full results and embark on the complete learning
										<br />
										experience, hop over to our registration page. Your
										adventure
										<br />
										towards sustainability is about to get even more exciting!
										🚀
										<br />
									</p>
									<button
										className="bg-[#00778B] text-white py-2 px-4 rounded-md ml-0 mt-4"
										onClick={() => navigate("/companyregister")}>
										Complete your Registration
									</button>
								</div>
							</CardContent>
						</div>

						<div className="flex justify-between">
							<div className=" mt-0 mb-6 mr-18 ml-8   relative">
								<h2 className="text-lg font-semibold mt-8 ml-5">
									Here's a sneak peek at your score!
								</h2>
								<Labels />
								<div className="text-center mt-8 mb-0 mr-8 ml-20  relative">
									<div className="w-40 h-40 mt-0 ml-16 relative">
										<Doughnut
											data={data}
											options={options}
											plugins={[textCenter]}
										/>
									</div>
									<div>
										<button
											style={{ backgroundColor: currentLavel?.color }}
											className=" text-white font-bold py-1 px-4 mt-3 ml-20 rounded">
											{currentLavel?.maturityLevelName}
										</button>
									</div>
								</div>
							</div>
						</div>
					</Card>
				</div>
				<Footer />
			</div>
		</div>
	);
};

export default TeaserScore;
