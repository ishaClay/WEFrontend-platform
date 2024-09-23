/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import Loading from "@/components/comman/Error/Loading";
import Loader from "@/components/comman/Loader";
import SelectMenu from "@/components/comman/SelectMenu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { setPath } from "@/redux/reducer/PathReducer";
import { RootState } from "@/redux/store";
import { getCohort, getSession } from "@/services/apiServices/allcourse";
import { fetchCourseAllCourse } from "@/services/apiServices/courseManagement";
import {
  createLiveSession,
  getLiveSessionById,
  getZoomSetting,
  scheduleUpdateLiveSession,
} from "@/services/apiServices/liveSession";
import { pillarLimit } from "@/services/apiServices/pillar";
import { ErrorType } from "@/types/Errors";
import { UserRole } from "@/types/UserRole";
import { CohortDataResponse } from "@/types/cohort";
import { AllCoursesResult } from "@/types/courseManagement";
import { PermissionResponse } from "@/types/liveSession";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader2, MoveLeft } from "lucide-react";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

const durationInHours = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, "0");
  return {
    label: hour,
    value: hour,
  };
});

const durationInMinute = Array.from({ length: 60 }, (_, i) => {
  const min = i.toString().padStart(2, "0");
  return {
    label: min,
    value: min,
  };
});

const ScheduleLiveSessionPage = () => {
  const Role = location.pathname.split("/")[1];
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const pathName = window.location.pathname;
  const currentUser = pathName.split("/")[1];
  const navigate = useNavigate();
  const { UserId } = useAppSelector((state: RootState) => state.user);
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const [LiveSession, setLiveSession] = useState("");
  const [selectLiveSession, setSelectLiveSession] = useState<string>("");

  const convertTo12HourFormat = (time24: string) => {
    const [hours, minutes] = time24.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const hours12 = hours % 12 || 12;
    return `${String(hours12).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}${period}`;
  };

  const ScheduleLiveSessionSchema = z
    .object({
      selectCourse: z.string({
        required_error: "Please select course",
      }),
      selectCohort: z.string({
        required_error: "Please select course",
      }),
      selectLiveSession: z.string({
        required_error: "Please select live session",
      }),
      sessionSubtitle: z.string().nonempty("Please enter session subtitle"),
      sessionDescription: z
        .string()
        .nonempty("Please enter session description"),
      sessionDate: z.string().nonempty("Please enter session date"),
      sessionTime: z.string().min(1, "Time format is required"),
      selectDurationInHours: z.string({
        required_error: "Please select duration in hours",
      }),
      selectDurationInMinute: z.string({
        required_error: "Please select duration in minutes",
      }),
      platform: z.boolean(),
      zoomUrl: z.string().optional(),
    })
    .superRefine((data, ctx) => {
      if (!data.platform) {
        if (!data.zoomUrl) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Please enter zoom URL",
            path: ["zoomUrl"],
          });
        } else if (!/^https?:\/\/[^\s/$.?#].[^\s]*$/.test(data.zoomUrl)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
              "Please enter a valid zoom URL starting with http:// or https://",
            path: ["zoomUrl"],
          });
        }
      }
    });
  type ValidationSchema = z.infer<typeof ScheduleLiveSessionSchema>;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(ScheduleLiveSessionSchema),
    mode: "all",
    defaultValues: {
      platform: false,
    },
  });

  const { data: fetchCourseAllCourseData, isPending: fetchCoursePending } =
    useQuery({
      queryKey: [QUERY_KEYS.fetchAllCourse],
      queryFn: () => fetchCourseAllCourse("", +UserId, "PUBLISHED"),
    });

  const filteredAllCourseData = fetchCourseAllCourseData?.data?.filter(
    (course) =>
      course?.module?.some((module: any) =>
        module?.moduleSections?.some((section: any) => section?.isLive)
      )
  );

  const { data: selectTargetPillarLimit } = useQuery({
    queryKey: [QUERY_KEYS.selectTargetPillarLimit, userData],
    queryFn: () => pillarLimit(userData?.query?.detailsid as string),
    enabled: !!userData,
  });

  const { data: fetchZoomSetting, isLoading: fetchZoomSettingLoading } =
    useQuery<PermissionResponse>({
      queryKey: ["getZoomSetting"],
      queryFn: getZoomSetting,
    });

  const { data: fetchLiveSessionById, isPending: fetchLiveSessionByIdPending } =
    useQuery({
      queryKey: [QUERY_KEYS.fetchLiveSessionById],
      queryFn: () => getLiveSessionById(id?.toString() || ""),
      enabled: !!id,
    });

  const selectCourseOption = filteredAllCourseData?.length
    ? filteredAllCourseData?.map((i: AllCoursesResult) => {
        return {
          label: i?.title,
          value: i?.id?.toString(),
        };
      })
    : [];

  const { mutate: addLiveSession, isPending: isSaveSessionPending } =
    useMutation({
      mutationFn: createLiveSession,
      onSuccess: async (data) => {
        navigate(`/${currentUser}/CourseLiveSession?view=0`);
        reset();
        toast({
          title: data?.data?.message,
          variant: "success",
        });
      },
      onError: (error: ErrorType) => {
        console.error(error);
        toast({
          title: error?.data?.message,
          variant: "destructive",
        });
      },
    });

  const { mutate: updateLiveSession, isPending: isUpdateSessionPending } =
    useMutation({
      mutationFn: scheduleUpdateLiveSession,
      onSuccess: async (data) => {
        navigate(`/${currentUser}/CourseLiveSession?view=0`);
        reset();
        toast({
          title: data?.data?.message,
          variant: "success",
        });
      },
      onError: (error: ErrorType) => {
        console.error(error);
        toast({
          title: error?.data?.message,
          variant: "destructive",
        });
      },
    });

  const { data: getCohortData, isFetching: getCohortPending } =
    useQuery<CohortDataResponse>({
      queryKey: ["getCohort", { course: watch("selectCourse") }],
      queryFn: () => getCohort(+watch("selectCourse")),
      enabled: !!watch("selectCourse"),
    });

  const { data: getLiveSessionData, isFetching: getLiveSessionPending } =
    useQuery<CohortDataResponse>({
      queryKey: ["getSession", { cohort: watch("selectCohort") }],
      queryFn: () => getSession(+watch("selectCohort")),
      enabled: !!watch("selectCohort"),
    });
  console.log(
    "🚀 ~ ScheduleLiveSessionPage ~ watch('selectCohort'):",
    watch("selectCohort")
  );

  const cohortStartDate = useMemo(() => {
    if (watch("selectCohort")) {
      const findCohort = getCohortData?.data?.find(
        (item) => +item?.id === +watch("selectCohort")
      );
      // @ts-ignore
      const { month, date, year } = findCohort?.slotStartDate;
      const dateNew = new Date(`${year}-${month}-${date}`);
      return dateNew || new Date();
    }
  }, [watch("selectCohort")]);
  console.log("🚀 ~ cohortStartDate ~ cohortStartDate:", cohortStartDate);

  const cohortOption = getCohortData?.data?.map((item) => {
    const { month, date, year } = item?.slotStartDate;
    const { month: endMonth, date: endDay, year: endYear } = item?.slotEndDate;
    return {
      label:
        item?.name +
        " (" +
        `${date}/${month}/${year} - ${endDay}/${endMonth}/${endYear}` +
        ") ",
      value: item?.id?.toString(),
    };
  });

  const selectLiveSessionOption = getLiveSessionData?.data?.map((i: any) => {
    return {
      label: i?.title,
      value: i?.id?.toString(),
    };
  });

  useEffect(() => {
    const fetchLiveSessionData = fetchLiveSessionById?.data?.data;

    if (id) {
      if (fetchLiveSessionData) {
        const {
          subtitle,
          description,
          date,
          sessionDuration,
          course,
          startTime,
          platform,
          zoomApiBaseUrl,
          cohortGroup,
          moduleSection,
        } = fetchLiveSessionData;

        console.log("+++++++++++++", moduleSection?.id?.toString());

        setValue("sessionSubtitle", subtitle);
        setValue("sessionDescription", description);
        setValue("sessionDate", date?.split("T")[0]);
        setValue(
          "selectDurationInHours",
          Math.floor(+sessionDuration / 60)
            .toString()
            .padStart(2, "0")
        );
        setValue(
          "selectDurationInMinute",
          (+sessionDuration % 60).toString().padStart(2, "0")
        );
        setValue("selectCourse", (+course?.id)?.toString());
        setValue("selectCohort", (+cohortGroup?.id)?.toString());
        setValue("selectLiveSession", moduleSection?.id?.toString());
        setSelectLiveSession(moduleSection?.id?.toString());
        setLiveSession(moduleSection?.title);
        setValue("sessionTime", moment(startTime).format("HH:mm"));
        setValue("platform", !!platform);
        setValue("zoomUrl", zoomApiBaseUrl || "");
      }
    }
  }, [fetchLiveSessionById?.data?.data, id]);

  const onSubmit = async (data: z.infer<typeof ScheduleLiveSessionSchema>) => {
    if (watch("platform")) {
      setValue("zoomUrl", "");
    }
    const liveSecTitle = selectLiveSessionOption?.find(
      (item: any) => +item?.value === +data?.selectLiveSession
    );

    const transformedData = {
      course: data?.selectCourse,
      subtitle: data.sessionSubtitle,
      description: data?.sessionDescription,
      sessionDuration:
        +data.selectDurationInHours * 60 +
        +data.selectDurationInMinute?.toString(),
      date: data?.sessionDate,
      moduleSection: +liveSecTitle?.value || "",
      startTime: convertTo12HourFormat(data?.sessionTime),
      platform: data?.platform ? 1 : 0,
      zoomApiBaseUrl: watch("platform") ? "" : data?.zoomUrl,
      cohortGroupId: data?.selectCohort,
    };

    if (+userData?.query?.role === UserRole.Trainer) {
      // @ts-ignore
      transformedData.trainerOrganiztion = userData?.query?.detailsid;
    }

    if (+userData?.query?.role === UserRole.Trainee) {
      // @ts-ignore
      transformedData.trainer = userData?.query?.detailsid;
    }

    if (id !== undefined) {
      updateLiveSession({
        data: transformedData,
        id: id,
      });
    } else {
      addLiveSession({
        data: transformedData,
        id: data?.selectLiveSession,
      });
    }
  };

  useEffect(() => {
    if (getLiveSessionData?.data && selectLiveSession) {
      const session = getLiveSessionData?.data?.find(
        (item) => item.id?.toString() === selectLiveSession?.toString()
      );
      const htmlString = new DOMParser().parseFromString(
        session?.information || "",
        "text/html"
      );
      setValue("sessionSubtitle", session?.title || "");
      setValue("sessionDescription", htmlString?.body?.innerText || "");
    }
  }, [selectLiveSession, getLiveSessionData?.data, setValue]);

  if (
    (fetchZoomSettingLoading ||
      fetchCoursePending ||
      getLiveSessionPending ||
      fetchLiveSessionByIdPending) &&
    !!id
  ) {
    return <Loader />;
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white rounded-xl">
          <div className="flex justify-between items-center sm:px-6 p-4 sm:py-5 border-b border-[#D9D9D9]">
            <h5 className="text-base text-black font-semibold">
              Schedule Live Session
            </h5>
            <Button
              type="button"
              className="bg-transparent font-droid flex items-center gap-3 text-base text-black font-semibold p-0 h-auto"
              onClick={() => {
                dispatch(
                  setPath([
                    {
                      label: "Course Management",
                      link: null,
                    },
                    {
                      label: "Live Session",
                      link: `/${Role}/CourseLiveSession`,
                    },
                  ])
                );
              }}
            >
              <MoveLeft /> Back
            </Button>
          </div>
          <div className="p-5 flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <Label className="text-base text-black font-medium font-font-droid">
                Select Course
              </Label>
              <SelectMenu
                option={selectCourseOption}
                setValue={(e: string) => {
                  setValue("selectCourse", e);
                  clearErrors("selectCourse");
                }}
                value={watch("selectCourse")}
                itemClassName="text-base"
                className="data-[placeholder]:text-[#A3A3A3] sm:text-base text-[15px] font-font-droid sm:px-5 px-4 md:h-[52px] sm:h-12 h-10"
                placeholder="Select course name"
                disabled={!!id}
                isLoading={fetchCoursePending}
              />
              {errors?.selectCourse?.message && (
                <span className="text-red-500 text-sm">
                  {errors?.selectCourse?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-base text-black font-medium font-font-droid">
                Select Cohort
              </Label>
              <SelectMenu
                option={cohortOption || []}
                setValue={(e: string) => {
                  setValue("selectCohort", e);
                  clearErrors("selectCohort");
                }}
                value={watch("selectCohort")}
                itemClassName="text-base"
                className="data-[placeholder]:text-[#A3A3A3] sm:text-base text-[15px] font-font-droid sm:px-5 px-4 md:h-[52px] sm:h-12 h-10"
                placeholder="Select Cohort"
                disabled={!!id}
                isLoading={getCohortPending}
              />
              {errors?.selectCohort?.message && (
                <span className="text-red-500 text-sm">
                  {errors?.selectCohort?.message}
                </span>
              )}
            </div>
            <div className="flex items-center gap-5">
              <div className="flex flex-col gap-1 w-[calc(100%_-_200px)]">
                <Label className="text-base text-black font-medium font-font-droid">
                  Select Live session
                </Label>
                {id ? (
                  <Button
                    disabled
                    className="flex w-full items-center justify-between rounded-md border border-input py-2 ring-offset-background focus: disabled:cursor-not-allowed disabled:opacity-60 [&>span]:line-clamp-1 bg-white font-normal data-[placeholder]:text-[#A3A3A3] sm:text-base text-[15px] font-droid sm:px-5 px-4 md:h-[52px] sm:h-12 h-10 text-black"
                  >
                    {LiveSession}
                  </Button>
                ) : (
                  <SelectMenu
                    option={selectLiveSessionOption || []}
                    {...register("selectLiveSession")}
                    setValue={(e: string) => {
                      setSelectLiveSession(e);
                      setValue("selectLiveSession", e);
                      clearErrors("selectLiveSession");
                    }}
                    value={selectLiveSession}
                    itemClassName="text-base"
                    className="data-[placeholder]:text-[#A3A3A3] sm:text-base text-[15px] font-font-droid sm:px-5 px-4 md:h-[52px] sm:h-12 h-10"
                    placeholder="Select live session name"
                    disabled={!!id}
                    isLoading={getLiveSessionPending}
                  />
                )}
                {errors.selectLiveSession && (
                  <span className="text-red-500 text-sm">
                    {errors.selectLiveSession.message}
                  </span>
                )}
              </div>
              {+fetchZoomSetting?.data?.zoomPortal! === 1 &&
                +selectTargetPillarLimit?.data?.videoDonferencingAccess ===
                  1 && (
                  <div className="flex flex-row gap-3 items-center">
                    <Label className="text-base text-black font-medium font-font-droid">
                      Use Platform
                    </Label>
                    <Switch
                      checked={watch("platform")}
                      onCheckedChange={() => {
                        setValue(`platform`, !watch("platform"));
                      }}
                      className="me-3"
                      disabled={!!id}
                    />
                  </div>
                )}
            </div>
            {!watch("platform") && (
              <div className="flex flex-col gap-1">
                <Label className="text-base text-black font-medium font-font-droid">
                  Meeting Url
                </Label>
                <Input
                  {...register("zoomUrl")}
                  placeholder="Enter Meeting Url"
                  className="placeholder:text-[#A3A3A3] text-base font-font-droid sm:px-5 px-4 md:h-[52px] sm:h-12 h-10"
                  value={watch("zoomUrl")}
                />
                {errors?.zoomUrl && (
                  <span className="text-red-500 text-sm">
                    {errors?.zoomUrl?.message}
                  </span>
                )}
              </div>
            )}
            <div className="flex flex-col gap-1">
              <Label className="text-base text-black font-medium font-font-droid">
                Session Subtitle
              </Label>
              <Input
                placeholder="Enter session title"
                className="placeholder:text-[#A3A3A3] text-base font-font-droid sm:px-5 px-4 md:h-[52px] sm:h-12 h-10"
                {...register("sessionSubtitle")}
              />
              {errors.sessionSubtitle && (
                <span className="text-red-500 text-sm">
                  {errors.sessionSubtitle.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-base text-black font-medium font-font-droid">
                Session Description
              </Label>
              <Textarea
                placeholder="Enter Description"
                rows={4}
                className="placeholder:text-[#A3A3A3] focus:border-[#4b4b4b] shadow-none outline-none sm:text-base text-[15px] font-font-droid sm:px-5 px-4"
                {...register("sessionDescription")}
              />
              {errors.sessionDescription && (
                <span className="text-red-500 text-sm">
                  {errors.sessionDescription.message}
                </span>
              )}
            </div>
            <div className="grid grid-cols-12 md:gap-7 sm:gap-4 gap-3">
              <div className="xl:col-span-3 col-span-6 flex flex-col gap-1">
                <Label className="text-base text-black font-medium font-font-droid">
                  Session Date
                </Label>
                <Input
                  placeholder="Enter Date"
                  className="block placeholder:text-[#A3A3A3] text-base font-font-droid sm:px-5 px-4 md:h-[52px] sm:h-12 h-10"
                  type="date"
                  min={
                    // @ts-ignore
                    cohortStartDate
                      ? new Date(cohortStartDate)?.toISOString()?.split("T")[0]
                      : new Date().toISOString().split("T")[0]
                  }
                  {...register("sessionDate")}
                />
                {errors.sessionDate && (
                  <span className="text-red-500 text-sm">
                    {errors.sessionDate.message}
                  </span>
                )}
              </div>
              <div className="xl:col-span-3 col-span-6 flex flex-col gap-1">
                <Label className="text-base text-black font-medium font-font-droid">
                  Session Time
                </Label>
                <Input
                  className="block placeholder:text-[#A3A3A3] text-base font-font-droid sm:px-5 px-4 md:h-[52px] sm:h-12 h-10"
                  {...register("sessionTime")}
                  aria-label="Time"
                  type="time"
                  placeholder="hh:mm"
                />
                {errors.sessionTime && (
                  <span className="text-red-500 text-sm">
                    {errors.sessionTime.message}
                  </span>
                )}
              </div>
              <div className="xl:col-span-2 md:col-span-4 col-span-6 flex flex-col gap-1">
                <Label className="text-base text-black font-medium font-font-droid">
                  Duration in Hours
                </Label>
                <SelectMenu
                  option={durationInHours}
                  {...register("selectDurationInHours")}
                  setValue={(e: string) => {
                    setValue("selectDurationInHours", e);
                    clearErrors("selectDurationInHours");
                  }}
                  value={watch("selectDurationInHours")}
                  itemClassName="text-base"
                  className="data-[placeholder]:text-[#A3A3A3] sm:text-base text-[15px] font-font-droid sm:px-5 px-4 md:h-[52px] sm:h-12 h-10"
                  placeholder="01"
                />
                {errors.selectDurationInHours && (
                  <span className="text-red-500 text-sm">
                    {errors.selectDurationInHours.message}
                  </span>
                )}
              </div>
              <div className="xl:col-span-2 md:col-span-4 col-span-6 flex flex-col gap-1">
                <Label className="text-base text-black font-medium font-font-droid">
                  Duration in Minute
                </Label>
                <SelectMenu
                  option={durationInMinute}
                  {...register("selectDurationInMinute")}
                  setValue={(e: string) => {
                    setValue("selectDurationInMinute", e);
                    clearErrors("selectDurationInMinute");
                  }}
                  value={watch("selectDurationInMinute")}
                  itemClassName="text-base"
                  className="data-[placeholder]:text-[#A3A3A3] sm:text-base text-[15px] font-font-droid sm:px-5 px-4 md:h-[52px] sm:h-12 h-10"
                  placeholder="30"
                />
                {errors.selectDurationInMinute && (
                  <span className="text-red-500 text-sm">
                    {errors.selectDurationInMinute.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-right">
                <Button
                  className="bg-[#58BA66] uppercase md:text-base text-sm font-droid md:h-12 h-10"
                  type="submit"
                  disabled={isSaveSessionPending || isUpdateSessionPending}
                >
                  {(isSaveSessionPending || isUpdateSessionPending) && (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  )}
                  Save Session
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <Loading isLoading={fetchZoomSettingLoading || fetchCoursePending} />
    </>
  );
};

export default ScheduleLiveSessionPage;
