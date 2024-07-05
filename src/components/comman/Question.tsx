import { useAppSelector } from "@/hooks/use-redux";
import { QuestionType } from "@/types/Question";
import { Dispatch, SetStateAction } from "react";
import QuestionBox from "../QuestionBox";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

const Question = ({
  setIsLoading,
}: {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  const question = useAppSelector((state) => state.question);

  const { activePillar } = useAppSelector((state) => state.question);

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

  return (
    <>
      <div className="sm:block hidden">
        {Array.isArray(question[activePillar]) &&
          question[activePillar]?.map((i: QuestionType, index: number) => {
            return (
              <QuestionBox i={i} index={index} setIsLoading={setIsLoading} />
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
                    <QuestionBox
                      i={i}
                      index={index}
                      setIsLoading={setIsLoading}
                    />
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
