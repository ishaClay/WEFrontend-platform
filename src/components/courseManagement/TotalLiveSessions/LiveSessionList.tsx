/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ConfirmModal } from "@/components/comman/ConfirmModal";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { QUERY_KEYS } from "@/lib/constants";
import { convertUTCToGMT, isSessionOngoingAtTime } from "@/lib/utils";
import { deleteLiveSessions } from "@/services/apiServices/liveSession";
import { AllLivesessions } from "@/types/liveSession";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CircleCheck, Copy, Eye, EyeOff, Pencil, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LivesessionsListProps {
  data: AllLivesessions;
}

const LiveSessionList = ({ data }: LivesessionsListProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const pathName = window.location.pathname;
  const currentUser = pathName.split("/")[1];
  const [isDelete, setIsDelete] = useState(false);
  const [inputType, setInputType] = useState<"password" | "text">("password");
  const { mutate: deleteLiveSession, isPending } = useMutation({
    mutationFn: deleteLiveSessions,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.allLiveSession],
      });
      toast({
        title: "Success",
        description: "Live sessions deleted successfully",
        variant: "success",
      });
      setIsDelete(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  const handleDelete = () => {
    deleteLiveSession(data?.id);
  };

  const isCompleted = convertUTCToGMT(data.startTime)
    .add(data.sessionDuration, "minutes")
    .isBefore(new Date());

  return (
    <div
      className={`border ${
        isCompleted ? "border-[#72CC79]" : "border-[#D9D9D9]"
      } rounded-xl`}
    >
      <div
        className={`flex flex-col sm:gap-3 gap-2 sm:p-5 p-4 border-b ${
          isCompleted ? "border-[#72CC79]" : "border-[#D9D9D9]"
        }`}
      >
        <h6 className="text-base text-black font-font-droid font-normal">
          {data?.liveSecTitle}
        </h6>
        <h6 className="text-base text-black font-font-droid font-normal">
          {data?.subtitle}
        </h6>
        <h6 className="text-base text-black font-font-droid font-normal">
          <span className="text-[#606060]">Course: </span>
          {data?.course?.title}
        </h6>
        <div className="sm:flex bloack gap-10">
          <h6 className="text-base text-black font-font-droid font-normal sm:mb-0 mb-3">
            <span className="text-[#606060]">Company: </span>
            {data?.company?.[0]?.name}
          </h6>
          <h6 className="text-base text-black font-font-droid font-normal">
            <span className="text-[#606060]">Number of Employee: </span>
            {data?.employee?.length || 0}
          </h6>
        </div>
        <div className="sm:flex block gap-10">
          <h6 className="text-base text-black font-font-droid font-normal sm:mb-0 mb-3">
            <span className="text-[#606060]">Start Date: </span>
            {convertUTCToGMT(data?.date).format("MM/DD/YYYY")}
          </h6>
          <h6 className="text-base text-black font-font-droid font-normal sm:mb-0 mb-3">
            <span className="text-[#606060]">Start Time: </span>
            {convertUTCToGMT(data?.startTime).format("hh:mm A")} (GMT Time)
          </h6>
          <h6 className="text-base text-black font-font-droid font-normal">
            <span className="text-[#606060]">Duration: </span>
            {`${Math.floor(data?.sessionDuration / 60)}:${
              data?.sessionDuration % 60
            } Hours`}
          </h6>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <p className="font-bold w-[100px]">Pass Code:</p>{" "}
            <input
              type={inputType}
              className="max-w-[150px] w-full bg-white"
              // @ts-ignore
              value={data?.passcode}
              disabled
            />
          </div>
          <Button
            variant={"link"}
            onClick={() =>
              setInputType((prev) =>
                prev === "password" ? "text" : "password"
              )
            }
          >
            {inputType === "password" ? <Eye /> : <EyeOff />}
          </Button>
        </div>
      </div>
      <div className="px-5 py-4 sm:h-[74px] h-auto flex items-center">
        <div className=""></div>
        {isCompleted ? (
          <div className="">
            <span className="text-[#58BA66] text-base font-droid flex gap-3 items-center">
              <CircleCheck width={20} /> Completed Successfully
            </span>
          </div>
        ) : (
          <div className="flex flex-wrap sm:gap-4 gap-3">
            <a
              className={`bg-transparent font-droid sm:text-base text-sm border border-[#606060] text-black px-5 py-2 sm:h-[42px] h-[38px] hover:bg-[#00778B] hover:text-white hover:border-[#00778B] rounded-md ${
                !isSessionOngoingAtTime(data.startTime, data?.sessionDuration)
                  ? "pointer-events-none opacity-70"
                  : "pointer-events-auto opacity-100"
              }`}
              target="_blank"
              href={data?.zoomApiBaseUrl}
            >
              Start
            </a>
            <Button
              disabled={!data.zoomApiBaseUrl}
              className="bg-transparent font-droid sm:text-base text-sm border border-[#606060] text-black px-5 sm:h-[42px] h-[38px] hover:bg-[#00778B] hover:text-white hover:border-[#00778B]"
              onClick={() => {
                navigator.clipboard.writeText(data.zoomApiBaseUrl);
                toast({
                  description: "Meeting url copied",
                  variant: "success",
                  duration: 3000,
                });
              }}
            >
              <Copy width={20} />
              Copy Invitation
            </Button>
            <Button
              className="bg-transparent font-droid sm:text-base text-sm border border-[#606060] text-black px-5 sm:h-[42px] h-[38px] hover:bg-[#00778B] hover:text-white hover:border-[#00778B]"
              onClick={() => {
                navigate(
                  `/${currentUser}/schedule-live-session/edit/${data?.id}`
                );
              }}
            >
              <Pencil width={20} /> Edit
            </Button>
            <Button
              className="bg-transparent font-droid sm:text-base text-sm border border-[#606060] text-black px-5 sm:h-[42px] h-[38px] hover:bg-[#00778B] hover:text-white hover:border-[#00778B]"
              onClick={() => setIsDelete(true)}
            >
              <X width={20} />
              Delete
            </Button>
          </div>
        )}
      </div>
      <ConfirmModal
        open={isDelete}
        onClose={() => setIsDelete(false)}
        onDelete={handleDelete}
        value={data?.course?.title || ""}
        isLoading={isPending}
      />
    </div>
  );
};

export default LiveSessionList;
