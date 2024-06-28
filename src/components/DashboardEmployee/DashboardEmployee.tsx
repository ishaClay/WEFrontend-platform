import { Bell } from "lucide-react";
import profile_img from "@/assets/images/face_1.jfif";
import MaturityLevel from "./MaturityLevel";
import MyAction from "./MyAction";
import MyCourses from "./MyCourses";
import RecentCourses from "./RecentCourses";
import LiveSessions from "./LiveSessions";

const DashboardEmployee = () => {
  return (
    <div className="bg-white rounded-xl px-5 py-2.5">
      <div className="flex justify-between items-center pb-4 border-b border-[#F1F1F1]">
        <div className="">
          <h4 className="text-2xl font-bold font-nunito text-black">
            Dashboard
          </h4>
        </div>
        <div className="flex gap-4">
          <div className="w-[42px] h-[42px] bg-[#F5F5F5] rounded-full flex justify-center items-center relative cursor-pointer">
            <Bell />
            <div className="w-[22px] h-[22px] rounded-full bg-[#FF5252] text-white absolute top-[-10px] right-[-5px] text-center">
              5
            </div>
          </div>
          <div className="flex gap-3 cursor-pointer">
            <div className="w-[42px] h-[42px] rounded-full overflow-hidden">
              <img src={profile_img} alt="" />
            </div>
            <div className="">
              <h5 className="text-base font-nunito text-black font-semibold">
                Emilla Anderson
              </h5>
              <h6 className="text-base font-nunito text-black">Team Member</h6>
            </div>
          </div>
        </div>
      </div>
      <div className="py-5">
        <MaturityLevel />
        <MyAction />
        <MyCourses />
        <RecentCourses />
        <LiveSessions />
      </div>
    </div>
  );
};

export default DashboardEmployee;
