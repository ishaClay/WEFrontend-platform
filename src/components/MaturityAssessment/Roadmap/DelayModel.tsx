import fileImage from "@/assets/images/fileupload.svg";
import Loader from "@/components/comman/Loader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";
import { useAppSelector } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { convertUTCToGMT } from "@/lib/utils";
import { markComplate } from "@/services/apiServices/pillar";
import { uploadFile } from "@/services/apiServices/uploadServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FileCheck } from "lucide-react";
import { Dispatch, useState } from "react";

const DelayModel = ({
  uploadData,
  setUploadData,
  handleClose,
}: {
  uploadData: any;
  setUploadData: Dispatch<React.SetStateAction<any>>;
  handleClose: () => void;
}) => {
  const userData = JSON.parse(localStorage.getItem("user") as string).query;
  const [file, setFile] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { clientId } = useAppSelector((state) => state.user);
  const status = () => {
    if (
      convertUTCToGMT(new Date(uploadData?.startDate)).isSameOrBefore(
        convertUTCToGMT(new Date())
      ) &&
      convertUTCToGMT(new Date(uploadData?.endDate)).isSameOrAfter(
        convertUTCToGMT(new Date())
      )
    ) {
      return "On time";
    } else if (
      convertUTCToGMT(new Date()).isAfter(
        convertUTCToGMT(new Date(uploadData?.endDate))
      )
    ) {
      return "Delay";
    } else if (
      convertUTCToGMT(new Date(uploadData?.startDate)).isAfter(
        convertUTCToGMT(new Date())
      )
    ) {
      return "On time";
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: uploadFile,
    onSuccess: (data) => {
      setFile(data?.data?.data?.file);
    },
    onError: (error) => {
      console.error("error", error);
    },
  });

  const { mutate: mark, isPending: markPending } = useMutation({
    mutationFn: markComplate,
    onSuccess: async () => {
      setUploadData(null);
      setFile(null);
      if (userData?.role === "4") {
        await queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.getEmployeeWiseAcion],
        });
      } else {
        await queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.checkedMeasuresbyAssessment],
        });
      }
      handleClose();
    },
    onError: (error) => {
      console.error("error", error);
    },
  });

  const handleChanges = (e: any) => {
    const { files } = e.target;

    if (!files?.[0]?.name.match(/^[a-zA-Z0-9_-]+(\.[a-zA-Z0-9]+)?$/)) {
      toast({
        variant: "destructive",
        title:
          "Invalid file name. please use only letters, digits, underscores, hyphens, and a single period.",
      });
      return;
    }
    setFile(files);
    mutate(files[0]);
  };

  const handleSubmit = () => {
    const payload = {
      iscomplete: 1,
      evidence: file,
      userId: userData?.id,
      clientId: clientId,
    };
    mark({ data: payload, id: uploadData?.id });
  };

  return (
    <div>
      <h6 className="text-base font-bold font-droid pb-1 text-[#000]">
        Assigned Action Item Details
      </h6>
      <ScrollArea className="lg:h-auto h-[400px]">
        <div className="sm:pt-7 pt-5 grid grid-cols-9">
          <div className="lg:col-span-5 col-span-12">
            <Badge
              className={`${
                status() === "Delay"
                  ? "bg-[#F63636] text-white"
                  : "bg-[#FFD56A] text-black"
              } min-w-[53px] h-[28px] text-sm font-font-droid font-semibold`}
            >
              {status()}
            </Badge>
            <h6 className="font-font-droid text-xl font-bold leading-6 text-[#000] sm:pt-6 pt-4">
              {uploadData?.measure}
            </h6>
            <div className="sm:pt-7 pt-5 flex flex-col gap-2.5">
              <div className="flex items-center text-base font-font-droid font-semibold gap-1">
                <h6 className="text-[#777] sm:text-base text-sm">
                  Start date :
                </h6>
                <span className="text-black sm:text-base text-sm">
                  {convertUTCToGMT(new Date(uploadData?.startDate)).format(
                    "Do MMMM YYYY"
                  )}
                </span>
              </div>
              <div className="flex items-center text-base font-font-droid font-semibold gap-1">
                <h6 className="text-[#777] sm:text-base text-sm">End date :</h6>
                <span className="text-black sm:text-base text-sm">
                  {convertUTCToGMT(new Date(uploadData?.endDate)).format(
                    "Do MMMM YYYY"
                  )}
                </span>
              </div>
              <div className="flex items-center text-base font-font-droid font-semibold gap-1">
                <h6 className="text-[#777] sm:text-base text-sm">
                  Last updated by :
                </h6>
                <span className="text-black sm:text-base text-sm">
                  {userData?.name}
                </span>
              </div>
              <div className="flex items-center text-base font-font-droid font-semibold gap-1">
                <h6 className="text-[#777] sm:text-base text-sm">
                  Last updated date :
                </h6>
                <span className="text-black sm:text-base text-sm">
                  {convertUTCToGMT(new Date(uploadData?.updatedAt)).format(
                    "Do MMMM YYYY"
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-4 col-span-12 pt-6">
            <div className="sm:w-[317px] w-full h-[228px] border border-dashed border-[#D9D9D9] rounded-sm text-center flex flex-col justify-center">
              {isPending ? (
                <Loader />
              ) : file ? (
                <>
                  <FileCheck className="w-[50px] h-[50px] mx-auto" />
                  <p className="text-lg font-font-droid font-semibold pt-[18px]">
                    Evidence
                  </p>
                </>
              ) : (
                <>
                  <img src={fileImage} alt="" className="mx-auto" />
                  <p className="text-xs font-font-droid text-[#9E9E9E] font-medium pt-[18px]">
                    Drag and drop evidence here
                  </p>
                  <p className="text-xs font-droid text-[#9E9E9E] pt-2">-OR-</p>
                  <Label
                    htmlFor="upload"
                    className="w-[120px] h-[34px] flex items-center justify-center bg-[#42A7C3] rounded-[5px] text-[12px] text-white font-font-droid mx-auto mt-[13px] cursor-pointer"
                  >
                    Upload Evidence
                  </Label>
                  <Input
                    type="file"
                    id="upload"
                    className="hidden"
                    onChange={handleChanges}
                    placeholder="Upload Evidence"
                  />
                </>
              )}
            </div>
            <div className="flex lg:justify-end justify-center pt-5">
              <Button
                type="button"
                isLoading={markPending}
                onClick={handleSubmit}
                // disabled={!file}
                className="xl:w-[200px] xl:h-[52px] w-[190px] sm:h-[45px] h-9 rounded-[6px] bg-[#58BA66] xl:text-base sm:text-[15px] text-sm font-droid font-semibold"
              >
                Mark As Complete
              </Button>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default DelayModel;
