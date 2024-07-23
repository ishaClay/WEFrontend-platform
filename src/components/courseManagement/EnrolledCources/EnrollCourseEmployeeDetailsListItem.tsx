import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { CircleCheck, FilePenLine, ShieldCheck } from "lucide-react";
import Modal from "@/components/comman/Modal";
import { useState } from "react";
import EvaluateModalDetails from "./EvaluateModalDetails";
import AllocateCertificateModalDetails from "./AllocateCertificateModalDetails";
import { EmployeeType } from "@/types/enroll";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { chatDPColor } from "@/lib/utils";

type employeeCourseDetailsProps = {
  data: EmployeeType;
};
const EnrollCourseEmployeeDetailsListItem = ({
  data,
}: employeeCourseDetailsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAllocate, setIsOpenAllocate] = useState(false);
  const progress = String(data?.progress)?.split(".");
  
  return (
    <>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="lg:max-w-[800px] md:max-w-[650px] sm:max-w-[550px] max-w-[335px] px-0"
      >
        <EvaluateModalDetails />
      </Modal>

      <Modal
        open={isOpenAllocate}
        onClose={() => setIsOpenAllocate(false)}
        className="max-w-3xl"
      >
        <AllocateCertificateModalDetails />
      </Modal>

      <div className="grid grid-cols-12 border border-solid md:py-4 md:px-6 sm:p-3 p-2.5 gap-2">
        <div className="flex items-center 2xl:col-span-2 sm:col-span-6 col-span-12">
          <div className="w-[40px] h-[40px] rounded-full overflow-hidden me-4">
            <Avatar className="w-full h-full">
              <AvatarImage src={data?.profileImage || ""} alt="profileImage" />
              <AvatarFallback
                className="text-white text-xl"
                style={{ background: chatDPColor(+data?.id) }}
              >
                {
                  data?.name?.charAt(0)?.toUpperCase() || data?.email?.charAt(0)?.toUpperCase()
                }
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="">
            <h5 className="font-inter text-base font-medium">{data?.name || data?.email?.split("@")[0]}</h5>
            <h6 className="text-base text-[#A3A3A3] font-normal font-inter">
              -
            </h6>
          </div>
        </div>

        <div className="text-center flex items-center 2xl:col-span-5 sm:col-span-6 col-span-12">
          <Progress color="#58BA66" value={+progress?.[0] || 0} className="w-full" isShow />
        </div>

        <div className="flex sm:flex-row flex-col gap-2 2xl:justify-end justify-center items-center 2xl:col-span-5 col-span-12">
          <div className="flex items-center pe-5">
            <Switch />
            <span className="text-[#515151] text-base font-calibri ps-2 pe-5">
              {/* {data?.complete} */}
            </span>
          </div>

          <div className="flex items-center">
            <div className="pe-5 hidden">
              <span className="text-[#58BA66] flex text-base font-calibri pe-5">
                <CircleCheck className="me-2" width={18} /> 
                {/* {data.complete} */}
              </span>
            </div>

            <div className="sm:me-4 me-2">
              <Button
                variant={"outlinePrimary"}
                className="text-[#00778b] border-[#00778b] sm:px-5 px-2 rounded-none sm:w-[164px] sm:text-base text-xs w-[146px] sm:h-10 h-9"
                onClick={() => setIsOpenAllocate(true)}
              >
                <ShieldCheck width={18} />
                Allocate Certificate
              </Button>
            </div>

            <div className="pe-5 hidden">
              <span className="text-[#58BA66] flex text-base font-calibri pe-5 sm:w-[100px] w-[80px]">
                <CircleCheck className="me-2" width={18} /> 
                {/* {data.certificate} */}
              </span>
            </div>

            <div className="">
              <Button
                className="text-white flex bg-[#00778b] sm:px-5 px-2 py-2 font-calibri sm:text-base text-xs rounded-none sm:h-10 h-9"
                onClick={() => setIsOpen(true)}
              >
                <FilePenLine width={18} /> Evaluate
              </Button>
            </div>

            <div className="hidden">
              <h6 className="text-base">
                Score: 
                {/* <span className="font-bold">{data?.score}</span> */}
              </h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnrollCourseEmployeeDetailsListItem;
