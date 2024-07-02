import { useAppSelector } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { setAnswer } from "@/redux/reducer/QuestionReducer";
import { addAnswer } from "@/services/apiServices/question";
import { Answer } from "@/types/Answer";
import { ErrorType } from "@/types/Errors";
import { Option, QuestionType } from "@/types/Question";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { useToast } from "../ui/use-toast";
import Loading from "./Error/Loading";
import Suggestion from "/assets/img/Suggestion.png";

const Question = ({
  setIsLoading,
}: {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user") as string);

  const question = useAppSelector((state) => state.question);

  const { activePillar } = useAppSelector((state) => state.question);

  const userId = useAppSelector((state) => state.user.UserId);

  const queryClient = useQueryClient();

  const { toast } = useToast();

  const { mutate: addanswer, isPending } = useMutation({
    mutationFn: (question: Answer) => addAnswer(question),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.getQuestionAnswer],
      });
    },
    onError: (error: ErrorType) => {
      toast({
        variant: "destructive",
        title: error.data.message,
      });
    },
  });

  useEffect(() => {
    if (isPending) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [isPending, setIsLoading]);

  console.log("question", question);

  // const { mutate: removeanswer } = useMutation({
  //   mutationFn: (question) => removeAnswer(question),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({
  //       queryKey: [QUERY_KEYS.getQuestionAnswer],
  //     });
  //   },
  //   onError: (error: ErrorType) => {
  //     toast({
  //       variant: "destructive",
  //       title: error.data.message,
  //     });
  //   },
  // });
  const handleChange = (questionId: any, selectedOptions: any) => {
    const userID = userId
      ? userId
      : userData?.query
      ? userData?.query?.id
      : userData?.id;
    if (userID) {
      addanswer({
        userId: userID,
        questionId: questionId,
        selectedOptions: [selectedOptions],
      });
    } else {
      toast({
        variant: "destructive",
        title: "Please login again",
      });
      navigate("/auth");
    }
  };

  return (
    <>
      <div className="sm:block hidden">
        {Array.isArray(question[activePillar]) &&
          question[activePillar]?.map((i: QuestionType, index: number) => {
            return (
              <div
                className="relative bg-white min-h-[321px] pb-3 rounded-[15.34px] shadow-[0px_4px_4px_0px_#00000040] xl:w-[773px] max-w-full mb-12"
                key={index}
              >
                <div className="flex items-center justify-center top-0 left-0 bg-teal text-white w-[207.83px] h-[52.15px] rounded-br-[62.27px] font-bold text-lg leading-[21.97px] p-2">
                  {activePillar} {index + 1}/{question[activePillar]?.length}
                </div>
                <div className="py-[17px] bg-[#EEF9FD] px-9 mt-5">
                  <div className="flex gap-1">
                    <span className="text-[#002A3A] font-bold leading-[17.77px] text-base">
                      {index + 1}.
                    </span>
                    <p className="text-[#002A3A] font-bold leading-[17.77px] text-base">
                      {i.title}
                    </p>
                  </div>
                </div>
                <div className="mt-[21px] flex flex-col gap-[17px] px-10">
                  {i.options.map((option: Option, oIndex: number, arr) => {
                    return (
                      <div key={oIndex}>
                        <div
                          className="inline-flex items-center cursor-pointer"
                          onClick={() => {
                            handleChange(i.id, option);
                            dispatch(
                              setAnswer({
                                qId: index,
                                oId: oIndex,
                                arr: arr,
                              })
                            );
                          }}
                        >
                          <input
                            type="radio"
                            className=" cursor-pointer"
                            checked={option?.checked ? true : false}
                          />
                          <span className="ml-[9px] text-sm">
                            {option.name}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {question.hint && (
                  <img
                    src={Suggestion}
                    alt="Suggestion"
                    className="absolute top-5 right-12 w-8 h-8 cursor-auto"
                  />
                )}
              </div>
            );
          })}
      </div>
      <div className="sm:hidden block">
        <Carousel>
          <CarouselContent>
            {Array.isArray(question[activePillar]) &&
              question[activePillar]?.map((i: QuestionType, index: number) => {
                return (
                  <CarouselItem>
                    <div
                      className="relative bg-white rounded-[15.34px] shadow-[0px_4px_4px_0px_#00000040] xl:w-[773px] max-w-full mb-12"
                      key={index}
                    >
                      <div className="flex items-center justify-center bg-teal text-white sm:w-[207.83px] w-[157px] sm:h-[52.15px] h-[37px] rounded-br-[62.27px] font-bold sm:text-lg text-sm leading-[21.97px] p-2">
                        {activePillar} {index + 1}/
                        {question[activePillar]?.length}
                      </div>
                      <div className="py-[10px] bg-[#EEF9FD] px-[15px] mt-[10px]">
                        <div className="flex gap-1">
                          <span className="text-[#002A3A] font-bold leading-4 text-sm">
                            {index + 1}.
                          </span>
                          <p className="text-[#002A3A] font-bold leading-4 text-sm">
                            {i.title}
                          </p>
                        </div>
                      </div>
                      <div className="p-[15px] flex flex-col gap-[17px]">
                        {i.options.map(
                          (option: Option, oIndex: number, arr) => {
                            return (
                              <div key={oIndex}>
                                <div
                                  className="inline-flex items-start cursor-pointer"
                                  onClick={() => {
                                    handleChange(i.id, option);
                                    dispatch(
                                      setAnswer({
                                        qId: index,
                                        oId: oIndex,
                                        arr: arr,
                                      })
                                    );
                                  }}
                                >
                                  <input
                                    type="radio"
                                    className=" cursor-pointer mt-1"
                                    checked={option?.checked ? true : false}
                                  />
                                  <span className="ml-[9px] text-sm text-[#3A3A3A]">
                                    {option.name}
                                  </span>
                                </div>
                              </div>
                            );
                          }
                        )}
                      </div>

                      {question.hint && (
                        <img
                          src={Suggestion}
                          alt="Suggestion"
                          className="absolute top-5 right-12 w-8 h-8 cursor-auto"
                        />
                      )}

                      {isPending && <Loading isLoading={isPending} />}
                    </div>
                  </CarouselItem>
                );
              })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
};

export default Question;
