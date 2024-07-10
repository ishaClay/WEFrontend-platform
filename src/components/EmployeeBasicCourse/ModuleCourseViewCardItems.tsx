import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import modulePdfFile from "@/assets/images/pdf-file.png";
import ModuleVideoPlay from "@/assets/images/video-play.png";
// import moduleZoomVideo from "@/assets/images/zoom-video.png";
import xlsxFileIcon from "@/assets/images/upload_option_2.png";
import wordFile from "@/assets/images/word_file.png";
import { useState } from "react";
import { CircleX } from "lucide-react";

type moduleCourseCardListProps = {
  list: {
    image: string;
    moduleName: string;
    durationType: string;
    duration: string;
    date: string;
    time: string;
    status: string;
  };
};

const ModuleCourseViewCardItems = ({ list }: moduleCourseCardListProps | any) => {
  const navigate = useNavigate();
  const [viewDocument, setViewDocument] = useState(false);
  const [documentFile, setDocumentFile] = useState("");
  const documentIcon = (type: string) => {
    if(type?.split("/")?.[3]?.includes("pdf")){
      return <img src={modulePdfFile} alt="modulePdfFile" />
    } else if(type?.split("/")?.[3]?.includes("mp4") || type === "url") {
      return <img src={ModuleVideoPlay} alt="ModuleVideoPlay" />
    }else if(type?.split("/")?.[3]?.includes("xlsx")) {
      return <img src={xlsxFileIcon} alt="xlsxFileIcon" className="h-[32px] grayscale-[1]" />
    }else if(type?.split("/")?.[3]?.includes("doc")) {
      return <img src={wordFile} alt="wordFile" className="h-[32px]" />
    }
  }

  const documentType = (type: string) => {
    if(type?.split("/")?.[3]?.includes("pdf")){
      return "pdf"
    } else if(type?.split("/")?.[3]?.includes("mp4") || type === "url") {
      return "mp4"
    } else if(type?.split("/")?.[3]?.includes("xlsx")) {
      return "xlsx"
    } else if(type?.split("/")?.[3]?.includes("doc")) {
      return "doc"
    }
  }
  
  return (
    !viewDocument ?
    <div className="ml-6 border-b border-[#D9D9D9] px-0 py-4 flex items-center justify-between">
      <div className="flex items-center">
        <div className="me-3">
          {documentIcon(list?.url ? "url" : list?.uploadContent)}
        </div>
        <div className="">
          <h5 className="sm:text-base text-sm text-black font-nunito pb-2 cursor-pointer inline-block" 
          onClick={() => {setViewDocument(true); setDocumentFile(list?.url ? list?.url : list?.uploadContent)}}>
            {list?.title}
          </h5>
          {/* <div className="pb-1">
            <h6 className="text-[#747474] text-xs font-nunito">
              {list.durationType} 
              {list.duration}
            </h6>
          </div> */}
          <div className="sm:flex block items-center">
            <h6 className="text-[#747474] text-xs uppercase font-nunito sm:pe-3 pe-2 sm:me-3 me-2 border-e border-[#747474]">
              {documentType(list?.url ? "url" : list?.uploadContent)}
            </h6>
            <h6 className="text-[#747474] text-xs font-nunito">
              Duration : {list?.readingTime?.hour?.toString()?.padStart(2, '0')}: {list?.readingTime?.minute?.toString()?.padStart(2, '0')}: {list?.readingTime?.second?.toString()?.padStart(2, '0')}
            </h6>
          </div>
          {/* <div className="sm:flex block items-center">
            <h6 className="text-[#747474] text-xs font-nunito sm:pe-3 pe-2 sm:me-3 me-2 border-e border-[#747474]">
              Date : {list.date}
            </h6>
            <h6 className="text-[#747474] text-xs font-nunito">
              Time : {list.time}
            </h6>
          </div> */}
        </div>
      </div>
      <div className="">
        {list.status === "live" && (
          <Button
            className="bg-[#00778B] xl:h-12 sm:h-9 h-8 px-5 font-calibri xl:w-[110px] w-[80px] xl:text-base text-sm"
            onClick={() => navigate("/employee/live-session")}
          >
            Join
          </Button>
        )}
        {list.status === "completed" && (
          <Button className="bg-[#64A70B] xl:h-12 h-9 px-5 font-calibri xl:w-[110px] w-[80px] xl:text-base text-sm">
            Completed
          </Button>
        )}
        {list.status === "inprogress" && (
          <Button className="bg-[#FFD56A] text-black xl:h-12 h-9 px-5 font-calibri xl:w-[110px] w-[80px] xl:text-base text-sm">
            In Progress
          </Button>
        )}
        {list.status === "start" && (
          <Button className="bg-[#00778B] xl:h-12 h-9 px-5 font-calibri xl:w-[110px] w-[80px] xl:text-base text-sm">
            Start
          </Button>
        )}
      </div>
    </div> : 
    <div className="absolute top-0 left-0 w-full bg-white z-50">
      <CircleX className="absolute -top-[25px] right-0 cursor-pointer" onClick={() => {setViewDocument(false); setDocumentFile("")}} />
      <iframe src={documentFile} width="100%" height="600px" ></iframe>
    </div>
  );
};

export default ModuleCourseViewCardItems;
