import CompanyRegisterSideImage from "@/assets/images/RegisterSideImage.svg";
import { PrimaryButton } from "@/components/comman/Button/CustomButton";
import ErrorMessage from "@/components/comman/Error/ErrorMessage";
import Loading from "@/components/comman/Error/Loading";
import Loader from "@/components/comman/Loader";
import SelectMenu from "@/components/comman/SelectMenu";
import HomeHeader from "@/components/homePage/HomeHeader";
import { InputWithLable } from "@/components/ui/inputwithlable";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useAppSelector } from "@/hooks/use-redux";
import { employeeOption, QUERY_KEYS, sectorOption } from "@/lib/constants";
import {
  getCompanyDetailsById,
  getCountry,
  updateCompany,
} from "@/services/apiServices/company";
import { enumUpadate } from "@/services/apiServices/enum";
import { Company, CountryResponse } from "@/types/Company";
import { ErrorType } from "@/types/Errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

export interface CompanyResponse {
  data?: DataEntity[] | null;
  message: string;
}
interface DataEntity {
  company_num: number;
  company_bus_ind: string;
  company_name: string;
  company_addr_1: string;
  company_addr_2: string;
  company_addr_3: string;
  company_addr_4: string;
  company_reg_date: string;
  company_status_desc: string;
  company_status_date: string;
  last_ar_date: string;
  next_ar_date: string;
  last_acc_date: string;
  comp_type_desc: string;
  company_type_code: number;
  company_status_code: number;
  place_of_business: string;
  eircode: string;
}

function CompanyRegister() {
  const navigate = useNavigate();
  const [isAble, setIsAble] = useState(true);
  const UserId = useAppSelector((state) => state.user.UserId);
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const [companyNumberId, setCompanyNumberId] = useState<number | null>(null);
  const [soleTrader, setSoleTrader] = useState("");
  const userID = UserId
    ? UserId
    : userData?.query
    ? userData?.query?.id
    : userData?.id;

  const schema = z.object({
    name: z.string().min(1, { message: "Please enter name" }),
    address: z.string().min(1, { message: "Please enter address" }),
    county: z.string().min(1, { message: "Please select county" }),
    averageNumberOfEmployees: z
      .string()
      .min(1, { message: "Average Number Of Employees is required" }),
    sector: z.string().min(1, { message: "Sector is required" }),
    parentCompanyAddress: z.string().nullable(),
    parentCompanyName: z.string().nullable(),
    email: z.string().min(1, { message: "Please enter email" }),
    parentCompanyCounty: z.string().nullable().optional(),
  });

  type ValidationSchema = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(schema),
    mode: "all",
  });

  useEffect(() => {
    if (userData) {
      const userEmail = userData?.query
        ? userData?.query.email
        : userData?.email;
      setValue("email", userEmail);
    }
  }, [setValue, userData]);

  const handleCheckboxChange = (value: string) => {
    setSoleTrader(value);
  };

  const { toast } = useToast();

  const queryClient = useQueryClient();

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
    mutationFn: getCompanyDetailsById,
    onSuccess: async (data: CompanyResponse) => {
      if (!!data?.data && data?.data?.length > 0) {
        const getData = data?.data?.[0];
        const add =
          getData?.company_addr_1 +
          ", " +
          getData?.company_addr_2 +
          ", " +
          getData?.company_addr_3 +
          ", " +
          getData?.company_addr_4;
        setIsAble(false);
        setValue("address", add);
      } else {
        setIsAble(true);
        toast({
          variant: "destructive",
          title: data?.message,
        });
      }
    },
    onError: (error: any) => {
      console.log("error", error);

      toast({
        variant: "destructive",
        title: error?.data?.message,
      });
    },
  });

  const { mutate: updatecompany, isPending: updatePanding } = useMutation({
    mutationFn: updateCompany,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.companyList],
      });

      localStorage.setItem("user", JSON.stringify(data?.data?.data));

      toast({ title: "Company updated Successfully" });
      EnumUpadate();
    },
    onError: (error: ErrorType) => {
      toast({
        variant: "destructive",
        title: error.data.message,
      });
    },
  });

  const path = 3 + 1;
  const { mutate: EnumUpadate } = useMutation({
    mutationFn: () => enumUpadate({ path: path.toString() }, +userID),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.enumUpadateList],
      });
      localStorage.setItem("path", JSON.stringify(data.data.data?.pathStatus));
      navigate("/maturelevel");
    },
  });

  console.log("errors", errors);

  // useEffect(() => {
  //   if (companydetails) {
  //     const data = companydetails.data.data.client;
  //     Object.keys(data).forEach((key: any) => {
  //       setValue(key, data[key]);
  //     });
  //   }
  // }, [companydetails]);

  const onSubmit = async (data: FieldValues) => {
    const updatedData = {
      ...data,
      companyId: companyNumberId as number,
      soleTrader: soleTrader === "true" ? true : false,
    };
    updatecompany(updatedData as Company);
  };

  const handleVerifyId = () => {
    const companyName = watch("name");
    if (companyName) {
      mutate({ company_num: companyNumberId || 0, companyName: companyName });
    } else {
      toast({ variant: "destructive", title: "Please Enter Company Name" });
    }
  };

  return (
    <>
      <HomeHeader />
      <div className="w-full flex relative mt-[34px] mx-auto mainContailner">
        <div className="lg:block hidden">
          <img
            className="xl:min-w-[590px] lg:min-w-[500px] min-w-full w-full h-full object-cover"
            src={CompanyRegisterSideImage}
          />
          {/* <img
            src={RegisterSideImage}
            className="xl:w-auto min-w-[530px] w-[530px] h-full lg:block hidden"
            alt="LandingPageBuildImage"
            loading="lazy"
          /> */}
        </div>

        <div className="w-full xl:px-0 px-5 lg:max-w-[515px] max-w-[600px] mx-auto lg:mt-0 mt-5">
          <div className="flex justify-end text-color">
            <label>
              Already have an account?{" "}
              <Link to={"/auth"} className="font-[700] text-[#042937]">
                Sign In
              </Link>
            </label>
          </div>
          <div className="mt-[20px] ">
            <div>
              <h2 className="text-[25px] font-abhaya">Got it! </h2>
              <h2 className="text-[25px] font-abhaya">
                Let’s get your
                <span className="text-[#64A70B] ml-1">
                  Sustainability Score
                </span>{" "}
                then.
              </h2>

              <p className="font-abhaya mt-[10px]">
                Fill in your details to start your self-assessment in a jiff.
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-wrap gap-x-[10px] xl:gap-x-[20px] xl:gap-y-[14px] gap-y-[5px] mt-[30px]">
                <div className="w-full">
                  <InputWithLable
                    className="w-full h-[46px]"
                    placeholder="Company Name"
                    label="Company Name"
                    {...register("name")}
                    isMendatory={true}
                  />
                  {errors.name && (
                    <ErrorMessage message={errors.name.message as string} />
                  )}
                </div>
                <div className="w-full flex items-end">
                  <div className="w-full">
                    <InputWithLable
                      className="w-full h-[46px]"
                      placeholder="Company Number"
                      label="Company Number"
                      onChange={(e) => {
                        const { value } = e.target;

                        if (value.match(/^[0-9]*$/)) {
                          setCompanyNumberId(+e?.target?.value as number);
                        }
                        return;
                      }}
                      value={companyNumberId || ""}
                      isMendatory={true}
                    />
                  </div>
                  <PrimaryButton
                    type="button"
                    name={
                      isPending ? (
                        <Loader containerClassName="h-auto" />
                      ) : (
                        "Verify"
                      )
                    }
                    disabled={watch("name")?.length === 0}
                    className="px-5 h-[46px] ml-[20px]"
                    onClick={handleVerifyId}
                  />
                </div>
                <div className="w-full">
                  <InputWithLable
                    placeholder="Address"
                    className="w-full h-[46px]"
                    label="Address"
                    {...register("address")}
                    isMendatory={true}
                  />
                  {errors.address && (
                    <ErrorMessage message={errors.address.message as string} />
                  )}
                </div>

                <div className="sm:w-[241px] w-full">
                  <Label className="mb-[8px]  font-bold text-[16px]">
                    County <span className="text-[#FF0000]">*</span>
                  </Label>
                  <SelectMenu
                    option={countryOption || []}
                    placeholder="Select county"
                    className="sm:w-[241px] w-full h-[46px] mt-2"
                    setValue={(data: string) => setValue("county", data)}
                    value={watch("county") || ""}
                  />
                  {errors.county && (
                    <ErrorMessage message={errors.county.message as string} />
                  )}
                </div>
                <div className="sm:w-[241px] w-full">
                  <Label className="mb-[8px]  font-bold text-[16px]">
                    Average Number Of Employees{" "}
                    <span className="text-[#FF0000]">*</span>
                  </Label>
                  <SelectMenu
                    option={employeeOption || []}
                    placeholder="Number of employees"
                    className="sm:w-[241px] w-full h-[46px] mt-2"
                    setValue={(data: string) =>
                      setValue("averageNumberOfEmployees", data)
                    }
                    value={watch("averageNumberOfEmployees") || ""}
                  />
                  {errors.averageNumberOfEmployees && (
                    <ErrorMessage
                      message={
                        errors.averageNumberOfEmployees.message as string
                      }
                    />
                  )}
                </div>

                <div className="sm:w-[241px] w-full">
                  <Label className="mb-[8px]  font-bold text-[16px]">
                    Sector <span className="text-[#FF0000]">*</span>
                  </Label>
                  <SelectMenu
                    option={sectorOption || []}
                    placeholder="Select Sector"
                    className="sm:w-[241px] w-full h-[46px] mt-2"
                    setValue={(data: string) => setValue("sector", data)}
                    value={watch("sector") || ""}
                  />
                  {errors.sector && (
                    <ErrorMessage message={errors.sector.message as string} />
                  )}
                </div>
                <div className="sm:w-[241px] w-full">
                  <InputWithLable
                    placeholder="Parent Company Address."
                    className="sm:w-[241px] w-full h-[46px]"
                    label="Parent Company Address."
                    {...register("parentCompanyAddress")}
                  />
                  {errors.parentCompanyAddress && (
                    <ErrorMessage
                      message={errors.parentCompanyAddress.message as string}
                    />
                  )}
                </div>

                <div className="sm:w-[241px] w-full">
                  <InputWithLable
                    placeholder="221 B Baker Street"
                    className="sm:w-[241px] w-full h-[46px]"
                    label="Parent Company Name"
                    {...register("parentCompanyName")}
                  />
                  {errors.parentCompanyName && (
                    <ErrorMessage
                      message={errors.parentCompanyName.message as string}
                    />
                  )}
                </div>
                <div className="sm:w-[241px] w-full">
                  <InputWithLable
                    placeholder="Enter Email"
                    className="sm:w-[241px] w-full h-[46px]"
                    label="Email Address"
                    {...register("email")}
                    disabled
                    isMendatory={true}
                  />
                  {errors.email && (
                    <ErrorMessage message={errors.email.message as string} />
                  )}
                </div>
                {/* <InputWithLable
                    placeholder="John"
                    className="w-[241px] h-[46px]"
                    label="Parent Company County"
                    {...register("parentCompanyCounty")}
                  />
                  {errors.parentCompanyCounty && (
                    <ErrorMessage
                      message={errors.parentCompanyCounty.message as string}
                    />
                  )} */}
                <div className="sm:w-[241px] w-full">
                  <Label className="mb-[8px]  font-bold text-[16px]">
                    Parent Company County
                  </Label>
                  <SelectMenu
                    option={countryOption || []}
                    placeholder="Select county"
                    className="sm:w-[241px] w-full h-[46px] mt-2"
                    setValue={(data: string) =>
                      setValue("parentCompanyCounty", data)
                    }
                    value={watch("parentCompanyCounty") || ""}
                  />
                  {errors.parentCompanyCounty && (
                    <ErrorMessage
                      message={errors.parentCompanyCounty.message as string}
                    />
                  )}
                </div>

                <div className="w-[241px] ">
                  <label className="block font-bold text-[16px] mt-[2px] pb-[5px]">
                    Sole Trader <span className="text-[#FF0000]">*</span>
                  </label>

                  <div className="flex items-center gap-[10px] h-[52px]">
                    <input
                      className="w-[24px] h-[24px] bf-[green] accent-[#00778B]"
                      type="checkbox"
                      checked={soleTrader == "true"}
                      onChange={() => handleCheckboxChange("true")}
                    />
                    <label>Yes</label>
                    <input
                      className="w-[24px] h-[24px] pl-[23px] accent-[#00778B]"
                      type="checkbox"
                      checked={soleTrader == "false"}
                      onChange={() => handleCheckboxChange("false")}
                    />
                    <label> No </label>
                  </div>
                </div>
                <PrimaryButton
                  type="submit"
                  name="Submit"
                  className="w-[370px] h-[48px] lg:mt-[107px] sm:mt-[50px] mt-[30px] mx-auto !primary-background"
                  disabled={isAble}
                />
                <div className="max-w-[296px] mx-auto lg:mt-[60px] sm:mt-[40px] mt-[20px] mb-[40px] h-[30px] font-[400] text-[12px] text-center text-[#898989]">
                  <label>
                    Protected by reCAPTCHA and subject to the Skillnet{" "}
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
            </form>
          </div>
        </div>
        <Loading isLoading={updatePanding} />
      </div>
    </>
  );
}

export default CompanyRegister;
