import Modal from "@/components/comman/Modal";
import SelectMenu from "@/components/comman/SelectMenu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CirclePlus, MoveLeft, X } from "lucide-react";
import { useState } from "react";
import AddTraineeModal from "./AddTraineeModal";

const selectCourseOption = [
  {
    label: "Course 1",
    value: "course 1",
  },
  {
    label: "Course 2",
    value: "course 2",
  },
  {
    label: "Course 3",
    value: "course 3",
  },
];

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
const selectCompanyOptions = [
  {
    label: "Prime Infotech",
    value: "company 1",
  },
  {
    label: "ADBC Company",
    value: "company 1",
  },
  {
    label: "XUZ Comapny",
    value: "company 1",
  },
];

const ScheduleLiveSessionPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectCourse, setSelectCourse] = useState("");
  const [selectLiveSession, setSelectLiveSession] = useState("");
  const [selectTimePeriods, setSelectTimePeriods] = useState("");
  const [selectDurationInHours, setSelectDurationInHours] = useState("");
  const [selectDurationInMinute, setSelectDurationInMinute] = useState("");
  const [selectCompany, setSelectCompany] = useState("");
  return (
    <>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="lg:max-w-3xl sm:max-w-xl max-w-[335px] xl:p-[30px] p-5 rounded-xl"
      >
        <AddTraineeModal />
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
              setValue={(data: string) => setSelectCourse(data)}
              value={selectCourse}
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
              setValue={(data: string) => setSelectLiveSession(data)}
              value={selectLiveSession}
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
              />
            </div>
            <div className="xl:col-span-3 col-span-6 flex flex-col gap-1">
              <Label className="text-base text-black font-semibold font-abhaya">
                Session Time
              </Label>
              <Input
                placeholder="Enter Time"
                className="text-[#A3A3A3] placeholder:text-[#A3A3A3] sm:text-base text-[15px] font-abhaya sm:px-5 px-4 md:h-[52px] sm:h-12 h-10"
              />
            </div>
            <div className="xl:col-span-2 md:col-span-4 col-span-6 flex flex-col gap-1">
              <Label className="text-base text-black font-semibold font-abhaya">
                AM/PM
              </Label>
              <SelectMenu
                option={timePeriodsOptions}
                setValue={(data: string) => setSelectTimePeriods(data)}
                value={selectTimePeriods}
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
                setValue={(data: string) => setSelectDurationInHours(data)}
                value={selectDurationInHours}
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
                setValue={(data: string) => setSelectDurationInMinute(data)}
                value={selectDurationInMinute}
                itemClassName="text-[#A3A3A3] text-base"
                className="text-[#A3A3A3] sm:text-base text-[15px] font-abhaya sm:px-5 px-4 md:h-[52px] sm:h-12 h-10"
                placeholder="AM"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-base text-black font-semibold font-abhaya">
              Select Course
            </Label>
            <SelectMenu
              option={selectCompanyOptions}
              setValue={(data: string) => setSelectCompany(data)}
              value={selectCompany}
              itemClassName="text-[#A3A3A3] text-base"
              className="text-[#A3A3A3] sm:text-base text-[15px] font-abhaya sm:px-5 px-4 md:h-[52px] sm:h-12 h-10"
              placeholder="Select course name"
            />
          </div>
          <div className="flex flex-col gap-3">
            <Button
              className="bg-transparent text-[#4285F4] text-base font-abhaya flex gap-2 items-center justify-start p-0 h-auto"
              onClick={() => setIsOpen(true)}
            >
              <CirclePlus width={18} />
              Add Trainee
            </Button>
            <ul className="flex items-center gap-2 overflow-x-auto overflow-y-hidden md:pb-0 pb-2">
              <li className="cursor-pointer justify-center flex text-base gap-2 rounded-full items-center p-2 bg-[#F5F7FF] text-black overflow-hidden min-w-[140px]">
                Ankites Risher <X width={16} />
              </li>
              <li className="cursor-pointer justify-center flex text-base gap-2 rounded-full items-center p-2 bg-[#F5F7FF] text-black overflow-hidden min-w-[140px]">
                Liam Risher <X width={16} />
              </li>
              <li className="cursor-pointer justify-center flex text-base gap-2 rounded-full items-center p-2 bg-[#F5F7FF] text-black overflow-hidden min-w-[140px]">
                Honey Risher <X width={16} />
              </li>
              <li className="cursor-pointer justify-center flex text-base gap-2 rounded-full items-center p-2 bg-[#F5F7FF] text-black overflow-hidden min-w-[140px]">
                Oliver Noah <X width={16} />
              </li>
            </ul>
            <div className="text-right">
              <Button className="bg-[#58BA66] uppercase md:text-base text-sm font-nunito md:h-12 h-10">
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
