import { CourseEntity } from "@/types/courseManagement";
import starImage from "@/assets/images/Vector.png";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";

const ListView = ({ list }: { list: CourseEntity[] }) => {
  return (
    <div>
      <div>
        {list.map((data: any, index: number) => {
          console.log("++++++++++++++", data);
          // data?.data?.module?.length
          return (
            <div
              key={index}
              className="border rounded overflow-hidden grid grid-cols-6 mb-5"
            >
              <div className="col-span-4 flex items-center">
                <div className="xl:w-[267px] w-[200px] h-[170px] col-span-1">
                  <img
                    src={data.course?.bannerImage}
                    alt=""
                    className="w-full h-full"
                  />
                </div>
                <div className="col-span-3 xl:pl-4 pl-3">
                  <h6 className="font-bold font-nunito text-base xl:pb-4 pb-3">
                    {data.course?.title}
                  </h6>
                  <div className="flex xl:pb-4 pb-3">
                    <p className="text-sm font-normal font-nunito xl:pr-[61px] pr-[35px] text-[#000000]">
                      Created By : Prime Infotech
                    </p>
                    <div className="flex items-center">
                      <img
                        src={starImage}
                        alt=""
                        className="w-[16px] h-[16px]"
                      />
                      <p className="pl-1 font-semibold font-nunito text-sm">
                        4/5
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center xl:pb-4 pb-3">
                    <div className="text-sm font-normal font-nunito text-[#000] xl:pr-24 pr-16">
                      Module : {data?.data?.module?.length || "-"}
                    </div>
                    <div className="text-sm font-normal font-nunito text-[#000]">
                      Duration : {data?.course?.duration}
                    </div>
                  </div>
                  <div className="flex items-center xl:gap-24 gap-16">
                    <Badge className="bg-[#EDF0F4] text-black py-1 hover:bg-[#EDF0F4] font-nunito">
                      Environment
                    </Badge>
                    <Badge className="bg-[#FF5252] py-1 hover:bg-[#FF5252] font-nunito">
                      Introductory
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="col-span-2 flex items-center justify-end relative">
                <div className="flex items-center xl:justify-end justify-center xl:flex-nowrap flex-wrap xl:gap-[7px] gap-[5px] py-[9px] xl:px-[13px] px-1">
                  <Button className="xl:max-w-[90px] w-[45%] xl:py-[6px] py-[8px] font-Poppins bg-[#58BA66] hover:bg-[#58BA66] h-auto">
                    PUBLISHED
                  </Button>
                  <Button className="xl:max-w-[90px] w-[45%] xl:py-[6px] py-[8px] font-Poppins bg-[#000000] hover:bg-[#000000] h-auto">
                    + Cohort
                  </Button>
                  <Select>
                    <SelectTrigger className="max-w-[62px] h-auto xl:py-[5px] py-[7px] px-2 font- w-full bg-[#00778B] text-white">
                      <SelectValue placeholder="V-01" />
                    </SelectTrigger>
                    <SelectContent className="min-w-full w-[62px]">
                      <SelectItem className="px-2" value="Pending">
                        V-01
                      </SelectItem>
                      <SelectItem className="px-2" value="Accepted">
                        V-02
                      </SelectItem>
                      <SelectItem className="px-2" value="Rejected">
                        V-03
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <EllipsisVertical />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-30">
                      <DropdownMenuGroup>
                        <DropdownMenuItem className="flex items-center gap-2 font-nunito">
                          <Pencil className="w-4 h-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2 font-nunito">
                          <Trash2 className="w-4 h-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="absolute w-[1px] h-32 left-0 top-0 bottom-0 bg-[#DDD] m-auto"></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListView;
