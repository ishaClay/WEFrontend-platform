import SelectMenu from "@/components/comman/SelectMenu";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import LiveSessionList from "./LiveSessionList";

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

const TotalLiveSessionsPage = () => {
  const sessionDetails = [
    {
      title: "Live session title goes here",
      subTitle: "Session subtitle goes here",
      course:
        "Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity",
      company: "Company name goes here",
      numberOfEmployee: 15,
      startDate: "10/04/2024",
      startTime: "11:00AM",
      duration: "1:30 Hours",
    },
    {
      title: "Live session title goes here",
      subTitle: "Session subtitle goes here",
      course:
        "Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity",
      company: "Company name goes here",
      numberOfEmployee: 15,
      startDate: "10/04/2024",
      startTime: "11:00AM",
      duration: "1:30 Hours",
    },
    {
      title: "Live session title goes here",
      subTitle: "Session subtitle goes here",
      course:
        "Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity",
      company: "Company name goes here",
      numberOfEmployee: 15,
      startDate: "10/04/2024",
      startTime: "11:00AM",
      duration: "1:30 Hours",
    },
  ];
  const [selectFilter, setSelectFilter] = useState("");
  return (
    <div className="rounded-xl bg-white sm:p-5 p-4">
      <div className="sm:flex block justify-between items-center lg:mb-[30px] mb-5">
        <h5 className="text-base sm:pb-0 pb-3 text-black font-abhaya font-bold">
          Total Live sessions (6)
        </h5>
        <div className="flex sm:flex-row flex-col sm:items-center items-start sm:gap-10 gap-2">
          <Label className="text-base text-black font-abhaya font-bold w-[100px]">
            Filter By :
          </Label>
          <SelectMenu
            option={filter}
            setValue={(data: string) => setSelectFilter(data)}
            value={selectFilter}
            className="text-black text-base font-abhaya sm:h-[52px] h-[48px] font-semibold"
            placeholder="Upcoming Sessions"
          />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        {sessionDetails.map((data, index) => {
          return <LiveSessionList data={data} key={index} />;
        })}
      </div>
    </div>
  );
};

export default TotalLiveSessionsPage;
