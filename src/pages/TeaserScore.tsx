import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { useAppSelector } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { getAllassessment } from "@/services/apiServices/assessment";
import { enumUpadate } from "@/services/apiServices/enum";
import {
  fetchClientwiseMaturityLevel,
  fetchmaturityLevel,
} from "@/services/apiServices/maturityLevel";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);

const maturityLevel = [
  {
    maturityLevelName: "Introductory",
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
    maturityLevelName: "Advance",
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

const TeaserScore = () => {
  const navigate = useNavigate();
  const UserId = useAppSelector((state) => state.user.UserId);
  const { clientId } = useAppSelector((state) => state.user);
  const queryClient = useQueryClient();
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const userID = UserId
    ? UserId
    : userData?.query
    ? userData?.query?.id
    : userData?.id;

  const { data: maturitylevel } = useQuery({
    queryKey: [QUERY_KEYS.maturityLevel],
    queryFn: () => fetchmaturityLevel(),
  });

  const { data: fetchClientmaturitylevel } = useQuery({
    queryKey: [QUERY_KEYS.fetchbyclientMaturity],
    queryFn: () => fetchClientwiseMaturityLevel(clientId as string),
  });
  console.log(fetchClientmaturitylevel);

  const { data: allassessmant } = useQuery({
    queryKey: [QUERY_KEYS.totalAssessment],
    queryFn: () => getAllassessment(userID),
  });

  const path = 3 + 1;
  const { mutate: EnumUpadate }: any = useMutation({
    mutationFn: () => enumUpadate({ path: path.toString() }, userID),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.enumUpadateList],
      });
    },
  });

  const handleScore = () => {
    EnumUpadate(path);
    navigate("/companyregister");
  };

  const score = Number(
    (
      (+allassessmant?.data?.data?.avTotalpoints /
        +allassessmant?.data?.data?.avTotalmaxpoint) *
      100
    ).toFixed(2)
  );
  const setScore = isNaN(score) ? 0 : score;

  const currentLavel = findMaturityLevel(Number(score));

  const data = {
    labels: [currentLavel?.maturityLevelName],
    datasets: [
      {
        label: "Poll",
        data: [setScore, 100 - Number(setScore)],
        backgroundColor: [currentLavel?.color, "#E8E8E8"],
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
            label += Math.round(context.parsed) + "%";
            return label;
          },
        },
      },
    },
  };

  const Labels = () => (
    <div className="flex flex-col justify-center h-fulzl w-[200px]">
      {(fetchClientmaturitylevel?.data?.data?.length > 0
        ? fetchClientmaturitylevel?.data?.data
        : maturitylevel?.data.data
      )?.map((label: any, index: number) => {
        return (
          <div
            key={index}
            className="text-sm flex flex-col items-center relative  mt-10 h-6"
          >
            <div
              style={{
                backgroundImage: `linear-gradient(to right, ${label?.color}, ${label?.color}, rgba(255, 82, 82, 0))`,
              }}
              className={`absolute left-0 h-full w-2/4 rounded-l-lg rounded-r-none`}
            ></div>
            <div className="rounded-r-lg mt-[2px]">
              {label.maturityLevelName}
            </div>
            <div className="rounded-r-lg">
              {label?.rangeStart} to {label?.rangeEnd}
            </div>
          </div>
        );
      })}
    </div>
  );

  // const dataArray = data && data?.datasets?.map((item) => item.data.map((item) => item))

  // const dataValue = dataArray.find((x) => !x.includes(NaN))
  // // // console.log(dataValue)
  // const a =(dataValue == undefined) ? 0 : dataValue

  // console.log(a)
  // console.log(data)

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="bg-[url('../assets/img/backgroundscore.png')]">
        <div className="w-full max-w-[800px] mx-auto mt-20 mb-32 flex justify-center">
          <div className="border-t-8 border-solid border-[#00778B] flex justify-between bg-white rounded-lg w-full">
            <div className="flex w-full">
              <div className="mr-0">
                <div className="flex flex-col pl-8 pt-4">
                  <div className="flex items-center">
                    <CardTitle className="text-xl font-bold">Hooray!</CardTitle>
                    <img
                      className="w-[32px] h-[32px] ml-3 mb-0"
                      src="../assets/img/Green.png"
                      alt="Green checkmark"
                    />
                  </div>
                  <div className="bg-[#64A70B] h-[2px] w-20 mt-0 ml-0"></div>
                </div>
                <div></div>
                <div className=" pr-0 flex">
                  <div className="pl-8 flex-1">
                    <CardDescription className="text-sm font-[calibri] text-[#002A3A]">
                      You've taken the first stride on your sustainability
                      journey!🌿
                    </CardDescription>
                    <p className="font-bold font-[calibri] text-[#002A3A] my-[12px]">
                      Curious about your progress?
                    </p>
                    <p className="text-sm font-[calibri] text-[#002A3A]">
                      To view the full results and embark on the complete
                      learning
                      <br />
                      experience, hop over to our registration page. Your
                      adventure
                      <br />
                      towards sustainability is about to get even more exciting!
                      🚀
                      <br />
                    </p>
                    <button
                      className="bg-[#00778B] text-white py-2 px-4 rounded-md ml-0 mt-4 font-semibold"
                      onClick={handleScore}
                    >
                      Complete your Registration
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-between max-w-[calc(100%_-_382px)] mb-10">
                <div className="p-4 relative w-full">
                  <h2 className="text-lg font-semibold">
                    Here's a sneak peek at your score!
                  </h2>
                  <div className="flex w-full justify-between">
                    <Labels />
                    <div className="text-center mt-8 mb-0 mr-8 ml-20  relative">
                      <div className="w-40 h-40 mt-0 ml-16 relative">
                        <Doughnut
                          data={data}
                          options={options}
                          plugins={[textCenter]}
                        />
                      </div>
                      <div>
                        <button
                          style={{ backgroundColor: currentLavel?.color }}
                          className=" text-white font-bold py-1 px-4 mt-3 ml-20 rounded"
                        >
                          {currentLavel?.maturityLevelName}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default TeaserScore;
