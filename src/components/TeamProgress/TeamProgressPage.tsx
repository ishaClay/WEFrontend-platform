import { AccordionOption } from "@/types";
import profile_img from "@/assets/images/face_1.jfif";
import Accordions from "../comman/Accordions";
import TeamProgresslist from "./TeamProgresslist";
import TeamProgresslistInner from "./TeamProgresslistInner";
import { Search } from "lucide-react";
import { Input } from "../ui/input";

const TeamProgressPage = () => {
  const progressList = [
    {
      image: profile_img,
      employeeName: "Action Items",
      subTitle: "Team Member",
    },
    {
      image: profile_img,
      employeeName: "Action Items",
      subTitle: "Team Member",
    },
    {
      image: profile_img,
      employeeName: "Action Items",
      subTitle: "Team Member",
    },
  ];
  const accordionItems: AccordionOption[] = progressList.map((item) => {
    return {
      title: <TeamProgresslist data={item} />,
      content: <TeamProgresslistInner />,
    };
  });
  return (
    <div className="bg-white rounded-xl mt-5">
      <div className="p-4 border-b border-[#D9D9D9]">
        <h4 className="text-base font-abhaya font-semibold">Team Progress</h4>
      </div>
      <div className="flex flex-col p-5 gap-5">
        <div className="relative flex items-center gap-2 border border-[#D9D9D9] xl:w-[550px] w-[450px] rounded-lg h-[52px] px-4 py-2">
          <Search className="text-[#A3A3A3]" />
          <Input
            className="text-[#A3A3A3] placeholder:text-[#A3A3A3] font-abhaya font-semibold border-none"
            placeholder="Search by name, level, recommended, course name etc."
          />
        </div>
        <Accordions items={accordionItems} rounded={false} />
      </div>
    </div>
  );
};

export default TeamProgressPage;
