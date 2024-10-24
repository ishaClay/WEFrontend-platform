import { useAppDispatch } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { setPath } from "@/redux/reducer/PathReducer";
import { LogOut } from "@/services/apiServices/authService";
import { getCountry } from "@/services/apiServices/company";
import { fetchNfqlLevel } from "@/services/apiServices/courseManagement";
import {
  fetchAgeRanges,
  fetchEmploymentStatus,
  fetchOccupationalCategories,
  fetchUnemploymentTime,
  updateEmployeeEmail,
} from "@/services/apiServices/employee";
import { CountryResponse } from "@/types/Company";
import { ResponseError } from "@/types/Errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import { Link, useNavigate } from "react-router-dom";
import * as Zod from "zod";
import ErrorMessage from "../comman/Error/ErrorMessage";
import Loading from "../comman/Error/Loading";
import Loader from "../comman/Loader";
import SelectMenu from "../comman/SelectMenu";
import { InputWithLable } from "../ui/inputwithlable";
import { toast } from "../ui/use-toast";
import mandatory from "/assets/img/Mandatory.svg";

const genderOptions: {
  label: string;
  value: string;
}[] = [
  {
    label: "Male",
    value: "Male",
  },
  {
    label: "Female",
    value: "Female",
  },
  {
    label: "N/A",
    value: "N/A",
  },
  {
    label: "Don't want to disclose",
    value: "Don't want to disclose",
  },
];

const RegisterTraineeForm = () => {
  const search = window.location.search;
  const dispatch = useAppDispatch();
  const params = new URLSearchParams(search);
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const type = params.get("type");
  const email: string | null = params.get("email");
  const cName: string | null = params.get("cName");
  const fName: string | null = params.get("fName");
  const lName: string | null = params.get("lName");
  const [phone, setPhone] = useState<string>("");
  const [selectBoxValues, setSelectBoxValues] = useState({
    gender: "",
    ageRange: "",
    employmentStatus: "",
    occupationalCategory: "",
    unemploymentTime: "",
    countryOfResidence: "",
    currentHighestNFQ: "",
  });
  const navigate = useNavigate();
  const schema = Zod.object({
    email: Zod.string()
      .email({ message: "Please enter a valid email" })
      .optional(),
    ageRange: Zod.string({
      required_error: "Please select an age range",
    }),
    gender: Zod.string({ required_error: "Please select gender" }),
    firstName: Zod.string()
      .min(1, { message: "Please enter a contact first name" })
      .regex(
        /^[A-Za-z]+(?:\s[A-Za-z]+)*$/,
        "Please enter valid contact first name"
      ),
    surname: Zod.string()
      .min(1, { message: "Please enter contact last name" })
      .regex(
        /^[A-Za-z]+(?:\s[A-Za-z]+)*$/,
        "Please enter valid contact last name"
      ),
    phone: Zod.string().optional(),
    currentHighestNFQ: Zod.string({
      required_error: "Please select the current highest NFQ",
    }).min(1, { message: "Please enter the NFQ" }),
    employmentStatus: Zod.string().optional(),
    memberCompany: Zod.string().nullable(),
    occupationalCategory: Zod.string({
      required_error: "Please select an occupational category",
    }),
    unemploymentTime: Zod.string().optional(),
    countyOfResidence: Zod.string({
      required_error: "Please select the county of residence",
    }),
    attendedEvent: Zod.string().nullable(),
  }).superRefine((data, ctx) => {
    // Ensure unemploymentTime is provided if employmentStatus is "Unemployed"
    if (data.employmentStatus === "Unemployed" && !data.unemploymentTime) {
      ctx.addIssue({
        code: Zod.ZodIssueCode.custom,
        message: "Please select unemployment time",
        path: ["unemploymentTime"],
      });
    }
  });

  type ValidationSchema = Zod.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(schema),
    mode: "all",
  });

  const { data: getAgeRangesList, isPending: isAgeRangesPending } = useQuery({
    queryKey: [QUERY_KEYS.fetchAgeRanges],
    queryFn: fetchAgeRanges,
  });
  const ageRangesList = getAgeRangesList?.AgeRanges;
  const ageOptions = ageRangesList
    ? ageRangesList.map((item) => ({ label: item, value: item }))
    : [];

  const {
    data: getEmploymentStatusList,
    isPending: isEmploymentStatusPending,
  } = useQuery({
    queryKey: [QUERY_KEYS.fetchEmploymentStatus],
    queryFn: fetchEmploymentStatus,
  });
  const employmentStatusList = getEmploymentStatusList?.employmentStatus;
  const employmentStatusListOptions = employmentStatusList
    ? employmentStatusList.map((item) => ({ label: item, value: item }))
    : [];

  const { data: getNfqlLevelList, isLoading: nfqPending } = useQuery({
    queryKey: ["nfqllevel"],
    queryFn: () => fetchNfqlLevel(1),
  });

  const nfqOption = getNfqlLevelList?.data
    ? getNfqlLevelList?.data?.map((item: any) => {
        return { label: item.leval, value: item.leval };
      })
    : [];

  const {
    data: getOccupationalCategoriesList,
    isPending: isOccupationalCategoriesPending,
  } = useQuery({
    queryKey: [QUERY_KEYS.fetchOccupationalCategories],
    queryFn: fetchOccupationalCategories,
  });
  const occupationalCategoriesList =
    getOccupationalCategoriesList?.occupationalCategories;

  const occupationalCategoriesListOptions = occupationalCategoriesList
    ? occupationalCategoriesList.map((item) => ({ label: item, value: item }))
    : [];

  const {
    data: getUnemploymentTimeList,
    isPending: isUnemploymentTimePending,
  } = useQuery({
    queryKey: [QUERY_KEYS.fetchUnemploymentTime],
    queryFn: fetchUnemploymentTime,
  });
  const unemploymentTimeList = getUnemploymentTimeList?.unemploymentTime;
  const unemploymentTimeListOptions = unemploymentTimeList
    ? unemploymentTimeList.map((item) => ({ label: item, value: item }))
    : [];
  const { mutate, isPending: isLogoutPending } = useMutation({
    mutationFn: LogOut,
    onSuccess: () => {
      Cookies.remove("accessToken");
      localStorage.removeItem("user");
      localStorage.removeItem("path");
      setValue("email", email || "");
      dispatch(setPath([]));
      navigate("/auth");
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
    if (email && type && cName) {
      if (userData) {
        const userId = userData?.query?.id;
        mutate(userId);
        Cookies.remove("accessToken");
        localStorage.removeItem("user");
        localStorage.removeItem("path");
      } else {
        setValue("email", email);
        setValue("memberCompany", decodeURI(cName));
        setValue("firstName", fName || "");
        setValue("surname", lName || "");
      }
    }
  }, [email, userData, fName, lName]);

  const { mutate: update_Employee, isPending } = useMutation({
    mutationFn: updateEmployeeEmail,
    onSuccess: (data) => {
      if (data?.data?.trainerExist?.length > 0) {
        toast({
          title: "Error",
          description: "Trainer invitation already send.",
          variant: "destructive",
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

  const countryOption = country?.data
    ? country?.data
        ?.map((item) => {
          return { value: item?.name, label: item?.name };
        })
        .sort((a, b) => a.label.localeCompare(b.label))
    : [];
  const onSubmit = async (data: FieldValues) => {
    const payload = {
      email: email,
      ageRange: data.ageRange,
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
        <span className="text-[#202020] text-2xl leading-[30px] font-bold drop-shadow-[0px_4px_4px_0px_#00000060] font-droid">
          Registration
        </span>
        {/* <div className="flex overflow-hidden justify-evenly border-gainsboro-100 border-solid border-[1px] rounded-[5px] sm:w-[328px] w-[300px] h-[42px] sm:text-[18px] text-base leading-[18px] font-normal text-darkslategray-100 sm:mt-[27px] mt-5 sm:mb-[33px] mb-[25px]">
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
            Trainee
          </button>
        </div> */}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 sm:gap-x-8 gap-x-[15px] text-[16px] leading-[19.53px] font-bold">
          <div className="mb-4 col-span-1">
            <label className="mb-1  text-[#3A3A3A] font-bold flex items-center leading-5 font-droid sm:text-base text-[15px]">
              Contact First Name
              <img src={mandatory} className="p-1" />
            </label>
            <InputWithLable
              className={"!w-full font-normal"}
              placeholder="Enter First Name"
              {...register("firstName")}
            />
            {errors.firstName && (
              <ErrorMessage
                message={(errors?.firstName?.message as string) || ""}
              />
            )}
          </div>
          <div className="mb-4 col-span-1">
            <label className="mb-1  text-[#3A3A3A] font-bold flex items-center leading-5 font-droid sm:text-base text-[15px]">
              Contact Last Name
              <img src={mandatory} className="p-1" />
            </label>
            <InputWithLable
              className={"!w-full font-normal"}
              placeholder="Enter Surname"
              {...register("surname")}
            />
            {errors.surname && (
              <ErrorMessage
                message={(errors?.surname?.message as string) || ""}
              />
            )}
          </div>
          <div className="mb-4 col-span-1">
            <label className="mb-1  text-[#3A3A3A] font-bold flex items-center leading-5 font-droid sm:text-base text-[15px]">
              Gender
              <img src={mandatory} className="p-1" />
            </label>
            <SelectMenu
              option={genderOptions}
              setValue={(value: string) => {
                setSelectBoxValues({ ...selectBoxValues, gender: value });
                setValue("gender", value);
              }}
              value={selectBoxValues.gender}
              placeholder="Gender - Select"
            />
            {!errors.gender?.ref?.value && (
              <ErrorMessage
                message={(errors?.gender?.message as string) || ""}
              />
            )}
          </div>
          <div className="mb-4 col-span-1">
            <label className="mb-1  text-[#3A3A3A] font-bold flex items-center leading-5 font-droid sm:text-base text-[15px]">
              Age Range
              <img src={mandatory} className="p-1" />
            </label>
            <SelectMenu
              option={ageOptions}
              setValue={(value: string) => {
                setSelectBoxValues({ ...selectBoxValues, ageRange: value });
                setValue("ageRange", value);
              }}
              value={selectBoxValues.ageRange}
              placeholder="Age Range - Select"
              isLoading={isAgeRangesPending}
            />
            {!errors.ageRange?.ref?.value && (
              <ErrorMessage
                message={(errors?.ageRange?.message as string) || ""}
              />
            )}
          </div>
          <div className="mb-4 col-span-1">
            <label className="mb-1  text-[#3A3A3A] font-bold flex items-center leading-5 font-droid sm:text-base text-[15px]">
              Email
              <img src={mandatory} className="p-1" />
            </label>
            <InputWithLable
              {...register("email")}
              placeholder="Enter Email"
              className={"!w-full disabled:opacity-50 font-normal"}
              // value={email ? email : ""}
              disable={email ? true : false}
            />
            {errors.email && (
              <ErrorMessage
                message={(errors?.email?.message as string) || ""}
              />
            )}
          </div>
          <div className="mb-4 col-span-1">
            <label className="mb-1  text-[#3A3A3A] font-bold flex items-center leading-5 font-droid sm:text-base text-[15px]">
              Phone
            </label>
            <PhoneInput
              placeholder="Enter phone number"
              value={phone}
              international
              onChange={(e: any) => {
                setValue("phone", e);
                setPhone(e);
                if (e?.trim()?.length < 10 || e?.trim()?.length > 15) {
                  setError("phone", {
                    message: "Please enter valid phone number",
                  });
                } else {
                  setError("phone", {
                    message: "",
                  });
                }
              }}
              className="phone-input font-normal"
            />
            {errors.phone && (
              <ErrorMessage
                message={(errors?.phone?.message as string) || ""}
              />
            )}
          </div>
          <div className="mb-4 col-span-1">
            <label className="mb-1  text-[#3A3A3A] font-bold flex items-center leading-5 font-droid sm:text-base text-[15px]">
              Current Highest NFQ
              <img src={mandatory} className="p-1" />
            </label>
            {/* <InputWithLable
              className={"!w-full font-normal"}
              {...register("currentHighestNFQ")}
            /> */}
            <SelectMenu
              option={nfqOption}
              setValue={(value: string) => {
                setSelectBoxValues({
                  ...selectBoxValues,
                  currentHighestNFQ: value,
                });
                setValue("currentHighestNFQ", value);
              }}
              value={selectBoxValues?.currentHighestNFQ}
              placeholder="Current Highest NFQ - Select"
              isLoading={nfqPending}
            />
            {!errors.currentHighestNFQ?.ref?.value && (
              <ErrorMessage
                message={(errors?.currentHighestNFQ?.message as string) || ""}
              />
            )}
          </div>
          <div className="mb-4 col-span-1">
            <label className="mb-1  text-[#3A3A3A] font-bold flex items-center leading-5 font-droid sm:text-base text-[15px]">
              Employment Status
            </label>
            <SelectMenu
              option={employmentStatusListOptions}
              setValue={(value: string) => {
                setSelectBoxValues({
                  ...selectBoxValues,
                  employmentStatus: value,
                });
                setValue("employmentStatus", value);
                if (value === "Unemployed" && !watch("unemploymentTime")) {
                  setError("unemploymentTime", {
                    message: "Please select valid time",
                  });
                } else {
                  setError("unemploymentTime", {
                    message: "",
                  });
                }
              }}
              value={selectBoxValues.employmentStatus}
              placeholder="Employment Status - Select"
              isLoading={isEmploymentStatusPending}
            />
            {!errors.employmentStatus?.ref?.value && (
              <ErrorMessage
                message={(errors?.employmentStatus?.message as string) || ""}
              />
            )}
          </div>
          <div className="mb-4 col-span-1">
            <label className="mb-1  text-[#3A3A3A] font-bold flex items-center leading-5 font-droid sm:text-base text-[15px]">
              Member Company
            </label>
            <InputWithLable
              className={"!w-full font-normal"}
              placeholder="Enter member company"
              {...register("memberCompany")}
              disabled={cName ? true : false}
            />
            {errors.memberCompany && (
              <ErrorMessage
                message={(errors?.memberCompany?.message as string) || ""}
              />
            )}
          </div>
          <div className="mb-4 col-span-1">
            <label className="mb-1  text-[#3A3A3A] font-bold flex items-center leading-5 font-droid sm:text-base text-[15px]">
              Occupational Category
              <img src={mandatory} className="p-1" />
            </label>
            <SelectMenu
              option={occupationalCategoriesListOptions}
              setValue={(value: string) => {
                setSelectBoxValues({
                  ...selectBoxValues,
                  occupationalCategory: value,
                });
                setValue("occupationalCategory", value);
              }}
              value={selectBoxValues.occupationalCategory}
              placeholder="Occupational Category - Select"
              isLoading={isOccupationalCategoriesPending}
            />
            {!errors.occupationalCategory?.ref?.value && (
              <ErrorMessage
                message={
                  (errors?.occupationalCategory?.message as string) || ""
                }
              />
            )}
          </div>
          <div className="mb-4 col-span-1">
            <label className="mb-1  text-[#3A3A3A] font-bold flex items-center leading-5 font-droid sm:text-base text-[15px]">
              Unemployment Time
            </label>
            <SelectMenu
              option={unemploymentTimeListOptions}
              setValue={(value: string) => {
                setSelectBoxValues({
                  ...selectBoxValues,
                  unemploymentTime: value,
                });
                setValue("unemploymentTime", value);
                setError("unemploymentTime", {
                  message: "",
                });
              }}
              value={selectBoxValues.unemploymentTime}
              placeholder="Unemployment Time - Select"
              isLoading={isUnemploymentTimePending}
            />
            {!errors.unemploymentTime?.ref?.value && (
              <ErrorMessage
                message={(errors?.unemploymentTime?.message as string) || ""}
              />
            )}
          </div>
          <div className="mb-4 col-span-1">
            <label className="mb-1  text-[#3A3A3A] font-bold flex items-center leading-5 font-droid sm:text-base text-[15px]">
              County Of Residence
              <img src={mandatory} className="p-1" />
            </label>
            <SelectMenu
              option={countryOption}
              setValue={(value: string) => {
                setSelectBoxValues({
                  ...selectBoxValues,
                  countryOfResidence: value,
                });
                setValue("countyOfResidence", value);
              }}
              value={selectBoxValues.countryOfResidence}
              placeholder="County Of Residence - Select"
              isLoading={isUnemploymentTimePending}
            />

            {!errors.countyOfResidence?.ref?.value && (
              <ErrorMessage
                message={(errors?.countyOfResidence?.message as string) || ""}
              />
            )}
          </div>
          <div className="mb-4 col-span-1">
            <label className="mb-1  text-[#3A3A3A] font-bold flex items-center leading-5 font-droid sm:text-base text-[15px]">
              Attended Event
            </label>
            <InputWithLable
              className={"!w-full font-normal"}
              placeholder="Enter attended event"
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
          className="xl:mt-4 sm:mt-6 mt-4 bg-primary-button rounded sm:w-[370px] w-[300px] h-12 text-white text-lg shadow-[0px_4px_4px_0px_#00000040] m-auto flex justify-center py-3 font-font-droid font-bold"
        >
          {isPending ? <Loader containerClassName="h-auto" /> : "Submit"}
        </button>
      </form>
      <p className="xl:mt-[39px] mt-[30px] text-[#898989] text-[12px] leading-[14.65px] w-[296px] text-center font-normal mx-auto">
        Protected by reCAPTCHA and subject to the Skillnet
        <Link
          to={"/privacypolicy"}
          className="text-darkslategray-200 font-bold mx-1"
        >
          Privacy Policy
        </Link>
        and
        <Link
          to={"/termsofservices"}
          className="text-darkslategray-200 font-bold mx-1"
        >
          Terms of Service.
        </Link>
      </p>
      <Loading isLoading={isLogoutPending} />
    </>
  );
};

export default RegisterTraineeForm;
