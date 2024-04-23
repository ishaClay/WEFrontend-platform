import Header from "@/components/Header";
import { PrimaryButton } from "@/components/comman/Button/PrimaryButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

function Register() {
	const [selectedRole, setSelectedRole] = useState<any>(null);
	const [showOtpPopup, setShowOtpPopup] = useState(false);
	const [otpValue, setOtpValue] = useState<any>("");
	const [showRegistrationForm, setShowRegistrationForm] = useState(false);

	const navigate = useNavigate();
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		cssEase: "linear",
	};

	const handleLaunchJourney = () => {
		setShowRegistrationForm(true);
	};

	const handleOtpSubmit = () => {
		setShowOtpPopup(false);
		navigate("/assessment");
	};

	return (
		<div className="">
			<Header />
			<div className="flex mt-[26px]">
				<img src="../assets/img/1000001825.png.png" />

				<div className="w-[694px]">
					<div className="flex justify-end mr-[90px]">
						<label>
							Already have an account?
							<a className="text-[#042937] font-[700]"> Sign In</a>
						</label>
					</div>

					{selectedRole !== "company" ? (
						<div className="w-[600px] h-[524px] relative">
							<div className="mt-[145px] ml-[91px]">
								<h3 className="font-[UniNeue] text-[24px] font-[700]">
									Choose your role...
								</h3>
								<img
									className="absolute right-[5px] top-[15px]"
									src="../assets/img/pngwing 25.png"
								/>
								<p className="mb-0 font-[calibri] text-[18px] text-[#332626]">
									Hey there! Ready to start your adventure?
								</p>
								<img className="" src="../assets/img/Line 23.png" />
								<p className="w-[446px] h-[40px] text-[16px] font-[400] font-[calibri] text-[#332626]">
									Just click on your role “Company or Trainer” and let's drive
									into your journey!
								</p>
								<div className="flex gap-x-[40px] mt-[40px]">
									<PrimaryButton
										name="Trainer"
										onClick={() => {
											navigate("/trainer");
										}}
										className="w-[198px] h-[72px]  flex items-center justify-center gap-[8px] "
										symbol={<img src="../assets/img/Analyzing Skill.png" />}
									/>

									<PrimaryButton
										name="Company"
										onClick={() => {
											setSelectedRole("company");
										}}
										className="w-[198px] h-[72px]  flex items-center justify-center gap-[8px]"
										symbol={<img src="../assets/img/Company.png" />}
									/>
								</div>
							</div>
						</div>
					) : showRegistrationForm ? (
						<div className="w-[600px] ">
							<div className="w-[500px] h-[524px] relative mt-[142px] ml-[91px]">
								<h3>Secure your berth & set sail</h3>
								<img
									className="absolute right-0 top-[-20px]"
									src="../assets/img/pngwing 25.png"
								/>
								<img className="" src="../assets/img/Line 23.png" />
								<p className="w-[530px] h-[80px] text-[16px] font-[400]">
									Enter your company name eamil and set a password to anchor
									your details. submit to receive an OTP, steering you towards
									the next leg of your sustainable journey.
								</p>
								<label>Company name</label>
								<input className="w-[500px] h-[46px] border solid 1.5px" />
								<label>Email</label>
								<input className="w-[500px] h-[46px] border solid 1.5px" />

								<div className="flex flex-wrap gap-x-[20px]">
									<label className="w-[250px]">Set a password</label>
									<label>confirm Password</label>
									<input className="w-[240px] h-[46px] border solid 1.5px" />

									<input className="w-[240px] h-[46px] border solid 1.5px" />
								</div>

								<div className=" mt-[20px] flex gap-x-[40px]">
									<button
										onClick={() => setShowOtpPopup(true)}
										className="w-[480px] h-[48px] bg-[#00778B] rounded-[4px] text-white">
										Get OTP
									</button>
								</div>
							</div>
						</div>
					) : (
						<div className="w-[700px] ">
							<div className="w-[600px] h-[524px] relative mt-[142px] ml-[91px]">
								<h3 className="font-[700] text-[24px] font-[UniNeue]">
									Setting sail on your sustainability voyage
								</h3>
								<img
									className="absolute right-[100px] top-[-5px]"
									src="../assets/img/pngwing 25.png"
								/>
								<img className="" src="../assets/img/Line 23.png" />
								<p>
									just a few quick details - your company's name, email, and a
									new password- and you'll be all set to navigate through your
									sustainable and continue your impactful journey anytime.
								</p>

								<div className=" mt-[20px] flex gap-x-[40px] font-[700]">
									<button
										className="w-[300px] h-[40px] bg-[#00778B] rounded-[4px] text-white"
										onClick={handleLaunchJourney}>
										Launch your journey!
									</button>
								</div>
							</div>
						</div>
					)}

					<div className="ml-[116px] flex gap-x-[19px]">
						<div>
							<img className="" src="../assets/img/Group 1000001825.png" />
						</div>
						<Slider className="w-[381px] h-[44px]" {...settings}>
							<div>
								<span>
									“Small choices, big impact. Ripples of eco-friendly actions
									shape a{" "}
									<span className="text-[#64A70B]">sustainable future</span>”
								</span>
							</div>
							<div>
								<span>
									“Small choices, big impact. Ripples of eco-friendly actions
									shape a{" "}
									<span className="text-[#64A70B]">sustainable future</span>”
								</span>
							</div>
							<div>
								<span>
									“Small choices, big impact. Ripples of eco-friendly actions
									shape a{" "}
									<span className="text-[#64A70B]">sustainable future</span>”
								</span>
							</div>
						</Slider>
					</div>

					<div className="w-[296px] h-[30px] font-[400] text-[12px] mt-[154px] ml-[180px] text-center text-[#898989]">
						<label>
							Protected by reCAPTCHA and subject to the Skillnet{" "}
							<a className="text-[#042937]">Privacy Policy</a> and{" "}
							<a className="text-[#042937]">Terms of Service.</a>
						</label>
					</div>
				</div>
			</div>

			{showOtpPopup && (
				<div className="fixed inset-0 flex items-center text-center justify-center ml-[500px] mb-[100px]">
					<div className="fixed inset-0 bg-black opacity-50"></div>

					<div className="bg-white p-6 rounded-lg relative z-10">
						<h2 className="text-xl font-semibold">
							Please enter the one-time password to verify your account
						</h2>
						<p className="text-[#848181] text-[16px]">
							A one-time password has been sent to info@evergrow.com
						</p>
						<div className="flex justify-center gap-3">
							{[...Array(6)].map((_, index) => (
								<input
									key={index}
									type="text"
									maxLength={1}
									className="border-b border-[#939191] px-3 py-2  w-10 text-center"
									value={otpValue[index] || ""}
									onChange={(e) => {
										const newOtpValue = [...otpValue];
										newOtpValue[index] = e.target.value;
										setOtpValue(newOtpValue);
									}}
								/>
							))}
						</div>
						<button
							className="text-white w-[181px] p-[10px] rounded-[10px]  bg-[#64A70B] h-[50px] mt-6 rounded-600"
							onClick={handleOtpSubmit}>
							Validate
						</button>
						<ul className="text-[#848181] text-[16px] font-[700] mt-[15px]">
							<a>Resend OTP</a>
						</ul>
						<ul className="text-[#369FFF] text-[16px] mt-[12px]">
							<a>Wrong Email?</a>
						</ul>
					</div>
				</div>
			)}
		</div>
	);
}

export default Register;
