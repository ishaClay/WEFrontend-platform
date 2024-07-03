import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import Rating from "../Rating";

const ReviewModal = () => {
  return (
    <div>
      <h4 className="xl:text-[28px] lg:text-[22px] sm:text-[28px] text-base font-bold font-nunito text-black pb-5 lg:text-left text-center">
        Your feedback would go a long way!
      </h4>
      <div className="flex items-center lg:gap-8 gap-5 mb-5">
        <span className="text-black lg:text-base text-sm font-nunito">
          How would you rate the course?
        </span>
        <div className="flex md:gap-3 gap-2 items-center">
          <Rating value={2} className="gap-4" />
        </div>
      </div>
      <div className="flex items-center lg:gap-8 gap-5 mb-5">
        <span className="text-black lg:text-base text-sm font-nunito">
          And how would you rate the trainer?.
        </span>
        <div className="flex md:gap-3 gap-2 items-center">
          <Rating value={3} />
        </div>
      </div>
      <Textarea
        placeholder="Leave a review...     Just a sentence or the all details of your experience!"
        className="lg:p-5 p-3 border border-[#D9D9D9] text-[15px] text-[#A3A3A3] placeholder:text-[#A3A3A3]"
        rows={5}
      />
      <div className="grid lg:grid-cols-2 grid-cols-1 items-center mt-5">
        <div className="col-span-1 lg:flex hidden items-center">
          <Checkbox className="me-3" />
          <h5 className="text-[#888888] font-inter text-xs w-[150px]">
            I’m totally fine with my review to be shared on social media.
          </h5>
        </div>
        <div className="col-span-1 flex gap-4 items-center lg:justify-end justify-start">
          <Button className="bg-[#64A70B] lg:text-base md:text-sm text-xs font-bold lg:px-8 px-5 font-Poppins">
            Share it
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
