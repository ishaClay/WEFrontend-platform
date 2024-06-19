import { BsSearch } from "react-icons/bs";
import { Button } from "../ui/button";
import { AiOutlineAppstore, AiOutlineBars } from "react-icons/ai";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const MyCoursePage = () => {
  return (
    <div>
      <div className="flex items-center justify-between py-[18px] px-[18px] bg-[#F3F3F3]">
        <div className="flex items-center">
          <Select>
            <SelectGroup>
              <SelectLabel className="text-xs font-normal font-Poppins mt-0">
                Filter by
              </SelectLabel>
              <SelectTrigger className="w-[248px] h-[36px] text-sm font-normal font-Poppins text-black border border-[#A3A3A3]">
                <SelectValue placeholder="Environment" />
              </SelectTrigger>
            </SelectGroup>
            <SelectContent className="min-w-full">
              <SelectItem value="Pending">V-01</SelectItem>
              <SelectItem value="Accepted">V-02</SelectItem>
              <SelectItem value="Rejected">V-03</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectGroup className="pl-8">
              <SelectLabel className="text-xs font-normal font-Poppins mt-0">
                Filter by
              </SelectLabel>

              <SelectTrigger className="w-[176px] h-[36px] text-sm font-normal font-Poppins text-black border border-[#A3A3A3]">
                <SelectValue placeholder="In Progress" />
              </SelectTrigger>
            </SelectGroup>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex ml-6">
          <Button className="bg-transparent p-1 hover:bg-transparent">
            <AiOutlineAppstore className="text-[#00778B] w-8 h-8 " />
          </Button>
          <Button className="bg-transparent p-1 hover:bg-transparent">
            <AiOutlineBars className="text-[#A3A3A3] w-8 h-8 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MyCoursePage;
