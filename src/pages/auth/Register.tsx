import Header from "@/components/Header";
import { PrimaryButton } from "@/components/comman/Button/CustomButton";
import ErrorMessage from "@/components/comman/Error/ErrorMessage";
import Loading from "@/components/comman/Error/Loading";
import Modal from "@/components/comman/Modal";
import PasswordInputWithLabel from "@/components/comman/PasswordInputWithLabel";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { InputWithLable } from "@/components/ui/inputwithlable";
// import { ToastAction } from "@/components/ui/toast";
import LandingPageBuildImage from "@/assets/images/Landingapage_build.png";
import RegisterSideImage from "@/assets/images/RegisterSideImage.svg";
import RunnerIcon from "@/assets/images/RunnerIcon.svg";
import { useToast } from "@/components/ui/use-toast";
import { useAppSelector } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { setCompanyId, setUserData } from "@/redux/reducer/CompanyReducer";
import { ResendOtp } from "@/services/apiServices/authService";
import { checkOTP, createCompany } from "@/services/apiServices/company";
import { ErrorType } from "@/types/Errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

const schema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Please enter min 3 alphabets in company name" }),
    email: z
      .string()
      .min(1, { message: "Please enter email" })
      .email("Please Enter Valid Email"),
    password: z
      .string()
      .min(1, { message: "Please enter password" })
      .regex(
        /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d)(.{8,})$/,
        "Password must contain at least one uppercase letter, one Number letter, and one special character and Minimum 8 characters"
      ),
    cpassword: z.string().min(1, { message: "Please enter confirm password" }),
  })
  .refine((data) => data.password === data.cpassword, {
    message: "Passwords don't match",
    path: ["cpassword"], // Set the error path to 'cpassword'
  });

function Register() {
  const { clientId } = useAppSelector((state) => state.user);
  const [time, setTime] = useState<number>(0);
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [otp, setOtp] = useState("");
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  const { mutate: createcompany, isPending: createPending } = useMutation({
    mutationFn: createCompany,
    onSuccess: async (data) => {
      dispatch(setCompanyId(data?.data?.data?.user?.id));
      // dispatch(setCompanyId(data?.data?.data?.user?.clientId));

      setShowOtpPopup(true);
      setTime(179);
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

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const { mutate: createotp, isPending: createOtp } = useMutation({
    mutationFn: checkOTP,
    onSuccess: async (data) => {
      console.log("++++++++++++++++++++", data);

      setShowOtpPopup(false);
      dispatch(setUserData(data?.data?.data?.id));
      dispatch(setCompanyId(data?.data?.data?.user?.id));
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.companyList],
      });
      localStorage.setItem("user", JSON?.stringify(data.data.data));
      localStorage.setItem(
        "path",
        JSON.stringify(data.data.data?.query?.pathStatus)
      );
      navigate("/assessment");
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
    getValues,
    watch,
  } = useForm<ValidationSchema>({
    resolver: zodResolver(schema),
    mode: "all",
  });

  const email = watch("email");

  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   autoplaySpeed: 3000,
  //   cssEase: "linear",
  //   arrows: false,
  // };

  const handleLaunchJourney = () => {
    setShowRegistrationForm(true);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: ResendOtp,
    onSuccess: async () => {
      setTime(179);
    },
    onError: (error: ErrorType) => {
      toast({
        variant: "destructive",
        title: error.data.message,
      });
    },
  });

  const onSubmit: SubmitHandler<ValidationSchema> = async (data: any) => {
    createcompany({ email: data.email, client: clientId });
    console.log(data, "da++++++++++");
  };

  useEffect(() => {
    if (!clientId) {
      navigate("/");
    }
  }, [clientId]);

  const handleVerifyOtp = () => {
    const getData = getValues();
    const payload = {
      ...getData,
      otp,
      client: clientId,
    };

    createotp(payload);
  };

  const handleResendOtp = (email: string) => {
    mutate({ email: email });
  };

  return (
    <div className="">
      <Header />
      <div className="mainContailner">
        <div className="flex justify-center mt-[26px]">
          {showRegistrationForm ? (
            <>
              <img
                src={RegisterSideImage}
                className="xl:w-auto min-w-[530px] w-[530px] h-full"
                alt="LandingPageBuildImage"
                loading="lazy"
              />
            </>
          ) : (
            <>
              <img
                src={LandingPageBuildImage}
                className="xl:w-auto min-w-[530px] w-[530px] h-full"
                alt="LandingPageBuildImage"
                loading="lazy"
              />
            </>
          )}

          <div className="w-full 2xl:px-0 px-5 mt-[33px] max-w-[515px] mx-auto flex flex-col justify-between">
            <div>
              <div className="flex justify-end">
                <label>
                  Already have an account?{" "}
                  <Link to={"/auth"} className="font-[700] text-[#042937]">
                    Sign In
                  </Link>
                </label>
              </div>

              {!showRegistrationForm ? (
                <div className="h-[524px] relative mt-[92px]">
                  <div className="">
                    <h3 className="text-[24px] font-[700] mb-[40px] font-abhaya">
                      Which best describes you?
                    </h3>
                    <img
                      className="absolute right-[5px] top-[15px]"
                      src={RunnerIcon}
                      alt="RunnerIcon"
                    />
                    <img className="" src="../assets/img/Line 23.png" />
                    <p className="text-[16px] font-[400] mt-3 font-abhaya">
                      Select your role so we can get you to the right place.
                    </p>
                    <div className="flex gap-x-[40px] mt-[40px]">
                      <PrimaryButton
                        name="I’m A Trainer"
                        onClick={() => {
                          navigate("/trainer-regestration");
                        }}
                        className="w-[198px] h-[72px]  flex items-center justify-center gap-[8px] primary-background text-color !font-abhaya"
                        symbol={<img src="../assets/img/Analyzing Skill.png" />}
                      />

                      <PrimaryButton
                        name="I’m A Company"
                        onClick={handleLaunchJourney}
                        className="w-[198px] h-[72px]  flex items-center justify-center gap-[8px] primary-background text-color !font-abhaya"
                        symbol={<img src="../assets/img/Company.png" />}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="">
                  <div className=" relative mt-[60px]">
                    <h3 className="text-[24px] font-bold">
                      Secure your berth & set sail
                    </h3>
                    <img
                      className="absolute right-0 top-[-20px]"
                      src={RunnerIcon}
                      alt="RunnerIcon"
                    />
                    <img className="" src="../assets/img/Line 23.png" />
                    <p className="2xl:w-[530px] xl:w-[500px] w-[400px] h-[80px] text-[16px] font-[400]">
                      Enter your company name eamil and set a password to anchor
                      your details. submit to receive an OTP, steering you
                      towards the next leg of your sustainable journey.
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="mb-2">
                        <InputWithLable
                          label="Company Name"
                          className="h-[46px] border solid 1.5px"
                          placeholder="Enter Company Name"
                          {...register("name")}
                        />
                        {errors.name && (
                          <ErrorMessage
                            message={errors.name.message as string}
                          />
                        )}
                      </div>
                      <div className="mb-2">
                        <InputWithLable
                          label="Email"
                          className="h-[46px] border solid 1.5px"
                          placeholder="Enter Email Address"
                          {...register("email")}
                        />
                        {errors.email && (
                          <ErrorMessage
                            message={errors.email.message as string}
                          />
                        )}
                      </div>
                      <div className="mb-2">
                        <PasswordInputWithLabel
                          label="Set a password"
                          className="h-[46px] border solid 1.5px"
                          placeholder="Enter Password"
                          {...register("password")}
                          error={errors?.password?.message as string}
                        />
                      </div>
                      <div className="mb-2">
                        <PasswordInputWithLabel
                          label="Confirm Password"
                          className="h-[46px] border solid 1.5px"
                          placeholder="Enter Confirm Password"
                          {...register("cpassword")}
                          error={errors?.cpassword?.message as string}
                        />
                      </div>

                      <div className=" mt-[20px] flex gap-x-[40px]">
                        <button
                          type="submit"
                          className="w-full h-[48px] bg-[#00778B] rounded-[4px] text-white"
                        >
                          Get OTP
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>

            {/* <div
              className="mt-[29px] flex justify-center gap-x-[19px]"
              id="auth-slider"
            >
              <div>
                <img className="" src="../assets/img/Group 1000001825.png" />
              </div>
              <Slider className="w-[381px] h-[44px]" {...settings}>
                <div>
                  <span className="text-color">
                    “Small choices, big impact. Ripples of eco-friendly actions
                    shape a{" "}
                    <span className="button-text-color">
                      sustainable future
                    </span>
                    ”
                  </span>
                </div>
                <div>
                  <span className="text-color">
                    “Small choices, big impact. Ripples of eco-friendly actions
                    shape a{" "}
                    <span className="button-text-color">
                      sustainable future
                    </span>
                    ”
                  </span>
                </div>
                <div>
                  <span className="text-color">
                    “Small choices, big impact. Ripples of eco-friendly actions
                    shape a{" "}
                    <span className="button-text-color">
                      sustainable future
                    </span>
                    ”
                  </span>
                </div>
              </Slider>
            </div> */}

            <div className="max-w-[296px] mx-auto mb-[37px] font-[400] text-[12px] text-center text-[#898989]">
              <label>
                Protected by reCAPTCHA and subject to the Skillnet
                <br />
                <Link to={"/privacypolicy"} className="text-[#042937]">
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link to={"/termsofservices"} className="text-[#042937]">
                  Terms of Service.
                </Link>
              </label>
            </div>
          </div>
        </div>
        <Modal
          open={showOtpPopup}
          onClose={() => setShowOtpPopup(false)}
          className="max-w-[550px] xl:left-auto xl:right-[80px]"
        >
          <div className="mb-[2px] mt-2 text-center font-abhaya">
            <h2 className="text-xl font-semibold">
              If you can verify the one-time password emailed to you
            </h2>
            <p className="text-[#848181] text-[16px] font-abhaya">
              A one- time password has been sent to {email}
            </p>
          </div>
          <div className="flex justify-center gap-3 mb-[7px]">
            <InputOTP
              maxLength={6}
              onChange={(e) => {
                setOtp(e);
              }}
            >
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
          <div className="flex justify-center">
            <button
              className="text-white w-[181px] p-[13px] bg-[#64A70B] h-[50px] rounded-[9px]"
              onClick={() => handleVerifyOtp()}
            >
              Submit
            </button>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <div className="flex justify-center gap-2">
              <Button
                variant={"ghost"}
                disabled={time !== 0 || isPending}
                onClick={() => handleResendOtp(email)}
                className="text-[#848181] text-[16px] font-[700] block p-0 h-auto hover:bg-transparent font-abhaya"
              >
                Resend OTP
              </Button>
              {time !== 0 && (
                <p className="text-[#848181] text-[16px] font-[700]">
                  {formatTime(time)}
                </p>
              )}
            </div>
            <Button
              variant={"ghost"}
              onClick={() => {
                setShowOtpPopup(false);
                setTime(0);
              }}
              className="text-[#369FFF] text-[16px] block p-0 h-auto hover:bg-transparent font-abhaya"
            >
              Send a different email?
            </Button>
          </div>
        </Modal>
      </div>

      <Loading isLoading={createPending || createOtp} />
    </div>
  );
}

export default Register;
