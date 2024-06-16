import Modal from "@/components/comman/Modal";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/datepicker";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

interface CohortModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: number | number;
}

const CohortModal = ({ open, setOpen, id }: CohortModalProps) => {
  const [date, setDate] = useState<Date>();
  console.log("date", date, id);

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      header="Add Cohort"
      className="w-[800px] max-w-[800px]"
    >
      <div>
        <div className="flex justify-between items-center ">
          <div className="text-[16px] font-bold font-calibri">Cohort N </div>
          <Button className="bg-transparent text-[16px] font-bold text-[#4285F4] font-calibri">
            + Add New
          </Button>
        </div>
        <div className="flex item-center gap-[20px]">
          <DatePicker
            buttonClassName="w-[320px]"
            date={date}
            setDate={setDate}
          />
          <DatePicker
            buttonClassName="w-[320px]"
            date={date}
            setDate={setDate}
          />
          <div className="flex self-end ">
            <Button variant={"secondary"} className="border border-[#D9D9D9]">
              <Pencil className="w-4 h-4" />
            </Button>
            <Button variant={"secondary"} className="border border-[#D9D9D9]">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-[23px]">
        <Button
          variant={"secondary"}
          className="text-[#000] text-[16px] font-semibold font-nunito leading-[21px] py-[15px] h-auto w-[137px]"
        >
          Cancel
        </Button>
        <Button
          variant={"default"}
          className="text-[#fff] bg-[#58BA66] text-[16px] font-semibold font-nunito leading-[21px] py-[15px] h-auto w-[137px]"
        >
          Save
        </Button>
      </div>
    </Modal>
  );
};

export default CohortModal;
