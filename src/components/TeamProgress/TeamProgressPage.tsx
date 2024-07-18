import { QUERY_KEYS } from "@/lib/constants";
import { getEmployeeProgress } from "@/services/apiServices/member";
import { AccordionOption } from "@/types";
import { EmployeeProgreeResponse } from "@/types/Invition";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useState } from "react";
import Accordions from "../comman/Accordions";
import Loader from "../comman/Loader";
import { Input } from "../ui/input";
import TeamProgresslist from "./TeamProgresslist";
import TeamProgresslistInner from "./TeamProgresslistInner";

const TeamProgressPage = () => {
  const [search, setSearch] = useState("");
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const companyId = userData?.query?.detailsid;
  const { data, isPending } = useQuery<EmployeeProgreeResponse>({
    queryKey: [QUERY_KEYS.getEmployeeProgress, { search }],
    queryFn: () =>
      getEmployeeProgress({ id: companyId, keyword: search, status: "" }),
  });

  console.log("data", data);

  const accordionItems: AccordionOption[] =
    (data?.data?.employee &&
      data?.data?.employee.map((item) => {
        return {
          title: <TeamProgresslist data={item} />,
          content: <TeamProgresslistInner data={item} />,
        };
      })) ||
    [];
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
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {isPending ? (
          <Loader />
        ) : (
          <Accordions items={accordionItems} rounded={false} />
        )}
      </div>
    </div>
  );
};

export default TeamProgressPage;
