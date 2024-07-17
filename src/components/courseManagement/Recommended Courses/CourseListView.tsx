import RecommendedCoursesModel from "@/components/RecommendedCoursesModel";
import Modal from "@/components/comman/Modal";
import { Button } from "@/components/ui/button";
import { QUERY_KEYS } from "@/lib/constants";
import { RootState } from "@/redux/store";
import {
  CourseTime,
  IsOnline,
  RecommendedCourses,
} from "@/types/RecommendedCourses";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useToast } from "@/components/ui/use-toast";
import { fetchEnroll } from "@/services/apiServices/enroll";
import { ErrorType } from "@/types/Errors";
import speed from "@/assets/images/Speed.png";
import diploma from "@/assets/images/diploma.png";
import fulltime from "@/assets/images/fulltime.png";
import online from "@/assets/images/online.png";
import time from "@/assets/images/time.png";
import unversity from "@/assets/images/unversity.png";
import atu from "@/assets/images/atu.png";

function CourseListView({
  recommendeddata,
  totalData,
  currentIndex,
}: {
  recommendeddata: RecommendedCourses;
  totalData: number;
  currentIndex: number;
}) {
  const userData = useSelector((state: RootState) => state.user);
  const [isRecommendedCourse, setIsRecommendedCourseShow] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

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
        <RecommendedCoursesModel
          handleSubmit={() => handleEnrollementRequest(1)}
        />
      </Modal>

      <div>
        <div
          className={`bg-[#FFFFFF] pr-4 border border-[#D9D9D9] lg:p-5 p-4 rounded-md shadow-sm ${
            totalData && totalData - 1 === currentIndex ? "mb-0" : "mb-5"
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
                  <div className="flex gap-2">
                    <FaStar className="text-yellow-500" />
                    <span className="text-[#8C94A3] font-semibold text-sm">
                      RECOMMENDED
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap leading-[22px]">
                    {recommendeddata?.courseData?.map((item) => {
                      return (
                        <div className="flex gap-2 items-center">
                          <p
                            className={`bg-[${item?.fetchMaturity?.color}] text-[#000] py-[3px] px-[10px] rounded-full text-base font-normal font-calibri leading-[22px]`}
                          >
                            {item?.fetchPillar?.pillarName}
                          </p>
                        </div>
                      );
                    })}
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
                      src={atu}
                      alt="atu"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-1">
                    <img className=" h-[16] w-[18px]" src={speed} alt="speed" />
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
                      {recommendeddata?.time === CourseTime.FullTime && (
                        <span>Full-time</span>
                      )}
                      {recommendeddata?.time === CourseTime.PartTime && (
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
                      {recommendeddata?.isOnline === IsOnline.Online && (
                        <span>Online</span>
                      )}
                      {recommendeddata?.isOnline === IsOnline.InPerson && (
                        <span>InPerson</span>
                      )}
                      {recommendeddata?.isOnline === IsOnline.Hybrid && (
                        <span>Hybrid</span>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <img className=" h-[16] w-[18px]" src={time} alt="time" />
                    <p className="text-xs">{recommendeddata?.duration}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <img
                      className=" h-[16] w-[18px]"
                      src={unversity}
                      alt="unversity"
                    />
                    <p className="text-xs">Atlantic Technological University</p>
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
                  onClick={() => handleEnrollementRequest(recommendeddata.id)}
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
    </>
  );
}

export default CourseListView;
