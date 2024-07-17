import RecommendedCoursesModel from "@/components/RecommendedCoursesModel";
import Loader from "@/components/comman/Loader";
import Modal from "@/components/comman/Modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { QUERY_KEYS } from "@/lib/constants";
import { RootState } from "@/redux/store";
import { fetchRecommendedCourses } from "@/services/apiServices/recommendedcourses";
import { CourseDataEntity, CourseTime, IsOnline, RecommendedCourses } from "@/types/RecommendedCourses";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { AiOutlineAppstore, AiOutlineBars } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useToast } from "@/components/ui/use-toast";
import { fetchEnroll } from "@/services/apiServices/enroll";
import speed from "@/assets/images/Speed.png";
import diploma from "@/assets/images/diploma.png";
import fulltime from "@/assets/images/fulltime.png";
import online from "@/assets/images/online.png";
import time from "@/assets/images/time.png";
import unversity from "@/assets/images/unversity.png";
import atu from "@/assets/images/atu.png";
import { ErrorType } from "@/types/Errors";
import { EnrollmentRequestsResponse } from "@/types/allocatedcourses";
import { fetchAllocatedCourse } from "@/services/apiServices/allocatedcourse";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { sendMessage } from "@/services/apiServices/chatServices";

function CoursesRecommended() {
  const pathName: string = location?.pathname?.split("/")[1];
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.user);
  const usersData = JSON.parse(localStorage.getItem("user") as string);
  const userID = userData?.UserId
    ? +userData?.UserId
    : usersData?.query
      ? usersData?.query?.id
      : usersData?.id;
  const [isRecommendedCourse, setIsRecommendedCourseShow] = useState(false);
  const { toast } = useToast();
  const [recommendedCoursesById, setRecommendedCoursesById] = useState<number | null>()
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();
  const { data: recommendedcourses, isPending: pending } = useQuery({
    queryKey: [QUERY_KEYS.fetchbyrecommendedcourse, { search }],
    queryFn: () =>
      fetchRecommendedCourses({
        user: parseInt(userID),
        client: parseInt(userData?.clientId),
        search,
      }),
  });

  const { mutate: enrollRequest, isPending } = useMutation({
    mutationFn: fetchEnroll,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.fetchbyrecommendedcourse],
      });
      toast({
        variant: "success",
        title: data?.data?.message,
      });
    },
    onError: (error: ErrorType) => {
      toast({
        variant: "destructive",
        title: error?.data?.message,
      });
    },
  });

  const { mutate: handleSend } = useMutation({
    mutationFn: sendMessage,
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.chatList],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.chatUserList],
      });
      toast({
        variant: "success",
        title: data?.data?.message,
      });
      navigate(`/${pathName}/message`)
      // socket.emit("new message", data?.data);
      console.log("data+++++", data);
      
    },
    onError:(error: ErrorType) => {
      console.log("data+++++error", error);
      setRecommendedCoursesById(null);
      toast({
        variant: "destructive",
        title: error?.data?.message,
      });
    }
  });

  const { data: course } = useQuery<EnrollmentRequestsResponse>({
    queryKey: [QUERY_KEYS.fetchbycourseallocate],
    queryFn: () => fetchAllocatedCourse(usersData?.query?.id),
  });
  console.log('course++', course);

  const getPillerName = (pillerData: CourseDataEntity[]) => {
    if (!pillerData) return null;
    return pillerData?.map((item) => {
      const pillarName = item?.fetchPillar?.pillarName;
      const pillerColor = item?.fetchMaturity?.rangeStart >= 1 && item?.fetchMaturity?.rangeEnd <= 40 ? "bg-[#F63636] text-white" :
        item?.fetchMaturity?.rangeStart >= 40.1 && item?.fetchMaturity?.rangeEnd <= 80 ? "bg-[#FFD56A] text-black" :
          "bg-[#64A70B] text-white";

      return <Badge
        variant="outline"
        className={`${pillerColor} border-[#EDF0F4] p-1 px-3 text-[white] text-xs font-Poppins font-normal`}
      >
        {pillarName}
      </Badge>
    })
  }


  const handleEnrollementRequest = (id: number) => {
    enrollRequest({
      versionId: id,
      companyId: +userData?.CompanyId,
    });
  };

  const handleInquire = (data: RecommendedCourses[] | any) => {
    const payload = {
      senderId: userData?.UserId,
      receiverId: data?.currentVersion?.id,
      message: data?.title,
      images: [data?.bannerImage]
    }
    handleSend(payload)
  }

  return (
    <>
      <Modal
        open={isRecommendedCourse}
        onClose={() => setIsRecommendedCourseShow(false)}
        className="max-w-[800px] max-h-[800px] h-[780px] py-[60px] px-6"
      >
        <RecommendedCoursesModel handleSubmit={() => handleEnrollementRequest(1)} />
      </Modal>
      <div className="bg-[#f5f3ff] h-[calc(100vh-160px)]">
        <div className="h-full">
          <div className="bg-[#FFFFFF] rounded-xl">
            <div className="border-b border-[#D9D9D9] p-5">
              <p className="text-[#000000] text-[Calibri]">
                Recommended Courses
              </p>
            </div>

            <div className="flex sm:flex-row flex-col p-3 bg-[#FFFFFF] justify-between sm:items-center items-start sm:gap-0 gap-3">
              <div className="flex ml-0 items-center border border-[#D9D9D9] rounded-md px-4 py-2 md:w-[550px] sm:w-[450px] w-[300px] h-[52px] text-[#A3A3A3]">
                <BsSearch className="text-[#D9D9D9] mr-2" />

                <input
                  type="text"
                  placeholder="Search by pilier, level, recommended, course name etc."
                  className="flex-1 mr-2 focus:outline-none text-black placeholder-[#A3A3A3] text-sm"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Button
                  variant={"ghost"}
                  className="h-auto p-0 hover:bg-transparent"
                >
                  <AiOutlineAppstore className="text-[#A3A3A3] w-8 h-8" />
                </Button>

                <AiOutlineBars className="text-[#00778B] w-8 h-8" />
              </div>
            </div>

            <div className="p-4 h-[calc(100vh-301px)] overflow-auto">
              {pending ? (
                <Loader />
              ) : recommendedcourses?.data ? (
                recommendedcourses?.data?.map((recommendedcourses) => (
                  <div key={recommendedcourses.id}>
                    <div className="bg-[#FFFFFF] flex p-5  border border-[#D9D9D9] m-[12px] rounded-md shadow-sm">
                      <div className="overflow-hidden rounded">
                        <img
                          className=" w-[152px] h-[133px] rounded object-cover object-center "
                          src={recommendedcourses.bannerImage}
                          alt="Course"
                        />
                      </div>

                      <div className="flex w-full flex-col mx-[22px]">
                        <div>
                          <div className="flex items-center  gap-3 mb-3">
                            <FaStar className="text-yellow-500" />
                            <span className="text-[#8C94A3] font-semibold text-sm mr-2 ml-1">
                              RECOMMENDED
                            </span>
                            <div className="flex gap-3">
                              {
                                getPillerName(recommendedcourses?.courseData || [])
                              }
                            </div>


                            {/* {
                            recommendedcourses?.courseData?.map((item) => {
                              const pillarName = item?.fetchPillar?.pillarName;
                              return <Badge
                              variant="outline"
                              className={`bg-[${pillarName === "Environmental" || pillarName === "Governance"
                                ? "#FFD56A"
                                : pillarName === "Technology & Innovation" || pillarName === "Strategic Integration" || pillarName === "Economics"
                                ? "#F63636"
                                : "#64A70B"}] border-[#EDF0F4] p-1 px-3 text-[white] text-xs font-Poppins font-normal`}
                            >
                              {pillarName}
                            </Badge>
                            })
                          } */}
                          </div>
                        </div>

                        <div className="grid grid-cols-12 justify-between xl:gap-[50px] gap-4 items-center">
                          <div className="xl:col-span-10 col-span-12">
                            {" "}
                            <span
                              dangerouslySetInnerHTML={{
                                __html: recommendedcourses?.description,
                              }}
                              className="font-inter lg:text-base text-sm line-clamp-2"
                            ></span>
                          </div>
                          <div className="xl:col-span-2 col-span-4">
                            <img
                              className="object-cover object-center"
                              src={atu}
                              alt="atu"
                            />
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-4 mt-4">
                          <div className="flex items-center gap-1">
                            <img
                              className=" h-[16] w-[18px]"
                              src={speed}
                              alt="speed"
                            />
                            <p className="text-xs">Level- Advanced</p>
                          </div>

                          <div className="flex items-center gap-1">
                            <img
                              className=" h-[16] w-[18px] text-black"
                              src={diploma}
                              alt="diploma"
                            />
                            <p className="text-xs">Post Graduate Diploma</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <img
                              className=" h-[16] w-[18px]"
                              src={fulltime}
                              alt="fulltime"
                            />
                            <p className="text-xs">
                              {recommendedcourses?.time ===
                                CourseTime.FullTime && (
                                  <span>Full-time</span>
                                )}
                              {recommendedcourses?.time ===
                                CourseTime.PartTime && (
                                  <span>Part-time</span>
                                )}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <img
                              className=" h-[16] w-[18px]"
                              src={online}
                              alt="online"
                            />
                            <p className="text-xs">
                              {recommendedcourses?.isOnline ===
                                IsOnline.Online && <span>Online</span>}
                              {recommendedcourses?.isOnline ===
                                IsOnline.InPerson && <span>InPerson</span>}
                              {recommendedcourses?.isOnline ===
                                IsOnline.Hybrid && <span>Hybrid</span>}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <img
                              className=" h-[16] w-[18px]"
                              src={time}
                              alt="time"
                            />
                            <p className="text-xs">
                              {recommendedcourses?.duration}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <img
                              className=" h-[16] w-[18px]"
                              src={unversity}
                              alt="unversity"
                            />
                            <p className="text-xs">
                              Atlantic Technological University
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="sm:col-span-2 col-span-12">
                        <div className="flex sm:flex-col flex-row gap-2 sm:items-end items-center">
                          <h3 className="text-[#000000] text-[font-calibri-bold] sm:w-[100px] w-[80px]">
                            €{recommendedcourses?.price}
                          </h3>
                          <Button
                            onClick={() => setIsRecommendedCourseShow(true)}
                            // onClick={() => 
                            //   handleEnrollementRequest(recommendedcourses.id)
                            // }
                            isLoading={isPending}
                            className="  bg-[#64A70B] hover:bg-[#64A70B] text-white px-4 py-2 rounded w-[100px]"
                          >
                            Enroll Now
                          </Button>
                          <Button className=" h-[42px] bg-[#00778B] text-white font-semibold w-[100px] px-4 py-2 rounded"
                            onClick={() => {handleInquire(recommendedcourses || []); setRecommendedCoursesById(recommendedcourses?.id);}}
                            disabled={recommendedCoursesById === recommendedcourses?.id}
                          >
                            {recommendedCoursesById === recommendedcourses?.id && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Inquire
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-[20px] font-calibri font-[500] h-[300px] flex items-center justify-center">
                  {recommendedcourses?.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div >
    </>
  );
}

export default CoursesRecommended;
