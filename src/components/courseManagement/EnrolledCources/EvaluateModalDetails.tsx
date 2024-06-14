import { ScrollArea } from "@/components/ui/scroll-area";
import EvaluateModalDetailsItem from "./EvaluateModalDetailsItem";

const EvaluateModalDetails = () => {
  const evaluteModal = [
    {
      modalId: 1,
      sessionId: 1,
      assessmentId: 1,
      questions: [
        {
          questionId: 1,
          pointId: 1,
          desription:
            "This is the second item's accordion body. It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element.",
          answer:
            "This is the second item's accordion body. It is hidden by default.",
          keyWords: " (Matched 40, Unmatched 10) ",
        },
        {
          questionId: 2,
          pointId: 2,
          desription:
            "This is the second item's accordion body. It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element.",
          answer:
            "This is the second item's accordion body. It is hidden by default.",
          keyWords: " (Matched 40, Unmatched 10) ",
        },
      ],
      page1: 10,
      page2: 50,
    },
    {
      modalId: 1,
      sessionId: 1,
      assessmentId: 1,
      questions: [
        {
          questionId: 1,
          pointId: 1,
          desription:
            "This is the second item's accordion body. It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element.",
          answer:
            "This is the second item's accordion body. It is hidden by default.",
          keyWords: " (Matched 40, Unmatched 10) ",
        },
        {
          questionId: 1,
          pointId: 1,
          desription:
            "This is the second item's accordion body. It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element.",
          answer:
            "This is the second item's accordion body. It is hidden by default.",
          keyWords: " (Matched 40, Unmatched 10) ",
        },
        {
          questionId: 1,
          pointId: 1,
          desription:
            "This is the second item's accordion body. It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element.",
          answer:
            "This is the second item's accordion body. It is hidden by default.",
          keyWords: " (Matched 40, Unmatched 10) ",
        },
      ],
      page1: 0,
      page2: 50,
    },
  ];
  return (
    <div>
      <div className="">
        <h3 className="text-2xl font-calibri font-bold px-5">Evaluate</h3>
        <ScrollArea className="h-[600px]">
          {evaluteModal.map((data, index) => {
            return <EvaluateModalDetailsItem key={index} data={data} />;
          })}
        </ScrollArea>
      </div>
    </div>
  );
};

export default EvaluateModalDetails;
