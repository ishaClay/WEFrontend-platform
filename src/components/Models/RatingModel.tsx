/* eslint-disable @typescript-eslint/ban-ts-comment */
import { addFeedback } from "@/services/apiServices/feedback";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import Modal from "../comman/Modal";
import { Button } from "../ui/button";

const RatingModel = ({
  isOpen,
  setIsOpen,
  maxRating = 5,
}: {
  maxRating?: number;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [rating, setRating] = useState<number | null>(null);

  const handleMouseEnter = (value: number) => {
    setRating(value);
  };

  // const handleMouseLeave = () => {
  //   setRating(0);
  // };

  const {} = useMutation({
    mutationFn: addFeedback,
    onSuccess: () => {
      setIsOpen(false);
    },
  });

  const handleClick = (value: number) => {
    setRating(value);
    // if (onRate) {
    //   onRate(value);
    // }
  };

  console.log("rating", rating);

  const handleEmoji = (index: number) => {
    switch (index) {
      case 0:
        return "🙁";

      case 1:
        return "😐";

      case 2:
        return "🙂";

      case 3:
        return "😀";

      case 4:
        return "😍";

      default:
        return "🙂";
    }
  };

  return (
    <Modal
      open={!!isOpen}
      header="Feedback"
      className="max-w-[515px] w-full gap-0"
      onClose={() => {
        setIsOpen(false);
      }}
      showCloseButton={false}
    >
      <div className="p-5">
        <div className="flex items-center justify-center gap-4">
          {[...Array(maxRating)].map((_, index) => {
            const value = index + 1;
            return (
              <span
                key={value}
                onMouseEnter={() => handleMouseEnter(value)}
                // onMouseLeave={handleMouseLeave}
                onClick={() => handleClick(value)}
                style={{
                  fontSize: "2rem",
                  margin: "0 0.1rem",
                }}
                className={`${
                  // @ts-ignore
                  (rating && value === rating) || value <= rating
                    ? "grayscale-0"
                    : "grayscale"
                } cursor-pointer`}
              >
                {handleEmoji(index)}
              </span>
            );
          })}
        </div>
      </div>
      <div className="flex items-center justify-end">
        <Button className="bg-[#64A70B] text-sm font-calibri text-white py-2 px-4 rounded-md h-[40px] w-[100px] font-bold outline-none">
          Submit
        </Button>
      </div>
    </Modal>
  );
};

export default RatingModel;
