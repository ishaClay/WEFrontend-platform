import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import fileImage from "@/assets/images/fileupload.svg";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const DelayModel = () => {
  return (
    <div>
      <h6 className="text-base font-bold font-nunito text-[#000]">
        Assigned Action Item Details
      </h6>
      <div className="pt-7 grid grid-cols-9">
        <div className="col-span-5">
          <Badge className="bg-[#FF5252] w-[53px] h-[28px] text-sm font-abhaya font-normal">
            Delay
          </Badge>
          <h6 className="font-abhaya text-xl font-bold leading-6 text-[#000] pt-6">
            Lead in energy efficiency through continuous optimization and
            strategic energy management.
          </h6>
          <div className="pt-7">
            <div className="flex items-center text-base font-abhaya font-semibold gap-1 pb-4">
              <h6 className="text-[#777]">Start date :</h6>
              <span className="text-[#000]">2nd March, 2024</span>
            </div>
            <div className="flex items-center text-base font-abhaya font-semibold gap-1 pb-5">
              <h6 className="text-[#777]">End date :</h6>
              <span className="text-[#000]">24th March, 2024</span>
            </div>
            <div className="flex items-center text-base font-abhaya font-semibold gap-1 pb-4">
              <h6 className="text-[#777]">Last updated by :</h6>
              <span className="text-[#000]">SME Admin Name</span>
            </div>
            <div className="flex items-center text-base font-abhaya font-semibold gap-1">
              <h6 className="text-[#777]">Last updated date :</h6>
              <span className="text-[#000]">24th March, 2024</span>
            </div>
          </div>
        </div>
        <div className="col-span-4 flex justify-end pt-6">
          <div>
            <div className="w-[317px] h-[228px] border border-dashed border-[#D9D9D9] rounded-sm text-center flex flex-col justify-center">
              <img src={fileImage} alt="" className="mx-auto" />
              <p className="text-xs font-abhaya text-[#9E9E9E] font-medium pt-[18px]">
                Drag and drop evidence here
              </p>
              <p className="text-xs font-inter text-[#9E9E9E] pt-2">-OR-</p>
              <Label
                htmlFor="upload"
                className="w-[120px] h-[34px] flex items-center justify-center bg-[#42A7C3] rounded-[5px] text-[12px] text-white font-abhaya mx-auto mt-[13px] cursor-pointer"
              >
                Upload Evidence
              </Label>
              <Input
                type="file"
                id="upload"
                className="hidden"
                placeholder="Upload Evidence"
              />
            </div>
            <div className="flex justify-end pt-[22px]">
              <Button className="xl:w-[201px] xl:h-[52px] w-[180px] h-[45px] rounded-[6px] bg-[#58BA66] xl:text-base text-[15px] font-nunito font-semibold">
                Mark As Completed
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DelayModel;
