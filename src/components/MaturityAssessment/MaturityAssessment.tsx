import { useAppSelector } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import {
  assessmentQuestionScore,
  getCheckedMeasures,
} from "@/services/apiServices/pillar";
import { MaturityAssessmentTabs } from "@/types/common";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ActionItems from "./ActionItems/ActionItems";
import AssessmentResult from "./AssessmentResult/AssessmentResult";
import Roadmap from "./Roadmap/Roadmap";
import Assign from "./Roadmap/Assign";

const MaturityAssessment = () => {
  const location = useLocation();
  const Role = location?.pathname?.split("/")[1];
  const navigate = useNavigate();
  const { clientId, UserId } = useAppSelector((state) => state.user);
  const [selectAssessment, setSelectAssessment] = useState<string>();
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const [isEdit, setIsEdit] = useState(false);
  const [activeTab, setActiveTab] =
    useState<MaturityAssessmentTabs>("assessmentresult");
  const userID =
    userData?.query?.role === "4"
      ? userData?.company?.userDetails?.id
      : UserId
      ? +UserId
      : userData?.query
      ? userData?.query?.id
      : userData?.id;

  const { data: getCheckedmeasures } = useQuery({
    queryKey: [QUERY_KEYS.checkedMeasures],
    queryFn: () => getCheckedMeasures(userID, clientId),
    enabled: true,
  });

  const { data: assessmentQuestionScoreLIST } = useQuery({
    queryKey: [QUERY_KEYS.assessmentQuestionScore],
    queryFn: () => assessmentQuestionScore(+userID),
  });

  const pillarCompleted = getCheckedmeasures?.data?.data?.find(
    (item: any) => item?.progressPR === 100
  );
  const newData = assessmentQuestionScoreLIST?.data || {};
  const date1 = Object?.keys(newData)
    ?.map((key: any) => [newData[key]])
    ?.filter((item: any) => item);
  console.log(
    "123",
    date1?.map((it: any) => it)?.map((t: any) => t)
  );

  const assessmentDetailOptions = assessmentQuestionScoreLIST?.data?.map(
    (item: any, i: number) => {
      return {
        label: `Re-assessment ${i + 1}`,
        date: item?.[0]?.createdAt
          ? moment(new Date(item?.[0]?.createdAt || "")).format("DD/MM/YYYY")
          : "",
        value: String(i + 1),
      };
    }
  );
  const assessmentData =
    (selectAssessment &&
      assessmentQuestionScoreLIST?.data?.filter(
        (_: any, i: number) => i + 1 == +selectAssessment
      )?.[0]) ||
    [];

  const showButton =
    (getCheckedmeasures?.data?.data?.length > 0 &&
      getCheckedmeasures?.data?.data.reduce((acc: number, item: any) => {
        return acc + item?.total;
      }, 0)) ||
    0;

  return (
    <div className="">
      <div className="sm:flex block items-center justify-between sm:px-5 px-4 sm:my-5 mb-4">
        <div className="">
          <h5 className="text-base tetx-black font-nunito font-bold pb-1.5">
            Baseline Self Assessment
          </h5>
          <h6 className="text-xs text-[#606060] font-bold font-calibri">
            Completed Date :{" "}
            {getCheckedmeasures?.data?.data?.length > 0
              ? moment(
                  new Date(getCheckedmeasures?.data?.data?.[0]?.createdAt || "")
                ).format("DD/MM/YYYY")
              : ""}
          </h6>
        </div>
        {((pillarCompleted && Role !== "employee") ||
          (pillarCompleted &&
            Role === "employee" &&
            userData?.query?.retakeSelfAssessment)) && (
          <div className="">
            <Select
              onValueChange={(e) => {
                setSelectAssessment(e);
                e === "baseline self assessment" ? navigate(`/question`) : "";
              }}
              value={selectAssessment}
              defaultValue={selectAssessment}
            >
              <SelectTrigger
                className={`bg-white outline-none w-[250px] text-black border-none bg-transparent text-xs font-nunito font-bold px-0`}
              >
                <SelectValue placeholder={"Previous Assessment Details"} />
              </SelectTrigger>
              <SelectContent className={"bg-white max-h-[250px] overflow-auto"}>
                <SelectItem value="baseline self assessment">
                  Baseline Self Assessment
                  <p>
                    {moment(
                      new Date(
                        getCheckedmeasures?.data?.data?.[0]?.createdAt || ""
                      )
                    ).format("DD/MM/YYYY")}
                  </p>
                </SelectItem>
                {assessmentDetailOptions?.map((item: any, index: number) => (
                  <SelectItem
                    key={index}
                    value={item.value}
                    className={`text-base font-medium font-abhaya bg-transparent`}
                  >
                    {item.label}
                    {item.date && <p>{item.date}</p>}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
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
                  {Role === "employee" ? "Action Plan" : "My Action Plan"}
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
              <AssessmentResult
                assessmentData={assessmentData}
                chnageTab={setActiveTab}
                showButton={showButton}
                setIsEdit={setIsEdit}
              />
            </TabsContent>
            <TabsContent
              value="maturityAssessment"
              className="lg:p-5 p-[15px] mt-0"
            >
              {Role === "employee" ? (
                <Assign setStep={() => {}} setIsEdit={setIsEdit} />
              ) : (
                <Roadmap
                  showButton={showButton}
                  isEdit={isEdit}
                  setIsEdit={setIsEdit}
                />
              )}
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
