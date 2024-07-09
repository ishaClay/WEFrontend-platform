import FormError from "@/components/comman/FormError";
import Loader from "@/components/comman/Loader";
import SelectMenu from "@/components/comman/SelectMenu";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { QUERY_KEYS } from "@/lib/constants";
import { createCourseTwoPage, fetchSingleCourseById, updateCourse } from "@/services/apiServices/courseManagement";
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
  instituteOther: zod.string().min(1, "Affiliation is required"),
  otherInstitutionName: zod.string().min(1, "Affiliation Name is required"),
});

const CourseAffiliations = () => {
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
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

  const {data: getSingleCourse} = useQuery({
    queryKey: [QUERY_KEYS.getSingleCourse, {paramsversion}],
    queryFn: () => fetchSingleCourseById(String(paramsversion)),
    enabled: +courseId ? !!paramsversion : false,
  })

  useEffect(() => {
    if (getSingleCourse && getSingleCourse?.data?.course) {
      const data:CourseData | any = getSingleCourse?.data?.course;
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
      navigate(
        `/${pathName}/create_course/${location?.pathname?.split("/")[3]}?tab=${paramsTab}&step=${4}&version=${paramsversion}`,
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
        id: +courseId,
        version: getSingleCourse?.data?.version
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
    <div className="border border-[#D9D9D9] rounded-md p-7">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="">
          <h6 className="text-base text-[#515151] font-calibri pb-3">
            Is this course affiliated with any other institutes or organisation?
          </h6>
          <div className="mb-[15px]">
            <SelectMenu
              option={organisationOption}
              setValue={(data: string) => setValue("instituteOther", data)}
              value={watch("instituteOther")}
              placeholder="Other"
              className="bg-[#FFF] text-foreground font-calibri font-normal text-base p-4 py-[14px] h-auto"
            />
            {errors.instituteOther && (
              <FormError message={errors.instituteOther?.message as string} />
            )}
          </div>
        </div>
        <div className="">
          <h6 className="text-base text-[#515151] font-calibri pb-3">
            Provide Institution / organisation Name
          </h6>
          <div className="mb-[15px]">
            <SelectMenu
              option={organisationNameOption}
              setValue={(data: string) => setValue("otherInstitutionName", data)}
              value={watch("otherInstitutionName")}
              placeholder="Enter Name"
              className="bg-[#FFF] text-foreground font-calibri font-normal text-base p-4 py-[14px] h-auto"
            />
            {errors.otherInstitutionName && (
              <FormError message={errors.otherInstitutionName?.message as string} />
            )}
          </div>
        </div>
        <div className="text-right">
          <Button
            type="submit"
            className="outline-none text-base font-inter text-white bg-[#58BA66] py-6 px-8"
          >
            {isPending || isUpdatePending ? <Loader containerClassName="h-auto" /> : "Next"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CourseAffiliations;
