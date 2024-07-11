import { Star } from "lucide-react";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";

type EnrolledCourses = {
  data: {
    image: string;
    review: string;
    title: string;
  };
};

const EnrolledCourses = ({ data }: EnrolledCourses) => {
  return (
    <div className="px-6 py-5 shadow-2xl border border-[#ddd] flex flex-col gap-3">
      <div className="flex gap-4 items-center">
        <div className="min-w-[100px] min-h-[92px] w-[100px] h-[92px] rounded-lg overflow-hidden">
          <img src={data.image} alt="" className="w-full h-full" />
        </div>
        <div className="flex flex-col">
          <span className="uppercase text-[#8C94A3] text-xs font-abhaya font-semibold flex items-center gap-1">
            <Star width={14} />
            {data.review}
          </span>
          <p className="mb-2 text-[#1D2026] text-xs font-abhaya font-semibold">
            {data.title}
          </p>
          <div className="flex gap-3">
            <Badge className="bg-[#FFD56A] text-xs text-[#3A3A3A] hover:bg-[#FFD56A]">
              Technology & Innovation
            </Badge>
            <Badge className="bg-[#D6F5AC] text-xs text-[#3A3A3A] hover:bg-[#D6F5AC]">
              Social
            </Badge>
          </div>
        </div>
      </div>
      <Progress value={90} color="#58BA66" className="w-full rounded-full" />
    </div>
  );
};

export default EnrolledCourses;