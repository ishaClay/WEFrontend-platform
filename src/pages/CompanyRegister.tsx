import CompanyRegisterSideImage from "@/assets/images/LandingapageCompany.png";
import { PrimaryButton } from "@/components/comman/Button/CustomButton";
import ErrorMessage from "@/components/comman/Error/ErrorMessage";
import Loading from "@/components/comman/Error/Loading";
import Loader from "@/components/comman/Loader";
import SelectMenu from "@/components/comman/SelectMenu";
import HomeFooter from "@/components/homePage/HomeFooter";
import HomeHeader from "@/components/homePage/HomeHeader";
import CompanyDetails from "@/components/Models/CompanyDetails";
import { InputWithLable } from "@/components/ui/inputwithlable";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { getDeviceToken } from "@/firebaseConfig";
import { useAppSelector } from "@/hooks/use-redux";
import { employeeOption, QUERY_KEYS, sectorOption } from "@/lib/constants";
import {
  getCompanyDetailsById,
  getCountry,
  updateCompany,
} from "@/services/apiServices/company";
import { enumUpadate } from "@/services/apiServices/enum";
import { CountryResponse } from "@/types/Company";
import { ErrorType } from "@/types/Errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
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
  const UserId = useAppSelector((state) => state.user.UserId);
  const clientId = useAppSelector((state) => state.user.clientId);
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const [companyNumberId, setCompanyNumberId] = useState<number | null>(null);
  const [companyData, setCompanyData] = useState<any | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isCompanyVerified, setIsCompanyVerified] = useState(false);
  const userID = UserId
    ? UserId
    : userData?.query
    ? userData?.query?.id
    : userData?.id;

  const schema = z
    .object({
      name: z.string().optional(),
      address: z.string().optional(),
      county: z.string(),
      averageNumberOfEmployees: z.string(),
      sector: z.string(),
      parentCompanyAddress: z.string().nullable(),
      parentCompanyName: z.string().nullable(),
      email: z.string().min(1, { message: "Please enter email" }),
      parentCompanyCounty: z.string().nullable().optional(),
      contactFirstName: z
        .string()
        .min(1, { message: "Please enter contact first name" })
        .regex(
          /^[A-Za-z]+(?:\s[A-Za-z]+)*$/,
          "Please enter valid contact first name"
        ),
      contactLastName: z
        .string()
        .min(1, { message: "Please enter contact last name" })
        .regex(
          /^[A-Za-z]+(?:\s[A-Za-z]+)*$/,
          "Please enter valid contact last name"
        ),
      soleTrader: z.string(),
      companyNumberId: z.number().nullable().optional(),
      isRegister: z.boolean(),
    })
    .partial()
    .superRefine((data, ctx) => {
      if (
        (data.isRegister || data.soleTrader === "No") &&
        !data.companyNumberId
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please verify company number",
          path: ["companyNumberId"],
        });
      }
      if ((data.isRegister || data.soleTrader === "No") && !data.name?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please enter name",
          path: ["name"],
        });
      }

      if (
        (data.isRegister || data.soleTrader === "No") &&
        !data.address?.trim()
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please enter address",
          path: ["address"],
        });
      }

      if (!data.county) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please select county",
          path: ["county"],
        });
      }
      if (!data.averageNumberOfEmployees) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please select employees",
          path: ["averageNumberOfEmployees"],
        });
      }
      if (!data.sector) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please select sector",
          path: ["sector"],
        });
      }
      if (!data.soleTrader) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please select sole trader",
          path: ["soleTrader"],
        });
      }
    });

  type ValidationSchema = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: {
      isRegister: false,
    },
  });
  useEffect(() => {
    if (userData) {
      const userEmail = userData?.query
        ? userData?.query.email
        : userData?.email;
      setValue("email", userEmail);
    }
  }, [setValue, userData]);

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
        setCompanyData(data?.data?.[0]);
        setIsOpen(true);
      } else {
        toast({
          variant: "destructive",
          title: data?.message,
        });
      }
    },
    onError: (error: any) => {
      console.error("error", error);

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
      const expiresIn24Hours = new Date(
        new Date().getTime() + 24 * 60 * 60 * 1000
      );
      Cookies.set("accessToken", data?.data?.data?.accessToken, {
        expires: expiresIn24Hours,
      });

      toast({ variant: "success", title: "Company updated successfully" });
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

  const onSubmit = async (data: FieldValues) => {
    const token = await getDeviceToken();
    const updatedData = {
      ...data,
      companyId: companyNumberId,
      soleTrader: data?.soleTrader === "Yes" ? true : false,
      deviceToken: token,
      name: !data?.name
        ? `${data?.contactFirstName} ${data?.contactLastName}`
        : data?.name,
      address: data?.address ? data?.address : "",
    };
    updatecompany(updatedData);
  };

  const handleVerifyId = () => {
    const companyName = watch("name");
    if (companyName && companyNumberId) {
      mutate({
        company_num: companyNumberId || 0,
        companyName: companyName,
        clientId,
      });
    } else {
      toast({ variant: "destructive", title: "Please enter company name" });
    }
  };

  const handleAccept = () => {
    const getData = companyData;
    const addressParts = [
      getData?.company_addr_1,
      getData?.company_addr_2,
      getData?.company_addr_3,
      getData?.company_addr_4,
    ].filter((part) => part != null && part.trim() !== "");

    const add = addressParts.join(", ");

    setValue("address", add);
    setValue("name", getData?.company_name);
    setIsCompanyVerified(true);
    setIsOpen(false);
  };

  const handleReject = () => {
    setValue("name", "");
    setValue("address", "");
    setValue("companyNumberId", null);
    setCompanyNumberId(null);
    setIsOpen(false);
    setIsCompanyVerified(false);
    toast({
      variant: "destructive",
      title: "Please enter valid company details",
    });
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <HomeHeader />
      <div className="w-full flex relative !my-[34px] mx-auto mainContailner">
        <div className="lg:block hidden">
          <img className="" src={CompanyRegisterSideImage} />
          {/* <img
            src={RegisterSideImage}
            className="xl:w-auto min-w-[530px] w-[530px] h-full lg:block hidden"
            alt="LandingPageBuildImage"
            loading="lazy"
          /> */}
        </div>

        <div className="w-full xl:px-0 px-5 lg:max-w-[515px] max-w-[600px] mx-auto lg:mt-0 mt-5">
          {/* <div className="flex justify-end text-[#000]">
            <label>
              Already have an account?{" "}
              <Link to={"/auth"} className="font-[700] text-[#042937]">
                Sign In
              </Link>
            </label>
          </div> */}
          <div className="mt-[20px] ">
            <div>
              {/* <h2 className="text-[25px] font-font-droid">Got it! </h2> */}
              <h2 className="text-[25px] font-font-droid">
                Let’s get your full
                <span className="text-[#64A70B] ml-1">
                  Sustainability Score
                </span>{" "}
                then.
              </h2>

              <p className="font-font-droid mt-[10px] text-[#000]">
                Fill in your details to get the full breakdown of your
                self-assessment results.
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-wrap gap-x-[10px] xl:gap-x-[20px] xl:gap-y-[14px] gap-y-[5px] mt-[30px]">
                <div className="w-full">
                  <Label className="mb-[8px] text-[16px]">
                    Sole Trader <span className="text-[#FF0000]">*</span>
                  </Label>
                  <SelectMenu
                    option={[
                      {
                        label: "Yes",
                        value: "Yes",
                      },
                      {
                        label: "No",
                        value: "No",
                      },
                    ]}
                    placeholder="Please Select"
                    className="sm:w-[241px] w-full h-[46px] mt-2 placeholder:text-[#A3A3A3]"
                    setValue={(data: string) => {
                      setValue("soleTrader", data);
                      setError("soleTrader", { message: "" });
                      if (data === "Yes") {
                        setIsCompanyVerified(true);
                      } else {
                        setIsCompanyVerified(false);
                      }
                    }}
                    value={watch("soleTrader") || ""}
                  />
                  {errors.soleTrader && (
                    <ErrorMessage
                      message={errors.soleTrader.message as string}
                    />
                  )}
                </div>
                {watch("soleTrader") === "Yes" && (
                  <div className="flex items-center w-full gap-2">
                    <input
                      className="w-[16px] h-[16px] bf-[green] accent-[#00778B]"
                      type="checkbox"
                      id="isRegister"
                      onChange={(e) => {
                        setValue("isRegister", e.target.checked);
                        if (e.target.checked) {
                          setIsCompanyVerified(false);
                        } else {
                          setIsCompanyVerified(true);
                        }
                        // if (e.target.checked) {
                        //   setError("isRegister", { message: "" });
                        //   if (!watch("companyNumberId")) {
                        //     setError("companyNumberId", {
                        //       message: "Please enter company number",
                        //     });
                        //   }
                        //   if (!watch("name")) {
                        //     setError("name", {
                        //       message: "Please enter comapny name",
                        //     });
                        //   }
                        //   if (!watch("address")) {
                        //     setError("address", {
                        //       message: "Please enter company address",
                        //     });
                        //   }
                        // }
                      }}
                      checked={watch("isRegister") || false}
                    />
                    <Label
                      htmlFor="isRegister"
                      className="font-normal text-[16px]"
                    >
                      Is registered
                    </Label>
                  </div>
                )}
                {((watch("soleTrader") === "Yes" && watch("isRegister")) ||
                  watch("soleTrader") === "No") && (
                  <>
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
                    <div className="w-full">
                      <div className="w-full flex items-end">
                        <div className="w-full">
                          <InputWithLable
                            className="w-full h-[46px]"
                            placeholder="Company Number"
                            label="Company Number"
                            name="companyNumberId"
                            onChange={(e) => {
                              const { value } = e.target;

                              if (value.match(/^[0-9]*$/)) {
                                setCompanyNumberId(+e?.target?.value as number);
                                setValue("companyNumberId", +e?.target?.value);
                                setError("companyNumberId", { message: "" });
                              }
                              return;
                            }}
                            value={companyNumberId || ""}
                            isMendatory={
                              watch("soleTrader") === "No" ? false : true
                            }
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
                          disabled={isPending || !companyNumberId}
                          className="px-5 h-[46px] ml-[20px]"
                          onClick={handleVerifyId}
                        />
                      </div>
                      {errors?.companyNumberId && (
                        <ErrorMessage
                          message={errors?.companyNumberId?.message as string}
                        />
                      )}
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
                        <ErrorMessage
                          message={errors.address.message as string}
                        />
                      )}
                    </div>
                  </>
                )}
                <div className="sm:w-[241px] w-full">
                  <InputWithLable
                    placeholder="Enter Your Contact First Name"
                    className="w-full h-[46px]"
                    label="Contact First Name"
                    {...register("contactFirstName")}
                    isMendatory={true}
                  />
                  {errors.contactFirstName && (
                    <ErrorMessage
                      message={errors.contactFirstName.message as string}
                    />
                  )}
                </div>
                <div className="sm:w-[241px] w-full">
                  <InputWithLable
                    placeholder="Enter Your Contact Last Name"
                    className="w-full h-[46px]"
                    label="Contact Last Name"
                    {...register("contactLastName")}
                    isMendatory={true}
                  />
                  {errors.contactLastName && (
                    <ErrorMessage
                      message={errors.contactLastName.message as string}
                    />
                  )}
                </div>
                <div className="sm:w-[241px] w-full">
                  <Label className="mb-[8px]  font-normal text-[16px]">
                    County <span className="text-[#FF0000]">*</span>
                  </Label>
                  <SelectMenu
                    option={countryOption || []}
                    placeholder="Select county"
                    className="sm:w-[241px] w-full h-[46px] mt-2 placeholder:text-[#A3A3A3]"
                    setValue={(data: string) => {
                      setValue("county", data);
                      setError("county", { message: "" });
                    }}
                    value={watch("county") || ""}
                  />
                  {errors.county && (
                    <ErrorMessage message={errors.county.message as string} />
                  )}
                </div>
                <div className="sm:w-[241px] w-full">
                  <Label className="mb-[8px]  font-normal text-[16px]">
                    Employees <span className="text-[#FF0000]">*</span>
                  </Label>
                  <SelectMenu
                    option={employeeOption || []}
                    placeholder="Number of employees"
                    className="sm:w-[241px] w-full h-[46px] mt-2 placeholder:text-[#A3A3A3]"
                    setValue={(data: string) => {
                      setValue("averageNumberOfEmployees", data);
                      setError("averageNumberOfEmployees", { message: "" });
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

                <div className="sm:w-[241px] w-full">
                  <Label className="mb-[8px]  font-normal text-[16px]">
                    Sector <span className="text-[#FF0000]">*</span>
                  </Label>
                  <SelectMenu
                    option={sectorOption || []}
                    placeholder="Select Sector"
                    className="sm:w-[241px] w-full h-[46px] mt-2 placeholder:text-[#A3A3A3]"
                    setValue={(data: string) => {
                      setValue("sector", data);
                      setError("sector", { message: "" });
                    }}
                    value={watch("sector") || ""}
                  />
                  {errors.sector && (
                    <ErrorMessage message={errors.sector.message as string} />
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
                <div className="sm:w-[241px] w-full">
                  <InputWithLable
                    placeholder="Enter Parent Company Name"
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
                    placeholder="Parent Company Address"
                    className="sm:w-[241px] w-full h-[46px]"
                    label="Parent Company Address"
                    {...register("parentCompanyAddress")}
                  />
                  {errors.parentCompanyAddress && (
                    <ErrorMessage
                      message={errors.parentCompanyAddress.message as string}
                    />
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
                  <Label className="mb-[8px]  font-normal text-[16px]">
                    Parent Company County
                  </Label>
                  <SelectMenu
                    option={countryOption || []}
                    placeholder="Select county"
                    disabled={
                      !watch("parentCompanyName") ||
                      !watch("parentCompanyAddress")
                        ? true
                        : false
                    }
                    className="sm:w-[241px] w-full h-[46px] mt-2 placeholder:text-[#A3A3A3]"
                    setValue={(data: string) => {
                      setValue("parentCompanyCounty", data);
                      setError("parentCompanyCounty", { message: "" });
                    }}
                    value={watch("parentCompanyCounty") || ""}
                  />
                  {errors.parentCompanyCounty && (
                    <ErrorMessage
                      message={errors.parentCompanyCounty.message as string}
                    />
                  )}
                </div>

                <PrimaryButton
                  type="submit"
                  name="Submit"
                  disabled={updatePanding || !isCompanyVerified}
                  className="w-[370px] h-[48px] mt-[30px] mx-auto !font-droid !primary-background"
                />
                <div className="max-w-[296px] mx-auto  mt-[20px] mb-[40px] h-[30px] font-[400] text-[12px] text-center text-[#898989]">
                  <label>
                    Protected by reCAPTCHA and subject to the Skillnet
                    <Link to={"/privacypolicy"} className="text-[#042937] mx-1">
                      Privacy Policy
                    </Link>
                    and
                    <Link
                      to={"/termsofservices"}
                      className="text-[#042937] mx-1"
                    >
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
      <HomeFooter />
      <CompanyDetails
        isOpen={isOpen}
        // setIsOpen={setIsOpen}
        companyData={companyData}
        handleReject={handleReject}
        handleAccept={handleAccept}
      />
    </>
  );
}

export default CompanyRegister;
