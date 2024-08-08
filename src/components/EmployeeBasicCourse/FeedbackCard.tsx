import { DataEntity } from "@/types/review";
import moment from "moment";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const FeedbackCard = ({ data }: { data: DataEntity }) => {
  console.log("data", data);

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
          <h4 className="text-[16px] font-[600] font-nunito">
            {data?.user?.name || data?.user?.email?.split("@")[0]}
          </h4>
          <p className="text-[14px] font-[400] font-nunito">
            {moment(new Date(data?.createdAt))?.format("DD/MM/YYYY")}
          </p>
        </div>
        <p className="text-[14px]">{data?.discription}</p>
      </div>
    </div>
  );
};

export default FeedbackCard;
