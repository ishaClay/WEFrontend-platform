import { useState } from "react";
import EmployeeHeader from "../EmployeeHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import AssessmentResult from "./AssessmentResult/AssessmentResult";
import Roadmap from "./Roadmap/Roadmap";
import SelectMenu from "../comman/SelectMenu";
import AccordionHome from "./Roadmap/HomeBlock/AccordionHome";

const assessmentDetailOptions = [
  {
    label: "Baseline Self Assessment",
    value: "baseline self assessment",
  },
  {
    label: "Re-assessment 1",
    value: "re-assessment 1",
  },
  {
    label: "Re-assessment 2",
    value: "re-assessment 2",
  },
];

const MaturityAssessment = () => {
  const [selectAssessment, setSelectAssessment] = useState("");
  return (
    <div className="">
      <div className="sm:flex block gap-3 justify-between items-center sm:px-5 px-4 sm:mb-5 mb-4">
        <div className="">
          <h5 className="text-base tetx-black font-nunito font-bold pb-1.5">
            Re-assessment 2
          </h5>
          <h6 className="text-xs text-[#606060] font-bold font-calibri">
            Completed Date : 12/03/ 2024
          </h6>
        </div>
        <div className="">
          <SelectMenu
            option={assessmentDetailOptions}
            setValue={(data: string) => setSelectAssessment(data)}
            value={selectAssessment}
            className="w-[250px] text-black border-none bg-transparent text-xs font-nunito font-bold px-0"
            itemClassName="text-base font-medium font-abhaya bg-transparent"
            placeholder="Previous Assessment Details"
          />
        </div>
      </div>
      <div className="bg-white rounded-xl">
        <div className="px-5 py-2.5 sm:mb-5 mb-4">
          <EmployeeHeader title="Maturity Assessment" />
        </div>
        <div className="">
          <Tabs defaultValue="assessmentresult" className="w-full">
            <TabsList className="p-0">
              <TabsTrigger
                value="assessmentresult"
                className="sm:text-base text-xs sm:px-6 px-2 font-nunito font-bold text-black data-[state=active]:text-[#00778B] data-[state=active]:border-[#00778B] border-b rounded-none border-transparent"
              >
                Assessment Result
              </TabsTrigger>
              <TabsTrigger
                value="roadmap"
                className="sm:text-base text-xs sm:px-6 px-2 font-nunito font-bold text-black data-[state=active]:text-[#00778B] data-[state=active]:border-[#00778B] border-b rounded-none border-transparent"
              >
                My Action Plan
              </TabsTrigger>
              <TabsTrigger
                value="actionitems"
                className="sm:text-base text-xs sm:px-6 px-2 font-nunito font-bold text-black data-[state=active]:text-[#00778B] data-[state=active]:border-[#00778B] border-b rounded-none border-transparent"
              >
                My Action Items
              </TabsTrigger>
            </TabsList>
            <TabsContent value="assessmentresult" className="lg:p-5 p-4 mt-0">
              <AssessmentResult />
            </TabsContent>
            <TabsContent value="roadmap" className="lg:p-5 p-4 mt-0">
              <Roadmap />
            </TabsContent>
            <TabsContent value="actionitems" className="lg:p-5 p-4 mt-0">
              <AccordionHome />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default MaturityAssessment;
