import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { QUERY_KEYS } from "@/lib/constants";
import { chatDPColor, getTimeAgo } from "@/lib/utils";
import {
  createForum,
  fetchForumQuestion,
  likeDislikeForum,
} from "@/services/apiServices/forum";
import { UserData } from "@/types/auth";
import { ErrorType, ResponseError } from "@/types/Errors";
import { UserRole } from "@/types/UserRole";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, MessageCircle, ThumbsDown, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MessageList from "./MessageList";
import HandsDown from "/assets/icons/handdown.svg";
import HandsUp from "/assets/icons/handup.svg";

const ForumPage = () => {
  const queryClient = useQueryClient();
  const [forumquestion, setforumquestion] = useState<
    {
      moduleId: number | string;
      question: string;
    }[]
  >([]);
  const [loadingID, setLoadingID] = useState("");
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const UserId = useSelector((state: UserData) => state.user.UserId);
  const userID = UserId ? UserId : userData?.query?.id;
  const { courseId } = useParams();
  const courseParamsId = new URLSearchParams(window.location.search).get("id");
  const courseID = new URLSearchParams(window.location.search).get("courseId");
  const [openCommnet, setopenCommnet] = useState<number>(0);
  const [a, setA] = useState<any>({ key1: "", key2: "", key3: "" });
  const { data: fetchForumQuestionData, isLoading: fetchForumQuestionLoading } =
    useQuery({
      queryKey: [
        QUERY_KEYS.fetchModuleForumQuestion,
        { courseId, courseID, courseParamsId },
      ],
      queryFn: () => fetchForumQuestion(courseId || courseParamsId || courseID),
      enabled: !!courseId || !!courseParamsId || !!courseID,
    });
  useEffect(() => {
    if (fetchForumQuestionData?.data?.module?.length) {
      setforumquestion(
        fetchForumQuestionData?.data?.module?.map((item) => ({
          moduleId: item.id,
          question: "",
        }))
      );
    }
  }, [fetchForumQuestionData?.data?.module]);

  const { mutate, isPending: createForumLoading } = useMutation({
    mutationFn: createForum,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.fetchforumquestion],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.fetchModuleForumQuestion],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.getSingleCourse],
      });
      setforumquestion(
        fetchForumQuestionData?.data?.module?.map((item) => ({
          moduleId: item.id,
          question: "",
        })) || []
      );
      setLoadingID("");
    },
    onError: (error: ErrorType) => {
      toast({
        title: "Error",
        variant: "destructive",
        description: error.data.message,
      });
    },
  });

  const { mutate: likeDislike, isPending: likeDislikeLoading } = useMutation({
    mutationFn: (data: any) => likeDislikeForum(data),
    onSuccess: async (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.fetchModuleForumQuestion],
      });
      setA({ key1: "", key2: "", key3: "" });
      toast({
        title: "Success",
        description: data.message,
        variant: "success",
      });
    },
    onError: (error: ResponseError) => {
      toast({
        title: "Error",
        description: error?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (moduleID: number, e: React.FormEvent) => {
    e.preventDefault();
    if (
      forumquestion.find((it) => it.moduleId === moduleID)?.question &&
      (courseId || courseParamsId || courseID) &&
      userID
    ) {
      setLoadingID(moduleID.toString());
      mutate({
        question:
          forumquestion.find((it) => it.moduleId === moduleID)?.question || "",
        userId: +userID,
        courseId: courseId
          ? +courseId
          : courseID
          ? +courseID
          : +courseParamsId!,
        moduleId: +moduleID,
        tab: "4",
      });
    }
  };

  const moduleItem = fetchForumQuestionData?.data?.module?.[0];

  return fetchForumQuestionLoading ? (
    <span className="flex justify-center items-center py-10">
      <Loader2 className="w-5 h-5 animate-spin" />
    </span>
  ) : moduleItem ? (
    <div className="">
      {/* <div className="xl:px-6 px-4 py-3 border border-[#D9D9D9] rounded-lg mb-5">
        <h5 className="text-base text-black font-normal pb-2.5">
          Module: {item?.title}
        </h5>
        <div className="flex items-center gap-4">
          <h5 className="text-[#5B5B5B]">
            Section : {item?.moduleSection?.length || 0}
          </h5>
          <h5 className="text-[#5B5B5B] flex items-center gap-2">
            <span className="text-black flex items-center font-bold">
              <Dot /> {calculateTotalReadingTime(item?.moduleSection)}
            </span>{" "}
            Reading
          </h5>
        </div>
      </div> */}
      <div className="flex flex-col gap-5 shadow xl:px-6 px-4 xl:pb-5 pb-3 rounded-lg mb-5">
        <div className="flex gap-4 items-center">
          <div className="w-[42px] h-[42px] rounded-full overflow-hidden">
            <Avatar className="w-full h-full">
              <AvatarImage src={""} alt="profileImage" />
              <AvatarFallback
                className="text-white text-xl"
                style={{ background: chatDPColor(userData?.query?.id) }}
              >
                {userData?.query?.fname?.charAt(0)?.toUpperCase() ||
                  userData?.query?.email?.charAt(0)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="">
            <h5 className="text-black text-base font-font-droid">
              {userData?.query?.fname || userData?.query?.lname
                ? `${userData?.query?.fname || ""} ${" "} ${
                    userData?.query?.lname || ""
                  }`.trim()
                : userData?.query?.email?.split("@")[0]}
            </h5>
            <h6 className="text-[rgb(91,91,91)] text-xs font-droid">
              {+userData?.query?.role === UserRole.Company
                ? "Company"
                : +userData?.query?.role === UserRole.Trainer
                ? "Trainer Company"
                : +userData?.query?.role === UserRole.Trainee
                ? "Trainer"
                : +userData?.query?.role === UserRole.Employee
                ? "Company Employee"
                : +userData?.query?.role === UserRole.SuperAdmin
                ? "Super Admin"
                : "Client"}
            </h6>
          </div>
        </div>

        <form onSubmit={handleSubmit.bind(null, moduleItem?.id)}>
          <Textarea
            placeholder="Post Your Question"
            rows={5}
            className="w-full border-border-[#D9D9D9] py-5 px-4 placeholder:text-[#A3A3A3] rounded-lg text-base"
            onChange={(e) =>
              setforumquestion((prev) =>
                prev.map((it) =>
                  it.moduleId === moduleItem?.id
                    ? { ...it, question: e.target.value }
                    : it
                )
              )
            }
            value={
              forumquestion.find((it) => it.moduleId === moduleItem?.id)
                ?.question
            }
          />
          <div className="text-right pt-5">
            <Button
              className="bg-[#42A7C3] text-xs md:text:md"
              type="submit"
              disabled={createForumLoading && +loadingID === moduleItem?.id}
            >
              {createForumLoading && +loadingID === moduleItem?.id && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
              Post Question
            </Button>
          </div>
        </form>
      </div>

      {moduleItem?.forumQuestions?.map((x, i) => {
        const hasLiked = x?.like?.some((i: any) => i?.id === +userID);
        const hasDisliked = x?.unlike?.some((i: any) => i?.id === +userID);

        return (
          <div className="border border-[#D9D9D9] rounded-lg mb-5" key={x?.id}>
            <div className="xl:px-6 px-4 xl:py-4 py-3 border-b border-[#D9D9D9]">
              <h3 className="text-lg text-black pb-2.5 font-bold font-droid">
                {x?.question}
              </h3>

              <div className="flex gap-4 items-center">
                <div className="w-[42px] h-[42px] rounded-full overflow-hidden">
                  <Avatar className="w-full h-full">
                    <AvatarImage src={""} alt="profileImage" />
                    <AvatarFallback
                      className="text-white text-xl"
                      style={{
                        background: chatDPColor(x?.user?.id),
                      }}
                    >
                      {x?.user?.fname?.charAt(0)?.toUpperCase() ||
                        x?.user?.email?.charAt(0)?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="">
                  <h5 className="text-black text-base font-font-droid">
                    {x?.user?.fname + " " + x?.user?.lname ||
                      x?.user?.email?.split("@")[0]}
                  </h5>
                  <div className="flex gap-2.5">
                    <h6 className="text-[#5B5B5B] text-xs font-droid">
                      {userData?.role === UserRole.Company
                        ? "Company"
                        : userData?.role === UserRole.Trainer
                        ? "Trainer Company"
                        : userData?.role === UserRole.Trainee
                        ? "Trainer"
                        : userData?.role === UserRole.Employee
                        ? "Company Employee"
                        : userData?.role === UserRole.SuperAdmin
                        ? "Super Admin"
                        : "Client"}
                    </h6>
                    <h6 className="text-[#5B5B5B] text-xs font-droid">
                      {getTimeAgo(x.createdAt)}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-3 border-b border-[#D9D9D9]">
              <ul className="flex items-center gap-7">
                <li
                  onClick={() => {
                    setA({ key1: 0, key2: i, key3: "like" });
                    likeDislike({
                      data: {
                        ForumQuestionId: x?.id,
                        userId: +userID,
                      },
                      isLike: true,
                    });
                  }}
                  className="text-base text-[#606060] font-droid flex items-center gap-2 cursor-pointer group"
                >
                  <>
                    {likeDislikeLoading &&
                    a.key1 === 0 &&
                    a.key2 === i &&
                    a.key3 === "like" ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        {hasLiked ? (
                          <img
                            src={HandsUp}
                            alt="Like"
                            width={24}
                            height={24}
                          />
                        ) : (
                          <ThumbsUp
                            style={hasLiked ? { color: "#00778B" } : {}}
                            className={`group-hover:text-[#00778B] text-[#A3A3A3]`}
                          />
                        )}
                      </>
                    )}
                  </>
                  Like ({x?.like?.length})
                </li>
                <li
                  onClick={() => {
                    setA({ key1: 0, key2: i, key3: "dislike" });
                    likeDislike({
                      data: {
                        ForumQuestionId: x?.id,
                        userId: +userID,
                      },
                      isLike: false,
                    });
                  }}
                  className="text-base text-[#606060] font-droid flex items-center gap-2 cursor-pointer group"
                >
                  <>
                    {likeDislikeLoading &&
                    a.key1 === 0 &&
                    a.key2 === i &&
                    a.key3 === "dislike" ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        {hasDisliked ? (
                          <img
                            src={HandsDown}
                            alt="Dislike"
                            width={24}
                            height={24}
                          />
                        ) : (
                          <ThumbsDown
                            style={hasDisliked ? { color: "#00778B" } : {}}
                            className={`group-hover:text-[#00778B] text-[#A3A3A3]`}
                          />
                        )}
                      </>
                    )}
                  </>
                  Dislike ({x?.unlike?.length})
                </li>
                <li
                  className="text-base text-[#606060] font-droid flex items-center gap-2 cursor-pointer group"
                  onClick={() => setopenCommnet(x?.id)}
                >
                  <MessageCircle
                    className={`group-hover:text-[#00778B] text-[#A3A3A3] `}
                  />
                  comments ({x?.comments?.length})
                </li>
              </ul>
            </div>
            <div className="xl:px-6 px-4 py-3">
              <div className="flex flex-col gap-5">
                <MessageList
                  data={x}
                  setopenCommnet={setopenCommnet}
                  openCommnet={openCommnet}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <span className="flex items-center justify-center py-10">
      No data found
    </span>
  );
};

export default ForumPage;
