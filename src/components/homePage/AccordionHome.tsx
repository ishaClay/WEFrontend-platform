import titleCircle from "@/assets/images/title_de.svg";
import Accordions from "@/components/comman/Accordions";
import { AccordionOption } from "@/types";
import AccordionQuestion from "./AccordionQuestion";
import AccordionAnswer from "./AccordionAnswer";

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
    <div className="bg-[#F7F8FC] pb-[26px] pt-[12px]">
      <div className="xl:max-w-[1160px] max-w-full w-full mx-auto xl:px-0 px-5">
        <h3 className="xl:text-[32px] text-2xl font-abhaya leading-9 font-bold text-color relative pb-3 inline-block pe-[50px] tracking-tighter">
          Frequently asked Questions
          <img
            src={titleCircle}
            alt=""
            className="absolute right-0 top-0 bottom-0"
          />
          <span className="h-[4px] bg-[#64A70B] w-full absolute bottom-0 left-0"></span>
        </h3>

        <div className="flex xl:gap-[100px] gap-[50px] xl:mt-[50px] mt-[25px]">
          <div className="w-full">
            <Accordions
              items={accordionItems.slice(0, 2)}
              rounded={false}
              padding={false}
              triggerClassName="data-[state=open]:bg-[#002A3A] data-[state=open]:text-white p-4 text-[#002A3A] h-[60px]"
              isPlusIcon
            />
          </div>
          <div className="w-full">
            <Accordions
              items={accordionItems.slice(2)}
              rounded={false}
              padding={false}
              triggerClassName="data-[state=open]:bg-[#002A3A] p-4 data-[state=open]:text-white p-4 text-[#002A3A] h-[60px]"
              isPlusIcon
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordionHome;
