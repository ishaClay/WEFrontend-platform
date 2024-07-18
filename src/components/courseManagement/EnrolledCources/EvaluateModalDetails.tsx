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
    <div className="">
      <div className="sm:px-5 px-4">
        <h3 className="sm:text-2xl text-base font-calibri font-bold pb-2">
          Evaluate
        </h3>
        <p className="text-[#606060] text-[15px] font-abhaya leading-[15px]">
          See how many keywords have been correctly matched, and submit them to
          approve
        </p>
      </div>
      <ScrollArea className="xl:h-[600px] sm:h-[500px] h-[400px]">
        {evaluteModal.map((data, index) => {
          return <EvaluateModalDetailsItem key={index} data={data} />;
        })}
      </ScrollArea>
    </div>
  );
};

export default EvaluateModalDetails;
