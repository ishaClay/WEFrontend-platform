import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { CircleCheck, FilePenLine, ShieldCheck } from "lucide-react";
import Modal from "@/components/comman/Modal";
import { useState } from "react";
import EvaluateModalDetails from "./EvaluateModalDetails";
import AllocateCertificateModalDetails from "./AllocateCertificateModalDetails";

type employeeCourseDetailsProps = {
  data: {
    image: string;
    name: string;
    subtitle: string;
    complete: string;
    score: string;
    certificate: string;
    evauate: string;
  };
};
const EnrollCourseEmployeeDetailsListItem = ({
  data,
}: employeeCourseDetailsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAllocate, setIsOpenAllocate] = useState(false);
  return (
    <div>
      <div className="grid grid-cols-12 border border-solid py-4 px-6">
        <div className="flex items-center 2xl:col-span-2 col-span-4">
          <div className="w-[40px] h-[40px] rounded-full overflow-hidden me-4">
            <img src={data.image} />
          </div>
          <div className="">
            <h5 className="font-inter text-base font-medium">{data.name}</h5>
            <h6 className="text-base text-[#A3A3A3] font-normal font-inter">
              {data.subtitle}
            </h6>
          </div>
        </div>

        <div className="text-center flex items-center 2xl:col-span-5 col-span-6">
          <Progress color="#58BA66" value={20} className="w-full" />
        </div>

        <div className="flex 2xl:justify-end justify-center items-center 2xl:col-span-5 col-span-12 2xl:pt-0 pt-3">
          <div className="flex items-center pe-5">
            <Switch />
            <span className="text-[#515151] text-base font-calibri ps-2 pe-5">
              {data.complete}
            </span>
          </div>

          <div className="pe-5 hidden">
            <span className="text-[#58BA66] flex text-base font-calibri pe-5">
              <CircleCheck className="me-2" width={18} /> {data.complete}
            </span>
          </div>

          <div className="me-4">
            <Button
              variant={"outlinePrimary"}
              className="text-[#00778b] border-[#00778b] rounded-none"
              onClick={() => setIsOpenAllocate(true)}
            >
              <ShieldCheck width={18} />
              Allocate Certificate
            </Button>
          </div>

          <div className="pe-5 hidden">
            <span className="text-[#58BA66] flex text-base font-calibri pe-5">
              <CircleCheck className="me-2" width={18} /> {data.certificate}
            </span>
          </div>

          <div className="">
            <Button
              className="text-white flex bg-[#00778b] px-5 py-2 font-calibri text-base rounded-none"
              onClick={() => setIsOpen(true)}
            >
              <FilePenLine width={18} /> Evaluate
            </Button>
          </div>

          <div className="hidden">
            <h6 className="text-base">
              Score: <span className="font-bold">{data.score}</span>
            </h6>
          </div>
        </div>
      </div>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="max-w-3xl px-0"
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
    </div>
  );
};

export default EnrollCourseEmployeeDetailsListItem;
