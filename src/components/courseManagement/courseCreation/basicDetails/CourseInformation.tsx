import InputWithLabel from "@/components/comman/InputWithLabel";
import Loader from "@/components/comman/Loader";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { urlRegex } from "@/lib/constants";
import { fetchClientById } from "@/services/apiServices/client";
import { createCourse } from "@/services/apiServices/courseManagement";
import { ClientResponse } from "@/types/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as zod from "zod";
interface CourseInformationProps {
  setStep: Dispatch<SetStateAction<number>>;
}

const schema = zod
  .object({
    title: zod.string().min(1, "Title is required"),
    instituteName: zod.string().min(1, "Institute name is required"),
    instituteWebsite: zod.string().url("Invalid website url"),
    isFreeCourse: zod.boolean().optional(),
    courseMaterialLink: zod
      .string()
      .optional()
      .refine((val) => {
        return val === undefined || val === "" || urlRegex.test(val);
      }, "Invalid URL"),
    coursePrise: zod
      .string()
      .refine(
        (val) => val === undefined || !isNaN(parseFloat(val)),
        "Invalid course price"
      ),
    discountProvideBy: zod.number().optional(),
  })
  .refine(
    (data) => {
      // If isFreeCourse is true, coursePrise should be undefined or empty
      if (data.isFreeCourse === true && data.coursePrise !== undefined) {
        return false;
      }
      return true;
    },
    {
      message:
        "Course Price should be undefined or empty when the course is free",
      path: ["coursePrise"], // The path to the field that caused the error
    }
  );

type FormData = zod.infer<typeof schema>;

const CourseInformation = ({ setStep }: CourseInformationProps) => {
  const [isFreeCourse, setIsFreeCourse] = React.useState(false);
  const [provideDisc, setProvideDisc] = React.useState(false);
  const [discount, setDiscount] = React.useState("");
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const { clientId } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    clearErrors,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: {
      isFreeCourse: false,
    },
  });
  const coursePrise = watch("coursePrise") || 0;
  const { data } = useQuery<ClientResponse>({
    queryKey: ["coursePrise", { clientId }],
    queryFn: () => fetchClientById(clientId),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createCourse,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Course created successfully",
        variant: "success",
      });
      setStep((prev) => prev + 1);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      setStep((prev) => prev + 1);
    },
  });

  const onSubmit = (formdata: FieldValues) => {
    console.log(data);
    const payload = {
      title: formdata?.title,
      institute: formdata?.instituteName,
      instituteWebsite: formdata?.instituteWebsite,
      instituteWebsite2: formdata?.courseMaterialLink,
      freeCourse: isFreeCourse ? 1 : 0,
      price: +formdata?.coursePrise,
      discountApplicable: +discount,
      discout: provideDisc ? 1 : 0,
      providerName: data?.data?.id || 0,
      clientId: data?.data?.id || 0,
    };
    mutate(payload);
  };

  useEffect(() => {
    if (isFreeCourse) {
      clearErrors("coursePrise");
    }
  }, [isFreeCourse, clearErrors]);

  return (
    <div className="border border-[#D9D9D9] rounded-md p-7">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-[18px]">
          <InputWithLabel
            label="What is the title of the course you're offering?"
            labelClassName="font-calibri text-[16px] text-[#515151]"
            placeholder="Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity"
            className="border border-[#D9D9D9] rounded-md w-full px-4 py-3 outline-none font-base font-calibri text-[#1D2026] mt-[9px]"
            {...register("title")}
            error={errors.title?.message as string}
          />
        </div>
        <div className="mb-[18px]">
          <InputWithLabel
            label="Please enter the name of the institute providing this course."
            labelClassName="font-calibri text-[16px] text-[#515151]"
            placeholder="Atlantic Technological University"
            className="border border-[#D9D9D9] rounded-md w-full px-4 py-3 outline-none font-base font-calibri text-[#1D2026] mt-[9px]"
            {...register("instituteName")}
            error={errors.instituteName?.message as string}
          />
        </div>
        <div className="mb-[18px]">
          <InputWithLabel
            label="Provide a direct link to the course details on your institute's website."
            labelClassName="font-calibri text-[16px] text-[#515151]"
            placeholder="www.atlanticTechnologicalUniversity.com"
            className="border border-[#D9D9D9] rounded-md w-full px-4 py-3 outline-none font-base font-calibri text-[#1D2026]  mt-[9px]"
            {...register("instituteWebsite")}
            error={errors.instituteWebsite?.message as string}
          />
        </div>
        <div className="mb-[18px]">
          <InputWithLabel
            label="Do you have any additional links for course materials or resources? (Optional)"
            labelClassName="font-calibri text-[16px] text-[#515151]"
            placeholder="www.atlanticTechnologicalUniversity.com"
            className="border border-[#D9D9D9] rounded-md w-full px-4 py-3 outline-none font-base font-calibri text-[#1D2026] mt-[9px]"
            {...register("courseMaterialLink")}
            error={errors.courseMaterialLink?.message as string}
          />
        </div>
        <div className="flex pb-7">
          <div className="flex items-center pe-5 xl:w-[220px]">
            <span className="pe-3 font-calibri text-base text-black">
              Free Course?
            </span>
            <Switch
              checked={isFreeCourse}
              onCheckedChange={() => {
                setIsFreeCourse(!isFreeCourse);
                setValue("isFreeCourse", !isFreeCourse);
              }}
            />
          </div>
          <div className="flex items-center">
            <span className="pe-3 font-calibri text-base text-[#515151] xl:w-[130px]">
              Course Price
            </span>
            <InputWithLabel
              placeholder="€50.00"
              className="w-[190px] px-4 py-3 border border-[#D9D9D9] rounded-md outline-none"
              disabled={isFreeCourse}
              {...register("coursePrise")}
              error={errors.coursePrise?.message as string}
            />
          </div>
        </div>

        <div className="flex pb-7">
          <div className="flex items-center pe-5 xl:w-[220px]">
            <span className="pe-3 font-calibri text-base text-black">
              Discount provided?
            </span>
            <Switch
              disabled={isFreeCourse}
              checked={provideDisc}
              onCheckedChange={() => setProvideDisc(!provideDisc)}
            />
          </div>
          <div className="flex items-center">
            <span className="pe-3 font-calibri text-base text-[#515151] xl:w-[130px]">
              Discounted Price
            </span>
            <InputWithLabel
              placeholder="€255"
              className="w-[190px] px-4 py-3 border border-[#D9D9D9] rounded-md outline-none"
              disabled={!provideDisc}
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              error={
                discount > coursePrise
                  ? "Discount is greater than course price"
                  : ""
              }
            />
          </div>
        </div>

        <div className="pb-8">
          <InputWithLabel
            label="Discount provided by"
            labelClassName="font-calibri text-[16px] text-[#515151]"
            placeholder="Select Skillnet"
            className="border border-[#D9D9D9] rounded-md w-full px-4 py-3 outline-none font-base font-calibri text-[#1D2026] mt-[9px]"
            disabled
            value={data?.data?.name}
          />
        </div>

        <div className="text-right">
          <Button
            type="submit"
            className="outline-none text-base font-inter text-white bg-[#58BA66] py-6 px-8"
          >
            {isPending ? <Loader containerClassName="max-h-auto" /> : "Next"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CourseInformation;
