/* eslint-disable @typescript-eslint/ban-ts-comment */
import Loader from "@/components/comman/Loader";
import Modal from "@/components/comman/Modal";
import { toast } from "@/components/ui/use-toast";
import { useAppSelector } from "@/hooks/use-redux";
import { fetchEnroll } from "@/services/apiServices/enroll";
import { AllCourse, CourseTime, IsOnline } from "@/types/allcourses";
import { useMutation } from "@tanstack/react-query";
import moment from "moment";
import { useState } from "react";
import { FaStar } from "react-icons/fa6";
import CohortModel from "./CohortModel";

type dataGridProps = {
  data: AllCourse[];
};

const CourseGridPage = ({ data }: dataGridProps) => {
  const user = useAppSelector((state) => state.user);
  const [isCohortShow, setIsCohortShow] = useState<null | AllCourse>(null);
  const { mutate: enrollRequest, isPending } = useMutation({
    mutationFn: fetchEnroll,
    onSuccess: (data) => {
      toast({
        variant: "success",
        title: data?.data?.message,
      });
    },
    onError: (data) => {
      toast({
        variant: "destructive",
        title: data?.message,
      });
    },
  });
  const handleEnroll = (id: number, trainerId: number) => {
    enrollRequest({
      courseId: id,
      userId: parseInt(user.UserId),
      trainerId: trainerId,
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
    const number = parseInt(duration[0]) || 0;
    const unit = duration[1] || "days";
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
        className="col-span-5 customeCohortShadow rounded-[6px] p-[7px] mr-[7px] border border-[#B6D8DF] bg-[#E4FBFF]"
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
        return (
          <>
            <div
              className="h-full w-full border border-solid border-[#D9D9D9] rounded col-span-1"
              key={allcourse.id}
            >
              <div className="relative overflow-hidden h-[231px]">
                <img
                  className="object-cover object-center"
                  src="/public/assets/img/nature.png"
                  alt="Course"
                />
                <input
                  type="checkbox"
                  className="absolute top-0 right-0 mt-2 mr-2 h-[23px] w-[24px]"
                />
                <div className="flex items-center absolute bottom-[10px] left-5 w-30 bg-[#FFFFFF] rounded-full py-[6px] px-2">
                  <FaStar className="text-[#FD8E1F]" />
                  <span className="text-[#3A3A3A] font-normal font-Poppins text-xs mr-2 ml-1">
                    Advanced
                  </span>
                </div>
              </div>

              <div>
                <div className="px-3 py-[14px]">
                  <p className="text-base font-medium leading-[22px] font-inter mb-3 line-clamp-3 text-[#1D2026]">
                    {allcourse.title}
                  </p>

                  <div>
                    <div className="grid grid-cols-5 mb-3">
                      <div className="col-span-2 flex items-center gap-1 leading-[22px]">
                        <img
                          className="inline-block w-[18px] h-[24px]"
                          src="/public/assets/img/abc.png"
                          alt="Image Alt Text"
                        />
                        <p className="text-[#918A8A] text-base font-normal font-calibri leading-[22px]">
                          Social
                        </p>
                      </div>
                      <div className="col-span-3 flex items-center gap-1 leading-[22px]">
                        <img
                          className="inline-block w-[20px] h-[23px]"
                          src="/public/assets/img/def.png"
                          alt="Image Alt Text"
                        />
                        <p className="text-[#918A8A] text-base font-normal font-calibri">
                          {allcourse?.courseData?.[0]?.fetchPillar?.pillarName}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-5">
                      <div className="gap-2 mb-2 col-span-2">
                        <div className="flex items-center gap-1 mb-[2px]">
                          <img
                            className="h-[16] w-[18px]"
                            src="/public/assets/img/timer.png"
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
                            src="/public/assets/img/fulltime.png"
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
                            src="/public/assets/img/time.png"
                            alt="Course"
                          />
                          <p className="text-xs leading-[22px] text-[#3A3A3A]">
                            {allcourse.duration}
                          </p>
                        </div>
                      </div>

                      <div className="gap-2 mb-2 col-span-3">
                        <div className="flex items-center gap-1 mb-[2px]">
                          <img
                            className=" h-[16] w-[18px] text-black"
                            src="/public/assets/img/diploma.png"
                            alt="Course"
                          />
                          <p className="text-xs leading-[22px] text-[#3A3A3A]">
                            {allcourse.otherInstitutionName}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 mb-[2px]">
                          <img
                            className=" h-[16] w-[18px]"
                            src="/public/assets/img/online.png"
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
                            src="/public/assets/img/unversity.png"
                            alt="Course"
                          />
                          <p className="text-xs leading-[22px] text-[#3A3A3A]">
                            Atlantic Technological University
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t py-[13px] px-[8px] grid grid-cols-7 items-center">
                  {getUpcommingCohort(allcourse)}
                  <div className="col-span-2 mr-0 ml-auto">
                    <button
                      disabled={
                        allcourse?.courseAlloted.some(
                          (item) =>
                            item.user.id === +user.UserId &&
                            item.course.id === allcourse?.id
                        )
                          ? true
                          : false
                      }
                      onClick={() =>
                        handleEnroll(
                          allcourse?.id,
                          allcourse?.trainerId !== null
                            ? allcourse?.trainerId?.id
                            : allcourse?.trainerCompanyId?.id
                        )
                      }
                      className="2xl:px-[14px] px-[10px] py-[10px] bg-[#64A70B] text-white rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-400 text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#64A70B]"
                    >
                      {isPending ? (
                        <Loader containerClassName="h-auto" />
                      ) : (
                        "Enroll Now"
                      )}
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

export default CourseGridPage;
