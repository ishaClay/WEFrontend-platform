import { Badge } from "@/components/ui/badge";
import StarImage from "@/assets/images/Vector.png";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import CohortModal from "./CohortModal";
import { CourseEntity } from "@/types/courseManagement";
import SelectMenu from "@/components/comman/SelectMenu";

const selectOption = [
  {
    label: "V-01",
    value: "v-01",
  },
  {
    label: "V-02",
    value: "v-02",
  },
  {
    label: "V-03",
    value: "v-03",
  },
];

const GridView = ({ list }: { list: CourseEntity[] }) => {
  const [selectFilterValue, setSelectFilterValue] = useState("");
  const [cohort, setCohort] = useState(false);
  const [course, setCourse] = useState<string | number>("");
  const handleCohort = (id: any) => {
    setCohort(true);
    setCourse(id);
  };
  return (
    <>
      <CohortModal open={cohort} setOpen={setCohort} id={+course || 0} />
      <div className="grid xl:grid-cols-4 grid-cols-3 gap-5">
        {list?.map((item, i) => {
          return (
            <div
              key={i}
              className="border border-[#ddd] rounded-[5px] overflow-hidden"
            >
              <div className="relative h-[190px] overflow-hidden">
                <img
                  src={item.course.bannerImage}
                  alt={item.course.title}
                  className="w-full"
                />
                <div className="absolute right-2 bottom-2">
                  <Badge className="bg-white text-black hover:bg-[#eee] font-calibri text-base font-normal px-2 py-0">
                    Published
                  </Badge>
                </div>
              </div>
              <div className="p-2">
                <h5 className="text-base font-bold font-inter text-[#1D2026] mb-[19px] line-clamp-2">
                  {item.course.title}
                </h5>
                <div className="flex items-center justify-between mb-[11px]">
                  <div>
                    <h6 className="text-sm leading-5 font-normal font-nunito">
                      Created By : {item.subtitle}
                    </h6>
                  </div>
                  <div className="flex items-center text-[14px] leading-3 gap-1 font-nunito">
                    <img src={StarImage} alt="" />
                    {item.rating || 0}/5
                  </div>
                </div>
                <div className="flex justify-between items-center mb-[11px]">
                  <h5 className="text-[14px] font-nunito">
                    Module : {item.data.module?.length || 0}
                  </h5>
                  <p className="text-[14px] font-nunito">
                    Duration : {item.course.duration || "-"}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <Badge className="bg-[#EDF0F4] text-black py-1 hover:bg-[#EDF0F4]">
                    Environment
                  </Badge>
                  <Badge className="bg-[#FF5252] py-1 hover:bg-[#FF5252]">
                    Introductory
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between xl:gap-[7px] gap-[10px] py-[9px] xl:px-[13px] px-1 border-t">
                <Button className="max-w-[90px] py-[6px] font-Poppins bg-[#58BA66] hover:bg-[#58BA66] h-auto w-full">
                  PUBLISH
                </Button>
                <Button
                  onClick={() => handleCohort(item.course.id)}
                  className="max-w-[90px] py-[6px] font-Poppins bg-[#000000] hover:bg-[#000000] h-auto w-full"
                >
                  + Cohort
                </Button>
                <SelectMenu
                  option={selectOption}
                  setValue={(data: string) => setSelectFilterValue(data)}
                  value={selectFilterValue}
                  containClassName="max-w-[62px]"
                  className="max-w-[62px] h-auto py-[5px] px-2 font- w-full bg-[#00778B] text-white"
                  placeholder="V-01"
                />
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
            </div>
          );
        })}
      </div>
    </>
  );
};

export default GridView;
