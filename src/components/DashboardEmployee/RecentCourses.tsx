import RecentCoursesItems from "./RecentCoursesItems";
import { Button } from "../ui/button";
import CustomCarousel from "../comman/CustomCarousel";
import { MyCourseResponse } from "@/types/courseManagement";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants";
import { getAllEmployeeCourseList } from "@/services/apiServices/courseManagement";
import { useAppSelector } from "@/hooks/use-redux";

const RecentCourses = () => {
  const { CompanyId } = useAppSelector((state) => state.user);
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const userID = CompanyId
    ? CompanyId
    : userData?.query
    ? userData?.query?.detailsid
    : userData?.detailsid;

  const { data } = useQuery<MyCourseResponse>({
    queryKey: [
      QUERY_KEYS?.myCourses,
      {
        id: userID,
      },
    ],
    queryFn: () =>
      getAllEmployeeCourseList({
        id: userID,
        status: "In Progress",
        categories: "",
      }),
  });

  console.log("data", data);

  return (
    <div className="mb-8">
      <div className="mb-5 flex justify-between items-center">
        <h3 className="font-bold font-nunito xl:text-[22px] text-lg relative pb-1">
          Recent Courses
          <div className="bg-[#64A70B] w-[115px] h-[2px] absolute left-0 bottom-0"></div>
        </h3>
        {data?.data?.courseAlloted && data?.data?.courseAlloted.length > 2 && (
          <Button className="bg-transparent text-base font-bold hover:bg-transparent text-[#00778B] font-nunito">
            View all
          </Button>
        )}
      </div>
      <div className="sm:block hidden">
        <div className="grid xl:grid-cols-2 grid-cols-1 gap-6">
          {data?.data?.courseAlloted?.splice(0, 2)?.map((data, index) => {
            return <RecentCoursesItems data={data} key={index} />;
          })}
        </div>
      </div>

      <div className="sm:hidden block">
        <CustomCarousel containerClassName="">
          {data?.data?.courseAlloted?.splice(0, 2)?.map((data, index) => {
            return <RecentCoursesItems data={data} key={index} />;
          }) || []}
        </CustomCarousel>
      </div>
    </div>
  );
};

export default RecentCourses;
