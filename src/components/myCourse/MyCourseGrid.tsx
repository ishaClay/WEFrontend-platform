import ClockImage from "@/assets/images/Clock.png";
import GraduationCapImage from "@/assets/images/Graduationcap.png";
import InternetImage from "@/assets/images/Internet.png";
import SpeedImage from "@/assets/images/Speed.png";
import TimesheetImage from "@/assets/images/Timesheet.png";
import UniversityImage from "@/assets/images/University.png";
import { useAppDispatch } from "@/hooks/use-redux";
import { setPath } from "@/redux/reducer/PathReducer";
import { CourseTime, IsOnline } from "@/types/allcourses";
import { CourseAllotedEntity } from "@/types/courseManagement";
import { Link } from "react-router-dom";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";

type myPagesListProps = {
  grid: CourseAllotedEntity;
  selectFilterByCategory: string;
};

const MyCourseGrid = ({ grid, selectFilterByCategory }: myPagesListProps) => {
  const dispatch = useAppDispatch();
  const Role = location.pathname.split("/")[1];
  console.log("grid", grid);

  return (
    <Link
      to={`/employee/employee-basic-course/${grid?.course?.currentVersion?.id}`}
      onClick={() =>
        dispatch(
          setPath([
            {
              label: "My Course",
              link: `/${Role}/mycourses`,
            },
            {
              label: "Course Details",
              link: null,
            },
          ])
        )
      }
    >
      <div className="border border-solid border-[#D9D9D9] rounded-lg col-span-1 group">
        <div className="relative overflow-hidden sm:rounded-t-lg rounded-lg">
          <img
            src={grid.course?.bannerImage}
            alt="img"
            className="sm:h-[231px] h-[180px] object-cover w-full"
          />
          <div className="absolute bottom-4 right-4 rounded-full lg:invisible visible group-hover:visible">
            <Button className="bg-[#00778B] text-white font-bold font-calibri  text-base rounded-lg shadow py-[12px] px-[22px]">
              {+Number(grid?.courseProgress).toFixed(0) === 100
                ? "view certificate"
                : "Continue"}
            </Button>
          </div>
        </div>
        <div className="xl:p-5 sm:p-4 px-[12px] py-[15px]">
          <div>
            <p className="sm:text-base text-sm font-medium font-inter sm:leading-6 leading-[22px] mb-2 line-clamp-1">
              {grid.course?.title}
            </p>
          </div>
          <div className="flex items-center justify-between pb-[6px]">
            <div className="text-xl font-calibri leading-6 text-[#00778B] font-bold">
              {Number(grid?.courseProgress).toFixed(0)}%
            </div>
            <div className="text-xs font-normal font-calibri leading-4">
              {grid?.completedModule} of {grid?.totalmodules} Completed
            </div>
          </div>
          <Progress
            color="#00778B"
            value={
              grid?.courseProgress
                ? +Number(grid?.courseProgress).toFixed(0)
                : 0
            }
            className="rounded-full w-full h-[6px]"
          />
          <div className="min-h-[80px]">
            <div className="flex flex-wrap justify-between pt-4">
              {grid?.course?.courseData?.map((item) => {
                const bgColor = item?.fetchMaturity?.color;
                return (
                  <Badge
                    className={`bg-[${bgColor}] text-[#3A3A3A] font-normal rounded-full font-Poppins text-xs leading-4 py-[4px] px-[10px] my-1 mx-[2px] hover:text-white h-auto`}
                  >
                    {item?.fetchPillar?.pillarName}
                  </Badge>
                );
              })}
            </div>
          </div>
          <div className="flex items-center xl:gap-5 gap-8 pt-3">
            <div>
              <div className="flex items-center">
                <img src={SpeedImage} alt="" className="h-[16] w-[18px]" />
                <p className="text-xs font-calibri font-normal text-[#3A3A3A] leading-6 pl-1 sm:line-clamp-2 line-clamp-1">
                  Level-{" "}
                  {
                    grid?.course?.courseData?.find(
                      (item) =>
                        item?.fetchPillar?.pillarName === selectFilterByCategory
                    )?.fetchMaturity?.maturityLevelName
                  }
                </p>
              </div>
              <div className="flex items-center">
                <img src={ClockImage} alt="" />
                <p className="text-xs font-calibri font-normal text-[#3A3A3A] leading-6 pl-1 sm:line-clamp-2 line-clamp-1">
                  {grid?.course?.time === CourseTime.FullTime && (
                    <span>Full-time</span>
                  )}
                  {grid?.course?.time === CourseTime.PartTime && (
                    <span>Part-time</span>
                  )}
                </p>
              </div>
              <div className="flex items-center">
                <img src={TimesheetImage} alt="" />
                <p className="text-xs font-calibri font-normal text-[#3A3A3A] leading-6 pl-1 sm:line-clamp-2 line-clamp-1">
                  {grid?.course?.duration}
                </p>
              </div>
            </div>
            <div>
              <div className="flex items-center">
                <img src={GraduationCapImage} alt="" />
                <p className="text-xs font-calibri font-normal text-[#3A3A3A] leading-6 pl-1 sm:line-clamp-2 line-clamp-1">
                  {grid?.course?.otherInstitutionName}
                </p>
              </div>
              <div className="flex items-center">
                <img src={InternetImage} alt="" />
                <p className="text-xs font-calibri font-normal text-[#3A3A3A] leading-6 pl-1 sm:line-clamp-2 line-clamp-1">
                  {grid?.course?.isOnline === IsOnline.Online && (
                    <span>Online</span>
                  )}
                  {grid?.course?.isOnline === IsOnline.InPerson && (
                    <span>InPerson</span>
                  )}
                  {grid?.course?.isOnline === IsOnline.Hybrid && (
                    <span>Hybrid</span>
                  )}
                </p>
              </div>

              <div className="flex items-center">
                <img src={UniversityImage} alt="" />
                <p className="text-xs font-calibri font-normal text-[#3A3A3A] leading-6 pl-1 sm:line-clamp-2 line-clamp-1">
                  {grid?.course?.institute}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MyCourseGrid;
