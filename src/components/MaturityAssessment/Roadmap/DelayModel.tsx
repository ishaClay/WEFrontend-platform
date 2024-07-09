import fileImage from "@/assets/images/fileupload.svg";
import Loader from "@/components/comman/Loader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QUERY_KEYS } from "@/lib/constants";
import { markComplate } from "@/services/apiServices/pillar";
import { uploadFile } from "@/services/apiServices/uploadServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FileCheck } from "lucide-react";
import moment from "moment";
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
  const status = () => {
    if (
      moment(new Date(uploadData?.startDate), "YYYY-MM-DD").isSameOrBefore(
        moment(new Date(), "YYYY-MM-DD")
      ) &&
      moment(new Date(uploadData?.endDate), "YYYY-MM-DD").isSameOrAfter(
        moment(new Date(), "YYYY-MM-DD")
      )
    ) {
      return "On time";
    } else if (
      moment(new Date(), "YYYY-MM-DD").isAfter(
        moment(new Date(uploadData?.endDate), "YYYY-MM-DD")
      )
    ) {
      return "Delay";
    } else if (
      moment(new Date(uploadData?.startDate), "YYYY-MM-DD").isAfter(
        moment(new Date(), "YYYY-MM-DD")
      )
    ) {
      return "On Progress";
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: uploadFile,
    onSuccess: (data) => {
      setFile(data?.data?.data?.file);
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  const { mutate: mark, isPending: markPending } = useMutation({
    mutationFn: markComplate,
    onSuccess: async (data) => {
      console.log("data", data);
      setUploadData(null);
      setFile(null);
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.checkedMeasures],
      });
      handleClose();
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  const handleChanges = (e: any) => {
    const { files } = e.target;

    mutate(files[0]);
  };

  const handleSubmit = () => {
    const payload = {
      iscomplete: 1,
      evidence: file,
    };
    mark({ data: payload, id: uploadData?.id });
  };

  return (
    <div>
      <h6 className="text-base font-bold font-nunito text-[#000]">
        Assigned Action Item Details
      </h6>
      <div className="pt-7 grid grid-cols-9">
        <div className="col-span-5">
          <Badge
            className={`${
              status() === "Delay"
                ? "bg-[#F63636] text-white"
                : "bg-[#FFD56A] text-black"
            } min-w-[53px] h-[28px] text-sm font-abhaya font-semibold`}
          >
            {status()}
          </Badge>
          <h6 className="font-abhaya text-xl font-bold leading-6 text-[#000] pt-6">
            {uploadData?.measure}
          </h6>
          <div className="pt-7">
            <div className="flex items-center text-base font-abhaya font-semibold gap-1 pb-4">
              <h6 className="text-[#777]">Start date :</h6>
              <span className="text-[#000]">
                {moment(new Date(uploadData?.startDate)).format("Do MMMM YYYY")}
              </span>
            </div>
            <div className="flex items-center text-base font-abhaya font-semibold gap-1 pb-5">
              <h6 className="text-[#777]">End date :</h6>
              <span className="text-[#000]">
                {moment(new Date(uploadData?.endDate)).format("Do MMMM YYYY")}
              </span>
            </div>
            <div className="flex items-center text-base font-abhaya font-semibold gap-1 pb-4">
              <h6 className="text-[#777]">Last updated by :</h6>
              <span className="text-[#000]">{userData?.name}</span>
            </div>
            <div className="flex items-center text-base font-abhaya font-semibold gap-1">
              <h6 className="text-[#777]">Last updated date :</h6>
              <span className="text-[#000]">
                {moment(new Date(uploadData?.updatedAt)).format("Do MMMM YYYY")}
              </span>
            </div>
          </div>
        </div>
        <div className="col-span-4 flex justify-end pt-6">
          <div>
            <div className="w-[317px] h-[228px] border border-dashed border-[#D9D9D9] rounded-sm text-center flex flex-col justify-center">
              {isPending ? (
                <Loader />
              ) : file ? (
                <>
                  <FileCheck className="w-[50px] h-[50px] mx-auto" />
                  <p className="text-lg font-abhaya font-semibold pt-[18px]">
                    Evidence
                  </p>
                </>
              ) : (
                <>
                  <img src={fileImage} alt="" className="mx-auto" />
                  <p className="text-xs font-abhaya text-[#9E9E9E] font-medium pt-[18px]">
                    Drag and drop evidence here
                  </p>
                  <p className="text-xs font-inter text-[#9E9E9E] pt-2">-OR-</p>
                  <Label
                    htmlFor="upload"
                    className="w-[120px] h-[34px] flex items-center justify-center bg-[#42A7C3] rounded-[5px] text-[12px] text-white font-abhaya mx-auto mt-[13px] cursor-pointer"
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
            <div className="flex justify-end pt-[22px]">
              <Button
                type="button"
                isLoading={markPending}
                onClick={handleSubmit}
                className="xl:w-[201px] xl:h-[52px] w-[180px] h-[45px] rounded-[6px] bg-[#58BA66] xl:text-base text-[15px] font-nunito font-semibold"
              >
                Mark As Completed
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DelayModel;
