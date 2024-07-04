import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "../../ui/input";
import SelectMenu from "../../comman/SelectMenu";
import { useState } from "react";
import { Checkbox } from "../../ui/checkbox";
import profile_img from "@/assets/images/face_1.jfif";
import TraineeItems from "./TraineeItems";
import { Button } from "../../ui/button";
import { ScrollArea } from "../../ui/scroll-area";

const companyOptions = [
  {
    label: "Company 1",
    value: "company 1",
  },
  {
    label: "Company 2",
    value: "company 2",
  },
  {
    label: "Company 3",
    value: "company 3",
  },
];

const AddTraineeModal = () => {
  const traineeEmployee = [
    {
      image: profile_img,
      name: "Ankites Risher",
      companyName: "Prime Infotech",
    },
    {
      image: profile_img,
      name: "Liam Risher",
      companyName: "Prime Infotech",
    },
    {
      image: profile_img,
      name: "Honey Risher",
      companyName: "ABCD Company Name",
    },
    {
      image: profile_img,
      name: "Oliver Noah",
      companyName: "ABCD Company Name",
    },
    {
      image: profile_img,
      name: "Elijah James",
      companyName: "XYZ Company Name",
    },
    {
      image: profile_img,
      name: "Elijah James",
      companyName: "XYZ Company Name",
    },
    {
      image: profile_img,
      name: "Elijah James",
      companyName: "XYZ Company Name",
    },
    {
      image: profile_img,
      name: "Elijah James",
      companyName: "XYZ Company Name",
    },
  ];
  const [selectCompany, setSelectCompany] = useState("");
  return (
    <div className="">
      <h5 className="text-[20px] text-black font-abhaya font-semibold">
        Add Trainee
      </h5>
      <h6 className="text-[#606060] text-base font-abhaya">
        Add a trainee to the upcoming Live Session
      </h6>
      <div className="sm:flex block items-center justify-between mt-3">
        <div className="">
          <div className="flex items-center border border-[#D9D9D9] rounded-md px-4 sm:w-[350px] w-[280px] sm:h-[52px] h-[48px] sm:mb-0 mb-3">
            <Search className="text-[#A3A3A3]" />
            <Input
              placeholder="Search by name, company"
              className="text-[#A3A3A3] placeholder:text-[#A3A3A3] border-none text-[15px]"
            />
          </div>
        </div>
        <div className="relative">
          <SelectMenu
            option={companyOptions}
            setValue={(data: string) => setSelectCompany(data)}
            value={selectCompany}
            className="text-black bg-transparent text-base font-abhaya font-bold border border-[#D9D9D9] w-[170px] sm:h-[52px] h-[48px] p-4 ps-8"
            itemClassName="text-base font-medium font-abhaya bg-transparent"
            placeholder="Company"
          />
          <SlidersHorizontal
            width={18}
            className="absolute top-0 bottom-0 left-[10px] m-auto text-[#A3A3A3]"
          />
        </div>
      </div>
      <div className="mt-3">
        <div className="flex items-center justify-between mb-5">
          <h5 className="text-base text-black font-abhaya font-semibold">
            Trainees
          </h5>
          <span className="text-base text-black font-abhaya flex items-center font-semibold">
            Select All <Checkbox className="ms-3 border-[#D9D9D9] w-6 h-6" />
          </span>
        </div>
        <div className="">
          <ScrollArea className="h-[300px]">
            {traineeEmployee.map((data, index) => {
              return <TraineeItems key={index} data={data} />;
            })}
          </ScrollArea>
        </div>
      </div>
      <div className="text-right mt-5">
        <Button className="uppercase xl:text-base text-sm font-nunito bg-[#58BA66] xl:h-12 h-10 xl:px-6 px-5">
          Add Trainee
        </Button>
      </div>
    </div>
  );
};

export default AddTraineeModal;
