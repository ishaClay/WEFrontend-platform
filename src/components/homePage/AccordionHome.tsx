import titleCircle from "@/assets/images/title_de.svg";
import Accordions from "@/components/comman/Accordions";
import { AccordionOption } from "@/types";
import AccordionAnswer from "./AccordionAnswer";
import AccordionQuestion from "./AccordionQuestion";

const AccordionHome = () => {
  const questionList = [
    {
      question: "We’re beginners in sustainability. Can we join?",
    },
    {
      question:
        "We’re already involved in sustainability. How would this be useful?",
    },
    {
      question: "We’re beginners in sustainability. Can we join?",
    },
    {
      question: "What’s required from me to start?",
    },
    {
      question: "How user-friendly is your platform?",
    },
    {
      question: "What will determine my Sustainability Score?",
    },
  ];

  const accordionItems: AccordionOption[] = questionList.map((item) => {
    return {
      title: <AccordionQuestion data={item} />,
      content: <AccordionAnswer />,
    };
  });

  return (
    <div className="bg-[#F7F8FC] sm:pb-[26px] md:pt-[12px] sm:pt-[40px] pt-0 pb-[40px]">
      <div className="xl:max-w-[1160px] max-w-full w-full mx-auto xl:px-0 px-[35px]">
        <h3 className="xl:text-[32px] text-2xl font-abhaya leading-9 font-bold relative pb-3 inline-block pe-[50px] tracking-tighter">
          Frequently asked Questions
          <img
            src={titleCircle}
            alt=""
            className="absolute right-0 top-0 bottom-0"
          />
          <span className="h-[4px] bg-[#64A70B] w-full absolute bottom-0 left-0"></span>
        </h3>

        <div className="md:flex block xl:gap-[60px] gap-[40px] xl:mt-[50px] mt-[25px]">
          <div className="w-full">
            <Accordions
              items={accordionItems.slice(0, 3)}
              rounded={false}
              padding={false}
              className="sm:space-y-[24px] space-y-[9px]"
              triggerClassName={`data-[state=open]:bg-[#002A3A] p-4 data-[state=open]:text-white p-4 text-[#002A3A] h-[70px]`}
              isPlusIcon
            />
          </div>
          <div className="w-full">
            <Accordions
              items={accordionItems.slice(3)}
              rounded={false}
              padding={false}
              className="sm:space-y-[24px] space-y-[9px] sm:mt-[25px] mt-[9px]"
              triggerClassName="data-[state=open]:bg-[#002A3A] p-4 data-[state=open]:text-white p-4 text-[#002A3A] h-[70px]"
              isPlusIcon
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordionHome;
