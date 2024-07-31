import { useAppSelector } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import {
  assessmentQuestionScore,
  getCheckedMeasures,
} from "@/services/apiServices/pillar";
import { MaturityAssessmentTabs } from "@/types/common";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useCallback, useState } from "react";
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
import { utils, writeFileXLSX } from "xlsx";

const MaturityAssessment = () => {
  const location = useLocation();
  const Role = location?.pathname?.split("/")[1];
  console.log("++++++++++", Role);
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

  console.log("getEmployeeWnList 1212", getCheckedmeasures?.data?.data);

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

    const getStatus = (startDate: string, endDate:string) => {
      if (
        moment(new Date(startDate), "YYYY-MM-DD").isSameOrBefore(
          moment(new Date(), "YYYY-MM-DD")
        ) &&
        moment(new Date(endDate), "YYYY-MM-DD").isSameOrAfter(
          moment(new Date(), "YYYY-MM-DD")
        )
      ) {
        return "On time";
      } else if (
        moment(new Date(), "YYYY-MM-DD").isAfter(
          moment(new Date(endDate), "YYYY-MM-DD")
        )
      ) {
        return "Delay";
      } else if (
        moment(new Date(startDate), "YYYY-MM-DD").isAfter(
          moment(new Date(), "YYYY-MM-DD")
        )
      ) {
        return "In Progress";
      }
    };

    const exportData = getCheckedmeasures?.data?.data?.map((item:any) => {
      return {
        pillerName: item?.pillarName,
        percentage: item?.progressPR,
        yourLeval: item?.userMaturityLevel?.[0]?.level,
        selectedLeval: item?.userMaturityLevel?.[0]?.nextLevel,
        actionName: item?.measures?.filter((measuresData:any) => measuresData?.measure)?.map((measures:any) => measures?.measure).join(","),
        assingName: item?.measures?.filter((measuresData:any) => measuresData?.employeeId?.name)?.map((measures:any) => measures?.employeeId?.name).join(","),
        actionStatus: item?.measures?.filter((measuresData:any) => getStatus(measuresData?.startDate, measuresData?.endDate))?.map((measures:any) => getStatus(measures?.startDate, measures?.endDate)).join(","),
        startDate: item?.measures?.filter((measuresData:any) => measuresData?.startDate)?.map((measures:any) => moment(new Date(measures?.startDate)).format("DD/MM/YYYY")).join(","),
        endDate: item?.measures?.filter((measuresData:any) => measuresData?.endDate)?.map((measures:any) => moment(new Date(measures?.endDate)).format("DD/MM/YYYY")).join(","),
        documentLink: item?.measures?.filter((measuresData:any) => measuresData?.evidence)?.map((measures:any) => measures?.evidence).join(","),
      }
    })
    const exportFile = useCallback(() => {
      if (exportData?.length > 0) {
        // Convert JSON to worksheet
        const ws = utils.json_to_sheet(exportData);
        const wb = utils.book_new();
        
        // Add the worksheet to the workbook
        utils.book_append_sheet(wb, ws, 'Sheet1');
    
        // Adjust column widths (you can modify these widths as needed)
        const columnWidths = [
          { wch: 20 }, // width for 'pillerName'
          { wch: 15 }, // width for 'percentage'
          { wch: 20 }, // width for 'yourLeval'
          { wch: 20 }, // width for 'selectedLeval'
          { wch: 30 }, // width for 'actionName'
          { wch: 25 }, // width for 'assingName'
          { wch: 20 }, // width for 'actionStatus'
          { wch: 15 }, // width for 'startDate'
          { wch: 15 }, // width for 'endDate'
          { wch: 25 }, // width for 'documentLink'
        ];
    
        // Apply column widths
        ws['!cols'] = columnWidths;
    
        // Write to file
        writeFileXLSX(wb, "fileName.xlsx");
      }
    }, [exportData]);
    // const exportFile = useCallback(() => {
    //   if (exportData?.length > 0) {
    //     const ws = utils.json_to_sheet(exportData);
    //     const wb = utils.book_new();
    //     utils.book_append_sheet(wb, ws);
    //     writeFileXLSX(wb, "fileName.xlsx");
    //   }
    // }, [exportData]);

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
                <Button className="bg-[#00778B] font-abhaya font-semibold text-sm" onClick={exportFile}>
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
