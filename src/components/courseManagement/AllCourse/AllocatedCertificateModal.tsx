import { Dispatch, SetStateAction, useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { TrainersResponse } from "@/types/Trainer";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getTrainer } from "@/services/apiServices/trainer";
import { trainerAllocateCourse } from "@/services/apiServices/allocatedcourse";
import Modal from "@/components/comman/Modal";
import { toast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";
import Autocomplete from "@/components/comman/MultipleSelectMenu";

const AllocatedCertificateModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: string;
  setIsOpen: Dispatch<SetStateAction<string>>;
}) => {
  const [selectFilter, setSelectFilter] = useState<
    { label: string; value: string }[]
  >([]);
  console.log("selectFilter", selectFilter);
  
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const id = userData?.query?.detailsid;

  const { data } = useQuery<TrainersResponse>({
    queryKey: ["trainer", { id }],
    queryFn: () => getTrainer({ page: 1, limit: 1000000, keyword: "", id }),
  });

  const filterModal = data?.data?.map((item) => {
    return {
      label: String(item?.name || item?.email?.split("@")[0]),
      value: String(item?.id),
    };
  });

  const handleClose = () => {
    setIsOpen("");
    setSelectFilter([]);
  };

  const { mutate: allocate, isPending: isLoadingAllocate } = useMutation({
    mutationFn: trainerAllocateCourse,
    onSuccess: () => {
      toast({
        variant: "success",
        description: "Course allocated successfully",
      });
      handleClose();
    },
    onError: (error: AxiosError) => {
      toast({
        variant: "destructive",
        description: error.message,
      });
    },
  });

  const handleAllocate = () => {
    const payload = {
      courseId: +isOpen as number,
      traineeId: selectFilter.map((item) => +item.value) || [],
    };
    allocate(payload);
  };

  return (
    <>
      <Modal open={!!isOpen} onClose={handleClose}>
        <div>
          <h4 className="text-2xl font-bold mb-5 font-inter">
            Allocate Course
          </h4>
          <Label className="text-base mb-2 block">Trainer List</Label>
          <Autocomplete
            suggestions={filterModal || []}
            selectedItems={selectFilter}
            setSelectedItems={setSelectFilter}
          />
          <div className="flex justify-end gap-4 mt-7">
            <Button
              type="button"
              onClick={handleClose}
              className="w-[100px] h-[45px] text-base bg-red-500 hover:bg-red-600"
            >
              Cancel
            </Button>
            <Button
              type="button"
              isLoading={isLoadingAllocate}
              onClick={handleAllocate}
              className="w-[100px] h-[45px] text-base bg-green-600 hover:bg-green-700"
            >
              Submit
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AllocatedCertificateModal;
