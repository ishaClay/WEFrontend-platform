import { Button } from "@/components/ui/button";
import { CirclePlus, CircleX, Link } from "lucide-react";
import UploadContent from "./UploadContent";
import { Switch } from "@/components/ui/switch";

const ModuleCreationItems = ({ data }: { data: any }) => {
  return (
    <div className="">
      <div className="border border-[#D9D9D9] rounded-lg mb-5">
        <div className="border-b border-[#D9D9D9] p-5">
          <div className="flex justify-between items-center">
            <h4 className="font-bold font-calibri text-xl pb-4">
              Module {data.moduleId}
            </h4>
            <Button className="text-[#FF5252] text-sm bg-transparent hover:bg-transparent font-calibri">
              <CircleX className="me-1" width={18} />
              Add Remove
            </Button>
          </div>
          <div className="">
            <h6 className="text-base font-calibri text-[#515151] pb-2">
              Module Title
            </h6>
            <input
              placeholder={data.moduleTitle}
              className="border border-[#D9D9D9] rounded-md px-4 py-3 w-full outline-none text-base text-[#1D2026] font-calibri"
            />
          </div>
        </div>
        <div className="p-5">
          <div className="pb-5">
            <div className="pb-2 flex justify-between items-center">
              <h6 className="text-base font-calibri text-[#515151]">
                Section Title
              </h6>
              <h6 className="text-base flex items-center font-calibri text-[#515151]">
                <Switch className="me-3" />
                Live Session
              </h6>
            </div>
            <input
              placeholder={data.sectionTitle}
              className="border border-[#D9D9D9] rounded-md px-4 py-3 w-full outline-none text-base text-[#1D2026] font-calibri"
            />
          </div>
          <div className="pb-5">
            <h6 className="text-base font-calibri text-[#515151] pb-2">
              Information <span className="text-xs">(Max 1000words only)</span>
            </h6>
            <textarea
              placeholder={data.moduleInformation}
              className="px-4 py-5 w-full h-[150px] border border-[#D9D9D9] rounded-md text-base font-calibri text-black outline-none"
            />
          </div>
          <UploadContent data={data} />
          <div className="pb-5">
            <h6 className="text-base font-calibri text-[#515151] pb-2">
              OR Enter Youtube Video URL
            </h6>
            <input
              placeholder={data.moduleUrl}
              className="border border-[#D9D9D9] rounded-md px-4 py-3 w-full outline-none text-base text-[#606060] font-calibri"
            />
          </div>
          <div className="pb-5">
            <h6 className="text-base font-calibri text-[#515151] pb-2">
              Upload Related Document to Download
              <span className="text-xs">
                (Supported File:- .Pdf, .Ppt, docx)
              </span>
            </h6>
            <div className="border border-[#D9D9D9] rounded-md px-4 py-2 w-full flex justify-between items-center">
              <input
                placeholder={data.documentDownload}
                className="border-bone w-full outline-none text-base text-[#606060] font-calibri"
              />
              <Button className="bg-[#42A7C3] font-bold text-xs font-calibri">
                <Link width={20} className="me-2" />
                Upload Attachment
              </Button>
            </div>
          </div>

          <div className="">
            <div className="flex">
              <div className="">
                <h6 className="text-base text-[#515151] font-calibri pb-3">
                  Section Duration (HH)
                </h6>
                <div className="border border-[#D9D9D9] rounded-md p-3 w-[145px] me-5 flex justify-between items-center">
                  <input
                    className="border-none w-full outline-none text-sm text-black"
                    placeholder="1:00"
                  />
                  <h6 className="text-[10px] text-[#515151] font-calibri">
                    Hours
                  </h6>
                </div>
              </div>
              <div className="">
                <h6 className="text-base text-[#515151] font-calibri pb-3">
                  Section Minute (MM)
                </h6>
                <div className="border border-[#D9D9D9] rounded-md p-3 w-[145px] me-5 flex justify-between items-center">
                  <input
                    className="border-none w-full outline-none text-sm text-black"
                    placeholder="30:00"
                  />
                  <h6 className="text-[10px] text-[#515151] font-calibri">
                    Minute
                  </h6>
                </div>
              </div>
              <div className="">
                <h6 className="text-base text-[#515151] font-calibri pb-3">
                  Section Seconds (SS)
                </h6>
                <div className="border border-[#D9D9D9] rounded-md p-3 w-[145px] flex justify-between items-center">
                  <input
                    className="border-none w-full outline-none text-sm text-black"
                    placeholder="30:00"
                  />
                  <h6 className="text-[10px] text-[#515151] font-calibri">
                    Second
                  </h6>
                </div>
              </div>
            </div>
          </div>

          <div className="text-right">
            <Button className="bg-[#42A7C3] px-4 py-2 me-4 font-inter text-xs">
              <CirclePlus width={20} className="me-2" /> Add Assessment
            </Button>
            <Button className="bg-[#42A7C3] px-4 py-2 font-inter text-xs">
              <CirclePlus width={20} className="me-2" /> Add More Section
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleCreationItems;
