import { FaStar } from "react-icons/fa";
import { MdOutlineGroup } from "react-icons/md";
// import { Course } from "@/types/Course";
// import { useSelector } from "react-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";

import CoursesViewAllocatePopup from "./CoursesViewAllocatePopup";
// import { RootState } from "@/redux/store";
import Loader from "@/components/comman/Loader";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getImages } from "@/lib/utils";
import { fetchAllocatedCourse } from "@/services/apiServices/allocatedcourse";
import {
  CourseTime,
  EnrollmentRequestsResponse,
  IsOnline,
} from "@/types/allocatedcourses";
import { AvatarImage } from "@radix-ui/react-avatar";
import { useState } from "react";
import courseIcon from "@/assets/svgs/cource.svg";
import duration from "@/assets/svgs/duration.svg";
import institute from "@/assets/svgs/institute.svg";
import online from "@/assets/svgs/online.svg";
import time from "@/assets/svgs/time.svg";
import speed from "@/assets/images/Speed.png";
import { Button } from "@/components/ui/button";

function CoursesAllocate() {
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [openId, setOpenId] = useState<number | null>(null);
  const { data: course, isPending } = useQuery<EnrollmentRequestsResponse>({
    queryKey: [QUERY_KEYS.fetchbycourseallocate],
    queryFn: () => fetchAllocatedCourse(userData?.query?.id),
  });

  return (
    <div className="bg-[#f5f3ff]">
      <div className="p-3">
        <div className="bg-[#FFFFFF] h-full rounded-[10px] overflow-auto">
          <div className=" pt-[10px] pl-[30px] h-[60px] bg-[#FFFFFF] border-b border-[#D9D9D9] rounded-t-[50px]">
            <div className="flex items-center justify-between ">
              <h1 className="text-[16px] font-semibold">Course Allocation</h1>
              <div className="flex items-center">
                <label htmlFor="filter" className="mr-2">
                  Filter by:
                </label>
                <select
                  id="filter"
                  className="border w-[264px] h-[42px] rounded mb- mr-2 "
                >
                  <option value="">Select</option>
                  <option value="Completed">Completed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>
          </div>

          {isPending ? (
            <Loader />
          ) : (
            course?.data?.courseAlloted && course?.data?.courseAlloted?.length > 0 ? course?.data?.courseAlloted?.map((courseallocate) => {
              return (
                <>
                  <div key={courseallocate.id} className="p-4">
                    <div className="p-5 bg-[#FFFFFF] flex justify-between items-center border [&:not(:last-child)]:mb-5 border-[#D9D9D9] rounded-md shadow-sm">
                      <div className="flex gap-[17px] w-[calc(100%-150px)]">
                        <div className="overflow-hidden rounded">
                        <img
                          src={courseallocate?.courseVersion?.course?.bannerImage}
                          alt="img"
                          className="w-[152px] xl:h-[152px] h-[100px] rounded-md"
                        />
                        </div>

                        <div className="flex flex-col w-[calc(100%-300px)]">
                          <div>
                            <div className="flex items-center mt-[10px] ml-[2px] gap-4">
                              <div className="flex items-center gap-4">
                                <FaStar className="text-[#FD8E1F]" />
                                <span className="text-[#8C94A3] font-semibold leading-[22px] text-sm mt-0.5 ml-1">
                                  RECOMMENDED
                                </span>
                              </div>
                              <p className="flex items-center gap-4">
                                <img
                                  className="w-[18px]"
                                  src={getImages("Social", false)}
                                  alt="Image Alt Text"
                                />
                                Social
                              </p>
                              <p className="flex items-center gap-4">
                                <img
                                  className="w-[20px]"
                                  src={getImages(
                                    "Technology & Innovation",
                                    false
                                  )}
                                  alt="Image Alt Text"
                                />
                                Technology & Innovation
                              </p>
                              <div className="flex items-center gap-4">
                                <FaStar className="text-[#FBBC04] w-[12px] h-[11px]" />
                                <span className="text-[black] font-bold text-sm mt-0.5">
                                  4.5
                                </span>
                              </div>
                              <div className="flex items-center gap-4">
                                <MdOutlineGroup />
                                <p className="text-[#A3A3A3] text-[13px]">
                                  {course?.data?.employee?.length || 0} Employee
                                </p>
                              </div>
                            </div>
                          </div>

                          <div
                            className="mt-[18px]"
                            style={{
                              fontFamily: "Inter",
                              fontSize: "16px",
                              fontWeight: 500,
                              lineHeight: "22px",
                              textAlign: "left",
                            }}
                          >
                            <span dangerouslySetInnerHTML={{ __html: courseallocate?.courseVersion?.course?.description || "" }} className="line-clamp-2"></span>
                          </div>

                          <div className="flex items-center gap-4 mt-[17px]">
                            <div className="flex items-center gap-1">
                              <img
                                className=" h-[16] w-[18px]"
                                src={speed}
                                alt="Course"
                              />
                              <p className="text-xs">Level- Advanced</p>
                            </div>

                            <div className="flex items-center gap-1">
                              <img
                                className=" h-[16] w-[18px] text-black"
                                src={courseIcon}
                                alt="Course"
                              />
                              <p className="text-xs">Post Graduate Diploma</p>
                            </div>
                            <div className="flex items-center gap-1">
                              <img
                                className=" h-[16] w-[18px]"
                                src={time}
                                alt="time"
                              />
                              <p className="text-xs">
                                {courseallocate?.courseVersion.course.time ===
                                  CourseTime.FullTime && <span>Full-time</span>}
                                {courseallocate?.courseVersion.course.time ===
                                  CourseTime.PartTime && <span>Part-time</span>}
                              </p>
                            </div>
                            <div className="flex items-center gap-1">
                              <img
                                className=" h-[16] w-[18px]"
                                src={online}
                                alt="type"
                              />
                              <p className="text-xs">
                                {courseallocate?.courseVersion.course
                                  .isOnline === IsOnline.Online && (
                                  <span>Online</span>
                                )}
                                {courseallocate?.courseVersion.course
                                  .isOnline === IsOnline.InPerson && (
                                  <span>InPerson</span>
                                )}
                                {courseallocate?.courseVersion.course
                                  .isOnline === IsOnline.Hybrid && (
                                  <span>Hybrid</span>
                                )}
                                {courseallocate?.courseVersion.course
                                  .isOnline === IsOnline.Major && (
                                  <span>Major</span>
                                )}
                              </p>
                            </div>
                            <div className="flex items-center gap-1">
                              <img
                                className=" h-[16] w-[18px]"
                                src={duration}
                                alt="Duration"
                              />
                              <p className="text-xs">
                                {courseallocate?.courseVersion.course.duration}
                              </p>
                            </div>
                            <div className="flex items-center gap-1">
                              <img
                                className=" h-[16] w-[18px]"
                                src={institute}
                                alt="institute"
                              />
                              <p className="text-xs">
                                {courseallocate?.courseVersion.course.institute}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-[-10px] mt-[10px]">
                            {courseallocate?.employee &&
                              courseallocate?.employee?.length > 0 &&
                              courseallocate?.employee?.slice(0, 5)?.map((avatar, index: number) => {
                                  const color = [
                                    "#cbd5e1",
                                    "#bae6fd",
                                    "#9ca3af",
                                    "#bae6fd",
                                    "#9ca3af",
                                  ];
                                  return (
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Avatar key={index}>
                                            <AvatarImage
                                              src={
                                                avatar?.profileImage as string
                                              }
                                              alt="Avatar"
                                            />
                                            <AvatarFallback
                                              delayMs={600}
                                              style={{
                                                backgroundColor: color[index],
                                              }}
                                            >
                                              12{avatar?.name?.charAt(0)}
                                            </AvatarFallback>
                                          </Avatar>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>{avatar?.name}</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  );
                                })}
                            {courseallocate?.employee &&
                              courseallocate?.employee?.length > 3 && (
                                <div className="w-10 h-10 rounded-full bg-[#00778B] flex justify-center items-center text-[white]">
                                  +
                                  {Math.max(
                                    0,
                                    courseallocate?.employee.length - 5
                                  )}
                                </div>
                              )}
                          </div>
                        </div>
                      </div>
                      <Button
                        className="bg-[#64A70B] 2xl:px-7 px-3 xl:py-5 py-1 2xl:mx-2 mx-1 xl:my-0 my-1"
                        onClick={() => {setPopupOpen(true); setOpenId(courseallocate?.id)}}
                      >
                        View Allocation
                      </Button>
                    </div>
                  </div>

                  {/* {totalPages > 1 && (
                      <div className="ml-[1000px] mt-[20px]">
                        <Pagination>
                          <PaginationContent>
                            <PaginationItem>
                              <PaginationPrevious
                                onClick={() =>
                                  handlePaginationChange(currentPage - 1)
                                }
                              />
                            </PaginationItem>
                            {[...Array(totalPages)].map((_, index) => (
                              <PaginationItem key={index}>
                                <PaginationLink
                                  onClick={() =>
                                    handlePaginationChange(index + 1)
                                  }
                                >
                                  {index + 1}
                                </PaginationLink>
                              </PaginationItem>
                            ))}
                            <PaginationItem>
                              <PaginationNext
                                onClick={() =>
                                  handlePaginationChange(currentPage + 1)
                                }
                              />
                            </PaginationItem>
                          </PaginationContent>
                        </Pagination>
                      </div>
                    )} */}
                </>
              );
            }) : <span className="text-center h-[calc(100vh-250px)] flex items-center justify-center text-xl text-neutral-400">No data found</span>
          )}
        </div>
      </div>
      <CoursesViewAllocatePopup
        isOpen={isPopupOpen}
        onClose={() => {
          setPopupOpen(false);
          setOpenId(null);
        }}
        openId={openId}
      />
    </div>
  );
}
export default CoursesAllocate;
