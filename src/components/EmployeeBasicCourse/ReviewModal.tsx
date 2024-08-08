import { QUERY_KEYS } from "@/lib/constants";
import { addReview } from "@/services/apiServices/review";
import { getSingleCourseType } from "@/types/course";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Rating from "../Rating";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Textarea } from "../ui/textarea";

const ReviewModal = ({ course, onClose }: getSingleCourseType | any) => {
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const [courseRatting, setCourseRatting] = useState(0);
  const [trainerRatting, setTrainerRatting] = useState(0);
  const [review, setReview] = useState("");
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: addReview,
    onSuccess: () => {
      handleClose();
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.feedback],
      });
    },
  });

  const handleClose = () => {
    onClose();
    setCourseRatting(0);
    setTrainerRatting(0);
    setReview("");
  };

  const handleSubmit = () => {
    const payload = {
      courseRate: courseRatting,
      trainerRate: trainerRatting,
      discription: review,
      user: userData?.query?.id,
      course: course?.course?.id,
      trainerCompany: course?.course?.trainerId
        ? course?.course?.trainerId?.trainerCompany?.id
        : course?.course?.trainerCompanyId?.id,
    };
    mutate(payload);
  };

  console.log("++++++++++++++++++", course);

  return (
    <div>
      <h4 className="xl:text-[28px] text-[22px] font-bold font-nunito text-black pb-5 lg:text-left text-center">
        Your feedback would go a long way!
      </h4>
      <div className="grid grid-cols-5 items-center mb-5 sm:gap-5 gap-2">
        <span className="text-black lg:text-base text-sm font-nunito sm:col-span-3 col-span-5 font-semibold">
          How would you rate the course?
        </span>
        <div className="flex md:gap-3 gap-2 items-center col-span-2">
          <Rating
            value={courseRatting}
            onChange={(val) => setCourseRatting(val)}
            className="gap-4"
            edit={true}
          />
        </div>
      </div>
      <div className="grid grid-cols-5 items-center mb-6 sm:gap-5 gap-2">
        <span className="text-black lg:text-base text-sm font-nunito sm:col-span-3 col-span-5 font-semibold">
          And how would you rate the trainer?.
        </span>
        <div className="flex md:gap-3 gap-2 items-center col-span-2">
          <Rating
            value={trainerRatting}
            onChange={(val) => setTrainerRatting(val)}
            className="gap-4"
            edit={true}
          />
        </div>
      </div>
      <Textarea
        placeholder="Leave a review...     Just a sentence or the all details of your experience!"
        onChange={(e) => setReview(e.target.value)}
        value={review}
        className="lg:px-5 lg:py-4 p-3 border border-[#D9D9D9] text-[15px] text-[#A3A3A3] placeholder:text-[#A3A3A3]"
        rows={5}
      />
      <div className="grid lg:grid-cols-3 grid-cols-1 items-center mt-5">
        <div className="col-span-1 lg:flex hidden items-center">
          <Checkbox className="me-3" />
          <h5 className="text-[#888888] font-inter text-sm">
            I’m totally fine with my review to be shared on social media.
          </h5>
        </div>
        <div className="col-span-2 flex gap-4 items-center lg:justify-end justify-start">
          <Button
            type="button"
            disabled={review === ""}
            onClick={handleSubmit}
            className="bg-[#64A70B] lg:text-base md:text-sm text-xs font-bold font-Poppins xl:w-[130px] w-[120px] xl:h-[48px] h-[42px]"
          >
            Share it
          </Button>
          <Button
            type="button"
            onClick={handleClose}
            className="bg-[#E41B1B] lg:text-base md:text-sm text-xs font-bold font-Poppins xl:w-[130px] w-[120px] xl:h-[48px] h-[42px]"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
