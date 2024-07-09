import Loader from "@/components/comman/Loader";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { getCheckedMeasures } from "@/services/apiServices/pillar";
import { useQuery } from "@tanstack/react-query";
import { Dispatch } from "react";
import AssignCard from "./AssignCard";

const Assign = ({
  setStep,
}: {
  setStep: Dispatch<React.SetStateAction<number>>;
}) => {
  const { clientId, UserId } = useAppSelector((state) => state.user);
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const userID = UserId
    ? +UserId
    : userData?.query
    ? userData?.query?.id
    : userData?.id;

  const { data: getCheckedmeasures, isPending } = useQuery({
    queryKey: [QUERY_KEYS.checkedMeasures],
    queryFn: () => getCheckedMeasures(userID, clientId),
    enabled: true,
  });
  return (
    <div className="">
      {isPending ? (
        <Loader />
      ) : (
        getCheckedmeasures?.data?.data.map((data: any, index: number) => {
          return <AssignCard key={index} data={data} />;
        })
      )}
      <div className="text-center">
        {/* <Button className="sm:w-[223px] w-[138px] bg-[#E5F1F3] text-[#00778B] sm:text-base text-sm font-bold font-calibri sm:h-[48px] h-[40px]">
          Retake Assessment
        </Button> */}
        <div className="flex flex-wrap justify-center items-center gap-5 my-[35px]">
          <Button
            type="button"
            onClick={() => setStep(0)}
            className="bg-[#64A70B] text-white rounded-sm lg:w-[223px] w-[200px] h-12 lg:text-base text-sm"
          >
            Edit Action Plan
          </Button>
          <Button className="bg-[#002A3A] text-white rounded-sm lg:w-[223px] w-[200px] h-12 lg:text-base text-sm">
            View Recommended Courses
          </Button>
          <Button className="bg-[#00778B] text-white rounded-sm lg:w-[223px] w-[200px] h-12 lg:text-base text-sm">
            Invite Team Members
          </Button>
        </div>
        <p className="text-[#64A70B] lg:text-base text-sm font-semibold">
          And whenever you’ve learnt, applied, and developed:  <br />
          come back to measure your progress anytime with a re-assessment!
        </p>
      </div>
    </div>
  );
};

export default Assign;
