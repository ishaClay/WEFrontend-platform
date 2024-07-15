import RecommendedCoursesModel from "@/components/RecommendedCoursesModel";
import Loader from "@/components/comman/Loader";
import Modal from "@/components/comman/Modal";
import { Button } from "@/components/ui/button";
import { QUERY_KEYS } from "@/lib/constants";
import { RootState } from "@/redux/store";
import {
  fetchRecommendedCourses,
} from "@/services/apiServices/recommendedcourses";
import { CourseTime, IsOnline } from "@/types/RecommendedCourses";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { AiOutlineAppstore, AiOutlineBars } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import speed from "@/assets/images/Speed.png";
import diploma from "@/assets/images/diploma.png";
import fulltime from "@/assets/images/fulltime.png";
import online from "@/assets/images/online.png";
import time from "@/assets/images/time.png";
import unversity from "@/assets/images/unversity.png";
import atu from "@/assets/images/atu.png";
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
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.fetchbyrecommendedcourse] });
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
  console.log('course++', course);
  

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
      <div className="bg-[#f5f3ff] mt-4">
        <div className="h-full">
          <div className="bg-[#FFFFFF] rounded-xl h-full">
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
            {pending ? (
              <Loader />
            ) : recommendedcourses?.data ? (
              recommendedcourses?.data?.map((recommendedcourses) => (
                <div key={recommendedcourses.id}>
                  <div className="h-[175px] bg-[#FFFFFF] flex  border border-[#D9D9D9] m-[12px] rounded-md shadow-sm">
                    <div className=" pt-[22px] pl-[22px]  overflow-hidden rounded">
                      <img
                        className=" w-[152px] h-[133px] rounded object-cover object-center "
                        src={recommendedcourses.bannerImage}
                        alt="Course"
                      />
                    </div>

                    <div className="flex flex-col mt-[22px] ml-[22px] ">
                      <div>
                        <div className="flex items-center  ">
                          <FaStar className="text-yellow-500" />
                          <span className="text-[#8C94A3] font-semibold text-sm mr-2 ml-1">
                            RECOMMENDED
                          </span>
                          <span className="bg-[#FFD56A] text-[#3A3A3A] font-semibold text-xs py-1 px-2 rounded-full">
                            Technology & Innovation
                          </span>
                          <span className="bg-[#D6F5AC] text-[#000000] font-semibold text-xs py-1 px-2 rounded-full ml-2">
                            Social
                          </span>
                        </div>
                      </div>

                      <div className="flex ">
                        <div
                          className="h-[44px] w-[378.08px] mt-[16px]"
                          style={{
                            fontFamily: "Inter",
                            fontSize: "16px",
                            fontWeight: 500,
                            lineHeight: "22px",
                            textAlign: "left",
                          }}
                        >
                          <span dangerouslySetInnerHTML={{ __html: recommendedcourses?.description }} className="line-clamp-2"></span>
                        </div>

                        <div className="ml-[200px]">
                          <img
                            className=" h-[48px] w-[162.74px] object-cover object-center"
                            src={atu}
                            alt="atu"
                          />
                        </div>
                      </div>

                      <div className="flex mt-[25px]">
                        <div className="h-[22px] w-[129px] flex items-center gap-1">
                          <img
                            className=" h-[16] w-[18px]"
                            src={speed}
                            alt="speed"
                          />
                          <p className="text-xs">Level- Advanced</p>
                        </div>

                        <div className="h-[22px] w-[160px] flex items-center gap-1">
                          <img
                            className=" h-[16] w-[18px] text-black"
                            src={diploma}
                            alt="diploma"
                          />
                          <p className="text-xs">Post Graduate Diploma</p>
                        </div>
                        <div className="h-[22px] w-[80px] flex items-center gap-1">
                          <img
                            className=" h-[16] w-[18px]"
                            src={fulltime}
                            alt="fulltime"
                          />
                          <p className="text-xs">
                            {recommendedcourses.time ===
                              CourseTime.FullTime && <span>Full-time</span>}
                            {recommendedcourses.time ===
                              CourseTime.PartTime && <span>Part-time</span>}
                          </p>
                        </div>
                        <div className="h-[22px] w-[75px] flex items-center gap-1">
                          <img
                            className=" h-[16] w-[18px]"
                            src={online}
                            alt="online"
                          />
                          <p className="text-xs">
                            {recommendedcourses.isOnline ===
                              IsOnline.Online && <span>Online</span>}
                            {recommendedcourses.isOnline ===
                              IsOnline.InPerson && <span>InPerson</span>}
                            {recommendedcourses.isOnline ===
                              IsOnline.Hybrid && <span>Hybrid</span>}
                          </p>
                        </div>
                        <div className="h-[22px] w-[80px] flex items-center gap-1">
                          <img
                            className=" h-[16] w-[18px]"
                            src={time}
                            alt="time"
                          />
                          <p className="text-xs">
                            {recommendedcourses.duration}
                          </p>
                        </div>
                        <div className="h-[22px] w-[200px] flex items-center gap-1">
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
                    <div>
                      <div className="flex flex-col ">
                        <div>
                          <h3 className="text-[#000000] text-[font-calibri-bold] ml-[97px] mt-[20px]">
                            €{recommendedcourses.price}
                          </h3>
                        </div>
                        <Button
                          onClick={() =>
                            handleEnrollementRequest(recommendedcourses.id)
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
              ))
            ) : (
              <p className="text-[20px] font-calibri font-[500] h-[300px] flex items-center justify-center">
                {recommendedcourses?.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CoursesRecommended;
