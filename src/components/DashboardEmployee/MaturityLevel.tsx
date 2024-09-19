import Ellipse_one from "@/assets/images/Ellipse1.png";
import Ellipse_two from "@/assets/images/Ellipse2.png";
import Ellipse_three from "@/assets/images/Ellipse3.png";
import Ellipse_four from "@/assets/images/Ellipse4.png";
import Ellipse_five from "@/assets/images/Ellipse5.png";
import { useAppSelector } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { getAllassessment } from "@/services/apiServices/assessment";
import { fetchClientwiseMaturityLevel } from "@/services/apiServices/maturityLevel";
import { useQuery } from "@tanstack/react-query";
import { Doughnut } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import Arrow_Right from "@/assets/images/Arrow_Right.png";
import { assessmentQuestionScore, getCheckedMeasuresByAssessment } from "@/services/apiServices/pillar";
import { useMemo } from "react";
import moment from "moment";

const findMaturityLevel = (score: number, maturityLevel: any) => {
  for (const level of maturityLevel) {
    if (score >= level.rangeStart && score <= level.rangeEnd) {
      return level;
    }
  }
  return null;
};

const MaturityLevel = () => {
  const { clientId, UserId } = useAppSelector((state) => state.user);
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const userID =
    userData?.query?.role === "4"
      ? userData?.company?.userDetails?.id
      : UserId
      ? +UserId
      : userData?.query
      ? userData?.query?.id
      : userData?.id;

  const { data: fetchClientmaturitylevel } = useQuery({
    queryKey: [QUERY_KEYS.fetchbyclientMaturity],
    queryFn: () => fetchClientwiseMaturityLevel(clientId as string),
  });

  const { data: allassessmant } = useQuery({
    queryKey: [QUERY_KEYS.totalAssessment],
    queryFn: () => getAllassessment(userID, clientId),
  });

  const score = (
    (+allassessmant?.data?.data?.avTotalpoints /
      +allassessmant?.data?.data?.avTotalmaxpoint) *
    100
  ).toFixed(2);

  const setScore = isNaN(Number(score)) ? 0 : score;
  const currentLavel =
    fetchClientmaturitylevel &&
    findMaturityLevel(Number(setScore), fetchClientmaturitylevel?.data);

  const data = {
    labels: ["Introductory", "Intermediate", "Advanced"],
    datasets: [
      {
        label: "Poll",
        data: [setScore, 100 - Number(setScore)],
        backgroundColor: [currentLavel?.color, "#D1D1D1"],
        borderColor: [currentLavel?.color, "#D1D1D1"],
        hoverColor: [currentLavel?.color, "#D1D1D1"],
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
            label += Math.round(context.parsed * 100) + "%";
            return label;
          },
        },
      },
    },
    hover: {
      mode: undefined,
    },
  };

  // const Labels = () => (
  //   <div className="left-0 top-0 h-full md:flex block items-center gap-5">
  //     {fetchClientmaturitylevel?.data?.map((label, index) => {
  //       localStorage.setItem(
  //         "maturityLevelName",
  //         JSON.stringify(label?.maturityLevelName)
  //       );
  //       return (
  //         <div key={index} className="flex items-center relative mt-4">
  //           <div
  //             style={{
  //               backgroundImage: `linear-gradient(to right, ${label?.color}, ${label?.color}, rgba(255, 82, 82, 0))`,
  //             }}
  //             className={`w-[60px] h-[27px] rounded-l-lg rounded-r-none `}
  //           ></div>
  //           <div className="text-base text-black font-droid rounded-r-lg ms-[-30px]">
  //             {label?.maturityLevelName}
  //           </div>
  //         </div>
  //       );
  //     })}
  //   </div>
  // );

  const getNextLevel = (currentLevel:string) => {
    const maturityLevel:any = fetchClientmaturitylevel?.data?.map((item) => item?.maturityLevelName)
    const currentIndex:any = maturityLevel?.indexOf(currentLevel);
    if (currentIndex === -1) {
        return "Level not found";
    }
    if (currentIndex < maturityLevel?.length - 1) {
        return maturityLevel[currentIndex + 1];
    } else {
        return maturityLevel && maturityLevel[currentIndex];
    }
  };

  // @ts-ignore
  const { data: getCheckedmeasures, isFetching } = useQuery({
    queryKey: [QUERY_KEYS.checkedMeasuresbyAssessment],
    // @ts-ignore
    queryFn: () =>
      getCheckedMeasuresByAssessment({
        userId: userID,
        clientId,
        assNumber: "1",
      }),
  });

  // @ts-ignore
  const pillarCompleted = useMemo(() => {
    return getCheckedmeasures?.data?.data?.find(
      (item: any) => +item?.progressPR === 100
    );
  }, [getCheckedmeasures]);

  const { data: assessmentQuestionScoreLIST } = useQuery({
    queryKey: [
      QUERY_KEYS.assessmentQuestionScore,
      { pillarCompleted: pillarCompleted?.id, userID, clientId },
    ],
    queryFn: () => assessmentQuestionScore(+userID, +clientId),
  });
  const assessmentQuestionScoreData = assessmentQuestionScoreLIST?.data;
  
  
  return (
    <div className="mb-8">
      <div className="mb-5">
        <h3 className="font-bold font-droid xl:text-[22px] text-[18px] border-b-2 inline-block border-[#75BD43] relative pb-1">
          Current Sustainability Level
          {/* <div className="bg-[#75BD43] w-full h-[2px] absolute left-0 bottom-0"></div> */}
        </h3>
      </div>
      <Link
        to="/employee/maturityAssessment"
        className="relative flex items-center gap-10"
      >
        <div className="flex sm:order-1 order-2">
          <div className="md:w-52 sm:w-[170px] w-[150px] h-[150px] sm:h-[170px] md:h-52 relative">
            <Doughnut data={data} options={options} plugins={[textCenter]} />
          </div>
        </div>
        <div className="w-full sm:order-2 order-1 border sm:border-[#D9D9D9] border-transparent rounded-xl h-[200px] flex items-center relative overflow-hidden">
          <div className="sm:ps-10 ps-0">
            <div className="flex items-center relative lg:mt-0 mt-[21px] mb-5">
              <Button
                className={`${
                  currentLavel?.maturityLevelName === "Advanced"
                    ? "bg-[#258483]"
                    : currentLavel?.maturityLevelName === "Introductory"
                    ? "bg-[#C92C35]"
                    : "bg-[#FFD56A]"
                } text-black sm:text-base text-xs font-Calibri rounded-full h-[30px] xl:px-4 xl:py-2 p-2.5`}
              >
                {currentLavel?.maturityLevelName}
              </Button>
              <div className="relative border border-dashed border-[#A6A6A6] xl:w-40 lg:w-24 w-full">
                <img
                  src={Arrow_Right}
                  alt="Arrow"
                  className="absolute bottom-0 top-0 left-0 right-0 m-auto"
                />
              </div>
              <Button
                className={`text-black sm:text-base text-xs rounded-full xl:px-4 xl:py-2 p-2.5 ${
                  currentLavel?.maturityLevelName && getNextLevel(currentLavel?.maturityLevelName) === "Advanced"
                    ? "bg-[#258483]"
                    : getNextLevel(currentLavel?.maturityLevelName) === "Introductory"
                    ? "bg-[#C92C35]"
                    : "bg-[#FFD56A]"
                } h-[30px]`}
              >
                {currentLavel?.maturityLevelName && getNextLevel(currentLavel?.maturityLevelName)}
              </Button>
            </div>
            <h2>Last Assessment Taken On: {assessmentQuestionScoreData ? moment(new Date(assessmentQuestionScoreData[assessmentQuestionScoreData?.length - 1]?.completedAssessmentDate || "-"))?.format("DD-MM-YYYY") : "-"}</h2>
          </div>
          <img
            src={Ellipse_one}
            alt="ellipse"
            className="absolute xl:right-[10%] right-[5%] bottom-0 m-auto sm:block hidden"
          />
          <img
            src={Ellipse_two}
            alt="ellipse"
            className="absolute top-0 right-0 sm:block hidden"
          />
          <img
            src={Ellipse_three}
            alt="ellipse"
            className="absolute top-0 right-0 sm:block hidden"
          />
          <img
            src={Ellipse_four}
            alt="ellipse"
            className="absolute top-0 right-[20%] sm:block hidden"
          />
          <img
            src={Ellipse_five}
            alt="ellipse"
            className="absolute bottom-0 right-[20%] sm:block hidden"
          />
          <img
            src={Ellipse_five}
            alt="ellipse"
            className="absolute bottom-[-10px] right-[21%] sm:block hidden"
          />
        </div>
      </Link>
      <div className="md:mb-5 mb-0 sm:hidden block order-3">
        <p className="inline">Your overall sustainability Score -</p>{" "}
        <span className="font-poppins font-bold text-[#000000] leading-6">
          Intermediate
        </span>
      </div>
    </div>
  );
};

export default MaturityLevel;
