import { ConfirmModal } from "@/components/comman/ConfirmModal";
import { useToast } from "@/components/ui/use-toast";
import { FileType, QUERY_KEYS } from "@/lib/constants";
import { getFileType } from "@/lib/utils";
import { deleteAssesment } from "@/services/apiServices/assessment";
import {
  deleteLiveSection,
  deleteSection,
} from "@/services/apiServices/moduleCreation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FilePenLine, Trash2 } from "lucide-react";
import { useState } from "react";

const CourseViewCardInnerList = ({
  data,
  handelEditSection,
}: {
  data: any;
  handelEditSection: (data: any) => void;
}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDelete, setIsDelete] = useState(false);
  const [isId, setIsId] = useState<{id:string | number, type:string}>({id: "", type: ""});
  function formatReadingTime(readingTime: any) {
    if (!readingTime) {
      return "0sec";
    }
    const { hour, minute, second, hours, minutes, seconds } = readingTime;
    let formattedTime = "";

    if (hour || hours) {
      formattedTime += `${hour || hours}h `;
    }
    if (minute || minutes) {
      formattedTime += `${minute || minutes}min `;
    }
    if (second || seconds) {
      formattedTime += `${second || seconds}sec`;
    }

    if (!formattedTime) {
      formattedTime = "0sec";
    }

    return formattedTime.trim();
  }
  const FileTypeData =
    data.isLive === 0
      ? data?.type
        ? FileType.AssessmentTest
        : getFileType(data.documentType)
      : FileType.Live;

  const { mutate: DeleteSection, isPending } = useMutation({
    mutationFn: (sectionId: number) => deleteSection(sectionId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.fetchAllCourseModule],
      });
      toast({
        variant: "success",
        title: "Section deleted successfully",
      });
      setIsDelete(false);
    },
  });

  const { mutate: DeleteLiveSection } = useMutation({
    mutationFn: (sectionId: number) => deleteLiveSection(sectionId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.fetchAllCourseModule],
      });
      toast({
        variant: "success",
        title: "Section deleted successfully",
      });
      setIsDelete(false);
    },
  });
  const { mutate: deleteAssesments } = useMutation({
    mutationFn: deleteAssesment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.fetchAllCourseModule],
      });
      toast({
        variant: "success",
        title: "Section deleted successfully",
      });
    },
  });

  const handleDeleteSection = (sectionID: number) => {
    if (data?.type || isId?.type === "assesment") {
      deleteAssesments(sectionID);
    } else if (data.isLive === 0) {
      DeleteSection(sectionID);
    } else {
      DeleteLiveSection(sectionID);
    }
  };

  console.log("FileTypeData", FileTypeData, data);

  return (
    <div className="border-b border-[#D9D9D9] p-4 flex items-center justify-between">
      <div className="flex items-center">
        <div className="me-3">
          <img
            src={FileTypeData && FileTypeData?.listIcon}
            alt="document icon"
          />
        </div>
        <div className="">
          <h5 className="text-sm text-black font-inter pb-2">
            {data.isLive == 0 || !data?.isLive ? data.title : data.liveSecTitle}
          </h5>
          <div className="">
            <h6 className="text-[#747474] text-xs font-inter">
              {data?.type ? (
                <>
                  Duration:{" "}
                  <span className="text-black">
                    {formatReadingTime(data?.timeDuration)}
                  </span>{" "}
                  <span className="ml-2">
                    Passing Percentage:{" "}
                    <span className="text-[#000] font-semibold">
                      {data.passingPercentage}%
                    </span>
                  </span>
                </>
              ) : (
                <>
                  {FileTypeData?.name} | Duration:{" "}
                  <span className="text-black">
                    {data.isLive == 0
                      ? formatReadingTime(data.readingTime)
                      : formatReadingTime(data.sectionTime)}
                  </span>
                </>
              )}
            </h6>
          </div>
        </div>
      </div>
      <div
        className="flex gap-3 items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <FilePenLine
          width={18}
          className="text-[#575757] cursor-pointer"
          onClick={() => handelEditSection(data)}
        />
        <Trash2
          width={18}
          className="text-[#575757] cursor-pointer"
          onClick={() => {
            setIsDelete(true);
            setIsId({id: data?.id, type: "assesment"});
          }}
        />
      </div>
      <ConfirmModal
        open={isDelete}
        onClose={() => setIsDelete(false)}
        onDelete={() => handleDeleteSection(+isId?.id)}
        value={data?.title || ""}
        isLoading={isPending}
      />
    </div>
  );
};

export default CourseViewCardInnerList;
