import SelectMenu from "@/components/comman/SelectMenu";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/datepicker";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const asignModel = [
  {
    label: "Team Member1",
    value: "team member1",
  },
  {
    label: "Team Member2",
    value: "team member2",
  },
  {
    label: "Team Member3",
    value: "team member3",
  },
];

const AssignModel = () => {
  const [selectAsignModel, setSelectAsignModel] = useState("");
  const [date, setDate] = useState<{
    startDate: Date | undefined;
    endDate: Date | undefined;
  }>({
    startDate: undefined,
    endDate: undefined,
  });

  console.log("datedatedatedatedate", date);

  return (
    <div className="">
      <h5 className="text-base font-abhaya font-semibold text-[#000] pb-3">
        Assign Action Item
      </h5>
      <p className="text-[15px] text-[#606060] font-abhaya font-bold pb-2.5">
        Get a team member roll their sleeves up for your initiative!{" "}
      </p>
      <div className="pb-2.5">
        <Label className="text-base font-abhaya font-semibold text-[#000]">
          Select Team member
        </Label>
      </div>

      <SelectMenu
        option={asignModel}
        setValue={(data: string) => setSelectAsignModel(data)}
        value={selectAsignModel}
        placeholder="Select Team Member"
        className="w-[363px] h-[52px] text-[16px] text-[#A3A3A3]b font-abhaya xl:mb-7 mb-6"
      />
      <DatePicker
        placeHolder="Enter Date"
        labelText="Start Date"
        date={date.startDate}
        setDate={(e) => setDate((prev) => ({ ...prev, startDate: e }))}
        buttonClassName="text-base font-abhaya font-medium text-[#A3A3A3] w-[363px] h-[52px] xl:mb-7 mb-6"
        labelClassName="text-base font-abhaya font-semibold text-[#000] pb-1"
      />
      <DatePicker
        placeHolder="Enter Date"
        labelText="End Date"
        date={date.endDate}
        setDate={(e) => setDate((prev) => ({ ...prev, endDate: e }))}
        buttonClassName="text-base font-abhaya font-medium text-[#A3A3A3] w-[363px] h-[52px]"
        labelClassName="text-base font-abhaya font-semibold text-[#000] pb-1"
      />
      <div className="flex justify-end pt-[30px]">
        <Button className="text-base font-nunito xl:w-[137px] w-[130px] xl:h-[52px] h-[48px] bg-[#58BA66]">
          Assign
        </Button>
      </div>
    </div>
  );
};

export default AssignModel;
