import { useAppSelector } from "@/hooks/use-redux";
import { createEmployeeInvition } from "@/services/apiServices/member";
import { EmployeePayload } from "@/types/Invition";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import CustomTabInput from "../comman/CustomTabInput";
import ErrorMessage from "../comman/Error/ErrorMessage";
import Modal from "../comman/Modal";
import TextAreaWithLabel from "../comman/TextAreaWithLabel";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

const schema = z.object({
  invitiondetail: z.string().min(1, { message: "Email Address is required" }),
});
const InviteMember = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { CompanyId } = useAppSelector((state) => state.user);
  const { toast } = useToast();
  const [emails, setEmails] = useState<string[]>([]);
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const CompanyID = CompanyId
    ? CompanyId
    : userData?.query
    ? userData?.query?.companyDetails?.id
    : userData?.companyDetails?.id;

  type ValidationSchema = z.infer<typeof schema>;
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ValidationSchema>({
    resolver: zodResolver(schema),
    mode: "all",
  });

  const { mutate: createEmployeeInvitionlist, isPending } = useMutation({
    mutationFn: createEmployeeInvition,
    onSuccess: () => {
      reset();
      setEmails([]);
      setIsOpen(false);
      toast({ title: "Invitation Sent Successfully", variant: "success" });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: error.message,
      });
    },
  });

  const onSubmit = async (data: FieldValues) => {
    const payload: EmployeePayload = {
      email: emails,
      csvUrl: "",
      invitationDetails: data?.invitiondetail,
      companyId: CompanyID,
    };
    createEmployeeInvitionlist(payload);
  };
  return (
    <Modal
      open={isOpen}
      header="Invite Team Member"
      className="max-w-[815px] w-full gap-0"
      onClose={() => {
        setIsOpen(false);
      }}
    >
      <div className="bg-[#FFFFFF] rounded-xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h3 className="text-[16px] font-nunito font-semibold pt-5 pb-2">
              Enter Team Member Email ID
              <span className="font-nunito font-normal text-[#A3A3A3] text-base ml-2">
                (comma separated email id)
              </span>
            </h3>
            <div className="mt-[10px]">
              <div className="w-full">
                <CustomTabInput setValue={setEmails} />
                {/* {errors.email && (
                  <ErrorMessage message={errors.email.message as string} />
                )} */}
              </div>
            </div>
          </div>

          <div className="mt-[33px]">
            <TextAreaWithLabel
              className="text-stone-400 text-base font-nunito"
              label="Invitation Details"
              labelClassName="font-nunito font-semibold !text-base"
              {...register("invitiondetail")}
              placeholder="Enter Details"
              isLength={false}
            />
            {errors.invitiondetail?.message && (
              <ErrorMessage message={errors.invitiondetail.message as string} />
            )}
          </div>

          <div className="text-end mt-[10px] ">
            <Button
              type="submit"
              className="bg-[#64A70B] text-base leading-5 w-[100px] h-[40px] font-semibold font-nunito"
              isLoading={isPending}
            >
              Send Invite
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default InviteMember;
