/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useAppDispatch } from "@/hooks/use-redux";
import { setPath } from "@/redux/reducer/PathReducer";
import { getCountry } from "@/services/apiServices/company";
import {
  getTrainerById,
  trainerDetailsUpdate,
} from "@/services/apiServices/trainer";
import { uploadImage } from "@/services/apiServices/upload";
import { CountryResponse } from "@/types/Company";
import { TrainerStatus, TrainersByIdResponse } from "@/types/Trainer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MoveLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import PhoneInputWithCountrySelect from "react-phone-number-input";
import { useParams } from "react-router-dom";
import * as zod from "zod";
import ErrorMessage from "../comman/Error/ErrorMessage";
import Loader from "../comman/Loader";
import SelectMenu from "../comman/SelectMenu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { InputWithLable } from "../ui/inputwithlable";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";
import { toast } from "../ui/use-toast";

const schema = zod.object({
  fname: zod
    .string()
    .min(1, { message: "Please enter contact firstname" })
    .regex(
      /^[A-Za-z]+(?:\s[A-Za-z]+)*$/,
      "Please enter valid contact firstname"
    ),
  lname: zod
    .string()
    .min(1, { message: "Please enter contact lastname" })
    .regex(
      /^[A-Za-z]+(?:\s[A-Za-z]+)*$/,
      "Please enter valid contact lastname"
    ),
  number: zod.string().optional(),
  email: zod
    .string()
    .min(1, { message: "Please enter email address" })
    .email("Please enter valid email address"),
  providerName: zod.string().min(1, { message: "Please enter provider name" }),
  providerType: zod
    .string({
      required_error: "Please select provider type",
    })
    .min(1, { message: "Please enter provider type" }),
  providerCity: zod.string().min(1, { message: "Please enter provider city" }),
  providerCounty: zod.string().optional(),
  providerNotes: zod
    .string()
    .max(200, {
      message: "Provider notes must contain at least 200 characters",
    })
    .optional(),
  foreignProvider: zod
    .string({
      message: "Please select foreign provider",
    })
    .refine((value) => value === "Yes" || value === "No", {
      message: "Please select foreign provider",
      path: ["foreignProvider"],
    }),
});

const TrainerDetailsEdit = () => {
  const params = useParams();
  const Role = location.pathname.split("/")[1];
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const [profile_image, setProfileImage] = useState<string>("");
  const [trainerStatus, setTrainerStatus] = useState<string>("");
  const [trainerPermission, setTrainerPermission] = useState<boolean>(false);
  const [trainerEditPermission, setTrainerEditPermission] =
    useState<boolean>(false);
  const [assignCertificatePermission, setAssignCertificatePermission] =
    useState<boolean>(false);
  type ValidationSchema = zod.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    watch,
    reset,
  } = useForm<ValidationSchema>({
    resolver: zodResolver(schema),
    mode: "all",
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
  const { data: clientDetails, isPending } = useQuery<TrainersByIdResponse>({
    queryKey: ["trainerDetails", params.id],
    queryFn: () => getTrainerById({ id: params.id || "" }),
  });

  const { mutate: upload, isPending: isUploading } = useMutation({
    mutationFn: uploadImage,
    onSuccess: (data) => {
      setProfileImage(data.data?.data?.image);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const { mutate: update, isPending: isUpdate } = useMutation({
    mutationFn: trainerDetailsUpdate,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["trainerDetails", params.id],
      });
      reset();
      dispatch(
        setPath([
          {
            label: "Trainer Management",
            link: `/${Role}/trainer-management`,
          },
        ])
      );

      toast({
        variant: "success",
        description: "Trainer details updated successfully",
      });
    },
    onError: (error: AxiosError) => {
      toast({
        variant: "destructive",
        description: error.message,
      });
    },
  });

  useEffect(() => {
    if (clientDetails?.data) {
      setTrainerStatus(clientDetails?.data?.status.toString() || "");
      setTrainerPermission(clientDetails?.data?.approved);
      setTrainerEditPermission(clientDetails?.data?.editCourses);
      setAssignCertificatePermission(clientDetails?.data?.assignCertificate);
      // @ts-ignore
      setValue("fname", clientDetails?.data?.contactFirstName || "");
      // @ts-ignore
      setValue("lname", clientDetails?.data?.contactSurname || "");
      setValue("number", clientDetails?.data?.phone || "");
      setValue("email", clientDetails?.data?.email);
      setValue("providerName", clientDetails?.data?.providerName || "");
      setValue("providerType", clientDetails?.data?.providerType || "");
      setValue("providerCity", clientDetails?.data?.providerCity || "");
      setValue("providerCounty", clientDetails?.data?.providerCounty || "");
      setValue("providerNotes", clientDetails?.data?.providerNotes || "");
      setValue("foreignProvider", clientDetails?.data?.foreignProvider || "No");
      setProfileImage(clientDetails?.data?.profileImage || "");
    }
  }, [clientDetails, setValue]);

  const handleUpdate = (data: FieldValues) => {
    const payload = {
      name: data?.fname + " " + data?.lname,
      contactSurname: data?.lname,
      contactFirstName: data?.fname,
      phone: data?.number,
      email: data?.email,
      providerName: data?.providerName,
      providerType: data?.providerType,
      providerCity: data?.providerCity,
      providerCounty: data?.providerCounty,
      providerNotes: data?.providerNotes,
      foreignProvider: data?.foreignProvider,
      profileImage: profile_image ? profile_image : null,
      status: trainerStatus.toString(),
      approved: trainerPermission,
      assignCertificate: assignCertificatePermission,
      editCourses: trainerEditPermission,
    };

    update({ data: payload, id: params.id || "" });
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file =
      event.target.files?.[0] !== undefined && event.target.files?.[0];
    const formData = new FormData();
    // @ts-ignore
    formData.append("image", file);
    // @ts-ignore
    if (!file?.name?.match(/^[a-zA-Z0-9_-]+(\.[a-zA-Z0-9]+)?$/)) {
      toast({
        variant: "destructive",
        title:
          "Invalid file name. please use only letters, digits, underscores, hyphens, and a single period.",
      });
      return;
    }
    upload(formData);
  };

  return (
    <div className="bg-white h-full rounded-[6px] overflow-auto">
      <div className="font-droidSans text-[16px] leading-[22px] text-black">
        <div className="px-[14px] py-[10px] md:flex block items-center justify-between border-b mb-[36px]">
          <div>
            <h3 className="text-[16px] font-[700] font-droid mb-1">
              Trainer Details
            </h3>
            <p className="text-[#606060] text-[15px]">
              All the details on your trainer, in one convenient view
            </p>
          </div>
          <div className="flex items-center gap-4 md:mt-0 mt-3">
            <Button
              type="button"
              variant={"ghost"}
              onClick={() =>
                dispatch(
                  setPath([
                    {
                      label: "Trainer Management",
                      link: `/${Role}/trainer-management`,
                    },
                  ])
                )
              }
              className="gap-4 font-droid text-[16px] hover:bg-transparent pl-0"
            >
              <MoveLeft className="text-[#0f170d]" /> Back
            </Button>
            <Button
              type="button"
              onClick={() => {
                dispatch(
                  setPath([
                    {
                      label: "Trainer Management",
                      link: `/${Role}/trainer-management`,
                    },

                    {
                      label: "Invitation",
                      link: `/${Role}/trainer-management/invitation`,
                    },
                  ])
                );
              }}
              className="bg-[#00778B] font-droid px-5 text-[16px]"
            >
              INVITE TRAINER
            </Button>
          </div>
        </div>
        {isPending ? (
          <Loader />
        ) : (
          <form onSubmit={handleSubmit(handleUpdate)}>
            <div className="px-[15px] sm:px-4 md:px-6  py-[17px] flex flex-col gap-5">
              <div className="border relative border-[#D9D9D9] rounded-[10px] min-h-[160px] grid grid-cols-4 sm:px-6 p-[15px] sm:py-[30px] sm:gap-8 gap-4 sm:mb-[36px] mb-[20px]">
                <h2 className="absolute -top-3 left-6 bg-white px-1 text-[16px] font-[400] font-droid">
                  Trainer personal information
                </h2>
                <div className="xl:col-span-1 sm:col-span-2 col-span-4 w-full flex justify-start mb-2 md:mb-0">
                  <label htmlFor="upload">
                    <Avatar className="w-28 h-28">
                      <input
                        type="file"
                        id="upload"
                        accept="image/*"
                        className="hidden"
                        onChange={handleUpload}
                      />
                      {isUploading ? (
                        <p className="bg-white text-center flex justify-center items-center w-full h-full">
                          Loading...
                        </p>
                      ) : (
                        <>
                          <AvatarImage
                            src={
                              profile_image
                                ? profile_image
                                : clientDetails?.data?.profileImage || ""
                            }
                          />
                          <AvatarFallback className="uppercase shadow-lg text-[40px] font-droid">
                            {clientDetails?.data?.name?.[0] ||
                              clientDetails?.data?.email?.[0]}
                          </AvatarFallback>
                        </>
                      )}
                    </Avatar>
                  </label>
                  {/* <Avatar className="w-28 h-28">
                    <AvatarImage src={clientDetails?.data?.imageUrl} />
                    <AvatarFallback className="uppercase shadow-lg text-[40px] font-droid">
                      {clientDetails?.data?.name?.[0]}
                      {clientDetails?.data?.name?.[1]}
                    </AvatarFallback>
                  </Avatar> */}
                </div>
                <div className="col-span-3 grid grid-cols-4 gap-4">
                  <div className="sm:col-span-2 col-span-4 font-droid w-full">
                    <InputWithLable
                      placeholder="First name"
                      className="h-[46px]"
                      label="Contact Firstname"
                      {...register("fname")}
                      isMendatory
                    />
                    {errors.fname && (
                      <ErrorMessage message={errors.fname.message as string} />
                    )}
                  </div>
                  <div className="sm:col-span-2 col-span-4 font-droid w-full">
                    <InputWithLable
                      placeholder="Last name"
                      className="h-[46px]"
                      label="Contact Lastname"
                      {...register("lname")}
                      isMendatory
                    />
                    {errors.lname && (
                      <ErrorMessage message={errors.lname.message as string} />
                    )}
                  </div>
                  <div className="sm:col-span-2 col-span-4 font-droid w-full">
                    {/* <InputWithLable
                    placeholder="0044 1234 1234567"
                    className="h-[46px]"
                    label="Mobile No."
                    // onChange={(e) => {
                    //   const { value } = e.target;
                    //   if (value.match(/^[0-9]*$/)) {
                    //     setValue("number", value);
                    //   }
                    //   return;
                    // }}
                    // value={watch("number") || ""}
                    {...register("number")}
                  /> */}
                    <div className="flex flex-col gap-1">
                      <label className="mb-[8px] text-[16px]">Phone No.</label>
                      <PhoneInputWithCountrySelect
                        placeholder="Enter phone number"
                        international
                        onChange={(e: any) => {
                          setValue("number", e);
                          if (
                            e?.trim()?.length < 10 ||
                            e?.trim()?.length > 15
                          ) {
                            setError("number", {
                              message: "Please enter valid phone number",
                            });
                          } else {
                            setError("number", {
                              message: "",
                            });
                          }
                        }}
                        value={watch("number") || ""}
                        className="phone-input"
                      />
                      {errors.number && (
                        <ErrorMessage
                          message={errors.number.message as string}
                        />
                      )}
                    </div>
                  </div>
                  <div className="sm:col-span-2 col-span-4 font-droid w-full">
                    <InputWithLable
                      placeholder="Enter email address"
                      className="h-[46px]"
                      disabled={
                        clientDetails?.data?.status === 2 ? false : true
                      }
                      label="Email"
                      {...register("email")}
                      isMendatory
                    />
                    {errors.email && (
                      <ErrorMessage message={errors.email.message as string} />
                    )}
                  </div>
                </div>
              </div>
              <div className="border relative border-[#D9D9D9] rounded-[10px] min-h-[160px] grid grid-cols-4 sm:px-6 px-[15px] py-[30px] sm:gap-8 gap-4 sm:mb-[36px] mb-[20px]">
                <h2 className="absolute -top-3 left-6 bg-white px-1 text-[16px] font-[400] font-droid">
                  Provider information
                </h2>
                <div className="xl:col-span-1 sm:col-span-2 col-span-4 font-droid">
                  <InputWithLable
                    className="h-[46px]"
                    placeholder="Enter company name"
                    label="Provider Name"
                    {...register("providerName")}
                    isMendatory
                  />
                  {errors.providerName && (
                    <ErrorMessage
                      message={errors.providerName.message as string}
                    />
                  )}
                </div>
                <div className="xl:col-span-1 sm:col-span-2 col-span-4 font-droid">
                  <InputWithLable
                    placeholder="Enter company type"
                    className="h-[46px]"
                    label="Provider Type"
                    {...register("providerType")}
                    isMendatory
                  />
                  {errors.providerType && (
                    <ErrorMessage
                      message={errors.providerType.message as string}
                    />
                  )}
                </div>
                <div className="xl:col-span-1 sm:col-span-2 col-span-4 font-droid">
                  <Label className="mb-[8px] text-[16px]">County</Label>
                  <SelectMenu
                    option={countryOption || []}
                    placeholder="Select county"
                    className=" h-[46px] mt-2"
                    setValue={(data: string) =>
                      setValue("providerCounty", data)
                    }
                    value={watch("providerCounty") || ""}
                  />
                </div>
                <div className="xl:col-span-1 sm:col-span-2 col-span-4 font-droid">
                  <InputWithLable
                    placeholder="Enter city or town"
                    className="h-[46px]"
                    label="Provider City/Town"
                    {...register("providerCity")}
                    isMendatory
                  />
                  {errors.providerCity && (
                    <ErrorMessage
                      message={errors.providerCity.message as string}
                    />
                  )}
                </div>
                <div className="xl:col-span-1 sm:col-span-2 col-span-4 font-droid">
                  <Select
                    onValueChange={(data) =>
                      // @ts-ignore
                      setValue("foreignProvider", data)
                    }
                    value={watch("foreignProvider") || ""}
                  >
                    <SelectGroup>
                      <SelectLabel className="text-[16px] font-normal py-0 pb-[9px] mt-0">
                        Foreign Provider <span className="text-red-400">*</span>
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
                <div className="xl:col-span-1 sm:col-span-2 col-span-4 font-droid">
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
              <div className="border relative border-[#D9D9D9] gap-8 rounded-[10px] sm:px-6 px-[15px] py-[30px] items-center sm:mb-[36px] mb-[20px]">
                <h2 className="absolute -top-3 left-6 bg-white px-1 text-[16px] font-[400] font-droid">
                  Trainer Status
                </h2>
                <RadioGroup
                  defaultValue={trainerStatus}
                  value={trainerStatus}
                  onValueChange={(data) => setTrainerStatus(data)}
                  className="flex items-center gap-[34px]"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={"1"}
                      id="r1"
                      className={`${
                        TrainerStatus[+trainerStatus] !== "Active" &&
                        "border-[#A3A3A3]"
                      } w-6 h-6`}
                    />
                    <Label
                      htmlFor="r1"
                      className={`text-[16px] font-normal ${
                        TrainerStatus[+trainerStatus] !== "Active" &&
                        "text-[#A3A3A3]"
                      }`}
                    >
                      Active
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={"0"}
                      id="r2"
                      className={`${
                        TrainerStatus[+trainerStatus] !== "Inactive" &&
                        "border-[#A3A3A3]"
                      } w-6 h-6`}
                    />
                    <Label
                      htmlFor="r2"
                      className={`text-[16px] font-normal ${
                        TrainerStatus[+trainerStatus] !== "Inactive" &&
                        "text-[#A3A3A3]"
                      }`}
                    >
                      Inactive
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="border relative border-[#D9D9D9] gap-8 rounded-[10px] sm:px-6 px-[15px] py-[30px] items-center">
                <h2 className="absolute -top-3 left-6 bg-white px-1 text-[16px] font-[400] font-droid">
                  Trainer Permissions
                </h2>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="airplane-mode"
                      defaultChecked={trainerPermission}
                      checked={trainerPermission}
                      onCheckedChange={() =>
                        setTrainerPermission(!trainerPermission)
                      }
                      switchClassName={
                        "w-[12px] h-[12px] data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0.5"
                      }
                      className="h-[21px] w-[42px] data-[state=checked]:bg-[#00778B] data-[state=unchecked]:bg-input"
                    />
                    <Label
                      htmlFor="airplane-mode"
                      className="text-[16px] font-droid"
                    >
                      Course Creation
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="airplane-mode"
                      defaultChecked={trainerEditPermission}
                      checked={trainerEditPermission}
                      onCheckedChange={() =>
                        setTrainerEditPermission(!trainerEditPermission)
                      }
                      switchClassName={
                        "w-[12px] h-[12px] data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0.5"
                      }
                      className="h-[21px] w-[42px] data-[state=checked]:bg-[#00778B] data-[state=unchecked]:bg-input"
                    />
                    <Label
                      htmlFor="airplane-mode"
                      className="text-[16px] font-droid"
                    >
                      Edit Course
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="airplane-mode"
                      defaultChecked={assignCertificatePermission}
                      checked={assignCertificatePermission}
                      onCheckedChange={() =>
                        setAssignCertificatePermission(
                          !assignCertificatePermission
                        )
                      }
                      switchClassName={
                        "w-[12px] h-[12px] data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0.5"
                      }
                      className="h-[21px] w-[42px] data-[state=checked]:bg-[#00778B] data-[state=unchecked]:bg-input"
                    />
                    <Label
                      htmlFor="airplane-mode"
                      className="text-[16px] font-droid"
                    >
                      Assign Certificate
                    </Label>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <Button
                  type="submit"
                  isLoading={isUpdate}
                  className="text-[16px] font-semibold font-droid uppercase sm:py-[15px] py-[10px] sm:px-[30px] px-[20px] h-auto bg-[#58BA66]"
                >
                  Update
                </Button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default TrainerDetailsEdit;
