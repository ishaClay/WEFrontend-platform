import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { QUERY_KEYS } from "@/lib/constants";
import { isSessionOngoingAtTime } from "@/lib/utils";
import { deleteLiveSessions } from "@/services/apiServices/liveSession";
import { AllLivesessions } from "@/types/liveSession";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CircleCheck, Copy, Pencil, X } from "lucide-react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

interface LivesessionsListProps {
  data: AllLivesessions;
}

const LiveSessionList = ({ data }: LivesessionsListProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const pathName = window.location.pathname;
  const currentUser = pathName.split("/")[1];

  const { mutate: deleteLiveSession } = useMutation({
    mutationFn: async (id: number) => {
      return deleteLiveSessions(id?.toString());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.allLiveSession],
      });
      toast({
        title: "Success",
        description: "Live sessions deleted successfully",
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <div className="border border-[#D9D9D9] rounded-xl">
      <div className="flex flex-col sm:gap-3 gap-2 sm:p-5 p-4 border-b border-[#D9D9D9]">
        <h6 className="text-base text-black font-abhaya font-semibold">
          {data?.liveSecTitle}
        </h6>
        <h6 className="text-base text-black font-abhaya font-semibold">
          {data?.subtitle}
        </h6>
        <h6 className="text-base text-black font-abhaya font-semibold">
          <span className="text-[#606060]">Course: </span>
          {/* {data?.course} */}
        </h6>
        <div className="sm:flex bloack gap-10">
          <h6 className="text-base text-black font-abhaya font-semibold sm:mb-0 mb-3">
            <span className="text-[#606060]">Company: </span>
            {/* {data?.company} */}
          </h6>
          <h6 className="text-base text-black font-abhaya font-semibold">
            <span className="text-[#606060]">Number of Employee: </span>
            {data?.numberOfEmployees}
          </h6>
        </div>
        <div className="sm:flex block gap-10">
          <h6 className="text-base text-black font-abhaya font-semibold sm:mb-0 mb-3">
            <span className="text-[#606060]">Start Date: </span>
            {moment(data?.date)?.format("MM/DD/YYYY")}
          </h6>
          <h6 className="text-base text-black font-abhaya font-semibold sm:mb-0 mb-3">
            <span className="text-[#606060]">Start Time: </span>
            {data?.startTime} {data?.startAmPm}
          </h6>
          <h6 className="text-base text-black font-abhaya font-semibold">
            <span className="text-[#606060]">Duration: </span>
            {data?.sessionDuration?.hour || 0} :
            {data?.sessionDuration?.minute || 0}&nbsp; Hours
          </h6>
        </div>
      </div>
      <div className="px-5 py-4 sm:h-[74px] h-auto flex items-center">
        <div className="">
          <div className="flex flex-wrap sm:gap-4 gap-3">
            <Button
              className={`bg-transparent font-nunito sm:text-base text-sm border border-[#606060] text-black px-5 sm:h-[42px] h-[38px] hover:bg-[#00778B] hover:text-white hover:border-[#00778B] ${
                isSessionOngoingAtTime(data.startTime, data.sessionDuration)
                  ? ""
                  : "opacity-50 pointer-events-none"
              }`}
              onClick={() => {}}
            >
              Start
            </Button>
            <Button className="bg-transparent font-nunito sm:text-base text-sm border border-[#606060] text-black px-5 sm:h-[42px] h-[38px] hover:bg-[#00778B] hover:text-white hover:border-[#00778B]">
              <Copy width={20} />
              Copy Invitation
            </Button>
            <Button
              className="bg-transparent font-nunito sm:text-base text-sm border border-[#606060] text-black px-5 sm:h-[42px] h-[38px] hover:bg-[#00778B] hover:text-white hover:border-[#00778B]"
              onClick={() => {
                navigate(
                  `/${currentUser}/schedule-live-session/edit/${data?.id}`
                );
              }}
            >
              <Pencil width={20} /> Edit
            </Button>
            <Button
              className="bg-transparent font-nunito sm:text-base text-sm border border-[#606060] text-black px-5 sm:h-[42px] h-[38px] hover:bg-[#00778B] hover:text-white hover:border-[#00778B]"
              onClick={() => deleteLiveSession(data?.id)}
            >
              <X width={20} />
              Delete
            </Button>
          </div>
        </div>
        <div className="hidden">
          <span className="text-[#58BA66] text-base font-nunito flex gap-3 items-center">
            <CircleCheck width={20} /> Completed Successfully
          </span>
        </div>
      </div>
    </div>
  );
};

export default LiveSessionList;
