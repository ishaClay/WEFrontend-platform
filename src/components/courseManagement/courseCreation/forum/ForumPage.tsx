import { Dot, Loader2, MessageCircle, ThumbsDown, ThumbsUp } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import MessageList from "./MessageList";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { createForum, fetchForumQuestion } from "@/services/apiServices/forum";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants";
import { toast } from "@/components/ui/use-toast";
import { calculateTotalReadingTime, chatDPColor, getTimeAgo } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserData } from "@/types/auth";
import { UserRole } from "@/types/UserRole";
import { useSelector } from "react-redux";
import { ErrorType } from "@/types/Errors";

const ForumPage = () => {
  const queryClient = useQueryClient();
  const [forumquestion, setforumquestion] = useState<{ moduleId: number | string, question: string }>({ moduleId: "", question: "" });
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const UserId = useSelector((state: UserData) => state.user.UserId);
  const userId = UserId ? UserId : userData?.query?.id;
  const { courseId } = useParams();
  const [openCommnet, setopenCommnet] = useState<number>(0);

  const { data: fetchForumQuestionData, isPending: fetchForumQuestionLoading } = useQuery({
    queryKey: [QUERY_KEYS.fetchModuleForumQuestion, courseId],
    queryFn: () => fetchForumQuestion(courseId),
  })

  console.log("fetchForumQuestionData", fetchForumQuestionData?.data, fetchForumQuestionLoading);


  const { mutate, isPending: createForumLoading } = useMutation({
    mutationFn: createForum,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.fetchforumquestion],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.fetchModuleForumQuestion, courseId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.getSingleCourse],
      });
      setforumquestion({
        moduleId: "",
        question: "",
      });
    },
    onError: (error: ErrorType) => {
      toast({
        title: "Error",
        variant: "destructive",
        description: error.data.message,
      });
    },
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (forumquestion && courseId && userId) {
      mutate({
        question: forumquestion?.question,
        userId: +userId,
        courseId: +courseId,
        moduleId: +forumquestion?.moduleId,
        tab: "4",
      });
    }
  };

  return (
    fetchForumQuestionLoading ? <span className="flex justify-center items-center py-10">
      <Loader2 className="w-5 h-5 animate-spin" />
      </span> : fetchForumQuestionData?.data?.module && fetchForumQuestionData?.data?.module?.length > 0 ?fetchForumQuestionData?.data?.module?.map((item, index) => {
      return <div className="" key={index}>
        <div className="xl:px-6 px-4 py-3 border border-[#D9D9D9] rounded-lg mb-5">
          <h5 className="text-base text-black font-normal pb-2.5">
            Module: {item?.title}
          </h5>
          <div className="flex items-center gap-4">
            <h5 className="text-[#5B5B5B]">Section : {item?.moduleSection?.length || 0}</h5>
            <h5 className="text-[#5B5B5B] flex items-center gap-2">
              <span className="text-black flex items-center font-bold">
                <Dot /> {calculateTotalReadingTime(item?.moduleSection)}
              </span>{" "}
              Reading
            </h5>
          </div>
        </div>
        <div className="flex flex-col gap-5 shadow xl:px-6 px-4 xl:py-5 py-3 rounded-lg mb-5">
          <div className="flex gap-4 items-center">
            <div className="w-[42px] h-[42px] rounded-full overflow-hidden">
              <Avatar className="w-full h-full">
                <AvatarImage src={""} alt="profileImage" />
                <AvatarFallback
                  className="text-white text-xl"
                  style={{ background: chatDPColor(userData?.query?.id) }}
                >
                  {userData?.query?.name?.charAt(0)?.toUpperCase() ||
                    userData?.query?.email?.charAt(0)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="">
              <h5 className="text-black text-base font-abhaya">
                {userData?.query?.name}
              </h5>
              <h6 className="text-[rgb(91,91,91)] text-xs font-inter">
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
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <Textarea
              placeholder="Post Your Question"
              rows={5}
              className="w-full border-border-[#D9D9D9] text-[#A3A3A3] py-5 px-4 placeholder:text-[#A3A3A3] rounded-lg text-base"
              onChange={(e) => setforumquestion({ moduleId: item?.id, question: e.target.value })}
              // value={forumquestion?.question ?? ""}
            />
            <div className="text-right pt-5">
              <Button className="bg-[#42A7C3] text-xs md:text:md" type="submit" disabled={(createForumLoading && item?.id ===forumquestion?.moduleId)}>
                {(createForumLoading && item?.id ===forumquestion?.moduleId) && <Loader2 className="h-4 w-4 animate-spin" />}
                Post Question
              </Button>
            </div>
          </form>
        </div>

        {item?.forumQuestions?.map((x) => {
          // console.log(x, "x user");
          return <div
            className="border border-[#D9D9D9] rounded-lg mb-5"
            key={x?.id}
          >
            <div className="xl:px-6 px-4 xl:py-4 py-3 border-b border-[#D9D9D9]">
              <h3 className="text-lg text-black pb-2.5 font-bold font-inter">
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
                      {x?.user?.name?.charAt(0)?.toUpperCase() ||
                        x?.user?.email?.charAt(0)?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="">
                  <h5 className="text-black text-base font-abhaya">
                    {x?.user?.name}
                  </h5>
                  <div className="flex gap-2.5">
                    <h6 className="text-[#5B5B5B] text-xs font-inter">
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
                    <h6 className="text-[#5B5B5B] text-xs font-inter">
                      {getTimeAgo(x.createdAt)}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-3 border-b border-[#D9D9D9]">
              <ul className="flex items-center gap-7">
                <li className="text-base text-[#606060] font-inter flex items-center gap-2 cursor-pointer group">
                  <ThumbsUp className="group-hover:text-[#00778B] text-[#A3A3A3]" />{" "}
                  Like ({x?.like?.length})
                </li>
                <li className="text-base text-[#606060] font-inter flex items-center gap-2 cursor-pointer group">
                  <ThumbsDown className="group-hover:text-[#00778B] text-[#A3A3A3]" />
                  Dislike ({x?.unlike?.length})
                </li>
                <li
                  className="text-base text-[#606060] font-inter flex items-center gap-2 cursor-pointer group"
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
        })
        }
      </div>
    }) : <span className="flex items-center justify-center py-10">No data found</span>
  );
};

export default ForumPage;
