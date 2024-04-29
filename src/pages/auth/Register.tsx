import Header from "@/components/Header";
import { PrimaryButton } from "@/components/comman/Button/CustomButton";
import ErrorMessage from "@/components/comman/Error/ErrorMessage";
import Loading from "@/components/comman/Error/Loading";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { InputWithLable } from "@/components/ui/inputwithlable";
import { useToast } from "@/components/ui/use-toast";
import { QUERY_KEYS } from "@/lib/constants";
import { setCompanyData } from "@/redux/reducer/CompanyReducer";
import { checkOTP, createCompany } from "@/services/apiServices/company";
import { Company } from "@/types/Company";
import { ErrorType } from "@/types/Errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { z } from "zod";

function Register() {
	const [selectedRole, setSelectedRole] = useState<any>(null);
	const [showOtpPopup, setShowOtpPopup] = useState(false);
	const [otp, setOtp] = useState("");
	const [showRegistrationForm, setShowRegistrationForm] = useState(false);

	const queryClient = useQueryClient();

	const { toast } = useToast();

	const navigate = useNavigate();

	const dispatch = useDispatch();

	const { mutate: createcompany, isPending: createPending } = useMutation({
		mutationFn: (company: Company) => createCompany(company),
		onSuccess: async (data) => {
			dispatch(setCompanyData(data?.data?.data?.user.id));
			setShowOtpPopup(true);
			await queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.companyList],
			});
		},
		onError: (error: ErrorType) => {
			toast({
				variant: "destructive",
				title: error.data.message,
			});
		},
	});

	const { mutate: createotp, isPending: createOtp } = useMutation({
		mutationFn: (company: any) => checkOTP(company),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.companyList],
			});

			navigate("/assessment");
		},
		onError: (error: ErrorType) => {
			toast({
				variant: "destructive",
				title: error.data.message,
			});
		},
	});

	const schema = z.object({
		name: z.string().min(1, { message: "Please enter company name" }),
		email: z.string().min(1, { message: "Please enter email" }),
		password: z.string().min(1, { message: "Please enter password" }),
		cpassword: z.string().min(1, { message: "Please enter confirm password" }),
	});

	type ValidationSchema = z.infer<typeof schema>;
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm<ValidationSchema>({
		resolver: zodResolver(schema),
		mode: "all",
	});

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

	const onSubmit: SubmitHandler<ValidationSchema> = async (data: any) => {
		createcompany(data);
	};

	const handleVerifyOtp = () => {
		createotp({ otp: otp, email: getValues("email") });
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

								<form onSubmit={handleSubmit(onSubmit)}>
									<InputWithLable
										label="Company Name"
										className="w-[500px] h-[46px] border solid 1.5px"
										{...register("name")}
									/>
									{errors.name && (
										<ErrorMessage message={errors.name.message as string} />
									)}

									<InputWithLable
										label="Email"
										className="w-[500px] h-[46px] border solid 1.5px"
										{...register("email")}
									/>
									{errors.email && (
										<ErrorMessage message={errors.email.message as string} />
									)}

									<div className="flex flex-wrap gap-x-[20px]">
										<InputWithLable
											label="Set a password"
											className="w-[240px] h-[46px] border solid 1.5px"
											{...register("password")}
										/>
										{errors.password && (
											<ErrorMessage
												message={errors.password.message as string}
											/>
										)}

										<InputWithLable
											label="Confirm Password"
											className="w-[240px] h-[46px] border solid 1.5px"
											{...register("cpassword")}
										/>
										{errors.cpassword && (
											<ErrorMessage
												message={errors.cpassword.message as string}
											/>
										)}
									</div>

									<div className=" mt-[20px] flex gap-x-[40px]">
										<button
											type="submit"
											className="w-[480px] h-[48px] bg-[#00778B] rounded-[4px] text-white">
											Get OTP
										</button>
									</div>
								</form>
							</div>
						</div>
					) : (
						<div className="w-[700px]">
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
						<button onClick={() => setShowOtpPopup(false)}>x</button>
						<h2 className="text-xl font-semibold">
							Please enter the one-time password to verify your account
						</h2>
						<p className="text-[#848181] text-[16px]">
							A one-time password has been sent to info@evergrow.com
						</p>
						<div className="flex justify-center gap-3">
							<InputOTP
								maxLength={6}
								onChange={(e) => {
									setOtp(e);
								}}>
								<InputOTPGroup>
									<InputOTPGroup>
										<InputOTPSlot index={0} />
										<InputOTPSlot index={1} />
										<InputOTPSlot index={2} />
										<InputOTPSlot index={3} />
										<InputOTPSlot index={4} />
										<InputOTPSlot index={5} />
									</InputOTPGroup>
								</InputOTPGroup>
							</InputOTP>
						</div>
						<button
							className="text-white w-[181px] p-[10px] rounded-[10px]  bg-[#64A70B] h-[50px] mt-6 rounded-600"
							onClick={() => handleVerifyOtp()}>
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

			<Loading isLoading={createPending || createOtp} />
		</div>
	);
}

export default Register;
