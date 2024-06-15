import uploadImg from "@/assets/images/drop_file-img.png";
import wordFiles from "@/assets/images/word_file.png";
import Modal from "@/components/comman/Modal";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CircleX } from "lucide-react";
import { useState } from "react";
import SelectDoumentType from "./SelectDoumentType";

const UploadContent = ({ data }: { data: any }) => {
  const [isOpenUploadDocumnet, setIsOpenUploadDocumnet] = useState(false);
  return (
    <div className="">
      <div className="pb-5">
        <h6 className="text-base font-calibri text-[#515151] pb-2">
          Upload Content
        </h6>
        <div className="border border-[#D9D9D9] rounded-md px-4 py-2 w-full">
          <Button
            className="bg-[#42A7C3] font-bold text-xs font-calibri"
            onClick={() => setIsOpenUploadDocumnet(true)}
          >
            {data.uploadContent}
          </Button>
        </div>
      </div>
      <div className="pb-4">
        <h6 className="text-base font-calibri text-[#515151] pb-2">
          Upload Content
        </h6>
        <div className="p-4 border border-[#D9D9D9] rounded-md bg-[#FBFBFB]">
          <div className="flex items-center">
            <div className="w-2/5 bg-white p-5 border border-[#D9D9D9] border-dashed rounded-lg">
              <div className="text-center">
                <img src={uploadImg} alt="" className="mx-auto mb-5" />
                <h6 className="text-[#9E9E9E] text-xs font-calibri pb-4">
                  Drag and drop files here
                </h6>
                <h6 className="text-[#9E9E9E] text-xs font-calibri font-bold pb-4">
                  -OR-
                </h6>
                <Button className="py-3 px-7 bg-[#42A7C3] text-xs font-calibri">
                  Browse Files
                </Button>
              </div>
            </div>
            <div className="w-3/5 p-5">
              <div className="2xl:ps-10 ps-0">
                <div className="flex justify-between items-center pb-3">
                  <h5 className="text-black text-sm font-calibri">
                    Upload Document
                  </h5>
                  <h6 className="font-calibri text-[10px]">
                    Supported File:- .Mp4, .Pdf, .Ppt
                  </h6>
                </div>
                <div className="p-5 bg-white rounded-lg shadow-sm relative mb-5">
                  <div className="flex">
                    <div className="">
                      <img src={wordFiles} alt="" />
                    </div>
                    <div className="flex justify-between items-center ps-5 w-full">
                      <h5 className="text-xs text-black font-calibri">
                        How to manage financial management?.Mp4
                      </h5>
                      <h6 className="text-[#159800] text-[10px] font-calibri">
                        Completed
                      </h6>
                    </div>
                  </div>
                  <div className="pt-5">
                    <Progress
                      color="#159800"
                      className="w-full h-[3px]"
                      value={80}
                    />
                  </div>
                  <div className="absolute top-[5px] right-[5px]">
                    <CircleX width={16} />
                  </div>
                </div>
                <div className="">
                  <h5 className="text-[#515151] text-sm font-calibri pb-3">
                    Reading Time
                  </h5>
                  <div className="flex">
                    <div className="border border-[#D9D9D9] rounded-md p-3 w-[145px] me-5 flex justify-between items-center">
                      <input
                        className="border-none w-full outline-none text-sm text-black"
                        placeholder="00"
                      />
                      <h6 className="text-[10px] text-[#515151] font-calibri">
                        Hour
                      </h6>
                    </div>
                    <div className="border border-[#D9D9D9] rounded-md p-3 w-[145px] me-5 flex justify-between items-center">
                      <input
                        className="border-none w-full outline-none text-sm text-black"
                        placeholder="10"
                      />
                      <h6 className="text-[10px] text-[#515151] font-calibri">
                        Minute
                      </h6>
                    </div>
                    <div className="border border-[#D9D9D9] rounded-md p-3 w-[145px] flex justify-between items-center">
                      <input
                        className="border-none w-full outline-none text-sm text-black"
                        placeholder="00"
                      />
                      <h6 className="text-[10px] text-[#515151] font-calibri">
                        Second
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={isOpenUploadDocumnet}
        onClose={() => setIsOpenUploadDocumnet(false)}
        className="max-w-3xl"
      >
        <SelectDoumentType />
      </Modal>
    </div>
  );
};

export default UploadContent;
