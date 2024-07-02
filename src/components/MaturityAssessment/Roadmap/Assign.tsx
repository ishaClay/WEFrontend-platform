import Tree_Planting from "@/assets/images/Tree_Planting.png";
import Morale from "@/assets/images/Morale.png";
import profile_1 from "@/assets/images/face_1.jfif";
import profile_2 from "@/assets/images/face_2.jfif";
import profile_3 from "@/assets/images/face_3.jfif";
import AssignCard from "./AssignCard";
import { Button } from "@/components/ui/button";

type AssignItemType = {
  image: string;
  mainTitle: string;
  progressValue: number;
  innerList: {
    title: string;
    employeeName: string;
    profileImg: string;
    date: string;
    status: string;
    action: string;
  }[];
};

const Assign = () => {
  const assignList: AssignItemType[] = [
    {
      image: Tree_Planting,
      mainTitle: "Environmental",
      progressValue: 25,
      innerList: [
        {
          title:
            "Lead in energy efficiency through continuous optimization and strategic energy management.",
          employeeName: "Employee Name",
          profileImg: profile_2,
          date: "2nd March, 2024 - 2nd March, 2024",
          status: "ontime",
          action: "edit",
        },
        {
          title:
            "Lead in energy efficiency through continuous optimization and strategic energy management.",
          employeeName: "Employee Name",
          profileImg: profile_1,
          date: "2nd March, 2024 - 2nd March, 2024",
          status: "ontime",
          action: "edit",
        },
        {
          title:
            "Lead in energy efficiency through continuous optimization and strategic energy management.",
          employeeName: "Employee Name",
          profileImg: profile_3,
          date: "2nd March, 2024 - 2nd March, 2024",
          status: "delay",
          action: "edit",
        },
        {
          title:
            "Lead in energy efficiency through continuous optimization and strategic energy management.",
          employeeName: "Employee Name",
          profileImg: profile_1,
          date: "2nd March, 2024 - 2nd March, 2024",
          status: "delay",
          action: "view",
        },
      ],
    },
    {
      image: Morale,
      mainTitle: "Governance",
      progressValue: 25,
      innerList: [
        {
          title:
            "Lead in energy efficiency through continuous optimization and strategic energy management.",
          employeeName: "Employee Name",
          profileImg: profile_2,
          date: "2nd March, 2024 - 2nd March, 2024",
          status: "ontime",
          action: "edit",
        },
        {
          title:
            "Lead in energy efficiency through continuous optimization and strategic energy management.",
          employeeName: "Employee Name",
          profileImg: profile_1,
          date: "2nd March, 2024 - 2nd March, 2024",
          status: "ontime",
          action: "edit",
        },
        {
          title:
            "Lead in energy efficiency through continuous optimization and strategic energy management.",
          employeeName: "Employee Name",
          profileImg: profile_3,
          date: "2nd March, 2024 - 2nd March, 2024",
          status: "delay",
          action: "edit",
        },
        {
          title:
            "Lead in energy efficiency through continuous optimization and strategic energy management.",
          employeeName: "Employee Name",
          profileImg: profile_1,
          date: "2nd March, 2024 - 2nd March, 2024",
          status: "delay",
          action: "view",
        },
      ],
    },
  ];
  return (
    <div className="">
      {assignList.map((data, index) => {
        return <AssignCard key={index} data={data} />;
      })}
      <div className="text-center">
        {/* <Button className="sm:w-[223px] w-[138px] bg-[#E5F1F3] text-[#00778B] sm:text-base text-sm font-bold font-calibri sm:h-[48px] h-[40px]">
          Retake Assessment
        </Button> */}
        <div className="flex flex-wrap justify-center items-center gap-5 my-[35px]">
          <Button className="bg-[#64A70B] text-white rounded-sm lg:w-[223px] w-[200px] h-12 lg:text-base text-sm">
            Edit Action Plan
          </Button>
          <Button className="bg-[#002A3A] text-white rounded-sm lg:w-[223px] w-[200px] h-12 lg:text-base text-sm">
            View Recommended Courses
          </Button>
          <Button className="bg-[#00778B] text-white rounded-sm lg:w-[223px] w-[200px] h-12 lg:text-base text-sm">
            Invite Team Members
          </Button>
        </div>
        <p className="text-[#64A70B] lg:text-base text-sm font-semibold">
          And whenever you’ve learnt, applied, and developed:  <br />
          come back to measure your progress anytime with a re-assessment!
        </p>
      </div>
    </div>
  );
};

export default Assign;
