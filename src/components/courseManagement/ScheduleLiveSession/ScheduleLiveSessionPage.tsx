import Loader from "@/components/comman/Loader";
import Modal from "@/components/comman/Modal";
import SelectMenu from "@/components/comman/SelectMenu";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAppSelector } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { RootState } from "@/redux/store";
import { fetchCourseAllCourse } from "@/services/apiServices/courseManagement";
import {
  getLiveSession,
  getLiveSessionById,
  scheduleLiveSession,
} from "@/services/apiServices/liveSession";
import { getTraineeCompany } from "@/services/apiServices/trainer";
import { ErrorType } from "@/types/Errors";
import { TraineeCompanyDetails } from "@/types/Trainer";
import { AllCoursesResult } from "@/types/courseManagement";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CirclePlus, Loader2, MoveLeft, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import AddTraineeModal from "./AddTraineeModal";

const timePeriodsOptions = [
  {
    label: "AM",
    value: "AM",
  },
  {
    label: "PM",
    value: "PM",
  },
];

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
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const pathName = window.location.pathname;
  const currentUser = pathName.split("/")[1];

  const UserId = useAppSelector((state: RootState) => state.user.UserId);

  const [isOpen, setIsOpen] = useState(false);
  const [courseVersion, setCourseVersion] = useState("");

  const ScheduleLiveSessionSchema = z.object({
    selectCourse: z.string({
      required_error: "Please select course",
    }),
    selectLiveSession: z.string({
      required_error: "Please select Live session",
    }),
    sessionSubtitle: z.string().nonempty("Please enter session title"),
    sessionDescription: z.string().nonempty("Please enter session description"),
    sessionDate: z.string().nonempty("Please enter session date"),
    sessionTime: z
      .string()
      .min(1, "Please enter time format")
      .regex(/^(0[0-9]|1[0-2]):([0-5][0-9])$/, {
        message: "Please enter valid time format",
      }),
    selectTimePeriods: z.string({
      required_error: "Please select AM/PM",
    }),
    selectDurationInHours: z.string({
      required_error: "Please select duration in hours",
    }),
    selectDurationInMinute: z.string({
      required_error: "Please select duration in hours",
    }),
    selectCompany: z
      .array(z.string())
      .nonempty("Please select at least one company"),
  });
  type ValidationSchema = z.infer<typeof ScheduleLiveSessionSchema>;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    clearErrors,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(ScheduleLiveSessionSchema),
    mode: "all",
    defaultValues: {
      selectCompany: [],
    },
  });

  const [traineeList, setTraineeList] = useState<
    { name: string; id: string }[]
  >([]);
  const [traineeErr, setTraineeErr] = useState(false);

  const { data: fetchCourseAllCourseData, isPending: fetchCoursePending } =
    useQuery({
      queryKey: [QUERY_KEYS.fetchAllCourse],
      queryFn: () => fetchCourseAllCourse("", +UserId),
    });

  const filteredAllCourseData = fetchCourseAllCourseData?.data?.filter(
    (course) =>
      course?.module?.some((module: any) =>
        module?.moduleSections?.some((section: any) => section?.liveSecTitle)
      )
  );

  const { data: fetchTraineeCompany } = useQuery({
    queryKey: [QUERY_KEYS.fetchTraineeCompany],
    queryFn: () => getTraineeCompany(),
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

  const filteredTraineeCompany = fetchTraineeCompany?.data?.filter(
    (i: any) => i?.trainer?.length > 0
  );

  const selectCompanyOptions = filteredTraineeCompany?.length
    ? filteredTraineeCompany?.map((i: TraineeCompanyDetails) => ({
        label: i?.name,
        value: i?.id?.toString(),
      }))
    : [];

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.fetchTrainee],
    });
  }, [watch("selectCompany")]);

  const { mutate: addLiveSession, isPending: isSaveSessionPending } =
    useMutation({
      mutationFn: scheduleLiveSession,
      onSuccess: async () => {
        navigate(`/${currentUser}/CourseLiveSession?view=0`);
      },
      onError: (error: ErrorType) => {
        console.error(error);
      },
    });

  const {
    data: fetchLiveSession,
    refetch: fetchData,
    isPending: fetchLiveSessionPending,
  } = useQuery({
    queryKey: [QUERY_KEYS.fetchLiveSession],
    queryFn: () => (courseVersion ? getLiveSession(courseVersion) : null),
    enabled: !!courseVersion,
  });

  useEffect(() => {
    setCourseVersion(
      fetchCourseAllCourseData?.data
        ?.find((item) => +item?.id === +watch("selectCourse"))
        ?.currentVersion?.id?.toString() || ""
    );
  }, [watch("selectCourse")]);

  useEffect(() => {
    fetchData();
  }, [courseVersion]);

  const selectLiveSessionOption = fetchLiveSession?.data?.data?.course?.module
    ?.flatMap((i: any) => i?.moduleSections)
    ?.filter((j: any) => +j?.isLive === 1)
    ?.map((i: any) => ({
      label: i?.liveSecTitle,
      value: i?.id?.toString(),
    }));

  const onSubmit = async (data: z.infer<typeof ScheduleLiveSessionSchema>) => {
    if (traineeList.length === 0) {
      setTraineeErr(true);
      return;
    }
    const transformedData = {
      course: data.selectCourse,
      subtitle: data.sessionSubtitle,
      description: data.sessionDescription,
      date: data.sessionDate,
      startTime: data?.sessionTime,
      startAmPm: data.selectTimePeriods,
      sessionDuration:
        +data.selectDurationInHours * 60 + +data.selectDurationInMinute,
      companyId: data.selectCompany,
      trainerId: traineeList.map((trainee) => trainee.id),
    };

    if (traineeList) {
      await addLiveSession({
        data: transformedData,
        id: String(data.selectLiveSession),
      });
    }
  };

  useEffect(() => {
    const fetchLiveSessionData = fetchLiveSessionById?.data?.data;

    if (fetchLiveSessionData) {
      const {
        subtitle,
        description,
        date,
        startAmPm,
        sessionDuration,
        trainer,
        course,
        company,
        startTime,
        id,
      } = fetchLiveSessionData;

      setValue("sessionSubtitle", subtitle);
      setValue("sessionDescription", description);
      setValue("sessionDate", date?.split("T")[0]);
      setValue("selectLiveSession", id?.toString());
      setValue("selectTimePeriods", startAmPm);
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
      setValue("sessionTime", startTime);
      setValue(
        "selectCompany",
        company?.map((item: any) => item?.id?.toString())
      );
      setTraineeList(
        trainer?.map((item: any) => ({ id: item?.id, name: item?.name }))
      );
    }
  }, [
    fetchLiveSessionById?.data?.data,
    fetchCourseAllCourseData?.data?.length,
    fetchLiveSession?.data?.data,
  ]);

  const selectedValues: string[] = watch("selectCompany") || [];
  const companyLabels: string = selectCompanyOptions
    ?.filter(({ value }: { value: string; label: string }) =>
      selectedValues.includes(value)
    )
    .map(({ label }: { value: string; label: string }) => label)
    .join(", ");

  if (
    (fetchCoursePending ||
      fetchLiveSessionPending ||
      fetchLiveSessionByIdPending) &&
    !!id
  ) {
    return <Loader />;
  }

  return (
    <>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="lg:max-w-3xl sm:max-w-xl max-w-[335px] xl:p-[30px] p-5 rounded-xl"
      >
        <AddTraineeModal
          traineeList={traineeList}
          setTraineeList={setTraineeList}
          selectCompanyOptions={selectCompanyOptions}
          setIsOpen={setIsOpen}
          watch={watch}
          control={control}
        />
      </Modal>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white rounded-xl">
          <div className="flex justify-between items-center sm:px-6 p-4 sm:py-5 border-b border-[#D9D9D9]">
            <h5 className="text-base text-black font-semibold">
              Schedule Live Session
            </h5>
            <Button
              className="bg-transparent font-nunito flex items-center gap-3 text-base text-black font-semibold p-0 h-auto"
              onClick={() => navigate(-1)}
            >
              <MoveLeft /> Back
            </Button>
          </div>
          <div className="p-5 flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <Label className="text-base text-black font-semibold font-abhaya">
                Select Course
              </Label>
              <SelectMenu
                option={selectCourseOption}
                {...register("selectCourse")}
                setValue={(e: string) => {
                  setValue("selectCourse", e);
                  clearErrors("selectCourse");
                }}
                value={watch("selectCourse")}
                itemClassName="text-base"
                className="data-[placeholder]:text-[#A3A3A3] sm:text-base text-[15px] font-abhaya sm:px-5 px-4 md:h-[52px] sm:h-12 h-10"
                placeholder="Select course name"
                disabled={!!id}
              />
              {errors?.selectCourse?.message && (
                <span className="text-red-500 text-sm">
                  {errors?.selectCourse?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-base text-black font-semibold font-abhaya">
                Select Live session
              </Label>
              <SelectMenu
                option={selectLiveSessionOption}
                {...register("selectLiveSession")}
                setValue={(e: string) => {
                  setValue("selectLiveSession", e);
                  clearErrors("selectLiveSession");
                }}
                value={watch("selectLiveSession")}
                itemClassName="text-base"
                className="data-[placeholder]:text-[#A3A3A3] sm:text-base text-[15px] font-abhaya sm:px-5 px-4 md:h-[52px] sm:h-12 h-10"
                placeholder="Select live session name"
                disabled={!!id}
              />
              {errors.selectLiveSession && (
                <span className="text-red-500 text-sm">
                  {errors.selectLiveSession.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-base text-black font-semibold font-abhaya">
                Session Subtitle
              </Label>
              <Input
                placeholder="Enter session title"
                className="placeholder:text-[#A3A3A3] text-base font-abhaya sm:px-5 px-4 md:h-[52px] sm:h-12 h-10"
                {...register("sessionSubtitle")}
              />
              {errors.sessionSubtitle && (
                <span className="text-red-500 text-sm">
                  {errors.sessionSubtitle.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-base text-black font-semibold font-abhaya">
                Session Description
              </Label>
              <Textarea
                placeholder="Enter Description"
                rows={4}
                className="placeholder:text-[#A3A3A3] sm:text-base text-[15px] font-abhaya sm:px-5 px-4"
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
                <Label className="text-base text-black font-semibold font-abhaya">
                  Session Date
                </Label>
                <Input
                  placeholder="Enter Date"
                  className="block placeholder:text-[#A3A3A3] text-base font-abhaya sm:px-5 px-4 md:h-[52px] sm:h-12 h-10"
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  {...register("sessionDate")}
                />
                {errors.sessionDate && (
                  <span className="text-red-500 text-sm">
                    {errors.sessionDate.message}
                  </span>
                )}
              </div>
              <div className="xl:col-span-3 col-span-6 flex flex-col gap-1">
                <Label className="text-base text-black font-semibold font-abhaya">
                  Session Time
                </Label>
                <Input
                  className="placeholder:text-[#A3A3A3] sm:text-base text-[15px] font-abhaya sm:px-5 px-4 md:h-[52px] sm:h-12 h-10"
                  {...register("sessionTime")}
                  type="text"
                  placeholder="hh:mm"
                />
                {errors.sessionTime && (
                  <span className="text-red-500 text-sm">
                    {errors.sessionTime.message}
                  </span>
                )}
              </div>
              <div className="xl:col-span-2 md:col-span-4 col-span-6 flex flex-col gap-1">
                <Label className="text-base text-black font-semibold font-abhaya">
                  AM/PM
                </Label>
                <SelectMenu
                  option={timePeriodsOptions}
                  {...register("selectTimePeriods")}
                  setValue={(e: string) => {
                    setValue("selectTimePeriods", e);
                    clearErrors("selectTimePeriods");
                  }}
                  value={watch("selectTimePeriods")}
                  itemClassName="text-base"
                  className="data-[placeholder]:text-[#A3A3A3] sm:text-base text-[15px] font-abhaya sm:px-5 px-4 md:h-[52px] sm:h-12 h-10"
                  placeholder="AM"
                />
                {errors.selectTimePeriods && (
                  <span className="text-red-500 text-sm">
                    {errors.selectTimePeriods.message}
                  </span>
                )}
              </div>
              <div className="xl:col-span-2 md:col-span-4 col-span-6 flex flex-col gap-1">
                <Label className="text-base text-black font-semibold font-abhaya">
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
                  className="data-[placeholder]:text-[#A3A3A3] sm:text-base text-[15px] font-abhaya sm:px-5 px-4 md:h-[52px] sm:h-12 h-10"
                  placeholder="01"
                />
                {errors.selectDurationInHours && (
                  <span className="text-red-500 text-sm">
                    {errors.selectDurationInHours.message}
                  </span>
                )}
              </div>
              <div className="xl:col-span-2 md:col-span-4 col-span-6 flex flex-col gap-1">
                <Label className="text-base text-black font-semibold font-abhaya">
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
                  className="data-[placeholder]:text-[#A3A3A3] sm:text-base text-[15px] font-abhaya sm:px-5 px-4 md:h-[52px] sm:h-12 h-10"
                  placeholder="30"
                />
                {errors.selectDurationInMinute && (
                  <span className="text-red-500 text-sm">
                    {errors.selectDurationInMinute.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-base text-black font-semibold font-abhaya">
                Select Company
              </Label>
              <Controller
                control={control}
                name="selectCompany"
                defaultValue={[""]}
                render={({ field: { onChange, value } }) => (
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      asChild
                      className="outline-none w-full"
                    >
                      <Button className="block text-left" variant="outline">
                        {companyLabels}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full">
                      <div className="overflow-auto max-h-[300px]">
                        {selectCompanyOptions?.map(
                          (i: { value: string; label: string }) => (
                            <DropdownMenuCheckboxItem
                              key={i.value}
                              checked={value.includes(i.value)}
                              onCheckedChange={(checked) => {
                                onChange(
                                  checked
                                    ? [...value, i.value].filter((item) => item)
                                    : value.filter((item) => item !== i.value)
                                );
                              }}
                            >
                              {i.label}
                            </DropdownMenuCheckboxItem>
                          )
                        )}
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              />
              {errors.selectCompany && (
                <span className="text-red-500 text-sm">
                  {errors.selectCompany.message}
                </span>
              )}
            </div>
            {traineeErr && traineeList?.length === 0 && (
              <span className="text-red-500 text-sm">
                Please select trainee list.
              </span>
            )}
            <div className="flex flex-col gap-3">
              <Button
                className="bg-transparent text-[#4285F4] text-base font-abhaya gap-2 items-center justify-start p-0 h-auto"
                onClick={() => setIsOpen(true)}
                disabled={!watch("selectCompany")?.length}
                type="button"
              >
                <CirclePlus width={18} />
                Add Trainee
              </Button>
              <ul className="flex items-center gap-2 overflow-x-auto overflow-y-hidden md:pb-0 pb-2">
                {traineeList?.map((i: { name: string; id: string }) => (
                  <li
                    className="cursor-pointer justify-center flex text-base gap-2 rounded-full items-center p-2 bg-[#F5F7FF] text-black overflow-hidden min-w-[140px]"
                    key={i.id}
                  >
                    {i?.name}
                    <X
                      width={16}
                      onClick={() =>
                        setTraineeList((prev) =>
                          prev.filter((item) => item.id !== i.id)
                        )
                      }
                    />
                  </li>
                ))}
              </ul>
              <div className="text-right">
                <Button
                  className="bg-[#58BA66] uppercase md:text-base text-sm font-nunito md:h-12 h-10"
                  type="submit"
                >
                  {isSaveSessionPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Save Session
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ScheduleLiveSessionPage;
