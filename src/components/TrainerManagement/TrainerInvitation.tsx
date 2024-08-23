import { trainerInvitation } from "@/services/apiServices/trainer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { MoveLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import * as Zod from "zod";
import CustomTabInput from "../comman/CustomTabInput";
import ErrorMessage from "../comman/Error/ErrorMessage";
import Loader from "../comman/Loader";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { toast } from "../ui/use-toast";
import { setPath } from "@/redux/reducer/PathReducer";
import { useAppDispatch } from "@/hooks/use-redux";

const schema = Zod.object({
  email: Zod.string({ message: "Email is required" }).min(1, {
    message: "Email is required",
  }),
  details: Zod.string({ message: "Invitation detail is required" }).min(1, {
    message: "Invitation detail is required",
  }),
});
const TrainerInvitation = () => {
  const Role = location.pathname.split("/")[1];
  const dispatch = useAppDispatch();
  const [emails, setEmails] = useState<string[]>([]);
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const id = userData?.query?.detailsid;

  type ValidationSchema = Zod.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(schema),
    mode: "all",
  });
  const url = window.location.origin;

  useEffect(() => {
    if (emails.length > 0) {
      setValue("email", emails.join(","));
    } else {
      setValue("email", "");
    }
  }, [emails]);

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
        setEmails([]);
        reset();
        dispatch(
          setPath([
            {
              label: "Trainer Management",
              link: `/${Role}/trainer-management`,
            },
          ])
        );
      }
      setEmails([]);
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

  const onSubmit = (data: FieldValues) => {
    const payload = {
      email: emails,
      invitationDetails: data?.details,
      TrainerCompanyId: id,
      baseUrl: url,
    };

    mutate(payload);
  };

  return (
    <div className="bg-white">
      <div className="px-[14px] py-[10px] flex items-center justify-between border-b">
        <div>
          <h3 className="text-[16px] font-[700] font-nunito mb-1">
            Trainer Management
          </h3>
          <p className="text-[#606060] text-[15px]">
            Choose a trainer to invite onto this platform!
          </p>
        </div>
        <Button
          type="button"
          variant={"ghost"}
          onClick={() => {
            dispatch(
              setPath([
                {
                  label: "Trainer Managment",
                  link: `/${Role}/trainer-management`,
                },
              ])
            );
          }}
          className="gap-4 font-nunito text-[16px]"
        >
          <MoveLeft className="text-[#0f170d]" /> Back
        </Button>
      </div>
      <div className="px-[14px] py-[18px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full mb-[18px]">
            <Label className="text-[16px] font-nunito font-[400]">
              Enter Trainer Email ID
              <span className="text-[#A3A3A3]">(comma separated email id)</span>
            </Label>
            <CustomTabInput setValue={setEmails} {...register("email")} />
            {!errors?.email?.ref?.value && (
              <ErrorMessage message={errors?.email?.message as string} />
            )}
          </div>
          <div className="w-full mb-[30px]">
            <Label className="text-[16px] font-nunito font-[400]">
              Invitation Message
            </Label>
            <Textarea
              className="!w-full mt-2 font-nunito"
              {...register("details")}
              placeholder="Enter Details"
            />
            {errors?.details && (
              <ErrorMessage message={errors?.details?.message as string} />
            )}
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
