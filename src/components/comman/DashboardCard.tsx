import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface DashboardCardProps {
  isLoading: boolean;
  icon: string;
  value: number | string;
  title: string;
  className?: string;
}

const DashboardCard = ({
  isLoading,
  icon,
  value,
  title,
  className,
}: DashboardCardProps) => {
  return (
    <div
      className={cn("col-span-1 xl:p-5 p-3 bg-[#FFFFFF] rounded-xl", className)}
    >
      {isLoading ? (
        <span className="flex justify-center py-[68px]">
          <Loader2 className="w-6 h-6 animate-spin" />
        </span>
      ) : (
        <>
          <div className="bg-[#F5F7FF] xl:w-[74px] w-[64px] xl:h-[74px] h-[64px] rounded-full flex items-center justify-center mx-auto xl:mb-3 mb-2">
            <img src={icon} alt="" className="xl:w-[44px] w-[34px]" />
          </div>
          <h2 className="xl:pb-2.5 pb-1 xl:text-[32px] text-center text-xl xl:leading-10 leading-8 font-bold">
            {value}
          </h2>
          <p className="text-base text-black font-droid text-center">{title}</p>
        </>
      )}
    </div>
  );
};

export default DashboardCard;
