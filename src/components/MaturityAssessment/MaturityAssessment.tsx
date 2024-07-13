import { MaturityAssessmentTabs } from "@/types/common";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ActionItems from "./ActionItems/ActionItems";
import AssessmentResult from "./AssessmentResult/AssessmentResult";
import Roadmap from "./Roadmap/Roadmap";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants";
import { useAppSelector } from "@/hooks/use-redux";
import moment from "moment";
import { assessmentQuestionScore, getCheckedMeasures } from "@/services/apiServices/pillar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";


const MaturityAssessment = () => {
  const location = useLocation();
  const Role = location?.pathname?.split("/")[1];
  console.log("++++++++++", Role);
  const navigate = useNavigate();
  const { clientId, UserId } = useAppSelector((state) => state.user);
  const [selectAssessment, setSelectAssessment] = useState<string>();
  const [activeTab, setActiveTab] =
  useState<MaturityAssessmentTabs>("assessmentresult");
  
  const { data: getCheckedmeasures } = useQuery({
    queryKey: [QUERY_KEYS.checkedMeasures],
    queryFn: () => getCheckedMeasures(UserId, clientId),
    enabled: true,
  });

  const { data: assessmentQuestionScoreLIST } = useQuery({
    queryKey: [QUERY_KEYS.assessmentQuestionScore],
    queryFn: () => assessmentQuestionScore(+UserId)
  });

  const pillarCompleted = getCheckedmeasures?.data?.data?.find((item:any) => item?.progressPR === 100)
  const newData = assessmentQuestionScoreLIST?.data || {}
  let date1 = Object?.keys(newData)?.map((key:any) => [newData[key]])?.filter((item:any) => item)
  console.log("123", date1?.map((it:any) => it)?.map((t:any) => t));
  
  const assessmentDetailOptions = assessmentQuestionScoreLIST?.data?.map((item:any, i:number) => {
    return {
      label: `Re-assessment ${i + 1}`,
      date:   moment(new Date(item?.[0]?.createdAt || "")).format("DD/MM/YYYY"),
      value:  String(i + 1),
    }
  })
  const assessmentData = selectAssessment && assessmentQuestionScoreLIST?.data?.filter((_:any, i:number) => i + 1 == +selectAssessment)?.[0] || []; 


  console.log("assessmentQuestionScoreLIST?.data", );
  
  
  
  return (
    <div className="">
      <div className="sm:flex block items-center justify-between sm:px-5 px-4 sm:my-5 my-4">
        <div className="">
          <h5 className="text-base tetx-black font-nunito font-bold pb-1.5">
            Baseline Self Assessment
          </h5>
          <h6 className="text-xs text-[#606060] font-bold font-calibri">
            Completed Date : {getCheckedmeasures?.data?.data ? moment(new Date(getCheckedmeasures?.data?.data?.[0]?.createdAt || "")).format("DD/MM/YYYY") : ""}
          </h6>
        </div>
        {pillarCompleted && <div className="">
          <Select onValueChange={(e) => {setSelectAssessment(e); e === "baseline self assessment" ? navigate(`/question`) : ""}} value={selectAssessment} defaultValue={selectAssessment}>
            <SelectTrigger className={`bg-white outline-none w-[250px] text-black border-none bg-transparent text-xs font-nunito font-bold px-0`}>
              <SelectValue placeholder={"Previous Assessment Details"} />
            </SelectTrigger>
            <SelectContent
              className={"bg-white max-h-[250px] overflow-auto"}
            >
              <SelectItem value="baseline self assessment">Baseline Self Assessment
                <p>{moment(new Date(getCheckedmeasures?.data?.data?.[0]?.createdAt || "")).format("DD/MM/YYYY")}</p>
              </SelectItem>
              {assessmentDetailOptions?.map((item:any, index: number) => (
                <SelectItem
                  key={index}
                  value={item.value}
                  className={`text-base font-medium font-abhaya bg-transparent`}
                >
                  {item.label}
                  {item.date &&<p>{item.date}</p>}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>}
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
                {Role !== "company" && (
                  <TabsTrigger
                    value="actionitems"
                    className="sm:text-base text-xs sm:px-6 px-2 font-nunito font-bold text-black data-[state=active]:text-[#00778B] data-[state=active]:border-[#00778B] border-b rounded-none border-transparent"
                  >
                    My Action Items
                  </TabsTrigger>
                )}
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
              <AssessmentResult assessmentData={assessmentData} chnageTab={setActiveTab} />
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
