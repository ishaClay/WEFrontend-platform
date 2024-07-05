import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MaturityLevelModel from "@/components/Models/MaturityLevelModel";
import Loading from "@/components/comman/Error/Loading";
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { useLocation, useNavigate } from "react-router-dom";

const maturityLevel = [
  {
    maturityLevelName: "Beginning",
    rangeStart: 0,
    rangeEnd: 39.9,
    color: "#C92C35",
  },
  {
    maturityLevelName: "Intermediate",
    rangeStart: 40,
    rangeEnd: 69.9,
    color: "#FFD56A",
  },
  {
    maturityLevelName: "Advanced",
    rangeStart: 70,
    rangeEnd: 100,
    color: "#258483",
  },
];

const findMaturityLevel = (score: number) => {
  for (const level of maturityLevel) {
    if (score >= level.rangeStart && score <= level.rangeEnd) {
      return level;
    }
  }
  return null;
};

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
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.enumUpadateList],
      });
    },
  });

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

  console.log("setScore", setScore);

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
        `${data.datasets[0].data[0]}%`,
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
        callbacks: {
          label: function (context: any) {
            let label = context.label || "";
            if (label) {
              label += ": ";
            }
            label += Math.round(context.parsed * 100) + "%";
            return label;
          },
        },
      },
    },
  };

  const Labels = () => (
    <>
      {data.labels.map((label, index) => {
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
            ></div>
            <div className="text-base text-black font-nunito rounded-r-lg ms-[-50px]">
              {label}
            </div>
          </div>
        );
      })}
      <div className="sm:mb-[35px] mb-5">
        <p className="font-calibri font-bold text-base text-[#3A3A3A] leading-[18.88px] flex items-center gap-5">
          Total Score -
          <div className="flex items-center">
            <span className="font-calibri font-bold text-[#3A3A3A] lg:text-[42px] text-[30px] leading-[52px]">
              {allassessmant?.data?.data?.avTotalpoints}
            </span>
            <span className="font-calibri font-extrabold text-base leading-[18.88px] text-[#64A70B]">
              /{allassessmant?.data?.data?.avTotalmaxpoint}
            </span>
          </div>
        </p>
      </div>
    </>
  );

  const isShowHeader =
    location.pathname !== "/company/maturityassessmentroadmap";

  return (
    <>
      <div className="font-normal text-darkslategray-100 font-calibri">
        {isShowHeader && <Header />}
        <div className="xl:max-w-[1160px] max-w-full w-full mx-auto">
          <div className="grid grid-cols-12 lg:mt-[50px] md:mt-[30px] mt-2.5 lg:mb-[30px] mb-5 xl:px-0 px-5">
            <div className="lg:col-span-8 col-span-12 lg:mb-0 mb-10">
              <h3 className="lg:text-2xl sm:text-lg text-base text-[#3A3A3A] font-bold leading-[29.3px] relative lg:pb-4 pb-1 mb-4">
                Where {userData?.company?.name} <br /> Green Feet are now...
                <div className="w-[117px] h-[2px] bg-[#64A70B] absolute bottom-0 left-0"></div>
              </h3>
              <div className="max-w-[602.78px]">
                <p className="text-[#3A3A3A] font-calibri leading-[20px] lg:text-base text-sm sm:mb-5 mb-3 ">
                  Here’s how you did across the 6 pillars of sustainability as a
                  business! 
                </p>
                <div className="sm:pb-5 pb-3">
                  <h6 className="lg:text-base sm:text-sm-abhaya text-[#3A3A3A] font-semibold">
                    But what your score really means?{" "}
                  </h6>
                  <h6 className="lg:text-base sm:text-sm font-abhaya text-[#64A70B] font-semibold">
                    This is where your journey starts. 
                  </h6>
                </div>
                <p className="text-[#3A3A3A] font-calibri leading-[20px] lg:text-base text-sm">
                  Now that you know where you are, it’s time to get an action
                  plan built from personalised insights to advance your company
                  to its next green stage.
                </p>
              </div>
              <div className="sm:flex block items-center gap-7 lg:mt-10 mt-5">
                <Button
                  type="button"
                  onClick={handleMaturity}
                  className="bg-[#64A70B] text-white h-12 sm:w-[223px] w-[200px] text-base font-abhaya sm:mb-0 mb-5"
                >
                  Build My Action Plan
                </Button>
                <Button
                  type="button"
                  onClick={() => navigate("/company/dashboard")}
                  className="bg-[#00778B] text-white h-12 sm:w-[223px] w-[200px] text-base font-abhaya"
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
                <p className="inline font-calibri text-base text-black">
                  Your overall sustainability level -
                </p>{" "}
                <span className="font-bold text-base text-[#000000] leading-6 font-calibri">
                  {currentLavel?.maturityLevelName}
                </span>
              </div>
            </div>
          </div>
          <div className="border-2 border-solid border-[#D9D9D9] mt-[30px] mb-6" />

          <div className="sm:block hidden">
            <div className="flex justify-between items-center mb-5 xl:px-0 px-5">
              <h2 className="lg:text-xl sm:text-lg text-base font-calibri font-bold">
                How you fare across the Maturity levels
              </h2>
            </div>
            <div className="flex flex-col gap-[26px]  mb-[60px]">
              <div className="flex flex-wrap md:shadow shadow-none rounded-xl">
                <div className="w-full flex items-center md:pl-[17px] pl-0 border-b-[#D9D9D9] border-b border-solid h-[62px]">
                  <Button className="bg-[#F63636] md:text-base sm:text-sm text-xs sm:w-[130px] w-[100px] font-bold">
                    Beginning
                  </Button>
                </div>

                <div className="flex items-center flex-wrap gap-[20px] md:pt-8 pt-3 md:pl-[30px] pl-0 pb-5">
                  {assessmant?.data?.data.map((item: any) => {
                    const persantage =
                      (
                        (+item?.totalpoints * 100) /
                        +item?.totalmaxpoint
                      )?.toFixed(2) !== "NaN"
                        ? (
                            (+item?.totalpoints * 100) /
                            +item?.totalmaxpoint
                          )?.toFixed(2)
                        : 0;
                    return (
                      <>
                        {+persantage < 40 && (
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
                              <div className="border border-solid border-[#F63636] bg-[#F63636] text-white lg:w-[225px] w-[145px] rounded-xl p-2.5">
                                <div className="flex justify-center items-center bg-white rounded-full sm:w-[52px] w-[40px] sm:h-[52px] h-[40px] m-auto">
                                  <img
                                    src={getImages(item.pillarname)}
                                    alt="img"
                                    className=""
                                  />
                                </div>
                                <h4 className="mt-3 md:text-base text-xs font-calibri pb-2">
                                  {item.pillarname}
                                </h4>
                                <span className="md:text-[32px] sm:text-[24px] text-[18px] font-bold">
                                  {persantage}%
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

              <div className="flex flex-wrap md:shadow shadow-none rounded-xl">
                <div className="w-full flex items-center md:pl-[17px] pl-0 border-b-[#D9D9D9] border-b border-solid h-[62px]">
                  <Button className="bg-[#FFD56A] font-abhaya md:text-base sm:text-sm text-xs sm:w-[130px] w-[100px] font-bold text-black">
                    Intermediate
                  </Button>
                </div>
                <div className="flex items-center flex-wrap gap-[20px] md:pt-8 pt-3 md:pl-[30px] pl-0 pb-5">
                  {assessmant?.data?.data.map((item: any) => {
                    const persantage =
                      (
                        (+item?.totalpoints * 100) /
                        +item?.totalmaxpoint
                      )?.toFixed(2) !== "NaN"
                        ? (
                            (+item?.totalpoints * 100) /
                            +item?.totalmaxpoint
                          )?.toFixed(2)
                        : 0;
                    return (
                      <>
                        {+persantage >= 40 && +persantage < 70 && (
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
                              <div className="border border-solid border-[#FFD56A] bg-[#FFD56A] lg:w-[225px] w-[145px] rounded-xl p-2.5">
                                <div className="p-2.5 bg-white rounded-full w-[52px] h-[52px] m-auto">
                                  <img
                                    src={getImages(item.pillarname)}
                                    alt="img"
                                    className=""
                                  />
                                </div>
                                <h4 className="mt-3 md:text-base text-xs pb-2 font-abhaya">
                                  {item.pillarname}
                                </h4>
                                <span className="md:text-[32px] sm:text-[24px] text-[18px] font-bold font-abhaya">
                                  {persantage}%
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
              <div className="flex flex-wrap md:shadow shadow-none rounded-xl">
                <div className="w-full flex items-center md:pl-[17px] pl-0 border-b-[#D9D9D9] border-b border-solid h-[62px]">
                  <Button className="bg-[#64A70B] md:text-base sm:text-sm text-xs sm:w-[130px] w-[100px] font-bold font-abhaya">
                    Advanced
                  </Button>
                </div>
                <div className="flex items-center flex-wrap gap-[20px] md:pt-8 pt-3 md:pl-[30px] pl-0 pb-5">
                  {assessmant?.data?.data.map((item: any) => {
                    const persantage =
                      (
                        (+item?.totalpoints * 100) /
                        +item?.totalmaxpoint
                      )?.toFixed(2) !== "NaN"
                        ? (
                            (+item?.totalpoints * 100) /
                            +item?.totalmaxpoint
                          )?.toFixed(2)
                        : 0;
                    return (
                      <>
                        {+persantage >= 70 && (
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
                              <div className="border border-solid border-[#64A70B] bg-[#64A70B] text-white lg:w-[225px] w-[145px] rounded-xl p-2.5">
                                <div className="flex justify-center items-center bg-white rounded-full sm:w-[52px] w-[40px] sm:h-[52px] h-[40px] m-auto">
                                  <img
                                    src={getImages(item.pillarname)}
                                    alt="img"
                                    className=""
                                  />
                                </div>
                                <h4 className="mt-3 md:text-base text-xs font-abhaya pb-2">
                                  {item.pillarname}
                                </h4>
                                <span className="md:text-[32px] sm:text-[24px] text-[18px] font-bold font-abhaya">
                                  {persantage}%
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
                    className="text-xs sm:px-6 px-2 font-nunito font-bold text-[#00000080] data-[state=active]:text-[white] data-[state=active]:bg-[#F63636] rounded-md border-transparent h-[36px] w-[100px]"
                  >
                    Introductory
                  </TabsTrigger>
                  <TabsTrigger
                    value="intermediate"
                    className="text-xs sm:px-6 px-2 font-nunito font-bold text-[#00000080] data-[state=active]:text-[black] data-[state=active]:bg-[#FFD56A] rounded-md border-transparent h-[36px] w-[100px]"
                  >
                    Intermediate
                  </TabsTrigger>
                  <TabsTrigger
                    value="advanced"
                    className="text-xs sm:px-6 px-2 font-nunito font-bold text-[#00000080] data-[state=active]:text-[white] data-[state=active]:bg-[#64A70B] rounded-md border-transparent h-[36px] w-[100px]"
                  >
                    Advanced
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="introductory" className="lg:p-5 p-0 mt-0">
                  <div className="flex items-center flex-wrap gap-[20px] md:pt-8 pt-3 md:pl-[30px] pl-0 pb-5">
                    {assessmant?.data?.data.map((item: any) => (
                      <>
                        {item.totalpoints < "40" && (
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
                              <div className="border border-solid border-[#F63636] bg-[#F63636] text-white lg:w-[225px] w-[145px] rounded-xl p-2.5">
                                <div className="flex justify-center items-center bg-white rounded-full sm:w-[52px] w-[40px] sm:h-[52px] h-[40px] m-auto">
                                  <img
                                    src={getImages(item.pillarname)}
                                    alt="img"
                                    className=""
                                  />
                                </div>
                                <h4 className="mt-3 md:text-base text-xs font-calibri pb-2">
                                  {item.pillarname}
                                </h4>
                                <span className="md:text-[32px] sm:text-[24px] text-[18px] font-bold">
                                  {item?.totalpoints}%
                                </span>
                              </div>
                            </div>
                          </Button>
                        )}
                      </>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="intermediate" className="lg:p-5 p-0 mt-0">
                  <div className="flex items-center flex-wrap gap-[20px] md:pt-8 pt-3 md:pl-[30px] pl-0 pb-5">
                    {assessmant?.data?.data.map((item: any) => (
                      <>
                        {item.totalpoints >= "40" &&
                          item.totalpoints < "70" && (
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
                                <div className="border border-solid border-[#FFD56A] bg-[#FFD56A] lg:w-[225px] w-[145px] rounded-xl p-2.5">
                                  <div className="p-2.5 bg-white rounded-full w-[52px] h-[52px] m-auto">
                                    <img
                                      src={getImages(item.pillarname)}
                                      alt="img"
                                      className=""
                                    />
                                  </div>
                                  <h4 className="mt-3 md:text-base text-xs font-calibri pb-2">
                                    {item.pillarname}
                                  </h4>
                                  <span className="md:text-[32px] sm:text-[24px] text-[18px] font-bold">
                                    {item?.totalpoints}%
                                  </span>
                                </div>
                              </div>
                            </Button>
                          )}
                      </>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="advanced" className="lg:p-5 p-0 mt-0">
                  <div className="flex items-center flex-wrap gap-[20px] md:pt-8 pt-3 md:pl-[30px] pl-0 pb-5">
                    {assessmant?.data?.data.map((item: any) => (
                      <>
                        {item.totalpoints >= "70" && (
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
                              <div className="border border-solid border-[#64A70B] bg-[#64A70B] text-white lg:w-[225px] w-[145px] rounded-xl p-2.5">
                                <div className="flex justify-center items-center bg-white rounded-full sm:w-[52px] w-[40px] sm:h-[52px] h-[40px] m-auto">
                                  <img
                                    src={getImages(item.pillarname)}
                                    alt="img"
                                    className=""
                                  />
                                </div>
                                <h4 className="mt-3 md:text-base text-xs font-calibri pb-2">
                                  {item.pillarname}
                                </h4>
                                <span className="md:text-[32px] sm:text-[24px] text-[18px] font-bold">
                                  {item?.totalpoints}%
                                </span>
                              </div>
                            </div>
                          </Button>
                        )}
                      </>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="text-center mb-[60px] mt-[30px]">
        <p className="text-[#64A70B] font-abhaya pb-[24px] text-base font-bold">
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
        <Footer />
      </div>

      <MaturityLevelModel
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        pillerName={pillerName}
        setPillerName={setPillerName}
      />

      <Loading isLoading={isPending} />
    </>
  );
};

export default MaturityLevelPage;
