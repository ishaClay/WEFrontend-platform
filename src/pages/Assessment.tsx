import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { PrimaryButton } from "@/components/comman/Button/PrimaryButton";
import { useNavigate } from "react-router-dom";

function Assessment() {
	const navigate = useNavigate();

	return (
		<div>
			<Header />

			<div className="flex">
				<img src="../assets/img/Group 1000001824.png" />

				<div className="w-[600px] h-[524px] ">
					<div className="mt-[140px] ml-[78px]">
						<div className="flex items-end gap-x-[14px]">
							<h3 className="font-[UniNeue] italic text-[24px] font-[400]">
								Navigate your Green Compass
							</h3>
							<img className="mb-[7px]" src="../assets/img/pngwing 25.png" />
						</div>

						<img className="w-[380px]" src="../assets/img/Line 23.png" />

						<p className="w-[525px]  text-[16px] font-[400] font-[calibri] text-[#332626] leading-[17px] mt-[22px]">
							Steer through 30 pivotal questions under 6 sustainability pillars
							to chart your company's course towards environmental stewardship.
							<br></br>
							<br></br>
							Anchor your answers to draft a sustainable map for your
							enterprise, revealing pathways to greener practices and
							innovations.
						</p>

						<h2 className="font-[700] text-[24px] font-calibri mt-[24px]">
							What's all covered under this assessment?
						</h2>

						<div className="font-calibri flex items-center w-[800px]">
							<div>
								<p className="">
									This self-assessment covers a variety of essential topics,
									including:
								</p>
								<div className="flex gap-x-[42px] items-center mt-[24px]">
									<div className="flex flex-col gap-y-[16px]">
										<div className="flex gap-x-[10px] items-center">
											<img
												className="w-[26px]"
												src="../assets/img/TreePlantingBlack.png"
											/>
											<p>Environment</p>
										</div>

										<div className="flex gap-x-[10px] items-center">
											<img
												className="w-[26px]"
												src="../assets/img/Neighbour.png"
											/>
											<p>Social</p>
										</div>

										<div className="flex gap-x-[10px] items-center">
											<img
												className="w-[26px]"
												src="../assets/img/Weak Financial Growth.png"
											/>
											<p>Economic</p>
										</div>
									</div>

									<div className="flex flex-col gap-y-[16px]">
										<div className="flex gap-x-[10px] items-center">
											<img
												className="w-[26px]"
												src="../assets/img/Path Steps.png"
											/>
											<p>Strategy</p>
										</div>

										<div className="flex gap-x-[10px] items-center">
											<img
												className="w-[26px]"
												src="../assets/img/Light On.png"
											/>
											<p>Technology & Innovation</p>
										</div>

										<div className="flex gap-x-[10px] items-center">
											<img
												className="w-[26px]"
												src="../assets/img/Morale.png"
											/>
											<p>Governance</p>
										</div>
									</div>
								</div>
							</div>

							<div>
								<img src="../assets/img/Group 60.png" />
							</div>
						</div>

						<p className="w-[685px] font-[400] text-[16px] mt-[24px]">
							Embarking on this assessment voyage sets your sails towards market
							distinction through sustainability. It's your sextant to gauge and
							refine your green practices, ensuring your journey not only charts
							a course for success but also for a healthier planet
						</p>

						<PrimaryButton
							onClick={() => navigate("/question")}
							name="Take assessment"
							className="w-[266px] h-[55px] mt-[24px]"
						/>
					</div>
				</div>
			</div>
			<div className="">
				<Footer />
			</div>
		</div>
	);
}

export default Assessment;
