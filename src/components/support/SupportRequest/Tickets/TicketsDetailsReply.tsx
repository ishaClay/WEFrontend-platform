import ErrorMessage from "@/components/comman/Error/ErrorMessage";
import Loading from "@/components/comman/Error/Loading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { QUERY_KEYS } from "@/lib/constants";
import {
  fetchAssignTo,
  fetchOneSupportTicket,
  getSingleSupportTicket,
  updateSupportTicket,
} from "@/services/apiServices/supportRequestServices";
import { UserRole } from "@/types/UserRole";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import documentIcon from "@/assets/images/pdf.png";

const TicketsDetailsReply = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { clientId } = useSelector((state: any) => state?.user);
  const { data, isPending } = useQuery({
    queryKey: [QUERY_KEYS.courseTopFive, id],
    queryFn: () => fetchOneSupportTicket(id as string),
  });
  console.log("id", id);

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navegate = useNavigate();
  const [selectAssingValue, setSelectAssingValue] = useState("");
  const [selectTicketStatus, setSelectTicketStatus] = useState("");

  const { data: fetchAssignToData, refetch } = useQuery({
    queryKey: [QUERY_KEYS.AssignTo],
    queryFn: () => fetchAssignTo(clientId as string),
  });

  const { data: fetchSingleSupportTicket, refetch: refetchSingleSupport } =
    useQuery({
      queryKey: [QUERY_KEYS.getSingleSupportTicket],
      queryFn: () => getSingleSupportTicket(id as string),
    });

  const schema = z.object({
    assignTo: z.string({ required_error: "Assign To is required" }),
    ticketStatus: z.string({ required_error: "Ticket Status is required" }),
    details: z
      .string({ required_error: "Details is required" })
      .min(1, "Details is required"),
  });

  type ValidationSchema = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ValidationSchema>({
    resolver: zodResolver(schema),
    mode: "all",
  });

  useEffect(() => {
    setValue(
      "assignTo",
      String(fetchSingleSupportTicket?.data.data?.assignTo.id)
    );
    setValue(
      "ticketStatus",
      String(fetchSingleSupportTicket?.data.data?.status)
    );
    setValue(
      "details",
      String(
        fetchSingleSupportTicket?.data.data?.reply
          ? fetchSingleSupportTicket?.data.data?.reply
          : ""
      )
    );
    setSelectAssingValue(fetchSingleSupportTicket?.data.data?.assignTo.id);
    setSelectTicketStatus(String(fetchSingleSupportTicket?.data.data?.status));
  }, [clientId, fetchSingleSupportTicket]);

  useEffect(() => {
    refetchSingleSupport();
  }, [clientId]);

  const { mutate: updateTicket } = useMutation({
    mutationFn: (e: any) => updateSupportTicket(e),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.getSingleSupportTicket],
      });
      toast({
        variant: "default",
        title: "Ticket Updated Successfully",
      });
      navegate("/support-request");
    },
  });

  useEffect(() => {
    refetch();
  }, [clientId]);

  const userName = (name: string) => {
    let uName = name?.split(" ");
    let newName = "";
    for (let i = 0; i < uName?.length; i++) {
      newName += uName[i]?.charAt(0).toUpperCase();
    }
    return newName;
  };

  const handleDownload = () => {
    const pdfUrl = data?.data?.data?.documentUrl;
    const anchor = document.createElement("a");
    anchor.href = pdfUrl;
    anchor.download = "document.pdf";
    anchor.click();
  };

  const onSubmit = (data: FieldValues) => {
    const payload: any = {
      id: id,
      item: {
        assignTo: +data?.assignTo,
        status: data?.ticketStatus,
        reply: data?.details,
      },
    };
    updateTicket(payload);
  };

  return (
    <div className="h-[auto] bg-[white] rounded-[10px] mb-[21px] font-nunitoSans ">
      <div className="h-[70px] border-b-2 border-solid gray flex justify-between items-center pl-[20px] pr-[28px] ">
        <h2 className="font-[700] text-[16px]">Ticket Details</h2>
        <Button
          className="bg-transparent hover:bg-transparent text-black font-semibold text-[16px]"
          onClick={() => navigate("/company/support-request")}
        >
          <IoIosArrowRoundBack size={26} className="mr-4" />
          Back
        </Button>
      </div>

      <div className="pl-[20px] pr-[28px] mt-[26px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between">
            <div className="flex gap-[11px]">
              <Avatar className="w-[32px] h-[32px]">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>
                  {userName(data?.data?.data?.openBy?.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-[16px]">
                  {data?.data?.data?.openBy?.name}
                </h3>
                <p className="text-[#A3A3A3] text-[12px]">
                  Provider Type: {""}
<<<<<<< Updated upstream
                  {
                    data?.data?.data?.openBy?.role === UserRole.Company ? "SME Company" :
                      data?.data?.data?.openBy?.role === UserRole.Trainer ? "Trainer Company" :
                        data?.data?.data?.openBy?.role === UserRole.Trainee ? "Trainer" :
                          data?.data?.data?.openBy?.role === UserRole.Employee ? "Company Employee" :
                            data?.data?.data?.openBy?.role === UserRole.SuperAdmin ? "Super Admin" : "Client"
                  }
=======
                  {data?.data?.data?.openBy?.role === UserRole.Company
                    ? "SME Company"
                    : data?.data?.data?.openBy?.role === UserRole.Trainer
                    ? "Trainer Company"
                    : data?.data?.data?.openBy?.role === UserRole.Trainee
                    ? "Trainer"
                    : data?.data?.data?.openBy?.role === UserRole.Employee
                    ? "Company Employee"
                    : data?.data?.data?.openBy?.role === UserRole.SuperAdmin
                    ? "Super Admin"
                    : "Client"}
>>>>>>> Stashed changes
                </p>
              </div>
            </div>

            <div className="flex gap-[28px]">
              <div>
                <span>Status: </span>
                <Button
                  className={`rounded-[15px] ${
                    data?.data?.data?.status === "Open"
                      ? "bg-[#FFA25E]"
                      : data?.data?.data?.status === "Answered"
                      ? "bg-[#58BA66]"
                      : "bg-[#0E9CFF]"
                  }`}
                >
                  {data?.data?.data?.status}
                </Button>
              </div>
              <div>
                <span>Priority: </span>
<<<<<<< Updated upstream
                <Button className={`rounded-[15px] ${data?.data?.data?.priority === "Medium" ? "bg-[#58BA66]" : data?.data?.data?.priority === "High" ? "bg-[#FF5252]" : "bg-[#FFD56A]"}`}>
=======
                <Button
                  className={`rounded-[15px] ${
                    data?.data?.data?.priority === "Normal"
                      ? "bg-[#58BA66]"
                      : data?.data?.data?.priority === "High"
                      ? ""
                      : "bg-[#FF5252]"
                  }`}
                >
>>>>>>> Stashed changes
                  {data?.data?.data?.priority}
                </Button>
              </div>
            </div>
          </div>

          <div className="max-w-full h-[320px] border solid 1px gray rounded-[10px] mt-[34px] p-[17px]">
            <p className="text-[#A3A3A3] text-[16px] ">Ticket Subject</p>
            <h3 className="text-[16px] mt-[9px]">
              How to customize the template?
            </h3>
            <p className="text-[#A3A3A3] text-[16px] mt-[18px]">
              Ticket Details
            </p>
            <h3 className="text-[16px] mt-[12px]">
              {data?.data.data?.description}
            </h3>

            <div className="flex items-center mt-[32px]">
              <img src={documentIcon} />
              <h3 className="text-[16px] ml-2">
                {data?.data.data?.documentUrl}
              </h3>
              <Button
                type="button"
                onClick={handleDownload}
                className="ml-[22px]"
              >
                DOWNLOAD
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-[36px] mt-[29px]">
            {/* <InputWithLable label="Assign To" /> */}
            <div>
              <Select
                onValueChange={(e) => {
                  setValue("assignTo", e);
                  setSelectAssingValue(e);
                }}
                value={String(selectAssingValue)}
                {...register("assignTo")}
              >
                <SelectGroup>
                  <SelectLabel className="text-[16px] font-[400]">
                    Assign To
                  </SelectLabel>

                  <SelectTrigger className="max-w-full h-[52px]">
                    <SelectValue placeholder="Select Name" />
                  </SelectTrigger>
                </SelectGroup>
                <SelectContent>
                  {fetchAssignToData?.data.data
                    .filter((item: any) => item.name)
                    .map((item: any) => {
                      return (
                        <SelectItem key={item._id} value={String(item.id)}>
                          {item.name}
                        </SelectItem>
                      );
                    })}
                </SelectContent>
              </Select>
              {!errors?.assignTo?.ref?.value && (
                <ErrorMessage message={errors?.assignTo?.message as string} />
              )}
            </div>

            <div>
              <Select
                onValueChange={(e) => {
                  setValue("ticketStatus", e);
                  setSelectTicketStatus(e);
                }}
                value={selectTicketStatus}
                {...register("ticketStatus")}
              >
                <SelectGroup>
                  <SelectLabel className="text-[16px] font-[400]">
                    Ticket Status
                  </SelectLabel>

                  <SelectTrigger className="max-w-full h-[52px]">
                    <SelectValue placeholder="Select Ticket Status" />
                  </SelectTrigger>
                </SelectGroup>
                <SelectContent>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="Answered">Answered</SelectItem>
                  <SelectItem value="InProcess">InProcess</SelectItem>
                </SelectContent>
              </Select>
              {!errors?.ticketStatus?.ref?.value && (
                <ErrorMessage
                  message={errors?.ticketStatus?.message as string}
                />
              )}
            </div>
          </div>

          <textarea
            placeholder="Enter Details"
            {...register("details")}
            className="w-full h-[200px] border solid 1px gray rounded-[10px] mt-[34px] p-[17px]"
          />
          {errors?.details && (
            <ErrorMessage message={errors?.details?.message as string} />
          )}

          <div className="w-full flex justify-end mt-[50px]">
            <Button
              type="submit"
              variant="secondary"
              className="w-[120px] h-[48px]"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>

      <Loading isLoading={isPending} />
    </div>
  );
};

export default TicketsDetailsReply;
