import InputWithLabel from "@/components/comman/InputWithLabel";
import Loader from "@/components/comman/Loader";
import SelectMenu from "@/components/comman/SelectMenu";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { QUERY_KEYS } from "@/lib/constants";
import { getCertificate } from "@/services/apiServices/certificate";
import {
  createCourseTwoPage,
  fetchNfqlLevel,
  fetchSingleCourseById,
  updateCourse,
} from "@/services/apiServices/courseManagement";
import { ResponseError } from "@/types/Errors";
import { CertificateResponse } from "@/types/certificate";
import { CourseData } from "@/types/course";
import { NfqlLevelResponse } from "@/types/nfql";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as zod from "zod";

const schema = zod.object({
  nfqLeval: zod.string().min(1, "NQF level is required"),
  certificate: zod.string().min(1, "Participants is required"),
  ectsCredits: zod.string().min(1, "ECTS credit is required"),
  fetCredits: zod.string().min(1, "FET credit is required"),
});

const CourseSpecifications = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "all",
  });
  const search = window.location.search;
  const params = new URLSearchParams(search).get("id");
  const paramsTab = new URLSearchParams(search).get("tab");
  const paramsversion = new URLSearchParams(search).get("version");
  const navigate = useNavigate();
  const pathName: string = location?.pathname?.split("/")[1];
  const courseId: string = location?.pathname?.split("/")[3];

  const { data } = useQuery<CertificateResponse>({
    queryKey: ["certificate"],
    queryFn: getCertificate,
  });

  const { data: nfql } = useQuery<NfqlLevelResponse>({
    queryKey: ["nfqllevel"],
    queryFn: fetchNfqlLevel,
  });

  const { data: getSingleCourse } = useQuery({
    queryKey: [QUERY_KEYS.getSingleCourse, { paramsversion }],
    queryFn: () => fetchSingleCourseById(String(paramsversion)),
    enabled: +courseId ? !!paramsversion : false,
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
      navigate(
        `/${pathName}/create_course/${
          location?.pathname?.split("/")[3]
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

  return (
    <div className="border border-[#D9D9D9] rounded-md p-7">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-[18px]">
          <Label className="font-primary font-[400] leading-normal font-calibri text-[16px] text-[#515151]">
            Specify the NFQ level for this course (if applicable).
          </Label>
          <SelectMenu
            {...register("nfqLeval")}
            option={nfqlLevelOption || []}
            setValue={(e: string) => setValue("nfqLeval", e)}
            value={watch("nfqLeval")}
            placeholder="Select NQF Level"
            className="border border-[#D9D9D9] rounded-md w-full px-4 py-3 outline-none font-base font-calibri text-[#1D2026] mt-[9px]"
          />
        </div>
        <div className="mb-[18px]">
          <InputWithLabel
            label="How many ECTS credits does this course offer?"
            labelClassName="font-calibri md:text-[16px] text-[#515151]"
            placeholder="60 Credits"
            className="border border-[#D9D9D9] rounded-md w-full px-4 py-3 outline-none font-base font-calibri text-[#1D2026] mt-[9px]"
            {...register("ectsCredits")}
            error={errors.ectsCredits?.message as string}
          />
        </div>
        <div className="mb-[18px]">
          <InputWithLabel
            label="How many FET credits does this course offer?"
            labelClassName="font-calibri md:text-[16px] text-[#515151]"
            placeholder="60 Credits"
            className="border border-[#D9D9D9] rounded-md w-full px-4 py-3 outline-none font-base font-calibri text-[#1D2026] mt-[9px]"
            {...register("fetCredits")}
            error={errors.fetCredits?.message as string}
          />
        </div>
        <div className="mb-[18px]">
          <Label className="font-primary font-[400] leading-normal font-calibri text-[16px] text-[#515151]">
            What type of certificate or award will certificate receive upon
            completion?
          </Label>
          <SelectMenu
            option={certificateOption || []}
            setValue={(e: string) => setValue("certificate", e)}
            value={watch("certificate")}
            placeholder="Post Graduate Degree or Diploma, Certificate, Professional Diploma"
            className="border border-[#D9D9D9] rounded-md w-full px-4 py-3 outline-none font-base font-calibri text-[#1D2026] mt-[9px]"
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

export default CourseSpecifications;
