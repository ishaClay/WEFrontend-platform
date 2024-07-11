import Loader from "@/components/comman/Loader";
import { Button } from "@/components/ui/button";
import { QUERY_KEYS } from "@/lib/constants";
import { getCourseByTrainee } from "@/services/apiServices/courseManagement";
import { UserRole } from "@/types/UserRole";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { AiOutlineAppstore, AiOutlineBars } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import CohortModal from "./CohortModal";
import GridView from "./GridView";
import ListView from "./listView";

const MyCourse = () => {
  const [cohort, setCohort] = useState(false);
  const search = window.location.search;
  const params = new URLSearchParams(search).get("list");
  const navigate = useNavigate();
  const location = useLocation();
  const [searchKeyword, setSearchKeyword] = useState("");
  const userData = JSON.parse(localStorage.getItem("user") as string);

  const changeList = (id: number) => {
    navigate(`${location?.pathname}?list=${id}`, { replace: true });
  };

  const {
    data: fetchCourseAllCourseData,
    isPending: fetchCourseAllCoursePending,
  } = useQuery({
    queryKey: [QUERY_KEYS.fetchAllCourse, { searchKeyword }],
    queryFn: () => getCourseByTrainee(userData?.query?.detailsid),
  });

  console.log("fetchCourseAllCourseData", fetchCourseAllCourseData);

  return (
    <div>
      <CohortModal open={cohort} setOpen={setCohort} id={0} />
      <div className="bg-[#FFFFFF] rounded-[10px] w-full">
        <div className="flex items-center justify-between border-b border-[#D9D9D9] px-5 py-3">
          <div className="bg-white">
            <h3 className="text-[16px] font-[700] font-nunito mb-1">
              My Course
            </h3>
            {/* <p className="text-[#606060] text-[15px] font-abhaya leading-[16px]">
              The full list of your courses, in snapshot view
            </p> */}
          </div>
          {(userData?.query?.role === UserRole.Trainee
            ? userData?.user?.approved
            : true) && (
            <div>
              <Button
                type="button"
                onClick={() =>
                  navigate(
                    `/${
                      location?.pathname?.split("/")?.[1]
                    }/create_course/tab=0&step=0&version=1`
                  )
                }
                className="text-base font-semibold leading-5 font-sans bg-[#00778B]"
              >
                Create Course
              </Button>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between py-5 px-[18px]">
          <div className="flex items-center border border-[#D9D9D9] rounded-md px-2 w-[550px] h-[52px]">
            <BsSearch className="text-[#D9D9D9] mr-2" />
            <input
              type="search"
              placeholder="Search by course name, category, maturity level, course by..."
              className="flex-1 focus:outline-none text-sm placeholder-[#D9D9D9]"
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </div>
          <div className="flex ml-6">
            <Button
              type="button"
              onClick={() => changeList(0)}
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
              onClick={() => changeList(1)}
              className="bg-transparent p-1 hover:bg-transparent"
            >
              <AiOutlineBars
                className={`w-8 h-8 ml-2 ${
                  params === "1" ? "text-[#00778B]" : "text-[#A3A3A3]"
                }`}
              />
            </Button>
          </div>
        </div>
        <div className="px-[18px] pb-[18px]">
          {fetchCourseAllCoursePending ? (
            <Loader />
          ) : fetchCourseAllCourseData?.data?.length === 0 ? (
            <p className="flex justify-center items-center py-10 text-[18px]">
              No course
            </p>
          ) : params === "0" || !params ? (
            <GridView list={fetchCourseAllCourseData?.data || []} />
          ) : (
            <ListView list={fetchCourseAllCourseData?.data || []} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCourse;
