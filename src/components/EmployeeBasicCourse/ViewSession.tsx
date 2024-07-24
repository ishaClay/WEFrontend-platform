import { documentIcon, documentType } from "@/lib/utils";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { CircleX } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { IoIosThumbsDown, IoIosThumbsUp } from "react-icons/io";
import { Button } from "../ui/button";

const ViewSession = ({
  setDocumentFile,
  documentFile,
  setViewDocument,
}: {
  documentFile: string;
  setDocumentFile: Dispatch<SetStateAction<string>>;
  setViewDocument: Dispatch<SetStateAction<boolean>>;
}) => {
  const docs = [{ uri: documentFile, fileType: documentType(documentFile) }];
  const [isLike, setLike] = useState("");

  console.log("documentFile", documentFile?.split("/").pop()?.split(".")[0]);

  return (
    <div className="bg-white">
      {documentType(documentFile) === "mp4" ||
      documentType(documentFile) === "video" ? (
        <div className="absolute top-0 left-0 w-full bg-white z-50">
          <CircleX
            className="absolute -top-[25px] right-0 cursor-pointer"
            onClick={() => {
              setViewDocument(false);
              setDocumentFile("");
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
        <div className="flex items-center py-[28px] px-5 bg-[#D9D9D9] rounded-[10px] mb-[25px]">
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
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-[12px] text-[#A3A3A3] font-inter">Category:</h3>
            <p className="text-[12px] text-[#00778B] font-inter">Environment</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={"ghost"}
              type="button"
              onClick={() => setLike((prev) => (prev === "like" ? "" : "like"))}
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
      </div>
    </div>
  );
};

export default ViewSession;
