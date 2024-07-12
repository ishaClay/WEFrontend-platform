import modulePdfFile from "@/assets/images/pdf-file.png";
import ModuleVideoPlay from "@/assets/images/video-play.png";
import moduleZoomVideo from "@/assets/images/zoom-video.png";
import ModuleCourseViewCardItems from "./ModuleCourseViewCardItems";

const ModuleCourseViewCard = ({ data }: any) => {
  console.log("data+++data", data?.moduleSections);

  const moduleCourseCardList = [
    {
      image: ModuleVideoPlay,
      moduleName: "Doug's Story 1",
      durationType: "MP4 | Duration :",
      duration: "00:04:42",
      date: "29th march, 2024 ",
      time: "9:10AM to 12:15AM",
      status: "completed",
    },
    {
      image: ModuleVideoPlay,
      moduleName: "Doug's Story 2",
      durationType: "Pdf l Duration :",
      duration: "00:04:42",
      date: "29th march, 2024 ",
      time: "9:10AM to 12:15AM",
      status: "inprogress",
    },
    {
      image: modulePdfFile,
      moduleName: "Doug's Story 3",
      durationType: "PDF | Duration :",
      duration: "00:04:42",
      date: "29th march, 2024 ",
      time: "9:10AM to 12:15AM",
      status: "start",
    },
    {
      image: moduleZoomVideo,
      moduleName: "Live Session(session title)",
      durationType: "Duration :",
      duration: "00:04:42",
      date: "29th march, 2024 ",
      time: "9:10AM to 12:15AM",
      status: "live",
    },
  ];
  console.log("moduleCourseCardList", moduleCourseCardList);

  return (
    <div>
      {data?.moduleSections
        .sort((a: any, b: any) => a.position - b.position)
        ?.map((data: any, index: number) => {
          return <ModuleCourseViewCardItems key={index} list={data} />;
        })}
    </div>
  );
};

export default ModuleCourseViewCard;
