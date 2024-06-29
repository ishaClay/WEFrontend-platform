import EmployeeHeader from "../EmployeeHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import AssessmentResult from "./AssessmentResult/AssessmentResult";
import Roadmap from "./Roadmap/Roadmap";

const MaturityAssessment = () => {
  return (
    <div className="bg-white rounded-xl">
      <div className="px-5 py-2.5 sm:mb-5 mb-4">
        <EmployeeHeader title="Maturity Assessment" />
      </div>
      <div className="flex sm:px-5 px-4 sm:mb-5 mb-4">
        <div className="">
          <h5 className="text-base tetx-black font-nunito font-bold pb-1.5">
            Re-assessment 2
          </h5>
          <h6 className="text-xs text-[#606060] font-bold font-calibri">
            Completed Date : 12/03/ 2024
          </h6>
        </div>
        <div className=""></div>
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
              Roadmap
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
            mayanka
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MaturityAssessment;
