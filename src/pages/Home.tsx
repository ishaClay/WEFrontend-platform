import Footer from "@/components/Footer";
import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Plus from "../../public/assets/img/Plus.png";
import Minus from "../../public/assets/img/Minus.png";

function Home() {
	const [activeIndex, setActiveIndex] = useState(null);

	const onItemClick = (index: any) => {
		console.log(activeIndex, "activeIndex");
		setActiveIndex(index === activeIndex ? null : index);
	};

	const settings = {
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	const data = [
		{
			image: "../assets/img/Tree Planting.png",
			title: "Enviroment",
			discription:
				"Minimize your environmental footprint and promote eco-friendly practices.",
		},
		{
			image: "../assets/img/Neighbour.png",
			title: "Social",
			discription:
				"Create a workplace that fosters social responsibility and inclusivity.",
		},
		{
			image: "../assets/img/Weak Financial Growth.png",
			title: "Economic",
			discription:
				"Achieve financial sustainability while contributing to the local economy.",
		},
		{
			image: "../assets/img/Morale.png",
			title: "Governance",
			discription: "Ensure transparent and ethical business practices.",
		},
		{
			image: "../assets/img/Light On.png",
			title: "Technology & Innovation ",
			discription:
				"Embrace innovation to stay ahead in the ever-evolving world of sustainability.",
		},
		{
			image: "../assets/img/Path Steps.png",
			title: "Strategic Integration",
			discription:
				"Strategic planning is key to sustainable, resilient foundations.",
		},
	];

	return (
		<div className="container  mx-auto ">
			<section>
				<div className="relative mt-[30px] overflow-hidden">
					<img src="../assets/img/Environment 3.png" />
					<div className="absolute top-[131px] left-[-15px]  opacity-[10] )]">
						<img src="../assets/img/Rectangle.png" />
					</div>
					<div className="absolute top-[160px] left-[171px] text-white">
						<img
							className="absolute left-[-100px] top-[10px]"
							src="../assets/img/Forward.png"
						/>
						<p className="font-[700] text-[28px]">
							Pathway to Sustainability Maturity
						</p>
						<p className="w-[353px] h-[44px] font-[300] mt-[5px] text-[18px] leading-[21.97px]">
							Empower growing business to drive positive sustainability outcomes
						</p>
						<button className="w-[278px] h-[59px] mt-[22px] bg-secondary-button rounded-md ">
							<p>Start your journey</p>
							{/* <img className=' absolute left-[150px]' src='../assets/img/Move Right.png'/> */}
						</button>
					</div>

					<img
						className="absolute top-[530px]"
						src="../assets/img/Rectang.png"
					/>

					<div className=" absolute top-[552px] left-[480px] text-white flex gap-[16px]">
						<p>ENGAGE</p>
						<img className="" src="../assets/img/Arrow Right.png" />
						<p>ASSESS</p>
						<img src="../assets/img/Arrow Right.png" />
						<p>SET TARGETS</p>
						<img src="../assets/img/Arrow Right.png" />
						<p>LEARN</p>
						<img src="../assets/img/Arrow Right.png" />
						<p>APPLY</p>
						<img src="../assets/img/Arrow Right.png" />
						<p>ATTAIN PROFICIENCY</p>
					</div>
				</div>
			</section>
			<section>
				<div className="relative flex">
					<img
						className="w-[373px] h-[259px]"
						src="../assets/img/Rectangle 6.png"
					/>
					<div className="absolute top-[36px] left-[171px] text-white">
						<p className="w-[184px] h-[108px] font-[800] text-[27px] leading-[27px]">
							Start your Sustainability journey with firm foundations
						</p>
						<img
							className="absolute top-[150px] left-[120px] w-[62px] h-[76px]"
							src="../assets/img/Voltage.png"
						/>
					</div>
					{data.map((v) => {
						return (
							<div className="w-[193.23px] h-[268px] bg-gradient-to-br from-white to-gray-200">
								<img
									className="w-[66.56px] h-[74.72px] mt-[30px] ml-[26px]"
									src={v.image}
								/>
								<h3 className="font-[700] text-[18px] leading-[20.25px] text-[#00778B] mt-[9px] ml-[19px]">
									{v.title}
								</h3>
								<p className="mt-[30px] ml-[18px] w-[140px] h-[64px] font-[400] text-[14px] leading-[15.75px]">
									{v.discription}
								</p>
							</div>
						);
					})}
				</div>
			</section>

			<section className="mt-[38px]">
				<div className="relative">
					<div className="bg-[#F7F8FC] h-[517px] flex">
						<img
							className="ml-[232px] mt-[80px] w-[332px] h-[357px]"
							src="../assets/img/pngwing 5.png"
						/>
						<img
							className="absolute top-[352px] left-[171px] w-[108px] h-[85px]"
							src="../assets/img/Rectangle 6.png"
						/>
						<img
							className="absolute top-[360px] left-[194px] w-[62px] h-[76px]"
							src="../assets/img/Voltage.png"
						/>
						<div className="w-[697px] h-[37px] ml-[100px] mt-[80px]">
							<Slider {...settings}>
								<div>
									<img src="../assets/img/Component 1.png" />
								</div>
								<div>
									<h3>2</h3>
								</div>
							</Slider>
						</div>
					</div>
				</div>
			</section>

			<section className="mt-[76px] overflow-hidden">
				<div className="w-[1567px] h-[12px] bg-[#64A70B]"></div>

				<div className="mt-[24px] h-[900px]">
					<div className="ml-[170px] w-[165px] h-[47px] bg-[#C1EF84] rounded-[6px]  flex justify-center items-center">
						<p className="font-[700] text-[20px] leading-[27px]">
							For Companies
						</p>
					</div>
					<h3 className="mt-[50px] ml-[330px] text-center w-[800px] h-[54px] text-[32px] leading-[36px] traking-[4px] font-uni-neue font-semibold ">
						Is your business seeking to align its sustainability practices with
						Ireland's national goals?
					</h3>

					<div className="mt-[80px] relative flex text-center">
						<div className="flex flex-col  gap-[35px] ml-[171px]">
							<div className="w-[370px] h-[auto] bg-[#4C7D0A] rounded-[6px] text-white p-[24px]">
								<h3 className="font-[700]">
									Comprehensive Sustainability Training
								</h3>
								<p>
									Elevate your business with Ireland's green vision through
									comprehensive sustainability learning.
								</p>
							</div>

							<div className="w-[370px] h-[auto] bg-[#4C7D0A] rounded-[6px] text-white p-[24px]">
								<h3 className="font-[700]">
									{" "}
									Employee Engagement & Development
								</h3>
								<p>
									Foster a culture of growth and engagement through
									sustainability-focused professional development.
								</p>
							</div>

							<div className="w-[370px] h-[auto] bg-[#4C7D0A] rounded-[6px] text-white p-[24px]">
								<h3 className="font-[700]">
									Effortless Enrollment and Administration
								</h3>
								<p>
									Simplify your sustainability journey with seamless course
									enrollment and management.
								</p>
							</div>
						</div>
						<div>
							<div className="absolute w-[80px] top-[100px]  left-[565px] border border-solid border-black transform rotate-[18.89deg]"></div>
							<div className="absolute w-[51px] top-[250px]  left-[570px] border border-solid border-black transform rotate-0"></div>
							<div className="absolute w-[80px] top-[412px]  left-[565px] border border-solid border-black transform rotate-[-30deg]"></div>
							<img
								className="absolute top-[100px] left-[650px]"
								src="../assets/img/E-Learning.png"
							/>
							<img
								className="absolute top-[230px] left-[630px]"
								src="../assets/img/Safety.png"
							/>
							<img
								className="absolute top-[360px] left-[650px]"
								src="../assets/img/Conflict.png"
							/>
							<div className="rounded-full absolute top-[150px] left-[700px] w-[203px] h-[203px] bg-white  shadow-md">
								<h3 className="font-[700] text-[32px] absolute top-[80px] left-[30px]">
									Benefits
								</h3>
								<img
									className="absolute top-[85px] left-[165px]"
									src="../assets/img/Ellipse 31.png"
								/>
								<div className="absolute top-[70px] left-[166px] w-[31px] h-[30px] border border-solid border-gray-600 rounded-full"></div>
							</div>
							<img
								className="absolute top-[100px] left-[880px]"
								src="../assets/img/Classroom.png"
							/>
							<img
								className="absolute top-[230px] left-[930px]"
								src="../assets/img/Recycling.png"
							/>
							<img
								className="absolute top-[360px] left-[900px]"
								src="../assets/img/Environmental.png"
							/>
							<div className="absolute w-[80px] top-[100px] left-[950px] border border-solid border-black transform rotate-[-200deg]"></div>
							<div className="absolute w-[51px] top-[250px]  left-[1000px] border border-solid border-black transform rotate-0"></div>
							<div className="absolute w-[80px] top-[412px]  left-[970px] border border-solid border-black transform rotate-[28deg]"></div>
						</div>

						<div className="flex flex-col  gap-[35px] ml-[171px] absolute   left-[900px]">
							<div className="w-[370px] h-[auto] bg-[#4C7D0A] rounded-[6px] text-white p-[24px]">
								<h3>Flexible Learning Paths for Businesses</h3>
								<p>
									Embrace adaptive learning for continuous sustainability growth
									across your organisation.
								</p>
							</div>

							<div className="w-[370px] h-[auto] bg-[#4C7D0A] rounded-[6px] text-white p-[24px]">
								<h3> Reputation & Trust Building</h3>
								<p>
									Elevate your brand with a reputation for genuine
									sustainability commitment.
								</p>
							</div>

							<div className="w-[370px] h-[auto] bg-[#4C7D0A] rounded-[6px] text-white p-[24px]">
								<h3>Promotion of Sustainable Business Practices</h3>
								<p>
									Lead the sustainability charge with innovative practices that
									inspire industry and community.
								</p>
							</div>
						</div>

						<button className="absolute top-[550px] left-[45%] w-[249px] h-[59px] rounded-[4px] border border-solid border-black 1px">
							Get Started
						</button>
					</div>
				</div>

				<div className="ml-[170px] w-[165px] h-[47px] bg-[#C1EF84] rounded-[6px]  flex justify-center items-center">
					<p className="font-[700] text-[20px] leading-[27px]">For Companies</p>
				</div>

				<div className="w-[1212px] h-[645px] relative  m-[auto]">
					<h3 className="font-[700] text-[24px] w-[270px] text-center absolute left-[550px] top-[24px]">
						Sustainability platform needs you.
					</h3>
					<div className="flex gap-[39px] gap-y-[83px] flex-wrap absolute top-[130px]">
						<div className="flex w-[374px] h-[64px] gap-[20px] relative">
							<img className="" src="../assets/img/Ellipse 62.png" />
							<img
								className="absolute top-[13px] left-[14px] "
								src="../assets/img/Satellites.png"
							/>
							<div className="w-[298px] h-[36px]">
								<h3>Market Reach</h3>
								<p>
									Enhance economy of scale by developing training solutions
									tailored to market demands.
								</p>
							</div>
						</div>

						<div className="flex w-[374px] h-[64px]  gap-[20px] relative">
							<img className="" src="../assets/img/Ellipse 62.png" />
							<img
								className="absolute top-[13px] left-[14px]  "
								src="../assets/img/Satellites.png"
							/>
							<div className="w-[298px] h-[36px]">
								<h3>Market Reach</h3>
								<p>
									Enhance economy of scale by developing training solutions
									tailored to market demands.
								</p>
							</div>
						</div>
						<div className="flex w-[374px] h-[64px]  gap-[20px] relative">
							<img className="" src="../assets/img/Ellipse 62.png" />
							<img
								className="absolute top-[13px] left-[14px] "
								src="../assets/img/Satellites.png"
							/>
							<div className="w-[298px] h-[36px]">
								<h3>Market Reach</h3>
								<p>
									Enhance economy of scale by developing training solutions
									tailored to market demands.
								</p>
							</div>
						</div>
						<div className="flex w-[374px] h-[64px]  gap-[20px] relative">
							<img className="" src="../assets/img/Ellipse 62.png" />
							<img
								className="absolute top-[13px] left-[14px]  "
								src="../assets/img/Satellites.png"
							/>
							<div className="w-[298px] h-[36px]">
								<h3>Market Reach</h3>
								<p>
									Enhance economy of scale by developing training solutions
									tailored to market demands.
								</p>
							</div>
						</div>
						<div className="flex w-[374px] h-[64px]  gap-[20px] relative">
							<img className="" src="../assets/img/Ellipse 62.png" />
							<img
								className="absolute top-[13px] left-[14px]  "
								src="../assets/img/Satellites.png"
							/>
							<div className="w-[298px] h-[36px]">
								<h3>Market Reach</h3>
								<p>
									Enhance economy of scale by developing training solutions
									tailored to market demands.
								</p>
							</div>
						</div>
					</div>

					<div className="text-center w-[990px] absolute top-[450px] tracking-[-4%] left-[130px] font-[500] text-[24px]">
						<h3 className="">
							Be a catalyst for change! Partner with us and contribute to a
							sustainable future through impactful training initiatives.
							<span className="text-[#64A70B]">
								Ready to Transform Sustainability Training?{" "}
							</span>
						</h3>
					</div>

					<button className="w-[169px] h-[44px] bg-[#64A70B] text-white rounded-[4px] absolute top-[550px] left-[550px]">
						Register me
					</button>
				</div>
			</section>

			<section className="">
				<div className=" w-[1519px] h-[610px] bg-[#F7F8FC] pt-[40px]">
					<div className="ml-[171px] font-[700] text-[32px] relative">
						<h3 className="">Our Building Blocks </h3>
						<div className="w-[380px] border-solid border-[4px] border-redius rounded-full border-secondary-button mt-[16px]"></div>
						<img
							className="absolute top-[-6px] left-[312px]"
							src="../assets/img/Ellipse 31.png"
						/>
						<div className="absolute top-[-20px] left-[315px] w-[31px] h-[30px] border border-solid border-gray-600 rounded-full"></div>

						<div className="flex flex-wrap gap-8 mt-[137px]">
							<div className="w-[571px]">
								{data.slice(0, 3).map((item, index) => (
									<div
										key={index}
										className="w-[573px] border-solid border-silver border-[1px] mb-5">
										<h2
											className={`${
												item.title === activeIndex
													? "bg-darkslategray-300 text-white"
													: "bg-ghostwhite text-darkslategray-300"
											}   font-[700] text-[24px] flex justify-between items-center px-[18px]`}>
											<button className=" h-[59px] text-left  relative">
												{item.title}
											</button>
											{item.title !== activeIndex ? (
												<img
													src={Plus} // Use the imported SVG file as the source
													alt="plus icon"
													onClick={() => onItemClick(item.title)}
													className="h-8 w-8"
												/>
											) : (
												<img
													src={Minus} // Use the imported SVG file as the source
													alt="minus icon"
													onClick={() => onItemClick("")}
													className="h-8 w-8"
												/>
											)}
										</h2>
										{item.title === activeIndex && (
											<div
												className={`accordion-content font-[400] font-['calibri'] text-[18px] text-[#00778B] p-[20px] `}>
												{item.discription}
											</div>
										)}
									</div>
								))}
							</div>
							<div className="w-[571px]">
								{data.slice(3, 6).map((item, index) => (
									<div
										key={index}
										className="w-[573px] border-solid border-silver border-[1px] mb-5">
										<h2
											className={`${
												item.title === activeIndex
													? "bg-darkslategray-300 text-white"
													: "bg-ghostwhite text-darkslategray-300"
											}   font-[700] text-[24px] flex justify-between items-center px-[18px]`}>
											<button className=" h-[59px] text-left px-[18px] relative">
												{item.title}
											</button>
											{item.title !== activeIndex ? (
												<img
													src={Plus}
													alt="plus icon"
													onClick={() => onItemClick(item.title)}
													className="h-8 w-8"
												/>
											) : (
												<img
													src={Minus}
													alt="minus icon"
													onClick={() => onItemClick("")}
													className="h-8 w-8"
												/>
											)}
										</h2>
										{item.title === activeIndex && (
											<div
												className={`accordion-content font-[400] font-['calibri'] text-[18px] text-[#00778B] p-[20px] `}>
												{item.discription}
											</div>
										)}
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="flex relative ">
				<img
					className="absolute left-[300px] top-[50px] z-[999]"
					src="../assets/img/pngwing 3.png"
				/>
				<div className="absolute w-[843px] h-[173px] border solid 1px top-[145px] left-[550px] flex flex-col justify-center gap-y-[15px] ">
					<h3 className="font-[700] text-[32px] ml-[200px]">
						Ready to commence your journey towards{" "}
						<span className="text-[#00778B]">sustainability?</span>
					</h3>
					<button className="w-[168px] h-[40px] ml-[200px] bg-secondary-button text-white rounded-[4px]">
						Enroll Now
					</button>
				</div>
			</section>

			<Footer />
		</div>
	);
}

export default Home;
