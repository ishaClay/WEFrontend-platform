import CourseViewCardInnerList from "./CourseViewCardInnerList";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Modal from "@/components/comman/Modal";
import AssessmentModal from "./AssessmentModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  changeSectionPostion,
  createSection,
  updateSection,
} from "@/services/apiServices/moduleCreation";
import { toast } from "@/components/ui/use-toast";
import { intialSectionCreation } from "../moduleCreation/ModuleCreationPage";
import SectionForm from "../moduleCreation/SectionForm";
import { QUERY_KEYS } from "@/lib/constants";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { createLiveSection } from "@/services/apiServices/liveSession";

const CourseViewCardInner = ({
  CourseCardList,
  moduleId,
}: {
  CourseCardList: any;
  moduleId: string;
}) => {
  const [getCourseCardList, setGetCourseCardList] =
    useState<any[]>(CourseCardList);
  const dragPerson = useRef<number>(0);
  const draggedOverPerson = useRef<number>(0);
  const [addsectionList, setAddSectionList] = useState<boolean>(false);
  const latestCourseCardList = useRef(getCourseCardList);
  const [isEditSection, setIsEditSection] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const schema = z
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
            message: "Live session duration is required when isLive is true",
            path: ["livesessionDuration"],
          });
        }
      } else {
        if (!data.uploadedContentUrl && !data.youtubeUrl) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
              "Either uploaded content url and File or YouTube URL is required ",
            path: ["uploadedContentUrl", "uploadContentType", "youtubeUrl"],
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
              message: "Upload content type is required when isLive is false",
              path: ["uploadContentType"],
            });
          }
          if (!data.uploadedContentUrl) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Upload content url is required when isLive is false",
              path: ["uploadedContentUrl"],
            });
          }
        }
      }
    });

  type ValidationSchema = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
    getValues,
  } = useForm<ValidationSchema>({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: {
      isLive: false,
      sectionTitle: "",
      information: "",
      uploadContentType: 0,
      uploadedContentUrl: "",
      youtubeUrl: "",
      readingTime: { hour: 0, minute: 0, second: 0 },
      uploadDocument: "",
      livesessionDuration: { hour: 0, minute: 0, second: 0 },
    },
  });

  console.log("🚀 ~ CourseViewCardInner ~ errors:", errors);
  useEffect(() => {
    setGetCourseCardList(CourseCardList);
  }, [CourseCardList]);

  const [isOpenAssessmentModal, setIsOpenAssessmentModal] = useState(false);

  const { mutate: ChangeSectionPosition } = useMutation({
    mutationFn: (data: any) => changeSectionPostion(data, moduleId),
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: error.data.message,
      });
    },
  });

  const section = watch();
  console.log("🚀 ~ CourseViewCardInner ~ section:", section);

  useEffect(() => {
    // This effect runs after getCourseCardList state has been updated
    console.log("getCourseCardListgetCourseCardList", getCourseCardList);
    latestCourseCardList.current = getCourseCardList; // update ref to latest state
    handelSectionPosition();
  }, [getCourseCardList]);

  const { mutate: CreateSection } = useMutation({
    mutationFn: (data: any) => createSection(data, moduleId),
    onSuccess: (data: any) => {
      const newData = getCourseCardList.concat(data.data.data);
      setGetCourseCardList(newData);
      setAddSectionList(false);
      reset({ ...intialSectionCreation });
      toast({
        variant: "success",
        title: "Section added successfully",
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: error.data.message,
      });
    },
  });

  const { mutate: EditSection } = useMutation({
    mutationFn: (data: any) => updateSection(data, moduleId, isEditSection),
    onSuccess: () => {
      setIsEditSection(null);
      reset({ ...intialSectionCreation });
      toast({
        variant: "success",
        title: "Section updated successfully",
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.fetchAllCourseModule],
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: error.data.message,
      });
    },
  });

  const { mutate: EditLiveSection } = useMutation({
    mutationFn: (data: any) => createLiveSection(data),
    onSuccess: () => {
      setIsEditSection(null);
      reset({ ...intialSectionCreation });
      toast({
        variant: "success",
        title: "Section updated successfully",
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.fetchAllCourseModule],
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: error.data.message,
      });
    },
  });

  const handleSort = () => {
    const moduleListClone = [...getCourseCardList];

    const draggedElement = moduleListClone[dragPerson.current];
    moduleListClone.splice(dragPerson.current, 1);
    moduleListClone.splice(draggedOverPerson.current, 0, draggedElement);

    setGetCourseCardList(moduleListClone);
  };

  const handelSectionPosition = async () => {
    const payload = await getCourseCardList.map(
      (section: any, index: number) => {
        return {
          section: section.id,
          position: index + 1,
          isLive: section.isLive == 0 ? false : true,
        };
      }
    );
    ChangeSectionPosition(payload);
  };

  const handelEditSection = (data: any) => {
    setIsEditSection(data.id);
    setValue("sectionTitle", data.isLive ? data.liveSecTitle : data.title);
    setValue(
      "information",
      data.isLive ? data.liveSecinformation : data.information
    );
    setValue("uploadContentType", data.documentType);
    setValue("uploadedContentUrl", data.uploadContent);
    setValue(
      "readingTime",
      data.readingTime || { hour: 0, minute: 0, second: 0 }
    );
    setValue("youtubeUrl", data.isLive ? "" : data.url);
    setValue("uploadDocument", data.attachment);
    setValue("isLive", data.isLive === 1 ? true : false);
    setValue(
      "livesessionDuration",
      data.isLive ? data.sectionTime : { hour: 0, minute: 0, second: 0 }
    );
  };

  const handleRemoveSection = () => {
    if (isEditSection) {
      reset({ ...intialSectionCreation });
      setIsEditSection(null);
    } else {
      reset({ ...intialSectionCreation });
      setAddSectionList(false);
    }
  };

  const onSubmit = (data: FieldValues) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
    let payload = [];
    payload.push(data);
    if (payload.length > 0) {
      CreateSection(payload);
    }
  };

  const onUpdate = (data: FieldValues) => {
    
    const a = {
      isLive: true,
      liveSecTitle: data.sectionTitle,
      liveSecinformation: data.information,
      sectionTime: {
        hour: data.livesessionDuration.hour,
        minute: data.livesessionDuration.minute,
        second: data.livesessionDuration.second,
      },
      module: moduleId

    };
    if (data.isLive) {
      EditLiveSection(a);
    } else {
      EditSection(data);
    }
  };

  console.log("getCourseCardList ===>", getCourseCardList);

  return (
    <div
      className=""
      onDragStart={(e) => {
        e.stopPropagation();
      }}
      onDragEnter={(e) => {
        e.stopPropagation();
      }}
      onDragEnd={(e) => {
        e.stopPropagation();
      }}
      onDragOver={(e) => {
        e.stopPropagation();
      }}
    >
      <div>
        {getCourseCardList.map((data: any, index: number) => {
          console.log("data===>", data);

          return (
            <>
              {isEditSection && isEditSection === data.id ? (
                <form onSubmit={handleSubmit(onUpdate)} key={index}>
                  <SectionForm
                    watch={watch}
                    setValue={setValue}
                    errors={errors}
                    register={register}
                    getValues={getValues}
                    sectionID={isEditSection}
                    handleRemoveSection={handleRemoveSection}
                  />
                </form>
              ) : (
                <div
                  key={index}
                  draggable
                  onDragStart={() => (dragPerson.current = index)}
                  onDragEnter={() => (draggedOverPerson.current = index)}
                  onDragEnd={handleSort}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <CourseViewCardInnerList
                    key={index}
                    data={data}
                    handelEditSection={handelEditSection}
                  />
                </div>
              )}
            </>
          );
        })}
        <form onSubmit={handleSubmit(onSubmit)}>
          {addsectionList && (
            <SectionForm
              errors={errors}
              watch={watch}
              setValue={setValue}
              register={register}
              getValues={getValues}
              handleRemoveSection={handleRemoveSection}
            />
          )}

          {!isEditSection && (
            <div className="flex sm:justify-end justify-center gap-4 sm:m-5 mx-4 my-2.5">
              {!addsectionList ? (
                <>
                  <Button
                    type="button"
                    onClick={() => setAddSectionList(true)}
                    className="bg-[#42A7C3] sm:px-4 px-3 py-2 font-inter text-xs sm:h-[38px] h-9"
                  >
                    <CirclePlus width={18} /> Section
                  </Button>
                  <Button
                    type="button"
                    className="bg-[#42A7C3] sm:px-4 px-3 py-2 font-inter text-xs sm:h-[38px] h-9"
                    onClick={() => setIsOpenAssessmentModal(true)}
                  >
                    <CirclePlus width={18} /> Add Assessment
                  </Button>
                </>
              ) : (
                <Button
                  type="submit"
                  // onClick={handleSectionSave}
                  className="bg-[#58BA66] px-5 py-3 font-inter text-md"
                >
                  Save
                </Button>
              )}
            </div>
          )}
        </form>
      </div>
      <Modal
        open={isOpenAssessmentModal}
        onClose={() => setIsOpenAssessmentModal(false)}
        className="xl:max-w-[737px] lg:max-w-[650px] sm:max-w-[550px] max-w-[335px] sm:p-5 p-4 rounded-xl"
      >
        <AssessmentModal
          setIsOpenAssessmentModal={setIsOpenAssessmentModal}
          moduleId={moduleId}
        />
      </Modal>
    </div>
  );
};

export default CourseViewCardInner;
