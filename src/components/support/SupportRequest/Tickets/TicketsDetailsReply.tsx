import DocImage from "@/assets/images/pdf.png";
import ErrorMessage from "@/components/comman/Error/ErrorMessage";
import Loading from "@/components/comman/Error/Loading";
import Loader from "@/components/comman/Loader";
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
import { useAppDispatch } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { setPath } from "@/redux/reducer/PathReducer";
import {
  fetchAssigToUser,
  getSingleSupportTicket,
  updateSupportTicket,
} from "@/services/apiServices/supportRequestServices";
import { UserRole } from "@/types/UserRole";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useParams } from "react-router-dom";
import { z } from "zod";

const TicketsDetailsReply = () => {
  const { id } = useParams();
  const Role = location.pathname.split("/")[1];
  const [playVideo, setPlayVideo] = useState(false);
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const userID = userData?.query?.id;
  const { data, isPending } = useQuery({
    queryKey: [QUERY_KEYS.courseTopFive, id],
    queryFn: () => getSingleSupportTicket(id as string),
  });
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectAssingValue, setSelectAssingValue] = useState("");
  const [selectTicketStatus, setSelectTicketStatus] = useState("");

  const { data: fetchAssigToUserList, isPending: assigToUserListPending } =
    useQuery({
      queryKey: [QUERY_KEYS.fetchAssigToUserList],
      queryFn: () => fetchAssigToUser(userID),
      enabled: !!userID,
    });

  const assigToUserList = fetchAssigToUserList?.data?.filter(
    (item) => item !== null
  );
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
    if (data?.data?.data) {
      console.log("selectTicketStatus", data?.data?.data?.openBy?.id);

      setValue(
        "assignTo",
        data?.data?.data?.openBy.id === userID
          ? String(data?.data?.data?.assignTo.id)
          : String(data?.data?.data?.openBy.id)
      );
      setValue(
        "ticketStatus",
        data?.data.data?.status === "Open"
          ? "Answered"
          : String(data?.data.data?.status)
      );
      setSelectAssingValue(
        data?.data?.data?.openBy.id === userID
          ? String(data?.data?.data?.assignTo.id)
          : String(data?.data?.data?.openBy.id)
      );
      setSelectTicketStatus(
        data?.data.data?.status === "Open"
          ? "Answered"
          : String(data?.data.data?.status)
      );
    }
  }, [data, setValue]);

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
      dispatch(
        setPath([
          { label: "Support ", link: null },
          { label: "Support Request", link: `/${Role}/support-request` },
        ])
      );
      reset();
    },
  });

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

  console.log("datav", data);

  return (
    <div className="h-[auto] bg-[white] rounded-[10px] mb-[21px] font-nunitoSans ">
      <div className="h-[70px] border-b-2 border-solid gray flex justify-between items-center pl-[20px] pr-[28px] ">
        <h2 className="font-[700] text-[16px]">Ticket Details</h2>
        <Button
          className="bg-transparent hover:bg-transparent text-black font-semibold text-[16px]"
          onClick={() =>
            dispatch(
              setPath([
                { label: "Support ", link: null },
                { label: "Support Request", link: `/${Role}/support-request` },
              ])
            )
          }
        >
          <IoIosArrowRoundBack size={26} className="mr-4" />
          Back
        </Button>
      </div>

      <div className="sm:pl-[20px] sm:p-[28px] p-[15px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="md:flex block justify-between">
            <div className="flex items-center gap-[11px] md:pb-0 pb-3">
              <Avatar className="w-[32px] h-[32px]">
                {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                <AvatarImage src="" />
                <AvatarFallback>
                  {data?.data?.data?.openBy?.name?.charAt(0) ||
                    data?.data?.data?.openBy?.email?.charAt(0)}
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

          <div className="max-w-full border solid 1px gray rounded-[10px] sm:mt-[34px] mt-[25px] p-[17px]">
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
              <div className="flex items-start gap-4">
                <div className="sm:flex block items-center mt-[32px]">
                  <div className="flex">
                    <img src={DocImage} alt="DocImage" />
                    <h3 className="text-[16px] ml-2">
                      {data?.data.data?.documentUrl.split("/").pop()}
                    </h3>
                  </div>
                  <Button
                    onClick={handleDownload}
                    className="sm:ml-[22px] mt-5"
                  >
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
              </div>
            )}
          </div>

          {data?.data?.data?.response?.length > 0 &&
            data?.data?.data?.response?.map((itm: any) => {
              return (
                <div className="max-w-full border solid 1px gray rounded-[10px] sm:mt-[34px] mt-[20px] p-[17px]">
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
                        Reply By:{" "}
                        {itm?.status === "InProcess"
                          ? itm?.status?.split("P").join(" P")
                          : itm?.status}
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

          <div className="grid grid-cols-2 gap-[36px] sm:mt-[29px] mt-0">
            {/* <InputWithLable label="Assign To" /> */}
            <div>
              <Select
                onValueChange={(e) => setValue("assignTo", e)}
                value={String(selectAssingValue)}
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
                  {assigToUserListPending ? (
                    <Loader className="w-5 h-5 animate-spin" />
                  ) : assigToUserList && assigToUserList?.length > 0 ? (
                    assigToUserList.map((item: any) => {
                      return (
                        <SelectItem
                          key={item.id}
                          value={String(item?.userDetails?.id)}
                        >
                          <span className="w-[150px] text-neutral-400 inline-block text-left">
                            {item?.userDetails?.role === UserRole?.Employee
                              ? "Employee"
                              : item?.userDetails?.role === UserRole?.Company
                              ? "SME Company"
                              : item?.userDetails?.role === UserRole?.Trainer
                              ? "Trainer Provider"
                              : item?.userDetails?.role === UserRole?.Trainee
                              ? "Trainer"
                              : "Client Admin"}
                          </span>{" "}
                          <span className="mr-10 text-neutral-400">--</span>{" "}
                          {item?.userDetails?.name ||
                            item?.userDetails?.email?.split("@")?.[0]}
                        </SelectItem>
                      );
                    })
                  ) : (
                    <span>No data found</span>
                  )}
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
                  <SelectItem value="InProcess">In Process</SelectItem>
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
            className="w-full h-[200px] border solid 1px gray rounded-[10px] sm:mt-[34px] mt-5 p-[17px]"
          />
          {errors?.details && (
            <ErrorMessage message={errors?.details?.message as string} />
          )}

          <div className="w-full flex justify-end sm:mt-[50px] mt-[30px]">
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
