import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const ProfileSetting = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-5">
        <div className="col-span-1 flex flex-col gap-1">
          <Label className="text-base font-nunito">First name</Label>
          <Input
            className="border border-[#D9D9D9] placeholder:[#A3A3A3] text-sm"
            placeholder="first name"
          />
        </div>

        <div className="col-span-1 flex flex-col gap-1">
          <Label className="text-base font-nunito">Last name</Label>
          <Input
            className="border border-[#D9D9D9] placeholder:[#A3A3A3] text-sm"
            placeholder="last name"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <Label className="text-base font-nunito">Email</Label>
        <Input
          className="border-none shadow placeholder:[#A3A3A3] text-sm"
          placeholder="email"
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label className="text-base font-nunito">Gender</Label>
        <RadioGroup defaultValue="option-one" className="flex gap-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="option-one"
              id="option-one"
              className="border-[#9B9B9B] w-6 h-6"
            />
            <Label htmlFor="option-one">Option One</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="option-two"
              id="option-two"
              className="border-[#9B9B9B] w-6 h-6"
            />
            <Label htmlFor="option-two">Option Two</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default ProfileSetting;
