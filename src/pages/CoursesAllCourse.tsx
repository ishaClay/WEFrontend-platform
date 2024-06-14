import { useState } from "react";
import HeaderCourse from "@/components/HeaderCourse";
import { BsSearch } from "react-icons/bs";
import { AiOutlineAppstore, AiOutlineBars } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import EmployeeListSidebar from "@/components/EmployeeListSidebar";
import { QUERY_KEYS } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import {
  AllCourse,
  CourseTime,
  IsOnline,
  Pillarcourse,
} from "@/types/allcourses";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  fetchAllCourse,
  fetchPillar,
  fetchPillarCourse,
} from "@/services/apiServices/allcourse";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

function CoursesAllCourse() {
  const clientId = useSelector((state: RootState) => state.user?.clientId);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(0);

  const handlePaginationChange = (page: number) => {
    setCurrentPage(page);
    refetch();
  };

  const { data: allcourse, refetch } = useQuery({
    queryKey: [QUERY_KEYS.fetchbycourse],
    queryFn: () => fetchAllCourse(currentPage),
  });

  const { data: pillarcourse } = useQuery({
    queryKey: [QUERY_KEYS.fetchbypillarcource],
    queryFn: () => fetchPillar(clientId),
  });

  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleCourseClick = (course: any) => {
    setSelectedCourse(course);
    fetchPillarCourse(course.id);
  };
  console.log(selectedCourse);
  return (
    <div className="flex bg-[#f5f3ff] w-[1510px] h-[1608px] gap-1 overflow-hidden">
      <div className=" w-[235px] h-[1608px]">
        <EmployeeListSidebar />
      </div>
      <div className="flex flex-col">
        <div className="w-[1204px] h-[120px] ">
          <HeaderCourse />
        </div>

        <div className="bg-[#FFFFFF] w-[1250px] h-[1469px] m-[12px] rounded-[10px]">
          <div className="flex  bg-white border-b border-[#D9D9D9] rounded-t-[10px] w-[1250px] h-[80px]">
            <p className="text-black text-lg font-bold mt-[25px] ml-[20px]">
              All Course
            </p>

            <div className=" mt-[15px] flex items-center ml-auto border border-[#D9D9D9] rounded-md px-2 w-[550px] h-[52px]">
              <BsSearch className="text-[#D9D9D9] mr-2" />
              <input
                type="search"
                placeholder="Search by Pillar, level, recommended, course name etc."
                className="flex-1 focus:outline-none text-sm placeholder-[#D9D9D9]"
              />
            </div>

            <div className="flex ml-6 mt-[23px] mr-[10px]">
              <AiOutlineAppstore className="text-[#00778B] w-8 h-8 " />
              <AiOutlineBars className="text-[#A3A3A3] w-8 h-8 ml-2" />
            </div>
          </div>

          <div className=" w-[1250px] h-[92px] bg-[#E7E7E8]">
            <div className="flex gap-10 items-center  pl-14 pt-5 pb-5">
              {pillarcourse?.data.data?.map((pillarcourse: Pillarcourse) => (
                <div
                  className="flex gap-x-[10px] items-center bg-[#EDF0F4] w-[156px] h-[57px]  rounded-[9px] pl-2 shadow-b shadow-lg hover:bg-[#64A70B] hover:text-white"
                  key={pillarcourse.id}
                  onClick={() => {
                    handleCourseClick(pillarcourse);
                  }}
                >
                  <img
                    className="w-[26px] transition duration-900 ease-in-out filter grayscale hover:brightness-900"
                    src="../assets/img/Tree Planting.png"
                  />

                  <p className="text-[##3A3A3A]">{pillarcourse.pillarName}</p>
                </div>
              ))}
            </div>

            <>
              <div className="grid grid-cols-3  ">
                {allcourse?.data.data?.map((allcourse: AllCourse) => (
                  <div className="flex justify-center">
                    <div
                      className="ml-[20px] mt-[20px] h-[500px] w-[356px] border border-solid border-[#D9D9D9] rounded"
                      key={allcourse.id}
                    >
                      <div className="relative overflow-hidden rounded">
                        <img
                          className="w-[356px] h-[231px] rounded object-cover object-center"
                          src="/public/assets/img/nature.png"
                          alt="Course"
                        />
                        <input
                          type="checkbox"
                          className="absolute top-0 right-0 mt-2 mr-2 h-[23px] w-[24px]"
                        />
                        <div className="flex items-center absolute bottom-0 left-0 w-30 bg-[#FFFFFF] rounded-full py-1 px-2 mb-4 ml-2  ">
                          <FaStar className="text-yellow-500 " />
                          <span className="text-[#8C94A3] font-semibold text-xs  mr-2 ml-1">
                            Advanced
                          </span>
                        </div>
                      </div>

                      <div className="max-h-max w-[300px] mt-[5px] ml-[15px]">
                        <p className="text-[16px] font-semibold">
                          {allcourse.title}
                        </p>
                      </div>
                      <div className="bg-[url('../public/assets/img/nature.png')]"></div>

                      <div className="flex mt-[10px]">
                        <p className="ml-[10px] text-[#918A8A]">
                          <img
                            className="inline-block ml-1 w-[18px] h-[24px] mr-[10px] "
                            src="/public/assets/img/abc.png"
                            alt="Image Alt Text"
                          />
                          Social
                        </p>
                        <p className="ml-[40px] text-[#918A8A]">
                          <img
                            className="inline-block ml-1 w-[18px] h-[23px] mr-[10px]"
                            src="/public/assets/img/def.png"
                            alt="Image Alt Text"
                          />
                          {allcourse.courseData[0].fetchPillar.pillarName}
                        </p>
                      </div>

                      <div className="flex mt-[10px] ml-[13px]">
                        <div className="h-[22px] w-[129px] flex items-center gap-1">
                          <img
                            className=" h-[16] w-[18px]"
                            src="public/assets/img/timer.png"
                            alt="Course"
                          />
                          <p className="text-xs">
                            Level-
                            {
                              allcourse.courseData[0].fetchMaturity
                                .maturityLevelName
                            }
                          </p>
                        </div>

                        <div className="h-[22px] w-[160px] flex items-center gap-1">
                          <img
                            className=" h-[16] w-[18px] text-black"
                            src="public/assets/img/diploma.png"
                            alt="Course"
                          />
                          <p className="text-xs">
                            {allcourse.otherInstitutionName}
                          </p>
                        </div>
                      </div>

                      <div className="flex mt-[5px] ml-[13px]">
                        <div className="h-[22px] w-[80px] flex items-center gap-1">
                          <img
                            className=" h-[16] w-[18px]"
                            src="public/assets/img/fulltime.png"
                            alt="Course"
                          />
                          <p className="text-xs">
                            {allcourse.time === CourseTime.FullTime && (
                              <span>Full-time</span>
                            )}
                            {allcourse.time === CourseTime.PartTime && (
                              <span>Part-time</span>
                            )}
                          </p>
                        </div>
                        <div className="h-[22px] w-[75px] flex items-center gap-1 ml-[50px]">
                          <img
                            className=" h-[16] w-[18px]"
                            src="public/assets/img/online.png"
                            alt="Course"
                          />
                          <p className="text-xs">
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
                      </div>

                      <div className="flex mt-[5px] ml-[13px]">
                        <div className="h-[22px] w-[80px] flex items-center gap-1">
                          <img
                            className=" h-[16] w-[18px]"
                            src="public/assets/img/time.png"
                            alt="Course"
                          />
                          <p className="text-xs">{allcourse.duration}</p>
                        </div>
                        <div className="h-[22px] w-[200px] flex items-center gap-1 ml-[50px]">
                          <img
                            className=" h-[16] w-[18px]"
                            src="public/assets/img/unversity.png"
                            alt="Course"
                          />
                          <p className="text-xs">
                            Atlantic Technological University
                          </p>
                        </div>
                      </div>

                      <div className=" flex border-t mt-[10px]">
                        <div className="ml-[5px] mt-[8px]">
                          <img
                            className=" h-[48px] w-[162.74px] object-cover object-center"
                            src="/public/assets/img/atu.png"
                            alt="Course"
                          />
                        </div>
                        <div>
                          <button className=" h-[42px] w-[110px] bg-[#64A70B] ml-[60px] mt-[10px] text-white  px-4 py-2 rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-400">
                            Enroll Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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
                            onClick={() => handlePaginationChange(index + 1)}
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoursesAllCourse;
