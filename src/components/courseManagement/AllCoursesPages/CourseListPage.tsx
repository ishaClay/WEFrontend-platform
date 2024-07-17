/* eslint-disable @typescript-eslint/ban-ts-comment */
import lightOn from "@/assets/images/LightOn.png";
import neighbour from "@/assets/images/Neighbour.png";
import speed from "@/assets/images/Speed.png";
import diploma from "@/assets/images/diploma.png";
import fulltime from "@/assets/images/fulltime.png";
import online from "@/assets/images/online.png";
import time from "@/assets/images/time.png";
import unversity from "@/assets/images/unversity.png";
import Modal from "@/components/comman/Modal";
import { toast } from "@/components/ui/use-toast";
import { useAppSelector } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { fetchEnroll } from "@/services/apiServices/enroll";
import { ErrorType } from "@/types/Errors";
import { RecommendedCourses } from "@/types/RecommendedCourses";
import {
  AllCourse,
  CourseTime,
  IsOnline,
  Pillarcourse,
} from "@/types/allcourses";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { useState } from "react";
import { FaStar } from "react-icons/fa6";
import CohortModel from "./CohortModel";

type dataGridProps = {
  data: AllCourse[];
  reCommendedCourses: RecommendedCourses[];
  selectedCourse: Pillarcourse | null;
};

const CourseListPage = ({
  data,
  reCommendedCourses,
  selectedCourse,
}: dataGridProps) => {
  const { CompanyId } = useAppSelector((state) => state.user);
  const [isCohortShow, setIsCohortShow] = useState<null | AllCourse>(null);
  const queryClient = useQueryClient();
  const { mutate: enrollRequest } = useMutation({
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

  const handleEnroll = (id: number) => {
    enrollRequest({
      versionId: id,
      companyId: +CompanyId,
    });
  };

  const getUpcommingCohort = (cohortData: AllCourse) => {
    const currentDate = new Date();
    const formattedCurrentDate = {
      date: String(currentDate.getDate()).padStart(2, "0"),
      month: String(currentDate.getMonth() + 1).padStart(2, "0"),
      year: String(currentDate.getFullYear()),
    };

    const duration = cohortData?.duration?.split(" ");
    const number = parseInt(duration?.[0]) || 0;
    const unit = duration?.[1] || "days";
    // @ts-ignore
    const courseEndDate = moment(currentDate).add(number, unit);

    const matchingSlot =
      cohortData?.cohortGroups?.length > 0 &&
      cohortData?.cohortGroups?.find(
        (slot) =>
          parseInt(slot.slotStartDate.year) > +formattedCurrentDate.year ||
          (parseInt(slot.slotStartDate.year) === +formattedCurrentDate.year &&
            parseInt(slot.slotStartDate.month) > +formattedCurrentDate.month) ||
          (parseInt(slot.slotStartDate.year) === +formattedCurrentDate.year &&
            parseInt(slot.slotStartDate.month) ===
              +formattedCurrentDate.month &&
            parseInt(slot.slotStartDate.date) > +formattedCurrentDate.date)
      );

    const findIndex =
      matchingSlot &&
      cohortData?.cohortGroups?.findIndex(
        (slot) =>
          slot.slotStartDate.year === matchingSlot.slotStartDate.year &&
          slot.slotStartDate.month === matchingSlot.slotStartDate.month &&
          slot.slotStartDate.date === matchingSlot.slotStartDate.date
      );

    const upcomingData = matchingSlot
      ? matchingSlot
      : {
          slotStartDate: {
            date: moment(currentDate).format("DD"),
            month: moment(currentDate).format("MM"),
            year: moment(currentDate).format("YYYY"),
          },
          slotEndDate: {
            date: moment(courseEndDate).format("DD"),
            month: moment(courseEndDate).format("MM"),
            year: moment(courseEndDate).format("YYYY"),
          },
        };

    console.log("upcomingData", upcomingData, findIndex);

    return (
      <div
        className="col-span-5 customeCohortShadow rounded-[6px] p-[7px] mr-[7px] border border-[#B6D8DF] bg-[#E4FBFF] w-[300px]"
        onClick={() => setIsCohortShow(cohortData)}
      >
        <div className="flex items-center justify-between pb-[6px]">
          <p className="text-black text-xs">
            <span className="font-medium text-xs font-inter">
              Cohort {findIndex ? findIndex : 1} :
            </span>{" "}
          </p>
          <p className="text-[#4285F4] text-[10px] font-inter font-medium">
            Show all cohort
          </p>
        </div>
        <div className="font-inter text-[10px] leading-3 text-[#000000] font-normal">
          <span>Start Date : </span>
          <span>
            {`${upcomingData.slotStartDate.date
              .toString()
              .padStart(2, "0")}/${upcomingData?.slotStartDate?.month
              .toString()
              .padStart(2, "0")}/${upcomingData?.slotStartDate?.year}`}{" "}
          </span>
          <span>End Date : </span>
          <span>{`${upcomingData.slotEndDate.date
            .toString()
            .padStart(2, "0")}/${upcomingData?.slotEndDate?.month
            .toString()
            .padStart(2, "0")}/${upcomingData?.slotEndDate?.year}`}</span>
        </div>
      </div>
    );
  };

  return (
    <>
      <Modal
        open={!!isCohortShow}
        onClose={() => setIsCohortShow(null)}
        className="w-[560px]"
      >
        <CohortModel isCohortShow={isCohortShow} />
      </Modal>
      {data?.map((allcourse: AllCourse) => {
        const maturityLevel =
          selectedCourse &&
          allcourse?.courseData?.find(
            (item) =>
              item.fetchPillar?.pillarName === selectedCourse?.pillarName
          );
        return (
          <>
            <div
              className="h-full w-full border border-solid border-[#D9D9D9] rounded grid grid-cols-8 items-center mb-6 xl:gap-8 gap-0"
              key={allcourse.id}
            >
              <div className="xl:col-span-2 col-span-3">
                <div className="flex items-center">
                  <div className="relative overflow-hidden w-full max-h-[221px] max-w-[356px]">
                    <img
                      className="object-cover object-center w-full h-full"
                      src={allcourse?.bannerImage}
                      alt="Course"
                    />
                    <input
                      type="checkbox"
                      className="absolute top-0 right-0 mt-2 mr-2 h-[23px] w-[24px]"
                    />
                    <div className="flex items-center absolute bottom-[10px] left-5 w-30 bg-[#FFFFFF] rounded-full py-[6px] px-2">
                      <FaStar className="text-[#FD8E1F]" />
                      <span className="text-[#3A3A3A] font-normal font-Poppins text-xs mr-2 ml-1">
                        {maturityLevel?.fetchMaturity?.maturityLevelName}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="xl:col-span-6 col-span-5 xl:flex items-center xl:justify-between justify-center">
                <div className="xl:text-left text-center">
                  <p className="text-base font-medium leading-[22px] font-inter xl:mb-3 line-clamp-3 text-[#1D2026]">
                    {allcourse.title}
                  </p>

                  <div>
                    <div className="flex items-center xl:justify-start justify-center gap-5 xl:mb-3">
                      <div className="flex items-center gap-1 leading-[22px]">
                        <img
                          className="inline-block w-[20px] h-[23px]"
                          src={lightOn}
                          alt="Image Alt Text"
                        />
                        <p className="text-[#918A8A] text-base font-normal font-calibri">
                          {allcourse?.courseData?.[0]?.fetchPillar?.pillarName}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 mb-[2px]">
                        <img
                          className=" h-[16] w-[18px] text-black"
                          src={diploma}
                          alt="Course"
                        />
                        <p className="text-xs leading-[22px] text-[#3A3A3A]">
                          {allcourse.otherInstitutionName}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 mb-[2px]">
                        <img
                          className=" h-[16] w-[18px]"
                          src={online}
                          alt="Course"
                        />
                        <p className="text-xs leading-[22px] text-[#3A3A3A]">
                          {allcourse.isOnline === IsOnline.Online && (
                            <span>Online</span>
                          )}
                          {allcourse.isOnline === IsOnline.InPerson && (
                            <span>InPerson</span>
                          )}
                          {allcourse.isOnline === IsOnline.Hybrid && (
                            <span>Hybrid</span>
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 mb-[2px]">
                        <img
                          className=" h-[16] w-[18px]"
                          src={unversity}
                          alt="Course"
                        />
                        <p className="text-xs leading-[22px] text-[#3A3A3A]">
                          Atlantic Technological University
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center xl:justify-start justify-center gap-5">
                      <div className="flex items-center gap-1 leading-[22px]">
                        <img
                          className="inline-block w-[18px] h-[24px]"
                          src={neighbour}
                          alt="Image Alt Text"
                        />
                        <p className="text-[#918A8A] text-base font-normal font-calibri leading-[22px]">
                          Social
                        </p>
                      </div>
                      <div className="flex items-center gap-1 mb-[2px]">
                        <img
                          className="h-[16] w-[18px]"
                          src={speed}
                          alt="Course"
                        />
                        <p className="text-xs leading-[22px] text-[#3A3A3A]">
                          Level-
                          {
                            allcourse?.courseData?.[0]?.fetchMaturity
                              ?.maturityLevelName
                          }
                        </p>
                      </div>
                      <div className="flex items-center gap-1 mb-[2px]">
                        <img
                          className=" h-[16] w-[18px]"
                          src={fulltime}
                          alt="Course"
                        />
                        <p className="text-xs leading-[22px] text-[#3A3A3A]">
                          {allcourse.time === CourseTime.FullTime && (
                            <span>Full-time</span>
                          )}
                          {allcourse.time === CourseTime.PartTime && (
                            <span>Part-time</span>
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 mb-[2px]">
                        <img
                          className=" h-[16] w-[18px]"
                          src={time}
                          alt="Course"
                        />
                        <p className="text-xs leading-[22px] text-[#3A3A3A]">
                          {allcourse.duration}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="xl:py-[13px] pb-0 pt-[13px]  xl:px-9 px-0 items-center xl:border-l xl:border-[#DDD]">
                  {getUpcommingCohort(allcourse)}
                  <div className="xl:text-right text-center mt-3">
                    <button
                      onClick={() =>
                        handleEnroll(allcourse?.currentVersion?.id)
                      }
                      disabled={
                        reCommendedCourses?.some(
                          (item) => item?.id === allcourse?.id
                        )
                          ? true
                          : false
                      }
                      className="2xl:px-[14px] xl:p-[10px] py-1 px-2 bg-[#64A70B] text-white rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-400 text-base"
                    >
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};

export default CourseListPage;
