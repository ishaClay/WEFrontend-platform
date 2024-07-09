import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputWithLabel from "@/components/comman/InputWithLabel";
import CustomTabInput from "@/components/comman/CustomTabInput";
import ErrorMessage from "@/components/comman/Error/ErrorMessage";
import { EmployeePayload } from "@/types/Invition";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import FileUpload from "@/components/comman/FileUpload";
import { useAppSelector } from "@/hooks/use-redux";
import Loader from "@/components/comman/Loader";
import { createEmployeeInvition } from "@/services/apiServices/member";

const schema = z.object({
  file: z.string().min(1, { message: "Email Address is required" }),
  invitiondetail: z.string().min(1, { message: "Email Address is required" }),
});

const EmployeeInvitation = () => {
  const { CompanyId } = useAppSelector((state) => state.user);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [emails, setEmails] = useState<string[]>([]);
  const [file, setFile] = useState("");
  const handleBackClick = () => {
    navigate("/company/employeelist");
  };

  type ValidationSchema = z.infer<typeof schema>;
  const {
    register,
    formState: { errors },
    setValue,
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
      setFile("");
      navigate("/company/employeelist");
      toast({ title: "Invition Send Successfully", variant: "success" });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: error.message,
      });
    },
  });

  const onSubmit = async (data: FieldValues) => {
    console.log("saaaaa", data);

    const payload: EmployeePayload = {
      email: emails,
      csvUrl: data?.file,
      invitationDetails: data?.invitiondetail,
      companyId: CompanyId,
    };
    createEmployeeInvitionlist(payload);
  };

  return (
    <div>
      <div className="bg-[#FFFFFF] rounded-xl p-5">
        <div className="ml-[10px] h-[60px] bg-[#FFFFFF] border-b border-[#D9D9D9] rounded-t-[10px] flex items-center justify-between ">
          <div className="flex gap-2 ">
            <p className="text-[#000000] text-[Calibri] font-abhaya font-semibold ml-[5px] ">
              Send Invitation
            </p>
          </div>
          <div>
            <Button
              className="bg-transparent hover:bg-transparent text-black font-semibold text-[16px]"
              onClick={handleBackClick}
            >
              <IoIosArrowRoundBack size={26} />
              Back
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-[10px] h-[82px] w-[1120px]">
            <h3 className="text-[18px] font-abhaya font-semibold">
              Enter Team Member Email ID
              <span className="font-abhaya font-normal text-stone-400 ml-2">
                (comma separated email id)
              </span>
            </h3>
            <div className="mt-[10px]">
              <div className="col-span-2">
                <CustomTabInput setValue={setEmails} />
                {/* {errors.email && (
                  <ErrorMessage message={errors.email.message as string} />
                )} */}
              </div>
            </div>
          </div>

          <p className="font-semibold font-abhaya mt-[20px] w-[200px]">
            OR
            <a href="#" className="text-[#849dff] ml-2">
              Download Sample File
            </a>
          </p>
          <div className="w-[977px] mt-[20px] ">
            <p className=" font-abhaya">
              Want to invite a list of team members?
              <br />
              Simply prepare their details on a CSV file, keeping at least one
              row per email user, and we’ll send an invitation to each person.
            </p>
          </div>
          <div className=" mt-[34px] ">
            <div className="flex ml-[-22px]">
              <FileUpload
                handleDrop={(e) => {
                  setValue("file", e);
                  setFile(e);
                }}
                className="border-none cursor-pointer !p-0 w-[200px] justify-center"
                acceptType=".csv"
              >
                <div className="flex justify-center ">
                  <span className="bg-[#00778B] w-[134px] h-[35px] rounded text-white cursor-pointer !p-0">
                    Upload Document
                  </span>
                </div>
              </FileUpload>
              {file && (
                <label className=" w-full overflow-hidden text-ellipsis mt-[4px]">
                  {file.split("/").pop()}
                </label>
              )}
            </div>
          </div>

          {errors.file?.message && (
            <ErrorMessage message={errors.file.message as string} />
          )}

          <div className="mt-[20px] w-[1120px]">
            <InputWithLabel
              className="text-stone-400 border h-[102px] mt-[10px]"
              label="Invitation Details"
              labelClassName="font-abhaya font-semibold "
              {...register("invitiondetail")}
              placeholder="Enter Details"
            />
            {errors.invitiondetail?.message && (
              <ErrorMessage message={errors.invitiondetail.message as string} />
            )}
          </div>

          <div className=" text-end mt-[10px] ">
            <Button
              type="submit"
              className="bg-[#64A70B] text-[16px] leading-5 w-[100px] font-semibold font-abhaya "
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

export default EmployeeInvitation;
