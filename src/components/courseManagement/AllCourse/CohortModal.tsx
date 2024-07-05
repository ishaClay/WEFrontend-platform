/* eslint-disable react-hooks/exhaustive-deps */
import Modal from "@/components/comman/Modal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "@/components/ui/datepicker";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

interface CohortModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}

interface CohortDataType {
  id: number;
  publish: boolean;
  cohortName: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
}

const InitialData = {
  id: 1,
  publish: false,
  cohortName: "",
  startDate: undefined,
  endDate: undefined,
};

const CohortModal = ({ open, setOpen }: CohortModalProps) => {
  const [cohortData, setCohortData] = useState<CohortDataType[]>([InitialData]);
  // console.log("date", date, id);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const handleChanges = (e: any, id: number, title?: string) => {
    console.log("+++++", e);

    if (title) {
      setCohortData((prev) => {
        return prev.map((item) => {
          if (item.id === id) {
            return { ...item, [title]: e };
          }
          return item;
        });
      });
    } else {
      const { value, name, checked } = e.target;
      setCohortData((prev) => {
        return prev.map((item) => {
          if (item.id === id) {
            return { ...item, [name]: name === "publish" ? checked : value };
          }
          return item;
        });
      });
    }
  };

  const handleAddRow = () => {
    setCohortData((prev) => [
      ...prev,
      {
        id: cohortData?.length + 1,
        publish: false,
        cohortName: "",
        startDate: undefined,
        endDate: undefined,
      },
    ]);
  };

  const handleRemoveRow = (id: number) => {
    setCohortData((prev) => prev.filter((item) => item.id !== id));
  };

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
          onClick={handleAddRow}
          className="hover:bg-transparent text-base font-bold text-[#4285F4] font-calibri h-auto p-0 pb-5"
        >
          + Add New Row
        </Button>
        <div className="max-h-[400px] overflow-auto mb-4">
          {/* <DataTable
            columns={column}
            data={cohortData}
            rounded={false}
            headerBackground={false}
          /> */}
          <Table>
            <TableHeader className="border-t">
              <TableRow>
                <TableHead className="w-[60px] px-[10px] py-[16px] text-black text-[15px] font-inter font-[600]">
                  Publish
                </TableHead>
                <TableHead className=" px-[10px] py-[16px] text-black text-[15px] font-inter font-[600]">
                  Cohort Name
                </TableHead>
                <TableHead className="w-[157px] px-[10px] py-[16px] text-black text-[15px] font-inter font-[600]">
                  Start Date
                </TableHead>
                <TableHead className="w-[157px] px-[10px] py-[16px] text-black text-[15px] font-inter font-[600]">
                  End Date
                </TableHead>
                <TableHead className="w-[100px] px-2 py-[16px] text-black text-[15px] font-inter font-[600]">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cohortData?.map((item) => {
                return (
                  <TableRow key={item.id} className="border-0 py-[9px]">
                    <TableCell className="w-[60px] !px-[10px] py-[9px] text-black text-center text-[15px] font-inter font-[600]">
                      <Checkbox
                        checked={item?.publish}
                        onCheckedChange={(e) =>
                          handleChanges(e, item.id, "publish")
                        }
                        className="w-6 h-6 border border-[#A3A3A3]"
                      />
                    </TableCell>
                    <TableCell className="px-[10px] py-[9px] text-black text-[15px] font-inter font-[600]">
                      <Input
                        value={item?.cohortName}
                        className="h-[52px] text-[#A3A3A3] text-base font-normal font-calibri"
                        placeholder="Enter Name"
                        name="cohortName"
                        onChange={(e) => handleChanges(e, item.id)}
                      />
                    </TableCell>
                    <TableCell className="px-[10px] py-[9px] text-black text-[15px] font-inter font-[600]">
                      <DatePicker
                        buttonClassName="h-[52px] text-center w-full px-[10px] text-[#A3A3A3] text-base font-normal font-calibri"
                        placeHolder={"dd-mm-yyyy"}
                        date={item?.startDate}
                        setDate={(date) =>
                          handleChanges(date, item.id, "startDate")
                        }
                        labelText=""
                      />
                    </TableCell>
                    <TableCell className="px-[10px] py-[9px] text-black text-[15px] font-inter font-[600]">
                      <DatePicker
                        buttonClassName="h-[52px] text-center w-full px-[10px] text-[#A3A3A3] text-base font-normal font-calibri"
                        placeHolder={"dd-mm-yyyy"}
                        date={item?.endDate}
                        setDate={(date) =>
                          handleChanges(date, item.id, "endDate")
                        }
                        labelText=""
                      />
                    </TableCell>
                    <TableCell className="px-[10px] py-[9px] text-black text-[15px] font-inter font-[600]">
                      <div className="flex items-center gap-2">
                        <Button
                          variant={"secondary"}
                          className="border border-[#D9D9D9] p-0 h-[32px] w-[32px]"
                        >
                          <Pencil className="w-4 h-4 text-[#606060]" />
                        </Button>
                        <Button
                          variant={"secondary"}
                          onClick={() => handleRemoveRow(item.id)}
                          className="border border-[#D9D9D9] p-0 h-[32px] w-[32px]"
                        >
                          <Trash2 className="w-4 h-4 text-[#606060]" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
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
      </div>
    </Modal>
  );
};

export default CohortModal;
