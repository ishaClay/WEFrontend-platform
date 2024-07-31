import FormError from "@/components/comman/FormError";
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

const organisationOption = [
  {
    label: "organisation 1",
    value: "organisation 1",
  },
  {
    label: "organisation 2",
    value: "organisation 2",
  },
];

const organisationNameOption = [
  {
    label: "organisation Name 1",
    value: "organisation Name 1",
  },
  {
    label: "organisation Name 2",
    value: "organisation Name 2",
  },
];

const schema = zod.object({
  instituteOther: zod.string().min(1, "Please select Affiliation"),
  otherInstitutionName: zod.string().min(1, "Please select institution / organisation name"),
});

interface CourseAffiliationsProps {
  setStep: (e: string) => void;
  courseById: number | null;
}

const CourseAffiliations = ({ setStep, courseById }: CourseAffiliationsProps) => {
  type ValidationSchema = zod.infer<typeof schema>;
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(schema),
    mode: "all",
  });
  const navigate = useNavigate();
  const search = window.location.search;
  const params = new URLSearchParams(search).get("id");
  const paramsTab = new URLSearchParams(search).get("tab");
  const paramsversion = new URLSearchParams(search).get("version");
  const pathName: string = location?.pathname?.split("/")[1];
  const courseId: string = location?.pathname?.split("/")[3];

  const { mutate, isPending } = useMutation({
    mutationFn: createCourseTwoPage,
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: data?.data?.message,
        variant: "success",
      });
      setStep("4");
      navigate(
        `/${pathName}/create_course?tab=${paramsTab}&step=${4}&id=${params}&version=${paramsversion}`,
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
    queryKey: [QUERY_KEYS.getSingleCourse, { paramsversion, courseById }],
    queryFn: () => fetchSingleCourseById(String(+courseId ? paramsversion : courseById)),
    enabled: (+courseId || courseById) ? (!!paramsversion || !!courseById) : false,
  });

  useEffect(() => {
    if (getSingleCourse && getSingleCourse?.data?.course) {
      const data: CourseData | any = getSingleCourse?.data?.course;
      (Object.keys(data) as Array<keyof CourseData>).forEach((key: any) => {
        setValue(key, data[key]);
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
      setStep("4");
      navigate(
        `/${pathName}/create_course/${
          +courseId ? courseId : params
        }?tab=${paramsTab}&step=${4}&version=${paramsversion}`,
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
      instituteOther: data?.instituteOther,
      otherInstitutionName: data?.otherInstitutionName,
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
        Course Affiliations
      </div>
      <div className="border border-[#D9D9D9] rounded-md xl:p-[30px] md:p-[25px] p-[15px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <h6 className="sm:text-base text-sm text-[#515151] font-calibri pb-3">
              Is this course affiliated with any other institutes or
              organisation?
            </h6>
            <div className="md:mb-[28px] sm:mb-5 mb-[15px]">
              <SelectMenu
                option={organisationOption}
                setValue={(data: string) => setValue("instituteOther", data)}
                value={watch("instituteOther")}
                placeholder="Other"
                className="bg-[#FFF] text-foreground font-calibri font-normal sm:text-base text-sm sm:py-4 sm:px-[15px] p-[10px] h-auto"
              />
              {errors.instituteOther && (
                <FormError message={errors.instituteOther?.message as string} />
              )}
            </div>
          </div>
          <div className="">
            <h6 className="sm:text-base text-sm text-[#515151] font-calibri pb-3">
              Provide Institution / organisation Name
            </h6>
            <div className="md:mb-[39px] sm:mb-[25px] mb-[20px]">
              <SelectMenu
                option={organisationNameOption}
                setValue={(data: string) =>
                  setValue("otherInstitutionName", data)
                }
                value={watch("otherInstitutionName")}
                placeholder="Enter Name"
                className="bg-[#FFF] text-foreground font-calibri font-normal sm:text-base text-sm sm:py-4 sm:px-[15px] p-[10px] h-auto"
              />
              {errors.otherInstitutionName && (
                <FormError
                  message={errors.otherInstitutionName?.message as string}
                />
              )}
            </div>
          </div>
          <div className="sm:text-right text-center">
            <Button
              type="submit"
              className="outline-none text-base font-inter text-white bg-[#58BA66] sm:w-[120px] sm:h-[52px] w-[100px] h-[36px]"
              disabled={isPending || isUpdatePending}
            >
              {isPending || isUpdatePending ? (
                <Loader containerClassName="h-auto" />
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

export default CourseAffiliations;
