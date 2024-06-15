import React from "react";
import star from "@/assets/images/Vector.png";

interface CoursListProps {
  rating: number;
}

const CourseList = ({ rating }: CoursListProps) => {
  return (
    <div>
      <div className="flex items-center">
        <img src={star} alt="" />
        <span className="pl-1 text-base font-bold">{rating}</span>
      </div>
    </div>
  );
};

export default CourseList;
