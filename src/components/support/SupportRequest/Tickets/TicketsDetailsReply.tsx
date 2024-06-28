import employee_face_1 from "@/assets/images/face_1.jfif";
import employee_face_2 from "@/assets/images/face_2.jfif";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowDownToLine, FileText, Image, Video } from "lucide-react";

const TicketsDetailsReply = () => {
  return (
    <div className="bg-white rounded-xl">
      <div className="flex justify-between items-center border-b border-[#D9D9D9] p-4">
        <h6 className="font-calibri text-base font-bold">Ticket Details</h6>
      </div>
      <div className="sm:p-5 p-[15px]">
        <div className="flex sm:items-center items-start justify-between xl:mb-5 mb-4">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full overflow-hidden sm:me-4 me-[10px]">
              <img src={employee_face_1} alt="employee face" />
            </div>
            <div className="">
              <h5 className="text-black sm:text-base text-sm font-calibri">
                Danila Raffel
              </h5>
              <h6 className="text-[#A3A3A3] sm:text-sm text-xs font-calibri">
                Provider Type: Client
              </h6>
            </div>
          </div>
          <div className="sm:flex items-center block">
            <div className="flex items-center md:me-[37px] sm:me-[25px] me-0 sm:mb-0 mb-[8px]">
              <h3 className="sm:text-base text-xs text-black font-normal font-calibri sm:pe-[9px] pe-[6px]">
                Status:
              </h3>
              <Button className="text-xs bg-[#0E9CFF] text-white font-normal h-6 rounded-[10px] py-[5px] px-[10px]">
                InProgress
              </Button>
            </div>
            <div className="flex items-center sm:justify-normal justify-end">
              <h3 className="sm:text-base text-xs text-black font-normal font-calibri sm:pe-[9px] pe-[6px]">
                Priority:
              </h3>
              <Button className="text-xs font-bold bg-[#FF5252] py-[5px] px-[10px] h-auto rounded-[10px] font-calibri">
                High
              </Button>
            </div>
          </div>
        </div>

        <div className="sm:p-5 p-[15px] border border-[#D9D9D9] rounded-xl sm:mb-5 mb-[15px]">
          <div className="xl:pb-4 pb-2">
            <h6 className="text-[#A3A3A3] sm:text-base text-sm font-calibri pb-2">
              Ticket Subject
            </h6>
            <h5 className="text-black sm:text-base text-xs font-calibri">
              How to customize the template?
            </h5>
          </div>
          <div className="xl:pb-10 sm:pb-6 pb-4">
            <h6 className="text-[#A3A3A3] sm:text-base text-sm font-calibri pb-2">
              Ticket Subject
            </h6>
            <p className="sm:text-base text-xs text-black font-calibri sm:leading-[21px] leading-4">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
          <div className="flex items-center xl:gap-10 gap-5 sm:justify-normal justify-between">
            <div className="flex items-center">
              <div className="sm:w-10 sm:h-10 w-[30px] h-[30px] rounded-full bg-[#E3E5F5] flex items-center justify-center">
                <FileText className="sm:w-5 w-[14px]" />
              </div>
              <span className="text-base text-black font-calibri pl-[12px]">
                pdf file attachement.pdf
              </span>
            </div>
            <Button className="text-base uppercase bg-[#00778B] font-calibri rounded-md px-5 py-[9px] sm:block hidden">
              download
            </Button>
            <Button className="text-base uppercase bg-[#00778B] font-calibri rounded-md p-2 sm:hidden block">
              <ArrowDownToLine className="w-6" />
            </Button>
          </div>
        </div>

        <div className="sm:p-5 p-[15px] border border-[#D9D9D9] rounded-xl mb-5">
          <div className="flex items-center sm:mb-5 mb-4">
            <div className="w-8 h-8 rounded-full overflow-hidden me-4">
              <img src={employee_face_2} alt="employee face" />
            </div>
            <div className="">
              <h5 className="text-black sm:text-base text-sm font-calibri">
                Danila Raffel
              </h5>
              <h6 className="text-[#A3A3A3] sm:text-sm text-xs font-calibri">
                Provider Type: Client
              </h6>
            </div>
          </div>
          <div className="xl:pb-10 sm:pb-6 pb-2">
            <h6 className="text-[#A3A3A3] sm:text-base text-sm font-calibri pb-2">
              Ticket Subject
            </h6>
            <p className="sm:text-base text-xs text-black font-calibri sm:leading-[21px] leading-4">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
        </div>
        <div className="rounded-xl">
          <div className="md:mb-8 sm:mb-5 mb-3">
            <Label className="sm:text-base text-sm  text-black font-calibri block pb-2">
              Ticket Reply
            </Label>
            <Textarea
              className="w-full border-[#D9D9D9] text-[#A3A3A3] text-base font-calibri outline-none placeholder:text-[#A3A3A3] xl:px-5 px-3 sm:min-h-[150px] min-h-[100px]"
              placeholder="Enter details..."
            />
          </div>
          <div className="flex justify-between items-center gap-8">
            <div className="sm:flex block items-center gap-8">
              <div className="flex items-center mb-3">
                <div className="sm:w-[42px] w-[30px] sm:h-[42px] h-[30px] rounded-full bg-[#E3E5F5] flex justify-center items-center sm:me-4 me-[10px]">
                  <Image className="sm:w-auto w-[16px]" />
                </div>
                <div>
                  <h5 className="sm:text-base text-sm text-black font-calibri">
                    Upload Document
                  </h5>
                </div>
              </div>
              <div className="flex items-center">
                <div className="sm:w-[42px] w-[30px] sm:h-[42px] h-[30px] rounded-full bg-[#E3E5F5] flex justify-center items-center sm:me-4 me-[10px]">
                  <Video className="sm:w-auto w-[16px]" />
                </div>
                <div>
                  <h5 className="sm:text-base text-sm text-black font-calibri">
                    Upload Video
                  </h5>
                </div>
              </div>
            </div>
            <div className="">
              <Button className="sm:text-base tet-sm font-semibold bg-[#58BA66] sm:px-6 px-[22px]">
                SUBMIT
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketsDetailsReply;
