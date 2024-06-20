import FormError from "@/components/comman/FormError";
import Loader from "@/components/comman/Loader";
import SelectMenu from "@/components/comman/SelectMenu";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { createCourseTwoPage } from "@/services/apiServices/courseManagement";
import { ResponseError } from "@/types/Errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
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
  affiliation: zod.string().min(1, "Affiliation is required"),
  affiliationName: zod.string().min(1, "Affiliation Name is required"),
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

  const { mutate, isPending } = useMutation({
    mutationFn: createCourseTwoPage,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Course created successfully",
        variant: "success",
      });
      navigate(
        `/trainer/create_course?tab=${paramsTab}&step=${4}&id=${params}&version=${paramsversion}`,
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
      instituteOther: data?.affiliation,
      otherInstitutionName: data?.affiliationName,
    };

    mutate({
      data: payload,
      id: params || "",
      paramsversion: paramsversion || "",
    });
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
              setValue={(data: string) => setValue("affiliation", data)}
              value={watch("affiliation")}
              placeholder="Other"
              className="bg-[#FFF] text-foreground font-calibri font-normal text-base p-4 py-[14px] h-auto"
            />
            {errors.affiliation && (
              <FormError message={errors.affiliation?.message as string} />
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
              setValue={(data: string) => setValue("affiliationName", data)}
              value={watch("affiliationName")}
              placeholder="Enter Name"
              className="bg-[#FFF] text-foreground font-calibri font-normal text-base p-4 py-[14px] h-auto"
            />
            {errors.affiliationName && (
              <FormError message={errors.affiliationName?.message as string} />
            )}
          </div>
        </div>
        <div className="text-right">
          <Button
            type="submit"
            className="outline-none text-base font-inter text-white bg-[#58BA66] py-6 px-8"
          >
            {isPending ? <Loader containerClassName="h-auto" /> : "Next"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CourseAffiliations;
