import { ScrollArea } from "@/components/ui/scroll-area";
import { EvaluteDataEntity } from "@/types/enroll";
import EvaluateModalDetailsItem from "./EvaluateModalDetailsItem";

interface EvaluateModalDetailsProps {
  data: EvaluteDataEntity[];
}

const EvaluateModalDetails = ({ data }: EvaluateModalDetailsProps) => {
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
        {data &&
          data?.map((item, index) => {
            return (
              <EvaluateModalDetailsItem key={index} data={item} index={index} />
            );
          })}
      </ScrollArea>
    </div>
  );
};

export default EvaluateModalDetails;
