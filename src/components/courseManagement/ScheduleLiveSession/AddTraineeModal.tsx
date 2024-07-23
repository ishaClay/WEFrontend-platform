import Loader from "@/components/comman/Loader";
import { QUERY_KEYS } from "@/lib/constants";
import { getTrainee } from "@/services/apiServices/trainer";
import { useQuery } from "@tanstack/react-query";
import { Search, SlidersHorizontal } from "lucide-react";
import SelectMenu from "../../comman/SelectMenu";
import { Button } from "../../ui/button";
import { Checkbox } from "../../ui/checkbox";
import { Input } from "../../ui/input";
import { ScrollArea } from "../../ui/scroll-area";
import TraineeItems from "./TraineeItems";

interface TraineeModalProps {
  formData: any;
  selectCompanyOptions: any[];
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

interface TraineeEmployee {
  name: string;
  companyName: string;
  id: number;
}

const AddTraineeModal = ({
  formData,
  setFormData,
  selectCompanyOptions,
  setIsOpen,
}: TraineeModalProps) => {
  const { data: fetchTrainee, isPending } = useQuery({
    queryKey: [QUERY_KEYS.fetchTrainee],
    queryFn: () => getTrainee(formData.selectCompany?.toString() || ""),
  });


  const traineeEmployee = fetchTrainee?.data?.trainer?.map(
    (i: TraineeEmployee) => ({
      name: i?.name,
      companyName: fetchTrainee?.data?.name,
      id: i?.id,
    })
  );

  const handleChanges = (e: boolean, data: TraineeEmployee[]) => {
    if (e) {
      setFormData((prev: any) => ({
        ...prev,
        traineeList: data?.map((item) => ({ name: item.name, id: item.id })),
      }))
    } else {
      setFormData((prev: any) => ({
        ...prev,
        traineeList: [],
      }))
    }
  };

  return (
    <div className="">
      <h5 className="text-[20px] text-black font-abhaya font-semibold">
        Add Trainee
      </h5>
      <h6 className="text-[#606060] text-base font-abhaya">
        Add a trainee to the upcoming Live Session
      </h6>
      <div className="sm:flex block items-center justify-between mt-3">
        <div className="">
          <div className="flex items-center border border-[#D9D9D9] rounded-md px-4 sm:w-[350px] w-[280px] sm:h-[52px] h-[48px] sm:mb-0 mb-3">
            <Search className="text-[#A3A3A3]" />
            <Input
              placeholder="Search by name, company"
              className="text-[#A3A3A3] placeholder:text-[#A3A3A3] border-none text-[15px]"
            />
          </div>
        </div>
        <div className="relative">
          <SelectMenu
            option={selectCompanyOptions}
            setValue={(data: string) =>
              setFormData((prev: any) => ({
                ...prev,
                selectCompany: data,
              }))
            }
            value={formData.selectCompany}
            className="text-black bg-transparent text-base font-abhaya font-bold border border-[#D9D9D9] w-[170px] sm:h-[52px] h-[48px] p-4 ps-8"
            itemClassName="text-base font-medium font-abhaya bg-transparent"
            placeholder="Company"
          />
          <SlidersHorizontal
            width={18}
            className="absolute top-0 bottom-0 left-[10px] m-auto text-[#A3A3A3]"
          />
        </div>
      </div>
      <div className="mt-3">
        <div className="flex items-center justify-between mb-5">
          <h5 className="text-base text-black font-abhaya font-semibold">
            Trainees
          </h5>
          <span className="text-base text-black font-abhaya flex items-center font-semibold">
            Select All{" "}
            <Checkbox
              className="ms-3 border-[#D9D9D9] w-6 h-6"
              onCheckedChange={(e) => handleChanges(!!e, traineeEmployee)}
            />
          </span>
        </div>
        <div className="">
          <ScrollArea className="h-[300px]">
            {traineeEmployee?.map((data: any, index: number) => {
              return (
                <TraineeItems
                  key={index}
                  data={data}
                  formData={formData}
                  setFormData={setFormData}
                />
              );
            })}
          </ScrollArea>
        </div>
      </div>
      <div className="text-right mt-5">
        <Button
          className="uppercase xl:text-base text-sm font-nunito bg-[#58BA66] xl:h-12 h-10 xl:px-6 px-5"
          onClick={() => {
            formData.traineeList?.length > 0 && setIsOpen(false);
          }}
        >
          Add Trainee
        </Button>
      </div>
      {isPending && <Loader />}
    </div>
  );
};

export default AddTraineeModal;
