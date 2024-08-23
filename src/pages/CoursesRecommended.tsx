import Loader from "@/components/comman/Loader";
import CourseGridView from "@/components/courseManagement/Recommended Courses/CourseGridView";
import CourseListView from "@/components/courseManagement/Recommended Courses/CourseListView";
import { Button } from "@/components/ui/button";
import { QUERY_KEYS } from "@/lib/constants";
import { RootState } from "@/redux/store";
import { fetchRecommendedCourses } from "@/services/apiServices/recommendedcourses";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { AiOutlineAppstore, AiOutlineBars } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CoursesRecommended() {
  const searchUrl = window.location.search;
  const params = new URLSearchParams(searchUrl).get("view");
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.user);
  const usersData = JSON.parse(localStorage.getItem("user") as string);
  const userID = userData?.UserId
    ? +userData?.UserId
    : usersData?.query
    ? usersData?.query?.id
    : usersData?.id;

  const [search, setSearch] = useState("");
  const { data: recommendedcourses, isPending: pending } = useQuery({
    queryKey: [QUERY_KEYS.fetchbyrecommendedcourse, { search }],
    queryFn: () =>
      fetchRecommendedCourses({
        user: parseInt(userID),
        client: parseInt(userData?.clientId),
        keyword: search,
      }),
  });

  const changeRecommendedCourseView = (id: number) => {
    navigate(`/company/coursesrecommended?view=${id}`, { replace: true });
  };

  return (
    <>
      <div className="bg-[#f5f3ff] h-[calc(100vh-160px)]">
        <div className="h-full">
          <div className="bg-[#FFFFFF] rounded-xl">
            <div className="border-b border-[#D9D9D9] p-5 flex justify-between items-center">
              <p className="text-[#000000] text-[Calibri]">
                Recommended Courses
              </p>
              <div className="flex gap-2 sm:hidden">
                <Button
                  type="button"
                  onClick={() => changeRecommendedCourseView(0)}
                  className="bg-transparent p-1 hover:bg-transparent"
                >
                  <AiOutlineAppstore
                    className={`w-8 h-8 ${
                      params === "0" || !params
                        ? "text-[#00778B]"
                        : "text-[#A3A3A3]"
                    }`}
                  />
                </Button>
                <Button
                  type="button"
                  onClick={() => changeRecommendedCourseView(1)}
                  className="bg-transparent p-1 hover:bg-transparent"
                >
                  <AiOutlineBars
                    className={`w-8 h-8 ${
                      params === "1" ? "text-[#00778B]" : "text-[#A3A3A3]"
                    }`}
                  />
                </Button>
              </div>
            </div>

            <div className="flex sm:flex-row flex-col p-3 bg-[#FFFFFF] justify-between sm:items-center items-start sm:gap-0 gap-3">
              <div className="flex ml-0 items-center border border-[#D9D9D9] rounded-md px-4 py-2 md:w-[550px] sm:w-[450px] w-[300px] sm:h-[52px] h-[46px] text-[#A3A3A3]">
                <BsSearch className="text-[#D9D9D9] mr-2" />

                <input
                  type="text"
                  placeholder="Search by pillar, level, recommended, course name etc."
                  className="flex-1 mr-2 focus: text-black placeholder-[#A3A3A3] text-sm focus:border focus:border-[#4b4b4b] shadow-none outline-none"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="gap-2 sm:flex hidden">
                <Button
                  type="button"
                  onClick={() => changeRecommendedCourseView(0)}
                  className="bg-transparent p-1 hover:bg-transparent"
                >
                  <AiOutlineAppstore
                    className={`w-8 h-8 ${
                      params === "0" || !params
                        ? "text-[#00778B]"
                        : "text-[#A3A3A3]"
                    }`}
                  />
                </Button>
                <Button
                  type="button"
                  onClick={() => changeRecommendedCourseView(1)}
                  className="bg-transparent p-1 hover:bg-transparent"
                >
                  <AiOutlineBars
                    className={`w-8 h-8 ${
                      params === "1" ? "text-[#00778B]" : "text-[#A3A3A3]"
                    }`}
                  />
                </Button>
              </div>
            </div>
            {params === "0" || !params ? (
              <div
                className={`p-4 h-[calc(100vh-301px)] overflow-auto ${
                  recommendedcourses?.data &&
                  recommendedcourses?.data?.length > 0
                    ? "xl:grid-cols-3 sm:grid-cols-2 grid-cols-1"
                    : "grid-cols-1"
                } grid gap-4`}
              >
                {pending ? (
                  <Loader />
                ) : recommendedcourses?.data &&
                  recommendedcourses?.data?.length > 0 ? (
                  recommendedcourses?.data?.map((recommendeddata) => (
                    <div key={recommendeddata.id}>
                      <CourseGridView recommendeddata={recommendeddata} />
                    </div>
                  ))
                ) : (
                  <p className="text-[20px] font-calibri font-[500] h-[300px] flex items-center justify-center col-span-full">
                    No Reccomanded Data Found
                  </p>
                )}
              </div>
            ) : (
              <div className="p-4 h-[calc(100vh-301px)] overflow-auto">
                {pending ? (
                  <Loader />
                ) : recommendedcourses?.data &&
                  recommendedcourses?.data?.length > 0 ? (
                  recommendedcourses?.data?.map((recommendeddata, i) => (
                    <div key={recommendeddata.id}>
                      <CourseListView
                        recommendeddata={recommendeddata}
                        totalData={recommendedcourses?.data?.length || 0}
                        currentIndex={i}
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-[20px] font-calibri font-[500] h-[300px] flex items-center justify-center">
                    No Reccomanded Data Found
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CoursesRecommended;
