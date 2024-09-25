import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EmployeeEntity } from "@/types/liveSession";

type sessionEmpoyeeProps = {
  data: EmployeeEntity;
};

const SessionEmployeeItem = ({ data }: sessionEmpoyeeProps) => {
  return (
    <div>
      <div className="flex items-center justify-between py-2.5 border-b border-[#D9D9D9]">
        <div className="flex items-center">
          <div className="w-[40px] h-[40px] rounded-full overflow-hidden me-4">
            <Avatar>
              <AvatarImage src={data.profileImage || ""} />
              <AvatarFallback className="uppercase">
                {data?.name?.at(0)}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="font-droid text-base font-medium">{data.name}</div>
        </div>
      </div>
    </div>
  );
};

export default SessionEmployeeItem;
