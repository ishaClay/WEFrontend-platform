import employee_face_1 from "@/assets/images/face_1.jfif";
import employee_face_2 from "@/assets/images/face_2.jfif";
import SelectMenu from "@/components/comman/SelectMenu";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Image, Video } from "lucide-react";
import { useState } from "react";

const selectNameOption = [
  {
    label: "Select Name 1",
    value: "Select_Name_1",
  },
  {
    label: "Select Name 2",
    value: "Select_Name_2",
  },
  {
    label: "Select Name 3",
    value: "Select_Name_3",
  },
];

const ticketStatusOption = [
  {
    label: "Ticket Status 1",
    value: "Ticket_Status_1",
  },
  {
    label: "Ticket Status 2",
    value: "Ticket_Status_2",
  },
  {
    label: "Ticket Status 3",
    value: "Ticket_Status_1",
  },
];

const TicketsDetailsReply = () => {
  const [selectName, setSelectName] = useState("");
  const [ticketStatus, setTicketStatus] = useState("");
  return (
    <div className="bg-white rounded-xl">
      <div className="flex justify-between items-center border-b border-[#D9D9D9] p-4">
        <h6 className="font-calibri text-base font-bold">Ticket Details</h6>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between xl:mb-10 mb-6">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full overflow-hidden me-4">
              <img src={employee_face_1} alt="employee face" />
            </div>
            <div className="">
              <h5 className="text-black text-base font-calibri">
                Danila Raffel
              </h5>
              <h6 className="text-[#A3A3A3] text-sm font-calibri">
                Provider Type: Client
              </h6>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex items-center me-3">
              <h3 className="text-base text-black font-normal font-nunito">
                Status:
              </h3>
              <Button className="text-xs text-[#58BA66] font-bold bg-transparent hover:bg-transparent h-6">
                Answered
              </Button>
            </div>
            <div className="flex items-center">
              <h3 className="text-base text-black font-normal font-nunito pe-3">
                Priority:
              </h3>
              <Button className="text-xs font-bold bg-[#FF5252] h-8 font-calibri rounded-full">
                High
              </Button>
            </div>
          </div>
        </div>

        <div className="p-5 border border-[#D9D9D9] rounded-xl mb-5">
          <div className="xl:pb-4 pb-2">
            <h6 className="text-[#A3A3A3] text-base font-calibri pb-2">
              Ticket Subject
            </h6>
            <h5 className="text-black text-base font-calibri">
              How to customize the template?
            </h5>
          </div>
          <div className="xl:pb-10 pb-6">
            <h6 className="text-[#A3A3A3] text-base font-calibri pb-2">
              Ticket Subject
            </h6>
            <p className="text-base text-black font-calibri">
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
          <div className="flex items-center xl:gap-10 gap-5">
            <div className="w-10 h-10 rounded-full bg-[#E3E5F5] flex items-center justify-center">
              <FileText width={20} />
            </div>
            <span className="text-base text-black font-calibri">
              pdf file attachement.pdf
            </span>
            <Button className="text-base uppercase bg-[#00778B] font-calibri rounded-md px-6">
              download
            </Button>
          </div>
        </div>

        <div className="p-5 border border-[#D9D9D9] rounded-xl mb-5">
          <div className="flex items-center mb-5">
            <div className="w-8 h-8 rounded-full overflow-hidden me-4">
              <img src={employee_face_2} alt="employee face" />
            </div>
            <div className="">
              <h5 className="text-black text-base font-calibri">
                Danila Raffel
              </h5>
              <h6 className="text-[#A3A3A3] text-sm font-calibri">
                Provider Type: Client
              </h6>
            </div>
          </div>
          <div className="xl:pb-10 pb-6">
            <h6 className="text-[#A3A3A3] text-base font-calibri pb-2">
              Ticket Subject
            </h6>
            <p className="text-base text-black font-calibri">
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
        <div className="p-5 border border-[#D9D9D9] rounded-xl">
          <div className="grid grid-cols-2 gap-5 mb-5">
            <div className="col-span-1">
              <Label className="text-base text-black font-calibri block pb-2">
                Assign To
              </Label>
              <SelectMenu
                option={selectNameOption}
                setValue={(data: string) => setSelectName(data)}
                value={selectName}
                className="text-[#A3A3A3] text-base font-calibri border-[#D9D9D9] xl:h-12 h-10 xl:px-5 px-3"
                placeholder="Select Name"
              />
            </div>
            <div className="col-span-1">
              <Label className="text-base text-black font-calibri block pb-2">
                Ticket Status
              </Label>
              <SelectMenu
                option={ticketStatusOption}
                setValue={(data: string) => setTicketStatus(data)}
                value={ticketStatus}
                className="text-[#A3A3A3] text-base font-calibri border-[#D9D9D9] xl:h-12 h-10 xl:px-5 px-3"
                placeholder="Closed"
              />
            </div>
          </div>
          <div className="mb-8">
            <Label className="text-base text-black font-calibri block pb-2">
              Ticket Reply
            </Label>
            <Textarea
              className="w-full border-[#D9D9D9] text-[#A3A3A3] text-base font-calibri outline-none placeholder:text-[#A3A3A3] xl:px-5 px-3"
              placeholder="Enter details"
            />
          </div>
          <div className="flex justify-between items-center gap-8">
            <div className="flex items-center gap-8">
              <div className="flex items-center">
                <div className="w-[42px] h-[42px] rounded-full bg-[#E3E5F5] flex justify-center items-center me-4">
                  <Image />
                </div>
                <div className="text-base text-black font-calibri">
                  <h5 className="tetx-base text-black font-calibri">
                    Upload Document
                  </h5>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-[42px] h-[42px] rounded-full bg-[#E3E5F5] flex justify-center items-center me-4">
                  <Video />
                </div>
                <div className="text-base text-black font-calibri">
                  <h5 className="tetx-base text-black font-calibri">
                    Upload Video
                  </h5>
                </div>
              </div>
            </div>
            <div className="">
              <Button className="text-base bg-[#58BA66] px-6">SUBMIT</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketsDetailsReply;
