import Course_image from "@/assets/images/Course_image.png";
import { Button } from "../ui/button";
import LiveSessionsItems from "./LiveSessionsItems";

const LiveSessions = () => {
  const liveSessionItems = [
    {
      image: Course_image,
      title: "Live Session (session title)",
      subTitle: "Certificate in the sustainable...",
      date: "29th March, 2024",
      time: "9:10AM to 12:15AM",
    },
    {
      image: Course_image,
      title: "Live Session (session title)",
      subTitle: "Certificate in the sustainable...",
      date: "29th March, 2024",
      time: "9:10AM to 12:15AM",
    },
    {
      image: Course_image,
      title: "Live Session (session title)",
      subTitle: "Certificate in the sustainable...",
      date: "29th March, 2024",
      time: "9:10AM to 12:15AM",
    },
  ];
  return (
    <div className="">
      <div className="mb-5 flex justify-between items-center">
        <h3 className="font-bold font-nunito xl:text-[22px] text-[18px] relative pb-1">
          Upcoming live sessions
          <div className="bg-[#64A70B] w-[115px] h-[2px] absolute left-0 bottom-0"></div>
        </h3>
        <Button className="bg-transparent hover:bg-transparent text-[#00778B] font-semibold font-nunito">
          View all
        </Button>
      </div>
      <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {liveSessionItems.map((data, index) => {
          return <LiveSessionsItems data={data} key={index} />;
        })}
      </div>
    </div>
  );
};

export default LiveSessions;
