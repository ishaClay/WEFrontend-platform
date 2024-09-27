/* eslint-disable @typescript-eslint/ban-ts-comment */
import speed from "@/assets/images/Speed.png";
import diploma from "@/assets/images/diploma.png";
import fulltime from "@/assets/images/fulltime.png";
import online from "@/assets/images/online.png";
import time from "@/assets/images/time.png";
import unversity from "@/assets/images/unversity.png";
import RecommendedCoursesModel from "@/components/RecommendedCoursesModel";
import Modal from "@/components/comman/Modal";
import NoDataText from "@/components/comman/NoDataText";
import { Button } from "@/components/ui/button";
import { QUERY_KEYS } from "@/lib/constants";
import { getImages } from "@/lib/utils";
import { setPath } from "@/redux/reducer/PathReducer";
import { fetchCourseDiscountEnroll } from "@/services/apiServices/enroll";
import {
  AllCourse,
  CourseTime,
  IsOnline,
  Pillarcourse,
} from "@/types/allcourses";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CohortModel from "./CohortModel";

type dataGridProps = {
  data: AllCourse[];
  selectedCourse: Pillarcourse[];
};

const CourseGridPage = ({ data, selectedCourse }: dataGridProps) => {
  const Role = location?.pathname?.split("/")[1];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isCohortShow, setIsCohortShow] = useState<null | AllCourse>(null);
  const [recommendedCoursesById, setRecommendedCoursesById] = useState<
    number | null
  >();
  const [isRecommendedCourseShow, setIsRecommendedCourseShow] = useState(false);

  useEffect(() => {
    if (!isRecommendedCourseShow) {
      setRecommendedCoursesById(null);
    }
  }, [isRecommendedCourseShow]);
  const {
    data: fetchCourseDiscountEnrollFun,
    isPending: isPendingCourseDEnroll,
  } = useQuery({
    queryKey: [
      QUERY_KEYS.fetchCourseDiscountEnroll,
      { recommendedCoursesById },
    ],
    queryFn: () => fetchCourseDiscountEnroll(recommendedCoursesById),
    enabled: !!recommendedCoursesById,
  });

  const handleClose = () => {
    setIsRecommendedCourseShow(false);
    setRecommendedCoursesById(null);
  };

  const getUpcommingCohort = (cohortData: AllCourse) => {
    function parseDate(year: string, month: string, date: string) {
      // Note: month is 0-based in JavaScript Date, so we subtract 1
      return new Date(`${year}-${month}-${date}`);
    }

    const upcomingItems =
      cohortData?.cohortGroups &&
      cohortData?.cohortGroups?.find((item) => {
        const startDate = parseDate(
          item.slotStartDate?.year,
          item.slotStartDate?.month,
          item.slotStartDate?.date
        );

        // Check if the current date is within the start and end date range
        return moment(startDate).isAfter(new Date());
      });

    const findIndex =
      upcomingItems &&
      cohortData?.cohortGroups?.findIndex(
        (slot) =>
          slot.slotStartDate.year === upcomingItems?.slotStartDate?.year &&
          slot.slotStartDate.month === upcomingItems?.slotStartDate?.month &&
          slot.slotStartDate.date === upcomingItems?.slotStartDate?.date
      );

    const upcomingData =
      cohortData?.isOnline === IsOnline["Self placed Online"]
        ? null
        : upcomingItems && upcomingItems;

    return (
      // <div className="xl:col-span-4 col-span-7 2xl:w-[265px] xl:w-auto sm:w-[270px] w-full">
      <div className="xl:col-span-4 col-span-7 w-full">
        {upcomingData && (
          <div className="customeCohortShadow rounded-[6px] p-[7px] border border-[#B6D8DF] bg-[#E4FBFF]">
            <div className="flex items-center justify-between pb-[6px]">
              <p className="text-black text-xs">
                <span className="font-medium text-xs font-droid">
                  Cohort {findIndex ? findIndex : 1} :
                </span>{" "}
              </p>
              <p
                className="text-[#4285F4] text-[10px] font-droid font-medium cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsCohortShow(cohortData);
                }}
              >
                Show all cohorts
              </p>
            </div>
            <div className="font-droid text-[10px] leading-3 text-[#000000] font-normal">
              <span>Start Date : </span>
              <span>
                {
                  // @ts-ignore
                  `${upcomingData?.slotStartDate.date
                    .toString()
                    // @ts-ignore
                    .padStart(2, "0")}/${upcomingData?.slotStartDate?.month
                    .toString()
                    // @ts-ignore
                    .padStart(2, "0")}/${upcomingData?.slotStartDate?.year}`
                }{" "}
              </span>
              <span>End Date : </span>
              <span>{
                // @ts-ignore
                `${upcomingData?.slotEndDate.date
                  .toString()
                  // @ts-ignore
                  .padStart(2, "0")}/${upcomingData?.slotEndDate?.month
                  .toString()
                  // @ts-ignore
                  .padStart(2, "0")}/${upcomingData?.slotEndDate?.year}`
              }</span>
            </div>
          </div>
        )}
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

      <Modal
        open={isRecommendedCourseShow}
        onClose={handleClose}
        className={`py-[60px] px-6 ${
          isPendingCourseDEnroll
            ? "h-[200px]"
            : fetchCourseDiscountEnrollFun?.data &&
              fetchCourseDiscountEnrollFun?.data?.length > 0
            ? "max-w-[800px] max-h-[800px] h-auto"
            : "h-[200px]"
        }`}
      >
        <RecommendedCoursesModel
          data={fetchCourseDiscountEnrollFun?.data || []}
          isLoading={isPendingCourseDEnroll}
          setOpen={setIsRecommendedCourseShow}
        />
      </Modal>

      {data?.length > 0 ? (
        data?.map((allcourse: AllCourse) => {
          const maturityLevel =
            selectedCourse.length > 0
              ? allcourse?.courseData?.find((item) =>
                  selectedCourse.find(
                    (it) => it.pillarName === item.fetchPillar?.pillarName
                  )
                )
              : null;

          return (
            <>
              <div
                className="h-full w-full border border-solid border-[#D9D9D9] rounded col-span-1"
                key={allcourse.id}
              >
                <div
                  className="relative overflow-hidden cursor-pointer"
                  onClick={() => {
                    navigate(
                      `/${Role}/employee-basic-course/${allcourse?.currentVersion?.id}`
                    );
                    dispatch(
                      setPath([
                        {
                          label: `Course Management`,
                          link: null,
                        },
                        {
                          label: `All Courses`,
                          link: `/company/allcourses`,
                        },
                        {
                          label: allcourse.title,
                          link: null,
                        },
                      ])
                    );
                  }}
                >
                  <img
                    className="w-full object-cover lg:h-[231px] h-full object-center"
                    src={allcourse?.bannerImage}
                    alt="Course"
                  />
                  <div className="flex items-center absolute bottom-[10px] left-5 w-30 bg-[#FFFFFF] rounded-full py-[6px] px-2">
                    <FaStar className="text-[#FD8E1F]" />
                    <span className="text-[#3A3A3A] font-normal font-droid text-xs mr-2 ml-1">
                      {allcourse?.courseReconmendedStatus ||
                        maturityLevel?.fetchMaturity?.maturityLevelName}
                    </span>
                  </div>
                </div>

                <div className="">
                  <div
                    onClick={() => {
                      navigate(
                        `/${Role}/employee-basic-course/${allcourse?.currentVersion?.id}`
                      );
                      dispatch(
                        setPath([
                          {
                            label: `Course Management`,
                            link: null,
                          },
                          {
                            label: `All Courses`,
                            link: `/company/allcourses`,
                          },
                          {
                            label: allcourse.title,
                            link: null,
                          },
                        ])
                      );
                    }}
                    className="md:px-5 px-3 md:py-[14px] py-3 h-[calc(100%-78px)] flex flex-col justify-between gap-3 cursor-pointer"
                  >
                    <p className="sm:text-base text-sm font-medium font-droid line-clamp-2 text-[#1D2026] sm:min-h-[50px] h-auto">
                      {allcourse.title}
                    </p>
                    <div className="h-[178px]">
                      <div className="grid sm:grid-cols-2 grid-cols-1 items-center gap-y-2 mb-5">
                        {allcourse?.courseData?.map((item) => {
                          return (
                            <div className="flex gap-2 col-span-1 items-center">
                              <img
                                className="inline-block w-[18px] h-[24px]"
                                src={getImages(
                                  item?.fetchPillar?.pillarName,
                                  true
                                )}
                                alt="Image Alt Text"
                              />
                              <p className="text-[#918A8A] text-base font-normal font-droid">
                                {item?.fetchPillar?.pillarName}
                              </p>
                            </div>
                          );
                        })}
                      </div>

                      <div className="grid grid-cols-4">
                        <div className="col-span-2 flex flex-col gap-1">
                          <div className="flex items-center gap-1 mb-[2px]">
                            <img
                              className="h-[16] w-[18px]"
                              src={speed}
                              alt="Course"
                            />
                            <p className="text-xs leading-[22px] text-[#3A3A3A]">
                              Level-
                              {allcourse?.courseData?.[0]?.fetchMaturity
                                ?.maturityLevelName || "--"}
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
                              {allcourse.duration || "--"}
                            </p>
                          </div>
                        </div>

                        <div className="col-span-2 flex flex-col gap-1">
                          <div className="flex items-center gap-1 mb-[2px]">
                            <img
                              className=" h-[16] w-[18px] text-black"
                              src={diploma}
                              alt="Course"
                            />
                            <p className="text-xs leading-[22px] text-[#3A3A3A] line-clamp-2">
                              {allcourse.otherInstitutionName || "--"}
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
                              {allcourse.isOnline === IsOnline["In-Person"] && (
                                <span>In person</span>
                              )}
                              {allcourse.isOnline === IsOnline.Hybrid && (
                                <span>Hybrid</span>
                              )}
                              {allcourse.isOnline ===
                                IsOnline["Self placed Online"] && (
                                <span>Self placed Online</span>
                              )}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 mb-[2px]">
                            <img
                              className=" h-[16] w-[18px]"
                              src={unversity}
                              alt="Course"
                            />
                            <p className="text-xs leading-[22px] text-[#3A3A3A] line-clamp-2">
                              Atlantic Technological University
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t py-3 px-[8px] grid grid-cols-7 xl:items-center items-start xl:gap-0 gap-3">
                    {getUpcommingCohort(allcourse)}
                    <div className="2xl:col-span-3 xl:col-span-3 col-span-5 xl:mr-0 xl:ml-auto m-0">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsRecommendedCourseShow(true);
                          setRecommendedCoursesById(allcourse?.id);
                        }}
                        className="  bg-[#64A70B] hover:bg-[#64A70B] text-white px-4 py-2 rounded w-[100px] h-[42px]"
                        disabled={
                          allcourse?.isOnline === IsOnline["Self placed Online"]
                            ? false
                            : (allcourse?.enrolled && // @ts-ignore
                                allcourse?.enrolledStatus === 1) ||
                              (allcourse?.enrolled &&
                                // @ts-ignore
                                allcourse?.enrolledStatus === 0) ||
                              !getUpcommingCohort(allcourse)?.props?.children
                        }
                      >
                        Enroll Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })
      ) : (
        <NoDataText message="No Course Data Found" />
      )}
    </>
  );
};

export default CourseGridPage;
