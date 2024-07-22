/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getCountry } from "@/services/apiServices/company";
import {
  getTrainerById,
  trainerDetailsUpdate,
  updateTrainerStatusById,
} from "@/services/apiServices/trainer";
import { uploadImage } from "@/services/apiServices/upload";
import { CountryResponse } from "@/types/Company";
import { TrainerStatus, TrainersByIdResponse } from "@/types/Trainer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ImageUp, MoveLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as zod from "zod";
import ErrorMessage from "../comman/Error/ErrorMessage";
import Loader from "../comman/Loader";
import SelectMenu from "../comman/SelectMenu";
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
  name: zod.string().min(1, { message: "Trainer name is required" }),
  number: zod.string().min(1, { message: "Contact number is required" }),
  email: zod.string().email({ message: "Invalid email" }),
  providerName: zod.string().min(1, { message: "Provider Name is required" }),
  providerType: zod.string().min(1, { message: "Provider Type is required" }),
  providerCity: zod.string().min(1, { message: "Provider City is required" }),
  providerCounty: zod
    .string()
    .min(1, { message: "Provider Country is required" }),
  providerNotes: zod.string().optional(),
  foreignProvider: zod
    .enum(["Yes", "No"])
    .refine(
      (value) => value !== undefined && (value === "Yes" || value === "No"),
      {
        message: "Please select a valid option for Foreign Provider",
        path: ["foreignProvider"],
      }
    ),
});

const TrainerDetailsEdit = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const [profile_image, setProfileImage] = useState<string>("");
  const [trainerStatus, setTrainerStatus] = useState<string>("");
  const [trainerPermission, setTrainerPermission] = useState<boolean>(false);
  const navigate = useNavigate();
  type ValidationSchema = zod.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
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
      console.log(error);
    },
  });

  const { mutate: update, isPending: isUpdate } = useMutation({
    mutationFn: trainerDetailsUpdate,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["trainerDetails", params.id],
      });
      onSubmit();
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

  const { mutate, isPending: isPendingUpdate } = useMutation({
    mutationFn: updateTrainerStatusById,
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
      setValue("name", clientDetails?.data?.name);
      setValue("number", clientDetails?.data?.phone);
      setValue("email", clientDetails?.data?.email);
      setValue("providerName", clientDetails?.data?.providerName);
      setValue("providerType", clientDetails?.data?.providerType);
      setValue("providerCity", clientDetails?.data?.providerCity);
      setValue("providerCounty", clientDetails?.data?.providerCounty);
      setValue("providerNotes", clientDetails?.data?.providerNotes);
      setValue("foreignProvider", clientDetails?.data?.foreignProvider || "No");
    }
  }, [clientDetails, setValue]);

  const onSubmit = () => {
    const data = {
      status: Number(trainerStatus),
      approved: trainerPermission,
    };

    mutate({ id: params.id || "", data });
  };

  const handleUpdate = (data: FieldValues) => {
    const payload = {
      name: data?.name,
      surname: clientDetails?.data?.surname || null,
      gender: null,
      ageRange: null,
      email: data?.email,
      phone: data?.number,
      currentHighestNFQ: null,
      memberCompany: null,
      occupationalCategory: null,
      unemploymentTime: null,
      countyOfResidence: null,
      attendedEvent: null,
      providerName: data?.providerName,
      providerType: data?.providerType,
      providerCity: data?.providerCity,
      providerCounty: data?.providerCounty,
      providerNotes: data?.providerNotes,
      foreignProvider: data?.foreignProvider,
      profileImage: profile_image,
    };

    console.log("payload+++++++++++++++++", payload);

    update({ data: payload, id: params.id || "" });
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file =
      event.target.files?.[0] !== undefined && event.target.files?.[0];
    const formData = new FormData();
    // @ts-ignore
    formData.append("image", file);
    upload(formData);
  };

  return (
    <div className="bg-white h-full rounded-[6px] overflow-auto">
      <div className="font-nunitoSans text-[16px] leading-[22px] text-black">
        <div className="px-[14px] py-[10px] flex items-center justify-between border-b mb-[36px]">
          <div>
            <h3 className="text-[16px] font-[700] font-nunito mb-1">
              Trainer Details
            </h3>
            <p className="text-[#606060] text-[15px]">
              All the details on your trainer, in one convenient view
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant={"ghost"}
              onClick={() => navigate("/trainer/trainer-management")}
              className="gap-4 font-nunito text-[16px] hover:bg-transparent"
            >
              <MoveLeft className="text-[#0f170d]" /> Back
            </Button>
            <Button
              type="button"
              onClick={() => navigate("/trainer/trainer-management/invitation")}
              className="bg-[#00778B] font-nunito px-5 text-[16px]"
            >
              INVITE TRAINER
            </Button>
          </div>
        </div>
        {isPending ? (
          <Loader />
        ) : (
          <form onSubmit={handleSubmit(handleUpdate)}>
            <div className="px-2 sm:px-4 md:px-6  py-[17px] flex flex-col gap-5">
              <div className="border relative border-[#D9D9D9] rounded-[10px] min-h-[160px] grid grid-cols-4 px-6 py-[30px] gap-8 mb-[36px]">
                <h2 className="absolute -top-3 left-6 bg-white px-1 text-[16px] font-[400] font-nunito">
                  Trainer personal information
                </h2>
                <div className="col-span-1 w-full flex justify-start mb-2 md:mb-0">
                  {profile_image ? (
                    <img
                      src={profile_image}
                      alt="img"
                      className="w-28 h-28 rounded-full"
                    />
                  ) : isUploading ? (
                    <Loader containerClassName="h-auto" />
                  ) : (
                    <>
                      <label
                        htmlFor="upload"
                        className="w-28 h-28 bg-slate-300 rounded-full flex items-center justify-center"
                      >
                        <ImageUp className="text-slate-700" />
                      </label>
                      <input
                        type="file"
                        id="upload"
                        accept="image/*"
                        className="hidden"
                        onChange={handleUpload}
                      />
                    </>
                  )}
                  {/* <Avatar className="w-28 h-28">
                    <AvatarImage src={clientDetails?.data?.imageUrl} />
                    <AvatarFallback className="uppercase shadow-lg text-[40px] font-nunito">
                      {clientDetails?.data?.name?.[0]}
                      {clientDetails?.data?.name?.[1]}
                    </AvatarFallback>
                  </Avatar> */}
                </div>
                <div className="col-span-1 font-nunito w-full">
                  <InputWithLable
                    placeholder="John"
                    className="h-[46px]"
                    label="Name"
                    {...register("name")}
                  />
                  {errors.name && (
                    <ErrorMessage message={errors.name.message as string} />
                  )}
                </div>
                <div className="col-span-1 font-nunito w-full">
                  <InputWithLable
                    placeholder="0044 1234 1234567"
                    className="h-[46px]"
                    label="Mobile No."
                    {...register("number")}
                  />
                  {errors.number && (
                    <ErrorMessage message={errors.number.message as string} />
                  )}
                </div>
                <div className="col-span-1 font-nunito w-full">
                  <InputWithLable
                    placeholder="john.sample@emailsample.com"
                    className="h-[46px]"
                    disabled
                    label="Email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <ErrorMessage message={errors.email.message as string} />
                  )}
                </div>
              </div>
              <div className="border relative border-[#D9D9D9] rounded-[10px] min-h-[160px] grid grid-cols-4 px-6 py-[30px] gap-8 mb-[36px]">
                <h2 className="absolute -top-3 left-6 bg-white px-1 text-[16px] font-[400] font-nunito">
                  Provider information
                </h2>
                <div className="col-span-1 font-nunito">
                  <InputWithLable
                    className="h-[46px]"
                    placeholder="Sample Consulting Company"
                    label="Provider Name"
                    {...register("providerName")}
                  />
                  {errors.providerName && (
                    <ErrorMessage
                      message={errors.providerName.message as string}
                    />
                  )}
                </div>
                <div className="col-span-1 font-nunito">
                  <InputWithLable
                    placeholder="IT or University"
                    className="h-[46px]"
                    label="Provider Type"
                    {...register("providerType")}
                  />
                  {errors.providerType && (
                    <ErrorMessage
                      message={errors.providerType.message as string}
                    />
                  )}
                </div>
                <div className="col-span-1 font-nunito">
                  <Label className="mb-[8px]  font-bold text-[16px]">
                    County
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
                </div>
                <div className="col-span-1 font-nunito">
                  <InputWithLable
                    placeholder="London"
                    className="h-[46px]"
                    label="Provider City/Town"
                    {...register("providerCity")}
                  />
                  {errors.providerCity && (
                    <ErrorMessage
                      message={errors.providerCity.message as string}
                    />
                  )}
                </div>
                <div className="col-span-1 font-nunito">
                  <Select
                    onValueChange={(data) =>
                      // @ts-ignore
                      setValue("foreignProvider", data)
                    }
                    value={watch("foreignProvider") || ""}
                  >
                    <SelectGroup>
                      <SelectLabel className="text-[16px] font-[700] py-0 pb-[9px] mt-0">
                        Foregin Provider
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
                <div className="col-span-1 font-nunito">
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
              <div className="border relative border-[#D9D9D9] gap-8 rounded-[10px] px-6 py-[30px] items-center mb-[36px]">
                <h2 className="absolute -top-3 left-6 bg-white px-1 text-[16px] font-[400] font-nunito">
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
              <div className="border relative border-[#D9D9D9] gap-8 rounded-[10px] px-6 py-[30px] items-center">
                <h2 className="absolute -top-3 left-6 bg-white px-1 text-[16px] font-[400] font-nunito">
                  Trainer Permission
                </h2>
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
                    className="text-[16px] font-nunito"
                  >
                    Course Creation Permission
                  </Label>
                </div>
              </div>
              <div className="text-right">
                <Button
                  type="submit"
                  isLoading={isUpdate || isPendingUpdate}
                  className="text-[16px] font-semibold font-nunito uppercase py-[15px] px-[30px] h-auto bg-[#58BA66]"
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
