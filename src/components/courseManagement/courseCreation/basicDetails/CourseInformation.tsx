import InputWithLabel from "@/components/comman/InputWithLabel";
import Loader from "@/components/comman/Loader";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { QUERY_KEYS } from "@/lib/constants";
// import { urlRegex } from "@/lib/constants";
import { fetchClientById } from "@/services/apiServices/client";
import {
  createCourse,
  fetchSingleCourseById,
  updateCourse,
} from "@/services/apiServices/courseManagement";
import { ResponseError } from "@/types/Errors";
import { ClientResponse } from "@/types/client";
import { CourseData } from "@/types/course";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import * as zod from "zod";

const schema = zod
  .object({
    title: zod.string().min(1, "Title is required"),
    institute: zod.string().min(1, "Institute name is required"),
    instituteWebsite: zod.string().url("Invalid website url"),
    freeCourse: zod.boolean().optional(),
    instituteWebsite2: zod.string().optional(),
    price: zod
      .string({ errorMap: () => ({ message: "Invalid course price" }) })
      .refine(
        (val: string | any) => val === undefined || !isNaN(val),
        "Invalid course price"
      ),
    discountApplicable: zod.number().optional(),
  })
  .refine(
    (data) => {
      // If isFreeCourse is true, coursePrise should be undefined or empty
      if (data.freeCourse && +!data.price) {
        return false;
      }
      return true;
    },
    {
      message:
        "Course Price should be undefined or empty when the course is free",
      path: ["price"], // The path to the field that caused the error
    }
  );

type FormData = zod.infer<typeof schema>;

const CourseInformation = () => {
  const [isFreeCourse, setIsFreeCourse] = React.useState(false);
  const [provideDisc, setProvideDisc] = React.useState(false);
  const [discount, setDiscount] = React.useState("");
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const { clientId, UserId } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
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
      freeCourse: false,
    },
  });
  const search = window.location.search;
  const paramsTab = new URLSearchParams(search).get("tab");
  const paramsVersion = new URLSearchParams(search).get("version");
  const coursePrise = watch("price") || "0";
  const pathName: string = location?.pathname?.split("/")[1];
  const courseId: string = location?.pathname?.split("/")[3];
  const { data } = useQuery<ClientResponse>({
    queryKey: ["price", { clientId }],
    queryFn: () => fetchClientById(clientId),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createCourse,
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: data?.data?.message,
        variant: "success",
      });
      navigate(
        `/${pathName}/create_course?tab=${paramsTab}&step=${1}&id=${
          data?.data?.data?.course?.id
        }&version=${data?.data?.data?.version}`,
        {
          replace: true,
        }
      );
    },
    onError: (error: ResponseError) => {
      toast({
        title: "Error",
        description: error.data?.message,
        variant: "destructive",
      });
    },
  });

  const { mutate: updateCourseFun, isPending: isUpdatePending } = useMutation({
    mutationFn: (e: any) => updateCourse(e),
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: data?.data?.message,
        variant: "success",
      });
      navigate(
        `/${pathName}/create_course/${
          location?.pathname?.split("/")[3]
        }?tab=${paramsTab}&step=${1}&version=${paramsVersion}`,
        {
          replace: true,
        }
      );
    },
    onError: (error: ResponseError) => {
      toast({
        title: "Error",
        description: error.data?.message,
        variant: "destructive",
      });
    },
  });

  const { data: getSingleCourse } = useQuery({
    queryKey: [QUERY_KEYS.getSingleCourse, { paramsVersion }],
    queryFn: () => fetchSingleCourseById(String(paramsVersion)),
    enabled: +courseId ? !!paramsVersion : false,
  });

  useEffect(() => {
    if (getSingleCourse && getSingleCourse?.data?.course) {
      const data: CourseData | any = getSingleCourse?.data?.course;
      (Object.keys(data) as Array<keyof CourseData>).forEach((key: any) => {
        setValue(key, data[key]);
        setValue("freeCourse", data.freeCourse === 1 ? true : false);
        setValue("price", String(data?.price));
      });
      setIsFreeCourse(data.freeCourse === 1 ? true : false);
      setProvideDisc(data.discout === 1 ? true : false);
    }
  }, [getSingleCourse]);

  const onSubmit = (formdata: FieldValues) => {
    const payload = {
      title: formdata?.title,
      institute: formdata?.institute,
      instituteWebsite: formdata?.instituteWebsite,
      instituteWebsite2: formdata?.instituteWebsite2,
      freeCourse: isFreeCourse ? 1 : 0,
      price: +formdata?.price,
      discountApplicable: +discount,
      discout: provideDisc ? 1 : 0,
      providerName: data?.data?.id || 0,
      clientId: data?.data?.id || 0,
      userId: UserId,
    };

    if (+courseId) {
      updateCourseFun({
        payload,
        id: +courseId,
        version: getSingleCourse?.data?.version
      });
    } else {
      mutate(payload);
    }
  };

  useEffect(() => {
    if (isFreeCourse) {
      clearErrors("price");
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
            {...register("institute")}
            error={errors.institute?.message as string}
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
            {...register("instituteWebsite2")}
            error={errors.instituteWebsite2?.message as string}
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
                setValue("freeCourse", !isFreeCourse);
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
              {...register("price")}
              error={
                !errors?.price?.ref?.value
                  ? (errors.price?.message as string)
                  : ""
              }
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
                +discount > +coursePrise
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
            {isPending || isUpdatePending ? (
              <Loader containerClassName="max-h-auto" />
            ) : (
              "Next"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CourseInformation;
