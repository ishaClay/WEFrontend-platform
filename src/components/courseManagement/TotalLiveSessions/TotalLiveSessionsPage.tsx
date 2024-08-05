import SelectMenu from "@/components/comman/SelectMenu";
import { Label } from "@/components/ui/label";
import { AllLivesessions } from "@/types/liveSession";
import { useState } from "react";
import LiveSessionList from "./LiveSessionList";
import { isSessionOngoingAtTime } from "@/lib/utils";

const filter = [
  {
    label: "Upcoming Sessions",
    value: "upcoming",
  },
  {
    label: "Starting Sessions",
    value: "starting",
  },
  {
    label: "Ending Sessions",
    value: "ending",
  },
];

interface AllLiveSessionsProps {
  allLiveSession?: AllLivesessions[];
}

const TotalLiveSessionsPage = ({ allLiveSession }: AllLiveSessionsProps) => {
  const [selectFilter, setSelectFilter] = useState("");

  const filteredSessions = allLiveSession?.filter((session) => {
    const now = new Date();

    switch (selectFilter) {
      case "upcoming":
        return new Date(session.date) > now;
      case "starting":
        return (
          isSessionOngoingAtTime(
            session.startTime,
            session.sessionDuration,
          ) && new Date(session.date) <= now
        );
        case "ending":
          return (
            new Date(session.date) <= now &&
            !isSessionOngoingAtTime(session.startTime, session.sessionDuration)
          );
      default:
        return true;
    }
  });

  return (
    <div className="rounded-xl bg-white sm:p-5 p-4">
      <div className="sm:flex block justify-between items-center lg:mb-[30px] mb-5">
        <h5 className="text-base sm:pb-0 pb-3 text-black font-abhaya font-bold">
          Total Live sessions (6)
        </h5>
        <div className="flex sm:flex-row flex-col sm:items-center items-start sm:gap-10 gap-2">
          <Label className="text-base text-black font-abhaya font-bold w-[100px]">
            Filter By:
          </Label>
          <SelectMenu
            option={filter}
            setValue={(data: string) => setSelectFilter(data)}
            value={selectFilter}
            className="text-black placeholder:text-[#A3A3A3] text-base font-abhaya sm:h-[52px] h-[48px] font-semibold"
            placeholder="Upcoming Sessions"
          />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        {filteredSessions?.map((data, index) => {
          return <LiveSessionList data={data} key={index} />;
        })}
      </div>
    </div>
  );
};

export default TotalLiveSessionsPage;
