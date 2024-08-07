import ErrorMessage from "@/components/comman/Error/ErrorMessage";
import FileUpload from "@/components/comman/FileUpload";
import InputWithLabel from "@/components/comman/InputWithLabel";
import Loader from "@/components/comman/Loader";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAppSelector } from "@/hooks/use-redux";
import { createEmployeeInvition } from "@/services/apiServices/member";
import { EmployeePayload } from "@/types/Invition";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const schema = z.object({
  email: z.string({ message: "Please enter email" }).min(1, { message: "Please enter email" }).regex(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[cC][oO][mM]$/i, { message: `Please enter an email address with @, number and .com` }),
  file: z.string().optional(),
  invitiondetail: z.string().min(1, { message: "Please enter email" }),
});

const EmployeeInvitation = () => {
  const { CompanyId } = useAppSelector((state) => state.user);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [emails, setEmails] = useState<string>("");
  const [file, setFile] = useState("");
  const handleBackClick = () => {
      navigate("/company/employeelist");
  };
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
    setValue,
    handleSubmit,
    reset,
  } = useForm<ValidationSchema>({
    resolver: zodResolver(schema),
    mode: "all",
  });

  const { mutate: createEmployeeInvitionlist, isPending } = useMutation({
    mutationFn: createEmployeeInvition,
    onSuccess: (data) => {
      if(data?.data?.data?.employeeExist?.length > 0){
        toast({ 
          title: "Success", 
          description: "Employee invitation Already send.", 
          variant: "success" 
        });
      }else{
        reset();
        setEmails("");
        setFile("");
        navigate("/company/employeelist");
        toast({ title: "Invitation sent successfully", variant: "success" });
      }
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
      email: [emails],
      csvUrl: data?.file,
      invitationDetails: data?.invitiondetail,
      companyId: CompanyID,
    };
    createEmployeeInvitionlist(payload);
  };

  return (
    <div>
      <div className="bg-[#FFFFFF] rounded-xl p-5">
        <div className="bg-[#FFFFFF] border-b border-[#D9D9D9] rounded-t-[10px] flex items-center justify-between pb-[15px]">
          <div className="md:flex block items-center gap-3">
            <p className="text-[#000000] font-abhaya text-base font-semibold">
              Send Invitation
            </p>
            <p className="text-[15px] font-abhaya text-[#606060] font-semibold">
              Drop them an invite so they can join you here with their sleeves
              rolled
            </p>
          </div>
          <div>
            <Button
              className="bg-transparent hover:bg-transparent text-black font-nunito font-semibold text-base p-0 h-auto"
              onClick={handleBackClick}
            >
              <IoIosArrowRoundBack size={26} />
              Back
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h3 className="text-[16px] font-nunito font-semibold pt-5 pb-2 flex sm:flex-row flex-col sm:gap-2 gap-1">
              Enter Team Member Email ID
              <span className="font-nunito font-normal text-[#A3A3A3] text-base">
                (comma separated email id)
              </span>
            </h3>
            <div className="mt-[10px]">
              <div className="w-full">
                <div className="flex flex-wrap gap-2 border p-3 rounded h-[52px] mt-2">
                  <input
                    {...register("email")}
                    value={emails}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {setValue("email", e?.target?.value); setEmails(e?.target?.value)}}
                    placeholder="Enter email and Press Enter"
                    className="flex-grow border-none outline-none"
                  />
                </div>
                {errors.email?.message && (
                  <ErrorMessage message={errors?.email?.message as string} />
                )}
              </div>
            </div>
          </div>

          <p className="font-bold font-abhaya mt-[32px] text-base">
            OR
            <a href="#" className="text-[#0E9CFF] ml-2 underline">
              Download Sample File
            </a>
          </p>
          <div className="mt-[18px] ">
            <p className="text-base font-abhaya text-[#000000] font-bold">
              Want to invite a list of team members?
              <br />
              Simply prepare their details on a CSV file, keeping at least one
              row per email user, and we’ll send an invitation to each person.
            </p>
          </div>
          <div className="mt-[24px] flex items-center gap-6">
            <div className="flex items-center gap-3">
              <FileUpload
                handleDrop={(e) => {
                  setValue("file", e);
                  setFile(e);
                }}
                className="border-none cursor-pointer !p-0 justify-center"
                acceptType=".csv"
              >
                <div className="flex">
                  <span className="bg-[#00778B] w-[134px] h-[52px] leading-[52px] rounded text-white cursor-pointer !p-0 text-base font-abhaya">
                    Upload CSV File
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

          <div className="mt-[33px]">
            <InputWithLabel
              className="text-stone-400 border h-[102px] mt-[10px] text-base font-nunito"
              label="Invitation Details"
              labelClassName="font-nunito font-semibold !text-base"
              {...register("invitiondetail")}
              placeholder="Enter Details"
            />
            {errors.invitiondetail?.message && (
              <ErrorMessage message={errors.invitiondetail.message as string} />
            )}
          </div>

          <div className="text-end mt-[30px] ">
            <Button
              type="submit"
              className="bg-[#64A70B] text-base leading-5 w-[100px] h-[52px] font-semibold font-nunito"
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
