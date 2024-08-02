import InputWithLabel from "@/components/comman/InputWithLabel";
import Loader from "@/components/comman/Loader";
import SelectMenu from "@/components/comman/SelectMenu";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { QUERY_KEYS } from "@/lib/constants";
import { RootState } from "@/redux/store";
import { certificateList } from "@/services/apiServices/certificate";
import {
  createCourseTwoPage,
  fetchNfqlLevel,
  fetchSingleCourseById,
  updateCourse,
} from "@/services/apiServices/courseManagement";
import { ResponseError } from "@/types/Errors";
import { CourseData } from "@/types/course";
import { NfqlLevelResponse } from "@/types/nfql";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as zod from "zod";

const schema = zod.object({
  nfqLeval: zod
    .string({ required_error: "Please select NQF level" })
    .min(1, "Please select NQF level"),
  certificate: zod.string().min(1, "Please select certificate type").optional(),
  ectsCredits: zod.string().min(1, "Please enter ECTS credit"),
  fetCredits: zod.string().min(1, "Please enter FET credit"),
});

interface CourseSpecificationsProps {
  setStep: (e: string) => void;
  courseById: number | null;
}

const CourseSpecifications = ({setStep, courseById}:CourseSpecificationsProps) => {
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
  });
  const { UserId } = useSelector((state: RootState) => state.user);
  const search = window.location.search;
  const params = new URLSearchParams(search).get("id");
  const paramsTab = new URLSearchParams(search).get("tab");
  const paramsversion = new URLSearchParams(search).get("version");
  const navigate = useNavigate();
  const pathName: string = location?.pathname?.split("/")[1];
  const courseId: string = location?.pathname?.split("/")[3];

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.getcertificate],
    queryFn: () => certificateList(UserId),
  });

  const { data: nfql } = useQuery<NfqlLevelResponse>({
    queryKey: ["nfqllevel"],
    queryFn: fetchNfqlLevel,
  });

  const { data: getSingleCourse } = useQuery({
    queryKey: [QUERY_KEYS.getSingleCourse, { paramsversion, courseById }],
    queryFn: () => fetchSingleCourseById(String(+courseId ? paramsversion : courseById)),
    enabled: (+courseId || courseById) ? (!!paramsversion || !!courseById) : false,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createCourseTwoPage,
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: data?.data?.message,
        variant: "success",
      });
      setStep("2");
      navigate(
        `/${pathName}/create_course?tab=${paramsTab}&step=${2}&id=${params}&version=${paramsversion}`,
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

  const certificateOption =
    data?.data?.length &&
    data?.data?.map((item) => {
      return {
        label: item.templateName,
        value: item.id.toString(),
      };
    });

  const nfqlLevelOption =
    nfql?.data?.length &&
    nfql?.data?.map((item) => {
      return {
        label: item.leval,
        value: item.id.toString(),
      };
    });

  useEffect(() => {
    if (getSingleCourse && getSingleCourse?.data?.course) {
      const data: CourseData | any = getSingleCourse?.data?.course;
      (Object.keys(data) as Array<keyof CourseData>).forEach((key: any) => {
        setValue(key, data[key]);
        setValue(
          "nfqLeval",
          getSingleCourse?.data?.course?.nfqLeval?.id.toString()
        );
        setValue(
          "certificate",
          getSingleCourse?.data?.course?.certificate?.id?.toString()
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
      setStep("2");
      navigate(
        `/${pathName}/create_course/${
          +courseId ? courseId : params
        }?tab=${paramsTab}&step=${2}&version=${paramsversion}`,
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
      nfqLeval: data?.nfqLeval,
      ectsCredits: data?.ectsCredits,
      fetCredits: data?.fetCredits,
      certificate: data?.certificate,
    };

    if (+courseId) {
      updateCourseFun({
        payload,
        id: getSingleCourse?.data?.course?.id,
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

  return (
    <>
      <div className="text-base text-[#00778B] font-semibold leading-[22px] pb-2.5 sm:hidden block">
        Course Details & Specifications
      </div>
      <div className="border border-[#D9D9D9] rounded-md xl:p-[30px] md:p-[25px] p-[15px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="sm:mb-[18px] mb-[15px]">
            <Label className="font-primary font-[400] leading-normal font-calibri sm:text-base text-sm text-[#515151]">
              Specify the NFQ level for this course (if applicable).
            </Label>
            <SelectMenu
              {...register("nfqLeval")}
              option={nfqlLevelOption || []}
              setValue={(e: string) => setValue("nfqLeval", e)}
              value={watch("nfqLeval")}
              placeholder="Select NQF Level"
              className="border border-[#D9D9D9] rounded-md w-full outline-none font-base font-calibri text-[#1D2026] sm:mt-[9px] mt-[8px] sm:py-4 sm:px-[15px] p-[10px]"
            />
          </div>
          <div className="sm:mb-[18px] mb-[15px]">
            <InputWithLabel
              label="How many ECTS credits does this course offer?"
              labelClassName="font-calibri sm:text-base text-sm text-[#515151]"
              placeholder="60 Credits"
              className="border border-[#D9D9D9] rounded-md w-full outline-none font-base font-calibri text-[#1D2026] mt-[9px] sm:py-4 sm:px-[15px] p-[10px]"
              {...register("ectsCredits")}
              error={errors.ectsCredits?.message as string}
            />
          </div>
          <div className="sm:mb-[18px] mb-[15px]">
            <InputWithLabel
              label="How many FET credits does this course offer?"
              labelClassName="font-calibri sm:text-base text-sm text-[#515151]"
              placeholder="60 Credits"
              className="border border-[#D9D9D9] rounded-md w-full outline-none font-base font-calibri text-[#1D2026] mt-[9px] sm:py-4 sm:px-[15px] p-[10px]"
              {...register("fetCredits")}
              error={errors.fetCredits?.message as string}
            />
          </div>
          <div className="sm:mb-[20px] mb-[15px]">
            <Label className="font-primary font-[400] leading-normal font-calibri sm:text-base text-sm text-[#515151]">
              What type of certificate or award will certificate receive upon
              completion?
            </Label>
            <SelectMenu
              option={certificateOption || []}
              setValue={(e: string) => setValue("certificate", e)}
              value={watch("certificate") || ""}
              placeholder="Post Graduate Degree or Diploma, Certificate, Professional Diploma"
              className="border border-[#D9D9D9] rounded-md w-full px-4 py-3 outline-none font-base font-calibri text-[#1D2026] mt-[9px] sm:py-4 sm:px-[15px] p-[10px]"
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

export default CourseSpecifications;
