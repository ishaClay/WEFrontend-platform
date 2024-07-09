import SelectMenu from "@/components/comman/SelectMenu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

const birthMonth = [
  {
    label: "January",
    value: "january",
  },
  {
    label: "February",
    value: "february",
  },
  {
    label: "March",
    value: "march",
  },
  {
    label: "April",
    value: "april",
  },
  {
    label: "May",
    value: "may",
  },
];

const birthDate = [
  {
    label: "1",
    value: "1",
  },
  {
    label: "2",
    value: "2",
  },
  {
    label: "3",
    value: "3",
  },
  {
    label: "4",
    value: "4",
  },
  {
    label: "5",
    value: "5",
  },
];

const birthYear = [
  {
    label: "1998",
    value: "1",
  },
  {
    label: "1999",
    value: "2",
  },
  {
    label: "2000",
    value: "3",
  },
  {
    label: "2001",
    value: "4",
  },
  {
    label: "2002",
    value: "5",
  },
];

const ProfileSetting = () => {
  const [selectBirthMonth, setSelectBirthMonth] = useState("");
  const [selectBirthDate, setSelectBirthDate] = useState("");
  const [selectBirthYear, setSelectBirthYear] = useState("");
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-5">
        <div className="col-span-1 flex flex-col gap-1">
          <Label className="sm:text-base text-sm font-nunito text-black">
            First name
          </Label>
          <Input
            className="border border-[#D9D9D9] placeholder:[#A3A3A3] text-sm"
            placeholder="first name"
          />
        </div>

        <div className="col-span-1 flex flex-col gap-1">
          <Label className="sm:text-base text-sm font-nunito text-black">
            Last name
          </Label>
          <Input
            className="border border-[#D9D9D9] placeholder:[#A3A3A3] text-sm"
            placeholder="last name"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <Label className="sm:text-base text-sm font-nunito text-black">
          Email
        </Label>
        <Input
          className="border-none shadow placeholder:[#A3A3A3] text-sm"
          placeholder="email"
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label className="sm:text-base text-sm font-nunito text-black">
          Gender
        </Label>
        <RadioGroup defaultValue="option-one" className="flex gap-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="option-one"
              id="option-one"
              className="border-[#9B9B9B] w-6 h-6"
            />
            <Label
              htmlFor="option-one"
              className="text-[#9B9B9B] text-sm font-sans"
            >
              Male
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="option-two"
              id="option-two"
              className="border-[#9B9B9B] w-5 h-5"
            />
            <Label
              htmlFor="option-two"
              className="text-[#9B9B9B] text-sm font-sans"
            >
              Female
            </Label>
          </div>
        </RadioGroup>
      </div>
      <div className="flex flex-col gap-1">
        <Label className="sm:text-base text-sm font-nunito text-black">
          Birth Date
        </Label>
        <div className="flex items-center gap-5">
          <SelectMenu
            option={birthMonth}
            setValue={(data: string) => setSelectBirthMonth(data)}
            value={selectBirthMonth}
            className="font-nunito text-sm text-black"
            placeholder="January"
          />
          <SelectMenu
            option={birthDate}
            setValue={(data: string) => setSelectBirthDate(data)}
            value={selectBirthDate}
            className="font-calibri text-sm text-black"
            placeholder="1"
          />
          <SelectMenu
            option={birthYear}
            setValue={(data: string) => setSelectBirthYear(data)}
            value={selectBirthYear}
            className="font-calibri text-sm text-black"
            placeholder="2000"
          />
        </div>
        <div className="text-center mt-5">
          <Button className="bg-[#00778B] font-abhaya text-base px-7">
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetting;
