import Modal from "@/components/comman/Modal";
import SelectMenu from "@/components/comman/SelectMenu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { QUERY_KEYS } from "@/lib/constants";
import { fetchCourseAllCourse } from "@/services/apiServices/courseManagement";
import {
  getLiveSession,
  updateLiveSession,
} from "@/services/apiServices/liveSession";
import { getTraineeCompany } from "@/services/apiServices/trainer";
import { ErrorType } from "@/types/Errors";
import { TraineeCompanyDetails } from "@/types/Trainer";
import { AllCoursesResult } from "@/types/courseManagement";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CirclePlus, MoveLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";
import AddTraineeModal from "./AddTraineeModal";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

const durationInHours = Array.from({ length: 12 }, (_, i) => ({
  label: (i + 1).toString(),
  value: (i + 1).toString(),
}));

const durationInMinute = Array.from({ length: 61 }, (_, i) => ({
  label: i.toString(),
  value: i.toString(),
}));

// interface TraineeListProps {
//   name: string;
//   id: number;
// }

const ScheduleLiveSessionPage = () => {
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);
  const [courseVersion, setCourseVersion] = useState("");

  const ScheduleLiveSessionSchema = z.object({
    selectCourse: z.string().nonempty("Please select a course"),
    selectLiveSession: z.string(),
    sessionSubtitle: z.string().nonempty("Please enter session title"),
    sessionDescription: z.string().nonempty("Please enter session description"),
    sessionDate: z.string().nonempty("Please enter session date"),
    sessionTime: z.string().nonempty("Please enter session time"),
    selectTimePeriods: z.string().nonempty("Please select AM/PM"),
    selectDurationInHours: z
      .string()
      .nonempty("Please select duration in hours"),
    selectDurationInMinute: z
      .string()
      .nonempty("Please select duration in minutes"),
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
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(ScheduleLiveSessionSchema),
  });

  console.log("errors", errors);

  const { data: fetchCourseAllCourseData } = useQuery({
    queryKey: [QUERY_KEYS.fetchAllCourse],
    queryFn: () => fetchCourseAllCourse(""),
  });

  const { data: fetchTraineeCompany } = useQuery({
    queryKey: [QUERY_KEYS.fetchTraineeCompany],
    queryFn: () => getTraineeCompany(),
  });

  const selectCourseOption = fetchCourseAllCourseData?.data?.length
    ? fetchCourseAllCourseData?.data?.map((i: AllCoursesResult) => {
        return {
          label: i?.title,
          value: i?.id?.toString(),
        };
      })
    : [];

  const selectCompanyOptions = fetchTraineeCompany?.data?.length
    ? fetchTraineeCompany?.data?.map((i: TraineeCompanyDetails) => ({
        label: i?.name,
        value: i?.id?.toString(),
      }))
    : [];

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.fetchTrainee],
    });
    // setValue("traineeList", []);
  }, [watch("selectCompany")]);

  const { mutate: addLiveSession } = useMutation({
    mutationFn: updateLiveSession,
    onSuccess: async (data) => {
      window.open(data?.data?.authorizationUrl, "_blank");
    },
    onError: (error: ErrorType) => {
      console.error(error);
    },
  });

  const { data: fetchLiveSession, refetch: fetchData } = useQuery({
    queryKey: [QUERY_KEYS.fetchLiveSession],
    queryFn: () => getLiveSession(courseVersion),
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

  console.log(
    "fetchLiveSession",
    fetchLiveSession?.data?.data,
    selectLiveSessionOption
  );

  const onSubmit = async (data: any) => {
    console.log("data++", data);
    const transformedData = {
      course: data.selectCourse,
      subtitle: data.sessionSubtitle,
      description: data.sessionDescription,
      date: data.sessionDate,
      startTime: data.sessionTime,
      startAmPm: data.selectTimePeriods,
      sectionTime: {
        hour: data.selectDurationInHours,
        minute: data.selectDurationInMinute,
      },
      companyId: data.selectCompany,
      // trainerId: formData.traineeList.map((trainee) => trainee.id),
      liveSecTitle: data.selectLiveSession,
    };
    await addLiveSession({
      data: transformedData,
      id: String(data.selectLiveSession),
    });
  };

  return (
    <>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="lg:max-w-3xl sm:max-w-xl max-w-[335px] xl:p-[30px] p-5 rounded-xl"
      >
        <AddTraineeModal
          // formData={formData}
          // setFormData={setFormData}
          selectCompanyOptions={selectCompanyOptions}
          setIsOpen={setIsOpen}
          watch={watch}
        />
      </Modal>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white rounded-xl">
          <div className="flex justify-between items-center sm:px-6 p-4 sm:py-5 border-b border-[#D9D9D9]">
            <h5 className="text-base text-black font-semibold">
              Schedule Live Session
            </h5>
            <Button className="bg-transparent font-nunito flex items-center gap-3 text-base text-black font-semibold p-0 h-auto">
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
                setValue={(e: string) => setValue("selectCourse", e)}
                value={watch("selectCourse")}
                itemClassName="text-[#A3A3A3] text-base"
                className="text-[#A3A3A3] sm:text-base text-[15px] font-abhaya sm:px-5 px-4 md:h-[52px] sm:h-12 h-10"
                placeholder="Select course name"
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
                setValue={(e: string) => setValue("selectLiveSession", e)}
                value={watch("selectLiveSession")}
                itemClassName="text-[#A3A3A3] text-base"
                className="text-[#A3A3A3] sm:text-base text-[15px] font-abhaya sm:px-5 px-4 md:h-[52px] sm:h-12 h-10"
                placeholder="Select live session name"
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
                className="text-[#A3A3A3] placeholder:text-[#A3A3A3] text-base font-abhaya sm:px-5 px-4 md:h-[52px] sm:h-12 h-10"
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
                className="text-[#A3A3A3] placeholder:text-[#A3A3A3] sm:text-base text-[15px] font-abhaya sm:px-5 px-4"
                {...register("sessionDescription")}
              />
              {errors.sessionSubtitle && (
                <span className="text-red-500 text-sm">
                  {errors.sessionSubtitle.message}
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
                  className="text-[#A3A3A3] d-block placeholder:text-[#A3A3A3] text-base font-abhaya sm:px-5 px-4 md:h-[52px] sm:h-12 h-10"
                  type="date"
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
                  placeholder="Enter Time"
                  className="text-[#A3A3A3] placeholder:text-[#A3A3A3] sm:text-base text-[15px] font-abhaya sm:px-5 px-4 md:h-[52px] sm:h-12 h-10"
                  {...register("sessionTime")}
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
                  setValue={(e: string) => setValue("selectTimePeriods", e)}
                  value={watch("selectTimePeriods")}
                  itemClassName="text-[#A3A3A3] text-base"
                  className="text-[#A3A3A3] sm:text-base text-[15px] font-abhaya sm:px-5 px-4 md:h-[52px] sm:h-12 h-10"
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
                  setValue={(e: string) => setValue("selectDurationInHours", e)}
                  value={watch("selectDurationInHours")}
                  itemClassName="text-[#A3A3A3] text-base"
                  className="text-[#A3A3A3] sm:text-base text-[15px] font-abhaya sm:px-5 px-4 md:h-[52px] sm:h-12 h-10"
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
                  setValue={(e: string) =>
                    setValue("selectDurationInMinute", e)
                  }
                  value={watch("selectDurationInMinute")}
                  itemClassName="text-[#A3A3A3] text-base"
                  className="text-[#A3A3A3] sm:text-base text-[15px] font-abhaya sm:px-5 px-4 md:h-[52px] sm:h-12 h-10"
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
                    <DropdownMenuTrigger asChild>
                      <Button className="block text-left" variant="outline">
                        Select Company
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full">
                      <div className="overflow-auto h-[300px]">
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
            <div className="flex flex-col gap-3">
              <Button
                className="bg-transparent text-[#4285F4] text-base font-abhaya flex gap-2 items-center justify-start p-0 h-auto"
                onClick={() => setIsOpen(true)}
                disabled={!watch("selectCompany")?.length}
              >
                <CirclePlus width={18} />
                Add Trainee
              </Button>
              <ul className="flex items-center gap-2 overflow-x-auto overflow-y-hidden md:pb-0 pb-2">
                {/* {formData.traineeList?.map((i: TraineeListProps) => (
                  <li className="cursor-pointer justify-center flex text-base gap-2 rounded-full items-center p-2 bg-[#F5F7FF] text-black overflow-hidden min-w-[140px]">
                    {i?.name}
                    <X
                      width={16}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          traineeList: prev.traineeList.filter(
                            (item) => item.name !== i.name
                          ),
                        }))
                      }
                    />
                  </li>
                ))} */}
              </ul>
              <div className="text-right">
                <Button className="bg-[#58BA66] uppercase md:text-base text-sm font-nunito md:h-12 h-10">
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
