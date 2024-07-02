import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MaturityLevelModel from "@/components/Models/MaturityLevelModel";
import Loading from "@/components/comman/Error/Loading";
import { Button } from "@/components/ui/button";
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
    <div className="absolute left-0 top-0 flex flex-col justify-center h-full mt-[60px]">
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
            className="text-sm flex flex-col items-center relative  mt-10 h-6"
          >
            <div
              className={`absolute left-0 top-0 h-full w-2/6 ${colorClass} ${opacityClass} rounded-l-lg rounded-r-none `}
            ></div>
            <div className="ml-2 pl-2 rounded-r-lg">{label}</div>
          </div>
        );
      })}
      <div className="mt-[20px] mb-[100px]">
        <p className="font-abhaya font-extrabold text-base leading-[18.88px]">
          Total Score-
          <span className="font-abhaya font-extrabold text-4xl leading-[49.55px]">
            {allassessmant?.data?.data?.avTotalpoints}
          </span>
          <span className="font-abhaya font-extrabold text-base leading-[18.88px] text-[#64A70B]">
            /{allassessmant?.data?.data?.avTotalmaxpoint}
          </span>
        </p>
      </div>
    </div>
  );

  const isShowHeader =
    location.pathname !== "/company/maturityassessmentroadmap";

  return (
    <div className="text-[16px] leading-[19.53px] font-normal text-darkslategray-100 font-calibri">
      {isShowHeader && <Header />}
      <div className="mainContailner">
        <div className="flex ml-[172px] mr-[152px] justify-between">
          <div className="pt-[38px]">
            <h3 className="text-2xl font-bold leading-[29.3px]">
              Where {userData?.company?.name} <br /> Green Feet are now...
            </h3>
            <hr className="border-2 border-solid border-[#64A70B] w-[117px] mt-[15px] mb-[17px]" />
            <div className="max-w-[602.78px]">
              <p className="text-[#3A3A3A] font-abhaya leading-[20px] lg:text-base sm:text-sm text-xs mb-5 ">
                Here’s how you did across the 6 pillars of sustainability as a
                business!
              </p>
              <div className="pb-5">
                <h6 className="lg:text-base sm:text-sm-abhaya text-[#3A3A3A] font-semibold">
                  But what your score really means?{" "}
                </h6>
                <h6 className="lg:text-base sm:text-sm font-abhaya text-[#64A70B] font-semibold">
                  This is where your journey starts. 
                </h6>
              </div>
              <p className="text-[#3A3A3A] font-abhaya leading-[20px] lg:text-base sm:text-sm text-xs">
                Now that you know where you are, it’s time to get an action plan
                built from personalised insights to advance your company to its
                next green stage.
              </p>
              <div className="flex items-center gap-5 mt-5">
                <Button className="px-8 text-base font-abhaya bg-[#64A70B] rounded-sm h-12">
                  Build My Action Plan
                </Button>
                <Button className="px-8 text-base font-abhaya bg-[#00778B] rounded-sm h-12">
                  Build My Action Plan
                </Button>
              </div>
            </div>
          </div>
          <div>
            <div className=" mt-0 mb-6 mr-18 ml-8   relative">
              <Labels />
              <div className="text-center mt-8 mb-0 mr-8 ml-20  relative">
                <div className="w-40 h-40 mt-0 ml-16 relative">
                  <Doughnut
                    data={data}
                    options={options}
                    plugins={[textCenter]}
                  />
                </div>
              </div>
            </div>
            <div className="mt-[60px]">
              <p className="inline ml-[35px] ">
                Your overall sustainability score -
              </p>{" "}
              <span className="font-poppins font-bold text-[#000000] leading-6">
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
            How you fare across the Maturity levels
          </h2>
          <Button className="w-[100px] h-10 rounded bg-teal text-[16px] leading-[18px]">
            Export
          </Button>
        </div>
        <div className="mr-[156px] ml-[167px] mt-10 flex flex-col gap-[26px]">
          <div className="flex flex-wrap border border-solid border-[#D9D9D9] rounded-[6px]">
            <div className="w-full flex items-center pl-[17px] border-b-[#D9D9D9] border-b border-solid h-[62px]">
              <Button className="bg-[#F63636] text-[16px] leading-5 w-[130px] font-bold">
                Beginning
              </Button>
            </div>

            <div className="flex items-center flex-wrap gap-[20px] pt-8 pl-[30px] pb-5">
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
                      <div className="flex gap-5">
                        <div className="border border-solid border-[#F63636] bg-[#F63636] text-white w-[223.4px] h-[150px] rounded-[14.06px] flex flex-col items-center p-3">
                          <div className="p-2.5 bg-white rounded-full">
                            <img
                              src={getImages(item.pillarname)}
                              alt="img"
                              className=""
                            />
                          </div>
                          <h4 className="mt-3">{item.pillarname}</h4>
                          <span className="mt-[6px] text-[32px] leading-[39.06px] font-bold">
                            {item?.totalpoints}%
                          </span>
                        </div>
                      </div>
                    </Button>
                  )}
                </>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap border border-solid border-[#D9D9D9] rounded-[6px]">
            <div className="w-full flex items-center pl-[17px] border-b-[#D9D9D9] border-b border-solid h-[62px]">
              <Button className="bg-[#FFD56A] text-[16px] leading-5 w-[130px] font-bold text-black hover:text-white">
                Intermediate
              </Button>
            </div>
            <div className="flex items-center flex-wrap gap-[20px] pt-8 pl-[30px] pb-5">
              {assessmant?.data?.data.map((item: any) => (
                <>
                  {item.totalpoints >= "40" && item.totalpoints < "70" && (
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
                      <div className="flex gap-5">
                        <div className="border border-solid border-[#FFD56A] bg-[#FFD56A] w-[223.4px] h-[150px] rounded-[14.06px] flex flex-col items-center p-3">
                          <div className="p-2.5 bg-white rounded-full">
                            <img
                              src={getImages(item.pillarname)}
                              alt="img"
                              className=""
                            />
                          </div>
                          <h4 className="mt-3">{item.pillarname}</h4>
                          <span className="mt-[6px] text-[32px] leading-[39.06px] font-bold">
                            {item?.totalpoints}%
                          </span>
                        </div>
                      </div>
                    </Button>
                  )}
                </>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap border border-solid border-[#D9D9D9] rounded-[6px]">
            <div className="w-full flex items-center pl-[17px] border-b-[#D9D9D9] border-b border-solid h-[62px]">
              <Button className="bg-[#64A70B] text-[16px] leading-5 w-[130px] font-bold">
                Advanced
              </Button>
            </div>
            <div className="flex items-center flex-wrap gap-[20px] pt-8 pl-[30px] pb-5">
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
                      <div className="pt-8 pl-[30px] pb-5 flex gap-5">
                        <div className="border border-solid border-[#64A70B] bg-[#64A70B] text-white w-[223.4px] h-[150px] rounded-[14.06px] flex flex-col items-center p-3">
                          <div className="p-2.5 bg-white rounded-full">
                            <img
                              src={getImages(item.pillarname)}
                              alt="img"
                              className=""
                            />
                          </div>
                          <h4 className="mt-3">{item.pillarname}</h4>
                          <span className="mt-[6px] text-[32px] leading-[39.06px] font-bold">
                            {item?.totalpoints}%
                          </span>
                        </div>
                      </div>
                    </Button>
                  )}
                </>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-[40px]">
          <Button
            onClick={handleMaturity}
            className="bg-[#64A70B] text-[16px] leading-5 w-[180px] font-bold ml-[650px]"
          >
            Set targets
          </Button>
        </div>
        <div className="mt-[15px] ml-[340px] text-green-500 mb-[30px]">
          <p>
            Keep up the fantastic work, and remember, every small step counts
            towards a brighter and more sustainable world!{" "}
          </p>
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
