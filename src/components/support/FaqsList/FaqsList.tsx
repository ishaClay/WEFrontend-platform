import EmployeeHeader from "@/components/EmployeeHeader";
import { QUERY_KEYS } from "@/lib/constants";
import { fetchFaqs } from "@/services/apiServices/faqs";
import { UserRole } from "@/types/UserRole";
import { useQuery } from "@tanstack/react-query";
import Accordions from "./FaqsAccoudion";

const FaqsList = () => {
  const userData = localStorage.getItem("user");
  const userRole = userData ? JSON.parse(userData)?.query?.role : null;

  const Role =
    UserRole.Trainer === +userRole
      ? 1
      : UserRole?.Trainee === +userRole
      ? 2
      : UserRole?.Company === +userRole
      ? 3
      : 4;

  // const accordionItems: AccordionOption[] = List.map((item) => {
  //   return {
  //     title: <FaqsListItems data={item} />,
  //     content: <FaqsListAnswer />,
  //   };
  // });
  const { data: faqs_list, isPending } = useQuery({
    queryKey: [QUERY_KEYS.faqsList],
    queryFn: () => fetchFaqs(Role),
  });

  console.log("faqs_list", faqs_list, isPending);

  return (
    <div className="lg:bg-white bg-transparent">
      <div>
        <EmployeeHeader title="Supports /" subtitle="FAQ’s" />
      </div>
      <div className="flex justify-between items-center border-b border-[#D9D9D9] p-5">
        <h6 className="font-calibri text-base font-bold">FAQ’s</h6>
        <p className="text-[#606060] text-[15px] font-abhaya leading-[16px]">
          {userRole === 2
            ? "Here’s the full list of FAQs related to all your courses"
            : "Have common questions asked by trainees? Get a step ahead and answer them below"}
        </p>
      </div>
      <div className="p-5">
        <div>
          <Accordions
            items={faqs_list?.data?.data}
            rounded={false}
            border={false}
            triggerClassName="border w-full group hover:no-underline pl-[18px] pr-[6px] text-[16px] font-bold py-[20px]"
            contentClassName="border w-full pl-[18px] pr-[25px] py-[15px] text-[16px] leading-[22px]"
          />
        </div>
      </div>
    </div>
  );
};

export default FaqsList;
