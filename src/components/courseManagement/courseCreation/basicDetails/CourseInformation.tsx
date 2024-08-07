import InputWithLabel from "@/components/comman/InputWithLabel";
import Loader from "@/components/comman/Loader";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { useAppSelector } from "@/hooks/use-redux";
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import * as zod from "zod";

const schema = zod
  .object({
    title: zod.string().min(1, "Please enter title").max(250, "You can not write title more than 250 characters"),
    institute: zod.string().min(1, "Please enter institute name").max(250, "You can not write institute more than 250 characters"),
    instituteWebsite: zod.string().regex(/^https?:\/\/[^\s/$.?#].[^\s]*$/, "Please enter a valid website URL starting with http:// or https://").url("Please enter valid website url"),
    freeCourse: zod.boolean().optional(),
    instituteWebsite2: zod.string().regex(/^(\s*|https?:\/\/[^\s/$.?#].[^\s]*)$/, "Please enter a valid website URL starting with http:// or https://").optional(),
    price: zod
      .string({
        errorMap: () => ({ message: "Please enter valid course price" }),
      })
      .refine(
        (val: string | any) => val === undefined || val === "" || !isNaN(val),
        "Please enter valid course price"
      ),
    discountApplicable: zod.number().optional(),
  })
  .refine(
    (data) => {
      const { freeCourse, price } = data;
      if (freeCourse === false && (price === undefined || price === "")) {
        return false;
      }
      return true;
    },
    {
      message: "Course Price is required",
      path: ["price", "freeCourse"],
    }
  );

type FormData = zod.infer<typeof schema>;
interface CourseInformationProps {
  courseById: number | null;
  setCourseById: (e: number) => void;
}

const CourseInformation = ({
  courseById,
  setCourseById,
}: CourseInformationProps) => {
  console.log("courseById", courseById);
  const [isFreeCourse, setIsFreeCourse] = React.useState(false);
  const [provideDisc, setProvideDisc] = React.useState(false);
  const [discount, setDiscount] = React.useState("");
  const { clientId, UserId } = useAppSelector((state) => state.user);
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const userID = UserId ? UserId : userData?.query?.id;
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
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
  const paramsId = new URLSearchParams(search).get("id");
  const paramsVersion = new URLSearchParams(search).get("version");
  const coursePrise = watch("price") || "0";
  const pathName: string = location?.pathname?.split("/")[1];
  const courseId: string = location?.pathname?.split("/")[3];
  const { data } = useQuery<ClientResponse>({
    queryKey: ["price", { clientId }],
    queryFn: () => fetchClientById(clientId),
  });
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createCourse,
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: data?.data?.message,
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.getSingleCourse],
      });
      setCourseById(data?.data?.data?.id);
      navigate(
        `/${pathName}/create_course?tab=${data?.data?.data?.course?.tab}&step=${data?.data?.data?.course?.step}&id=${
          data?.data?.data?.course?.id
        }&version=${data?.data?.data?.id}`,
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
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.getSingleCourse],
      });
      const updatedData = data?.data?.data;
      navigate(
        `/${pathName}/create_course/${
          +courseId ? courseId : updatedData?.id
        }?tab=${updatedData?.creationCompleted ? "0" : updatedData?.tab}&step=${updatedData?.creationCompleted ? "1" : updatedData?.step}&version=${
          updatedData?.currentVersion?.id
        }`,
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

  console.log("isDirty", isDirty);
  

  const { data: getSingleCourse } = useQuery({
    queryKey: [QUERY_KEYS.getSingleCourse, { paramsVersion, paramsId }],
    queryFn: () =>
      fetchSingleCourseById(String(paramsVersion)),
      enabled: !!paramsVersion,
  });  

  useEffect(() => {
    if (getSingleCourse && getSingleCourse?.data?.course) {
      const data: CourseData | any = getSingleCourse?.data?.course;
      (Object.keys(data) as Array<keyof CourseData>).forEach((key: any) => {
        setValue(key, data[key]);
        setValue("freeCourse", data.freeCourse === 1 ? true : false);
        setValue("price", String(data?.price));
      });
      setDiscount(data?.discountApplicable);
      setIsFreeCourse(data.freeCourse === 1 ? true : false);
      setProvideDisc(data.discout === 1 ? true : false);
    }
  }, [getSingleCourse, setValue]);

  console.log("asdasd", watch());
  

  const onSubmit = (formdata: FieldValues) => {
    const payload = {
      title: formdata?.title,
      institute: formdata?.institute,
      instituteWebsite: formdata?.instituteWebsite,
      instituteWebsite2: formdata?.instituteWebsite2,
      freeCourse: isFreeCourse ? 1 : 0,
      price: formdata?.price ? formdata?.price?.toString() : "0",
      discountApplicable: discount ? discount?.toString() : "0",
      discout: provideDisc ? "1" : "0",
      providerName: data?.data?.id || 0,
      clientId: data?.data?.id || 0,
      userId: userID,
      tab: "0", 
      step: "1"
    };

    if(isDirty){
      if (+courseId || paramsId) {
        updateCourseFun({
          payload,
          id: getSingleCourse?.data?.course?.id,
          version: getSingleCourse?.data?.version,
        });
      } else {
        mutate(payload);
      }
    } else {
      console.log("payload");
      
      navigate(
        `/${pathName}/create_course/${
          getSingleCourse?.data?.course?.id
        }?tab=${0}&step=${1}&version=${
          getSingleCourse?.data?.id
        }`,
        {
          replace: true,
        }
      );
    }
  };

  useEffect(() => {
    if (isFreeCourse) {
      clearErrors("price");
    }
  }, [isFreeCourse, clearErrors]);

  return (
    <>
      <div className="text-base text-[#00778B] font-semibold leading-[22px] pb-2.5 sm:hidden block">
        Course Information
      </div>
      <div className="border border-[#D9D9D9] rounded-md xl:p-[30px] md:p-[25px] p-[15px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="sm:mb-[18px] mb-[15px]">
            <InputWithLabel
              label="What is the title of the course you're offering?"
              labelClassName="font-calibri sm:text-base text-sm text-[#515151]"
              placeholder="Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity"
              className="border border-[#D9D9D9] rounded-md w-full sm:px-4 sm:py-3 p-[10px] outline-none font-calibri text-[#1D2026] sm:mt-[9px] mt-2"
              {...register("title")}
              error={errors.title?.message as string}
            />
          </div>
          <div className="sm:mb-[18px] mb-[15px]">
            <InputWithLabel
              label="Please enter the name of the institute providing this course."
              labelClassName="font-calibri sm:text-base text-sm text-[#515151]"
              placeholder="Atlantic Technological University"
              className="border border-[#D9D9D9] rounded-md w-full sm:px-4 sm:py-3 p-[10px] outline-none font-base font-calibri text-[#1D2026] sm:mt-[9px] mt-2"
              {...register("institute")}
              error={errors.institute?.message as string}
            />
          </div>
          <div className="sm:mb-[18px] mb-[15px]">
            <InputWithLabel
              label="Provide a direct link to the course details on your institute's website."
              labelClassName="font-calibri sm:text-base text-sm text-[#515151]"
              placeholder="www.atlanticTechnologicalUniversity.com"
              className="border border-[#D9D9D9] rounded-md w-full sm:px-4 sm:py-3 p-[10px] outline-none font-base font-calibri text-[#1D2026] sm:mt-[9px] mt-2"
              {...register("instituteWebsite")}
              error={errors.instituteWebsite?.message as string}
            />
          </div>
          <div className="sm:mb-[13px] mb-[15px]">
            <InputWithLabel
              label="Do you have any additional links for course materials or resources? (Optional)"
              labelClassName="font-calibri sm:text-base text-sm text-[#515151]"
              placeholder="www.atlanticTechnologicalUniversity.com"
              className="border border-[#D9D9D9] rounded-md w-full sm:px-4 sm:py-3 p-[10px] outline-none font-base font-calibri text-[#1D2026] sm:mt-[9px] mt-2"
              {...register("instituteWebsite2")}
              error={errors.instituteWebsite2?.message as string}
            />
          </div>
          <div className="md:flex block items-center gap-10 sm:pb-6 pb-[15px]">
            <div className="flex md:flex-col flex-row md:gap-[50px] gap-[10px] md:pb-0 pb-[21px]">
              <div className="flex items-center">
                <span className="pe-3 font-calibri md:text-base sm:text-sm text-xs text-black">
                  Free Course?
                </span>
                <Switch
                  checked={isFreeCourse}
                  onCheckedChange={() => {
                    setIsFreeCourse(!isFreeCourse);
                    setValue("freeCourse", !isFreeCourse);
                  }}
                  className="w-8 h-5"
                  switchClassName="w-4 h-4 data-[state=checked]:translate-x-3"
                />
              </div>
              <div className="flex items-center">
                <span className="pe-3 font-calibri md:text-base sm:text-sm text-xs text-black">
                  Discount provided?
                </span>
                <Switch
                  disabled={isFreeCourse}
                  checked={provideDisc}
                  onCheckedChange={() => setProvideDisc(!provideDisc)}
                  className="w-8 h-5"
                  switchClassName="w-4 h-4 data-[state=checked]:translate-x-3"
                />
              </div>
            </div>

            <div className="flex flex-col md:gap-[25px] gap-[15px]">
              <div className="flex items-center">
                <span className="pe-3 font-calibri sm:text-base text-sm text-[#515151] xl:w-[130px]">
                  Course Price
                </span>
                <InputWithLabel
                  placeholder="€50.00"
                  className="sm:w-[190px] w-[170px] px-4 py-3 border border-[#D9D9D9] rounded-md outline-none"
                  disabled={isFreeCourse}
                  {...register("price")}
                  error={
                    !errors?.price?.ref?.value
                      ? (errors?.price?.message as string)
                      : ""
                  }
                />
              </div>
              <div className="flex items-center">
                <span className="pe-3 font-calibri sm:text-base text-sm text-[#515151] xl:w-[130px]">
                  Discounted Price
                </span>
                <InputWithLabel
                  placeholder="€255"
                  className="sm:w-[190px] w-[150px] px-4 py-3 border border-[#D9D9D9] rounded-md outline-none"
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
          </div>

          <div className="md:pb-8 sm:pb-6 pb-[15px]">
            <InputWithLabel
              label="Discount provided by"
              labelClassName="font-calibri !text-base text-[#000000]"
              placeholder="Select Skillnet"
              className="border border-[#D9D9D9] rounded-md w-full px-4 py-3 outline-none font-base font-calibri text-[#1D2026] mt-[9px]"
              disabled
              value={data?.data?.name}
            />
          </div>

          <div className="sm:text-right text-center">
            <Button
              type="submit"
              className="outline-none text-base font-inter text-white bg-[#58BA66] sm:w-[120px] sm:h-[52px] w-[100px] h-[36px]"
              disabled={isPending || isUpdatePending}
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
    </>
  );
};

export default CourseInformation;
