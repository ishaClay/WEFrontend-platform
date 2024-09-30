import MaturityLevelModel from "@/components/Models/MaturityLevelModel";
import Loading from "@/components/comman/Error/Loading";
import HomeFooter from "@/components/homePage/HomeFooter";
import HomeHeader from "@/components/homePage/HomeHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppSelector } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { cn, getImages } from "@/lib/utils";
import {
  fetchAssessment,
  getAllassessment,
} from "@/services/apiServices/assessment";
import { enumUpadate } from "@/services/apiServices/enum";
import { fetchClientwiseMaturityLevel } from "@/services/apiServices/maturityLevel";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { useLocation, useNavigate } from "react-router-dom";

const MaturityLevelPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { clientId, UserId } = useAppSelector((state) => state.user);
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = React.useState<number | null>(null);
  const [pillerName, setPillerName] = React.useState<string>("");
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const userID = UserId
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
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.enumUpadateList],
      });
      localStorage.setItem("path", JSON.stringify(data.data.data?.pathStatus));
    },
  });

  const { data: fetchClientmaturitylevel } = useQuery({
    queryKey: [QUERY_KEYS.fetchbyclientMaturity],
    queryFn: () => fetchClientwiseMaturityLevel(clientId as string),
  });

  const findMaturityLevel = (score: any) => {
    for (const level of fetchClientmaturitylevel?.data || []) {
      if (score >= level.rangeStart && score <= level.rangeEnd) {
        return level;
      }
    }
    return null;
  };

  const handleMaturity = () => {
    EnumUpadate(path);
    navigate("/selectlevel");
  };

  const score = (
    (+allassessmant?.data?.data?.avTotalpoints /
      +allassessmant?.data?.data?.avTotalmaxpoint) *
    100
  ).toFixed(2);

  const setScore = isNaN(Number(score)) ? 0 : score;
  const currentLavel = findMaturityLevel(Number(setScore));

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
            label += Math.round(context.parsed)?.toFixed(0) + "%";
            return label;
          },
        },
      },
    },
    hover: {
      mode: undefined,
    },
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const Labels = () => (
    <>
      {fetchClientmaturitylevel &&
        fetchClientmaturitylevel?.data?.map((label, index) => {
          let colorClass, opacityClass;
          if (index === 0) {
            colorClass =
              "bg-gradient-to-r from-[#C92C35] from-10% via-[#C92C35] via-10% to-transparent to-80%";
            opacityClass = "bg-opacity-25";
          } else if (index === 1) {
            colorClass =
              "bg-gradient-to-r from-[#FFD56A] from-10% via-[#FFD56A] via-10% to-transparent to-80%";
            opacityClass = "bg-opacity-50";
          } else {
            colorClass =
              "bg-gradient-to-r from-[#258483] from-10% via-[#258483] via-10% to-transparent to-80%";
            opacityClass = "bg-opacity-75";
          }
          return (
            <div
              key={index}
              className="text-sm flex items-center justify-start relative mb-10 h-6"
            >
              <div
                className={`w-[60px] h-[25px] left-0 top-0 ${colorClass} ${opacityClass} rounded-l-lg rounded-r-none`}
                style={{
                  background: `linear-gradient(to right, ${label?.color} 10%, #ffffff)`,
                }}
              ></div>
              <div className="text-base text-black font-droid rounded-r-lg ms-[-50px]">
                {label?.maturityLevelName}
                {/* <span className="font-semibold ml-2">{`(${label?.rangeStart} - ${label?.rangeEnd})`}</span> */}
              </div>
            </div>
          );
        })}
      {/* <div className="sm:mb-[35px] mb-5">
        <p className="font-droid font-bold text-base text-[#3A3A3A] leading-[18.88px] flex items-center gap-5">
          Total Score -
          <div className="flex items-center">
            <span className="font-droid font-bold text-[#3A3A3A] lg:text-[42px] text-[30px] leading-[52px]">
              {allassessmant?.data?.data?.avTotalpoints}
            </span>
            <span className="font-droid font-extrabold text-base leading-[18.88px] text-[#64A70B]">
              /{allassessmant?.data?.data?.avTotalmaxpoint}
            </span>
          </div>
        </p>
      </div> */}
    </>
  );

  const isShowHeader =
    location.pathname !== "/company/maturityassessmentroadmap";

  useEffect(() => {
    if (fetchClientmaturitylevel) {
      document.documentElement.style.setProperty(
        "--introductory-pillar",
        fetchClientmaturitylevel?.data?.[0]?.color || ""
      );
      document.documentElement.style.setProperty(
        "--intermediate-pillar",
        fetchClientmaturitylevel?.data?.[1]?.color || ""
      );
      document.documentElement.style.setProperty(
        "--advanced-pillar",
        fetchClientmaturitylevel?.data?.[2]?.color || ""
      );
    }
  }, [fetchClientmaturitylevel]);

  return (
    <>
      <div className="font-normal text-darkslategray-100 font-droid">
        {isShowHeader && <HomeHeader />}
        <div className="xl:max-w-[1160px] max-w-full w-full mx-auto">
          <div className="grid grid-cols-12 lg:mt-[50px] md:mt-[30px] mt-2.5 lg:mb-[30px] mb-5 xl:px-0 px-5">
            <div className="lg:col-span-8 col-span-12 lg:mb-0 mb-10">
              <h3 className="lg:text-2xl sm:text-lg text-base text-[#3A3A3A] font-bold leading-[29.3px] relative mb-4 max-w-[600px] line-clamp-2">
                Here's {userData?.query?.name}'s <br /> Full Sustainability
                Score
                <div className="w-[117px] h-[2px] bg-[#64A70B] absolute bottom-0 left-0 lg:mt-4 mt-1"></div>
              </h3>
              <div className="max-w-[602.78px]">
                <p className="text-[#3A3A3A] font-droid leading-[20px] lg:text-base text-sm sm:mb-5 mb-3 ">
                  Here’s how you did across the 6 pillars of sustainability as a
                  business! 
                </p>
                <div className="sm:pb-5 pb-3">
                  <h6 className="lg:text-base sm:text-sm-font-droid text-[#3A3A3A] font-semibold">
                    But what does your score really mean?{" "}
                  </h6>
                  <h6 className="lg:text-base sm:text-sm font-font-droid text-[#64A70B] font-semibold">
                    This is where you stand now—where your ‘green feet’ are—and
                    it’s where your journey starts.
                  </h6>
                </div>
                <p className="text-[#3A3A3A] font-droid leading-[20px] lg:text-base text-sm">
                  To take the next step: start building your action plan from
                  the personalised insights below—to advance your company to its
                  next green stage.
                </p>
              </div>
              <div className="flex sm:flex-row flex-col sm:items-center items-start sm:gap-7 gap-4 lg:mt-10 mt-5">
                <Button
                  type="button"
                  onClick={handleMaturity}
                  className="bg-[#64A70B] text-white h-12 sm:w-[223px] w-[200px] text-base font-font-droid"
                >
                  Build My Action Plan
                </Button>
                <Button
                  type="button"
                  onClick={() => navigate("/company/dashboard")}
                  className="bg-[#00778B] text-white h-12 sm:w-[223px] w-[200px] text-base font-font-droid"
                >
                  Go To My Dashboard
                </Button>
              </div>
            </div>
            <div className="lg:col-span-4 sm:col-span-8 col-span-12">
              <div className="flex justify-between">
                <div className="">
                  <Labels />
                </div>
                <div className="text-center relative">
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
                  className={`font-semibold text-[18px] text-[#000] bg-transparent leading-6 font-droid  bg-gradient-to-r from-[${currentLavel?.color}] from-10% via-[${currentLavel?.color}] via via-10% to-transparent to-80% hover:bg-transparent border-0 `}
                >
                  {currentLavel?.maturityLevelName}
                </Badge>
              </div>
            </div>
          </div>
          <div className="border-2 border-solid border-[#D9D9D9] mt-[30px] mb-6" />

          <div className="sm:block hidden xl:px-0 px-5">
            <div className="flex justify-between items-center mb-5">
              <h2 className="lg:text-xl sm:text-lg text-base font-droid font-bold">
                How you fare across the Maturity levels
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-[26px]  mb-[60px]">
              <div className="md:shadow shadow-none rounded-xl">
                <div className="w-full flex items-center md:pl-[17px] pl-0 border-b-[#D9D9D9] border-b border-solid h-[62px]">
                  <Button
                    className={cn(
                      `md:text-base sm:text-sm text-xs text-[#000] sm:w-[130px] bg-transparent w-[100px] font-bold bg-gradient-to-r from-introductory_pillar from-25% via-introductory_pillar via-25% to-transparent to-50% hover:bg-transparent cursor-default justify-start`
                    )}
                  >
                    Introductory
                  </Button>
                </div>

                <div className="flex items-center flex-wrap justify-center gap-[20px] p-4">
                  {assessmant?.data?.data.map((item: any) => {
                    const persantage =
                      (
                        (+item?.totalpoints * 100) /
                        +item?.totalmaxpoint
                      )?.toFixed(0) !== "NaN"
                        ? (+item?.totalpoints * 100) / +item?.totalmaxpoint
                        : 0;

                    return (
                      <>
                        {fetchClientmaturitylevel?.data &&
                          +persantage >=
                            +fetchClientmaturitylevel?.data[0]?.rangeStart &&
                          +persantage <=
                            +fetchClientmaturitylevel?.data[0]?.rangeEnd && (
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
                                  className={`border-2 border-introductory_pillar bg-introductory_pillar transition-all duration-500 hover:text-black hover:bg-white text-white lg:w-[225px] w-[145px] rounded-xl lg:p-2.5 px-1 py-2`}
                                >
                                  <div className="flex justify-center items-center group-hover:bg-introductory_pillar bg-white transition-all duration-500 rounded-full sm:w-[52px] w-[40px] sm:h-[52px] h-[40px] m-auto">
                                    <img
                                      src={getImages(item.pillarname)}
                                      alt="img"
                                      className=""
                                    />
                                  </div>
                                  <h4 className="mt-3 lg:text-base text-xs font-droid pb-2 break-all">
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
                <div className="flex items-center flex-wrap justify-center gap-[20px] p-4">
                  {assessmant?.data?.data.map((item: any) => {
                    const persantage =
                      (
                        (+item?.totalpoints * 100) /
                        +item?.totalmaxpoint
                      )?.toFixed(0) !== "NaN"
                        ? (+item?.totalpoints * 100) / +item?.totalmaxpoint
                        : 0;
                    return (
                      <>
                        {fetchClientmaturitylevel?.data &&
                          +persantage >=
                            +fetchClientmaturitylevel?.data[1]?.rangeStart &&
                          +persantage <=
                            +fetchClientmaturitylevel?.data[1]?.rangeEnd && (
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
                              <div className="flex flex-wrap lg:gap-5 gap-4 group">
                                <div
                                  className={`border-2 border-intermediate_pillar transition-all duration-500 hover:bg-white bg-intermediate_pillar lg:w-[225px] w-[145px] rounded-xl lg:p-2.5 px-1 py-2`}
                                >
                                  <div className="p-2.5 bg-white rounded-full group-hover:bg-intermediate_pillar w-[52px] h-[52px] transition-all duration-500 m-auto">
                                    <img
                                      src={getImages(item.pillarname)}
                                      alt="img"
                                      className=""
                                    />
                                  </div>
                                  <h4 className="mt-3 lg:text-base text-xs pb-2 font-font-droid break-all">
                                    {item.pillarname}
                                  </h4>
                                  <span className="md:text-[32px] sm:text-[24px] text-[18px] font-bold font-font-droid">
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
                    className={`md:text-base sm:text-sm text-xs text-[#000] sm:w-[130px] bg-transparent w-[100px] font-bold bg-gradient-to-r from-advanced_pillar from-25% via-advanced_pillar via-25% to-transparent to-50% hover:bg-transparent cursor-default justify-start`}
                  >
                    Advanced
                  </Button>
                </div>
                <div className="flex items-center flex-wrap justify-center gap-[20px] p-4">
                  {assessmant?.data?.data.map((item: any) => {
                    const persantage =
                      (
                        (+item?.totalpoints * 100) /
                        +item?.totalmaxpoint
                      )?.toFixed(0) !== "NaN"
                        ? (+item?.totalpoints * 100) / +item?.totalmaxpoint
                        : 0;
                    return (
                      <>
                        {fetchClientmaturitylevel?.data &&
                          +persantage >=
                            +fetchClientmaturitylevel?.data[2]?.rangeStart &&
                          +persantage <=
                            +fetchClientmaturitylevel?.data[2]?.rangeEnd && (
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
                              <div className="flex flex-wrap lg:gap-5 gap-4 group">
                                <div
                                  className={`border-2 border-advanced_pillar bg-advanced_pillar hover:bg-white transition-all duration-500 lg:w-[225px] w-[145px] rounded-xl lg:p-2.5 px-1 py-2`}
                                >
                                  <div className="flex justify-center items-center group-hover:bg-advanced_pillar bg-white rounded-full transition-all duration-500 sm:w-[52px] w-[40px] sm:h-[52px] h-[40px] m-auto">
                                    <img
                                      src={getImages(item.pillarname)}
                                      alt="img"
                                      className=""
                                    />
                                  </div>
                                  <h4 className="mt-3 lg:text-base text-xs font-font-droid pb-2 break-all">
                                    {item.pillarname}
                                  </h4>
                                  <span className="md:text-[32px] sm:text-[24px] text-[18px] font-bold font-font-droid">
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
            <div className="xl:px-0 px-5">
              <Tabs defaultValue="introductory" className="w-full">
                <TabsList className="p-0 h-[45px]">
                  <TabsTrigger
                    value="introductory"
                    className="text-xs sm:px-6 px-2 font-droid font-bold text-[#00000080] data-[state=active]:text-[white] data-[state=active]:bg-introductory_pillar rounded-md border-transparent h-[36px] w-[100px]"
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
                    className="text-xs sm:px-6 px-2 font-droid font-bold text-[#00000080] data-[state=active]:text-[white] data-[state=active]:bg-advanced_pillar rounded-md border-transparent h-[36px] w-[100px]"
                  >
                    Advanced
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="introductory" className="lg:p-5 p-0 mt-0">
                  <div className="flex items-center flex-wrap gap-[20px] md:pt-8 pt-3 md:pl-[30px] pl-0 pb-5">
                    {assessmant?.data?.data.map((item: any) => {
                      const persantage =
                        (
                          (+item?.totalpoints * 100) /
                          +item?.totalmaxpoint
                        )?.toFixed(0) !== "NaN"
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
                                  <div className="border border-solid border-introductory_pillar bg-introductory_pillar text-white lg:w-[225px] w-[145px] rounded-xl py-2 px-1">
                                    <div className="flex justify-center items-center bg-white rounded-full sm:w-[52px] w-[40px] sm:h-[52px] h-[40px] m-auto">
                                      <img
                                        src={getImages(item.pillarname)}
                                        alt="img"
                                        className=""
                                      />
                                    </div>
                                    <h4 className="mt-3 md:text-base text-xs font-droid pb-2 break-all">
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
                  <div className="flex items-center flex-wrap gap-[20px] md:pt-8 pt-3 md:pl-[30px] pl-0 pb-5">
                    {assessmant?.data?.data.map((item: any) => {
                      const persantage =
                        (
                          (+item?.totalpoints * 100) /
                          +item?.totalmaxpoint
                        )?.toFixed(0) !== "NaN"
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
                                  <div className="border border-solid border-intermediate_pillar bg-intermediate_pillar lg:w-[225px] w-[145px] rounded-xl py-2 px-1">
                                    <div className="p-2.5 bg-white rounded-full w-[52px] h-[52px] m-auto">
                                      <img
                                        src={getImages(item.pillarname)}
                                        alt="img"
                                        className=""
                                      />
                                    </div>
                                    <h4 className="mt-3 md:text-base text-xs font-droid pb-2 break-all">
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
                  <div className="flex items-center flex-wrap gap-[20px] md:pt-8 pt-3 md:pl-[30px] pl-0 pb-5">
                    {assessmant?.data?.data.map((item: any) => {
                      const persantage =
                        (
                          (+item?.totalpoints * 100) /
                          +item?.totalmaxpoint
                        )?.toFixed(0) !== "NaN"
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
                                  <div className="border border-solid border-advanced_pillar bg-advanced_pillar lg:w-[225px] w-[145px] rounded-xl py-2 px-1">
                                    <div className="flex justify-center items-center bg-white rounded-full sm:w-[52px] w-[40px] sm:h-[52px] h-[40px] m-auto">
                                      <img
                                        src={getImages(item.pillarname)}
                                        alt="img"
                                        className=""
                                      />
                                    </div>
                                    <h4 className="mt-3 md:text-base text-xs font-droid pb-2 break-all">
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
          </div>

          <div className="flex items-center justify-center sm:gap-7 gap-1 lg:mt-10 mt-5 sm:mx-0 mx-4">
            <Button
              type="button"
              onClick={handleMaturity}
              className="bg-[#64A70B] text-white h-12 sm:w-[223px] w-full text-base font-font-droid"
            >
              Build My Action Plan
            </Button>
            <Button
              type="button"
              onClick={() => navigate("/company/dashboard")}
              className="bg-[#00778B] text-white h-12 sm:w-[223px] w-full text-base font-font-droid"
            >
              Go To My Dashboard
            </Button>
          </div>
        </div>
      </div>

      {/* <div className="text-center mb-[60px] mt-[30px]">
        <p className="text-[#64A70B] font-font-droid pb-[24px] text-base font-bold">
          Now...time to get a personalised action plan to advance your green
          feet!
        </p>
        <Button
          type="button"
          onClick={handleMaturity}
          className="bg-[#64A70B] text-base w-[180px] font-bold h-12"
        >
          Get Your Action plan
        </Button>
      </div> */}

      <div className="mt-4">
        <HomeFooter />
      </div>

      <MaturityLevelModel
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        pillerName={pillerName}
        setPillerName={setPillerName}
        maturityLevel={fetchClientmaturitylevel?.data}
      />

      <Loading isLoading={isPending} />
    </>
  );
};

export default MaturityLevelPage;
