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
import { fetchAssessment } from "@/services/apiServices/assessment";
import { fetchClientwiseMaturityLevel } from "@/services/apiServices/maturityLevel";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Loading from "../comman/Error/Loading";
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
  const [assessmentPercentage, setAssessmentPercentage] = useState(0);
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

  const { data: getCheckedmeasures, isFetching } = useQuery({
    queryKey: [QUERY_KEYS.checkedMeasuresbyAssessment, { selectAssessment }],
    queryFn: () =>
      getCheckedMeasuresByAssessment({
        userId: userID,
        clientId,
        assNumber: selectAssessment || "1",
      }),
    // enabled: !!selectAssessment,
  });

  const pillarCompleted = getCheckedmeasures?.data?.data?.find(
    (item: any) => item?.progressPR === 100
  );

  const { data: assessmentQuestionScoreLIST } = useQuery({
    queryKey: [
      QUERY_KEYS.assessmentQuestionScore,
      { pillarCompleted, userID, clientId },
    ],
    queryFn: () => assessmentQuestionScore(+userID, +clientId),
  });

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

  const { data: assessmant } = useQuery({
    queryKey: [QUERY_KEYS.assessment],
    queryFn: () => fetchAssessment(userID, clientId),
  });

  const { data: fetchClientmaturitylevel } = useQuery({
    queryKey: [QUERY_KEYS.fetchbyclientMaturity],
    queryFn: () => fetchClientwiseMaturityLevel(clientId as string),
  });

  const getMaturityLevel = (percentage: number) => {
    return (
      fetchClientmaturitylevel?.data?.find(
        (level) =>
          +percentage >= +level.rangeStart && +percentage <= level.rangeEnd
      )?.maturityLevelName || "Unknown"
    );
  };

  const selfAssData: any = {
    Introductory: [],
    Intermediate: [],
    Advanced: [],
  };

  console.log("assessmant", assessmant);

  assessmant?.data?.data?.forEach((pillar: any) => {
    const totalPoints = parseFloat(pillar.totalpoints);
    const totalMaxPoint = parseFloat(pillar.totalmaxpoint);
    const percentage = (totalPoints / totalMaxPoint) * 100;
    const level = getMaturityLevel(percentage);

    if (selfAssData[level] !== undefined) {
      selfAssData[level].push(pillar);
    }
  });

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

  console.log("assessmentDetailOptions", assessmentDetailOptions);
  const completionDate = assessmentData?.length > 0
  ? moment(new Date(assessmentData?.[0]?.createdAt || "")).format(
      "DD/MM/YYYY"
    )
  : moment(
      new Date(
        getCheckedmeasures?.data?.data?.[0]?.createdAt || ""
      )
    ).format("DD/MM/YYYY")

  return (
    <div className="">
      <div className="sm:flex block items-center justify-between sm:px-5 px-4 sm:my-5 mb-4">
        <div className="">
          <h5 className="text-base tetx-black font-nunito font-bold pb-1.5">
            Baseline Self Assessment
          </h5>
          {getCheckedmeasures?.data?.data?.length > 0 && (
            <h6 className="text-xs text-[#606060] font-bold font-calibri">
              Completion Date :{" "}
              {completionDate}
            </h6>
          )}
        </div>
        {((pillarCompleted && Role !== "employee") ||
          (assessmentDetailOptions?.length > 1 && Role !== "employee") ||
          (assessmentDetailOptions?.length > 1 &&
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
                  className="sm:text-base text-xs sm:px-6 px-2 font-calibri font-bold text-black data-[state=active]:text-[#00778B] data-[state=active]:border-[#00778B] border-b rounded-none border-transparent"
                >
                  Assessment Result
                </TabsTrigger>
                <TabsTrigger
                  value="maturityAssessment"
                  className="sm:text-base text-xs sm:px-6 px-2 font-calibri font-bold text-black data-[state=active]:text-[#00778B] data-[state=active]:border-[#00778B] border-b rounded-none border-transparent"
                >
                  {Role === "employee" ? "Action Plan" : "My Action Plan"}
                </TabsTrigger>
                {Role !== "company" && (
                  <TabsTrigger
                    value="actionitems"
                    className="sm:text-base text-xs sm:px-6 px-2 font-calibri font-bold text-black data-[state=active]:text-[#00778B] data-[state=active]:border-[#00778B] border-b rounded-none border-transparent"
                  >
                    My Action Items
                  </TabsTrigger>
                )}
              </div>
              <div className="w-full sm:order-2 order-1 px-5 sm:mb-0 mb-3 sm:flex block text-right justify-end">
                <Button className="bg-[#00778B] font-abhaya font-semibold text-sm">
                  <PDFDownloadLink
                    document={
                      <AssessmentPdf
                        // data={transformData()}
                        data={getCheckedmeasures?.data?.data}
                        companyName={userData?.query?.name}
                        assessmentData={selfAssData}
                        fetchClientmaturitylevel={
                          fetchClientmaturitylevel?.data
                        }
                        assessmentPercentage={assessmentPercentage}
                        completionDate={completionDate}
                      />
                    }
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
                setAssessmentPercentage={setAssessmentPercentage}
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
      <Loading isLoading={isFetching} />
    </div>
  );
};

export default MaturityAssessment;
