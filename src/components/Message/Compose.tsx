import ErrorMessage from "@/components/comman/Error/ErrorMessage";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { QUERY_KEYS } from "@/lib/constants";
import { sendMessage } from "@/services/apiServices/chatServices";
import { fetchClient } from "@/services/apiServices/clientServices";
import {
  fetchCompanyOrTrainerCompany,
  fetchEmails,
} from "@/services/apiServices/emailTemplate";
import { fetchTargetAudienceList } from "@/services/apiServices/targetAudience";
import { uploadFile } from "@/services/apiServices/upload";
import { ErrorType } from "@/types/Errors";
import { UserRole } from "@/types/UserRole";
import { Client } from "@/types/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FaImage } from "react-icons/fa6";
import { IoIosArrowRoundBack, IoIosDocument } from "react-icons/io";
import { MdClose, MdOutlineAttachFile } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { z } from "zod";
import Loading from "../comman/Error/Loading";

interface SendMessagePayload {
  senderId: string;
  receiverId: string;
  message?: string;
  images?: string[];
}

const Compose = () => {
  const navigate = useNavigate();

  const { id, targetAudienceId, clientId } = useSelector(
    (state: any) => state.user
  );

  const { role } = useSelector((state: any) => state.user);
  const asdas = useSelector((state: any) => state);
  console.log("asdas", asdas.user);
  
  const { toast } = useToast();
  const [client, setClient] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [isActive, setIsActive] = useState("client");
  const [images, setImages] = useState<string[]>([]);
  const [emailTemplateMessage, setEmailTemplateMessage] = useState("");
  const pathName = window.location.pathname;
  const currentUser = pathName.split("/")[1];
  const userRole =
    isActive === "admin"
      ? UserRole.SuperAdmin
      : isActive === "company"
      ? UserRole.Company
      : UserRole.Trainer;

  useEffect(() => {
    if (role === UserRole.Client || role === UserRole.Trainer) {
      setIsActive("admin");
    }
  }, [role]);

  const { data: client_list } = useQuery({
    queryKey: [QUERY_KEYS.clientList],
    queryFn: () => fetchClient("1", "100"),
    enabled: !!isActive,
  });

  const { data: targetaudience } = useQuery({
    queryKey: [QUERY_KEYS.emailTemplate, targetAudienceId],
    queryFn: () => fetchTargetAudienceList("2" as string),
    enabled: true,
  });

  
  
  const { data: emailtemplateList, isPending } = useQuery({
    queryKey: [QUERY_KEYS.emailTemplate],
    queryFn: () => fetchEmails(),
  });
  
  console.log("targetaudience", targetaudience, emailtemplateList?.data?.data);
  const {
    data: getCompanyOrTrainerCompany,
    refetch: refetchCompanyOrTrainerCompany,
  } = useQuery({
    queryKey: [QUERY_KEYS.companyOrTrainerCompany],
    queryFn: () => fetchCompanyOrTrainerCompany(clientId, String(userRole)),
  });

  useEffect(() => {
    refetchCompanyOrTrainerCompany();
  }, [isActive]);
  console.log("getCompanyOrTrainerCompany?.data?.data", targetaudience);

  const companyOrTrainerCompanyList =
    getCompanyOrTrainerCompany?.data?.data &&
    Object.keys(getCompanyOrTrainerCompany?.data?.data).length
      ? getCompanyOrTrainerCompany?.data?.data?.filter(
          (item: any) => +item.role === +userRole
        )
      : [];

  const schema = z.object({
    to: z.string({ required_error: "To is required" }),
    emailTemplate: z.string().optional(),
    message: z.string().min(1, "Message is required"),
  });
  type ValidationSchema = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(schema),
    mode: "all",
  });

  useEffect(() => {
    setValue("message", chatMessage);
    setEmailTemplateMessage(
      emailtemplateList?.data?.data?.find(
        (item: any) => +item?.id === +chatMessage
      )?.message || ""
    );
  }, [chatMessage]);

  useEffect(() => {
    setValue("to", "");
    setClient("");
  }, [isActive]);

  const { mutate: handleSend, isPending: sendPending } = useMutation({
    mutationFn: (payload: SendMessagePayload) => {
      return sendMessage(payload);
    },
    onSuccess: ({ data }) => {
      const socket = io(import.meta.env.VITE_SOCKET_URL);
      socket.emit("new message", data?.data);
      setChatMessage("");
      navigate("/message");
      toast({
        variant: "default",
        title: "Message sent successfully",
      });
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      Array.from(fileList).map((file) => {
        upload_file(file);
      });
    }

    event.target.value = "";
  };

  const removeImage = (index: number) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  const { mutate: upload_file, isPending: FileUploadPending } = useMutation({
    mutationFn: (file: any) => uploadFile(file),
    onSuccess: (data) => {
      setImages((prevImages) => [...prevImages, data?.data?.data?.image]);
    },
    onError: (error: ErrorType) => {
      toast({
        variant: "destructive",
        title: error.data.message,
      });
    },
  });

  const handleSendMessage: SubmitHandler<ValidationSchema> = async (
    data: FieldValues
  ) => {
    if (id && client && (chatMessage || images?.length > 0)) {
      handleSend({
        senderId: data.to,
        receiverId: data.emailTemplate,
        message: emailTemplateMessage,
      });
    }
  };

  return (
    <>
      <Card className="border-0 shadow-none rounded-lg bg-white">
        <CardHeader className="px-[20px] py-3 border-b-[#d9d9d9] border-b border-solid">
          <div className="flex items-center justify-between">
            <div>
              {role === "5" && (
                <div
                  className={`inline-flex px-[15px] py-2 border border-solid rounded-md mr-6 cursor-pointer ${
                    isActive === "client" ? "border-[#00778B]" : ""
                  }`}
                  onClick={() => setIsActive("client")}
                >
                  <Avatar className="w-[42px] h-[42px]">
                    <AvatarFallback className="text-white text-xl bg-[#0077A2]">
                      C
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <div className="leading-[19.53px] mb-px text-[black]">
                      Client
                    </div>
                    <div className="text-neutral-400 leading-[15.6px] text-xs">
                      Client Name
                    </div>
                  </div>
                </div>
              )}
              {role !== "6" && (
                <div>
                  <div
                    className={`inline-flex px-[15px] py-2 border border-solid rounded-md mr-6 cursor-pointer ${
                      isActive === "admin" ? "border-[#00778B]" : ""
                    }`}
                    onClick={() => setIsActive("admin")}
                  >
                    <Avatar className="w-[42px] h-[42px]">
                      <AvatarFallback className="text-white text-xl bg-[#0077A2]">
                        A
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-3">
                      <div className="leading-[19.53px] mb-px text-[black]">
                        Admin
                      </div>
                      <div className="text-neutral-400 leading-[15.6px] text-xs">
                        Admin Name
                      </div>
                    </div>
                  </div>
                  <div
                    className={`inline-flex px-[15px] py-2 border border-solid rounded-md mr-6 cursor-pointer ${
                      isActive === "company" ? "border-[#00778B]" : ""
                    }`}
                    onClick={() => setIsActive("company")}
                  >
                    <Avatar className="w-[42px] h-[42px]">
                      <AvatarFallback className="text-white text-xl bg-[#0077A2]">
                        C
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-3">
                      <div className="leading-[19.53px] mb-px text-[black]">
                        Company
                      </div>
                      <div className="text-neutral-400 leading-[15.6px] text-xs">
                        Company Name
                      </div>
                    </div>
                  </div>
                  <div
                    className={`inline-flex px-[15px] py-2 border border-solid rounded-md mr-6 cursor-pointer ${
                      isActive === "trainer" ? "border-[#00778B]" : ""
                    }`}
                    onClick={() => setIsActive("trainer")}
                  >
                    <Avatar className="w-[42px] h-[42px]">
                      <AvatarFallback className="text-white text-xl bg-[#0077A2]">
                        TC
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-3">
                      <div className="leading-[19.53px] mb-px text-[black]">
                        Trainer company
                      </div>
                      <div className="text-neutral-400 leading-[15.6px] text-xs">
                        Trainer company Name
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <Button
              variant={"ghost"}
              className="text-black font-semibold gap-2 text-[16px] m-0"
              onClick={() => navigate(`/${currentUser}/message`)}
            >
              <IoIosArrowRoundBack size={26} />
              Back
            </Button>
          </div>
        </CardHeader>
        <form onSubmit={handleSubmit(handleSendMessage)}>
          <CardContent className="pt-6 pb-4 px-5">
            <div className="mb-[29px]">
              <Select
                onValueChange={(e) => {
                  setValue("to", e);
                  setClient(e);
                }}
                {...register("to")}
                value={client}
              >
                <SelectGroup>
                  <SelectLabel className="mb-[11px] p-0 text-base font-calibri font-normal">
                    To <span className="text-red-400">*</span>
                  </SelectLabel>
                  <SelectTrigger
                    className={`w-full px-[15px] py-4 h-[52px] text-base text-[#A3A3A3] font-calibri${
                      !client ? "text-neutral-400 " : ""
                    } `}
                  >
                    <SelectValue placeholder={`Select ${isActive}`} />
                  </SelectTrigger>
                </SelectGroup>
                <SelectContent>
                  {isActive === "client" &&
                    client_list?.data?.data?.map((item: Client) => {
                      return (
                        <SelectItem value={String(item?.id)}>
                          {item?.name}
                        </SelectItem>
                      );
                    })}
                  {isActive === "admin" && (
                    <SelectItem value={"1"}>Admin</SelectItem>
                  )}
                  {isActive === "trainer" ||
                    ("company" &&
                      companyOrTrainerCompanyList.map((item: any) => {
                        return (
                          <SelectItem value={String(item?.id)}>
                            {item?.companyDetails?.name}
                          </SelectItem>
                        );
                      }))}
                </SelectContent>
              </Select>
              {!errors?.to?.ref?.value && (
                <ErrorMessage message={errors.to?.message as string} />
              )}
            </div>

            <div className="mb-[29px]">
              <Select
                onValueChange={(e) => {
                  setValue("emailTemplate", e);
                  setChatMessage(e);
                }}
                {...register("emailTemplate")}
                value={String(chatMessage)}
              >
                <SelectGroup>
                  <SelectLabel className="mb-[11px] p-0 text-base font-calibri font-normal">
                    Email Templates
                  </SelectLabel>
                  <SelectTrigger
                    className={`w-full px-[15px] py-4 h-[52px] placeholder:text-[#A3A3A3] text-base text-[#A3A3A3] font-calibri`}
                  >
                    <SelectValue placeholder="Select Templates" />
                  </SelectTrigger>
                </SelectGroup>
                <SelectContent>
                  {isActive === "admin" ||
                    isActive === "company" ||
                    isActive === "trainer" &&
                      targetaudience?.data?.data?.map((item: any) => {
                        console.log("itemitem+++", item);
                        
                        return (
                          <SelectItem value={String(item?.id)}>
                            {item?.name}
                          </SelectItem>
                        );
                      })}

                  {isActive === "client" &&
                    role == UserRole.SuperAdmin &&
                    emailtemplateList?.data.data.map((item: any) => {
                      console.log("itemitem+++", item);
                      return (
                        <SelectItem value={String(item?.id)}>
                          {item?.name}
                        </SelectItem>
                      );
                    })}
                </SelectContent>
              </Select>
              {!errors?.emailTemplate?.ref?.value && (
                <ErrorMessage
                  message={errors.emailTemplate?.message as string}
                />
              )}
            </div>
            <div>
              <Label className="mb-[11px] inline-block text-base font-calibri font-normal">
                Message <span className="text-red-400">*</span>
              </Label>
              <div>
                <Textarea
                  className="h-[250px] px-[15px] py-[20px] resize-none bg-white border border-[#d9d9d9] placeholder:text-[#A3A3A3] text-base text-[#A3A3A3] font-calibri"
                  placeholder="Enter message"
                  {...register("message")}
                  // onChange={(e) => setChatMessage(e.target.value)}
                  value={emailTemplateMessage}
                />
                {!errors?.message?.ref?.value && (
                  <ErrorMessage message={errors.message?.message as string} />
                )}
                {images?.length > 0 && (
                  <div className="p-2 flex overflow-x-auto bg-[#F5F5F5] mt-2">
                    {images.map((image, index: number) => (
                      <div key={index} className="mr-5 mb-2 relative">
                        <Button
                          variant="outline"
                          size="icon"
                          className="absolute -right-2 -top-2 h-4 w-4"
                          onClick={() => removeImage(index)}
                        >
                          <MdClose className="h-4 w-4" />
                        </Button>
                        {image?.endsWith(".pdf") ? (
                          <div className="flex items-center">
                            <IoIosDocument />
                            <span className="mx-3 text-[12px] text-medium">
                              {image?.split("upload/")[1]}
                            </span>
                          </div>
                        ) : (
                          <img
                            src={image}
                            alt={`Preview-${index}`}
                            className="h-[50px]"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="px-[20px] block py-0 pb-4">
            <div className="flex justify-between items-center">
              <div className="flex">
                <label htmlFor="imageUpload" className="cursor-pointer">
                  <FaImage className="text-[26px]" />
                  <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                    multiple
                  />
                </label>
                <label htmlFor="pdfUpload" className="cursor-pointer">
                  <MdOutlineAttachFile className="text-[26px] ml-5" />
                  <input
                    id="pdfUpload"
                    type="file"
                    accept=".pdf"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                    multiple
                  />
                </label>
              </div>
              <Button
                type="submit"
                className="px-[30px] py-[15px] bg-[#58BA66] text-base"
                disabled={sendPending || FileUploadPending}
                // onClick={() => {
                // 	if (id && client && (chatMessage || images?.length > 0)) {
                // 		handleSend({
                // 			senderId: id,
                // 			receiverId: client,
                // 			message: chatMessage,
                // 			images,
                // 		});
                // 	}
                // }}
              >
                {sendPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                SEND
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>

      <Loading isLoading={isPending} />
    </>
  );
};

export default Compose;
