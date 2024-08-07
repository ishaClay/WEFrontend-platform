/* eslint-disable react-hooks/exhaustive-deps */
import Loader from "@/components/comman/Loader";
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
import { toast } from "@/components/ui/use-toast";
import { QUERY_KEYS } from "@/lib/constants";
import { arraysAreEqual } from "@/lib/utils";
import {
  createCohort,
  getCohortsByCourse,
} from "@/services/apiServices/cohort";
import { ErrorType } from "@/types/Errors";
import { cohortgroupResponse } from "@/types/cohort";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil, Trash2 } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";

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
  isEdit: boolean;
}

const InitialData = {
  id: 1,
  publish: false,
  cohortName: "",
  startDate: undefined,
  endDate: undefined,
  isEdit: true,
};

const CohortModal = ({ open, setOpen, id }: CohortModalProps) => {
  const [cohortData, setCohortData] = useState<CohortDataType[]>([InitialData]);
  const { data, isLoading } = useQuery<cohortgroupResponse>({
    queryKey: [QUERY_KEYS.getCohortsByCourse, { id, open }],
    queryFn: () => getCohortsByCourse(id),
    enabled: !!open && !!id,
  });
  const queryClient = useQueryClient();

  useEffect(() => {
    if (data?.data && data?.data?.length > 0) {
      const newData: CohortDataType[] = data?.data?.map((item) => {
        const startDate = new Date(
          `${+item?.slotStartDate?.month}/${+item?.slotStartDate?.date}/${+item
            ?.slotStartDate?.year}`
        );
        const endDate = new Date(
          `${+item?.slotEndDate?.month}/${+item?.slotEndDate?.date}/${+item
            ?.slotEndDate?.year}`
        );
        return {
          id: item?.id,
          publish: item?.publish === 0 ? false : true,
          cohortName: item?.name,
          startDate: startDate,
          endDate: endDate,
          isEdit: false,
        };
      });
      setCohortData(newData);
    }
  }, [data]);

  const handleChanges = (e: any, id: number, title?: string) => {
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
        isEdit: true,
      },
    ]);
  };

  const handleRemoveRow = (id: number) => {
    setCohortData((prev) => prev.filter((item) => item.id !== id));
  };

  const handleEdit = (id: number) => {
    setCohortData((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          return { ...item, isEdit: item.isEdit ? false : true };
        }
        return item;
      });
    });
  };

  const handleClose = () => {
    setOpen(false);
    setCohortData([InitialData]);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: createCohort,
    onSuccess: (data) => {
      console.log("data", data);

      toast({
        title: "Success",
        description: data?.message,
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.fetchAllCourse],
      });
      handleClose();
    },
    onError: (error: ErrorType) => {
      toast({
        variant: "destructive",
        title: error.data.message,
      });
    },
  });

  const handleSubmit = () => {
    const dataNew = cohortData.map((item) => {
      if (item.cohortName !== "") {
        return {
          name: item.cohortName,
          publish: item.publish ? 1 : 0,
          slotStartDate: {
            date: moment(item.startDate).format("DD"),
            month: moment(item.startDate).format("MM"),
            year: moment(item.startDate).format("YYYY"),
          },
          slotEndDate: {
            date: moment(item.endDate).format("DD"),
            month: moment(item.endDate).format("MM"),
            year: moment(item.endDate).format("YYYY"),
          },
        };
      }
    });

    const newData = data?.data?.map((item) => {
      const startDate = new Date(
        `${+item?.slotStartDate?.month}/${+item?.slotStartDate?.date}/${+item
          ?.slotStartDate?.year}`
      );
      const endDate = new Date(
        `${+item?.slotEndDate?.month}/${+item?.slotEndDate?.date}/${+item
          ?.slotEndDate?.year}`
      );
      return {
        id: item?.id,
        publish: item?.publish === 0 ? false : true,
        cohortName: item?.name,
        startDate: startDate,
        endDate: endDate,
        isEdit: false,
      };
    });

    const filteredData = dataNew.filter(
      (item) => item !== null && item !== undefined
    );

    const payload = {
      timeSlot: filteredData,
      courseVersion: id,
    };

    if (filteredData?.length > 0) {
      if (
        !arraysAreEqual(
          cohortData?.filter(
            (item) =>
              item.cohortName !== "" &&
              item.startDate !== undefined &&
              item.endDate !== undefined
          ),
          newData
        )
      ) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        mutate(payload);
      } else {
        toast({
          variant: "destructive",
          title: "Previous data: no changes!",
        });
      }
    } else {
      toast({
        variant: "destructive",
        title: "Please add atleast one cohort",
      });
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className="lg:max-w-[800px] sm:max-w-[650px] max-w-[90%] w-full py-5 px-7 rounded-lg"
    >
      {isLoading ? (
        <Loader />
      ) : (
        <div className="">
          <div className="sm:text-2xl text-xl font-bold font-calibri leading-7 sm:pb-[18px] pb-3">
            Add Cohort
          </div>
          <Button
            variant={"ghost"}
            onClick={handleAddRow}
            className="hover:bg-transparent text-base font-bold text-[#4285F4] font-calibri h-auto p-0 sm:pb-5 pb-4"
          >
            + Add New Row
          </Button>
          <div
            className="max-h-[400px] lg:min-w-full lg:max-w-full sm:min-w-[calc(650px-50px)] sm:max-w-[calc(650px-50px)] min-w-[calc(100vw-100px)] max-w-[calc(100vw-100px)] overflow-auto mb-4"
            id="scrollStyle"
          >
            {/* <DataTable
            columns={column}
            data={cohortData}
            rounded={false}
            headerBackground={false}
          /> */}
            <Table mainClassName="lg:w-full lg:min-w-full lg:max-w-full min-w-[calc(750px-50px)] max-w-[calc(750px-50px)] overflow-auto">
              <TableHeader className="border-t">
                <TableRow>
                  <TableHead className="w-[60px] px-[10px] py-[16px] text-black text-[15px] font-inter font-[600]">
                    Publish
                  </TableHead>
                  <TableHead className="w-[234px] px-[10px] py-[16px] text-black text-[15px] font-inter font-[600]">
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
                          disabled={!item?.isEdit}
                          onCheckedChange={(e) =>
                            handleChanges(e, item.id, "publish")
                          }
                          className="w-6 h-6 border border-[#A3A3A3]"
                        />
                      </TableCell>
                      <TableCell className="px-[10px] py-[9px] text-black text-[15px] font-inter font-[600]">
                        <Input
                          value={item?.cohortName}
                          className="h-[52px] text-[#000] text-base font-normal font-calibri"
                          placeholder="Enter Name"
                          name="cohortName"
                          disabled={!item?.isEdit}
                          onChange={(e) => handleChanges(e, item.id)}
                        />
                      </TableCell>
                      <TableCell className="px-[10px] py-[9px] text-black text-[15px] font-inter font-[600]">
                        <DatePicker
                          buttonClassName="h-[52px] text-center w-full px-[10px] text-[#000] text-base font-normal font-calibri"
                          placeHolder={"dd-mm-yyyy"}
                          date={item?.startDate}
                          disabled={!item?.isEdit}
                          fromDate={new Date()}
                          setDate={(date) =>
                            handleChanges(date, item.id, "startDate")
                          }
                          labelText=""
                        />
                      </TableCell>
                      <TableCell className="px-[10px] py-[9px] text-black text-[15px] font-inter font-[600]">
                        <DatePicker
                          buttonClassName="h-[52px] text-center w-full px-[10px] text-[#000] text-base font-normal font-calibri"
                          placeHolder={"dd-mm-yyyy"}
                          date={item?.endDate}
                          disabled={!item?.isEdit}
                          fromDate={item?.startDate}
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
                            type="button"
                            className="border border-[#D9D9D9] p-0 h-[32px] w-[32px]"
                            onClick={() => handleEdit(item.id)}
                          >
                            <Pencil className="w-4 h-4 text-[#606060]" />
                          </Button>
                          {!item.publish && (
                            <Button
                              variant={"secondary"}
                              onClick={() => handleRemoveRow(item.id)}
                              className="border border-[#D9D9D9] p-0 h-[32px] w-[32px]"
                            >
                              <Trash2 className="w-4 h-4 text-[#606060]" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center md:gap-[23px] gap-5">
            <Button
              type="button"
              variant={"secondary"}
              onClick={handleClose}
              className="text-[#000] text-[16px] font-semibold font-nunito leading-[21px] md:py-[15px] py-3 h-auto md:w-[137px] w-[120px]"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              variant={"default"}
              className="text-[#fff] bg-[#58BA66] text-[16px] font-semibold font-nunito leading-[21px] md:py-[15px] py-3 h-auto md:w-[137px] w-[120px]"
              isLoading={isPending}
            >
              Save
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default CohortModal;
