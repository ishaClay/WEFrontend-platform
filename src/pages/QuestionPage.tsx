/* eslint-disable @typescript-eslint/ban-ts-comment */
import advanceGreen from "@/assets/images/advanceGreen.svg";
import apply from "@/assets/images/apply.svg";
import develop from "@/assets/images/develop.svg";
import planAction from "@/assets/images/planAction.svg";
import selfAssess from "@/assets/images/selfAssess.svg";
import Footer from "@/components/Footer";
import Loader from "@/components/comman/Loader";
import Question from "@/components/comman/Question";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAppSelector } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { getImages } from "@/lib/utils";
import {
  setActivePillar,
  setGettedAnswer,
  setPillarName,
  setQuestion,
} from "@/redux/reducer/QuestionReducer";
import { enumUpadate } from "@/services/apiServices/enum";
import { fetchClientwisePillarList } from "@/services/apiServices/pillar";
import {
  fetchQuestionAnswerList,
  fetchQuestionList,
} from "@/services/apiServices/question";
import { QuestionType } from "@/types/Question";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Correct from "/assets/img/Correct.png";
import Home from "/assets/img/Home.png";
import LeftArrow from "/assets/img/LeftArrow.png";

const QuestionPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [selectedData, setSelectedData] = useState<string[]>([]);
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const { clientId, UserId } = useAppSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const userID = UserId
    ? UserId
    : userData?.query
    ? userData?.query?.id
    : userData?.id;

  const { activePillar, allPillar } = useAppSelector((state) => state.question);

  const question = useAppSelector((state) => state.question);

  const [totalQuestions, setTotalQuestions] = useState(0);
  const [totalAttemptedQuestions, setTotalAttemptedQuestions] = useState(0);

  const { data: clientwisePillarList } = useQuery({
    queryKey: [QUERY_KEYS.clientwisePillarList],
    queryFn: () => fetchClientwisePillarList(clientId?.toString()),
  });

  const path = 1 + 1;
  const { mutate: EnumUpadate } = useMutation({
    mutationFn: () => enumUpadate({ path: path.toString() }, +userID),
    onSuccess: async (data) => {
      localStorage.setItem("path", JSON.stringify(data.data.data?.pathStatus));
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.enumUpadateList],
      });
    },
  });

  useEffect(() => {
    const pillarName: string[] = clientwisePillarList?.data?.data?.length
      ? clientwisePillarList?.data?.data?.map((itm) => itm?.pillarName)
      : [];

    if (pillarName?.length) {
      dispatch(setPillarName(pillarName));
      dispatch(setActivePillar(pillarName[0]));
      setSelectedData([pillarName[0]]);
    }
  }, [clientwisePillarList?.data?.data, dispatch]);

  useEffect(() => {
    if (
      !activePillar &&
      !!clientwisePillarList?.data?.data &&
      clientwisePillarList?.data?.data?.length > 0 &&
      clientwisePillarList?.data?.data
    ) {
      if (
        !!clientwisePillarList?.data?.data &&
        clientwisePillarList?.data?.data?.length > 0
      ) {
        dispatch(
          setActivePillar(clientwisePillarList?.data?.data[0]?.pillarName)
        );
      }
    }
  }, [clientwisePillarList?.data?.data, activePillar, dispatch]);

  const { data: questionList, isPending } = useQuery({
    queryKey: [QUERY_KEYS.questionList],
    queryFn: () => fetchQuestionList(clientId?.toString()),
  });

  useEffect(() => {
    allPillar?.forEach((i: string) => {
      if (questionList?.data?.data) {
        dispatch(setQuestion({ q: questionList?.data?.data?.[i], p: i }));
      }
    });
  }, [allPillar?.length, questionList?.data?.data, activePillar]);

  const paths = [
    {
      name: "Self-assess",
      img: selfAssess,
      status: "indeterminate",
    },
    {
      name: "Plan Action",
      img: planAction,
      status: "pending",
    },
    {
      name: "Develop",
      img: develop,
      status: "pending",
    },
    {
      name: " Apply",
      img: apply,
      status: "pending",
    },
    {
      name: "Advance Your Green",
      img: advanceGreen,
      status: "pending",
    },
  ];

  console.log(selectedData, "selectedData+++++++++++++");

  useEffect(() => {
    let totalQuestions = 0;
    let totalAttemptedQuestions = 0;

    allPillar?.forEach((pillar: string) => {
      // @ts-ignore
      const pillarQuestions = question[pillar];
      if (pillarQuestions && pillarQuestions.length > 0) {
        totalQuestions += pillarQuestions.length;
        totalAttemptedQuestions += pillarQuestions.filter((que: QuestionType) =>
          que.options.some((opt) => opt.checked)
        ).length;
      }
    });

    setTotalQuestions(totalQuestions);
    setTotalAttemptedQuestions(totalAttemptedQuestions);
  }, [allPillar?.length, question]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    EnumUpadate();
    const allQueAns: any = {};
    allPillar.forEach((pillar: string) => {
      allQueAns[pillar] = question[pillar];
    });
    navigate("/teaserscore");
  };

  const { data: fetchQuestionAnswer } = useQuery({
    queryKey: [QUERY_KEYS.getQuestionAnswer],
    queryFn: () => fetchQuestionAnswerList(userID?.toString()),
    enabled: !!userID,
  });

  const pillarwiseQuestions = allPillar?.map((item: string) => {
    return { q: question?.[item], name: item };
  });

  const updateAnswers = (pillarwiseQuestion: any, fetchQuestionAnswer: any) => {
    if (
      fetchQuestionAnswer?.data?.data &&
      Array.isArray(pillarwiseQuestion?.q)
    ) {
      // eslint-disable-next-line no-unsafe-optional-chaining
      const updatedAnswers = [...pillarwiseQuestion?.q];
      fetchQuestionAnswer.data.data.forEach((j: any) => {
        if (j) {
          const c = pillarwiseQuestion?.q.find(
            (i: any) => i?.id === j?.questionId?.id
          );
          if (c) {
            const d = c.options.find(
              (o: any) => o?.optionId === j?.selectedOptions[0]?.optionId
            );
            if (d) {
              const updatedOption = { ...d, checked: true };
              const updatedOptions = c.options.map((o: any) =>
                o.optionId === updatedOption.optionId ? updatedOption : o
              );

              const updatedC = { ...c, options: updatedOptions };

              const index = updatedAnswers.findIndex(
                (itemA) => updatedC.id === itemA.id
              );
              if (index !== -1) {
                updatedAnswers[index] = updatedC;
              }
            }
          }
        }
      });

      dispatch(
        setGettedAnswer({ updatedAnswers, name: pillarwiseQuestion?.name })
      );
    }
  };

  useEffect(() => {
    pillarwiseQuestions.forEach((pillarwiseQuestion: any) => {
      updateAnswers(pillarwiseQuestion, fetchQuestionAnswer);
    });
  }, [
    fetchQuestionAnswer?.data?.data?.length,
    allPillar?.length,
    activePillar,
    ...pillarwiseQuestions.map((question: any) => question?.q?.length),
  ]);

  const handleSelected = (e: string) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setSelectedData((prev) => {
      if (prev?.includes(e)) {
        return prev;
      } else {
        return [...prev, e];
      }
    });
  };

  const handlePrev = () => {
    const currentIndex = allPillar.indexOf(activePillar);
    if (currentIndex > 0) {
      const prevPillar = allPillar[currentIndex - 1];
      handleSelected(prevPillar);
      dispatch(setActivePillar(prevPillar));
    }
  };
  const handleNext = () => {
    const currentIndex = allPillar.indexOf(activePillar);
    if (currentIndex < allPillar.length - 1) {
      const nextPillar = allPillar[currentIndex + 1];
      handleSelected(nextPillar);
      dispatch(setActivePillar(nextPillar));
    }
  };

  console.log("allPillar", allPillar);

  return (
    <div className="font-calibri font-normal">
      <div className="bg-teal">
        <div className="h-[44px] sticky top-0 max-h-screen z-30 w-full text-white flex justify-between items-center px-4 text-lg leading-[21.97px xl:max-w-[1170px] max-w-full overflow-auto mx-auto xl:px-0 px-5]">
          <div className="flex gap-[9px]">
            <button
              className="flex items-center gap-2"
              onClick={() => {
                history.back();
              }}
            >
              <img src={LeftArrow} alt="arrow" width={22} height={22} />
              <span>back</span>
            </button>
            <img
              src={Home}
              alt="home"
              width={23}
              height={23}
              className="cursor-pointer"
              onClick={() => {
                navigate("/");
              }}
            />
          </div>

          {/* <button className="flex items-center gap-3 border border-solid border-white w-[166px] justify-center">
          <img src={TreePlantingWhite} alt="tree" width={24} height={30} />
          Environmental
        </button> */}
        </div>
      </div>
      <div className="h-[120px] font-Poppins font-medium text-[12.85px] leading-[16.64px] text-[#3A3A3A] flex justify-center pb-3 pt-[13px]">
        <div className="relative lg:gap-[79.4px] justify-between flex min-w-[640px] md:w-auto items-center mx-5">
          {paths.map((path, index: number) => {
            return (
              <div className="flex flex-col self-end items-center" key={index}>
                {path.status === "checked" ? (
                  <img
                    src={Correct}
                    alt="img"
                    width={59.6}
                    height={59.6}
                    className="mt-[13.4] pb-[15px]"
                  />
                ) : path.status === "indeterminate" ? (
                  <img
                    src={path.img}
                    alt="img"
                    width={59.6}
                    height={59.6}
                    className="mt-[7px] pb-[15px]"
                  />
                ) : (
                  <img
                    src={path.img}
                    alt="img"
                    width={59.6}
                    height={59.6}
                    className="mt-[15.4px] pb-[15px]"
                  />
                )}
                <p
                  className={`text-[13px] font-medium font-Poppins px-2 py-[2px] ${
                    path.name === "Engage" ? "bg-[#64A70B] text-[#FFF]" : ""
                  }`}
                >
                  {path.name}
                </p>
              </div>
            );
          })}
          <div className="absolute top-[30px] left-[30px] right-12 border-2 border-dashed border-[#585858] -z-10"></div>
        </div>
      </div>
      <div className="sticky top-[44px] max-h-[calc(100vh-164px)] z-30">
        <div className="bg-[#E7E7E8]">
          <div className="min-h-[129px] flex xl:max-w-[1170px] max-w-full overflow-auto mx-auto xl:px-0 px-5">
            <div className="flex gap-[30px] items-center justify-center">
              {allPillar.map((category: string, index: number) => {
                const pillarQuestions = question[category];
                const pillarTotal = pillarQuestions
                  ? pillarQuestions.length
                  : 0;
                const pillarAttempted = Array.isArray(pillarQuestions)
                  ? pillarQuestions.filter((que: QuestionType) =>
                      que.options.some((opt) => opt.checked)
                    ).length
                  : 0;

                return (
                  <div
                    key={index}
                    className={`w-[169px] h-[88px] py-[5px] px-[13px] rounded-[9px] shadow-[0px_6px_5.300000190734863px_0px_#00000040] items-center cursor-pointer ${
                      activePillar === category
                        ? "bg-[#64A70B]"
                        : "bg-[#EDF0F4]"
                    }`}
                    onClick={() => {
                      dispatch(setActivePillar(category));
                      handleSelected(category);
                    }}
                  >
                    <div className="flex gap-2">
                      <div className="flex flex-col gap-1">
                        <div className="w-8 h-8">
                          <img
                            src={getImages(category, activePillar !== category)}
                            alt="img"
                            className="w-full h-full"
                          />
                        </div>
                        <p
                          className={`text-nowrap font-bold pt-1 ${
                            activePillar === category
                              ? "text-white"
                              : "text-[#3A3A3A]"
                          }`}
                        >
                          {Math.floor((pillarAttempted / pillarTotal) * 100) ||
                            0}{" "}
                          %
                        </p>
                      </div>
                      <div>
                        <h2
                          className={`leading-5 ${
                            activePillar === category
                              ? "text-white"
                              : "text-[#3A3A3A]"
                          }`}
                        >
                          {category}
                        </h2>
                        <p
                          className={`text-[12px] leading-[14.65px] ${
                            activePillar === category
                              ? "text-white"
                              : "text-[#848181]"
                          }`}
                        >
                          My progress {pillarAttempted}/{pillarTotal}
                        </p>
                      </div>
                    </div>

                    <Progress
                      color={activePillar === category ? "#002A3A" : "#64A70B"}
                      className={`${
                        !(activePillar === category) && "!bg-[white]"
                      } h-[4px]`}
                      value={
                        pillarTotal ? (pillarAttempted / pillarTotal) * 100 : 0
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <form>
        <div className="m-[24px] relative xl:flex block gap-5 justify-between xl:max-w-[1170px] max-w-full mx-auto xl:px-0 sm:px-5 px-[15px] xl:mt-[89px] mt-5 z-10">
          <div className="xl:max-w-[871px] w-full">
            <div className="flex gap-12 flex-col w-full xl:max-w-[773px]">
              {isPending ? (
                <Loader />
              ) : (
                <Question setIsLoading={setIsLoading} />
              )}
            </div>
          </div>
          <div className="w-[271px] h-[calc(100vh-293px)] text-[18px] leading-[21.97px] font-normal sm:m-0 m-auto sticky top-[190px]">
            <h2 className="h-[42px] bg-teal text-white font-bold rounded-bl-[22.9px] pl-[17px] text-[18px] leading-[21.97px] items-center flex sm:capitalize uppercase">
              How far you are
            </h2>
            {/* <div className="flex items-center mt-[9px] justify-between h-[31px] font-bold text-[16px] leading-5">
              <div className="flex items-center gap-[69px]">
                <span className=" text-teal">Completed</span>
                <p className="text-teal">
                  {currentAttemptedTotal}/
                  {question?.[activePillar]?.length || 0}
                </p>
              </div>
              <div className="mr-3">
                {isLoading && (
                  <Loader
                    containerClassName="h-auto"
                    className="w-[24px] h-[24px]"
                  />
                )}
              </div>
            </div> */}
            <div className="mt-[17px] w-[267px]">
              <div className="flex items-center justify-between font-bold	text-base">
                <span>Completed</span>
                <p>
                  {totalAttemptedQuestions}/{totalQuestions}
                </p>
                <span className="mr-2">
                  <IoIosArrowDown className="w-[14px] h-[14px]" />
                </span>
              </div>
              <div className="font-normal text-[#3a3a3a]">
                {allPillar.map((category: string, index: number) => {
                  return (
                    <div className="flex mt-3" key={index}>
                      <div
                        className={`w-full flex justify-between font-normal pb-2 pt-[10px] ${
                          index !== allPillar.length - 1 &&
                          "border-b border--solid border-[#EAEAEA]"
                        }`}
                      >
                        <p>{category}</p>
                        <div className="flex gap-[10px]">
                          {Array.isArray(question[category]) &&
                            question[category]?.length > 0 && (
                              <div className="flex gap-1">
                                {question[category].map(
                                  (i: QuestionType, index: number) => (
                                    <p
                                      key={index}
                                      className={`w-3 h-3 ${
                                        i.options.some(
                                          (o) => o?.checked === true
                                        )
                                          ? "bg-[#64A70B]"
                                          : "bg-[#D8D0D0]"
                                      }`}
                                    ></p>
                                  )
                                )}
                              </div>
                            )}
                        </div>
                      </div>
                      <span className="mr-2 ml-[11px] mt-[10px]">
                        <IoIosArrowDown className="w-[14px] h-[14px]" />
                      </span>
                    </div>
                  );
                })}
              </div>

              <Button
                className="bg-[#335561] hover:bg-[#335561] text-white rounded text-[21px] leading-[25.63px] w-full mt-[18px]"
                onClick={handleSubmit}
                disabled={
                  totalAttemptedQuestions !== totalQuestions || isLoading
                }
              >
                Submit
              </Button>

              <div className="w-full mt-[18px] gap-2 flex justify-center">
                <Button
                  // variant={"outline"}
                  type="button"
                  className="text-base w-full bg-[#64A70B] hover:bg-[#64A70B]"
                  onClick={handlePrev}
                >
                  Prev
                </Button>
                <Button
                  type="button"
                  // variant={"outline"}
                  className="text-base w-full bg-[#64A70B] hover:bg-[#64A70B]"
                  onClick={handleNext}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>

      <div className="xl:mt-[238px] mt-[150px]">
        <Footer />
      </div>
    </div>
  );
};

export default QuestionPage;
