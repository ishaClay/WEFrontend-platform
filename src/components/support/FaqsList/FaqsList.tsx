import Accordions from "@/components/comman/Accordions";
import FaqsListAnswer from "./FaqsListAnswer";
import FaqsListItems from "./FaqsListItems";
import { AccordionOption } from "@/types";

const FaqsList = () => {
  const List = [
    {
      list: "How to create an FAQ page",
    },
    {
      list: "How to create an FAQ page",
    },
    {
      list: "How to create an FAQ page",
    },
    {
      list: "How to create an FAQ page",
    },
    {
      list: "How to create an FAQ page",
    },
  ];

  const accordionItems: AccordionOption[] = List.map((item) => {
    return {
      title: <FaqsListItems data={item} />,
      content: <FaqsListAnswer />,
    };
  });

  return (
    <div className="bg-white rounded-xl">
      <div className="flex justify-between items-center border-b border-[#D9D9D9] p-4">
        <h6 className="font-calibri text-base font-bold">FAQ’s</h6>
      </div>
      <div className="p-5">
        <div>
          <Accordions items={accordionItems} rounded={false} />
        </div>
      </div>
    </div>
  );
};

export default FaqsList;
