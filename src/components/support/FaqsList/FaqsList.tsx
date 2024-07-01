import { QUERY_KEYS } from "@/lib/constants";
import { UserRole } from "@/types/UserRole";
import { useQuery } from "@tanstack/react-query";
import { fetchFaqs } from "@/services/apiServices/faqs";
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
  const {
    data: faqs_list,
    isPending,
  } = useQuery({
    queryKey: [QUERY_KEYS.faqsList],
    queryFn: () =>
      fetchFaqs(
        +userRole !== UserRole.Trainee ? "Trainer Admin" : "Trainer"
      ),
  });

  console.log('faqs_list', faqs_list, isPending)

  return (
    <div className="bg-white rounded-xl">
      <div className="flex justify-between items-center border-b border-[#D9D9D9] p-4">
        <div>
          <h3 className="text-[16px] font-[700] font-nunito mb-1">
            FAQ’s
          </h3>
          <p className="text-[#606060] text-[15px]">Here’s the full list of FAQs related to all your courses</p>
        </div>
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
