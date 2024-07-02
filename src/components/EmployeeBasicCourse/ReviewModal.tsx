import { Star } from "lucide-react";
import { FaStar } from "react-icons/fa6";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";

const ReviewModal = () => {
  return (
    <div>
      <h4 className="xl:text-[28px] lg:text-[22px] sm:text-[28px] text-base font-bold font-nunito text-black pb-5 lg:text-left text-center">
        Wind energy basic course
      </h4>
      <div className="flex items-center lg:gap-8 gap-5 mb-5">
        <span className="text-black lg:text-base text-sm font-nunito">
          Course Feedback :
        </span>
        <div className="flex md:gap-3 gap-2 items-center">
          <FaStar className="text-[#FFA000] sm:text-[25px] text-[18px]" />
          <FaStar className="text-[#FFA000] sm:text-[25px] text-[18px]" />
          <Star className="text-[#606060] sm:text-[25px] text-[18px]" />
          <Star className="text-[#606060] sm:text-[25px] text-[18px]" />
          <Star className="text-[#606060] sm:text-[25px] text-[18px]" />
        </div>
      </div>
      <div className="flex items-center lg:gap-8 gap-5 mb-5">
        <span className="text-black lg:text-base text-sm font-nunito">
          Trainer Feedback :
        </span>
        <div className="flex md:gap-3 gap-2 items-center">
          <FaStar className="text-[#FFA000] sm:text-[25px] text-[18px]" />
          <FaStar className="text-[#FFA000] sm:text-[25px] text-[18px]" />
          <FaStar className="text-[#FFA000] sm:text-[25px] text-[18px]" />
          <Star className="text-[#606060] sm:text-[25px] text-[18px]" />
          <Star className="text-[#606060] sm:text-[25px] text-[18px]" />
        </div>
      </div>
      <Textarea
        placeholder="Write a review..."
        className="lg:p-5 p-3 border border-[#D9D9D9] text-[15px] text-[#A3A3A3] placeholder:text-[#A3A3A3]"
        rows={5}
      />
      <div className="grid lg:grid-cols-2 grid-cols-1 items-center mt-5">
        <div className="col-span-1 lg:flex hidden items-center">
          <Checkbox className="me-3" />
          <h5 className="text-[#888888] font-inter text-xs w-3/4">
            I have no objections sharing my review in social media.
          </h5>
        </div>
        <div className="col-span-1 flex gap-4 items-center lg:justify-end justify-start">
          <Button className="bg-[#64A70B] lg:text-base md:text-sm text-xs font-bold lg:px-8 px-5 font-Poppins">
            Submit
          </Button>
          <Button className="bg-[#E41B1B] lg:text-base md:text-sm text-xs font-bold lg:px-8 px-5 font-Poppins">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
