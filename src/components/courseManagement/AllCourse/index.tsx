import { Button } from "@/components/ui/button";
import { QUERY_KEYS } from "@/lib/constants";
import { fetchCourseAllCourse } from "@/services/apiServices/courseManagement";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { AiOutlineAppstore, AiOutlineBars } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import CohortModal from "./CohortModal";
import GridView from "./GridView";
import ListView from "./listView";

const AllCourses = () => {
  const [cohort, setCohort] = useState(false);
  const [course, setCourse] = useState<string | number>("");
  const search = window.location.search;
  const params = new URLSearchParams(search).get("list");
  const navigate = useNavigate();

  const changeList = (id: number) => {
    navigate(`/trainer/allcourse?list=${id}`, { replace: true });
  };

  const {
    data: fetchCourseAllCourseData,
    isPending: fetchCourseAllCoursePending,
  } = useQuery({
    queryKey: [QUERY_KEYS.fetchAllCourse],
    queryFn: () => fetchCourseAllCourse(),
  });

  const handleCohort = (id: number) => {
    setCohort(true);
    setCourse(id);
  };

  console.log("data", fetchCourseAllCourseData, fetchCourseAllCoursePending);

  return (
    <div>
      <CohortModal open={cohort} setOpen={setCohort} id={+course || 0} />
      <div>
        <div className="bg-[#FFFFFF] rounded-[10px] w-full">
          <div className="flex items-center justify-between border-b border-[#D9D9D9] px-5 py-3">
            <div className="flex  bg-white">
              <p className="text-black text-base font-bold font-sans">
                Course Management
              </p>
            </div>
            <div>
              <Button
                type="button"
                onClick={() => navigate("/trainer/create_course?tab=1")}
                className="text-base font-semibold leading-5 font-sans bg-[#00778B]"
              >
                ADD NEW COURSE
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between py-5 px-[18px]">
            <div className="flex items-center border border-[#D9D9D9] rounded-md px-2 w-[550px] h-[52px]">
              <BsSearch className="text-[#D9D9D9] mr-2" />
              <input
                type="search"
                placeholder="Search by Pillar, level, recommended, course name etc."
                className="flex-1 focus:outline-none text-sm placeholder-[#D9D9D9]"
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
          <div className="px-[18px]">
            {params === "0" || !params ? (
              <GridView list={fetchCourseAllCourseData?.data || []} />
            ) : (
              <ListView list={fetchCourseAllCourseData?.data || []} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCourses;
