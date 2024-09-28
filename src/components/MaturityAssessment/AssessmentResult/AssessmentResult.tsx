import MaturityLevelModel from "@/components/Models/MaturityLevelModel";
import Loading from "@/components/comman/Error/Loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppSelector } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { getImages } from "@/lib/utils";
import {
  fetchAssessment,
  getAllassessment,
} from "@/services/apiServices/assessment";
import { enumUpadate } from "@/services/apiServices/enum";
import { fetchClientwiseMaturityLevel } from "@/services/apiServices/maturityLevel";
import { UserRole } from "@/types/UserRole";
import { MaturityAssessmentTabs } from "@/types/common";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";

type AssessmentResultProps = {
  chnageTab: (val: MaturityAssessmentTabs) => void;
  assessmentData: any;
  showButton: number;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  setAssessmentPercentage: React.Dispatch<React.SetStateAction<number>>;
};

const AssessmentResult = ({
  chnageTab,
  assessmentData,
  showButton,
  setIsEdit,
  setAssessmentPercentage,
}: AssessmentResultProps) => {
  const queryClient = useQueryClient();
  const { clientId, UserId } = useAppSelector((state) => state.user);
  const [isOpen, setIsOpen] = React.useState<number | null>(null);
  const [pillerName, setPillerName] = React.useState<string>("");

  const pathStatus = JSON.parse(localStorage.getItem("path") as string);
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const userID =
    userData?.query?.role === "4"
      ? userData?.company?.userDetails?.id
      : UserId
      ? +UserId
      : userData?.query
      ? userData?.query?.id
      : userData?.id;

  const { data: assessmant, isPending } = useQuery({
    queryKey: [QUERY_KEYS.assessment],
    queryFn: () => fetchAssessment(userID, clientId),
  });

  const { data: allassessmant } = useQuery({
    queryKey: [QUERY_KEYS.totalAssessment],
    queryFn: () => getAllassessment(userID, clientId),
  });

  const path = 4 + 1;
  const { mutate: EnumUpadate }: any = useMutation({
    mutationFn: () => enumUpadate({ path: path.toString() }, userID),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.enumUpadateList],
      });
    },
  });
  const { data: fetchClientmaturitylevel } = useQuery<any>({
    queryKey: [QUERY_KEYS.fetchbyclientMaturity, { clientId }],
    queryFn: () => fetchClientwiseMaturityLevel(clientId as string),
  });

  const findMaturityLevel = (score: number) => {
    if (!score) return;
    for (const level of fetchClientmaturitylevel?.data || []) {
      if (score >= level?.rangeStart && score <= level?.rangeEnd) {
        return level;
      }
    }
    return null;
  };

  const handleMaturity = () => {
    EnumUpadate(path);
    // navigate("/company/my-action-plans");
    setIsEdit(true);
    chnageTab("maturityAssessment");
  };

  const points =
    assessmentData?.length &&
    assessmentData.reduce(
      (ass: { maxPoint: number; totalPoint: number }, curr: any) => {
        return {
          maxPoint: ass.maxPoint + +curr.totalmaxpoint,
          totalPoint: ass.totalPoint + +curr.totalpoints,
        };
      },
      {
        maxPoint: 0,
        totalPoint: 0,
      }
    );

  const score =
    assessmentData?.length > 0
      ? ((points?.totalPoint / points?.maxPoint) * 100).toFixed(0)
      : (
          (+allassessmant?.data?.data?.avTotalpoints /
            +allassessmant?.data?.data?.avTotalmaxpoint) *
          100
        ).toFixed(0);

  const setScore = isNaN(Number(score)) ? 0 : score;

  console.log("🚀 ~ setScore:", setScore);
  const currentLavel = findMaturityLevel(Number(setScore));

  useEffect(() => {
    setAssessmentPercentage(+setScore);
  }, [setScore]);

  const data = {
    labels: ["Introductory", "Intermediate", "Advanced"],
    datasets: [
      {
        label: "Poll",
        data: [setScore, 100 - Number(setScore)],
        backgroundColor: [currentLavel?.color, "#D1D1D1"],
        borderColor: [currentLavel?.color, "#D1D1D1"],
      },
    ],
  };

  const textCenter = {
    id: "textCenter",
    beforeDatasetDraw(chart: any) {
      const { ctx, data } = chart;
      ctx.save();
      ctx.font = "bold 25px sans-serif";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        `${Math.round(data.datasets[0].data[0])}%`,
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y
      );
      ctx.restore();
    },
  };
  const options = {
    cutout: "80%",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
        callbacks: {
          label: function (context: any) {
            let label = context.label || "";
            if (label) {
              label += ": ";
            }
            label += Math.round(context.parsed) + "%";
            return label;
          },
        },
      },
    },
    hover: {
      mode: undefined,
    },
  };

  const Labels = () => (
    <>
      {fetchClientmaturitylevel &&
        fetchClientmaturitylevel?.data?.map((label: any, index: number) => {
          let colorClass, opacityClass;
          if (index === 0) {
            colorClass = `bg-gradient-to-r from-[${label?.color}] from-10% via-[${label?.color}] via-10% to-transparent to-80%`;
            opacityClass = "bg-opacity-25";
          } else if (index === 1) {
            colorClass = `bg-gradient-to-r from-[${label?.color}] from-10% via-[${label?.color}] via-10% to-transparent to-80%`;
            opacityClass = "bg-opacity-50";
          } else {
            colorClass = `bg-gradient-to-r from-[${label?.color}] from-10% via-[${label?.color}] via-10% to-transparent to-80%`;
            opacityClass = "bg-opacity-75";
          }
          return (
            <div
              key={index}
              className="text-sm flex items-center relative mb-10 h-6"
            >
              <div
                className={`w-[60px] h-[25px] left-0 top-0 ${colorClass} ${opacityClass} rounded-l-lg rounded-r-none`}
                style={{
                  background: `linear-gradient(to right, ${label?.color} 10%, #ffffff)`,
                }}
              ></div>
              <div className="sm:text-base text-sm text-black font-droid rounded-r-lg ms-[-30px]">
                {label?.maturityLevelName}
                {/* <span className="font-semibold ml-2">{`(${label?.rangeStart} - ${label?.rangeEnd})`}</span> */}
              </div>
            </div>
          );
        })}
      <div className="sm:mb-[35px] mb-5">
        <p className="font-droid font-bold text-base text-[#3A3A3A] leading-[18.88px]">
          {/* Total Score - */}
          {/* <span className="font-droid font-bold text-[#3A3A3A] text-[42px] leading-[52px]">
            {assessmentData?.length > 0
              ? points?.totalPoint || 0
              : allassessmant?.data?.data?.avTotalpoints || 0}
          </span>
          <span className="font-droid font-extrabold text-base leading-[18.88px] text-[#64A70B]">
            /
            {assessmentData?.length > 0
              ? points?.maxPoint
              : allassessmant?.data?.data?.avTotalmaxpoint}
          </span> */}
        </p>
      </div>
    </>
  );

  useEffect(() => {
    if (fetchClientmaturitylevel) {
      document.documentElement.style.setProperty(
        "--introductory-pillar",
        fetchClientmaturitylevel?.data?.[0]?.color
      );
      document.documentElement.style.setProperty(
        "--intermediate-pillar",
        fetchClientmaturitylevel?.data?.[1]?.color
      );
      document.documentElement.style.setProperty(
        "--advanced-pillar",
        fetchClientmaturitylevel?.data?.[2]?.color
      );
    }
  }, [fetchClientmaturitylevel]);

  return (
    <div className="text-[16px] leading-[19.53px] font-normal text-darkslategray-100 font-droid">
      <div className="">
        <h4 className="md:text-base text-sm font-bold font-droid lg:pb-4 pb-0 text-black">
          Self Assessment Details
        </h4>
        <div className="grid grid-cols-12 lg:mt-[50px] md:mt-[30px] mt-2.5 lg:mb-[30px] mb-5">
          <div className="xxl:col-span-9 xl:col-span-7 col-span-12 xl:mb-0 sm:mb-10 mb-5">
            <h3 className="xl:text-2xl lg:text-xl sm:text-lg text-base text-[#3A3A3A] font-bold leading-[29.3px] relative  mb-4 max-w-[600px] line-clamp-3">
              Where{" "}
              {+userData?.query?.role !== 1
                ? userData?.company?.userDetails?.name
                : userData?.query?.name}
              's <br /> Green Feet are now...
              <div className="w-[117px] h-[2px] bg-[#64A70B] lg:mt-4 mt-1 absolute bottom-0 left-0"></div>
            </h3>
            <div className="max-w-[602.78px]">
              <p className="text-[#3A3A3A] font-droid leading-[20px] lg:text-base sm:text-sm text-xs mb-5 ">
                Here’s how you performed across the six pillars of
                sustainability as a business!
              </p>
              <div className="pb-5">
                <h6 className="lg:text-base sm:text-sm-font-droid text-[#3A3A3A] font-semibold">
                  But what does your score really mean?{" "}
                </h6>
                <h6 className="lg:text-base sm:text-sm font-font-droid text-[#64A70B] font-semibold">
                  This is where your journey begins.
                </h6>
              </div>
              <p className="text-[#3A3A3A] font-droid leading-[20px] lg:text-base sm:text-sm text-xs">
                Now that you know where you stand, it’s time to develop an
                action plan based on personalized insights to advance your
                company to its next green stage.
              </p>
            </div>
          </div>
          <div className="2xl:col-span-3 xl:col-span-5 sm:col-span-8 col-span-12">
            <div className="flex justify-between">
              <div className="">
                <Labels />
              </div>
              <div className="text-center relative sm:order-2 order-1 sm:mb-0 mb-5">
                <div className="w-40 h-40 relative">
                  <Doughnut
                    data={data}
                    options={options}
                    plugins={[textCenter]}
                  />
                </div>
              </div>
            </div>
            <div className="">
              <p className="inline font-droid text-[18px] text-black">
                Your overall sustainability level -
              </p>{" "}
              <Badge
                className={`font-semibold text-[18px] text-[#000] leading-6 font-droid bg-gradient-to-r from-[${currentLavel?.color}] from-10% via-[${currentLavel?.color}] via-10% to-transparent to-80% hover:bg-[#fff] border-0 bg-transparent`}
              >
                {currentLavel?.maturityLevelName}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="sm:block hidden">
        <div className="flex justify-between items-center mb-5">
          <h2 className="lg:text-xl sm:text-lg text-base font-droid font-bold">
            How you fared across the maturity levels
          </h2>
        </div>
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-[26px]  mb-[60px]">
          <div className="md:shadow shadow-none rounded-xl">
            <div className="w-full flex items-center md:pl-[17px] pl-0 border-b-[#D9D9D9] border-b border-solid h-[62px]">
              <Button
                className={`font-font-droid md:text-base sm:text-sm text-xs sm:w-[130px] w-[100px] font-bold text-black bg-gradient-to-r from-introductory_pillar from-25% via-introductory_pillar via-25% to-transparent to-50% bg-[#fff] cursor-default justify-start`}
              >
                Introductory
              </Button>
            </div>

            <div className="flex items-center flex-wrap lg:justify-center sm:gap-[20px] gap-[15px] p-4">
              {(assessmentData?.length > 0
                ? assessmentData
                : assessmant?.data?.data
              )?.map((item: any) => {
                const persantage =
                  ((+item?.totalpoints * 100) / +item?.totalmaxpoint)?.toFixed(
                    0
                  ) !== "NaN"
                    ? (+item?.totalpoints * 100) / +item?.totalmaxpoint
                    : 0;
                return (
                  <>
                    {fetchClientmaturitylevel?.data &&
                      +persantage >=
                        fetchClientmaturitylevel?.data[0]?.rangeStart &&
                      +persantage <=
                        fetchClientmaturitylevel?.data[0]?.rangeEnd && (
                        <Button
                          type="button"
                          variant={"ghost"}
                          className="h-auto p-0"
                          key={item.pillarid}
                          onClick={() => {
                            setIsOpen(item.pillarid);
                            setPillerName(item.pillarname);
                          }}
                        >
                          <div className="flex flex-wrap lg:gap-5 gap-4 group">
                            <div
                              className={`border-2 border-introductory_pillar transition-all duration-500 bg-introductory_pillar hover:text-black hover:bg-white text-white w-[225px] rounded-xl p-2.5`}
                            >
                              <div className="flex justify-center items-center bg-white group-hover:bg-introductory_pillar transition-all duration-500 rounded-full sm:w-[52px] w-[40px] sm:h-[52px] h-[40px] m-auto">
                                <img
                                  src={getImages(item.pillarname)}
                                  alt="img"
                                  className=""
                                />
                              </div>
                              <h4 className="mt-3 md:text-base text-xs font-droid pb-2">
                                {item.pillarname}
                              </h4>
                              <span className="md:text-[32px] sm:text-[24px] text-[18px] font-bold">
                                {persantage?.toFixed(0)}%
                              </span>
                            </div>
                          </div>
                        </Button>
                      )}
                  </>
                );
              })}
            </div>
          </div>

          <div className="md:shadow shadow-none rounded-xl">
            <div className="w-full flex items-center md:pl-[17px] pl-0 border-b-[#D9D9D9] border-b border-solid h-[62px]">
              <Button
                className={`font-font-droid md:text-base sm:text-sm text-xs sm:w-[130px] w-[100px] font-bold text-black bg-gradient-to-r from-intermediate_pillar from-25% via-intermediate_pillar via-25% to-transparent to-50% bg-[#fff] cursor-default justify-start`}
              >
                Intermediate
              </Button>
            </div>
            <div className="flex items-center flex-wrap lg:justify-center sm:gap-[20px] gap-[15px] p-4">
              {(assessmentData?.length > 0
                ? assessmentData
                : assessmant?.data?.data
              )?.map((item: any) => {
                const persantage =
                  ((+item?.totalpoints * 100) / +item?.totalmaxpoint)?.toFixed(
                    0
                  ) !== "NaN"
                    ? (+item?.totalpoints * 100) / +item?.totalmaxpoint
                    : 0;
                return (
                  <>
                    {fetchClientmaturitylevel?.data &&
                      +persantage >=
                        fetchClientmaturitylevel?.data[1]?.rangeStart &&
                      +persantage <=
                        fetchClientmaturitylevel?.data[1]?.rangeEnd && (
                        <Button
                          type="button"
                          variant={"ghost"}
                          className="h-auto p-0"
                          key={item.pillarid}
                          onClick={() => {
                            setIsOpen(item.pillarid);
                            setPillerName(item.pillarname);
                          }}
                        >
                          <div className="flex flex-wrap lg:gap-5 gap-4 group">
                            <div
                              className={`border-2 border-solid border-intermediate_pillar transition-all duration-500 bg-intermediate_pillar  hover:bg-white w-[225px] rounded-xl p-2.5`}
                            >
                              <div className="p-2.5 bg-white group-hover:bg-intermediate_pillar transition-all duration-500 rounded-full w-[52px] h-[52px] m-auto">
                                <img
                                  src={getImages(item.pillarname)}
                                  alt="img"
                                  className=""
                                />
                              </div>
                              <h4 className="mt-3 md:text-base text-xs font-droid pb-2">
                                {item.pillarname}
                              </h4>
                              <span className="md:text-[32px] sm:text-[24px] text-[18px] font-bold">
                                {persantage?.toFixed(0)}%
                              </span>
                            </div>
                          </div>
                        </Button>
                      )}
                  </>
                );
              })}
            </div>
          </div>

          <div className="md:shadow shadow-none rounded-xl">
            <div className="w-full flex items-center md:pl-[17px] pl-0 border-b-[#D9D9D9] border-b border-solid h-[62px]">
              <Button
                className={`font-font-droid md:text-base sm:text-sm text-xs sm:w-[130px] w-[100px] font-bold text-black bg-gradient-to-r from-advanced_pillar from-25% via-advanced_pillar via-25% to-transparent to-50% bg-[#fff] cursor-default justify-start`}
              >
                Advanced
              </Button>
            </div>
            <div className="flex items-center flex-wrap lg:justify-center sm:gap-[20px] gap-[15px] p-4">
              {(assessmentData?.length > 0
                ? assessmentData
                : assessmant?.data?.data
              )?.map((item: any) => {
                const persantage =
                  ((+item?.totalpoints * 100) / +item?.totalmaxpoint)?.toFixed(
                    0
                  ) !== "NaN"
                    ? (+item?.totalpoints * 100) / +item?.totalmaxpoint
                    : 0;
                return (
                  <>
                    {fetchClientmaturitylevel?.data &&
                      +persantage >=
                        fetchClientmaturitylevel?.data[2]?.rangeStart &&
                      +persantage <=
                        fetchClientmaturitylevel?.data[2]?.rangeEnd && (
                        <Button
                          type="button"
                          variant={"ghost"}
                          className="h-auto p-0"
                          key={item.pillarid}
                          onClick={() => {
                            setIsOpen(item.pillarid);
                            setPillerName(item.pillarname);
                          }}
                        >
                          <div className="flex flex-wrap lg:gap-5 gap-4 group">
                            <div
                              className={`border-2 border-advanced_pillar hover:bg-white transition-all duration-500 bg-advanced_pillar w-[225px] rounded-xl p-2.5`}
                            >
                              <div className="flex justify-center items-center group-hover:bg-advanced_pillar bg-white transition-all duration-500 rounded-full sm:w-[52px] w-[40px] sm:h-[52px] h-[40px] m-auto">
                                <img
                                  src={getImages(item.pillarname)}
                                  alt="img"
                                  className=""
                                />
                              </div>
                              <h4 className="mt-3 md:text-base text-xs font-droid pb-2">
                                {item.pillarname}
                              </h4>
                              <span className="md:text-[32px] sm:text-[24px] text-[18px] font-bold">
                                {persantage?.toFixed(0)}%
                              </span>
                            </div>
                          </div>
                        </Button>
                      )}
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="sm:hidden block">
        <Tabs defaultValue="introductory" className="w-full">
          <TabsList className="p-0 h-[45px]">
            <TabsTrigger
              value="introductory"
              className="text-xs sm:px-6 px-2 font-droid font-bold text-[#00000080] data-[state=active]:text-[white] data-[state=active]:bg-[#F63636] rounded-md border-transparent h-[36px] w-[100px]"
            >
              Introductory
            </TabsTrigger>
            <TabsTrigger
              value="intermediate"
              className="text-xs sm:px-6 px-2 font-droid font-bold text-[#00000080] data-[state=active]:text-[black] data-[state=active]:bg-intermediate_pillar rounded-md border-transparent h-[36px] w-[100px]"
            >
              Intermediate
            </TabsTrigger>
            <TabsTrigger
              value="advanced"
              className="text-xs sm:px-6 px-2 font-droid font-bold text-[#00000080] data-[state=active]:text-[black] data-[state=active]:bg-advanced_pillar rounded-md border-transparent h-[36px] w-[100px]"
            >
              Advanced
            </TabsTrigger>
          </TabsList>
          <TabsContent value="introductory" className="lg:p-5 p-0 mt-0">
            <div className="flex items-center flex-wrap sm:gap-[20px] gap-[15px] md:pt-8 pt-3 md:pl-[30px] pl-0 pb-5">
              {(assessmentData?.length > 0
                ? assessmentData
                : assessmant?.data?.data
              )?.map((item: any) => {
                const persantage =
                  ((+item?.totalpoints * 100) / +item?.totalmaxpoint)?.toFixed(
                    0
                  ) !== "NaN"
                    ? (+item?.totalpoints * 100) / +item?.totalmaxpoint
                    : 0;
                return (
                  <>
                    {fetchClientmaturitylevel?.data &&
                      +persantage >=
                        fetchClientmaturitylevel?.data[0]?.rangeStart &&
                      +persantage <=
                        fetchClientmaturitylevel?.data[0]?.rangeEnd && (
                        <Button
                          type="button"
                          variant={"ghost"}
                          className="h-auto p-0 bg-white hover:bg-transparent"
                          key={item.pillarid}
                          onClick={() => {
                            setIsOpen(item.pillarid);
                            setPillerName(item.pillarname);
                          }}
                        >
                          <div className="flex flex-wrap lg:gap-5 gap-4">
                            <div className="border border-solid border-[#F63636] bg-[#F63636] text-white lg:w-[225px] w-[140px] rounded-xl p-2.5">
                              <div className="flex justify-center items-center bg-white rounded-full sm:w-[52px] w-[40px] sm:h-[52px] h-[40px] m-auto">
                                <img
                                  src={getImages(item.pillarname)}
                                  alt="img"
                                  className=""
                                />
                              </div>
                              <h4 className="mt-3 md:text-base text-xs font-droid pb-2">
                                {item.pillarname}
                              </h4>
                              <span className="md:text-[32px] sm:text-[24px] text-[18px] font-bold">
                                {persantage?.toFixed(0)}%
                              </span>
                            </div>
                          </div>
                        </Button>
                      )}
                  </>
                );
              })}
            </div>
          </TabsContent>
          <TabsContent value="intermediate" className="lg:p-5 p-0 mt-0">
            <div className="flex items-center flex-wrap sm:gap-[20px] gap-[15px] md:pt-8 pt-3 md:pl-[30px] pl-0 pb-5">
              {(assessmentData?.length > 0
                ? assessmentData
                : assessmant?.data?.data
              )?.map((item: any) => {
                const persantage =
                  ((+item?.totalpoints * 100) / +item?.totalmaxpoint)?.toFixed(
                    0
                  ) !== "NaN"
                    ? (+item?.totalpoints * 100) / +item?.totalmaxpoint
                    : 0;
                return (
                  <>
                    {fetchClientmaturitylevel?.data &&
                      +persantage >=
                        fetchClientmaturitylevel?.data[1]?.rangeStart &&
                      +persantage <=
                        fetchClientmaturitylevel?.data[1]?.rangeEnd && (
                        <Button
                          type="button"
                          variant={"ghost"}
                          className="h-auto p-0 bg-white hover:bg-transparent"
                          key={item.pillarid}
                          onClick={() => {
                            setIsOpen(item.pillarid);
                            setPillerName(item.pillarname);
                          }}
                        >
                          <div className="flex flex-wrap lg:gap-5 gap-4">
                            <div className="border border-solid border-intermediate_pillar bg-intermediate_pillar lg:w-[225px] w-[140px] rounded-xl p-2.5">
                              <div className="p-2.5 bg-white rounded-full w-[52px] h-[52px] m-auto">
                                <img
                                  src={getImages(item.pillarname)}
                                  alt="img"
                                  className=""
                                />
                              </div>
                              <h4 className="mt-3 md:text-base text-xs font-droid pb-2">
                                {item.pillarname}
                              </h4>
                              <span className="md:text-[32px] sm:text-[24px] text-[18px] font-bold">
                                {persantage?.toFixed(0)}%
                              </span>
                            </div>
                          </div>
                        </Button>
                      )}
                  </>
                );
              })}
            </div>
          </TabsContent>
          <TabsContent value="advanced" className="lg:p-5 p-0 mt-0">
            <div className="flex items-center flex-wrap sm:gap-[20px] gap-[15px] md:pt-8 pt-3 md:pl-[30px] pl-0 pb-5">
              {(assessmentData?.length > 0
                ? assessmentData
                : assessmant?.data?.data
              )?.map((item: any) => {
                const persantage =
                  ((+item?.totalpoints * 100) / +item?.totalmaxpoint)?.toFixed(
                    0
                  ) !== "NaN"
                    ? (+item?.totalpoints * 100) / +item?.totalmaxpoint
                    : 0;
                return (
                  <>
                    {fetchClientmaturitylevel?.data &&
                      +persantage >=
                        fetchClientmaturitylevel?.data[2]?.rangeStart &&
                      +persantage <=
                        fetchClientmaturitylevel?.data[2]?.rangeEnd && (
                        <Button
                          type="button"
                          variant={"ghost"}
                          className="h-auto p-0 bg-white hover:bg-transparent"
                          key={item.pillarid}
                          onClick={() => {
                            setIsOpen(item.pillarid);
                            setPillerName(item.pillarname);
                          }}
                        >
                          <div className="flex flex-wrap lg:gap-5 gap-4">
                            <div className="border border-solid border-advanced_pillar bg-advanced_pillar text-black lg:w-[225px] w-[140px] rounded-xl p-2.5">
                              <div className="flex justify-center items-center bg-white rounded-full sm:w-[52px] w-[40px] sm:h-[52px] h-[40px] m-auto">
                                <img
                                  src={getImages(item.pillarname)}
                                  alt="img"
                                  className=""
                                />
                              </div>
                              <h4 className="mt-3 md:text-base text-xs font-droid pb-2">
                                {item.pillarname}
                              </h4>
                              <span className="md:text-[32px] sm:text-[24px] text-[18px] font-bold">
                                {persantage?.toFixed(0)}%
                              </span>
                            </div>
                          </div>
                        </Button>
                      )}
                  </>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {((userData?.query?.role === UserRole.Company && +pathStatus <= 5) ||
        showButton === 0) && (
        <div className="text-center">
          <Button
            onClick={handleMaturity}
            className="bg-[#64A70B] text-base w-[180px] font-bold h-12"
          >
            Set Targets
          </Button>
        </div>
      )}

      <MaturityLevelModel
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        pillerName={pillerName}
        setPillerName={setPillerName}
        maturityLevel={fetchClientmaturitylevel?.data}
      />
      <Loading isLoading={isPending} />
    </div>
  );
};

export default AssessmentResult;
