/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import useBreakpoints from "@/hooks/use-breakpoints";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import {
  TimeFormatter,
  chatDPColor,
  convertUTCToGMT,
  handleScrollToBottom,
} from "@/lib/utils";
import { setPath } from "@/redux/reducer/PathReducer";
import {
  fetchChat,
  fetchChatUserList,
  fetchGroupChat,
  sendGroupMessage,
  sendMessage,
  updateMessage,
} from "@/services/apiServices/chatServices";
import { uploadFile } from "@/services/apiServices/upload";
import { GetChat, GetChatUserList } from "@/types/Chat";
import { ErrorType } from "@/types/Errors";
import { UserRole } from "@/types/UserRole";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChevronDown, ChevronLeft, FilePenLine, Loader2 } from "lucide-react";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { FaImage } from "react-icons/fa6";
import { IoIosDocument } from "react-icons/io";
import { MdClose, MdOutlineAttachFile } from "react-icons/md";
import { useSearchParams } from "react-router-dom";
import Drawer from "../comman/Drawer";
import Loader from "../comman/Loader";
import eye from "/assets/icons/eye.svg";
import search from "/assets/icons/search.svg";

let socket: any;

const Message = () => {
  const chatContainerRef = useRef<any>(null);

  const { UserId } = useAppSelector((state) => state.user);
  const queryClient = useQueryClient();
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const userID = UserId ? UserId : userData?.query?.id;

  const [searchChat, setSearchChat] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const [showScrollButton, setShowScrollButton] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatId, setChatId] = useState<number | string>("");
  const [chatType, setChatType] = useState<boolean>(false);
  const [allMsg, setAllMsg] = useState<any[]>([]);

  const [openDrawer, setOpenDrawer] = useState(false);
  const { viewType } = useBreakpoints();

  const pathName = window.location.pathname;
  const currentUser = pathName.split("/")[1];
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const messageType = searchParams.get("messageType");

  const { data: chatUserList } = useQuery({
    queryKey: [QUERY_KEYS.chatUserList],
    queryFn: () => fetchChatUserList(userID as string),
  });

  const currentChat = useMemo(() => {
    return chatUserList?.data?.data?.find(
      (item) => item?.id === +chatId && item.group === chatType
    );
  }, [chatUserList, chatId, chatType]);
  const updatemessageData = (chatId: string) => {
    updatemessage({
      userId1: userID,
      userId2: chatId,
      isRead: true,
    });
  };

  useEffect(() => {
    const chatId = searchParams.get("chatId");
    if (chatId) {
      setChatId(chatId);
      setChatType(searchParams.get("messageType") === "group");
      updatemessageData(chatId);
    }
  }, [searchParams]);

  const { data: chatList, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.chatList, { userID, chatId }],
    queryFn: () => fetchChat(userID, chatId),
    enabled: !!userID && !!chatId && !messageType,
  });

  const { data: groupChat, isLoading: groupChatLoading } = useQuery({
    queryKey: [
      QUERY_KEYS.fetchGroupChat,
      { chatId, messageType, group: !!currentChat?.group },
    ],
    queryFn: () => fetchGroupChat(chatId),
    enabled: !!chatId && (!!messageType || currentChat?.group),
  });
  const { mutate: sendMessageMutation } = useMutation({
    mutationFn: sendGroupMessage,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.fetchGroupChat] });

      setChatMessage("");
      setImages([]);
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.chatList],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.chatUserList],
      });

      socket.emit("new message", data?.data);
    },
    onError: (error: ErrorType) => {
      toast({
        variant: "destructive",
        title: error.data.message,
      });
    },
  });

  useEffect(() => {
    if (messageType === "group" || currentChat?.group) {
      // @ts-ignore
      setAllMsg(groupChat?.data?.groupMessages || []);
    } else {
      setAllMsg(chatList?.data?.data || []);
    }
  }, [chatList?.data?.data, groupChat?.data, messageType, currentChat]);

  const filterByName = (item: { name: string }) => {
    return (item?.name || "")
      ?.toLowerCase()
      ?.includes(searchChat?.toLowerCase());
  };

  const { mutate: upload_file, isPending: FileUploadPending } = useMutation({
    mutationFn: (file: any) => uploadFile(file),
    onSuccess: (data) => {
      setImages((prevImages) => [...prevImages, data?.data?.data?.file]);
    },
    onError: (error: ErrorType) => {
      toast({
        variant: "destructive",
        title: error.data.message,
      });
    },
  });

  useEffect(() => {
    const handleScroll = () => {
      if (chatContainerRef?.current) {
        const scrollTop = chatContainerRef?.current?.scrollTop;

        setShowScrollButton(
          chatContainerRef.current.scrollHeight - scrollTop > 1000
        );
      }
    };

    chatContainerRef?.current?.addEventListener("scroll", handleScroll);

    return () => {
      if (chatContainerRef?.current) {
        chatContainerRef?.current?.removeEventListener("scroll", handleScroll);
      }
    };
  }, [chatList]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    const validFileTypes = [
      "video/mp4",
      "application/msword", // .doc
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
      "application/vnd.ms-excel", // .xls
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
      "image/png",
      "image/jpeg",
      "application/pdf",
    ];
    const maxFileSize = 10 * 1024 * 1024;
    if (fileList) {
      Array.from(fileList).map((file) => {
        const filename = file.name;
        if (!filename.match(/^[a-zA-Z0-9_-]+(\.[a-zA-Z0-9]+)?$/)) {
          toast({
            variant: "destructive",
            title:
              "Invalid file name. please use only letters, digits, underscores, hyphens, and a single period.",
          });
          return;
        } else {
          const isValid = validFileTypes.includes(file.type);
          const isValidSize = file.size <= maxFileSize;

          if (isValid && isValidSize) {
            upload_file(file);
          } else if (!isValid) {
            toast({
              variant: "destructive",
              title:
                "Invalid file type. please select a video, word, or excel file.",
            });
          } else {
            toast({
              variant: "destructive",
              title: "File size exceeds the maximum limit of 10 KB.",
            });
          }
        }
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

  const { mutate: handleSend, isPending: sendPending } = useMutation({
    mutationFn: sendMessage,
    onSuccess: ({ data }) => {
      setChatMessage("");
      setImages([]);
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.chatList],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.chatUserList],
      });

      socket.emit("new message", data?.data);
    },
  });

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [allMsg]);

  const { mutate: updatemessage } = useMutation({
    mutationFn: (data: {
      userId1: number | string;
      userId2: number | string;
      isRead: boolean;
    }) => updateMessage(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.chatUserList] });
    },
  });

  const handleSendMessage = () => {
    if (chatId && (chatMessage || images.length > 0)) {
      if (messageType === "group" || !!currentChat?.group) {
        const payload = {
          groupId: chatId,
          senderId: userID,
          message: chatMessage,
          images,
        };
        sendMessageMutation(payload);
      }
      handleSend({
        senderId: userID,
        receiverId: chatId,
        message: chatMessage,
        images,
      });
    }
  };

  useEffect(() => {
    setChatMessage("");
    setImages([]);
  }, [chatId]);

  useEffect(() => {
    if (["mobile", "sm"].includes(viewType)) {
      setOpenDrawer(false);
    }
  }, [viewType]);

  return (
    <Fragment>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        className="sm:max-w-full w-full p-0"
        hideClose={true}
      >
        <Card className="xl:col-span-9 md:col-span-7 col-span-12 border-0 rounded-lg shadow-none relative flex flex-col h-full justify-between">
          <CardHeader className="flex-row gap-5 items-center border-b-[#D9D9D9] border-b border-solid p-4">
            <div
              className=""
              onClick={() => {
                setOpenDrawer(false);
              }}
            >
              <ChevronLeft />
            </div>
            {chatId && UserId ? (
              <div className="flex items-center">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={currentChat?.image || ""} />
                  <AvatarFallback
                    className="text-white text-xl"
                    style={{ background: chatDPColor(+chatId) }}
                  >
                    {chatUserList?.data?.data
                      ?.find((item) => item?.id === chatId)
                      ?.name?.[0]?.toUpperCase() ||
                      chatUserList?.data?.data
                        ?.find((item) => item?.id === chatId)
                        ?.email?.[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <div className="leading-[19.53px] mb-px text-[black]">
                    {currentChat?.name || currentChat?.email?.split("@")[0]}
                  </div>
                  <div className="text-neutral-400 leading-[15.6px] text-xs">
                    {currentChat?.role === UserRole.Company
                      ? "Company"
                      : currentChat?.role === UserRole.Trainer
                      ? "Trainer Company"
                      : currentChat?.role === UserRole.Trainee
                      ? "Trainer"
                      : currentChat?.role === UserRole.Employee
                      ? "Company Employee"
                      : currentChat?.role === UserRole.SuperAdmin
                      ? "Super Admin"
                      : currentChat?.group
                      ? "Group"
                      : "Client"}
                  </div>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </CardHeader>
          {UserId && chatId && (
            <>
              <CardContent
                className={`chatcontent h-full overflow-auto p-4`}
                ref={chatContainerRef}
              >
                <div className="mb-[30px]">
                  {allMsg?.map((item: GetChat, index: number) => {
                    const createdAtDate = new Date(item.createdAt);
                    const day = createdAtDate.getDate();
                    const month = createdAtDate.toLocaleString("default", {
                      month: "short",
                    });
                    const year = createdAtDate.getFullYear();

                    const showDate =
                      index === 0 ||
                      new Date(allMsg[index - 1]?.createdAt).toDateString() !==
                        createdAtDate.toDateString();

                    return (
                      <div key={item.id}>
                        {showDate && (
                          <div className="flex justify-between items-center mb-[30px]">
                            <div className="basis-[calc(50%_-_60px)] h-px bg-[#d9d9d9]"></div>
                            <div className="basis-[92px] text-center text-neutral-400 text-xs">
                              {`${day} ${month} ${year}`}
                            </div>
                            <div className="basis-[calc(50%_-_60px)] h-px bg-[#d9d9d9]"></div>
                          </div>
                        )}
                        <div className="flex mb-[30px] gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback
                              className="text-white"
                              style={{
                                backgroundColor: chatDPColor(
                                  +item?.senderId?.id
                                ),
                              }}
                            >
                              {/* {item?.senderId?.name?.[0].toUpperCase() ||
                                item?.senderId?.email?.[0].toUpperCase()} */}
                              {chatUserList?.data?.data
                                ?.find((item) => item?.id === chatId)
                                ?.name?.[0]?.toUpperCase() ||
                                chatUserList?.data?.data
                                  ?.find((item) => item?.id === chatId)
                                  ?.email?.[0]?.toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="leading-[19.53px] text-[black] font-medium">
                              {item?.senderId?.name ||
                                item?.senderId?.email?.split("@")?.[0]}
                            </div>
                            <div className="text-[#606060] leading-[14.65px] text-xs mb-1">
                              {convertUTCToGMT(item?.createdAt).format("h:mmA")}
                            </div>
                            <p className="text-black leading-[19.53px] break-all whitespace-pre-wrap">
                              {item?.message}
                            </p>
                            {Array.isArray(item?.images) &&
                              item?.images?.length > 0 &&
                              item?.images?.map((i: string, index) => (
                                <div
                                  key={index}
                                  className={`max-w-full w-[300px] mb-5 ${
                                    index === 0 ? "mt-5" : ""
                                  }`}
                                >
                                  {i?.endsWith(".pdf") ? (
                                    <div className="w-[300px] bg-[#EDEFF9] p-5 flex rounded">
                                      <IoIosDocument className="h-5 w-5 me-3" />
                                      <span className="w-[80%] overflow-hidden whitespace-nowrap text-ellipsis text-[14px]">
                                        {i?.split(".com/")?.[1]}
                                      </span>
                                      <Button
                                        variant={"ghost"}
                                        className="p-0 h-auto"
                                        onClick={() => window.open(i, "_blank")}
                                      >
                                        <img
                                          src={eye}
                                          alt="view"
                                          width={18}
                                          height={12.38}
                                        />
                                      </Button>
                                    </div>
                                  ) : (
                                    <img
                                      src={i}
                                      alt="image"
                                      onClick={() => window.open(i, "_blank")}
                                      className="cursor-pointer"
                                    />
                                  )}
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
              <CardFooter className="p-5 block bg-white">
                <div className="">
                  {images?.length > 0 && (
                    <div className="p-2 flex overflow-x-auto bg-[#F5F5F5]">
                      {images?.map((image, index: number) => (
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
                                {image?.split(".com/")?.[1]}
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
                  <Textarea
                    className="mb-4 px-[13px] py-[11px] resize-none bg-white border border-solid border-[#D9D9D9]"
                    placeholder="Enter message"
                    onChange={(e) => setChatMessage(e.target.value)}
                    value={chatMessage}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                </div>
                <div className="flex justify-between">
                  <div className="flex">
                    <label htmlFor="imageUpload">
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
                    <label htmlFor="pdfUpload">
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
                    className="px-[30px] py-[15px] bg-[#58BA66]"
                    disabled={sendPending || FileUploadPending}
                    onClick={() => handleSendMessage()}
                  >
                    {sendPending && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    SEND
                  </Button>
                </div>
              </CardFooter>
              {showScrollButton && (
                <Button
                  onClick={() => handleScrollToBottom(chatContainerRef)}
                  variant="outline"
                  size="icon"
                  className="fixed bottom-[200px] right-10 px-4 py-2 rounded-full p-0"
                >
                  <ChevronDown className="h-4 w-4 " />
                </Button>
              )}
            </>
          )}
        </Card>
      </Drawer>
      <div className="grid grid-cols-12 h-full gap-3">
        <Card className="xl:col-span-3 md:col-span-5 col-span-12 shadow-none rounded-lg border-0 h-[calc(100vh-160px)] overflow-y-auto">
          <CardHeader className="px-[11px] py-2.5 border-b-[#D9D9D9] border-b border-solid md:block flex justify-between flex-row items-center w-full sm:gap-0 gap-2">
            <div className="relative">
              <img
                src={search}
                alt=""
                className="absolute -translate-y-2/4 left-4 top-2/4"
              />
              <Input
                type="text"
                placeholder="Show Search by Name"
                className="h-[42px] md:w-full sm:w-[400px] w-full border text-[15px] leading-[19.5] bg-[white] pl-[39px] pr-4 py-[13px] border-solid border-[#D9D9D9] font-droid"
                value={searchChat}
                onChange={(e) => setSearchChat(e.target.value)}
              />
            </div>
            <Button
              className="p-2.5 bg-[#00778B] hover:bg-[#00778B] text-sm font-droid md:hidden flex !mt-0"
              onClick={() => {
                dispatch(
                  setPath([
                    { label: "Message", link: `/${currentUser}/message` },
                    {
                      label: "Compose",
                      link: `/${currentUser}/message/compose`,
                    },
                  ])
                );
              }}
            >
              <FilePenLine width={18} /> Compose
            </Button>
          </CardHeader>
          <CardContent className="h-[calc(100%-63px)] p-0 overflow-y-auto">
            {/* <ScrollArea className="h-full message-scroll" ref={chatContainerRef}> */}
            {chatUserList?.data?.data &&
            chatUserList?.data?.data?.length > 0 ? (
              chatUserList?.data?.data
                ?.filter(filterByName)
                ?.map((item: GetChatUserList | any) => {
                  return (
                    <div
                      key={item.id}
                      className="flex pl-5 pr-[17px] pt-[15px] pb-3 cursor-pointer hover:bg-[#EDEFF9]"
                      style={{
                        backgroundColor:
                          currentChat?.id === item?.id &&
                          currentChat?.group === item?.group
                            ? "#EDEFF9"
                            : "white",
                      }}
                      onClick={async () => {
                        if (["mobile", "sm"].includes(viewType)) {
                          setOpenDrawer(true);
                        }
                        setChatId(item?.id);
                        setChatType(item?.group);
                        await updatemessage({
                          userId1: userID,
                          userId2: item?.id,
                          isRead: true,
                        });
                        await queryClient.invalidateQueries({
                          queryKey: [QUERY_KEYS.chatList],
                        });
                        await queryClient.invalidateQueries({
                          queryKey: [QUERY_KEYS.notificationCount],
                        });
                      }}
                    >
                      <div className="relative h-[42px] w-[42px]">
                        <Avatar className="w-full h-full static">
                          <AvatarImage src={item?.image} />
                          <AvatarFallback
                            className="text-white text-xl"
                            style={{ backgroundColor: chatDPColor(item?.id) }}
                          >
                            {item?.name?.[0]?.toUpperCase() ||
                              item?.email?.[0]?.toUpperCase()}
                          </AvatarFallback>
                          <div
                            className={`w-3 h-3 bg-[${
                              item?.isOnline ? "#72CC79" : "#D9D9D9"
                            }] absolute z-[1] rounded-[50%] top-0 right-0 border border-solid border-white`}
                          ></div>
                        </Avatar>
                      </div>
                      <div className="ml-[15px] w-[calc(100%-57px)]">
                        <div className="flex justify-between mb-0.5">
                          <div className="leading-[19.53px] text-[black] text-base font-droid">
                            {item?.name || item?.email?.split("@")[0]}
                          </div>
                          <div className="text-xs font-droid leading-[15.6px] text-[black]">
                            {TimeFormatter(item?.last_msg_time)}
                          </div>
                        </div>
                        <div className="text-xs font-droid text-[#A3A3A3] mb-[5px] leading-[15.6px]">
                          {item?.role === UserRole.Company
                            ? "Company"
                            : item?.role === UserRole.Trainer
                            ? "Trainer Company"
                            : item?.role === UserRole.Trainee
                            ? "Trainee"
                            : item?.role === UserRole.Employee
                            ? "Company Employee"
                            : item?.role === UserRole.SuperAdmin
                            ? "Super Admin"
                            : item.group
                            ? "Group"
                            : "Client"}
                        </div>
                        <p className="text-[#606060] overflow-hidden flex justify-between items-center text-base font-droid">
                          <span className="w-[80%] text-sm overflow-hidden whitespace-nowrap text-ellipsis line-clamp-1">
                            {item?.last_msg}
                          </span>
                          {item.count > 0 && (
                            <Badge className="p-0 w-[21px] h-[21px] justify-center items-center rounded-[50%] font-medium text-[8px] bg-[#D9D9D9] text-[#000]">
                              {item.count}
                            </Badge>
                          )}
                        </p>
                      </div>
                    </div>
                  );
                })
            ) : (
              <span className="h-full flex justify-center items-center">
                No record found
              </span>
            )}
            {/* </ScrollArea> */}
          </CardContent>
        </Card>
        <Card className="xl:col-span-9 md:col-span-7 col-span-12 border-0 rounded-lg shadow-none relative hidden md:block h-[calc(100vh-160px)]">
          <CardHeader className="flex-row justify-between border-b-[#D9D9D9] border-b border-solid pl-[15px] pr-[9px] py-[9px]">
            {chatId && UserId ? (
              <div className="flex items-center">
                <Avatar className="w-[42px] h-[42px]">
                  <AvatarImage src={currentChat?.image || ""} />
                  <AvatarFallback
                    className="text-white text-xl"
                    style={{ background: chatDPColor(+chatId) }}
                  >
                    {chatUserList?.data?.data
                      ?.find((item) => item?.id === +chatId)
                      ?.name?.[0]?.toUpperCase() ||
                      chatUserList?.data?.data
                        ?.find((item) => item?.id === +chatId)
                        ?.email?.[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <div className="leading-[19.53px] mb-px text-[black]">
                    {currentChat?.name || currentChat?.email?.split("@")[0]}
                  </div>
                  <div className="text-neutral-400 leading-[15.6px] text-xs">
                    {currentChat?.role === UserRole.Company
                      ? "Company"
                      : currentChat?.role === UserRole.Trainer
                      ? "Trainer Company"
                      : currentChat?.role === UserRole.Trainee
                      ? "Trainer"
                      : currentChat?.role === UserRole.Employee
                      ? "Company Employee"
                      : currentChat?.role === UserRole.SuperAdmin
                      ? "Super Admin"
                      : currentChat?.group
                      ? "Group"
                      : "Client"}
                  </div>
                </div>
              </div>
            ) : (
              <div></div>
            )}
            <Button
              className="p-2.5 bg-[#00778B] hover:bg-[#00778B] text-sm font-droid"
              onClick={() => {
                dispatch(
                  setPath([
                    { label: "Message", link: `/${currentUser}/message` },
                    {
                      label: "Compose",
                      link: `/${currentUser}/message/compose`,
                    },
                  ])
                );
              }}
            >
              <FilePenLine width={18} /> Compose
            </Button>
          </CardHeader>
          {UserId && chatId ? (
            <>
              <CardContent
                className={`chatcontent pl-[15px] pr-[33px] pt-[30px] pb-3 overflow-y-auto ${
                  images?.length > 0
                    ? "h-[calc(100vh_-_436px)]"
                    : "h-[calc(100vh_-_382px)]"
                }`}
                ref={chatContainerRef}
              >
                <div className="mb-[30px]">
                  {isLoading || groupChatLoading ? (
                    <Loader />
                  ) : (
                    allMsg?.map((item: GetChat, index: number) => {
                      const createdAtDate = new Date(item.createdAt);
                      const day = createdAtDate.getDate();
                      const month = createdAtDate.toLocaleString("default", {
                        month: "short",
                      });
                      const year = createdAtDate.getFullYear();

                      const showDate =
                        index === 0 ||
                        new Date(
                          allMsg[index - 1]?.createdAt
                        ).toDateString() !== createdAtDate.toDateString();

                      return (
                        <div key={item.id}>
                          {showDate && (
                            <div className="flex justify-between items-center mb-[30px]">
                              <div className="basis-[calc(50%_-_60px)] h-px bg-[#d9d9d9]"></div>
                              <div className="basis-[92px] text-center text-neutral-400 text-xs leading-[14.65px]">
                                {`${day} ${month} ${year}`}
                              </div>
                              <div className="basis-[calc(50%_-_60px)] h-px bg-[#d9d9d9]"></div>
                            </div>
                          )}
                          <div className="flex gap-4 mb-[30px]">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback
                                className="text-white"
                                style={{
                                  backgroundColor: chatDPColor(
                                    +item?.senderId?.id
                                  ),
                                }}
                              >
                                {item?.senderId?.name?.[0].toUpperCase() ||
                                  item?.senderId?.email?.[0].toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="leading-[19.53px] text-[black] font-medium">
                                {item?.senderId?.name ||
                                  item?.senderId?.email?.split("@")?.[0]}
                              </div>
                              <div className="text-[#606060] leading-[14.65px] text-xs mb-1">
                                {convertUTCToGMT(item?.createdAt).format(
                                  "h:mmA"
                                )}
                              </div>
                              <p className="text-black leading-[19.53px] break-all whitespace-pre-wrap	">
                                {item?.message}
                              </p>
                              {Array.isArray(item?.images) &&
                                item?.images?.length > 0 &&
                                item?.images?.map((i: string, index) => (
                                  <div
                                    key={index}
                                    className={`max-w-full w-[300px] mb-5 ${
                                      index === 0 ? "mt-5" : ""
                                    }`}
                                  >
                                    {i?.endsWith(".pdf") ||
                                    i?.endsWith(".xls") ||
                                    i?.endsWith(".xlsx") ||
                                    i?.endsWith(".doc") ||
                                    i?.endsWith(".docx") ? (
                                      <div className="w-[300px] bg-[#EDEFF9] p-5 flex rounded">
                                        <IoIosDocument className="h-5 w-5 me-3" />
                                        <span className="w-[80%] overflow-hidden whitespace-nowrap text-ellipsis text-[14px]">
                                          {i?.split(".com/")?.[1]}
                                        </span>
                                        <Button
                                          variant={"ghost"}
                                          className="p-0 h-auto"
                                          onClick={() =>
                                            window?.open(i, "_blank")
                                          }
                                        >
                                          <img
                                            src={eye}
                                            alt="view"
                                            width={18}
                                            height={12.38}
                                          />
                                        </Button>
                                      </div>
                                    ) : i?.endsWith(".mp4") ? (
                                      <video
                                        src={i}
                                        className="w-[150px]"
                                        controls
                                      />
                                    ) : (
                                      <img
                                        src={i}
                                        alt="image"
                                        onClick={() => window.open(i, "_blank")}
                                        className="cursor-pointer"
                                      />
                                    )}
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </CardContent>
              <CardFooter className="absolute left-0 right-0 bottom-0 pl-[20px] pr-5 pt-0 pb-[21px] block bg-white">
                <div className="">
                  {FileUploadPending ? (
                    <Loader containerClassName="h-auto p-2 flex overflow-x-auto bg-[#F5F5F5]" />
                  ) : (
                    images?.length > 0 && (
                      <div className="p-2 flex overflow-x-auto bg-[#F5F5F5]">
                        {images?.map((image, index: number) => (
                          <div key={index} className="mr-5 mb-2 relative">
                            <Button
                              variant="outline"
                              size="icon"
                              className="absolute -right-2 -top-2 h-4 w-4"
                              onClick={() => removeImage(index)}
                            >
                              <MdClose className="h-4 w-4" />
                            </Button>

                            {image?.endsWith(".pdf") ||
                            image?.endsWith(".xls") ||
                            image?.endsWith(".xlsx") ||
                            image?.endsWith(".doc") ||
                            image?.endsWith(".docx") ? (
                              <div className="flex items-center">
                                <IoIosDocument />
                                <span className="mx-3 text-[12px] text-medium">
                                  {image?.split(".com/")?.[1]}
                                </span>
                              </div>
                            ) : image?.endsWith(".mp4") ? (
                              <video src={image} className="h-[50px]" />
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
                    )
                  )}
                  <Textarea
                    className="mb-4 px-[13px] py-[11px] resize-none bg-white border border-solid border-[#D9D9D9]"
                    placeholder="Enter message"
                    onChange={(e) => setChatMessage(e.target.value)}
                    value={chatMessage}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                </div>
                <div className="flex justify-between">
                  <div className="flex">
                    <label htmlFor="imageUpload">
                      <FaImage className="text-[26px]" />
                      <input
                        id="imageUpload"
                        type="file"
                        accept="image/png, image/jpeg"
                        style={{ display: "none" }}
                        onChange={handleImageChange}
                        multiple
                      />
                    </label>
                    <label htmlFor="pdfUpload">
                      <MdOutlineAttachFile className="text-[26px] ml-5" />
                      <input
                        id="pdfUpload"
                        type="file"
                        accept=".xlsx,.xls,image/*,.doc, .docx,.pdf, .mp4"
                        style={{ display: "none" }}
                        onChange={handleImageChange}
                        multiple
                      />
                    </label>
                  </div>
                  <Button
                    className="px-[30px] py-[15px] bg-[#58BA66]"
                    disabled={sendPending || FileUploadPending}
                    onClick={() => handleSendMessage()}
                  >
                    {sendPending && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    SEND
                  </Button>
                </div>
              </CardFooter>
              {showScrollButton && (
                <Button
                  onClick={() => handleScrollToBottom(chatContainerRef)}
                  variant="outline"
                  size="icon"
                  className="fixed bottom-[200px] right-10 px-4 py-2 rounded-full p-0"
                >
                  <ChevronDown className="h-4 w-4 " />
                </Button>
              )}
            </>
          ) : (
            <span className="h-[calc(100%-65px)] flex justify-center items-center">
              No record found
            </span>
          )}
        </Card>
        {/* <Loading isLoading={userListPending} /> */}
      </div>
    </Fragment>
  );
};

export default Message;
