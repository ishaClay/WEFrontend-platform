/* eslint-disable @typescript-eslint/ban-ts-comment */
import LandingPageBuildImage from "@/assets/images/Landingapage_build.png";
import { PrimaryButton } from "@/components/comman/Button/CustomButton";
import ErrorMessage from "@/components/comman/Error/ErrorMessage";
import Loading from "@/components/comman/Error/Loading";
import Modal from "@/components/comman/Modal";
import SelectMenu from "@/components/comman/SelectMenu";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { InputWithLable } from "@/components/ui/inputwithlable";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useAppSelector } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { ResendOtp } from "@/services/apiServices/authService";
import { getCountry } from "@/services/apiServices/company";
import { registerTrainer, sendOtp } from "@/services/apiServices/trainer";
import { CountryResponse } from "@/types/Company";
import { ErrorType, ResponseError } from "@/types/Errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

function RegisterTrainer() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const { clientId } = useAppSelector((state) => state.user);
  const [otp, setOtp] = useState("");
  const [time, setTime] = useState<number>(0);
  const { toast } = useToast();
  const schema = z.object({
    providerName: z.string().min(1, { message: "Please enter provider name" }),
    providerType: z.string().min(1, { message: "Please enter provider type" }),
    providerCity: z.string().min(1, { message: "Please enter provider city" }),
    providerCountry: z
      .string()
      .min(1, { message: "Please select provider county" }),
    contactSurname: z.string().optional(),
    contactTelephone: z
      .string()
      .regex(/^[0-9]*$/, {
        message: "Please enter valid phone number (1-9 digits).",
      })
      .max(10, { message: "Please enter valid phone number (1-9 digits)." })
      .optional(),
    providerAddress: z
      .string()
      .min(1, { message: "Please enter provider address" }),
    providerCounty: z
      .string()
      .min(1, { message: "Please select provider country" }),
    name: z.string().optional(),
    email: z
      .string()
      .min(1, { message: "Please enter email" })
      .email("Please enter valid email"),
    providerNotes: z.string().optional(),
    foreignProvider: z
      .enum(["Yes", "No"])
      .refine(
        (value) => value !== undefined && (value === "Yes" || value === "No"),
        {
          message: "Please select a valid option for Foreign Provider",
          path: ["foreignProvider"],
        }
      ),
  });

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

  type ValidationSchema = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
    getValues,
  } = useForm<ValidationSchema>({
    resolver: zodResolver(schema),
    mode: "all",
  });
  const email = watch("email");

  const { data: country } = useQuery<CountryResponse>({
    queryKey: ["CountryData"],
    queryFn: getCountry,
  });

  const countryOption =
    country?.data &&
    country?.data
      ?.map((item) => {
        return { value: item?.name, label: item?.name };
      })
      .sort((a, b) => a.label.localeCompare(b.label));

  const { mutate, isPending } = useMutation({
    mutationFn: sendOtp,
    onSuccess: () => {
      toast({
        variant: "success",
        title: "OTP sent successfully",
      });
      setShowOtpPopup(true);
    },
    onError: (error: ResponseError) => {
      toast({
        variant: "destructive",
        title: error.data.message,
      });
    },
  });

  const { mutate: createtrainer, isPending: createPending } = useMutation({
    mutationFn: (question) => registerTrainer(question),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.trainerList],
      });
      reset();
      toast({
        variant: "success",
        title: "Registered successfully, But you can't login. Now your account verification is pending by admin.",
      });
      navigate("/auth");
    },
    onError: (error: ResponseError) => {
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

  const { mutate: ReSendOTP } = useMutation({
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

  const handleSendOtp = async (data: FieldValues) => {
    // @ts-ignore
    mutate({ email: data?.email });
  };

  const handleVerifyOtp = () => {
    const getData = getValues();
    const payload = {
      ...getData,
      clientId: clientId,
      otp,
    };
    // @ts-ignore
    createtrainer(payload);
  };

  const handleResendOtp = (email: string) => {
    ReSendOTP({ email: email });
  };

  return (
    <div className="">
      <Header />
      <div className="mainContailner">
        <div className="flex relative mt-[40px]">
          <div>
            {/* <img
              className="max-w-full h-full object-cover"
              src="../assets/img/Group 1000001826.png"
              alt="img"
              loading="lazy"
            /> */}
            <img
              src={LandingPageBuildImage}
              className="xl:w-auto min-w-[530px] w-[530px] h-full"
              alt="LandingPageBuildImage"
              loading="lazy"
            />
          </div>

          <div className="2xl:px-0 px-5 max-w-[550px] w-full mx-auto">
            <div className="flex justify-end">
              <label>
                Already have an account?{" "}
                <Link to={"/auth"} className="font-[700] text-[#042937]">
                  Sign In
                </Link>
              </label>
            </div>
            {/* max-w-[707px]  */}
            <div className="mt-[30px]">
              <div className="flex gap-x-[8px] items-end">
                <h3 className="text-[24px]">Complete your registration</h3>
                <img
                  className="mb-[10px]"
                  src="../assets/img/Group 1000001825.png"
                />
              </div>

              <form onSubmit={handleSubmit(handleSendOtp)}>
                <div className="grid grid-cols-4 gap-x-[30px] gap-y-[22px] xl:mt-[32px] mt-4 justify-start">
                  <div className="col-span-2">
                    <InputWithLable
                      className="h-[46px]"
                      placeholder="Sample Consulting Company"
                      label="Provider Name"
                      isMendatory={true}
                      {...register("providerName")}
                    />
                    {errors.providerName && (
                      <ErrorMessage
                        message={errors.providerName.message as string}
                      />
                    )}
                  </div>
                  <div className="col-span-2">
                    <InputWithLable
                      placeholder="IT or University"
                      className="h-[46px]"
                      label="Provider Type"
                      isMendatory={true}
                      {...register("providerType")}
                    />
                    {errors.providerType && (
                      <ErrorMessage
                        message={errors.providerType.message as string}
                      />
                    )}
                  </div>
                  <div className="col-span-2">
                    <InputWithLable
                      placeholder="London"
                      className="h-[46px]"
                      label="Provider City/Town"
                      isMendatory={true}
                      {...register("providerCity")}
                    />
                    {errors.providerCity && (
                      <ErrorMessage
                        message={errors.providerCity.message as string}
                      />
                    )}
                  </div>
                  <div className="col-span-2">
                    <Label className="mb-[8px]  font-bold text-[16px]">
                      Provider County <span className="text-red-500">*</span>
                    </Label>
                    <SelectMenu
                      option={countryOption || []}
                      placeholder="Select county"
                      className="h-[46px] mt-2"
                      setValue={(data: string) =>
                        setValue("providerCountry", data)
                      }
                      value={watch("providerCountry") || ""}
                    />
                    {errors.providerCountry && (
                      <ErrorMessage
                        message={errors.providerCountry.message as string}
                      />
                    )}
                  </div>
                  <div className="col-span-2">
                    <InputWithLable
                      placeholder="Sample"
                      className="h-[46px]"
                      label="Contact Surname"
                      {...register("contactSurname")}
                    />
                    {errors.contactSurname && (
                      <ErrorMessage
                        message={errors.contactSurname.message as string}
                      />
                    )}
                  </div>
                  <div className="col-span-2">
                    <InputWithLable
                      placeholder="0044 1234 1234567"
                      className="h-[46px]"
                      label="Contact Telephone No."
                      {...register("contactTelephone")}
                    />
                    {errors.contactTelephone && (
                      <ErrorMessage
                        message={errors.contactTelephone.message as string}
                      />
                    )}
                  </div>
                  <div className="col-span-2">
                    <Select
                      onValueChange={(data: any) =>
                        // @ts-ignore
                        setValue("foreignProvider", data)
                      }
                      value={watch("foreignProvider") || ""}
                    >
                      <SelectGroup>
                        <SelectLabel className="text-[16px] font-[700] py-0 pb-[9px] mt-0">
                          Foregin Provider
                          <span className="text-red-500">*</span>
                        </SelectLabel>

                        <SelectTrigger className="h-[46px] text-[gray]">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </SelectGroup>
                      <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.foreignProvider && (
                      <ErrorMessage
                        message={errors.foreignProvider.message as string}
                      />
                    )}
                  </div>
                  <div className="col-span-2">
                    <InputWithLable
                      placeholder="221 B Baker Street"
                      className="h-[46px]"
                      label="Provider Address"
                      isMendatory={true}
                      {...register("providerAddress")}
                    />
                    {errors.providerAddress && (
                      <ErrorMessage
                        message={errors.providerAddress.message as string}
                      />
                    )}
                  </div>
                  <div className="col-span-2">
                    <Label className="mb-[8px]  font-bold text-[16px]">
                      Provider County <span className="text-red-500">*</span>
                    </Label>
                    <SelectMenu
                      option={countryOption || []}
                      placeholder="Select county"
                      className=" h-[46px] mt-2"
                      setValue={(data: string) =>
                        setValue("providerCounty", data)
                      }
                      value={watch("providerCounty") || ""}
                    />
                    {errors.providerCounty && (
                      <ErrorMessage
                        message={errors.providerCounty.message as string}
                      />
                    )}
                  </div>
                  <div className="col-span-2">
                    <InputWithLable
                      placeholder="John"
                      className="h-[46px]"
                      label="Contact First Name"
                      {...register("name")}
                    />
                    {errors.name && (
                      <ErrorMessage message={errors.name.message as string} />
                    )}
                  </div>{" "}
                  <div className="col-span-2">
                    <InputWithLable
                      placeholder="john.sample@emailsample.com"
                      className="h-[46px]"
                      label="Email Address"
                      isMendatory={true}
                      {...register("email")}
                    />
                    {errors.email && (
                      <ErrorMessage message={errors.email.message as string} />
                    )}
                  </div>
                  <div className="col-span-2">
                    <InputWithLable
                      placeholder="Notes 1"
                      className="h-[46px]"
                      label="Provider Notes"
                      {...register("providerNotes")}
                    />
                    {errors.providerNotes && (
                      <ErrorMessage
                        message={errors.providerNotes.message as string}
                      />
                    )}
                  </div>
                </div>
                <div className="w-[370px] mx-auto xl:mt-[40px] mt-5">
                  <PrimaryButton
                    type="submit"
                    name="Submit"
                    className="font-semibold !font-abhaya w-full text-lg h-12 primary-background"
                  />
                </div>
                <div className="w-[296px] h-[30px] font-[400] text-[12px] xl:mt-[112px] mt-2 mx-auto text-center text-[#898989]">
                  <label>
                    Protected by reCAPTCHA and subject to the Skillnet{" "}
                    <Link to="/privacypolicy" className="text-[#042937]">
                      Privacy Policy
                    </Link>
                    and
                    <Link to={"/termsofservices"} className="text-[#042937]">
                      Terms of Service.
                    </Link>
                  </label>
                </div>
              </form>
            </div>
          </div>
          <Loading isLoading={createPending} />
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
  );
}

export default RegisterTrainer;
