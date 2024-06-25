import { PrimaryButton } from "@/components/comman/Button/CustomButton";
import ErrorMessage from "@/components/comman/Error/ErrorMessage";
import Loading from "@/components/comman/Error/Loading";
import Loader from "@/components/comman/Loader";
import SelectMenu from "@/components/comman/SelectMenu";
import Header from "@/components/Header";
import { InputWithLable } from "@/components/ui/inputwithlable";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useAppSelector } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
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

  const schema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    address: z.string().min(1, { message: "Address is required" }),
    county: z.string().min(1, { message: "County is required" }),
    averageNumberOfEmployees: z
      .string()
      .min(1, { message: "Average Number Of Employees is required" })
      .regex(/^[0-9]+$/, "Average Number Of Employees is Invalid"),
    sector: z.string().min(1, { message: "Sector is required" }),
    parentCompanyAddress: z
      .string()
      .min(1, { message: "Parent Company Address is required" }),
    parentCompanyName: z
      .string()
      .min(1, { message: "Parent Company Name is required" }),
    email: z.string().min(1, { message: "Email is required" }),
    parentCompanyCounty: z
      .string()
      .min(1, { message: "Parent Company County is required" }),
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
    country?.data?.map((item) => {
      return { value: item?.name, label: item?.name };
    });

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
        setValue("name", data?.data?.[0]?.company_name);
        setValue("address", add);
      } else {
        setIsAble(true);
        toast({
          variant: "destructive",
          title: "Invalid Company Id",
        });
      }
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Invalid Company Id",
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

      toast({ title: "Company update Successfully" });
      EnumUpadate();
      navigate("/maturelevel");
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
    mutationFn: () => enumUpadate({ path: path.toString() }, +UserId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.enumUpadateList],
      });
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
    mutate(companyNumberId || 0);
  };

  return (
    <>
      <Header />
      <div className="w-full flex relative mt-[34px] mx-auto mainContailner">
        <div>
          <img
            className="max-w-full h-full object-cover"
            src="../assets/img/Group 1000001826.png"
          />
        </div>

        <div className="w-full xl:px-0 px-2 max-w-[515px] mx-auto">
          <div className="flex justify-end text-color">
            <label>
              Already have an account?{" "}
              <Link to={"/auth"} className="font-[700] text-[#042937]">
                Sign In
              </Link>
            </label>
          </div>
          <div className=" mt-[67px] ">
            <div className="flex gap-x-[8px] h-180px items-end">
              <h3 className="text-[24px]">Complete your registration</h3>
              <img
                className="mb-[10px]"
                src="../assets/img/Group 1000001825.png"
              />
            </div>
            <div className="flex gap-x-[8px] h-180px items-end">
              <h3 className="text-[24px]">
                to unlock your full{" "}
                <span className="text-secondary-button font-semibold text-[24px]">
                  self-assessment score
                </span>
              </h3>
            </div>

            <div className="w-full flex items-end mb-5 mt-[45px]">
              <div>
                <InputWithLable
                  className="w-[241px] h-[46px]"
                  placeholder="Company Id"
                  label="Company Id"
                  onChange={(e) => {
                    const { value } = e.target;

                    if (value.match(/^[0-9]*$/)) {
                      setCompanyNumberId(+e?.target?.value as number);
                    }
                    return;
                  }}
                  value={companyNumberId || ""}
                />
              </div>
              <PrimaryButton
                type="button"
                name={
                  isPending ? <Loader containerClassName="h-auto" /> : "Verify"
                }
                className="px-5 h-[46px] ml-[20px]"
                onClick={handleVerifyId}
              />
              {/* <button
                className="h-[46px] px-5 rounded ml-5 bg-primary-button text-white"
                onClick={handleVerifyId}
              >
                {isPending ? <Loader containerClassName="h-auto" /> : "Verify"}
              </button> */}
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-wrap gap-x-[10px] xl:gap-x-[20px] gap-y-[5px]">
                <div>
                  <InputWithLable
                    className="w-[241px] h-[46px]"
                    placeholder="Sample Consulting Company"
                    label="Name"
                    {...register("name")}
                  />
                  {errors.name && (
                    <ErrorMessage message={errors.name.message as string} />
                  )}
                </div>
                <div>
                  <InputWithLable
                    placeholder="IT or University"
                    className="w-[241px] h-[46px]"
                    label="Address"
                    {...register("address")}
                  />
                  {errors.address && (
                    <ErrorMessage message={errors.address.message as string} />
                  )}
                </div>

                <div>
                  <Label className="mb-[8px]  font-bold text-[16px]">
                    County
                  </Label>
                  <SelectMenu
                    option={countryOption || []}
                    placeholder="Select your country"
                    className="w-[241px] h-[46px] mt-2"
                    setValue={(data: string) => setValue("county", data)}
                    value={watch("county") || ""}
                  />
                  {errors.county && (
                    <ErrorMessage message={errors.county.message as string} />
                  )}
                </div>
                <div>
                  <InputWithLable
                    placeholder="Number of employees"
                    className="w-[241px] h-[46px]"
                    label="Average Number Of Employees"
                    onChange={(e) => {
                      const { value } = e.target;
                      if (value.match(/^[0-9]*$/)) {
                        setValue("averageNumberOfEmployees", value);
                      }
                      return;
                    }}
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

                <div>
                  <InputWithLable
                    placeholder="Select sector"
                    className="w-[241px] h-[46px]"
                    label="Sector"
                    {...register("sector")}
                  />
                  {errors.sector && (
                    <ErrorMessage message={errors.sector.message as string} />
                  )}
                </div>
                <div>
                  <InputWithLable
                    placeholder=""
                    className="w-[241px] h-[46px]"
                    label="Parent Company Address."
                    {...register("parentCompanyAddress")}
                  />
                  {errors.parentCompanyAddress && (
                    <ErrorMessage
                      message={errors.parentCompanyAddress.message as string}
                    />
                  )}
                </div>

                <div>
                  <InputWithLable
                    placeholder="221 B Baker Street"
                    className="w-[241px] h-[46px]"
                    label="Parent Company Name"
                    {...register("parentCompanyName")}
                  />
                  {errors.parentCompanyName && (
                    <ErrorMessage
                      message={errors.parentCompanyName.message as string}
                    />
                  )}
                </div>
                <div>
                  <InputWithLable
                    placeholder="Enter Email"
                    className="w-[241px] h-[46px]"
                    label="Email Address"
                    {...register("email")}
                    disabled
                  />
                  {errors.email && (
                    <ErrorMessage message={errors.email.message as string} />
                  )}
                </div>

                <div>
                  <InputWithLable
                    placeholder="John"
                    className="w-[241px] h-[46px]"
                    label="Parent Company County"
                    {...register("parentCompanyCounty")}
                  />
                  {errors.parentCompanyCounty && (
                    <ErrorMessage
                      message={errors.parentCompanyCounty.message as string}
                    />
                  )}
                </div>

                <div className="w-[241px] ">
                  <label className="block font-bold text-[16px] mt-[2px] pb-[5px]">
                    Sole Trader
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
                  className="w-[370px] h-[48px] mt-[107px] ml-[87px]"
                  disabled={isAble}
                />
                <div className="max-w-[296px] mx-auto mt-[60px] mb-[40px] h-[30px] font-[400] text-[12px] text-center text-[#898989]">
                  <label>
                    Protected by reCAPTCHA and subject to the Skillnet{" "}
                    <Link to={"/privacypolicy"} className="text-color">
                      Privacy Policy
                    </Link>{" "}
                    and{" "}
                    <Link to={"/termsofservices"} className="text-color">
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
