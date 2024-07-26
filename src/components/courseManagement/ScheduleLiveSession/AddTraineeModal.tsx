import Loader from "@/components/comman/Loader";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { QUERY_KEYS } from "@/lib/constants";
import { getTrainee } from "@/services/apiServices/trainer";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { Button } from "../../ui/button";
import { Checkbox } from "../../ui/checkbox";
import { Input } from "../../ui/input";
import { ScrollArea } from "../../ui/scroll-area";
import TraineeItems from "./TraineeItems";
import { toast } from "@/components/ui/use-toast";

interface TraineeModalProps {
  selectCompanyOptions: any[];
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  watch: any;
  control: any;
  setTraineeList: React.Dispatch<React.SetStateAction<any>>;
  traineeList: any;
}

interface TraineeEmployee {
  name: string;
  companyName: string;
  id: number;
  company?: any;
}

const AddTraineeModal = ({
  watch,
  selectCompanyOptions,
  setIsOpen,
  control,
  setTraineeList,
  traineeList,
}: TraineeModalProps) => {
  const { data: fetchTrainee, isPending } = useQuery({
    queryKey: [QUERY_KEYS.fetchTrainee],
    queryFn: () => getTrainee({ companyIds: watch("selectCompany") || [] }),
  });
  const [searchQuery, setSearchQuery] = useState("");

  const traineeEmployee =
    fetchTrainee?.data?.map((i: TraineeEmployee) => ({
      name: i.name,
      companyName: i.company?.name || "",
      id: i.id,
    })) || [];

  const filteredData = traineeEmployee.filter(
    (data: TraineeEmployee) =>
      data.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      data.companyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log("traineeEmployee", traineeEmployee);

  const handleChanges = (e: boolean, data: TraineeEmployee[]) => {
    if (e) {
      setTraineeList((prev: any) => {
        return [
          ...prev,
          ...data?.map((item) => ({ name: item.name, id: item.id })),
        ];
      });
    } else {
      setTraineeList([]);
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="relative">
          <Controller
            control={control}
            name="selectCompany"
            defaultValue={[""]}
            render={({ field: { onChange, value } }) => {
              return (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="flex" variant="outline">
                      <SlidersHorizontal
                        width={18}
                        className="text-[#A3A3A3]"
                      />
                      Company
                      <ChevronDown className="text-[#A3A3A3]" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full">
                    <div className="overflow-auto h-[300px]">
                      {selectCompanyOptions?.map(
                        (i: { value: string; label: string }) => (
                          <DropdownMenuCheckboxItem
                            key={i.value}
                            checked={value.includes(i.value)}
                            onCheckedChange={(checked) => {
                              onChange(
                                checked
                                  ? [...value, i.value].filter((item) => item)
                                  : value.filter(
                                      (item: string) => item !== i.value
                                    )
                              );
                            }}
                          >
                            {i.label}
                          </DropdownMenuCheckboxItem>
                        )
                      )}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            }}
          />
        </div>
      </div>
      <div className="mt-3">
        <div className="flex items-center justify-between mb-5">
          <h5 className="text-base text-black font-abhaya font-semibold">
            Trainees
          </h5>
          <span className="text-base text-black font-abhaya flex items-center font-semibold">
            Select All
            <Checkbox
              className="ms-3 border-[#D9D9D9] w-6 h-6"
              onCheckedChange={(e) => handleChanges(!!e, traineeEmployee)}
            />
          </span>
        </div>
        <div className="">
          <ScrollArea className="h-[300px]">
            {filteredData?.map((data: any, index: number) => {
              return (
                <TraineeItems
                  key={index}
                  data={data}
                  traineeList={traineeList}
                  setTraineeList={setTraineeList}
                />
              );
            })}
            {isPending && <Loader />}
          </ScrollArea>
        </div>
      </div>
      <div className="text-right mt-5">
        <Button
          className="uppercase xl:text-base text-sm font-nunito bg-[#58BA66] xl:h-12 h-10 xl:px-6 px-5"
          type="button"
          onClick={() => {
            traineeList?.length > 0 ?
            setIsOpen(false) : toast({
              title: "Select Atleast one trainee",
              variant: "destructive",
            });;
          }}
        >
          Add Trainee
        </Button>
      </div>
    </div>
  );
};

export default AddTraineeModal;
