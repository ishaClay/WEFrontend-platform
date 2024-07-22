import {
  getTrainerById,
  updateTrainerStatusById,
} from "@/services/apiServices/trainer";
import { TrainerStatus, TrainersByIdResponse } from "@/types/Trainer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../comman/Loader";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Switch } from "../ui/switch";
import { toast } from "../ui/use-toast";

const TrainerDetails = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const [trainerStatus, setTrainerStatus] = useState<string>("");
  const [trainerPermission, setTrainerPermission] = useState<boolean>(false);
  const navigate = useNavigate();
  const { data: clientDetails, isPending } = useQuery<TrainersByIdResponse>({
    queryKey: ["trainerDetails", params.id],
    queryFn: () => getTrainerById({ id: params.id || "" }),
  });

  const { mutate, isPending: isPendingUpdate } = useMutation({
    mutationFn: updateTrainerStatusById,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["trainerDetails", params.id],
      });
      toast({
        variant: "success",
        description: "Trainer status updated successfully",
      });
    },
    onError: (error: AxiosError) => {
      toast({
        variant: "destructive",
        description: error.message,
      });
    },
  });

  useEffect(() => {
    if (clientDetails?.data) {
      setTrainerStatus(clientDetails?.data?.status.toString() || "");
      setTrainerPermission(clientDetails?.data?.approved);
    }
  }, [clientDetails]);

  const handleSubmit = () => {
    const data = {
      status: Number(trainerStatus),
      approved: trainerPermission,
    };

    mutate({ id: params.id || "", data });
  };

  return (
    <div className="bg-white h-full rounded-[6px] overflow-auto">
      <div className="font-nunitoSans text-[16px] leading-[22px] text-black">
        <div className="px-[14px] py-[10px] flex items-center justify-between border-b mb-[36px]">
          <div>
            <h3 className="text-[16px] font-[700] font-nunito mb-1">
              Trainer Details
            </h3>
            <p className="text-[#606060] text-[15px]">All the details on your trainer, in one convenient view</p>
          </div>
          <Button
            type="button"
            onClick={() => navigate("/trainer/trainer-management/invitation")}
            className="bg-[#00778B] font-nunito px-5 text-[16px]"
          >
            INVITE TRAINER
          </Button>
        </div>
        {isPending ? (
          <Loader />
        ) : (
          <div className="px-2 sm:px-4 md:px-6  py-[17px] flex flex-col gap-5">
            <div className="border relative border-[#D9D9D9] rounded-[10px] min-h-[160px] grid grid-cols-4 px-6 py-[30px] gap-8 mb-[36px]">
              <h2 className="absolute -top-3 left-6 bg-white px-1 text-[16px] font-[400] font-nunito">
                Trainer personal information
              </h2>
              <div className="col-span-1 w-full flex justify-start mb-2 md:mb-0">
                <Avatar className="w-28 h-28">
                  <AvatarImage src={clientDetails?.data?.imageUrl} />
                  <AvatarFallback className="uppercase shadow-lg text-[40px] font-nunito">
                    {clientDetails?.data?.name?.[0]}
                    {clientDetails?.data?.name?.[1]}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="col-span-1 flex items-center font-nunito w-full">
                <div>
                  <h3 className="text-[#A3A3A3]">Trainer name</h3>
                  <p className="text-[#000]">
                    {clientDetails?.data?.name || "--"}
                  </p>
                </div>
              </div>
              <div className="col-span-1 flex items-center font-nunito w-full">
                <div>
                  <h3 className="text-[#A3A3A3]">Contact number</h3>
                  <p className="text-[#000]">
                    {clientDetails?.data?.number || "--"}
                  </p>
                </div>
              </div>
              <div className="col-span-1 flex items-center font-nunito w-full">
                <div>
                  <h3 className="text-[#A3A3A3]">Email address</h3>
                  <p className="text-[#000]">
                    {clientDetails?.data?.email || "--"}
                  </p>
                </div>
              </div>
            </div>
            <div className="border relative border-[#D9D9D9] rounded-[10px] min-h-[160px] grid grid-cols-4 px-6 py-[30px] gap-8 mb-[36px]">
              <h2 className="absolute -top-3 left-6 bg-white px-1 text-[16px] font-[400] font-nunito">
                Provider information
              </h2>
              <div className="col-span-1 font-nunito">
                <h3 className="text-[#A3A3A3] ">Provider name</h3>
                <p>{clientDetails?.data?.providerName || "--"}</p>
              </div>
              <div className="col-span-1 font-nunito">
                <h3 className="text-[#A3A3A3] ">Provider type</h3>
                <p>{clientDetails?.data?.providerType || "--"}</p>
              </div>
              <div className="col-span-1 font-nunito">
                <h3 className="text-[#A3A3A3] ">Country</h3>
                <p>{clientDetails?.data?.providerCounty || "--"}</p>
              </div>
              <div className="col-span-1 font-nunito">
                <h3 className="text-[#A3A3A3] ">City / Town</h3>
                <p>{clientDetails?.data?.providerCity || "--"}</p>
              </div>
              <div className="col-span-1 font-nunito">
                <h3 className="text-[#A3A3A3] ">Foreign provider</h3>
                <p>{clientDetails?.data?.foreignProvider || "--"}</p>
              </div>
              <div className="col-span-1 font-nunito">
                <h3 className="text-[#A3A3A3] ">Provider note</h3>
                <p>{clientDetails?.data?.providerNotes || "--"}</p>
              </div>
            </div>
            <div className="border relative border-[#D9D9D9] gap-8 rounded-[10px] px-6 py-[30px] items-center mb-[36px]">
              <h2 className="absolute -top-3 left-6 bg-white px-1 text-[16px] font-[400] font-nunito">
                Trainer Status
              </h2>
              <RadioGroup
                defaultValue={trainerStatus}
                value={trainerStatus}
                onValueChange={(data) => setTrainerStatus(data)}
                className="flex items-center gap-[34px]"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={"1"}
                    id="r1"
                    className={`${TrainerStatus[+trainerStatus] !== "Active" &&
                      "border-[#A3A3A3]"
                      }`}
                  />
                  <Label
                    htmlFor="r1"
                    className={`text-[16px] font-normal ${TrainerStatus[+trainerStatus] !== "Active" &&
                      "text-[#A3A3A3]"
                      }`}
                  >
                    Active
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={"0"}
                    id="r2"
                    className={`${TrainerStatus[+trainerStatus] !== "Inactive" &&
                      "border-[#A3A3A3]"
                      }`}
                  />
                  <Label
                    htmlFor="r2"
                    className={`text-[16px] font-normal ${TrainerStatus[+trainerStatus] !== "Inactive" &&
                      "text-[#A3A3A3]"
                      }`}
                  >
                    Inactive
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className="border relative border-[#D9D9D9] gap-8 rounded-[10px] px-6 py-[30px] items-center">
              <h2 className="absolute -top-3 left-6 bg-white px-1 text-[16px] font-[400] font-nunito">
                Trainer Permission
              </h2>
              <div className="flex items-center space-x-2">
                <Switch
                  id="airplane-mode"
                  defaultChecked={trainerPermission}
                  checked={trainerPermission}
                  onCheckedChange={() =>
                    setTrainerPermission(!trainerPermission)
                  }
                  switchClassName={
                    "w-[12px] h-[12px] data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0.5"
                  }
                  className="h-[21px] w-[42px] data-[state=checked]:bg-[#00778B] data-[state=unchecked]:bg-input"
                />
                <Label
                  htmlFor="airplane-mode"
                  className="text-[16px] font-nunito"
                >
                  Course Creation Permission
                </Label>
              </div>
            </div>
            <div className="text-right">
              <Button
                type="button"
                onClick={handleSubmit}
                className="text-[16px] font-semibold font-nunito uppercase py-[15px] px-[30px] h-auto bg-[#58BA66]"
              >
                {isPendingUpdate ? (
                  <Loader containerClassName="h-auto" />
                ) : (
                  "Update"
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainerDetails;
