import Footer from "@/components/Footer";
import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Plus from "../../public/assets/img/Plus.png";
import Minus from "../../public/assets/img/Minus.png";
import { SecondaryButton } from "@/components/comman/Button/PrimaryButton";
import Header from "@/components/Header";
// import Footer from '../../components/Footer/Footer';
import { GrNext, GrPrevious } from "react-icons/gr";
import Symbol from "@/components/comman/symbol/Symbol";
import Logo from "@/components/comman/logo/Logo";
import SliderData from "@/components/comman/SliderData/SliderData";

function Home() {
	const [activeIndex, setActiveIndex] = useState(null);

	const onItemClick = (index: any) => {
		setActiveIndex(index === activeIndex ? null : index);
	};

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		prevArrow: (
			<div className="hidden sm:block">
				<GrPrevious />
			</div>
		),
		nextArrow: (
			<div className="hidden sm:block">
				<GrNext />
			</div>
		),
	};

	const data = [
		{
			image: "../assets/img/Tree Planting.png",
			title: "Enviroment",
			discription:
				"Minimize your environmental footprint and promote eco-friendly practices.",
			background: "bg-[#F9F9F9]",
		},
		{
			image: "../assets/img/Neighbour.png",
			title: "Social",
			discription:
				"Create a workplace that fosters social responsibility and inclusivity.",
			background: "bg-[#F9F9F9]",
		},
		{
			image: "../assets/img/Weak Financial Growth.png",
			title: "Economic",
			discription:
				"Achieve financial sustainability while contributing to the local economy.",
			background:
				"bg-gradient-to-r from-white from-44% via-transparent via-30% to-[#ebeaea]",
		},
		{
			image: "../assets/img/Morale.png",
			title: "Governance",
			discription: "Ensure transparent and ethical business practices.",
			background: "bg-[#F1EFEF]",
		},
		{
			image: "../assets/img/Light On.png",
			title: "Technology & Innovation ",
			discription:
				"Embrace innovation to stay ahead in the ever-evolving world of sustainability.",
			background:
				"bg-gradient-to-r from-[#ebeaea] from-44% via-transparent via-30% to-white",
		},
		{
			image: "../assets/img/Path Steps.png",
			title: "Strategic Integration",
			discription:
				"Strategic planning is key to sustainable, resilient foundations.",
			background: "bg-[#F9F9F9]   ",
		},
	];

	return (
		<div className="h-[auto]">
			<Header />
			<section className="">
				<div className="relative mt-[30px] overflow-hidden mx-auto ">
					<img
						className="w-full sm:block hidden"
						src="../assets/img/Component 4.png"
					/>
				</div>
			</section>

			<section>
				<div className="relative flex flex-wrap max-w-full h-[auto] justify-center">
					<div className="sm:block hidden">
						<img src="../assets/img/Rectangle 6.png" />
						<div className="absolute top-[36px] left-[170px] text-white">
							<p className="w-[190px]  font-[400] text-[24px] leading-[112%] font-[UniNeue] tracking-[1px]">
								Start your Sustainability journey with firm foundations
							</p>
							<img
								className="absolute top-[130px] left-[135px] w-[62px] h-[76px]"
								src="../assets/img/Voltage.png"
							/>
						</div>
					</div>
					{data.map((v) => {
						return (
							<div className="sm:min-w-[165px] sm:max-w-[187px] w-full h-[268px]">
								<div
									className={`sm:min-w-[188px] sm:max-w-[193.23px] w-[full] sm:block flex flex-col items-center h-[268px] py-[30px] px-[20px] ${v.background}`}>
									<img
										className="w-[66.56px] h-[74.72px] mb-[10px]"
										src={v.image}
									/>
									<h3 className="font-[700] text-[18px] leading-[20.25px] text-[#00778B] mb-[10px] h-[40px]">
										{v.title}
									</h3>
									<p className=" font-[400] text-[14px] leading-[15.75px] text-[#3A3A3A] sm:text-start text-center">
										{v.discription}
									</p>
								</div>
							</div>
						);
					})}
				</div>
				<div className="sm:hidden  relative flex justify-center mt-[20px]">
					<SecondaryButton
						name="Start your journey"
						symbol={<img src="../assets/img/Move Right.png" />}
						className="w-[200px] h-[50px] flex items-center justify-center gap-[10px]"
					/>
				</div>
			</section>

			<section>
				<div className="max-w-full sm:h-[517px]  bg-[#F7F8FC] mt-[38px] flex items-center justify-center gap-[76px]">
					<div className="md:block hidden relative">
						<img
							className="xl:w-[393px] md:w-[300px] w-[250px] xl:h-[357px] h-[250px]"
							src="../assets/img/Group 1000001820.png"
						/>
						<img
							className="absolute left-[23px] bottom-[2px]"
							src="../assets/img/Voltage.png"
						/>
					</div>

					<div className="md:w-[450px] lg:w-[600px] sm:w-[500px] w-screen sm:p-0 p-[10px] sm:h-[370px] ">
						<Slider {...settings}>
							<div>
								<SliderData />
							</div>
							<div>
								<SliderData />
							</div>
							<div>
								<SliderData />
							</div>
						</Slider>
					</div>
				</div>
			</section>

			<div className="mt-[76px] mb-[24px] max-w-full h-[12px] bg-[#64A70B]"></div>

			<section>
				<div className="sm:ml-[130px] w-[165px] h-[47px] bg-[#C1EF84] rounded-[6px] text-center flex justify-center items-center">
					<p className="font-bold text-[20px] leading-[27px] font-[UniNeue] text-[#4E5566]">
						For Companies
					</p>
				</div>

				<div className="mt-[24px] flex flex-col items-center ">
					<div className="max-w-[800px]">
						<h3 className="sm:text-[32px] text-[16px] font-[800] leading-[112%] traking-[4px] text-center text-[#414655] font-[UniNeue]">
							Is your business seeking to align its sustainability practices
							with Ireland's national goals?
						</h3>
					</div>

					<div className="relative max-w-full flex mt-[40px] sm:gap-[20px] gap-[10px] md:gap-[10px] lg:gap-0 justify-between items-center">
						<div className="flex flex-col gap-[35px] ">
							<div className="md:w-[350px] sm:w-[300px]  sm:h-[180px] h-[250px] w-auto md:h-[150px] bg-[#4C7D0A] rounded-[6px] text-white sm:p-[24px] p-[12px] traking-[-4%]">
								<h3 className="font-bold text-[16px]">
									Comprehensive Sustainability Training
								</h3>
								<p className="text-[14px] leading-[112%] font-[inter]  pt-[8px]">
									Elevate your business with Ireland's green vision through
									comprehensive sustainability learning.
								</p>
							</div>

							<div className="md:w-[350px] sm:w-[300px] sm:h-[180px] h-[250px]  w-auto md:h-[150px] bg-[#4C7D0A] rounded-[6px] text-white sm:p-[24px] p-[12px] traking-[-4%]">
								<h3 className="font-bold text-[16px]">
									{" "}
									Employee Engagement & Development
								</h3>
								<p className="text-[14px] sm:w-[300px] leading-[112%] font-[inter]  pt-[8px]">
									Foster a culture of growth and engagement through
									sustainability-focused professional development.
								</p>
							</div>

							<div className="md:w-[350px] sm:w-[300px] sm:h-[180px] h-[250px] w-auto md:h-[150px] bg-[#4C7D0A] rounded-[6px] text-white sm:p-[24px] p-[12px] traking-[-4%]">
								<h3 className="font-bold text-[16px]">
									Effortless Enrollment and Administration
								</h3>
								<p className="text-[14px] leading-[112%] font-[inter]  pt-[8px]">
									Simplify your sustainability journey with seamless course
									enrollment and management.
								</p>
							</div>
						</div>

						<div className="lg:block hidden">
							<img src="../assets/img/Group 177.png" />
						</div>

						<div className="flex flex-col  gap-[35px]">
							<div className="md:w-[350px] sm:w-[300px] sm:h-[180px] h-[250px] w-auto md:h-[150px] bg-[#4C7D0A] rounded-[6px] text-white sm:p-[24px] p-[12px] traking-[-4%]">
								<h3 className="font-bold text-[16px]">
									Flexible Learning Paths for Businesses
								</h3>
								<p className="text-[14px] leading-[112%] font-[inter]  pt-[8px]">
									Embrace adaptive learning for continuous sustainability growth
									across your organisation.
								</p>
							</div>

							<div className="md:w-[350px] sm:w-[300px] sm:h-[180px] h-[250px] w-auto md:h-[150px]  bg-[#4C7D0A] rounded-[6px] text-white sm:p-[24px] p-[12px] traking-[-4%]">
								<h3 className="font-bold text-[16px]">
									{" "}
									Reputation & Trust Building
								</h3>
								<p className="text-[14px] leading-[112%] font-[inter]  pt-[8px]">
									Elevate your brand with a reputation for genuine
									sustainability commitment.
								</p>
							</div>

							<div className="md:w-[350px] sm:w-[300px] sm:h-[180px] h-[250px] w-auto md:h-[150px] bg-[#4C7D0A] rounded-[6px] text-white sm:p-[24px] p-[12px] traking-[-4%]">
								<h3 className="font-bold text-[16px]">
									Promotion of Sustainable Business Practices
								</h3>
								<p className="text-[14px] leading-[112%] font-[inter]  pt-[8px]">
									Lead the sustainability charge with innovative practices that
									inspire industry and community.
								</p>
							</div>
						</div>
					</div>
					<button className="w-[249px] h-[59px] mt-[49px] rounded-[4px] border border-solid border-black 1px flex justify-center items-center gap-[10px] hover:bg-[#c4c4c4]">
						Get Started
						<img className="" src="../assets/img/Move Right Dark.png" />
					</button>
				</div>

				<div className="max-w-[1260px]  mt-[56px] m-[auto]">
					<div className=" w-[250px] h-[55px] bg-[#C1EF84] rounded-[6px] flex justify-center items-center ">
						<p className="font-[700] text-[24px] leading-[112%] font-[UniNeue] traking-[-4%] text-[#4E5566] ">
							For Training Partners
						</p>
					</div>

					<div className="text-center flex flex-wrap sm:justify-normal justify-center mt-[27px]">
						<h3 className="font-[700] sm:text-[24px] text-[16px] w-[256px] text-center font-[UniNeue] text-[#373c48]">
							Sustainability platform needs you.
						</h3>
						<div className="flex justify-center lg:justify-normal  gap-[39px] mt-[40px] flex-wrap gap-y-[83px] font-[uni_neue]">
							<div className="flex sm:w-[374px] w-[300px]  gap-[20px] relative text-start">
								<img
									className="w-[56px] h-[56px]"
									src="../assets/img/Ellipse 62.png"
								/>
								<img
									className="absolute top-[10px] left-[10px] "
									src="../assets/img/Satellites.png"
								/>
								<div className="">
									<h3>Market Reach</h3>
									<p className="mt-[8px] text-[#4E5566] leading-[112%] text-[14px] traking-[-4%]">
										Enhance economy of scale by developing training solutions
										tailored to market demands.
									</p>
								</div>
							</div>
							<div className="flex sm:w-[374px] w-[300px] gap-[20px] relative  text-start">
								<img
									className="w-[56px] h-[56px]"
									src="../assets/img/Ellipse 62.png"
								/>
								<img
									className="absolute top-[10px] left-[10px] "
									src="../assets/img/Class (1).png"
								/>
								<div className="w-[298px] h-[36px]">
									<h3>Enhanced Visibility</h3>
									<p className="mt-[8px] text-[#4E5566] leading-[112%] text-[14px] traking-[-4%]">
										Showcase your expertise to potential clients and learners
										through our dedicated training provider directory.
									</p>
								</div>
							</div>
							<div className="flex sm:w-[374px] w-[300px] gap-[20px] relative  text-start">
								<img
									className="w-[56px] h-[56px]"
									src="../assets/img/Ellipse 62.png"
								/>
								<img
									className="absolute top-[10px] left-[10px] "
									src="../assets/img/People Working Together (1).png"
								/>
								<div className="w-[298px] h-[36px]">
									<h3>Collaborative Ecosystem</h3>
									<p className="mt-[8px] text-[#4E5566] leading-[112%] text-[14px] traking-[-4%]">
										Engage with like-minded trainers, share insights, and
										explore collaborative opportunities within our community.
									</p>
								</div>
							</div>
							<div className="flex sm:w-[374px] w-[300px] gap-[20px] relative  text-start">
								<img
									className="w-[56px] h-[56px]"
									src="../assets/img/Ellipse 62.png"
								/>
								<img
									className="absolute top-[10px] left-[10px] "
									src="../assets/img/E-Learning (2).png"
								/>
								<div className="w-[298px] h-[36px]">
									<h3>Cutting-edge Technology</h3>
									<p className="mt-[8px] text-[#4E5566] leading-[112%] text-[14px] traking-[-4%]">
										Leverage our advanced learning management system for
										seamless course delivery and management.
									</p>
								</div>
							</div>
							<div className="flex sm:w-[374px] w-[300px] gap-[20px] relative  text-start">
								<img
									className="w-[56px] h-[56px]"
									src="../assets/img/Ellipse 62.png"
								/>
								<img
									className="absolute top-[10px] left-[10px] "
									src="../assets/img/Website Analytics (1).png"
								/>
								<div className="w-[298px] h-[36px]">
									<h3>Comprehensive Analytics</h3>
									<p className="mt-[8px] text-[#4E5566] leading-[112%] text-[14px] traking-[-4%]">
										Gain valuable insights into learner performance and course
										effectiveness to refine your training strategies.
									</p>
								</div>
							</div>
						</div>

						<div className="font-[500] sm:text-[24px] text-[16px] font-[UniNeue] leading-[112%] pl-[92px] pr-[90px] pt-[120px] ">
							<h3 className="tracking-[-4%] ">
								Be a catalyst for change! Partner with us and contribute to a
								sustainable future through impactful training initiatives.
								<span className="text-[#64A70B]">
									Ready to Transform Sustainability Training?{" "}
								</span>
							</h3>
						</div>
						<div className=" w-full flex justify-center mt-[40px]">
							<SecondaryButton
								name="Register me"
								symbol={<Symbol />}
								className="w-[169px] h-[44px] bg-[#64A70B]  text-white rounded-[4px]  flex items-center justify-center gap-[10px] hover:bg-[green]"></SecondaryButton>
						</div>
					</div>
				</div>
			</section>

			<section>
				<div className="h-[auto] bg-[#F7F8FC] pt-[40px] mt-[80px]">
					<div className="lg:ml-[171px] font-[700] text-[32px] relative">
						<h3 className="sm:text-[32px] text-[24px] leading-[112%] traking-[-4%] font-[700] font-[calibri]  text-[#3A3A3A]">
							Our Building Blocks{" "}
						</h3>
						<div className="max-w-[450px] border-solid border-[3px] border-redius rounded-full border-secondary-button mt-[16px] hover:border-[#00778B]"></div>
						<img
							className="absolute top-[4px] sm:left-[318px] left-[270px]"
							src="../assets/img/Ellipse 31.png"
						/>
						<div className="absolute top-[-11px] sm:left-[320px] left-[270px] w-[31px] h-[30px] border border-solid border-gray-600 rounded-full"></div>

						<div className="flex flex-wrap justify-center gap-8 mt-[45px]">
							<div className="w-[571px]">
								{data.slice(0, 3).map((item, index) => (
									<div
										key={index}
										className="max-w-[573px] border-solid border-silver border-[1px] mb-5">
										<h2
											className={`${
												item.title === activeIndex
													? "bg-darkslategray-300 text-white"
													: "bg-ghostwhite text-darkslategray-300"
											}   font-[700] sm:text-[24px] text-[18px] flex justify-between items-center px-[18px]`}>
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
										className="max-w-[573px] border-solid border-silver border-[1px] mb-5">
										<h2
											className={`${
												item.title === activeIndex
													? "bg-darkslategray-300 text-white"
													: "bg-ghostwhite text-darkslategray-300"
											}   font-[700] sm:text-[24px] text-[18px] flex justify-between items-center px-[18px]`}>
											<button className=" h-[59px] text-left  relative">
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

			<section className="md:flex relative ">
				<img
					className="absolute left-[300px] top-[50px] z-[999] lg:block hidden"
					src="../assets/img/pngwing 3.png"
				/>
				<div className="absolute md:w-[843px]  h-[173px]  lg:border solid 1px border-[#B9B9B9] md:top-[145px] top-[80px] lg:left-[550px] lg:block flex flex-col items-center justify-center sm:p-0 p-[20px]">
					<div className="w-[622px] ml-[270px]">
						<h3 className="font-[700] md:text-[32px] text-[18px]  leading-[112%] traking-[-4%] font-[calibri] lg:pt-[13px] ">
							Ready to commence your journey towards{" "}
							<span className="text-[#00778B]">sustainability?</span>
						</h3>
						<SecondaryButton
							name="Enroll Now"
							className="w-[168px] h-[40px]  font-[700] text-white rounded-[4px] mt-[23px] hover:bg-[green]"></SecondaryButton>
					</div>
				</div>
			</section>

			<div className="md:mt-[500px] mt-[250px]">
				<Footer />
			</div>
		</div>
	);
}

export default Home;
