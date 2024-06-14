import CourseList from "@/components/comman/CourseList";
import AcceptedIcon from "@/assets/images/Accepted_icons.png";
import RejectedIcons from "@/assets/images/Rejected_icons.png";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Euro } from "lucide-react";
import React from "react";

interface EnrollmentCourseListCardProps {
  data: {
    image: string;
    desc: string;
    title: string;
    employeenumber: number;
    rating: number;
    price: number;
  };
}

const EnrollmentCourseListCard = ({ data }: EnrollmentCourseListCardProps) => {
  return (
    <div className="flex items-center justify-between border border-[#D9D9D9] 2xl:p-5 p-3 rounded-md mb-4 mx-4">
      <div className="flex items-center">
        <div>
          <img
            src={data.image}
            alt="img"
            className="w-[152px] xl:h-[152px] h-[100px] rounded-md"
          />
        </div>
        <div className="2xl:px-10 xl:px-8 px-4">
          <div className="flex items-center xl:pb-5 pb-3">
            <CourseList rating={data.rating} />
            <Badge
              variant="outline"
              className="bg-[#FFD56A] p-1 px-3 text-[#3A3A3A] text-xs mx-2 font-Poppins font-normal"
            >
              Technology & Innovation
            </Badge>
            <Badge
              variant="outline"
              className="bg-[#D6F5AC] p-1 px-3 text-[#3A3A3A] text-xs font-Poppins font-normal"
            >
              Social
            </Badge>
          </div>

          <h6 className="xl:text-base text-sm leading-7 text-[#1D2026] font-inter font-medium">
            {data.desc}
          </h6>
          <div className="flex flex-wrap justify-between items-center xl:pt-5 pt-2">
            <div className="font-calibri">
              <p className="text-base font-medium">
                Company Name : <span className="font-bold">{data.title}</span>
              </p>
            </div>
            <div className="font-calibri">
              <p className="text-base font-medium">
                Number Of Employee :{" "}
                <span className="font-bold">{data.employeenumber}</span>
              </p>
            </div>
            <div className="flex font-bold font-calibri text-base">
              <Euro className="w-[16px] font-bold" />
              {data.price}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center xl:flex-nowrap flex-wrap">
        <Button className="bg-[#00778B] 2xl:px-7 px-3 xl:py-5 py-1 2xl:mx-2 mx-1 xl:my-0 my-1">
          Enquire
        </Button>
        <Button className="bg-[#58BA66] 2xl:px-7 px-3 xl:py-5 py-1 2xl:mx-2 mx-1 xl:my-0 my-1">
          Accept
        </Button>
        <Button className="bg-[#FF5252] 2xl:px-7 px-3 xl:py-5 py-1 2xl:mx-2 mx-1 xl:my-0 my-1">
          Reject
        </Button>
      </div>
      <div className="hidden">
        <div className="flex items-center pr-8">
          <img src={AcceptedIcon} alt="" width={18} />
          <span className="text-[#58BA66] font-calibri text-base pl-1">
            Accepted
          </span>
        </div>
      </div>
      <div className="hidden">
        <div className="flex items-center pr-8">
          <img src={RejectedIcons} alt="" width={18} />
          <span className="text-[#FF5252] font-calibri text-base pl-1">
            Rejected
          </span>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentCourseListCard;
