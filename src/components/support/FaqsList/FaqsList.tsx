import { QUERY_KEYS } from "@/lib/constants";
import { fetchFaqs } from "@/services/apiServices/faqs";
import { UserRole } from "@/types/UserRole";
import { useQuery } from "@tanstack/react-query";
import Accordions from "./FaqsAccoudion";

const FaqsList = () => {
  const userData = localStorage.getItem("user");
  const userRole = userData ? JSON.parse(userData)?.query?.role : null;

  // const List = [
  //   {
  //     list: "How to create an FAQ page",
  //   },
  //   {
  //     list: "How to create an FAQ page",
  //   },
  //   {
  //     list: "How to create an FAQ page",
  //   },
  //   {
  //     list: "How to create an FAQ page",
  //   },
  //   {
  //     list: "How to create an FAQ page",
  //   },
  // ];

  // const accordionItems: AccordionOption[] = List.map((item) => {
  //   return {
  //     title: <FaqsListItems data={item} />,
  //     content: <FaqsListAnswer />,
  //   };
  // });
  const { data: faqs_list, isPending } = useQuery({
    queryKey: [QUERY_KEYS.faqsList],
    queryFn: () =>
      fetchFaqs(+userRole !== UserRole.Trainee ? "Trainer Admin" : "Trainer"),
  });

  console.log("faqs_list", faqs_list, isPending);

  return (
    <div className="bg-white rounded-xl">
      <div className="border-b border-[#D9D9D9] p-4">
        <h6 className="font-calibri text-base font-bold">FAQ’s</h6>
        <p className="text-[#606060] text-[15px] font-abhaya leading-[16px]">
          {userRole === 2
            ? "Here’s the full list of FAQs related to all your courses"
            : "Have common questions asked by trainees? Get a step ahead and answer them below"}
        </p>
      </div>
      <div className="p-5">
        <div>
          <Accordions items={faqs_list?.data?.data} rounded={false} />
        </div>
      </div>
    </div>
  );
};

export default FaqsList;
