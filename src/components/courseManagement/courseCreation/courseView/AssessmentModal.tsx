import { QUERY_KEYS } from "@/lib/constants";
import { getAssessmentOptions } from "@/services/apiServices/assessment";
import { useQuery } from "@tanstack/react-query";
import AssessmentModalSelectItem from "./AssessmentModalSelectItem";

interface AssessmentModalProps {
  moduleId?: string
  setIsOpenAssessmentModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AssessmentModal = ({moduleId, setIsOpenAssessmentModal}: AssessmentModalProps) => {

  const { data: assessmentOptions } = useQuery({
    queryKey: [QUERY_KEYS.assessmentOptions],
    queryFn: () => getAssessmentOptions(),
  });

  return (
    <div>
      <h5 className="font-bold text-black sm:text-xl text-base font-calibri pb-2.5">
        Select Question Type
      </h5>
      <p className="text-[#606060] sm:text-[15px] text-sm font-abhaya leading-[16px] pb-5">
        Which format would best suit this particular assessment question?
      </p>
      <div className="flex items-center md:justify-evenly justify-center flex-wrap">
        {assessmentOptions?.data?.data && Object.entries(assessmentOptions?.data?.data)?.map((data, index) => {
          return <AssessmentModalSelectItem setIsOpenAssessmentModal={setIsOpenAssessmentModal} key={index} data={data} moduleId={moduleId} />;
        })}
      </div>
    </div>
  );
};

export default AssessmentModal;
