import { trainerInvitation } from "@/services/apiServices/trainer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { MoveLeft } from "lucide-react";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Zod from "zod";
import InputWithLabel from "../comman/InputWithLabel";
import Loader from "../comman/Loader";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { toast } from "../ui/use-toast";

const schema = Zod.object({
  email: Zod.string().email("This is not a valid email."),
  details: Zod.string(),
});
const TrainerInvitation = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "all",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: trainerInvitation,
    onSuccess: (data) => {
      if (data?.data?.trainerExist?.length > 0) {
        toast({
          title: "Success",
          description: "Trainer invitation Already send.",
          variant: "success",
        });
      } else {
        toast({
          title: "Success",
          description: data?.message,
          variant: "success",
        });
      }
      reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  console.log("errors", errors);

  const onSubmit = (data: FieldValues) => {
    const payload = {
      email: [data?.email],
      invitationDetails: data?.details,
      TrainerCompanyId: "13",
    };

    mutate(payload);
  };

  return (
    <div className="bg-white">
      <div className="px-[14px] py-[10px] flex items-center justify-between border-b">
        <h3 className="text-[16px] font-[700] font-nunito">
          Trainer Management
        </h3>
        <Button
          type="button"
          variant={"ghost"}
          onClick={() => navigate("/trainer/trainer-management")}
          className="gap-4 font-nunito text-[16px]"
        >
          <MoveLeft className="text-[#0f170d]" /> Back
        </Button>
      </div>
      <div className="px-[14px] py-[18px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full mb-[18px]">
            <Label className="text-[16px] font-nunito font-[400]">
              Enter Trainer Email ID{" "}
              <span className="text-[#A3A3A3]">(comma separated email id)</span>
            </Label>
            <InputWithLabel
              className="!w-full mt-2 font-nunito"
              {...register("email")}
              placeholder="Enter email id"
              error={errors?.email?.message as string}
            />
          </div>
          <div className="w-full mb-[30px]">
            <Label className="text-[16px] font-nunito font-[400]">
              Invitation Details
            </Label>
            <Textarea
              className="!w-full mt-2 font-nunito"
              {...register("details")}
              placeholder="Enter Details"
            />
          </div>
          <div className="text-right">
            <Button
              type="submit"
              className="text-[16px] font-semibold min-w-[98px] font-nunito py-[14px] px-[8px] h-auto bg-[#58BA66]"
            >
              {isPending ? (
                <Loader containerClassName="h-auto" />
              ) : (
                "Send Invite"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TrainerInvitation;
