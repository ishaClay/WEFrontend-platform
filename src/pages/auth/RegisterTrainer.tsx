/* eslint-disable @typescript-eslint/ban-ts-comment */
import { PrimaryButton } from "@/components/comman/Button/CustomButton";
import ErrorMessage from "@/components/comman/Error/ErrorMessage";
import Loading from "@/components/comman/Error/Loading";
import Header from "@/components/Header";
import { InputWithLable } from "@/components/ui/inputwithlable";
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
import { QUERY_KEYS } from "@/lib/constants";
import { registerTrainer } from "@/services/apiServices/trainer";
import { ResponseError } from "@/types/Errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import LandingPageBuildImage from "@/assets/images/Landingapage_build.png";
import { z } from "zod";

function RegisterTrainer() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { toast } = useToast();
  const schema = z.object({
    providerName: z.string().min(1, { message: "Provider Name is required" }),
    providerType: z.string().min(1, { message: "Provider Type is required" }),
    providerCity: z.string().min(1, { message: "Provider City is required" }),
    providerCountry: z
      .string()
      .min(1, { message: "Provider Country is required" }),
    contactSurname: z
      .string()
      .min(1, { message: "Contact Surname is required" }),
    contactTelephone: z
      .string()
      .regex(/^\d{1,10}$/, {
        message: "Please enter a valid phone number (1-9 digits).",
      })
      .min(1, { message: "Please enter a valid phone number" })
      .max(10, { message: "Please enter a valid phone number" }),
    providerAddress: z
      .string()
      .min(1, { message: "Provider Address is required" }),
    providerCounty: z
      .string()
      .min(1, { message: "Provider Country is required" }),
    name: z.string().min(1, { message: "Contact First Name is required" }),
    email: z
      .string()
      .min(1, { message: "Email Address is required" })
      .email("Invalid email address"),
    providerNotes: z.string().min(1, { message: "Provider Notes is required" }),
    foreignProvider: z
      .enum(["Yes", "No"])
      .optional()
      .default("Yes")
      .refine(
        (value) => value !== undefined && (value === "Yes" || value === "No"),
        {
          message: "Please select a valid option for Foreign Provider",
          path: ["foreignProvider"],
        }
      ),
  });

  type ValidationSchema = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ValidationSchema>({
    resolver: zodResolver(schema),
    mode: "all",
  });
  console.log("errorserrors", errors);

  const { mutate: createtrainer, isPending: createPending } = useMutation({
    mutationFn: (question) => registerTrainer(question),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.trainerList],
      });
      reset();
      toast({
        variant: "success",
        title: "Trainer Registered Successfully",
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

  const onSubmit = async (data: FieldValues) => {
    // @ts-ignore
    createtrainer(data);
  };

  console.log("errors", errors);

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

              <form onSubmit={handleSubmit(onSubmit)}>
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
                    <InputWithLable
                      placeholder="London"
                      className="h-[46px]"
                      label="Provider County"
                      isMendatory={true}
                      {...register("providerCountry")}
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
                      isMendatory={true}
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
                      isMendatory={true}
                      {...register("contactTelephone")}
                    />
                    {errors.contactTelephone && (
                      <ErrorMessage
                        message={errors.contactTelephone.message as string}
                      />
                    )}
                  </div>
                  <div className="col-span-2">
                    <Select {...register("foreignProvider")}>
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
                    <InputWithLable
                      placeholder="United Kingdom"
                      className="h-[46px]"
                      label="Provider Country"
                      isMendatory={true}
                      {...register("providerCounty")}
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
                      isMendatory={true}
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
                      isMendatory={true}
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
                    className="w-full h-[48px]"
                  />
                </div>
                <div className="w-[296px] h-[30px] font-[400] text-[12px] xl:mt-[112px] mt-2 mx-auto text-center text-[#898989]">
                  <label>
                    Protected by reCAPTCHA and subject to the Skillnet{" "}
                    <Link to="/privacypolicy" className="text-[#042937]">
                      Privacy Policy{" "}
                    </Link>{" "}
                    and{" "}
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
    </div>
  );
}

export default RegisterTrainer;
