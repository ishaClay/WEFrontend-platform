/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PermissionContext } from "@/context/PermissionContext";
import { useAppSelector } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import {
  assessmentQuestionScore,
  getCheckedMeasuresByAssessment,
} from "@/services/apiServices/pillar";
import { MaturityAssessmentTabs } from "@/types/common";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import { utils, writeFileXLSX } from "xlsx";
import { PDFDownloadLink } from "@react-pdf/renderer";
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
import AssessmentPdf from "./AssessmentPdf";
import AssessmentResult from "./AssessmentResult/AssessmentResult";
import Assign from "./Roadmap/Assign";
import Roadmap from "./Roadmap/Roadmap";

const MaturityAssessment = () => {
  const location = useLocation();
  const Role = location?.pathname?.split("/")[1];
  const navigate = useNavigate();
  const { clientId, UserId } = useAppSelector((state) => state.user);
  const [selectAssessment, setSelectAssessment] = useState<string>();
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const { empPermissions } = useContext(PermissionContext);
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
    queryKey: [QUERY_KEYS.checkedMeasuresbyAssessment, { selectAssessment }],
    queryFn: () =>
      getCheckedMeasuresByAssessment({
        userId: userID,
        clientId,
        assNumber: selectAssessment || "1",
      }),
    // enabled: !!selectAssessment,
  });

  const { data: assessmentQuestionScoreLIST } = useQuery({
    queryKey: [QUERY_KEYS.assessmentQuestionScore],
    queryFn: () => assessmentQuestionScore(+userID, +clientId),
  });

  const pillarCompleted = getCheckedmeasures?.data?.data?.find(
    (item: any) => item?.progressPR === 100
  );

  const assessmentDetailOptions = useMemo(() => {
    const newData =
      assessmentQuestionScoreLIST?.data?.length > 0
        ? assessmentQuestionScoreLIST?.data?.map((item: any) => {
            return {
              label: item[0]?.assessmentName || "",
              date: item?.[0]?.createdAt
                ? moment(new Date(item?.[0]?.createdAt || "")).format(
                    "DD/MM/YYYY"
                  )
                : "",
              value: item[0]?.assessmentNumber?.toString() || "",
            };
          })
        : [
            {
              label: "Re-assessment 1",
              date: "",
              value: "1",
            },
          ];

    if (assessmentQuestionScoreLIST) {
      const checkData = assessmentQuestionScoreLIST?.data
        ?.at(-1)
        ?.filter((item: any) => item?.pillarProgress === 100);
      if (checkData?.length > 0) {
        newData.push({
          label: `Re-assessment ${assessmentQuestionScoreLIST?.data?.length}`,
          date: "",
          value: `${assessmentQuestionScoreLIST?.data?.length + 1}`,
        });
      }
    }
    return newData;
  }, [getCheckedmeasures, assessmentQuestionScoreLIST, pillarCompleted]);

  useEffect(() => {
    if (assessmentDetailOptions) {
      setSelectAssessment(
        assessmentDetailOptions[assessmentQuestionScoreLIST?.data?.length - 1]
          ?.value
      );
    }
  }, [assessmentQuestionScoreLIST]);

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

  const getStatus = (startDate: string, endDate: string) => {
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

  const transformData = (): {
    "Piller Name": string;
    Percentage: number;
    "Your Leval": string;
    "Selected Leval": string;
    "Action Name": string;
    "Assing Name": string;
    "Action Status": string | any;
    "Start Date": string;
    "End Date": string;
    "Document Link": string;
  }[] => {
    // Prepare the transformed data array
    const transformedData: {
      "Piller Name": string;
      Percentage: number;
      "Your Leval": string;
      "Selected Leval": string;
      "Action Name": string;
      "Assing Name": string;
      "Action Status": string | any;
      "Start Date": string;
      "End Date": string;
      "Document Link": string;
    }[] = [];

    // Iterate over each pillar
    getCheckedmeasures?.data?.data.forEach((pillar: any) => {
      // Extract pillar details
      const pillarName = pillar.pillarName;
      const percentage = pillar.progressPR;
      const yourLeval = pillar.userMaturityLevel[0]?.level || "";
      const selectedLeval = pillar.userMaturityLevel[0]?.nextLevel || "";

      // Iterate over each measure
      pillar.measures.forEach((measure: any) => {
        // Extract measure details
        const actionName = measure.measure;
        const actionStatus = getStatus(measure?.startDate, measure?.endDate);
        const assingName = measure.measureHistory.employeeId
          ? measure.measureHistory.employeeId.name
          : "";
        const startDate = measure?.startDate
          ? moment(new Date(measure?.startDate)).format("DD/MM/YYYY")
          : "";
        const endDate = measure?.endDate
          ? moment(new Date(measure?.endDate)).format("DD/MM/YYYY")
          : "";
        const documentLink = measure?.evidence || "";

        // Push transformed item to the result array
        transformedData.push({
          "Piller Name": pillarName,
          Percentage: percentage,
          "Your Leval": yourLeval,
          "Selected Leval": selectedLeval,
          "Action Name": actionName,
          "Assing Name": assingName,
          "Action Status": actionStatus,
          "Start Date": startDate,
          "End Date": endDate,
          "Document Link": documentLink,
        });
      });

      // Handle case for measures with empty names
      if (pillar.measures.length === 0) {
        transformedData.push({
          "Piller Name": pillarName,
          Percentage: percentage,
          "Your Leval": yourLeval,
          "Selected Leval": selectedLeval,
          "Action Name": "",
          "Assing Name": "",
          "Action Status": "",
          "Start Date": "",
          "End Date": "",
          "Document Link": "",
        });
      }
    });

    return transformedData;
  };

  // const exportData = getCheckedmeasures?.data?.data?.map((item: any) => {
  //   return {
  //     "Piller Name": item?.pillarName,
  //     Percentage: item?.progressPR,
  //     "Your Leval": item?.userMaturityLevel?.[0]?.level,
  //     "Selected Leval": item?.userMaturityLevel?.[0]?.nextLevel,
  //     "Action Name": item?.measures
  //       ?.filter((measuresData: any) => measuresData?.measure)
  //       ?.map((measures: any) => measures?.measure)
  //       .join(", "),
  //     "Assing Name": item?.measures
  //       ?.filter((measuresData: any) => measuresData?.employeeId?.name)
  //       ?.map((measures: any) => measures?.employeeId?.name)
  //       .join(", "),
  //     "Action Status":
  //       item?.measures
  //         ?.filter((measuresData: any) =>
  //           getStatus(measuresData?.startDate, measuresData?.endDate)
  //         )
  //         ?.map((measures: any) =>
  //           getStatus(measures?.startDate, measures?.endDate)
  //         )
  //         .join(", ") || "",
  //     "Start Date":
  //       item?.measures
  //         ?.filter((measuresData: any) => measuresData?.startDate)
  //         ?.map((measures: any) =>
  //           moment(new Date(measures?.startDate)).format("DD/MM/YYYY")
  //         )
  //         .join(", ") || "",
  //     "End Date": item?.measures
  //       ?.filter((measuresData: any) => measuresData?.endDate)
  //       ?.map((measures: any) =>
  //         moment(new Date(measures?.endDate)).format("DD/MM/YYYY")
  //       )
  //       .join(", "),
  //     "Document Link": item?.measures
  //       ?.filter((measuresData: any) => measuresData?.evidence)
  //       ?.map((measures: any) => measures?.evidence)
  //       .join(", "),
  //   };
  // });
  // const exportFile = useCallback(() => {
  //   if (exportData?.length > 0) {
  //     // const ws = utils.json_to_sheet(exportData);
  //     // const wb = utils.book_new();
  //     // utils.book_append_sheet(wb, ws, "Sheet1");
  //     // const columnWidths = [
  //     //   { wch: 25 },
  //     //   { wch: 10 },
  //     //   { wch: 15 },
  //     //   { wch: 15 },
  //     //   { wch: 50 },
  //     //   { wch: 30 },
  //     //   { wch: 30 },
  //     //   { wch: 25 },
  //     //   { wch: 25 },
  //     //   { wch: 50 },
  //     // ];
  //     // ws["!cols"] = columnWidths;
  //     // writeFileXLSX(wb, "Action Plan.xlsx");
  //   }
  // }, [exportData]);

  return (
    <div className="">
      <div className="sm:flex block items-center justify-between sm:px-5 px-4 sm:my-5 mb-4">
        <div className="">
          <h5 className="text-base tetx-black font-nunito font-bold pb-1.5">
            Baseline Self Assessment
          </h5>
          {getCheckedmeasures?.data?.data?.length > 0 && (
            <h6 className="text-xs text-[#606060] font-bold font-calibri">
              Completed Date :{" "}
              {assessmentData?.length > 0
                ? moment(new Date(assessmentData?.[0]?.createdAt || "")).format(
                    "DD/MM/YYYY"
                  )
                : moment(
                    new Date(
                      getCheckedmeasures?.data?.data?.[0]?.createdAt || ""
                    )
                  ).format("DD/MM/YYYY")}
            </h6>
          )}
        </div>
        {((pillarCompleted && Role !== "employee") ||
          (assessmentQuestionScoreLIST?.data?.length > 1 &&
            Role !== "employee") ||
          (assessmentQuestionScoreLIST?.data?.length > 1 &&
            Role === "employee" &&
            empPermissions?.retakeSelfAssessment)) && (
          <div className="">
            <Select
              onValueChange={(e) => {
                const find =
                  e === "baseline self assessment"
                    ? true
                    : !!assessmentDetailOptions?.find(
                        (item: any) => item.value === e
                      )?.date;
                setSelectAssessment(e);
                if (find) {
                  console.log("e", find);
                } else {
                  navigate(`/question`);
                }
              }}
              value={selectAssessment}
              defaultValue={selectAssessment}
            >
              <SelectTrigger
                className={`bg-white  w-[280px] text-black border-none bg-transparent text-xs font-nunito font-bold px-0 [&>span]:w-[280px]`}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className={"bg-white max-h-[250px] overflow-auto"}>
                {/* <SelectItem value="baseline self assessment">
                  Baseline Self Assessment
                  <p>
                    {moment(
                      new Date(
                        getCheckedmeasures?.data?.data?.[0]?.createdAt || ""
                      )
                    ).format("DD/MM/YYYY")}
                  </p>
                </SelectItem> */}
                {assessmentDetailOptions &&
                  assessmentDetailOptions?.map((item: any, index: number) => (
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
                  <PDFDownloadLink
                    document={<AssessmentPdf data={transformData()} />}
                    fileName="Action-Items.pdf"
                  >
                    {({ loading }: any) =>
                      loading ? "Loading document..." : "Export"
                    }
                  </PDFDownloadLink>
                  {/* Export */}
                </Button>
              </div>
            </TabsList>
            {/* {openPdf && <PDFViewer
              width="100%"
              height="100%"
              style={{ border: 'none' }}
              showToolbar
            >
              <AssessmentPdf
                      data={exportData}
                    />
            </PDFViewer>} */}
            {/* {openPdf && <PDFDownloadLink
              document={<AssessmentPdf data={transformData()} />}
              fileName="report.pdf"
            >
              {({ loading }) => (loading ? 'Loading document...' : 'Download PDF')}
            </PDFDownloadLink>} */}
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
              {Role === "employee" && !isEdit ? (
                <Assign
                  setStep={() => {}}
                  setIsEdit={setIsEdit}
                  selectAssessment={selectAssessment || "1"}
                />
              ) : (
                <Roadmap
                  showButton={showButton}
                  isEdit={isEdit}
                  setIsEdit={setIsEdit}
                  selectAssessment={selectAssessment || "1"}
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
