import { Dot, MessageCircle, ThumbsDown, ThumbsUp } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import MessageList from "./MessageList";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { createForum, fetchAllForum } from "@/services/apiServices/forum";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants";
import { CommentFormData } from "@/types/forum";
import Loader from "@/components/comman/Loader";
import { AxiosError } from "axios";
import { toast } from "@/components/ui/use-toast";
import { chatDPColor, getTimeAgo } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRole } from "@/types/UserRole";
import { useSelector } from "react-redux";
import { UserData } from "@/types/auth";

const ForumPage = () => {
  const queryClient = useQueryClient();
  const [forumquestion, setforumquestion] = useState<string>("");
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const UserId = useSelector((state: UserData) => state.user.UserId);
  const userId = UserId ? UserId : userData?.query?.id;
  const { courseId } = useParams();
  const [openCommnet, setopenCommnet] = useState<number>(0);

  const { mutate } = useMutation({
    mutationFn: createForum,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.fetchforumquestion],
      });
    },
    onError: (error: AxiosError) => {
      toast({
        title: "Error",
        variant: "destructive",
        description: error.message,
      });
    },
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setforumquestion("");
    if (forumquestion && courseId && userId) {
      mutate({
        question: forumquestion,
        userId: +userId,
        courseId: +courseId,
        tab: "4",
      });
    }
  };

  const { data: forumdata, isLoading: forumLoading } =
    useQuery<CommentFormData>({
      queryKey: [QUERY_KEYS.fetchforumquestion],
      queryFn: () => fetchAllForum(courseId ? +courseId : 0),
      enabled: !!courseId,
    });
  // console.log(forumdata, "forumdata+++");

  return (
    <div className="">
      <div className="xl:px-6 px-4 py-3 border border-[#D9D9D9] rounded-lg mb-5">
        <h5 className="text-base text-black font-normal pb-2.5">
          Module: Chapter 1 - Intro
        </h5>
        <div className="flex items-center gap-4">
          <h5 className="text-[#5B5B5B]">Section : 3</h5>
          <h5 className="text-[#5B5B5B] flex items-center gap-2">
            <span className="text-black flex items-center font-bold">
              <Dot /> 50m
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
            onChange={(e) => setforumquestion(e.target.value)}
            value={forumquestion ?? ""}
          />
          <div className="text-right pt-5">
            <Button className="bg-[#42A7C3] text-xs md:text:md" type="submit">
              {forumLoading && <Loader />}
              Post Question
            </Button>
          </div>
        </form>
      </div>

      {forumLoading ? (
        <Loader />
      ) : (
        forumdata?.data?.map((x) => {
          // console.log(x, "x user");
          return (
            <>
              <div
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
                            background: chatDPColor(userData?.query?.id),
                          }}
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
            </>
          );
        })
      )}
    </div>
  );
};

export default ForumPage;
