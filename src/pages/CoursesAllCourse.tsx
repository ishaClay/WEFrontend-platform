import Loader from "@/components/comman/Loader";
import { QUERY_KEYS } from "@/lib/constants";
import { RootState } from "@/redux/store";
import { fetchAllCourse, fetchPillar } from "@/services/apiServices/allcourse";
import { fetchEnroll } from "@/services/apiServices/enroll";
import {
  AllCourse,
  CourseTime,
  IsOnline,
  Pillarcourse,
} from "@/types/allcourses";
import { enroll } from "@/types/enroll";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { AiOutlineAppstore, AiOutlineBars } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";

function CoursesAllCourse() {
  const user = useSelector((state: RootState) => state.user);
  const [selectedCourse, setSelectedCourse] = useState<Pillarcourse | null>(
    null
  );
  const [search, setSearch] = useState("");

  const { data: allcourse, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.fetchbycourse, { selectedCourse, search }],
    queryFn: () => fetchAllCourse(selectedCourse?.id?.toString() || "", search),
  });

  const { data: pillarcourse } = useQuery({
    queryKey: [QUERY_KEYS.fetchbypillarcource],
    queryFn: () => fetchPillar(user?.clientId),
  });

  const { mutate: enrollRequest } = useMutation({
    mutationFn: (data: enroll) => fetchEnroll(data),
    // onSuccess: async () => {

    // },
  });

  const handleCourseClick = (course: Pillarcourse) => {
    setSelectedCourse(course);
  };

  const handleEnroll = (id: number) => {
    enrollRequest({
      courseId: id,
      userId: parseInt(user.UserId),
      trainerId: 11,
    });
  };
  console.log(selectedCourse);
  return (
    <div className="bg-[#f5f3ff] ">
      <div>
        <div className="bg-[#FFFFFF] h-[calc(100vh_-_144px)] overflow-auto rounded-[10px]">
          <div className="flex  bg-white border-b border-[#D9D9D9] rounded-t-[10px] h-[80px]">
            <p className="text-black text-lg font-bold mt-[25px] ml-[20px]">
              All Course
            </p>

            <div className=" mt-[15px] flex items-center ml-auto border border-[#D9D9D9] rounded-md px-2 w-[550px] h-[52px]">
              <BsSearch className="text-[#D9D9D9] mr-2" />
              <input
                type="search"
                placeholder="Search by Pillar, level, recommended, course name etc."
                className="flex-1 focus:outline-none text-sm placeholder-[#D9D9D9]"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
            </div>

            <div className="flex ml-6 mt-[23px] mr-[10px]">
              <AiOutlineAppstore className="text-[#00778B] w-8 h-8 " />
              <AiOutlineBars className="text-[#A3A3A3] w-8 h-8 ml-2" />
            </div>
          </div>

          <div className="">
            <div className="flex gap-10 items-center py-[18px] px-10 bg-[#E7E7E8]">
              {pillarcourse?.data.data?.map((pillarcourse: Pillarcourse) => (
                <div
                  className={`flex gap-x-[10px] items-center w-[156px] h-[57px]  rounded-[9px] pl-2 shadow-b shadow-lg hover:bg-[#64A70B] hover:text-white ${
                    selectedCourse === pillarcourse
                      ? "bg-[#64A70B] text-white"
                      : "bg-[#EDF0F4]"
                  }`}
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
              {isLoading ? (
                <Loader className="h-10 w-10" />
              ) : (
                <div className="grid gap-5 py-[22px] px-5 grid-cols-[repeat(4,auto)]">
                  {allcourse?.data.data?.length > 0 ? (
                    allcourse?.data.data?.map((allcourse: AllCourse) => (
                      <div className="flex justify-center h-full">
                        <div
                          className="h-full w-full border border-solid border-[#D9D9D9] rounded"
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
                            <div className="flex items-center absolute bottom-0 left-0 w-30 bg-[#FFFFFF] rounded-full py-1 px-2 mb-4 ml-2  ">
                              <FaStar className="text-yellow-500 " />
                              <span className="text-[#8C94A3] font-semibold text-xs  mr-2 ml-1">
                                Advanced
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-col justify-between h-[calc(100%_-_231px)]">
                            <div className="flex flex-col justify-between pl-5 pr-3 py-4 h-full">
                              <p className="text-[16px] font-semibold mb-3 line-clamp-3">
                                {allcourse.title}
                              </p>

                              <div>
                                <div className="flex gap-2 mb-2">
                                  <p className="text-[#918A8A] w-1/2 flex">
                                    <img
                                      className="inline-block ml-1 w-[18px] h-[24px] mr-[10px]"
                                      src="/public/assets/img/abc.png"
                                      alt="Image Alt Text"
                                    />
                                    Social
                                  </p>
                                  <p className="text-[#918A8A] w-1/2 flex">
                                    <img
                                      className="inline-block ml-1 w-[18px] h-[23px] mr-[10px]"
                                      src="/public/assets/img/def.png"
                                      alt="Image Alt Text"
                                    />
                                    {
                                      allcourse?.courseData?.[0]?.fetchPillar
                                        ?.pillarName
                                    }
                                  </p>
                                </div>

                                <div className="flex gap-2 mb-2">
                                  <div className="w-1/2 flex items-center gap-1">
                                    <img
                                      className=" h-[16] w-[18px]"
                                      src="/public/assets/img/timer.png"
                                      alt="Course"
                                    />
                                    <p className="text-xs">
                                      Level-
                                      {
                                        allcourse?.courseData?.[0]
                                          ?.fetchMaturity?.maturityLevelName
                                      }
                                    </p>
                                  </div>

                                  <div className="w-1/2 flex items-center gap-1">
                                    <img
                                      className=" h-[16] w-[18px] text-black"
                                      src="/public/assets/img/diploma.png"
                                      alt="Course"
                                    />
                                    <p className="text-xs">
                                      {allcourse.otherInstitutionName}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex gap-2 mb-2">
                                  <div className="w-1/2 flex items-center gap-1">
                                    <img
                                      className=" h-[16] w-[18px]"
                                      src="/public/assets/img/fulltime.png"
                                      alt="Course"
                                    />
                                    <p className="text-xs">
                                      {allcourse.time ===
                                        CourseTime.FullTime && (
                                        <span>Full-time</span>
                                      )}
                                      {allcourse.time ===
                                        CourseTime.PartTime && (
                                        <span>Part-time</span>
                                      )}
                                    </p>
                                  </div>
                                  <div className="w-1/2 flex items-center gap-1">
                                    <img
                                      className=" h-[16] w-[18px]"
                                      src="/public/assets/img/online.png"
                                      alt="Course"
                                    />
                                    <p className="text-xs">
                                      {allcourse.isOnline ===
                                        IsOnline.Online && <span>Online</span>}
                                      {allcourse.isOnline ===
                                        IsOnline.InPerson && (
                                        <span>InPerson</span>
                                      )}
                                      {allcourse.isOnline ===
                                        IsOnline.Hybrid && <span>Hybrid</span>}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex gap-2">
                                  <div className="w-1/2 flex items-center gap-1">
                                    <img
                                      className=" h-[16] w-[18px]"
                                      src="/public/assets/img/time.png"
                                      alt="Course"
                                    />
                                    <p className="text-xs">
                                      {allcourse.duration}
                                    </p>
                                  </div>
                                  <div className="w-1/2 flex items-center gap-1">
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

                            <div className=" flex border-t py-[15px] pr-[10px] pl-[6px] justify-between">
                              <div className="">
                                <p className="text-black mb-1 text-xs">
                                  <span className="font-medium">
                                    Cohort 2 :
                                  </span>{" "}
                                  <span>Start</span>
                                  <span className="p-[5px] rounded-full text-[10px] bg-[#D6F5AC] mx-1 inline-block">
                                    22/5/2024
                                  </span>{" "}
                                  to
                                  <span className="p-[5px] rounded-full text-[10px] bg-[#D6F5AC] mx-1 inline-block">
                                    30/5/2024
                                  </span>
                                </p>
                                <p className="text-[#4285F4] text-xs font-medium">
                                  Show all cohort
                                </p>
                              </div>
                              <div>
                                <button
                                  onClick={() => handleEnroll(allcourse?.id)}
                                  className=" p-[10px] bg-[#64A70B] text-white rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
                                >
                                  Enroll Now
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-[20px] font-calibri font-[500] h-[300px] flex items-center justify-center col-span-full">
                      No Course Available
                    </p>
                  )}
                </div>
              )}
            </>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoursesAllCourse;
