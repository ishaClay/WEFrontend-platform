import InputWithLabel from "@/components/comman/InputWithLabel";
import Loader from "@/components/comman/Loader";
import SelectMenu from "@/components/comman/SelectMenu";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { QUERY_KEYS } from "@/lib/constants";
import {
  createCourseTwoPage,
  fetchSingleCourseById,
  updateCourse,
} from "@/services/apiServices/courseManagement";
import { ResponseError } from "@/types/Errors";
import { CourseData } from "@/types/course";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as zod from "zod";

const Time = [
  {
    label: "Full time",
    value: "0",
  },
  {
    label: "Part time",
    value: "1",
  },
];

const isOnlineType = [
  {
    label: "Online",
    value: "0",
  },
  {
    label: "In-Person",
    value: "1",
  },
  {
    label: "Hybrid",
    value: "2",
  },
  {
    label: "Major",
    value: "3",
  },
];

const durationType = [
  {
    label: "Days",
    value: "Days",
  },
  {
    label: "Weeks",
    value: "Weeks",
  },
  {
    label: "Months",
    value: "Months",
  },
  {
    label: "Year",
    value: "Year",
  },
];

const schema = zod.object({
  time: zod.string().min(1, "Time is required"),
  isOnline: zod.string().min(1, "Type is required"),
  universityAddress: zod.string().min(1, "Location is required"),
  duration: zod
    .string()
    .min(1, "Duration is required")
    .refine((val) => {
      return !isNaN(parseFloat(val)) && parseFloat(val) > 0;
    }, "Duration should be greater than 0"),
  durationType: zod.string().min(1, "Duration type is required"),
});

interface CourseLogisticProps {
  setStep: (e: string) => void;
}

const CourseLogistic = ({setStep}: CourseLogisticProps) => {
  type ValidationSchema = zod.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: {
      time: Time[0].value,
      isOnline: isOnlineType[0].value,
      universityAddress: "",
      duration: "",
      durationType: durationType[0].value,
    },
  });
  const navigate = useNavigate();
  const search = window.location.search;
  const params = new URLSearchParams(search).get("id");
  const paramsTab = new URLSearchParams(search).get("tab");
  const paramsversion = new URLSearchParams(search).get("version");
  const pathName: string = location?.pathname?.split("/")[1];
  const courseId: string = location?.pathname?.split("/")[3];

  const { data: getSingleCourse } = useQuery({
    queryKey: [QUERY_KEYS.getSingleCourse, { paramsversion, params }],
    queryFn: () => fetchSingleCourseById(String(+courseId ? paramsversion : params)),
    enabled: (+courseId || params) ? (!!paramsversion || !!params) : false,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createCourseTwoPage,
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: data?.data?.message,
        variant: "success",
      });
      navigate(
        `/${pathName}/create_course?tab=${paramsTab}&step=${3}&id=${params}&version=${paramsversion}`,
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

  useEffect(() => {
    if (getSingleCourse && getSingleCourse?.data?.course) {
      const data: CourseData | any = getSingleCourse?.data?.course;
      (Object.keys(data) as Array<keyof CourseData>).forEach((key: any) => {
        setValue(key, data[key]);
        setValue("time", getSingleCourse?.data?.course?.time?.toString());
        setValue(
          "isOnline",
          getSingleCourse?.data?.course?.isOnline?.toString()
        );
      });
    }
  }, [getSingleCourse]);

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
        }?tab=${paramsTab}&step=${3}&version=${paramsversion}`,
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

  const onSubmit = (data: FieldValues) => {
    const payload = {
      time: +data?.time,
      isOnline: +data?.isOnline,
      universityAddress: data?.universityAddress,
      duration: data?.duration.split(" ")?.[0] + " " + data?.durationType,
    };
    setStep("3");
    if (+courseId) {
      updateCourseFun({
        payload,
        id: +courseId,
        version: getSingleCourse?.data?.version,
      });
    } else {
      mutate({
        data: payload,
        id: params || "",
        paramsversion: paramsversion || "",
      });
    }
  };
  console.log("watch(", watch("durationType"));
  

  return (
    <>
      <div className="text-base text-[#00778B] font-semibold leading-[22px] pb-2.5 sm:hidden block">
        Course Logistic
      </div>
      <div className="border border-[#D9D9D9] rounded-md xl:p-[30px] md:p-[25px] p-[15px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <h6 className="text-base text-[#515151] font-calibri sm:pb-3 pb-2">
              Is this course offered on a full-time or part-time basis?
            </h6>
            <div className="sm:mb-[18px] mb-[15px]">
              <SelectMenu
                option={Time}
                setValue={(data: string) => setValue("time", data)}
                value={watch("time")}
                className="bg-[#FFF] text-foreground font-calibri font-normal text-base sm:py-4 sm:px-[15px] p-[10px] h-auto"
              />
            </div>
          </div>
          <div className="">
            <h6 className="text-base text-[#515151] font-calibri sm:pb-3 pb-2">
              How is this course delivered? (e.g., Online, In-person, Hybrid)
            </h6>
            <div className="sm:mb-[18px] mb-[15px]">
              <SelectMenu
                option={isOnlineType}
                setValue={(data: string) => setValue("isOnline", data)}
                value={watch("isOnline")}
                className="bg-[#FFF] text-foreground font-calibri font-normal text-base sm:py-4 sm:px-[15px] p-[10px] h-auto"
              />
            </div>
          </div>
          <div className="">
            <h6 className="text-base text-[#515151] font-calibri sm:pb-3 pb-2">
              Where is this course physically located? (if applicable)
            </h6>
            <div className="sm:mb-[18px] mb-[15px] w-full">
              <InputWithLabel
                type="text"
                placeholder="University Address"
                className="sm:py-4 sm:px-[15px] p-[10px] !text-[#000] placeholder:text-black rounded-md text-base font-calibri"
                {...register("universityAddress")}
                value={watch("universityAddress")}
                error={errors.universityAddress?.message as string}
              />
            </div>
          </div>
          <div className="">
            <h6 className="text-base text-[#515151] font-calibri sm:pb-3 pb-2">
              What is the duration of the course? (e.g., 6 months, 1 year)
            </h6>
            <div className="flex sm:mb-5 mb-[15px] gap-5">
              <div>
                <InputWithLabel
                  type="number"
                  placeholder={`Please enter ${watch("durationType")}`}
                  className="border-[#D9D9D9] placeholder:text-black border rounded-md font-calibri sm:text-base text-sm sm:px-3 sm:py-[14px] py-2.5"
                  {...register("duration")}
                  value={watch("duration")?.split(" ")[0]}
                  error={errors.duration?.message as string}
                />
              </div>
              <div className="">
                <SelectMenu
                  option={durationType}
                  setValue={(data: string) => setValue("durationType", data)}
                  value={watch("durationType")}
                  className="sm:w-[150px] w-[110px] border font-calibri border-[#D9D9D9] rounded-md sm:py-[16px] py-2.5 h-auto"
                  itemClassName="text-[#1D2026] font-calibri"
                />
              </div>
            </div>
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

export default CourseLogistic;
