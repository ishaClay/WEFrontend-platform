import { DataEntity } from "@/types/review";
import { FaStar } from "react-icons/fa6";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { convertUTCToGMT } from "@/lib/utils";

const FeedbackCard = ({ data }: { data: DataEntity }) => {
  return (
    <div className="flex items-center gap-5 w-full">
      <div>
        <Avatar>
          <AvatarImage src={data?.user?.employeeDetails?.profileImage || ""} />
          <AvatarFallback>
            {data?.user?.name?.charAt(0) ||
              data?.user?.email.charAt(0)?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-10">
            <h4 className="text-[16px] font-[600] font-droid">
              {data?.user?.name || data?.user?.email?.split("@")[0]}
            </h4>
            <span className="flex items-center">
              {Array.from({ length: data?.courseRate }, (_: any) => (
                <FaStar className="text-[#FD8E1F]" />
              )) || 0}
              {Array.from({ length: 5 - +data?.courseRate }, (_: any) => (
                <FaStar className="text-slate-300" />
              )) || 0}
            </span>
          </div>
          <p className="text-[14px] font-[400] font-droid">
            {convertUTCToGMT(new Date(data?.createdAt))?.format("DD/MM/YYYY")}
          </p>
        </div>
        <p className="text-[14px]">{data?.discription}</p>
      </div>
    </div>
  );
};

export default FeedbackCard;
