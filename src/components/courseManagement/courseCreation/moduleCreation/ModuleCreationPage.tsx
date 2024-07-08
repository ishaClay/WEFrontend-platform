import Loader from "@/components/comman/Loader";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { QUERY_KEYS } from "@/lib/constants";
import {
  changeModulePostion,
  createModule,
  createSection,
  getModuleData,
} from "@/services/apiServices/moduleCreation";
import { ModuleCreation, SectionCreation } from "@/types/modulecreation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CirclePlus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import CourseViewPage from "../courseView/CourseViewPage";
import ModuleCreationItems from "./ModuleCreationItems";

export const intialSectionCreation: SectionCreation = {
  sectionTitle: "",
  information: "",
  uploadContentType: 0,
  uploadedContentUrl: "",
  readingTime: {
    hour: 0,
    minute: 0,
    second: 0,
  },
  youtubeUrl: "",
  uploadDocument: "",
  isLive: false,
  livesessionDuration: {
    hour: 0,
    minute: 0,
    second: 0,
  },
};

export const intialModuleCreation: ModuleCreation = {
  moduleTitle: "",
  section: [intialSectionCreation],
};

const ModuleCreationPage = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const search = window.location.search;
  const courseID = new URLSearchParams(search).get("id") || "";
  const [moduleList, setModuleList] = useState<any>([]);
  const dragPerson = useRef<number>(0);
  const draggedOverPerson = useRef<number>(0);
  const latestModuleList = useRef(moduleList);
  const courseEditId: string = location?.pathname?.split("/")[3];

  const schema = z.object({
    modules: z.array(
      z.object({
        moduleTitle: z.string().min(1, "Module Title is required"),
        section: z.array(
          z
            .object({
              isLive: z.boolean(),
              sectionTitle: z
                .string()
                .min(1, "Section Title is required")
                .max(250, "You can not write more than 250 characters"),
              information: z
                .string()
                .min(1, "Information is required")
                .max(1000, "You can not write more than 1000 characters"),
              uploadContentType: z
                .number()
                // .min(1, "Upload content type is required")
                .optional(),
              uploadedContentUrl: z.string().optional(),
              youtubeUrl: z.string().optional(),
              readingTime: z
                .object({
                  hour: z.number().min(0).max(23),
                  minute: z.number().min(0).max(59),
                  second: z.number().min(0).max(59),
                })
                .optional(),
              uploadDocument: z.string().optional(),
              livesessionDuration: z
                .object({
                  hour: z.number().min(0).max(23),
                  minute: z.number().min(0).max(59),
                  second: z.number().min(0).max(59),
                })
                .optional(),
            })
            .superRefine((data, ctx) => {
              if (data.isLive) {
                console.log(
                  "livesessionDuration",
                  !data.livesessionDuration?.hour ||
                    !data.livesessionDuration?.minute ||
                    !data.livesessionDuration?.second
                );

                if (
                  !data.livesessionDuration?.hour &&
                  !data.livesessionDuration?.minute &&
                  !data.livesessionDuration?.second
                ) {
                  ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message:
                      "Live session duration is required when isLive is true",
                    path: ["livesessionDuration"],
                  });
                }
              } else {
                if (!data.uploadedContentUrl && !data.youtubeUrl) {
                  ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message:
                      "Either uploaded content url and File or YouTube URL is required ",
                    path: [
                      "uploadedContentUrl",
                      "uploadContentType",
                      "youtubeUrl",
                    ],
                  });
                }
                if (!data.youtubeUrl && data.uploadContentType) {
                  if (
                    !data.readingTime?.hour &&
                    !data.readingTime?.minute &&
                    !data.readingTime?.second
                  ) {
                    ctx.addIssue({
                      code: z.ZodIssueCode.custom,
                      message: "Reading time is required when isLive is false",
                      path: ["readingTime.hour"],
                    });
                  }
                  if (!data.uploadContentType) {
                    ctx.addIssue({
                      code: z.ZodIssueCode.custom,
                      message:
                        "Upload content type is required when isLive is false",
                      path: ["uploadContentType"],
                    });
                  }
                  if (!data.uploadedContentUrl) {
                    ctx.addIssue({
                      code: z.ZodIssueCode.custom,
                      message:
                        "Upload content url is required when isLive is false",
                      path: ["uploadedContentUrl"],
                    });
                  }
                }
              }
            })
          // .refine(data => data.isLive ? false : true, { message: "Section is required", path: ["uploadContentType"] })
        ),
      })
    ),
  });

  type ValidationSchema = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<ValidationSchema>({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: {
      modules: [intialModuleCreation],
    },
  });
  const error = errors;
  console.log("error", error);

  const {
    fields: moduleCreationItem,
    append: appendModule,
    remove: removeModule,
  } = useFieldArray({
    name: "modules",
    control,
  });
  console.log(
    "🚀 ~ ModuleCreationPage ~ moduleCreationItem:",
    moduleCreationItem
  );

  useEffect(() => {
    if (moduleList?.length > 0) {
      latestModuleList.current = moduleList; // update ref to latest state
      handleModulePosition();
      reset({ modules: [] });
    }
  }, [moduleList]);

  const CreateModuleAsync = useMutation({
    mutationFn: async (data: ModuleCreation) => createModule(data, courseID),
  });

  const createSectionAsync = useMutation({
    mutationFn: async (data: {
      moduleId: number;
      sections: SectionCreation[];
    }) => createSection(data.sections, data.moduleId),
  });

  const { mutate: ChangeModulePosition } = useMutation({
    mutationFn: (data: any) => changeModulePostion(data, courseID),
  });

  const { data: CourseModule, isFetching: courseLoading } = useQuery({
    queryKey: [QUERY_KEYS.fetchAllCourseModule, courseID],
    queryFn: () => getModuleData(courseEditId ? +courseEditId : +courseID),
    enabled: !!courseID || !!courseEditId,
  });

  useEffect(() => {
    if (CourseModule?.data?.data?.length) {
      setModuleList(CourseModule?.data.data);
    }
  }, [CourseModule]);

  const handleModuleSave = async (data: any) => {
    console.log("moduleCreationItems===>", data.modules);

    try {
      const promises = data.modules.map(async (module: ModuleCreation) => {
        const response = await CreateModuleAsync.mutateAsync(module);
        const moduleId = response.data.data.id;
        if (moduleId) {
          await createSectionAsync.mutateAsync({
            moduleId,
            sections: module.section,
          });
        }
      });
      await Promise.all(promises);
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.fetchAllCourseModule],
      });
      reset({ modules: [] });
      toast({
        variant: "success",
        title: "All modules and sections saved successfully",
      });
    } catch (error) {
      console.error("Error in saving process:", error);
      return toast({
        variant: "destructive",
        title: "Error in saving process",
      });
    }
  };

  const handleModulePosition = async () => {
    console.log("moduleList", moduleList);
    const payload = moduleList.map((module: any, index: number) => {
      return {
        Module: module.id,
        position: index + 1,
      };
    });

    ChangeModulePosition(payload);
  };

  const handleSort = () => {
    const moduleListClone = [...moduleList];

    const draggedElement = moduleListClone[dragPerson.current];
    moduleListClone.splice(dragPerson.current, 1);
    moduleListClone.splice(draggedOverPerson.current, 0, draggedElement);

    setModuleList(moduleListClone);
  };

  return (
    <div className="">
      <div className="flex justify-between items-center pb-5">
        <p className="text-[#606060] text-[15px] inline-block">
          Please fill in all the learning material for this course, as you see
          fit
        </p>
        <Button
          type="button"
          onClick={() => appendModule({ ...intialModuleCreation })}
          disabled={moduleList?.length > 0 && moduleCreationItem.length > 0}
          className="bg-[#42A7C3] px-4 py-2 me-4 font-inter text-xs"
        >
          <CirclePlus width={20} className="me-2" /> Add Module
        </Button>
      </div>
      <div className="pb-[38px] -mt-2">
        <p className="text-[#606060] text-[15px] font-abhaya leading-[16px]">
          {moduleCreationItem.length > 0
            ? "Please fill in all the learning material for this course, as you see fit"
            : "All the modules and chapters currently included in this course"}
        </p>
      </div>

      {courseLoading ? (
        <Loader />
      ) : (
        <>
          {moduleList?.length > 0 &&
            moduleList.map((data: any, index: number) => {
              return (
                <div
                  key={index}
                  draggable
                  onDragStart={() => (dragPerson.current = index)}
                  onDragEnter={() => (draggedOverPerson.current = index)}
                  onDragEnd={handleSort}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <CourseViewPage data={data} />
                </div>
              );
            })}

          <form onSubmit={handleSubmit(handleModuleSave)}>
            {moduleCreationItem.map((_, index) => {
              return (
                <ModuleCreationItems
                  errors={errors}
                  register={register}
                  setValue={setValue}
                  watch={watch}
                  control={control}
                  removeModule={removeModule}
                  key={`module${index}`}
                  moduleListlength={moduleList?.length}
                  index={index}
                />
              );
            })}

            {moduleCreationItem.length !== 0 && (
              <div className="text-right">
                <Button className="outline-none text-base font-inter text-white bg-[#58BA66] py-6 px-8">
                {/* {isPending ? <Loader containerClassName="h-auto" /> : "Save"} */}
                Save
                </Button>
              </div>
            )}
          </form>
        </>
      )}
    </div>
  );
};

export default ModuleCreationPage;
