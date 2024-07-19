import { QUERY_KEYS } from "@/lib/constants";
import { getAssessmentOptions } from "@/services/apiServices/assessment";
import { useQuery } from "@tanstack/react-query";
import AssessmentModalSelectItem from "./AssessmentModalSelectItem";

const AssessmentModal = () => {

  const { data: assessmentOptions } = useQuery({
    queryKey: [QUERY_KEYS.assessmentOptions],
    queryFn: () => getAssessmentOptions(),
  });
  

  return (
    <div>
      <h5 className="font-bold text-black text-xl font-calibri pb-[9px]">
        Select Question Type
      </h5>
      <p className="text-[#606060] text-[15px] font-abhaya leading-[16px] pb-5">
        Which format would best suit this particular assessment question?
      </p>
      <div className="flex items-center justify-center flex-wrap">
        {Object.entries(assessmentOptions?.data?.data).map((data, index) => {
          return <AssessmentModalSelectItem key={index} data={data} />;
        })}
      </div>
    </div>
  );
};

export default AssessmentModal;
