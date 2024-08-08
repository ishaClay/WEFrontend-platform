import { LogOut } from "@/services/apiServices/authService";
import { getCountry } from "@/services/apiServices/company";
import { updateEmployeeEmail } from "@/services/apiServices/employee";
import { CountryResponse } from "@/types/Company";
import { ResponseError } from "@/types/Errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as Zod from "zod";
import ErrorMessage from "../comman/Error/ErrorMessage";
import Loading from "../comman/Error/Loading";
import Loader from "../comman/Loader";
import SelectMenu from "../comman/SelectMenu";
import { InputWithLable } from "../ui/inputwithlable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "../ui/use-toast";
import mandatory from "/assets/img/Mandatory.svg";

const employmentStatusOptions = ["Active", "Inactive"] as const;
const genderOptions = ["Male", "Female"] as const;

const RegisterTraineeForm = () => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const type = params.get("type");
  const email: string | null = params.get("email");
  const navigate = useNavigate();
  const schema = Zod.object({
    email: Zod.string()
      .email({ message: "Please enter valid email" })
      .optional(),
    ageRange: Zod.string()
      .regex(/^\d{1,2}$/, {
        message: "Please enter valid age range (1-2 digits).",
      })
      .min(1, { message: "Please enter valid age range" })
      .max(2, { message: "Please enter valid age range" }),
    gender: Zod.enum(genderOptions, {
      message: "Please select gender",
    }),
    firstName: Zod.string()
      .regex(/^[A-Za-z]+$/, { message: "First name can only contain letters" })
      .min(1, { message: "Please enter first name" }),
    surname: Zod.string()
      .regex(/^[A-Za-z]+$/, { message: "Surname can only contain letters" })
      .min(1, { message: "Please enter surname" }),
    phone: Zod.string()
      .regex(/^\d{1,10}$/, {
        message: "Please enter valid phone number",
      })
      .min(1, { message: "Please enter valid phone number" })
      .max(10, { message: "Please enter valid phone number" }),
    currentHighestNFQ: Zod.string()
      .regex(/^[A-Za-z\s]+$/, { message: "Please enter valid NFQ" })
      .min(1, { message: "Please enter NFQ" }),
    employmentStatus: Zod.enum(employmentStatusOptions, {
      message: "Please select employment status",
    }).optional(),
    memberCompany: Zod.string().nullable(),
    occupationalCategory: Zod.string().nullable(),
    unemploymentTime: Zod.string().nullable(),
    countyOfResidence: Zod.string().min(1, {
      message: "Provider Country is required",
    }),
    attendedEvent: Zod.string().nullable(),
  });
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "all",
  });

  const { mutate, isPending: isLogoutPending } = useMutation({
    mutationFn: LogOut,
    onSuccess: () => {
      localStorage.removeItem("user");
      localStorage.removeItem("path");
      setValue("email", email);
    },
    onError: (error: ResponseError) => {
      toast({
        title: "Error",
        description: error?.data?.message || "Internal server error",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (email && type) {
      if (userData) {
        const userId = userData?.query?.id;
        mutate(userId);
      } else {
        setValue("email", email);
      }
    }
  }, [email, userData]);

  const { mutate: update_Employee, isPending } = useMutation({
    mutationFn: updateEmployeeEmail,
    onSuccess: (data) => {
      if (data?.data?.trainerExist?.length > 0) {
        toast({
          title: "Success",
          description: "Trainer invitation Already send.",
          variant: "success",
        });
      } else {
        toast({
          title: "Success",
          description: data?.message,
          variant: "success",
        });
      }
      navigate("/auth");
      reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
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
  const onSubmit = async (data: FieldValues) => {
    const payload = {
      email: email,
      ageRange: +data.ageRange,
      gender: data.gender,
      name: data.firstName,
      surname: data.surname,
      phone: +data.phone,
      currentHighestNFQ: data.currentHighestNFQ,
      employmentStatus: data.employmentStatus,
      memberCompany: data.memberCompany,
      occupationalCategory: data.occupationalCategory,
      unemploymentTime: data.unemploymentTime,
      countyOfResidence: data.countyOfResidence,
      attendedEvent: data.attendedEvent,
      status: true,
    }; // Add this log to inspect the payload
    update_Employee(payload);
  };
  return (
    <>
      {/* <div className="flex justify-end text-color">
        <label>
          Already have an account?{" "}
          <Link to={"/register"} className="font-[700] text-[#042937]">
            Sign In
          </Link>
        </label>
      </div> */}
      <div className="mb-4 xl:mt-[49px] sm:mt-[40px] mt-[20px]">
        <span className="text-[#202020] text-2xl leading-[30px] font-bold drop-shadow-[0px_4px_4px_0px_#00000060] font-calibri">
          Register as
        </span>
        <div className="flex overflow-hidden justify-evenly border-gainsboro-100 border-solid border-[1px] rounded-[5px] sm:w-[328px] w-[300px] h-[42px] sm:text-[18px] text-base leading-[18px] font-normal text-darkslategray-100 sm:mt-[27px] mt-5 sm:mb-[33px] mb-[25px]">
          <button
            className={`w-full ${
              type === "trainer"
                ? "bg-[#73AF26] text-white font-bold"
                : "pointer-events-none"
            } `}
          >
            Trainer
          </button>
          <button
            className={`w-full ${
              type === "company"
                ? "bg-[#73AF26] text-white font-bold"
                : "pointer-events-none"
            } `}
          >
            company
          </button>
          <button
            className={`w-full ${
              type === "employee"
                ? "bg-[#73AF26] text-white font-bold"
                : "pointer-events-none"
            } `}
          >
            Employee
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 sm:gap-x-8 gap-x-[15px] text-[16px] leading-[19.53px] font-bold">
          <div className="mb-4 col-span-1">
            <label className="mb-1  text-[#3A3A3A] font-bold flex items-center leading-5 font-calibri sm:text-base text-[15px]">
              First Name
              <img src={mandatory} className="p-1" />
            </label>
            <InputWithLable className={"!w-full"} {...register("firstName")} />
            {errors.firstName && (
              <ErrorMessage
                message={(errors?.firstName?.message as string) || ""}
              />
            )}
          </div>
          <div className="mb-4 col-span-1">
            <label className="mb-1  text-[#3A3A3A] font-bold flex items-center leading-5 font-calibri sm:text-base text-[15px]">
              Surname
              <img src={mandatory} className="p-1" />
            </label>
            <InputWithLable className={"!w-full"} {...register("surname")} />
            {errors.surname && (
              <ErrorMessage
                message={(errors?.surname?.message as string) || ""}
              />
            )}
          </div>
          <div className="mb-4 col-span-1">
            <label className="mb-1  text-[#3A3A3A] font-bold flex items-center leading-5 font-calibri sm:text-base text-[15px]">
              Gender
              <img src={mandatory} className="p-1" />
            </label>
            <Select onValueChange={(value) => setValue("gender", value)}>
              <SelectTrigger className="w-full py-[5px] h-10 px-2 bg-white text-black">
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectItem className="px-8" value="Male">
                  Male
                </SelectItem>
                <SelectItem className="px-8" value="Female">
                  Female
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.gender && (
              <ErrorMessage
                message={(errors?.gender?.message as string) || ""}
              />
            )}
          </div>
          <div className="mb-4 col-span-1">
            <label className="mb-1  text-[#3A3A3A] font-bold flex items-center leading-5 font-calibri sm:text-base text-[15px]">
              Age Range
              <img src={mandatory} className="p-1" />
            </label>
            <InputWithLable
              className={"!w-full"}
              // type="number"
              {...register("ageRange")}
            />
            {errors.ageRange && (
              <ErrorMessage
                message={(errors?.ageRange?.message as string) || ""}
              />
            )}
          </div>
          <div className="mb-4 col-span-1">
            <label className="mb-1  text-[#3A3A3A] font-bold flex items-center leading-5 font-calibri sm:text-base text-[15px]">
              Email
              <img src={mandatory} className="p-1" />
            </label>
            <InputWithLable
              {...register("email")}
              className={"!w-full disabled:opacity-100"}
              value={email ? email : ""}
              disable={email ? true : false}
            />
            {errors.email && (
              <ErrorMessage
                message={(errors?.email?.message as string) || ""}
              />
            )}
          </div>
          <div className="mb-4 col-span-1">
            <label className="mb-1  text-[#3A3A3A] font-bold flex items-center leading-5 font-calibri sm:text-base text-[15px]">
              Phone
              <img src={mandatory} className="p-1" />
            </label>
            <InputWithLable className={"!w-full"} {...register("phone")} />
            {errors.phone && (
              <ErrorMessage
                message={(errors?.phone?.message as string) || ""}
              />
            )}
          </div>
          <div className="mb-4 col-span-1">
            <label className="mb-1  text-[#3A3A3A] font-bold flex items-center leading-5 font-calibri sm:text-base text-[15px]">
              Current Highest NFQ
              <img src={mandatory} className="p-1" />
            </label>
            <InputWithLable
              className={"!w-full"}
              {...register("currentHighestNFQ")}
            />
            {errors.currentHighestNFQ && (
              <ErrorMessage
                message={(errors?.currentHighestNFQ?.message as string) || ""}
              />
            )}
          </div>
          <div className="mb-4 col-span-1">
            <label className="mb-1  text-[#3A3A3A] font-bold flex items-center leading-5 font-calibri sm:text-base text-[15px]">
              Employment Status
            </label>
            <Select
              onValueChange={(value) => setValue("employmentStatus", value)}
            >
              <SelectTrigger className="w-full py-[5px] h-10 px-2 bg-white text-black">
                <SelectValue placeholder="select status" />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectItem className="px-8" value="Active">
                  Active
                </SelectItem>
                <SelectItem className="px-8" value="Inactive">
                  Inactive
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.employmentStatus && (
              <ErrorMessage
                message={(errors?.employmentStatus?.message as string) || ""}
              />
            )}
          </div>
          <div className="mb-4 col-span-1">
            <label className="mb-1  text-[#3A3A3A] font-bold flex items-center leading-5 font-calibri sm:text-base text-[15px]">
              Member Company
            </label>
            <InputWithLable
              className={"!w-full"}
              {...register("memberCompany")}
            />
            {errors.memberCompany && (
              <ErrorMessage
                message={(errors?.memberCompany?.message as string) || ""}
              />
            )}
          </div>
          <div className="mb-4 col-span-1">
            <label className="mb-1  text-[#3A3A3A] font-bold flex items-center leading-5 font-calibri sm:text-base text-[15px]">
              Occupational Category
            </label>
            <InputWithLable
              className={"!w-full"}
              {...register("occupationalCategory")}
            />
            {errors.occupationalCategory && (
              <ErrorMessage
                message={
                  (errors?.occupationalCategory?.message as string) || ""
                }
              />
            )}
          </div>
          <div className="mb-4 col-span-1">
            <label className="mb-1  text-[#3A3A3A] font-bold flex items-center leading-5 font-calibri sm:text-base text-[15px]">
              Unemployment Time
            </label>
            <InputWithLable
              className={"!w-full"}
              {...register("unemploymentTime")}
            />
            {errors.unemploymentTime && (
              <ErrorMessage
                message={(errors?.unemploymentTime?.message as string) || ""}
              />
            )}
          </div>
          <div className="mb-4 col-span-1">
            <label className="mb-1  text-[#3A3A3A] font-bold flex items-center leading-5 font-calibri sm:text-base text-[15px]">
              Country Of Residence
              <img src={mandatory} className="p-1" />
            </label>
            <SelectMenu
              option={countryOption || []}
              placeholder="Select county"
              className=" h-[40px]"
              setValue={(data: string) => setValue("countyOfResidence", data)}
              value={watch("countyOfResidence") || ""}
            />
            {errors.countyOfResidence && (
              <ErrorMessage
                message={(errors?.countyOfResidence?.message as string) || ""}
              />
            )}
          </div>
          <div className="mb-4 col-span-1">
            <label className="mb-1  text-[#3A3A3A] font-bold flex items-center leading-5 font-calibri sm:text-base text-[15px]">
              Attended Event
            </label>
            <InputWithLable
              className={"!w-full"}
              {...register("attendedEvent")}
            />
            {errors.attendedEvent && (
              <ErrorMessage
                message={(errors?.attendedEvent?.message as string) || ""}
              />
            )}
          </div>
        </div>
        <button
          type="submit"
          className="xl:mt-12 sm:mt-6 mt-4 bg-primary-button rounded sm:w-[370px] w-[300px] h-12 text-white text-lg shadow-[0px_4px_4px_0px_#00000040] m-auto flex justify-center py-3 font-abhaya font-bold"
        >
          {isPending ? <Loader containerClassName="h-auto" /> : "Submit"}
        </button>
      </form>
      <p className="xl:mt-[39px] mt-[30px] text-[#898989] text-[12px] leading-[14.65px] w-[296px] text-center font-normal mx-auto">
        Protected by reCAPTCHA and subject to the Skillnet{" "}
        <Link to={"/privacypolicy"} className="text-darkslategray-200">
          Privacy Policy
        </Link>
        and{" "}
        <Link to={"/termsofservices"} className="text-darkslategray-200">
          Terms of Service.
        </Link>
      </p>
      <Loading isLoading={isLogoutPending} />
    </>
  );
};

export default RegisterTraineeForm;
