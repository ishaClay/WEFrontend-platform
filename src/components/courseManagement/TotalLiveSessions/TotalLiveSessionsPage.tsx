import SelectMenu from "@/components/comman/SelectMenu";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { List, NotepadText } from "lucide-react";
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
    <div className="rounded-xl bg-white">
      <div className="flex justify-between items-center sm:px-6 p-4 sm:py-5 border-b border-[#D9D9D9]">
        <h5 className="text-base font-abhaya text-black font-bold">
          Schedule Live Session
        </h5>

        <div className="flex items-center gap-7">
          <Button className="bg-[#00778B] uppercase text-base">Add New</Button>
          <div className="flex rounded-md bg-white border border-[#D9D9D9] overflow-hidden">
            <Button className="uppercase text-base rounded-none bg-transparent text-[#A3A3A3] border-e border-[#D9D9D9] hover:bg-[#00778B] hover:text-white">
              <NotepadText />
            </Button>
            <Button className="uppercase text-base rounded-none bg-transparent text-[#A3A3A3] hover:bg-[#00778B] hover:text-white">
              <List />
            </Button>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="sm:flex block justify-between items-center lg:mb-[30px] mb-5">
          <h5 className="text-base sm:pb-0 pb-3 text-black font-abhaya font-bold">
            Total Live sessions (6)
          </h5>
          <div className="flex items-center gap-10">
            <Label className="text-base text-black font-abhaya font-bold w-[100px]">
              Filter By :
            </Label>
            <SelectMenu
              option={filter}
              setValue={(data: string) => setSelectFilter(data)}
              value={selectFilter}
              className="text-black text-base font-abhaya h-[52px] font-semibold"
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
    </div>
  );
};

export default TotalLiveSessionsPage;
