import ErrorMessage from "@/components/comman/Error/ErrorMessage";
import Loading from "@/components/comman/Error/Loading";
import PasswordInput from "@/components/comman/Input/Password";
import Header from "@/components/Header";
import { InputWithLable } from "@/components/ui/inputwithlable";
import { useToast } from "@/components/ui/use-toast";
import { setUserData } from "@/redux/reducer/CompanyReducer";
import { Login } from "@/services/apiServices/authService";
import { ErrorType } from "@/types/Errors";
import { UserRole } from "@/types/UserRole";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

function Auth() {


	const { toast } = useToast();

	const dispatch = useDispatch();

	const navigate = useNavigate()



	const schema = z.object({
		email: z
			.string()
			.min(1, "Email is required")
			.email("Please enter a valid email"),
		password: z
			.string({
				required_error: "Password is required",
			})

	});


	const { mutate: login_user, isPending: loginPanding } = useMutation({
		mutationFn: Login,
		onSuccess: (data) => {
			const user = data.data.data.query;
			if (user.role === UserRole.SuperAdmin) {
				toast({
					variant: "destructive",
					title: "User Not found",
				});
				return;
			}

			toast({
				title: "Login Successfully",
			});

			dispatch(setUserData(user));
			localStorage.setItem("token", data.data.data.accessToken);
			navigate("/");
		},
		onError: (error: ErrorType) => {
			toast({
				variant: "destructive",
				title: error.data.message,
			});
		},
	});



	type ValidationSchema = z.infer<typeof schema>;
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ValidationSchema>({
		resolver: zodResolver(schema),
		mode: "all",
	});


	const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
		login_user(data);

	};


	return (
		<>
			<Header />
			<div className="flex mt-[26px]">
				<div className="relative">
					<img className="w-[686px] h-[900px]" src="../assets/img/Image.png" />

					<img
						className="absolute top-[137px] left-[220px]  w-[234px] h-[365px]"
						src="../assets/img/pngwing.png"
					/>
					<img
						className="absolute top-[558px] left-[86px] w-[514px] h-[184px]"
						src="../assets/img/Multi.png"
					/>
				</div>

				<div className="relative">
					<ul className="absolute w-[212px] text-[14px] text-[#042937] top-[11px] left-[380px]">
						<li>
							Don’t have an account? <a className="font-[700]">Sign Up</a>
						</li>
					</ul>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="relative LoginBox w-[418px] h-[463px] ml-[120px] mt-[112px] rounded-[10px] shadow-[_0px_0px_4px_0px_rgba(0,0,0,0.25)] p-[24px]">
							<p className="text-[24px] font-[700] ">Login</p>
							<InputWithLable
								className="w-full h-[52px] mt-2 bg-white"
								placeholder="Enter Username"
								{...register("email")}
							/>
							{errors.email && (
								<ErrorMessage message={errors.email.message as string} />
							)}
							<PasswordInput
								className="w-full h-[52px] mt-2 bg-white"
								placeholder="Password"
								validationHandler={register("password")}
							/>
							<ul className="mt-[24px]">
								<li>
									<a>Forgot password?</a>
								</li>
							</ul>
							<button type="submit" className=" bg-primary-button rounded w-[370px] h-[48px] text-white mt-[32px]">
								Login
							</button>

							<div className="absolute top-[350px] left-0 w-full flex items-center justify-center">
								<div className="w-1/3 h-px bg-[#DCDCDC]"></div>
								<div className="px-4 text-[#898989]">or</div>
								<div className="w-1/3 h-px bg-[#DCDCDC]"></div>
							</div>
							<div className="relative">
								<button className="w-[173px] mt-[50px] h-[48px] rounded-[6px] shadow-[_0px_0px_4px_0px_rgba(0,0,0,0.25)]">
									<img
										className="absolute left-[35px] top-[67px]"
										src="../assets/img/googlelogo.png"
									/>
									Google
								</button>
								<button className="w-[173px] ml-[23px] mt-[50px] h-[48px] rounded-[6px] shadow-[_0px_0px_4px_0px_rgba(0,0,0,0.25)]">
									<img
										className="absolute left-[222px] top-[66px]"
										src="../assets/img/fblogo.png"
									/>
									Facebook
								</button>
							</div>
						</div>
					</form>
					<div>
						<ul className="w-[370px] h-[30px] text-[12px] font-[400] absolute top-[800px] left-[180px]">
							<li>
								Protected by reCAPTCHA and subject to the Skillnet{" "}
								<a className="text-[#042937] ">Privacy Policy </a> and{" "}
								<a className="text-[#042937] ">Terms of Service.</a>
							</li>
						</ul>
					</div>
				</div>
				<Loading isLoading={loginPanding} />
			</div>
		</>
	);
}

export default Auth;
