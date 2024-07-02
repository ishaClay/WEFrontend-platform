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
    color: "#FF5252",
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
    color: "#D6F5AC",
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
            "bg-gradient-to-r from-red-500 via-red-500 to-transparent";
          opacityClass = "bg-opacity-25";
        } else if (index === 1) {
          colorClass =
            "bg-gradient-to-r from-yellow-500 via-yellow-500 to-transparent";
          opacityClass = "bg-opacity-50";
        } else {
          colorClass =
            "bg-gradient-to-r from-green-500 via-green-500 to-transparent";
          opacityClass = "bg-opacity-75";
        }
        return (
          <div
            key={index}
            className="text-sm flex flex-col relative  mt-10 h-6"
          >
            <div
              className={`absolute -left-2 top-0 h-full w-2/6 ${colorClass} ${opacityClass} rounded-l-lg rounded-r-none `}
            ></div>
            <div className="rounded-r-lg z-50 font-Poppins font-[500]">
              {label}
            </div>
          </div>
        );
      })}
      <div className="mt-[20px] mb-[100px]">
        <p className="font-abhaya font-extrabold flex items-center gap-4 text-base leading-[18.88px]">
          Total Score-
          <div className="flex items-center">
            <span className="font-abhaya font-extrabold text-4xl leading-[49.55px]">
              {allassessmant?.data?.data?.avTotalpoints}
            </span>
            <span className="font-abhaya font-extrabold text-base leading-[18.88px] text-[#64A70B]">
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
    <div className="">
      {isShowHeader && <Header />}
      <div className="mainContailner">
        <div className="flex ml-[172px] mr-[152px] justify-between">
          <div className="h-[369px] pt-[38px]">
            <h3 className="text-2xl font-bold leading-[29.3px] font-abhaya">
              Where {userData?.company?.name} <br /> Green Feet are now...
              <div className="w-[117px] h-[2px] bg-[#64A70B] absolute bottom-0 left-0"></div>
            </h3>
            <hr className="border-2 border-solid border-[#64A70B] w-[117px] mt-[15px] mb-[17px]" />
            <div className="max-w-[602.78px] font-abhaya">
              <p className="">
                Nice work completing this! Your score reveals where your company
                is now with regards to the 6 pillars of sustainability as a
                business. 
              </p>
              <p className="mt-5 grid grid-cols-1">
                <span className="font-bold">But what it really means?</span>
                <span className="font bold text-[#64A70B]">
                  This is where your journey starts. 
                </span>
              </p>
              <p className="mt-5">
                Now that you know where you are, it’s time to get your plan of
                action built from recommended measures to advance you to your
                next green stage.
              </p>
              <Button className="bg-[#64A70B] w-[266px] h-[50px]  text-[20px] mt-[20px]">
                Get Your Action Plan
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
                {score < "40" && "Introductory"}
                {score >= "40" && score < "70" && "Intermediate"}
                {score >= "70" && "Advanced"}
              </span>
            </div>
          </div>
        </div>
        <div className="border-2 border-solid border-[#D9D9D9] mt-[30px] mb-6" />
        <div className="mr-[100px] ml-[167px] flex justify-between">
          <h2 className="text-[24px] leading-9 font-bold">
            The Breackdown Of Your Score
          </h2>
          <Button className="w-[100px] h-10 rounded bg-teal text-[16px] leading-[18px]">
            Export
          </Button>
        </div>
        <div className="mr-[156px] ml-[167px] mt-10 flex flex-col gap-[26px]">
          <div className="flex flex-wrap border border-solid border-[#D9D9D9] rounded-[6px]">
            <div className="flex flex-col gap-[26px] mb-[60px]">
              <div className="flex flex-wrap md:shadow shadow-none rounded-xl">
                <div className="w-full flex items-center md:pl-[17px] pl-0 border-b-[#D9D9D9] border-b border-solid h-[62px]">
                  <Button className="bg-[#F63636] md:text-base sm:text-sm text-xs sm:w-[130px] w-[100px] font-bold font-abhaya">
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
                                <h4 className="mt-3 md:text-base text-xs font-abhaya pb-2">
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
        </div>

        <div className="sm:hidden block">
          <div className="xl:px-0 px-5">
            <Tabs defaultValue="introductory" className="w-full">
              <TabsList className="p-0 h-[45px]">
                <TabsTrigger
                  value="introductory"
                  className="font-abhaya text-xs sm:px-6 font-bold text-[#00000080] data-[state=active]:text-[white] data-[state=active]:bg-[#F63636] rounded-md border-transparent h-[36px] w-[100px]"
                >
                  Introductory
                </TabsTrigger>
                <TabsTrigger
                  value="intermediate"
                  className="text-xs sm:px-6 px-2 font-abhaya font-bold text-[#00000080] data-[state=active]:text-[black] data-[state=active]:bg-[#FFD56A] rounded-md border-transparent h-[36px] w-[100px]"
                >
                  Intermediate
                </TabsTrigger>
                <TabsTrigger
                  value="advanced"
                  className="text-xs sm:px-6 px-2 font-abhaya font-bold text-[#00000080] data-[state=active]:text-[white] data-[state=active]:bg-[#64A70B] rounded-md border-transparent h-[36px] w-[100px]"
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
                          className="h-auto p-0 bg-white hover:bg-transparent font-abhaya"
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
                              <h4 className="mt-3 md:text-base text-xs font-abhaya pb-2">
                                {item.pillarname}
                              </h4>
                              <span className="md:text-[32px] sm:text-[24px] text-[18px] font-bold font-abhaya">
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
                      {item.totalpoints >= "40" && item.totalpoints < "70" && (
                        <Button
                          type="button"
                          variant={"ghost"}
                          className="h-auto p-0 bg-white hover:bg-transparent font-abhaya"
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
                              <h4 className="mt-3 md:text-base text-xs font-abhaya pb-2">
                                {item.pillarname}
                              </h4>
                              <span className="md:text-[32px] sm:text-[24px] text-[18px] font-bold font-abhaya">
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
                          className="h-auto p-0 bg-white hover:bg-transparent font-abhaya"
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
        <div className="mt-[40px] text-center text-green-500">
          <p>
            Now...time to get a personalised action plan to advance your green
            feet!{" "}
          </p>
        </div>
        <div className="mt-[15px] mb-[30px]">
          <Button
            onClick={handleMaturity}
            className=" leading-5  font-abhaya bg-[#64A70B] w-[266px] h-[50px]  text-[20px] mt-[20px] ml-[550px]"
          >
            Get Your Action Plan
          </Button>
        </div>

        <div className="mb-240px">
          <Footer />
        </div>

        <MaturityLevelModel
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          pillerName={pillerName}
          setPillerName={setPillerName}
        />

        <Loading isLoading={isPending} />
      </div>
    </div>
  );
};

export default MaturityLevelPage;
