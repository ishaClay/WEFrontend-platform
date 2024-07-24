import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
// import moduleZoomVideo from "@/assets/images/zoom-video.png";

import { documentIcon, documentType } from "@/lib/utils";
import { updateEmployeeWiseCourseStatus } from "@/services/apiServices/courseSlider";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { useMutation } from "@tanstack/react-query";
import { CircleX } from "lucide-react";
import { useState } from "react";
import ViewSession from "./ViewSession";

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

const ModuleCourseViewCardItems = ({
  list,
}: moduleCourseCardListProps | any) => {
  const navigate = useNavigate();

  const [viewDocument, setViewDocument] = useState(false);
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const [documentFile, setDocumentFile] = useState("");
  const docs = [{ uri: documentFile, fileType: documentType(documentFile) }];

  const { mutate, isPending } = useMutation({
    mutationFn: updateEmployeeWiseCourseStatus,
    onSuccess: (data) => {
      console.log("data", data);
      setViewDocument(true);
      setDocumentFile(list?.url ? list?.url : list?.uploadContent);
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  const handleStatusChanges = (status: number, id: number) => {
    const payload = {
      employeeid: userData?.query?.detailsid,
      status: status,
    };
    mutate({ data: payload, courseId: id });
  };

  return !viewDocument ? (
    <div className="ml-6 border-b border-[#D9D9D9] px-0 py-4 flex items-center justify-between">
      <div className="flex items-center">
        <div className="me-3">
          <img
            src={documentIcon(list?.url ? "url" : list?.uploadContent)}
            alt="documentIcon"
          />
        </div>
        <div className="">
          <h5
            className="sm:text-base text-sm text-black font-nunito pb-2 cursor-pointer inline-block"
            onClick={() => {
              setViewDocument(true);
              setDocumentFile(list?.url ? list?.url : list?.uploadContent);
            }}
          >
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
              Duration : {list?.readingTime?.hour?.toString()?.padStart(2, "0")}
              : {list?.readingTime?.minute?.toString()?.padStart(2, "0")}:{" "}
              {list?.readingTime?.second?.toString()?.padStart(2, "0")}
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
        {list?.isStatus === "Completed" && (
          <Button className="bg-[#64A70B] xl:h-12 h-9 px-5 font-calibri xl:w-[110px] w-[80px] xl:text-base text-sm">
            Completed
          </Button>
        )}
        {list?.isStatus === "Progress" && (
          <Button
            type="button"
            className="bg-[#FFD56A] text-black xl:h-12 h-9 px-5 font-calibri xl:w-[110px] w-[80px] xl:text-base text-sm"
          >
            In Progress
          </Button>
        )}
        {list?.isStatus === "Started" && (
          <Button
            type="button"
            onClick={() => handleStatusChanges(1, list?.id)}
            isLoading={isPending}
            className="bg-[#00778B] xl:h-12 h-9 px-5 font-calibri xl:w-[110px] w-[80px] xl:text-base text-sm"
          >
            Start
          </Button>
        )}
      </div>
    </div>
  ) : (
    <div className="absolute top-0 left-0 w-full bg-white z-50">
      {userData?.query?.role !== "4" ? (
        <>
          <CircleX
            className="absolute -top-[25px] right-0 cursor-pointer"
            onClick={() => {
              setViewDocument(false);
              setDocumentFile("");
            }}
          />
          <>
            {documentType(documentFile) === "pdf" ? (
              <iframe
                src={documentFile}
                style={{ height: "600px", width: "100%" }}
              />
            ) : (
              <DocViewer
                documents={docs}
                pluginRenderers={DocViewerRenderers}
                style={{ height: "600px" }}
              />
            )}
          </>
        </>
      ) : (
        <ViewSession
          documentFile={documentFile}
          setDocumentFile={setDocumentFile}
          setViewDocument={setViewDocument}
        />
      )}
    </div>
  );
};

export default ModuleCourseViewCardItems;
