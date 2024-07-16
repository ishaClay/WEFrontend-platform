import RecommendedCoursesModel from "@/components/RecommendedCoursesModel";
import Loader from "@/components/comman/Loader";
import Modal from "@/components/comman/Modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { QUERY_KEYS } from "@/lib/constants";
import { RootState } from "@/redux/store";
import { fetchRecommendedCourses } from "@/services/apiServices/recommendedcourses";
import { CourseTime, IsOnline } from "@/types/RecommendedCourses";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { AiOutlineAppstore, AiOutlineBars } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useToast } from "@/components/ui/use-toast";
import { fetchEnroll } from "@/services/apiServices/enroll";
import { ErrorType } from "@/types/Errors";
import { EnrollmentRequestsResponse } from "@/types/allocatedcourses";
import { fetchAllocatedCourse } from "@/services/apiServices/allocatedcourse";

function CoursesRecommended() {
  const userData = useSelector((state: RootState) => state.user);
  const usersData = JSON.parse(localStorage.getItem("user") as string);
  const userID = userData?.UserId
    ? +userData?.UserId
    : usersData?.query
    ? usersData?.query?.id
    : usersData?.id;
  const [isRecommendedCourse, setIsRecommendedCourseShow] = useState(false);
  const { toast } = useToast();
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

  const { data: course } = useQuery<EnrollmentRequestsResponse>({
    queryKey: [QUERY_KEYS.fetchbycourseallocate],
    queryFn: () => fetchAllocatedCourse(usersData?.query?.id),
  });
  console.log("course++", course);

  const handleEnrollementRequest = (id: number) => {
    enrollRequest({
      versionId: id,
      companyId: +userData?.CompanyId,
    });
  };

  return (
    <>
      <Modal
        open={isRecommendedCourse}
        onClose={() => setIsRecommendedCourseShow(false)}
        className="max-w-[800px] max-h-[800px] h-[780px] py-[60px] px-6"
      >
        <RecommendedCoursesModel />
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
                  onClick={() => setIsRecommendedCourseShow(true)}
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
                recommendedcourses?.data?.map((recommendeddata, i) => (
                  <div key={recommendeddata.id}>
                    <div
                      className={`bg-[#FFFFFF] pr-4 border border-[#D9D9D9] lg:p-5 p-4 rounded-md shadow-sm ${
                        recommendedcourses?.data &&
                        recommendedcourses?.data?.length - 1 === i
                          ? "mb-0"
                          : "mb-5"
                      }`}
                    >
                      <div className="grid grid-cols-12 gap-4">
                        <div className="sm:col-span-10 col-span-12 flex sm:flex-row flex-col xl:gap-5 gap-3">
                          <div className="overflow-hidden rounded sm:min-w-[152px] w-full sm:w-[152px] sm:min-h-[133px] sm:h-[133px]">
                            <img
                              className="rounded object-cover object-center w-full h-full"
                              src={recommendeddata.bannerImage}
                              alt="Course"
                            />
                          </div>

                          <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-1 flex-wrap">
                              <div className="flex gap-1">
                                <FaStar className="text-yellow-500" />
                                <span className="text-[#8C94A3] font-semibold text-sm">
                                  RECOMMENDED
                                </span>
                              </div>
                              <div className="flex gap-1">
                                <Badge className="bg-[#FFD56A] hover:bg-[#FFD56A] text-[#3A3A3A] font-semibold text-xs py-1 px-2 rounded-full">
                                  Technology & Innovation
                                </Badge>
                                <Badge className="bg-[#D6F5AC] hover:bg-[#D6F5AC] text-[#000000] font-semibold text-xs py-1 px-2 rounded-full">
                                  Social
                                </Badge>
                              </div>
                            </div>

                            <div className="grid grid-cols-12 justify-between xl:gap-[50px] gap-4 items-center">
                              <div className="xl:col-span-10 col-span-12">
                                {" "}
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: recommendeddata.description,
                                  }}
                                  className="font-inter lg:text-base text-sm line-clamp-2"
                                ></span>
                              </div>
                              <div className="xl:col-span-2 col-span-4">
                                <img
                                  className="object-cover object-center"
                                  src="/public/assets/img/Recommended.png"
                                  alt="Course"
                                />
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-4">
                              <div className="flex items-center gap-1">
                                <img
                                  className=" h-[16] w-[18px]"
                                  src="/public/assets/img/timer.png"
                                  alt="Course"
                                />
                                <p className="text-xs">Level- Advanced</p>
                              </div>

                              <div className="flex items-center gap-1">
                                <img
                                  className=" h-[16] w-[18px] text-black"
                                  src="/public/assets/img/diploma.png"
                                  alt="Course"
                                />
                                <p className="text-xs">Post Graduate Diploma</p>
                              </div>
                              <div className="flex items-center gap-1">
                                <img
                                  className=" h-[16] w-[18px]"
                                  src="/public/assets/img/fulltime.png"
                                  alt="Course"
                                />
                                <p className="text-xs">
                                  {recommendeddata.time ===
                                    CourseTime.FullTime && (
                                    <span>Full-time</span>
                                  )}
                                  {recommendeddata.time ===
                                    CourseTime.PartTime && (
                                    <span>Part-time</span>
                                  )}
                                </p>
                              </div>
                              <div className="flex items-center gap-1">
                                <img
                                  className=" h-[16] w-[18px]"
                                  src="/public/assets/img/online.png"
                                  alt="Course"
                                />
                                <p className="text-xs">
                                  {recommendeddata.isOnline ===
                                    IsOnline.Online && <span>Online</span>}
                                  {recommendeddata.isOnline ===
                                    IsOnline.InPerson && <span>InPerson</span>}
                                  {recommendeddata.isOnline ===
                                    IsOnline.Hybrid && <span>Hybrid</span>}
                                </p>
                              </div>
                              <div className="flex items-center gap-1">
                                <img
                                  className=" h-[16] w-[18px]"
                                  src="/public/assets/img/time.png"
                                  alt="Course"
                                />
                                <p className="text-xs">
                                  {recommendeddata.duration}
                                </p>
                              </div>
                              <div className="flex items-center gap-1">
                                <img
                                  className=" h-[16] w-[18px]"
                                  src="/public/assets/img/unversity.png"
                                  alt="Course"
                                />
                                <p className="text-xs">
                                  Atlantic Technological University
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="sm:col-span-2 col-span-12">
                          <div className="flex sm:flex-col flex-row gap-2 sm:items-end items-center">
                            <h3 className="text-[#000000] text-[font-calibri-bold] sm:w-[100px] w-[80px]">
                              €{recommendeddata.price}
                            </h3>

                            <Button
                              onClick={() =>
                                handleEnrollementRequest(recommendeddata.id)
                              }
                              isLoading={isPending}
                              className="  bg-[#64A70B] hover:bg-[#64A70B] text-white px-4 py-2 rounded w-[100px]"
                            >
                              Enroll Now
                            </Button>
                            <button className=" h-[42px] bg-[#00778B] text-white font-semibold w-[100px] px-4 py-2 rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-400">
                              Inquire
                            </button>
                          </div>
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
      </div>
    </>
  );
}

export default CoursesRecommended;
