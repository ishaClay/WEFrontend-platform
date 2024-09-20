import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import SelectMenu from "./SelectMenu";
import { DashBoardCardItem, DashboardFilterType } from "@/types/common";

interface DashboardCardProps {
  isLoading: boolean;
  items: DashBoardCardItem[];
  className?: string;
  onChangeSelect?: (val: DashboardFilterType) => void;
  value?: string;
}

const options = [
  {
    label: "Today",
    value: "today",
  },
  {
    label: "Weekly",
    value: "week",
  },
  {
    label: "Monthly",
    value: "month",
  },
];

const DashboardCardWithDropdown = ({
  isLoading,
  items,
  className,
  value,
  onChangeSelect,
}: DashboardCardProps) => {
  return (
    <div className={cn("xl:p-5 p-3 bg-[#FFFFFF] rounded-xl", className)}>
      <div className="flex justify-end mb-4">
        <SelectMenu
          option={options}
          value={value || options[0].value}
          className="w-auto"
          setValue={(val: string) =>
            onChangeSelect?.(val as DashboardFilterType)
          }
        />
      </div>
      {isLoading ? (
        <span className="flex justify-center py-[68px]">
          <Loader2 className="w-6 h-6 animate-spin" />
        </span>
      ) : (
        <div className="flex items-center gap-4 justify-evenly">
          {items.map((item) => {
            return (
              <div key={item.title}>
                <div className="bg-[#F5F7FF] xl:w-[74px] w-[64px] xl:h-[74px] h-[64px] rounded-full flex items-center justify-center mx-auto xl:mb-3 mb-2">
                  <img
                    src={item.icon}
                    alt=""
                    className="xl:w-[44px] w-[34px]"
                  />
                </div>
                <h2 className="xl:pb-2.5 pb-1 xl:text-[32px] text-center text-xl xl:leading-10 leading-8 font-bold">
                  {item.value}
                </h2>
                <p className="text-base text-black font-droid text-center">
                  {item.title}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DashboardCardWithDropdown;
