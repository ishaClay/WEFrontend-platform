import DocImage from "@/assets/images/pdf.png";
import ErrorMessage from "@/components/comman/Error/ErrorMessage";
import Loading from "@/components/comman/Error/Loading";
import Modal from "@/components/comman/Modal";
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

const TicketsDetailsReply = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [playVideo, setPlayVideo] = useState(false);
  const { clientId } = useSelector((state: any) => state?.user);
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const userID = userData?.query?.id;
  const { data, isPending } = useQuery({
    queryKey: [QUERY_KEYS.courseTopFive, id],
    queryFn: () => getSingleSupportTicket(id as string),
  });
  console.log("id======", id);

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navegate = useNavigate();
  const [selectAssingValue, setSelectAssingValue] = useState("");
  const [selectTicketStatus, setSelectTicketStatus] = useState("");

  const { data: fetchAssignToData, refetch } = useQuery({
    queryKey: [QUERY_KEYS.AssignTo],
    queryFn: () => fetchAssignTo(clientId as string),
  });

  const { data: fetchSingleSupportTicket } = useQuery({
    queryKey: [QUERY_KEYS.getSingleSupportTicket, { id }],
    queryFn: () => getSingleSupportTicket(id as string),
  });

  const schema = z.object({
    assignTo: z.string({ required_error: "Please select this field" }),
    ticketStatus: z.string({ required_error: "Please enter ticket status" }),
    details: z
      .string({ required_error: "Please enter details" })
      .min(1, "Please enter details"),
  });

  type ValidationSchema = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
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
    setSelectAssingValue(fetchSingleSupportTicket?.data.data?.assignTo.id);
    setSelectTicketStatus(String(fetchSingleSupportTicket?.data.data?.status));
  }, [clientId, fetchSingleSupportTicket, setValue]);

  const { mutate: updateTicket, isPending: updatePanding } = useMutation({
    mutationFn: (e: any) => updateSupportTicket(e),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.getSingleSupportTicket],
      });
      toast({
        variant: "default",
        title: "Ticket Updated Successfully",
      });
      navegate(-1);
      reset();
    },
  });

  useEffect(() => {
    refetch();
  }, [clientId]);

  const userName = (name: string) => {
    const uName = name?.split(" ");
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
        id: id,
        openBy: +userID,
        assignTo: +data?.assignTo,
        status: data?.ticketStatus,
        response: data?.details,
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
          onClick={() => navigate(-1)}
        >
          <IoIosArrowRoundBack size={26} className="mr-4" />
          Back
        </Button>
      </div>

      <div className="pl-[20px] p-[28px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between">
            <div className="flex items-center gap-[11px]">
              <Avatar className="w-[32px] h-[32px]">
                {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                <AvatarImage src="" />
                <AvatarFallback>
                  {data?.data?.data?.openBy?.name?.charAt(0) || data?.data?.data?.openBy?.email?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-[16px]">
                  {data?.data?.data?.openBy?.name ||
                    data?.data?.data?.email?.split("@")[0]}
                </h3>
                <p className="text-[#A3A3A3] text-[12px]">
                  Provider Type: {""}
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
                </p>
              </div>
            </div>

            <div className="flex gap-[28px]">
              <div className="flex items-center gap-[9px]">
                <span>Status: </span>
                <Button
                  type="button"
                  className={`rounded-[15px] bg-transparent p-0 h-auto ${
                    data?.data?.data?.status === "Open"
                      ? "text-[#FFA25E]"
                      : data?.data?.data?.status === "Answered"
                      ? "text-[#58BA66]"
                      : "text-[#0E9CFF]"
                  }`}
                >
                  {data?.data?.data?.status}
                </Button>
              </div>
              <div className="flex items-center gap-[9px]">
                <span>Priority: </span>
                <Button
                  type="button"
                  className={`rounded-[15px] px-[10px] py-[2px] h-auto ${
                    data?.data?.data?.priority === "Medium"
                      ? "bg-[#58BA66]"
                      : data?.data?.data?.priority === "High"
                      ? "bg-[#FF5252]"
                      : "bg-[#FFD56A]"
                  }`}
                >
                  {data?.data?.data?.priority}
                </Button>
              </div>
            </div>
          </div>

          <div className="max-w-full border solid 1px gray rounded-[10px] mt-[34px] p-[17px]">
            {data?.data.data?.subject && (
              <>
                <p className="text-[#A3A3A3] text-[16px] ">Ticket Subject</p>
                <h3 className="text-[16px] mt-[2px]">
                  {data?.data.data?.subject}
                </h3>
              </>
            )}
            <p className="text-[#A3A3A3] text-[16px] mt-[18px]">
              Ticket Details
            </p>
            <h3 className="text-[16px] mt-[2px]">
              {data?.data.data?.description}
            </h3>

            {(data?.data.data?.documentUrl || data?.data.data?.videoUrl) && (
              <>
                <div className="flex items-center mt-[32px]">
                  <img src={DocImage} alt="DocImage" />
                  <h3 className="text-[16px] ml-2">
                    {data?.data.data?.documentUrl.split("/").pop()}
                  </h3>
                  <Button onClick={handleDownload} className="ml-[22px]">
                    DOWNLOAD
                  </Button>
                </div>
                {data?.data.data.videoUrl && (
                  <div
                    className="w-[100px] h-[100px]"
                    onClick={() => setPlayVideo(true)}
                  >
                    <video
                      src={data?.data.data.videoUrl}
                      className="w-full h-[100px] rounded-sm object-cover"
                    ></video>
                  </div>
                )}
              </>
            )}
          </div>

          {data?.data?.data?.response?.length > 0 &&
            data?.data?.data?.response?.map((itm: any) => {
              return (
                <div className="max-w-full border solid 1px gray rounded-[10px] mt-[34px] p-[17px]">
                  <div className="flex items-center gap-[11px]">
                    <Avatar className="w-[32px] h-[32px]">
                      <AvatarImage src={itm?.createdBy?.profileImage} />
                      <AvatarFallback>
                        {userName(itm?.createdBy?.name)
                          .charAt(0)
                          .toUpperCase() ||
                          itm?.createdBy?.fname?.charAt(0).toUpperCase() ||
                          itm?.createdBy?.email
                            ?.split("@")[0]
                            ?.charAt(0)
                            .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-[16px]">
                        {itm?.createdBy?.name ||
                          itm?.createdBy?.fname ||
                          itm?.createdBy?.email?.split("@")[0]}
                      </h3>
                      <p className="text-[#A3A3A3] text-[12px]">
                        Reply By: {itm?.status}
                      </p>
                    </div>
                  </div>
                  <p className="text-[#A3A3A3] text-[16px] mt-[18px]">
                    Ticket Details
                  </p>
                  <h3 className="text-[16px] mt-[2px]">{itm?.response}</h3>

                  {(itm?.documentUrl || itm?.videoUrl) && (
                    <>
                      <div className="flex items-center mt-[32px]">
                        <img src={DocImage} alt="DocImage" />
                        <h3 className="text-[16px] ml-2">
                          {itm?.documentUrl.split("/").pop()}
                        </h3>
                        <Button onClick={handleDownload} className="ml-[22px]">
                          DOWNLOAD
                        </Button>
                      </div>
                      {itm.videoUrl && (
                        <div
                          className="w-[100px] h-[100px]"
                          onClick={() => setPlayVideo(true)}
                        >
                          <video
                            src={itm.videoUrl}
                            className="w-full h-[100px] rounded-sm object-cover"
                          ></video>
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}

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
              isLoading={updatePanding}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
      <Modal
        open={playVideo}
        onClose={() => setPlayVideo(false)}
        className="max-w-[1000px]"
      >
        <video
          src={data?.data.data.videoUrl}
          controls
          className="w-full h-full rounded-sm object-cover"
        ></video>
      </Modal>
      <Loading isLoading={isPending} />
    </div>
  );
};

export default TicketsDetailsReply;
