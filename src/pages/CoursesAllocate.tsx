import { MdOutlineGroup } from "react-icons/md";
import HeaderCourse from "@/components/HeaderCourse";
import { FaStar } from "react-icons/fa";
import avatar1 from "/public/assets/img/face1.jpg";
import avatar2 from "/public/assets/img/face2.jpg";
import avatar3 from "/public/assets/img/face3.jpg";
import avatar4 from "/public/assets/img/face1.jpg";
import avatar5 from "/public/assets/img/face2.jpg";
import avatar6 from "/public/assets/img/face3.jpg";
import avatar7 from "/public/assets/img/face1.jpg";
import avatar8 from "/public/assets/img/face2.jpg";
import avatar9 from "/public/assets/img/face3.jpg";
import avatar10 from "/public/assets/img/face3.jpg";
import avatar11 from "/public/assets/img/face3.jpg";
import avatar12 from "/public/assets/img/face3.jpg";
import avatar13 from "/public/assets/img/face3.jpg";
import avatar14 from "/public/assets/img/face3.jpg";
import EmployeeListSidebar from "@/components/EmployeeListSidebar";
// import { Course } from "@/types/Course";
// import { useSelector } from "react-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";

import CoursesViewAllocatePopup from "./CoursesViewAllocatePopup";
// import { RootState } from "@/redux/store";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";
import { fetchAllocatedCourse } from "@/services/apiServices/allocatedcourse";
import {
  AllocatedCourse,
  CourseTime,
  IsOnline,
} from "@/types/allocatedcourses";

function CoursesAllocate() {
  const avatars = [
    avatar1,
    avatar2,
    avatar3,
    avatar4,
    avatar5,
    avatar6,
    avatar7,
    avatar8,
    avatar9,
    avatar10,
    avatar11,
    avatar12,
    avatar13,
    avatar14,
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(0);

  const handlePaginationChange = (page: number) => {
    setCurrentPage(page);
    // refetch();
  };

  // const { data: courseallocate, refetch } = useQuery({
  const { data: courseallocate } = useQuery({
    queryKey: [QUERY_KEYS.fetchbycourseallocate],
    // queryFn: () => fetchAllocatedCourse(currentPage),
    queryFn: () => fetchAllocatedCourse(),
  });

  const [isPopupOpen, setPopupOpen] = useState(false);

  const openPopup = () => {
    setPopupOpen(true);
  };

  // const closePopup = () => {
  //   setPopupOpen(false);
  // };
  return (
    <div className="flex bg-[#f5f3ff] w-[1510px] h-[1708px]  overflow-hidden">
      <div className="">
        <EmployeeListSidebar />
      </div>
      <div className="flex flex-col  ">
        <div className="">
          <HeaderCourse />
        </div>

        <div className="bg-[#FFFFFF] w-[1250px] h-[1669px] m-[12px] rounded-[10px]">
          <div className=" pt-[10px] pl-[30px] w-[1250px] h-[60px] bg-[#FFFFFF] border-b border-[#D9D9D9] rounded-t-[50px]">
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

          {courseallocate?.data?.data?.map(
            (courseallocate: AllocatedCourse) => {
              return (
                <>
                  <div key={courseallocate.id}>
                    <div className="w-[1226px] h-[230px] bg-[#FFFFFF] flex border border-[#D9D9D9] m-[12px] rounded-md shadow-sm">
                      <div className="pt-[22px] pl-[22px] overflow-hidden rounded">
                        <img
                          className="w-[152px] h-[133px] rounded object-cover object-center"
                          src={courseallocate.course.bannerImage}
                          alt="Course"
                        />
                      </div>

                      <div className="flex flex-col mt-[15px] ml-[22px]">
                        <div>
                          <div className="flex items-center mt-[10px] ml-[2px]">
                            <FaStar className="text-[#FD8E1F]" />
                            <span className="text-[#8C94A3] font-semibold text-sm mr-2 ml-1">
                              RECOMMENDED
                            </span>
                            <p className="ml-[10px]">
                              <img
                                className="inline-block ml-1 w-[18px] h-[23px] mr-[10px]"
                                src="/public/assets/img/abc.png"
                                alt="Image Alt Text"
                              />
                              Social
                            </p>
                            <p className="ml-[10px]">
                              <img
                                className="inline-block ml-1 w-[18px] h-[23px] mr-[10px]"
                                src="/public/assets/img/def.png"
                                alt="Image Alt Text"
                              />
                              Technology & Innovation
                            </p>
                            <FaStar className="text-[#FBBC04] w-[12px] h-[11px] ml-[20px]" />
                            <span className="text-[black] font-bold text-sm mr-2 ml-1">
                              4.5
                            </span>
                            <MdOutlineGroup className="w-[12px] h-[11px] ml-[20px]" />
                            <p className="ml-[10px] text-[#A3A3A3] text-[13px]">
                              15 Employee
                            </p>
                          </div>
                        </div>

                        <div className="flex ">
                          <div
                            className="h-[44px] w-[390.08px] mt-[16px]"
                            style={{
                              fontFamily: "Inter",
                              fontSize: "16px",
                              fontWeight: 500,
                              lineHeight: "22px",
                              textAlign: "left",
                            }}
                          >
                            <p className="font-bold text-[16px]">
                              {courseallocate.course.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex mt-[25px]  ">
                          <div className="h-[22px] w-[129px] flex items-center gap-1">
                            <img
                              className=" h-[16] w-[18px]"
                              src="public/assets/img/timer.png"
                              alt="Course"
                            />
                            <p className="text-xs">Level- Advanced</p>
                          </div>

                          <div className="h-[22px] w-[160px] flex items-center gap-1">
                            <img
                              className=" h-[16] w-[18px] text-black"
                              src="public/assets/img/diploma.png"
                              alt="Course"
                            />
                            <p className="text-xs">Post Graduate Diploma</p>
                          </div>
                          <div className="h-[22px] w-[80px] flex items-center gap-1">
                            <img
                              className=" h-[16] w-[18px]"
                              src="public/assets/img/fulltime.png"
                              alt="Course"
                            />
                            <p className="text-xs">
                              {courseallocate.course.time ===
                                CourseTime.FullTime && <span>Full-time</span>}
                              {courseallocate.course.time ===
                                CourseTime.PartTime && <span>Part-time</span>}
                            </p>
                          </div>
                          <div className="h-[22px] w-[75px] flex items-center gap-1">
                            <img
                              className=" h-[16] w-[18px]"
                              src="public/assets/img/online.png"
                              alt="Course"
                            />
                            <p className="text-xs">
                              {courseallocate.course.isOnline ===
                                IsOnline.Online && <span>Online</span>}
                              {courseallocate.course.isOnline ===
                                IsOnline.InPerson && <span>InPerson</span>}
                              {courseallocate.course.isOnline ===
                                IsOnline.Hybrid && <span>Hybrid</span>}
                            </p>
                          </div>
                          <div className="h-[22px] w-[80px] flex items-center gap-1">
                            <img
                              className=" h-[16] w-[18px]"
                              src="public/assets/img/time.png"
                              alt="Course"
                            />
                            <p className="text-xs">
                              {courseallocate.course.duration}
                            </p>
                          </div>
                          <div className="h-[22px] w-[200px] flex items-center gap-1">
                            <img
                              className=" h-[16] w-[18px]"
                              src="public/assets/img/unversity.png"
                              alt="Course"
                            />
                            <p className="text-xs">
                              {courseallocate.course.institute}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-[-10px] mt-[10px]">
                          {avatars
                            .slice(0, 9)
                            .map((avatar: string, index: number) => (
                              <img
                                key={index}
                                src={avatar}
                                alt={`Avatar ${index + 1}`}
                                className="w-12 h-12 rounded-full border-2 border-[#D9D9D9]"
                              />
                            ))}
                          <div className="w-12 h-12 rounded-full bg-[#00778B] flex justify-center items-center border-2 border-[#1FA8DC] text-[white]">
                            +{Math.max(0, avatars.length - 9)}
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex flex-col">
                          <button
                            className="h-[42px] w-[145px] bg-[#64A70B] text-white ml-[130px] mt-[60px] rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
                            onClick={openPopup}
                          >
                            View Allocation
                          </button>
                          {/* {isPopupOpen && <CoursesViewAllocatePopup />} */}
                          {isPopupOpen && (
                            // <CoursesViewAllocatePopup onClose={closePopup} />
                            <CoursesViewAllocatePopup />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="ml-[1000px] mt-[20px]">
                    {totalPages > 1 && (
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
                    )}
                  </div>
                </>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}
export default CoursesAllocate;
