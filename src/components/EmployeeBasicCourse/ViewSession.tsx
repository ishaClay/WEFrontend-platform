import { QUERY_KEYS } from "@/lib/constants";
import { documentIcon, documentType } from "@/lib/utils";
import { updateEmployeeWiseCourseStatus } from "@/services/apiServices/courseSlider";
import { ModuleSectionsEntity } from "@/types/employee";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CircleX, Download, MessageSquareText } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { IoIosThumbsDown, IoIosThumbsUp } from "react-icons/io";
import { TiArrowForwardOutline } from "react-icons/ti";
import { Button } from "../ui/button";

const ViewSession = ({
  setDocumentFile,
  documentFile,
  setViewDocument,
  list,
}: {
  documentFile: string;
  setDocumentFile: Dispatch<SetStateAction<string>>;
  setViewDocument: Dispatch<SetStateAction<boolean>>;
  list: ModuleSectionsEntity;
}) => {
  const docs = [{ uri: documentFile, fileType: documentType(documentFile) }];
  const [isLike, setLike] = useState("");
  const [viewDoc, setViewDoc] = useState(false);
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const queryclient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateEmployeeWiseCourseStatus,
    onSuccess: async (data) => {
      console.log(data,"data")
      await queryclient.invalidateQueries({
        queryKey: [QUERY_KEYS.getSingleCourse],
      });
      setDocumentFile("");
      setViewDocument(false);
      setViewDoc(false);
      setLike("");
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

  return (
    <div className="bg-white p-4 min-h-[calc(100vh-170px)]">
      {viewDoc ? (
        <div className="absolute top-0 left-0 w-full bg-white z-50">
          <CircleX
            className="absolute -top-[25px] right-0 cursor-pointer"
            onClick={() => {
              setViewDoc(false);
            }}
          />
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
        </div>
      ) : (
        <>
          {documentType(documentFile) === "mp4" ||
          documentType(documentFile) === "video" ? (
            <div className="">
              {documentType(documentFile) === "mp4" ||
              documentType(documentFile) === "video" ? (
                <video src={docs[0]?.uri} className="w-full" controls></video>
              ) : documentType(documentFile) === "pdf" ? (
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
            </div>
          ) : (
            <div
              onClick={() => setViewDoc(true)}
              className="flex items-center py-[28px] px-5 bg-[#D9D9D9] rounded-[10px] mb-[25px]"
            >
              <div className="me-3">
                <img src={documentIcon(documentFile)} alt="documentIcon" />
              </div>
              <div>
                <h5 className="sm:text-base text-sm text-black font-nunito pb-2 cursor-pointer inline-block">
                  {documentFile?.split("/").pop()?.split(".")[0]}
                </h5>
                {/* <div className="pb-1">
            <h6 className="text-[#747474] text-xs font-nunito">
              {list.durationType} 
              {list.duration}
            </h6>
          </div> */}
                <div className="sm:flex block items-center">
                  <h6 className="text-[#747474] text-xs uppercase font-nunito sm:pe-3 pe-2 sm:me-3 me-2 border-e border-[#747474]">
                    {documentType(documentFile)}
                  </h6>
                </div>
              </div>
            </div>
          )}
          <div className="mt-[20px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-[12px] text-[#A3A3A3] font-inter">
                  Category:
                </h3>
                <p className="text-[12px] text-[#00778B] font-inter">
                  Environment
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={"ghost"}
                  type="button"
                  onClick={() =>
                    setLike((prev) => (prev === "like" ? "" : "like"))
                  }
                  className="p-0 h-auto hover:bg-transparent"
                >
                  <IoIosThumbsUp
                    className={`${
                      isLike === "like" ? "text-[#00778B]" : "text-[#A3A3A3]"
                    } text-[20px]`}
                  />
                </Button>
                <Button
                  variant={"ghost"}
                  type="button"
                  onClick={() =>
                    setLike((prev) => (prev === "dislike" ? "" : "dislike"))
                  }
                  className="p-0 h-auto hover:bg-transparent"
                >
                  <IoIosThumbsDown
                    className={`${
                      isLike === "dislike" ? "text-[#00778B]" : "text-[#A3A3A3]"
                    } text-[20px]`}
                  />
                </Button>
              </div>
            </div>
            <h3 className="text-[20px] font-nunito font-bold mt-2 mb-3">
              {list?.title}
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-500"></div>
                <div>
                  <h3 className="text-[16px] text-[#000] font-nunito">
                    Devon Lane
                  </h3>
                  <div className="flex items-center gap-2">
                    <h3 className="text-[12px] text-[#A3A3A3] font-nunito">
                      Rating
                    </h3>
                    <h3 className="text-[12px] text-[#A3A3A3] font-nunito">
                      <FaStar className="text-[#FFA25E]" />
                    </h3>
                    <h3 className="text-[12px] text-[#A3A3A3] font-nunito">
                      4/5
                    </h3>
                    <ul className="list-disc list-inside">
                      <li className="text-[12px] text-[#A3A3A3] font-nunito">
                        100 Views
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-5 ">
                <Button
                  variant={"outline"}
                  type="button"
                  className="text-[12px] font-nunito"
                >
                  <MessageSquareText /> Feedback
                </Button>
                <a
                  href=""
                  download={list?.uploadContent}
                  target="_blank"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors border border-input bg-background h-10 px-4 py-2 hover:bg-accent hover:text-accent-foreground text-[12px] font-nunito cursor-pointer"
                >
                  <Download /> Download Video
                </a>
                <Button
                  variant={"outline"}
                  type="button"
                  className="text-[12px] font-nunito p-2"
                >
                  <TiArrowForwardOutline className="text-[24px]" />
                </Button>
              </div>
            </div>
            <p className="text-[14px] font-inter text-[#2D2D2D] mt-8 w-[98%]">
              {list?.information}
            </p>
            <div className="flex items-center justify-center mt-[56px]">
              <Button
                type="button"
                isLoading={isPending}
                onClick={() => handleStatusChanges(2, list?.id)}
                className="text-[14px] font-abhaya bg-[#00778B] p-[10px]"
              >
                Mark as Complete
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ViewSession;
