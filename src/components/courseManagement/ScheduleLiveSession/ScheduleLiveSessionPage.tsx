import Modal from "@/components/comman/Modal";
import SelectMenu from "@/components/comman/SelectMenu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { QUERY_KEYS } from "@/lib/constants";
import { fetchCourseAllCourse } from "@/services/apiServices/courseManagement";
import { getTraineeCompany } from "@/services/apiServices/trainer";
import { TraineeCompanyDetails } from "@/types/Trainer";
import { AllCoursesResult } from "@/types/courseManagement";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CirclePlus, MoveLeft, X } from "lucide-react";
import { useEffect, useState } from "react";
import AddTraineeModal from "./AddTraineeModal";
import { z } from "zod";

const selectLiveSessionOption = [
  {
    label: "Select Live Session 1",
    value: "select live session 1",
  },
  {
    label: "Select Live Session 2",
    value: "select live session 2",
  },
  {
    label: "Select Live Session 3",
    value: "select live session 3",
  },
];

const timePeriodsOptions = [
  {
    label: "AM",
    value: "am",
  },
  {
    label: "PM",
    value: "pm",
  },
];

const durationInHours = [
  {
    label: "01",
    value: "one",
  },
  {
    label: "01",
    value: "two",
  },
  {
    label: "01",
    value: "three",
  },
];

const durationInMinute = [
  {
    label: "30",
    value: "one",
  },
  {
    label: "40",
    value: "two",
  },
  {
    label: "50",
    value: "three",
  },
];

interface TraineeListProps {
  name: string;
  id: number;
}

interface FormData {
  selectCourse: string;
  selectLiveSession: string;
  sessionSubtitle: string;
  sessionDescription: string;
  sessionDate: string;
  sessionTime: string;
  selectTimePeriods: string;
  selectDurationInHours: string;
  selectDurationInMinute: string;
  selectCompany: string;
  traineeList: TraineeListProps[];
}

const ScheduleLiveSessionPage = () => {
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);

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
    selectCompany: z.string().nonempty("Please select a company"),
  });

  const [formData, setFormData] = useState<FormData>({
    selectCourse: "",
    selectLiveSession: "",
    sessionSubtitle: "",
    sessionDescription: "",
    sessionDate: "",
    sessionTime: "",
    selectTimePeriods: "",
    selectDurationInHours: "",
    selectDurationInMinute: "",
    selectCompany: "",
    traineeList: [],
  });

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
    setFormData((prev) => ({
      ...prev,
      traineeList: [],
    }));
  }, [formData.selectCompany]);

  return (
    <>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="lg:max-w-3xl sm:max-w-xl max-w-[335px] xl:p-[30px] p-5 rounded-xl"
      >
        <AddTraineeModal
          formData={formData}
          setFormData={setFormData}
          selectCompanyOptions={selectCompanyOptions}
          setIsOpen={setIsOpen}
        />
      </Modal>

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
              setValue={(data: string) =>
                setFormData((prev) => ({
                  ...prev,
                  selectCourse: data,
                }))
              }
              value={formData.selectCourse}
              itemClassName="text-[#A3A3A3] text-base"
              className="text-[#A3A3A3] sm:text-base text-[15px] font-abhaya sm:px-5 px-4 md:h-[52px] sm:h-12 h-10"
              placeholder="Select course name"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-base text-black font-semibold font-abhaya">
              Select Live session
            </Label>
            <SelectMenu
              option={selectLiveSessionOption}
              setValue={(data: string) =>
                setFormData((prev) => ({
                  ...prev,
                  selectLiveSession: data,
                }))
              }
              value={formData.selectLiveSession}
              itemClassName="text-[#A3A3A3] text-base"
              className="text-[#A3A3A3] sm:text-base text-[15px] font-abhaya sm:px-5 px-4 md:h-[52px] sm:h-12 h-10"
              placeholder="Select live session name"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-base text-black font-semibold font-abhaya">
              Session Subtitle
            </Label>
            <Input
              placeholder="Enter session title"
              className="text-[#A3A3A3] placeholder:text-[#A3A3A3] text-base font-abhaya sm:px-5 px-4 md:h-[52px] sm:h-12 h-10"
              value={formData.sessionSubtitle}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFormData((prev) => ({
                  ...prev,
                  sessionSubtitle: e.target.value,
                }));
              }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-base text-black font-semibold font-abhaya">
              Session Description
            </Label>
            <Textarea
              placeholder="Enter Description"
              rows={4}
              className="text-[#A3A3A3] placeholder:text-[#A3A3A3] sm:text-base text-[15px] font-abhaya sm:px-5 px-4"
              value={formData.sessionDescription}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setFormData((prev) => ({
                  ...prev,
                  sessionDescription: e.target.value,
                }));
              }}
            />
          </div>
          <div className="grid grid-cols-12 md:gap-7 sm:gap-4 gap-3">
            <div className="xl:col-span-3 col-span-6 flex flex-col gap-1">
              <Label className="text-base text-black font-semibold font-abhaya">
                Session Date
              </Label>
              <Input
                placeholder="Enter Date"
                className="text-[#A3A3A3] placeholder:text-[#A3A3A3] text-base font-abhaya sm:px-5 px-4 md:h-[52px] sm:h-12 h-10"
                value={formData.sessionDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData((prev) => ({
                    ...prev,
                    sessionDate: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="xl:col-span-3 col-span-6 flex flex-col gap-1">
              <Label className="text-base text-black font-semibold font-abhaya">
                Session Time
              </Label>
              <Input
                placeholder="Enter Time"
                className="text-[#A3A3A3] placeholder:text-[#A3A3A3] sm:text-base text-[15px] font-abhaya sm:px-5 px-4 md:h-[52px] sm:h-12 h-10"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData((prev) => ({
                    ...prev,
                    sessionTime: e.target.value,
                  }));
                }}
                value={formData.sessionTime}
              />
            </div>
            <div className="xl:col-span-2 md:col-span-4 col-span-6 flex flex-col gap-1">
              <Label className="text-base text-black font-semibold font-abhaya">
                AM/PM
              </Label>
              <SelectMenu
                option={timePeriodsOptions}
                setValue={(data: string) =>
                  setFormData((prev) => ({
                    ...prev,
                    selectTimePeriods: data,
                  }))
                }
                value={formData.selectTimePeriods}
                itemClassName="text-[#A3A3A3] text-base"
                className="text-[#A3A3A3] sm:text-base text-[15px] font-abhaya sm:px-5 px-4 md:h-[52px] sm:h-12 h-10"
                placeholder="AM"
              />
            </div>
            <div className="xl:col-span-2 md:col-span-4 col-span-6 flex flex-col gap-1">
              <Label className="text-base text-black font-semibold font-abhaya">
                Duration in Hours
              </Label>
              <SelectMenu
                option={durationInHours}
                setValue={(data: string) =>
                  setFormData((prev) => ({
                    ...prev,
                    selectDurationInHours: data,
                  }))
                }
                value={formData.selectDurationInHours}
                itemClassName="text-[#A3A3A3] text-base"
                className="text-[#A3A3A3] sm:text-base text-[15px] font-abhaya sm:px-5 px-4 md:h-[52px] sm:h-12 h-10"
                placeholder="01"
              />
            </div>
            <div className="xl:col-span-2 md:col-span-4 col-span-6 flex flex-col gap-1">
              <Label className="text-base text-black font-semibold font-abhaya">
                Duration in Minute
              </Label>
              <SelectMenu
                option={durationInMinute}
                setValue={(data: string) =>
                  setFormData((prev) => ({
                    ...prev,
                    selectDurationInMinute: data,
                  }))
                }
                value={formData.selectDurationInMinute}
                itemClassName="text-[#A3A3A3] text-base"
                className="text-[#A3A3A3] sm:text-base text-[15px] font-abhaya sm:px-5 px-4 md:h-[52px] sm:h-12 h-10"
                placeholder="AM"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-base text-black font-semibold font-abhaya">
              Select Company
            </Label>
            <SelectMenu
              option={selectCompanyOptions}
              setValue={(data: string) =>
                setFormData((prev) => ({
                  ...prev,
                  selectCompany: data,
                }))
              }
              value={formData.selectCompany}
              itemClassName="text-[#A3A3A3] text-base"
              className="text-[#A3A3A3] sm:text-base text-[15px] font-abhaya sm:px-5 px-4 md:h-[52px] sm:h-12 h-10"
              placeholder="Select course name"
            />
          </div>
          <div className="flex flex-col gap-3">
            <Button
              className="bg-transparent text-[#4285F4] text-base font-abhaya flex gap-2 items-center justify-start p-0 h-auto"
              onClick={() => setIsOpen(true)}
              disabled={!formData.selectCompany}
            >
              <CirclePlus width={18} />
              Add Trainee
            </Button>
            <ul className="flex items-center gap-2 overflow-x-auto overflow-y-hidden md:pb-0 pb-2">
              {formData.traineeList?.map((i: TraineeListProps) => (
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
              ))}
            </ul>
            <div className="text-right">
              <Button className="bg-[#58BA66] uppercase md:text-base text-sm font-nunito md:h-12 h-10" onClick={() => {
                  const validationResult = ScheduleLiveSessionSchema.safeParse(formData);
                  if (!validationResult.success) {
                    console.log("validationResult.error.errors", validationResult.error.formErrors);
                    return;
                  }
                  console.log("formData", formData);
                  
              }}>
                Save Session
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScheduleLiveSessionPage;
