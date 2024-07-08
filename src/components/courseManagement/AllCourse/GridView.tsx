import StarImage from "@/assets/images/Vector.png";
import SelectMenu from "@/components/comman/SelectMenu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AllCoursesResult } from "@/types/courseManagement";
import { Copy, EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CohortModal from "./CohortModal";

// const selectOption = [
//   {
//     label: "V-01",
//     value: "v-01",
//   },
//   {
//     label: "V-02",
//     value: "v-02",
//   },
//   {
//     label: "V-03",
//     value: "v-03",
//   },
// ];

interface VersionProps {
  id: number;
  versionId: number;
  status: string;
}

const GridView = ({ list }: { list: AllCoursesResult[] }) => {
  const [versionData, setVersionData] = useState<VersionProps[]>([]);
  const [cohort, setCohort] = useState(false);
  const [course, setCourse] = useState<string | number>("");
  const navigate = useNavigate();
  // const queryClient = useQueryClient();
  const handleCohort = (id: number) => {
    setCohort(true);
    setCourse(id);
  };

  useEffect(() => {
    if (list?.length > 0) {
      const data = list.map((item) => {
        const version = item?.version?.find(
          (itm) => itm?.data?.status === "Published" || itm?.version === 1
        );
        return {
          id: item?.id,
          versionId: version?.id as number,
          status: version?.data?.status as string,
        };
      });
      setVersionData(data);
    }
  }, [list]);

  // const { mutate, isPending } = useMutation({
  //   mutationFn: courseStatusUpdate,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.fetchAllCourse] });
  //     toast({
  //       title: "Success",
  //       description: "Course Published successfully",
  //       variant: "success",
  //     });
  //   },
  //   onError: (error) => {
  //     toast({
  //       title: "Error",
  //       description: error.message,
  //       variant: "destructive",
  //     });
  //   },
  // });

  const handleChangeVersion = (versionId: string, id: number) => {
    setVersionData((prev) => {
      return prev.map((item) => {
        if (item?.id === id) {
          return {
            ...item,
            versionId: +versionId,
          };
        }
        return item;
      });
    });
  };

  return (
    <>
      <CohortModal open={cohort} setOpen={setCohort} id={+course || 0} />
      <div className="grid xl:grid-cols-4 grid-cols-3 gap-5">
        {list?.map((item, i) => {
          const currentRecord = versionData?.find(
            (itm) => itm?.id === item?.id
          );

          const currentData = item?.version?.find(
            (itm) => itm?.id === currentRecord?.versionId
          );
          console.log("item+++++++", currentData, currentRecord?.versionId);

          const versionOption =
            item?.version &&
            item?.version.map((itm) => {
              return {
                label: `V-${itm?.version}`,
                value: itm?.id.toString() || "",
              };
            });
          return (
            <div
              key={i}
              className="border border-[#ddd] rounded-[5px] overflow-hidden"
            >
              <div className="relative h-[190px] overflow-hidden">
                <img
                  src={currentData?.data?.bannerImage}
                  alt={currentData?.data?.title}
                  className="w-full"
                />
                <div className="absolute right-2 bottom-2">
                  <Badge className="bg-white text-black hover:bg-[#eee] font-calibri text-base font-normal px-2 py-0">
                    {currentRecord?.status || ""}
                  </Badge>
                </div>
              </div>
              <div className="p-2">
                <h5 className="text-base font-bold font-inter text-[#1D2026] mb-[19px] min-h-[48px] line-clamp-2">
                  {currentData?.data?.title}
                </h5>
                <div className="flex items-center justify-between mb-[11px]">
                  <div>
                    <h6 className="text-sm leading-5 font-normal font-nunito">
                      Created By :{" "}
                      {currentData?.data?.trainerId
                        ? currentData?.data?.trainerId?.name
                        : currentData?.data?.trainerCompanyId?.providerName ||
                          "-"}
                    </h6>
                  </div>
                  <div className="flex items-center text-[14px] leading-3 gap-1 font-nunito">
                    <img src={StarImage} alt="" className="pb-1" />
                    0/5
                  </div>
                </div>
                <div className="flex justify-between items-center mb-[11px]">
                  <h5 className="text-[14px] font-nunito">
                    Module : {item?.module?.length || 0}
                  </h5>
                  <p className="text-[14px] font-nunito min-w-[108px]">
                    Duration : {item?.duration || "--"}
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
                <Button
                  disabled={currentData?.data?.status === "PUBLISHED"}
                  className="max-w-[90px] py-[6px] font-Poppins bg-[#58BA66] hover:bg-[#58BA66] h-auto w-full"
                >
                  PUBLISH
                </Button>
                <Button
                  onClick={() =>
                    handleCohort(currentRecord?.versionId as number)
                  }
                  className="max-w-[90px] py-[6px] font-Poppins bg-[#000000] hover:bg-[#000000] h-auto w-full"
                >
                  + Cohort
                </Button>
                <SelectMenu
                  option={versionOption || []}
                  setValue={(data: string) =>
                    handleChangeVersion(data, item?.id)
                  }
                  value={currentRecord?.versionId?.toString() || ""}
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
                        <Copy className="w-4 h-4" />
                        <span>Copy</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="flex items-center gap-2 font-nunito"
                        onClick={() =>
                          navigate(
                            `/${
                              location?.pathname?.split("/")?.[1]
                            }/create_course/${
                              item?.id
                            }?tab=${0}&step=${0}&version=${currentRecord?.versionId?.toString()}`
                          )
                        }
                      >
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
