import { Button } from "@/components/ui/button";
import { Image } from "lucide-react";


const CourseBanner = () => {
  return (
    <div className="border border-[#D9D9D9] rounded-md p-7">
      <div className="">
        <div className="pb-5">
          <h6 className="text-[#515151] font-calibri text-base pb-4">
            Information
          </h6>
          <textarea
            className="w-full bg-[] border border-[#D9D9D9] rounded-md outline-none p-4 text-[#515151] font-calibri text-base"
            rows={5}
            placeholder="Text Editor"
          />
        </div>
        <div className="pb-5">
          <h6 className="text-[#515151] font-calibri text-base pb-4">
            Banner Image
          </h6>
          <div className="border flex items-center border-[#D9D9D9] p-4 rounded-md">
            <div className="">
              <div className="w-[270px] h-[190px] rounded-md bg-[#F3F3F3] flex justify-center items-center cursor-pointer">
                <span className="flex items-center text-[#9E9E9E] ">
                  <Image /> Upload Image
                </span>
              </div>
            </div>
            <div className="xl:w-[40%] text-center ps-4 xl:ps-0">
              <h6 className="text-base font-calibri pb-3">
                Size: 1024x768 pixels Max size 500KB
              </h6>
              <h6 className="text-base font-calibri pb-3">
                File Support: jpg, .jpeg
              </h6>
              <Button className="text-white bg-[#42A7C3] px-4 py-3">
                <Image className="me-2" />
                Upload Photo
              </Button>
            </div>
          </div>
        </div>
        <div className="pb-5">
          <h6 className="text-[#515151] font-calibri text-base pb-4">
            Key Outcomes
          </h6>
          <textarea
            className="w-full bg-[] border border-[#D9D9D9] rounded-md outline-none p-4 text-[#515151] font-calibri text-base"
            rows={5}
            placeholder="Text Editor"
          />
        </div>
      </div>
      <div className="text-right">
        <Button className="outline-none text-base font-inter text-white bg-[#58BA66] py-6 px-8">
          Next
        </Button>
      </div>
    </div>
  );
};

export default CourseBanner;
