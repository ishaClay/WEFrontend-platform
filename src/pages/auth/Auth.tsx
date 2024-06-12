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
			.min(1, "Email is required"),
		// .email("Please enter a valid email"),
		password: z
			.string().min(1,{message: "Password is required",})
		// 	{
		// 		required_error: "Password is required",
		// 	}
		
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

			dispatch(setUserData(user.id));
			localStorage.setItem("token", data.data.data);
			navigate("/savedassesment");
		},
		onError: (error: ErrorType) => {
			console.log(error)
			toast({
				// variant: "destructive",
				// title: error.data.message,



				// variant: "error",
				title: "Error",
				description: "Something went wrong",
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
					<img className="xl:w-[686px] w-[500px] h-[900px]" src="../assets/img/Image.png" />

					<img
						className="absolute top-[137px] xl:left-[220px] left-[150px] w-[234px] h-[365px]"
						src="../assets/img/pngwing.png"
					/>
					<img
						className="absolute top-[558px] xl:left-[86px] left-[40px] xl:w-[514px] w-[450px] h-[184px]"
						src="../assets/img/Multi.png"
					/>
				</div>

				<div className="relative">
					<ul className="absolute w-[212px] text-[14px] text-color top-[11px] 2xl:left-[380px] xl:left-[320px] left-[250px]">
						<li>
							Don’t have an account? <a className="font-[700]">Sign Up</a>
						</li>
					</ul>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="relative LoginBox w-[418px] h-[463px] 2xl:ml-[120px] xl:ml-[60px] ml-[40px] mt-[112px] rounded-[10px] shadow-[_0px_0px_4px_0px_rgba(0,0,0,0.25)] p-[24px]">
							<p className="text-[24px] font-[700] text-color">Login</p>
							<InputWithLable
								className="w-full h-[52px] mt-2 secondary-background"
								placeholder="Enter Username"
								{...register("email")}
							/>
							{errors.email && (
								<ErrorMessage message={errors.email.message as string} />
							)}
							<PasswordInput
								className="w-full h-[52px] mt-2 secondary-background"
								placeholder="Password"
								validationHandler={register("password")}
							/>
							{errors.password && (
								<ErrorMessage message={errors.password.message as string} />
							)}
							<ul className="mt-[24px] text-color">
								<li>
									<a>Forgot password?</a>
								</li>
							</ul>
							<button type="submit" className="primary-background rounded w-[370px] h-[48px] secondary-text mt-[32px]">
								Login
							</button>

							<div className="absolute top-[325px] left-0 w-full flex items-center justify-center">
								<div className="w-1/3 h-px bg-[#DCDCDC]"></div>
								<div className="px-4 text-[#898989]">or</div>
								<div className="w-1/3 h-px bg-[#DCDCDC]"></div>
							</div>
							<div className="relative">
								<button className="w-[173px] mt-[50px] h-[48px] rounded-[6px] shadow-[_0px_0px_4px_0px_rgba(0,0,0,0.25)] text-color">
									<img
										className="absolute left-[35px] top-[67px]"
										src="../assets/img/googlelogo.png"
									/>
									Google
								</button>
								<button className="w-[173px] ml-[23px] mt-[50px] h-[48px] rounded-[6px] shadow-[_0px_0px_4px_0px_rgba(0,0,0,0.25)] text-color">
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
						<ul className="w-[370px] h-[30px] text-[12px] font-[400] absolute bottom-[48px] 2xl:left-[150px] xl:left-[90px] left-[70px]">
							<li className="text-[#898989]">
								Protected by reCAPTCHA and subject to the Skillnet{" "}
								<a className="text-color">Privacy Policy </a> and{" "}
								<a className="text-color">Terms of Service.</a>
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
