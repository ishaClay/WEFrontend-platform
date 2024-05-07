import Footer from "@/components/Footer";
import TeaserScoreHeader from "@/components/TeaserScoreHeader";
import { Button } from "@/components/ui/button";
import { QUERY_KEYS } from "@/lib/constants";
import { fetchAssessment, getAllassessment } from "@/services/apiServices/assessment";
import { useQuery } from "@tanstack/react-query";
import { Doughnut } from 'react-chartjs-2';
import { useNavigate } from "react-router-dom";
import GovernanceGray from "../../public/assets/img/GovernanceGray.png";
import SocialGray from "../../public/assets/img/SocialGray.png";
import StrategicIntegrationGray from "../../public/assets/img/StrategicIntegrationGray.png";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress"
import Loading from "@/components/comman/Error/Loading";



const MaturityLevelPage = () => {

  const navigate = useNavigate()
  const UserId = useSelector((state: any) => state.user.UserId);


  const { data: assessmant, isPending } = useQuery({
    queryKey: [QUERY_KEYS.assessment],
    queryFn: () => fetchAssessment(UserId),
  });

  console.log(assessmant);
  
  
  const { data: allassessmant } = useQuery({
    queryKey: [QUERY_KEYS.totalAssessment],
    queryFn: () => getAllassessment(UserId),
  });

  const score = ((+allassessmant?.data?.data?.avTotalpoints / +allassessmant?.data?.data?.avTotalmaxpoint) * 100).toFixed(2);
  // const currentLavel = findMaturityLevel(Number(score));

  const data = {
    labels: ['Introductory', 'Intermediate', 'Advanced',],
    datasets: [{
      label: 'Poll',
      data: [score, 100 - Number(score)],
      backgroundColor: ['#FFD56A', '#D1D1D1', 'red'],
      borderColor: ['#FFD56A', '#D1D1D1', 'red',],

    }]
  };


  const textCenter = {
    id: 'textCenter',
    beforeDatasetDraw(chart: any) {
      const { ctx, data } = chart;
      ctx.save();
      ctx.font = 'bold 25px sans-serif';
      ctx.fillStyle = 'black';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${data.datasets[0].data[0]}%`, chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y)
      ctx.restore();
    }
  };

  const options = {
    cutout: '80%',
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            label += Math.round(context.parsed * 100) + '%';
            return label;
          }
        }
      }
    }
  };

  const Labels = () => (
    <div className="absolute left-0 top-0 flex flex-col justify-center h-full mt-[60px]">
      {data.labels.map((label, index) => {
        let colorClass, opacityClass;
        if (index === 0) {
          colorClass = 'bg-gradient-to-r from-red-500 via-red-500 to-transparent';
          opacityClass = 'bg-opacity-25';

        } else if (index === 1) {
          colorClass = 'bg-gradient-to-r from-yellow-500 via-yellow-500 to-transparent';
          opacityClass = 'bg-opacity-50';

        } else {
          colorClass = 'bg-gradient-to-r from-green-500 via-green-500 to-transparent';
          opacityClass = 'bg-opacity-75';

        }
        return (
          <div key={index} className="text-sm flex flex-col items-center relative  mt-10 h-6">
            <div className={`absolute left-0 top-0 h-full w-2/6 ${colorClass} ${opacityClass} rounded-l-lg rounded-r-none `}></div>
            <div className="ml-2 pl-2 rounded-r-lg">{label}</div>

          </div>
        );
      })}
      <div className="mt-[20px] mb-[100px]">
        <p className="font-abhaya font-extrabold text-base leading-[18.88px]">Total Score-<span className="font-abhaya font-extrabold text-4xl leading-[49.55px]">
          {allassessmant?.data?.data?.avTotalpoints}
        </span>
          <span className="font-abhaya font-extrabold text-base leading-[18.88px] text-[#64A70B]">/{allassessmant?.data?.data?.avTotalmaxpoint}</span>
        </p>
      </div>
    </div>
  );


  return (
    <div className="text-[16px] leading-[19.53px] font-normal text-darkslategray-100 font-calibri">
      <TeaserScoreHeader />
      <div className="flex ml-[172px] mr-[152px] justify-between">
        <div className="h-[369px] pt-[38px]">
          <h3 className="max-w-[290.34px] text-2xl font-bold leading-[29.3px]">
            How does "Company Name" measure up?
          </h3>
          <hr className="border-2 border-solid border-[#64A70B] w-[117px] mt-[15px] mb-[17px]" />
          <div className="max-w-[602.78px]">
            <p className="">
              Congratulations! 🎉You've completed your sustainability assessment, and now it's time to unveil your results! Below, you'll find a comprehensive breakdown of your sustainability score,
            </p>
            <p className="mt-5">
              Along with personalized insights and recommendations to further enhance your journey towards a greener future. Dive in and explore how you can make a meaningful impact on the planet while embracing sustainable practices in your everyday life.
            </p>
          </div>
        </div>
        <div>
          <div className=" mt-0 mb-6 mr-18 ml-8   relative">

            <Labels />
            <div className="text-center mt-8 mb-0 mr-8 ml-20  relative">
              <div className="w-40 h-40 mt-0 ml-16 relative">
                <Doughnut data={data} options={options} plugins={[textCenter]} />
              </div>

            </div>
          </div>
          <div className="mt-[60px]">
            <p className="inline ml-[35px] ">Your overall sustainability level -</p>{" "}
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
              Introductory
            </Button>
          </div>

          {
            assessmant?.data?.data.map((item: any) => (

              <>
                {
                  item.totalpoints < "40" &&

                  (
                    <div className="pt-8 pl-[30px] pb-5 flex gap-5">
                      <div onClick={() => navigate(`/maturitylevelanswerspopup`)} className="border border-solid border-[red] w-[223.4px] h-[150px] rounded-[14.06px] flex flex-col items-center p-3">
                        <img
                          src={StrategicIntegrationGray}
                          alt="img"
                          className="w-[52px] h-[52px]"
                        />
                        <h4 className="mt-3">{item.pillarname}</h4>
                        <span className="mt-[6px] text-[32px] leading-[39.06px] font-bold">
                          {item.totalpoints * item.totalmaxpoint / 100}%
                        </span>
                      </div>
                    </div>

                  )
                }

              </>
            ))
          }
        </div>

        <div className="flex flex-wrap border border-solid border-[#D9D9D9] rounded-[6px]">
          <div className="w-full flex items-center pl-[17px] border-b-[#D9D9D9] border-b border-solid h-[62px]">
            <Button className="bg-[#FFD56A] text-[16px] leading-5 w-[130px] font-bold text-black">
              Intermediate
            </Button>
          </div>
          {
            assessmant?.data?.data.map((item: any) => (
              <>
                {
                  item.totalpoints >= "40" && item.totalpoints < "70" &&
                  (


                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="pt-8 pl-[30px] pb-5 flex gap-5">
                          <div className="border border-solid border-[#FFD56A] w-[223.4px] h-[150px] rounded-[14.06px] flex flex-col items-center p-3">
                            <img
                              src={GovernanceGray}
                              alt="img"
                              className="w-[52px] h-[52px]"
                            />
                            <h4 className="mt-3">Governance</h4>
                            <span className="mt-[6px] text-[32px] leading-[39.06px] font-bold">
                              56%
                            </span>
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[52rem] z-[999]">
                        <DialogHeader>
                          <DialogTitle>Have you identified actionable items on provided measures?</DialogTitle>

                        </DialogHeader>

                        <div className="flex">
                          <div className="h-[105px] w-[270px] flex flex-col">
                            <div className="flex ">
                              <div className=" ml-4 mt-0 bg-white rounded-full drop-shadow-md w-[42px] h-[42px] p-2 mb-2">
                                <img src="/public/assets/img/Path Steps.png" alt="Leaf Icon" />
                              </div>

                              <div className="ml-2 mt-2 h-[25px] w-[203px]">
                                <h2 className="text-xm text-[#1D2026] font-calibri text-lg font-semibold">
                                  Strategic Integration
                                </h2>
                              </div>
                            </div>

                            <div className="h-[19px] w-[270px]  flex mt-[35px]">
                              <div className="h-[19px] w-[86px] flex">
                                <div className="h-[12px] w-[12px] rounded  bg-[#F63636] mt-[3px]"></div>
                                <div className="h-[19px] w-[62.21px] text-xs ml-[10px]">
                                  Introductory
                                </div>
                              </div>

                              <div className="h-[19px] w-[86px] flex ml-[12px]">
                                <div className="h-[12px] w-[12px] rounded  bg-[#FFD56A] mt-[3px] "></div>
                                <div className="h-[19px] w-[65px] text-xs ml-[10px]">
                                  Intermediate
                                </div>
                              </div>
                              <div className="h-[19px] w-[86px] flex ml-[12px]">
                                <div className="h-[12px] w-[12px] rounded  bg-[#64A70B] mt-[3px] "></div>
                                <div className="h-[19px] w-[49px] text-xs ml-[10px]">
                                  Advanced
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="h-[105px] w-[270px] ">
                            <div className="ml-3 mt-2 h-[25px] w-[230px]">
                              <h2 className=" text-xm text-[#1D2026] font-calibri text-lg font-semibold">
                                Maturity level of your answers
                              </h2>
                            </div>
                          </div>

                        </div>

                          <div className="flex  flex-col mt-6">
                            <div className="flex gap-2">
                              <div className="flex flex-col border p-3 rounded-lg w-[252px] h-[150px]">
                                <div className="text-xs font-bold">Question : 01</div>
                                <div className="mb-3 mt-2 h-[75px] w-[230px]  font-calibri text-sm font-normal leading-[17.4px] text-left">
                                  {`Does your business have a clearly defined vision, mission, and values that reflect a commitment to sustainability and social responsibility?Equipment Sales Specialist`}
                                </div>

                                <Progress className="" value={33} color ="green"/>  
                              </div>

                              <div className="flex flex-col border p-3 rounded-lg w-[252px] h-[150px]">
                                <div className="text-xs font-bold">Question : 02</div>
                                <div className="mb-3 mt-2 h-[75px] w-[230px]  font-calibri text-sm font-normal leading-[17.4px] text-left">
                                  {`How does your business integrate sustainability into its overall business strategy and decision-making processes? `}
                                </div>

                                <Progress value={33} color="red" />
                              </div>

                              <div className="flex flex-col border p-3 rounded-lg w-[252px] h-[150px]">
                                <div className="text-xs font-bold">Question : 03</div>
                                <div className="mb-3 mt-2 h-[75px] w-[230px]  font-calibri text-sm font-normal leading-[17.4px] text-left">
                                  {`How well does your business align its strategy with United Nations Sustainable Development Goals (UNSDGs) or other recognised sustainability standards or goals?`}
                                </div>

                              <Progress value={33} color="#fcd56a" />
                              </div>
                            </div>

                            <div className="flex gap-2 mt-[6px] h-[150px] w-[508px]">
                              <div className="flex flex-col border p-3 rounded-lg w-[252px] h-[150px]">
                                <div className="text-xs font-bold">Question : 04</div>
                                <div className="mb-3 mt-2 h-[75px] w-[230px]  font-calibri text-sm font-normal leading-[17.4px] text-left">
                                  {`How do you communicate your commitment to sustainability to your customers, clients, and the public?`}
                                </div>

                                <Progress value={33} color="red" />    
                              </div>

                              <div className="flex flex-col border p-3 rounded-lg w-[252px] h-[150px]">
                                <div className="text-xs font-bold">Question : 05</div>
                                <div className="mb-3 mt-2 h-[75px] w-[230px]  font-calibri text-sm font-normal leading-[17.4px] text-left">
                                  {`Does our business actively engage in collaborative efforts to influence policy and drive systemic changes that contribute to the global transition towards a sustainable future?`}
                                </div>

                                <Progress value={33} color="green" />
                              
                              </div>
                            </div>


                          </div>


                        <DialogFooter className="sm:justify-end">
                          <DialogClose asChild>
                            <Button type="button" variant="secondary">
                              Close
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )
                }
              </>
            ))
          }
        </div>

        <div className="flex flex-wrap border border-solid border-[#D9D9D9] rounded-[6px]">
          <div className="w-full flex items-center pl-[17px] border-b-[#D9D9D9] border-b border-solid h-[62px]">
            <Button className="bg-[#64A70B] text-[16px] leading-5 w-[130px] font-bold">
              Advanced
            </Button>
          </div>
          {
            assessmant?.data?.data.map((item: any) => (
              < >
                {
                  item.totalpoints >= "70" && (
                    <div className="pt-8 pl-[30px] pb-5 flex gap-5">
                      <div className="border border-solid border-[green] w-[223.4px] h-[150px] rounded-[14.06px] flex flex-col items-center p-3">
                        <img src={SocialGray} alt="img" className="w-[52px] h-[52px]" />
                        <h4 className="mt-3">Social</h4>
                        <span className="mt-[6px] text-[32px] leading-[39.06px] font-bold">
                          75%
                        </span>
                      </div>
                    </div>
                  )
                }
              </>
            ))
          }

        </div>
      </div>

      <div className="mt-[40px]">
        <Button onClick={() => navigate("/selectlevel")} className="bg-[#64A70B] text-[16px] leading-5 w-[180px] font-bold ml-[650px]">
          Set targets
        </Button>
      </div>
      <div className="mt-[15px] ml-[340px] text-green-500 mb-[30px]">
        <p>Keep up the fantastic work, and remember, every small step counts towards a brighter and more sustainable world! </p>
      </div>
      <div className="mb-240px"><Footer /></div>

      <Loading isLoading={isPending} />
    </div>
  );
};

export default MaturityLevelPage;

