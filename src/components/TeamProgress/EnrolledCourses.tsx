import { CourseAllotedEntity } from "@/types/Invition";
import { Star } from "lucide-react";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";

type EnrolledCourses = {
  data: CourseAllotedEntity;
};

const EnrolledCourses = ({ data }: EnrolledCourses) => {
  return (
    <div className="sm:px-6 sm:py-5 p-[15px] sm:shadow-2xl shadow-none border border-[#ddd] flex flex-col gap-3">
      <div className="sm:flex block gap-4 items-center">
        <div className="sm:min-w-[100px] sm:min-h-[92px] sm:w-[100px] sm:h-[92px] w-full h-full rounded-lg overflow-hidden">
          <img
            src={data.courseVersion?.course?.bannerImage}
            alt=""
            className="w-full h-full"
          />
        </div>
        <div className="flex flex-col sm:pt-0 pt-2">
          <span className="uppercase text-[#8C94A3] text-xs font-abhaya font-semibold flex items-center gap-1">
            <Star width={14} />
            recommended
          </span>
          <p className="mb-2 text-[#000] text-sm font-abhaya font-semibold">
            {data?.course?.title}
          </p>
          <div className="flex sm:flex-nowrap flex-wrap gap-3">
            <Badge className="bg-[#FFD56A] text-xs text-[#3A3A3A] hover:bg-[#FFD56A]">
              Technology & Innovation
            </Badge>
            <Badge className="bg-[#D6F5AC] text-xs text-[#3A3A3A] hover:bg-[#D6F5AC]">
              Social
            </Badge>
          </div>
        </div>
      </div>
      <Progress
        value={Number(data?.courseProgress)}
        color="#58BA66"
        className="w-full rounded-full"
      />
    </div>
  );
};

export default EnrolledCourses;
