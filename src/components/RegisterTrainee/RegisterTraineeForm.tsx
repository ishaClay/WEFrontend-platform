import mandatory from "/assets/img/Mandatory.svg";

import { Link } from "react-router-dom";
import ErrorMessage from "../comman/Error/ErrorMessage";
import Input from "../comman/Input/Input";
import { useMutation } from "@tanstack/react-query";
import { trainerCreate, trainerUpdate } from "@/services/apiServices/trainer";
import { toast } from "../ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Zod from "zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { InputWithLable } from "../ui/inputwithlable";
import { useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";


const employmentStatusOptions = ["Active", "Inactive"] as const;

const RegisterTraineeForm = () => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const type = params.get("type");
  const email: string | null = params.get("email");

  const schema = Zod.object({
    email: Zod.string().email({ message: "This is not a valid email." }).optional(),
    ageRange: Zod.string().regex(/^\d{1,2}$/, { message: "Please enter a valid age range (1-2 digits)." }).min(1, { message: "Please enter a valid age range" }).max(2, { message: "Please enter a valid age range" }),
    gender: Zod.string().regex(/^[A-Za-z]+$/, { message: "Please enter a valid gender" }).min(1, { message: "Please enter valid gender" }),
    firstName: Zod.string().regex(/^[A-Za-z]+$/, { message: "First name can only contain letters" }).min(1, { message: "Please enter a valid first name" }),
    surname: Zod.string().regex(/^[A-Za-z]+$/, { message: "Surname can only contain letters" }).min(1, { message: "Please enter a valid surname" }),
    phone: Zod.string().regex(/^\d{1,10}$/, { message: "Please enter a valid phone number (1-9 digits)." }).min(1, { message: "Please enter a valid phone number" }).max(10, { message: "Please enter a valid phone number" }),
    currentHighestNFQ: Zod.string().regex(/^[A-Za-z\s]+$/, { message: "Please enter a valid NFQ" }).min(1, { message: "Please enter valid NFQ" }),
    employmentStatus: Zod.enum(employmentStatusOptions, { message: "Please enter valid employment status" }),
    memberCompany: Zod.string().regex(/^[0-9]$/, { message: "Please enter a valid member company" }).min(1, { message: "Please enter valid member company" }),
    occupationalCategory: Zod.string().regex(/^[A-Za-z\s]+$/, { message: "Please enter a valid occupational category" }).min(1, { message: "Please enter valid occupational category" }),
    unemploymentTime: Zod.string().regex(/^[A-Za-z\s]+$/, { message: "Please enter a valid unemployment time" }).min(1, { message: "Please enter valid unemployment time" }),
    countyOfResidence: Zod.string().regex(/^[A-Za-z\s]+$/, { message: "Please enter a valid county of residence" }).min(1, { message: "Please enter valid county of residence" }),
    attendedEvent: Zod.string().regex(/^[A-Za-z\s]+$/, { message: "Please enter a valid attended event" }).min(1, { message: "Please enter valid attended event" }),
  });
  type ValidationSchema = Zod.z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "all",
  });

  useEffect(() => {
    setValue('email', email)
  }, [email])

  console.log(typeof getValues("ageRange"), "errorserrorserrors");


  const { mutate: updateTrainee, isPending } = useMutation({
    mutationFn: trainerUpdate,
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

  const onSubmit: any = async (data: FieldValues) => {
    const payload = {
      email: email,
      ageRange: +data.ageRange,
      gender: data.gender,
      name: data.firstName,
      surname: data.surname,
      phone: +data.phone,
      currentHighestNFQ: data.currentHighestNFQ,
      employmentStatus: data.employmentStatus,
      memberCompany: +data.memberCompany,
      occupationalCategory: data.occupationalCategory,
      unemploymentTime: data.unemploymentTime,
      countyOfResidence: data.countyOfResidence,
      attendedEvent: data.attendedEvent,
    };
    console.log(payload); // Add this log to inspect the payload
    updateTrainee(payload);
  };

  return (
    <>
      <div className="flex justify-end text-color">
        <label>
          Already have an account?{" "}
          <Link to={"/register"} className="font-[700] text-[#042937]">
            Sign In
          </Link>
        </label>
      </div>
      <div className="mb-4 xl:mt-[49px] mt-[40px]">
        <span className="text-[#202020] text-2xl leading-[30px] font-bold drop-shadow-[0px_4px_4px_0px_#00000060] font-calibri">
          Register as
        </span>
        <div className="flex overflow-hidden justify-evenly border-gainsboro-100 border-solid border-[1px] rounded-[5px] w-[328px] h-[42px] text-[18px] leading-[18px] font-normal text-darkslategray-100 mt-[27px] mb-[33px]">
          <button className={`w-full ${type === "trainer" ? "bg-[#73AF26] text-white font-bold" : "pointer-events-none"} `}>Trainer</button>
          <button className={`w-full ${type === "company" ? "bg-[#73AF26] text-white font-bold" : "pointer-events-none"} `}>company</button>
          <button className={`w-full ${type === "trainee" ? "bg-[#73AF26] text-white font-bold" : "pointer-events-none"} `}>
            Trainee
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-x-8 text-[16px] leading-[19.53px] font-bold">
          <div className="mb-4 col-span-1">
            <label className="mb-1  text-[#3A3A3A] font-bold flex items-center leading-5 font-calibri text-base">
              First Name
              <img src={mandatory} className="p-1" />
            </label>
            <InputWithLable
              className={"!w-full"}
              {...register("firstName")}

            />
            {
              errors.firstName && <ErrorMessage message={errors?.firstName?.message || ""} />
            }
          </div>
          <div className="mb-4 col-span-1">
            <label className="mb-1  text-[#3A3A3A] font-bold flex items-center leading-5 font-calibri text-base">
              Surname
              <img src={mandatory} className="p-1" />
            </label>
            <InputWithLable
              className={"!w-full"}
              {...register("surname")}
            />
            {
              errors.surname && <ErrorMessage message={errors?.surname?.message || ""} />
            }
          </div>
          <div className="mb-4 col-span-1">
            <label className="mb-1  text-[#3A3A3A] font-bold flex items-center leading-5 font-calibri text-base">
              Gender
              <img src={mandatory} className="p-1" />
            </label>
            <InputWithLable
              className={"!w-full"}
              {...register("gender")}
            />
            {
              errors.gender && <ErrorMessage message={errors?.gender?.message || ""} />
            }
          </div>
          <div className="mb-4 col-span-1">
            <label className="mb-1  text-[#3A3A3A] font-bold flex items-center leading-5 font-calibri text-base">
              Age Range
              <img src={mandatory} className="p-1" />
            </label>
            <InputWithLable
              className={"!w-full"}
              // type="number"
              {...register("ageRange")}
            />
            {
              errors.ageRange && <ErrorMessage message={errors?.ageRange?.message || ""} />
            }
          </div>
          <div className="mb-4 col-span-1">
            <label className="mb-1  text-[#3A3A3A] font-bold flex items-center leading-5 font-calibri text-base">
              Email
              <img src={mandatory} className="p-1" />
            </label>
            <InputWithLable
              {...register("email")}
              className={"!w-full disabled:opacity-100"}
              value={email ? email : ""}
              disable={email ? true : false}
            />
            {
              errors.email && <ErrorMessage message={errors?.email?.message || ""} />
            }
          </div>
          <div className="mb-4 col-span-1">
            <label className="mb-1  text-[#3A3A3A] font-bold flex items-center leading-5 font-calibri text-base">
              Phone
              <img src={mandatory} className="p-1" />
            </label>
            <InputWithLable
              className={"!w-full"}
              {...register("phone")}
            />
            {
              errors.phone && <ErrorMessage message={errors?.phone?.message || ""} />
            }
          </div>
          <div className="mb-4 col-span-1">
            <label className="mb-1  text-[#3A3A3A] font-bold flex items-center leading-5 font-calibri text-base">
              Current Highest NFQ
              <img src={mandatory} className="p-1" />
            </label>
            <InputWithLable
              className={"!w-full"}
              {...register("currentHighestNFQ")}

            />
            {
              errors.currentHighestNFQ && <ErrorMessage message={errors?.currentHighestNFQ?.message || ""} />
            }
          </div>
          <div className="mb-4 col-span-1">
            <label className="mb-1  text-[#3A3A3A] font-bold flex items-center leading-5 font-calibri text-base">
              Employment Status
            </label>
            <Select onValueChange={(value) => setValue("employmentStatus", value)}>
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
            {
              errors.employmentStatus && <ErrorMessage message={errors?.employmentStatus?.message || ""} />
            }
          </div>
          <div className="mb-4 col-span-1">
            <label className="mb-1  text-[#3A3A3A] font-bold flex items-center leading-5 font-calibri text-base">
              Member Company
            </label>
            <InputWithLable
              className={"!w-full"}
              {...register("memberCompany")}
            />
            {
              errors.memberCompany && <ErrorMessage message={errors?.memberCompany?.message || ""} />
            }
          </div>
          <div className="mb-4 col-span-1">
            <label className="mb-1  text-[#3A3A3A] font-bold flex items-center leading-5 font-calibri text-base">
              Occupational Category
            </label>
            <InputWithLable
              className={"!w-full"}
              {...register("occupationalCategory")}
            />
            {
              errors.occupationalCategory && <ErrorMessage message={errors?.occupationalCategory?.message || ""} />
            }
          </div>
          <div className="mb-4 col-span-1">
            <label className="mb-1  text-[#3A3A3A] font-bold flex items-center leading-5 font-calibri text-base">
              Unemployment Time
            </label>
            <InputWithLable
              className={"!w-full"}
              {...register("unemploymentTime")}
            />
            {
              errors.unemploymentTime && <ErrorMessage message={errors?.unemploymentTime?.message || ""} />
            }
          </div>
          <div className="mb-4 col-span-1">
            <label className="mb-1  text-[#3A3A3A] font-bold flex items-center leading-5 font-calibri text-base">
              County Of Residence
              <img src={mandatory} className="p-1" />
            </label>
            <InputWithLable
              className={"!w-full"}
              {...register("countyOfResidence")}
            />
            {
              errors.countyOfResidence && <ErrorMessage message={errors?.countyOfResidence?.message || ""} />
            }
          </div>
          <div className="mb-4 col-span-1">
            <label className="mb-1  text-[#3A3A3A] font-bold flex items-center leading-5 font-calibri text-base">
              Attended Event
            </label>
            <InputWithLable
              className={"!w-full"}
              {...register("attendedEvent")}
            />
            {
              errors.attendedEvent && <ErrorMessage message={errors?.attendedEvent?.message || ""} />
            }
          </div>
        </div>
        <button type="submit" className="xl:mt-12 mt-6 bg-primary-button rounded w-[370px] h-12 text-white border border-solid border-black shadow-[0px_4px_4px_0px_#00000040] m-auto flex justify-center py-3 font-calibri font-bold">
          Submit
        </button>
      </form>
      <p className="xl:mt-[39px] mt-[30px] text-[#898989] text-[12px] leading-[14.65px] w-[296px] text-center font-normal mx-auto">
        Protected by reCAPTCHA and subject to the Skillnet{" "}
        <span className="text-darkslategray-200">Privacy Policy</span> and{" "}
        <span className="text-darkslategray-200">Terms of Service.</span>
      </p>
    </>
  );
};

export default RegisterTraineeForm;
