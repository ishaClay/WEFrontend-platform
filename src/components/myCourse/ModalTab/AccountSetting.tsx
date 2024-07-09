import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const AccountSetting = () => {
  return (
    <div className="flex flex-col gap-5">
      <h4 className="text-lg text-black font-semibold font-nunito sm:block hidden">
        Change password
      </h4>
      <div className="flex flex-col gap-1">
        <Label className="sm:text-base text-sm font-nunito text-black">
          Old password
        </Label>
        <Input
          className="border border-[#D9D9D9] placeholder:[#A3A3A3] text-sm"
          placeholder="Enter old password"
        />
      </div>

      <div className="flex flex-col gap-1">
        <Label className="sm:text-base text-sm font-nunito text-black">
          New password
        </Label>
        <Input
          className="border border-[#D9D9D9] placeholder:[#A3A3A3] text-sm"
          placeholder="Enter new password"
        />
      </div>

      <div className="flex flex-col gap-1">
        <Label className="sm:text-base text-sm font-nunito text-black">
          Confirm New password
        </Label>
        <Input
          className="border border-[#D9D9D9] placeholder:[#A3A3A3] text-sm"
          placeholder="Confirm new password"
        />
      </div>
      <div className="flex justify-end items-center gap-5">
        <Button className="w-[100px] bg-[#64A70B] h-12 text-base font-Poppins font-bold">
          Save
        </Button>
        <Button className="w-[100px] bg-[#E41B1B] h-12 text-base font-Poppins font-bold">
          Cancel
        </Button>
      </div>
      <div className="flex justify-between items-center sm:pt-5 pt-16 border-t border-[#E4E4E4]">
        <Label className="sm:text-lg text-base font-nunito text-black font-semibold">
          Notifications
        </Label>
        <Switch />
      </div>
    </div>
  );
};

export default AccountSetting;
