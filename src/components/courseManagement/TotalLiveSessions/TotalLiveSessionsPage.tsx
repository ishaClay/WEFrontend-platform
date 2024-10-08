import SelectMenu from "@/components/comman/SelectMenu";
import { Label } from "@/components/ui/label";
import { convertUTCToGMT, isSessionOngoingAtTime } from "@/lib/utils";
import { AllLivesessions } from "@/types/liveSession";
import { useState } from "react";
import LiveSessionList from "./LiveSessionList";

const filter = [
  {
    label: "Upcoming Sessions",
    value: "upcoming",
  },
  {
    label: "Ongoing Sessions",
    value: "starting",
  },
  {
    label: "Completed Sessions",
    value: "ending",
  },
];

interface AllLiveSessionsProps {
  allLiveSession?: AllLivesessions[];
}

const TotalLiveSessionsPage = ({ allLiveSession }: AllLiveSessionsProps) => {
  const [selectFilter, setSelectFilter] = useState("upcoming");

  const filteredSessions =
    allLiveSession?.filter((session) => {
      const now = new Date();

      switch (selectFilter) {
        case "upcoming":
          return convertUTCToGMT(session.startTime).isAfter(now);
        case "starting":
          return isSessionOngoingAtTime(
            session.startTime,
            session?.sessionDuration
          );
        case "ending":
          return convertUTCToGMT(session.startTime)
            .add(session.sessionDuration, "minutes")
            .isBefore(now);
        default:
          return false;
      }
    }) || [];

  return (
    <div className="rounded-xl bg-white sm:p-5 p-4">
      <div className="sm:flex block justify-between items-center lg:mb-[30px] mb-5">
        <h5 className="text-base sm:pb-0 pb-3 text-black font-font-droid font-bold">
          Total Live sessions ({filteredSessions?.length})
        </h5>
        <div className="flex sm:flex-row flex-col sm:items-center items-start sm:gap-2 gap-2">
          <Label className="text-base text-black font-font-droid font-bold w-[100px]">
            Filter By:
          </Label>
          <SelectMenu
            option={filter}
            setValue={(data: string) => setSelectFilter(data)}
            value={selectFilter}
            className="text-black placeholder:text-[#A3A3A3] text-base min-w-[200px] font-font-droid sm:h-[52px] h-[48px] font-normal"
          />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        {filteredSessions?.length > 0 ? (
          filteredSessions?.map((data, index) => {
            return <LiveSessionList data={data} key={index} />;
          })
        ) : (
          <div className="sm:px-5 sm:py-20 p-[15px] text-center">
            No Data Found
          </div>
        )}
      </div>
    </div>
  );
};

export default TotalLiveSessionsPage;
