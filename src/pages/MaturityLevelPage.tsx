import Header from "@/components/Header";
import DoughnutChart from "@/components/comman/Charts/DoughnutChart";
import { Button } from "@/components/ui/button";
import GovernanceGray from "../../public/assets/img/GovernanceGray.png";
import StrategicIntegrationGray from "../../public/assets/img/StrategicIntegrationGray.png";
import TechInnovationGray from "../../public/assets/img/Tech&InnovationGray.png";
import EconomicsGray from "../../public/assets/img/EconomicsGray.png";
import EnvironmentalGray from "../../public/assets/img/EnvironmentalGray.png";
import SocialGray from "../../public/assets/img/SocialGray.png";

const MaturityLevelPage = () => {
	const chartData = {
		labels: [],
		datasets: [
			{
				label: "My First Dataset",
				data: [57, 90 - 57],
				backgroundColor: ["#FFD56A", "#E8E8E8"],
				hoverOffset: 2,
			},
		],
	};

	return (
		<div className="text-[16px] leading-[19.53px] font-normal text-darkslategray-100 font-calibri">
			<Header />
			<div className="flex ml-[172px] mr-[152px] justify-between">
				<div className="h-[369px] pt-[38px]">
					<h3 className="max-w-[290.34px] text-2xl font-bold leading-[29.3px]">
						How does "Company Name" measure up?
					</h3>
					<hr className="border-2 border-solid border-[#64A70B] w-[117px] mt-[15px] mb-[17px]" />
					<div className="max-w-[602.78px]">
						<p className="">
							Congratulations! 🎉You've completed your sustainability
							assessment, and now it's time to unveil your results! Below,
							you'll find a comprehensive breakdown of your sustainability
							score,
						</p>
						<p className="mt-5">
							Along with personalized insights and recommendations to further
							enhance your journey towards a greener future. Dive in and explore
							how you can make a meaningful impact on the planet while embracing
							sustainable practices in your everyday life.
						</p>
					</div>
				</div>
				<div>
					<div className="mt-[50px] font-Poppins flex">
						<div>
							<p className="">Introductory</p>
							<p className="mt-[54px]">Intermediate</p>
							<p className="mt-[47px]">Advanced</p>
							<div className="mt-[42px] flex">
								<h5>Total Score- </h5>
								<span>57</span> <span>/90</span>
							</div>
						</div>
						<div>
							<DoughnutChart data={chartData} />
						</div>
					</div>
					<p className="inline">Your overall sustainability level -</p>{" "}
					<span>Intermediate</span>
				</div>
			</div>
			<hr className="border-2 border-solid border-[#D9D9D9] mt-[30px] mb-6" />
			<div className="mr-[100px] ml-[167px] flex justify-between">
				<h2 className="text-[24px] leading-9 font-bold">
					How you fare across the Maturity levels
				</h2>
				<Button className="w-[100px] h-10 rounded bg-teal text-[16px] leading-[18px]">
					Export
				</Button>
			</div>
			<div className="mr-[156px] ml-[167px] mt-10 flex flex-col gap-5">
				<div className="border border-solid border-[#D9D9D9] rounded-[6px]">
					<div className="flex items-center pl-[17px] border-b-[#D9D9D9] border-b border-solid h-[62px]">
						<Button className="bg-[#F63636] text-[16px] leading-5 w-[130px] font-bold">
							Introductory
						</Button>
					</div>
					<div className="pt-8 pl-[30px] pb-5 flex gap-5">
						<div className="border border-solid border-[#D9D9D9] w-[223.4px] h-[150px] rounded-[14.06px] flex flex-col items-center p-3">
							<img
								src={StrategicIntegrationGray}
								alt="img"
								className="w-[52px] h-[52px]"
							/>
							<h4 className="mt-3">Strategic Integration</h4>
							<span className="mt-[6px] text-[32px] leading-[39.06px] font-bold">
								35%
							</span>
						</div>
						<div className="border border-solid border-[#D9D9D9] w-[223.4px] h-[150px] rounded-[14.06px] flex flex-col items-center p-3">
							<img
								src={TechInnovationGray}
								alt="img"
								className="w-[52px] h-[52px]"
							/>
							<h4 className="mt-3">Tech & Innovation</h4>
							<span className="mt-[6px] text-[32px] leading-[39.06px] font-bold">
								33%
							</span>
						</div>
						<div className="border border-solid border-[#D9D9D9] w-[223.4px] h-[150px] rounded-[14.06px] flex flex-col items-center p-3">
							<img
								src={EconomicsGray}
								alt="img"
								className="w-[52px] h-[52px]"
							/>
							<h4 className="mt-3">Economics</h4>
							<span className="mt-[6px] text-[32px] leading-[39.06px] font-bold">
								30%
							</span>
						</div>
					</div>
				</div>
				<div className="border border-solid border-[#D9D9D9] rounded-[6px]">
					<div className="flex items-center pl-[17px] border-b-[#D9D9D9] border-b border-solid h-[62px]">
						<Button className="bg-[#FFD56A] text-[16px] leading-5 w-[130px] font-bold text-black">
							Intermediate
						</Button>
					</div>
					<div className="pt-8 pl-[30px] pb-5 flex gap-5">
						<div className="border border-solid border-[#D9D9D9] w-[223.4px] h-[150px] rounded-[14.06px] flex flex-col items-center p-3">
							<img
								src={GovernanceGray}
								alt="img"
								className="w-[52px] h-[52px]"
							/>
							<h4 className="mt-3">Governance</h4>
							<span className="mt-[6px] text-[32px] leading-[39.06px] font-bold">
								56%
							</span>
						</div>
						<div className="border border-solid border-[#D9D9D9] w-[223.4px] h-[150px] rounded-[14.06px] flex flex-col items-center p-3">
							<img
								src={EnvironmentalGray}
								alt="img"
								className="w-[52px] h-[52px]"
							/>
							<h4 className="mt-3">Environmental</h4>
							<span className="mt-[6px] text-[32px] leading-[39.06px] font-bold">
								33%
							</span>
						</div>
					</div>
				</div>
				<div className="border border-solid border-[#D9D9D9] rounded-[6px]">
					<div className="flex items-center pl-[17px] border-b-[#D9D9D9] border-b border-solid h-[62px]">
						<Button className="bg-[#64A70B] text-[16px] leading-5 w-[130px] font-bold">
							Advanced
						</Button>
					</div>
					<div className="pt-8 pl-[30px] pb-5 flex gap-5">
						<div className="border border-solid border-[#D9D9D9] w-[223.4px] h-[150px] rounded-[14.06px] flex flex-col items-center p-3">
							<img src={SocialGray} alt="img" className="w-[52px] h-[52px]" />
							<h4 className="mt-3">Social</h4>
							<span className="mt-[6px] text-[32px] leading-[39.06px] font-bold">
								75%
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MaturityLevelPage;
