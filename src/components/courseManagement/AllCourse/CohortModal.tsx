import { DataTable } from "@/components/comman/DataTable";
import Modal from "@/components/comman/Modal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "@/components/ui/datepicker";
import { Input } from "@/components/ui/input";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

interface CohortModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}

const cohortTable = [
  {
    publish: "",
    cohortName: "Enter Name",
    startDate: "dd-mm-yyyy",
    endDate: "dd-mm-yyyy",
    action: "",
  },
];

const CohortModal = ({ open, setOpen }: CohortModalProps) => {
  const [page, setPage] = useState(0);
  console.log("page", page);
  const [date, setDate] = useState<Date | undefined>(new Date());
  // console.log("date", date, id);

  const column: ColumnDef<any>[] = [
    {
      accessorKey: "publish",
      header: () => {
        return (
          <h5 className="text-[15px] font-inter font-bold leading-5">
            Publish
          </h5>
        );
      },
      cell: ({ }) => {
        return <Checkbox className="w-6 h-6 border border-[#A3A3A3]" />;
      },
      meta: {
        className: "text-center",
      },
    },
    {
      accessorKey: "cohortName",
      header: () => {
        return (
          <h5 className="text-[15px] font-inter font-bold leading-5">
            Cohort Name
          </h5>
        );
      },
      cell: ({ row }) => {
        return (
          <Input
            placeholder={row.original?.cohortName}
            className="h-[52px] text-[#A3A3A3] text-base font-normal font-calibri"
          />
        );
      },
      meta: {
        className: "w-[207px] px-[10px]",
      },
    },
    {
      accessorKey: "startDate",
      header: () => {
        return (
          <h5 className="text-[15px] font-inter font-bold leading-5">
            Start Date
          </h5>
        );
      },
      cell: ({ row }) => {
        return (
          <DatePicker
            buttonClassName="h-[52px] text-center w-full px-[10px] text-[#A3A3A3] text-base font-normal font-calibri"
            placeHolder={row.original?.startDate}
            date={date}
            setDate={setDate}
            labelText=""
          />
        );
      },
      meta: {
        className: "w-[180px] px-[10px]",
      },
    },
    {
      accessorKey: "endDate",
      header: () => {
        return (
          <h5 className="text-[15px] font-inter font-bold leading-5">
            End Date
          </h5>
        );
      },
      cell: ({ row }) => {
        return (
          <DatePicker
            buttonClassName="h-[52px] text-center w-full px-[10px] text-[#A3A3A3] text-base font-normal font-calibri"
            placeHolder={row.original?.endDate}
            date={date}
            setDate={setDate}
            labelText=""
          />
        );
      },
      meta: {
        className: "w-[180px] px-2",
      },
    },
    {
      accessorKey: "action",
      header: () => {
        return (
          <h5 className="text-[15px] font-inter font-bold leading-5">Action</h5>
        );
      },
      cell: ({ }) => {
        return (
          <div className="flex items-center gap-2">
            <Button
              variant={"secondary"}
              className="border border-[#D9D9D9] p-0 h-[32px] w-[32px]"
            >
              <Pencil className="w-4 h-4 text-[#606060]" />
            </Button>
            <Button
              variant={"secondary"}
              className="border border-[#D9D9D9] p-0 h-[32px] w-[32px]"
            >
              <Trash2 className="w-4 h-4 text-[#606060]" />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      className="max-w-[800px] w-full py-5 px-7"
    >
      <div className="">
        <div className="text-2xl font-bold font-calibri leading-7 pb-[18px]">
          Add Cohort
        </div>
        <Button
          variant={"ghost"}
          className="hover:bg-transparent text-base font-bold text-[#4285F4] font-calibri h-auto p-0 pb-5"
        >
          + Add New Row
        </Button>
        <DataTable
          columns={column}
          data={cohortTable}
          totalPages={cohortTable?.length}
          setPage={setPage}
          rounded={false}
          headerBackground={false}
        />
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
      </div>
    </Modal>
  );
};

export default CohortModal;
