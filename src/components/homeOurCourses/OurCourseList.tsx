import clockImage from "@/assets/images/Speed.png";
import organisationImage from "@/assets/images/diploma.png";
import fulltimeImage from "@/assets/images/fulltime.png";
import onlineImage from "@/assets/images/online.png";
import timeImage from "@/assets/images/time.png";
import universityImage from "@/assets/images/unversity.png";
import { UserRole } from "@/types/UserRole";
import { CoursePublishAdminClientData } from "@/types/allcourses";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

type OurCoursrseListProps = {
  data: CoursePublishAdminClientData;
};

const OurCourseList = ({ data }: OurCoursrseListProps) => {
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const navigate = useNavigate();
  return (
    <div className="sm:m-3 mb-5 border border-[#ddd] rounded-lg">
      <div className="relative min-h-[170px] h-[170px] overflow-hidden rounded-lg">
        <img
          src={data?.bannerImage}
          alt="course"
          className="object-cover w-full h-full static align-middle max-w-full inline-block inset-[50%_auto_auto_50%]"
        />
      </div>
      <div className="px-4 py-[15px] border-b border-[#D9D9D9]">
        <h5 className="text-base font-bold font-inter leading-[22px] pb-3">
          {data?.title}
        </h5>
        <div className="grid grid-cols-5">
          <div className="gap-2 col-span-2">
            <div className="flex items-center gap-1 mb-[2px]">
              <img className="h-[16] w-[18px]" src={clockImage} alt="Course" />
              <p className="text-xs leading-[22px] text-[#3A3A3A]">
                Level-Advanced
              </p>
            </div>
            <div className="flex items-center gap-1 mb-[2px]">
              <img
                className="h-[16] w-[18px]"
                src={fulltimeImage}
                alt="Course"
              />
              <p className="text-xs leading-[22px] text-[#3A3A3A]">Part-time</p>
            </div>
            <div className="flex items-center gap-1 mb-[2px]">
              <img className="h-[16] w-[18px]" src={timeImage} alt="Course" />
              <p className="text-xs leading-[22px] text-[#3A3A3A]">22 Days</p>
            </div>
          </div>
          <div className="gap-2 col-span-3">
            <div className="flex items-center gap-1 mb-[2px]">
              <img
                className="h-[16] w-[18px]"
                src={organisationImage}
                alt="Course"
              />
              <p className="text-xs leading-[22px] text-[#3A3A3A]">
                organisation Name 2
              </p>
            </div>
            <div className="flex items-center gap-1 mb-[2px]">
              <img className="h-[16] w-[18px]" src={onlineImage} alt="Course" />
              <p className="text-xs leading-[22px] text-[#3A3A3A]">Online</p>
            </div>
            <div className="flex items-center gap-1 mb-[2px]">
              <img
                className="h-[16] w-[18px]"
                src={universityImage}
                alt="Course"
              />
              <p className="text-xs leading-[22px] text-[#3A3A3A]">
                Atlantic Technological University
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between p-[15px]">
        <div>
          {/* <img
          src={data.image1}
          alt="course"
          className="xl:w-[162px] w-[140px] h-[48px]"
        /> */}
        </div>
        <Button
          type="button"
          onClick={() => {
            if (userData) {
              navigate(
                `/${UserRole[userData?.query?.role]?.toLowerCase()}/dashboard`
              );
            } else {
              navigate("/auth");
            }
          }}
          className="bg-[#64A70B] font-abhaya text-base px-5 py-2 h-auto"
        >
          Enroll Now
        </Button>
      </div>
    </div>
  );
};

export default OurCourseList;
