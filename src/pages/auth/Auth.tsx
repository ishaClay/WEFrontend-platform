import ErrorMessage from "@/components/comman/Error/ErrorMessage";
import Loading from "@/components/comman/Error/Loading";
import PasswordInput from "@/components/comman/Input/Password";
import Header from "@/components/Header";
import { InputWithLable } from "@/components/ui/inputwithlable";
import { useToast } from "@/components/ui/use-toast";
import {
  // setClientId,
  setCompanyId,
  setUserData,
} from "@/redux/reducer/CompanyReducer";
import { Login } from "@/services/apiServices/authService";
import { ErrorType } from "@/types/Errors";
import { UserRole } from "@/types/UserRole";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

function Auth() {
  const { toast } = useToast();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const schema = z.object({
    email: z.string().min(1, "Email is required"),
    // .email("Please enter a valid email"),
    password: z.string().min(1, { message: "Password is required" }),
    // 	{
    // 		required_error: "Password is required",
    // 	}
  });

  type ValidationSchema = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(schema),
    mode: "all",
  });

  const { mutate: login_user, isPending: loginPanding } = useMutation({
    mutationFn: Login,
    onSuccess: (data) => {
      const user = data.data.data.query;
      console.log(data.data.data, "data+++++");
      dispatch(setCompanyId(data.data.data.query.detailsid));
      // dispatch(setClientId(data.data.data.query.clientid));

      if (data.data.data.status === "Inactive") {
        navigate("/resetpassword", {
          state: {
            oldPassword: getValues("password"),
            email: getValues("email"),
            status: data?.data?.data?.status || "",
            token: data?.data?.data?.accessToken || "",
          },
        });
        toast({});
        dispatch(setUserData(user.id));
      } else {
        // dispatch(setUserData(user.id));
        // localStorage.setItem("token", data.data.data.accessToken);

        // localStorage.setItem("user", JSON.stringify(data.data.data));
        // navigate("/savedassesment");
      dispatch(setUserData(user.id));

        // toast({
        //   title: "Login Successfully",
        // });

        if (user.role == UserRole.SuperAdmin) {
          toast({
            variant: "destructive",
            title: "User Not found",
          });
        }

        if (user.role == UserRole.TrainerCompany) {
          if (data.data.data.status === "Active") {
            navigate("/trainer/enrolledcourses");
          }
        }

        if (user.role == UserRole.Client) {
            toast({
              variant: "default",
              title: "Only Company, Trainer Company and Trainee can login",
            });
        }

        if (user.role == UserRole.Company) {
          toast({
            title: "Login Successfully",
          });

          dispatch(setUserData(user.id));

          console.log("user.pathstatus", user.pathstatus);

          // if (user.role == UserRole.Company) {
            // console.log(user.pathstatus ===)
            if(user.pathstatus === "0" || user.pathstatus === "1") {
              navigate("/assessment");
            }else if(user.pathstatus === "2") {
              navigate("/question");              
            }else if(user.pathstatus === "3") {
              navigate("/teaserscore");
            }else if(user.pathstatus === "4") {
              navigate("/companyregister");
            }else if(user.pathstatus === "5") {
              navigate("/maturelevel");
            }else if(user.pathstatus === "6") {
              navigate("/selectlevel");
            }else if(user.pathstatus === "7") {
              navigate("/maturitylevelactionitem");
            }else if(user.pathstatus === "8") {
              navigate("/dashbord");
              localStorage.setItem("user", JSON?.stringify(data.data.data))
            }else {
              navigate("/savedassesment");
            }
          // }
        }
      }
    },
    onError: (error: ErrorType) => {
      console.log(error);
      toast({
        // variant: "destructive",
        // title: error.data.message,

        // variant: "error",
        title: "Error",
        description: "Something went wrong",
      });
    },
  });

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    login_user(data);
  };

  return (
    <>
      <Header />
      <div className="mainContailner">
        <div className="flex mt-[26px]">
          <div className="relative">
            <img className="max-w-full" src="../assets/img/Image.png" />

            <img
              className="absolute top-[137px] left-1/2 -translate-x-1/2 max-h-[365px] h-auto"
              src="../assets/img/pngwing.png"
            />
            <h2 className="absolute xl:bottom-[90px] bottom-[40px] left-1/2 -translate-x-1/2 text-white xl:text-[36px] text-[26px] xl:max-w-[505px] max-w-[400px] xl:leading-[46px] leading-[36px] w-full">
              <span className="text-[#73AF26]">Empower</span> your potential
              through our comprehensive training programs, where knowledge meets
              innovation
            </h2>
          </div>

          <div className="w-full 2xl:px-0 px-5 max-w-[515px] mx-auto relative">
            <div className="flex justify-end text-color">
              <label>
                Already have an account?{" "}
                <Link to={"/register"} className="font-[700] text-[#042937]">
                  Sign In
                </Link>
              </label>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="relative LoginBox max-w-[418px] mx-auto h-[463px] mt-[40px] rounded-[10px] shadow-[_0px_0px_4px_0px_rgba(0,0,0,0.25)] p-[24px]">
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
                <button
                  type="submit"
                  className="primary-background rounded w-[370px] h-[48px] secondary-text mt-[32px]"
                >
                  Login
                </button>

                <div className="w-full flex items-center justify-center">
                  <div className="w-1/3 h-px bg-[#DCDCDC]"></div>
                  <div className="px-4 text-[#898989]">or</div>
                  <div className="w-1/3 h-px bg-[#DCDCDC]"></div>
                </div>
                <div className="flex items-center justify-center gap-4 mt-[24px]">
                  <button className="relative w-[173px] h-[48px] rounded-[6px] shadow-[_0px_0px_4px_0px_rgba(0,0,0,0.25)] text-color">
                    <img
                      className="absolute left-[35px] top-1/2 -translate-y-1/2"
                      src="../assets/img/googlelogo.png"
                    />
                    Google
                  </button>
                  <button className="relative w-[173px] h-[48px] rounded-[6px] shadow-[_0px_0px_4px_0px_rgba(0,0,0,0.25)] text-color">
                    <img
                      className="absolute left-[30px] top-1/2 -translate-y-1/2"
                      src="../assets/img/fblogo.png"
                    />
                    Facebook
                  </button>
                </div>
              </div>
            </form>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
              <ul className="max-w-[370px] mx-auto h-[30px] text-[12px] font-[400] ">
                <li className="text-[#898989]">
                  Protected by reCAPTCHA and subject to the Skillnet{" "}
                  <a className="text-color font-bold">Privacy Policy </a> and{" "}
                  <a className="text-color font-bold">Terms of Service.</a>
                </li>
              </ul>
            </div>
          </div>
          <Loading isLoading={loginPanding} />
        </div>
      </div>
    </>
  );
}

export default Auth;
