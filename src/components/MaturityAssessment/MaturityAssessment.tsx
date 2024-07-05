import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import AssessmentResult from "./AssessmentResult/AssessmentResult";
import Roadmap from "./Roadmap/Roadmap";
import SelectMenu from "../comman/SelectMenu";
import ActionItems from "./ActionItems/ActionItems";
import { MaturityAssessmentTabs } from "@/types/common";
import { Button } from "../ui/button";

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
  const [activeTab, setActiveTab] =
    useState<MaturityAssessmentTabs>("assessmentresult");
  return (
    <div className="">
      <div className="sm:flex block items-center justify-between sm:px-5 px-4 sm:my-5 my-4">
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
        <div className="">
          <Tabs
            defaultValue="assessmentresult"
            className="w-full"
            value={activeTab}
            onValueChange={(val) => setActiveTab(val as MaturityAssessmentTabs)}
          >
            <TabsList className="pt-5 flex justify-between sm:items-center items-start sm:flex-row flex-col h-auto">
              <div className="flex items-center sm:order-1 order-2">
                <TabsTrigger
                  value="assessmentresult"
                  className="sm:text-base text-xs sm:px-6 px-2 font-nunito font-bold text-black data-[state=active]:text-[#00778B] data-[state=active]:border-[#00778B] border-b rounded-none border-transparent"
                >
                  Assessment Result
                </TabsTrigger>
                <TabsTrigger
                  value="maturityAssessment"
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
              </div>
              <div className="w-full sm:order-2 order-1 px-5 sm:mb-0 mb-3 sm:flex block text-right justify-end">
                <Button className="bg-[#00778B] font-abhaya font-semibold text-sm">
                  Export
                </Button>
              </div>
            </TabsList>
            <TabsContent
              value="assessmentresult"
              className="lg:p-5 p-[15px] mt-0"
            >
              <AssessmentResult chnageTab={setActiveTab} />
            </TabsContent>
            <TabsContent
              value="maturityAssessment"
              className="lg:p-5 p-[15px] mt-0"
            >
              <Roadmap />
            </TabsContent>
            <TabsContent value="actionitems" className="lg:p-5 p-[15px] mt-0">
              <ActionItems />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default MaturityAssessment;
