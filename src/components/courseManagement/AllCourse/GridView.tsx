import StarImage from "@/assets/images/Vector.png";
import { ConfirmModal } from "@/components/comman/ConfirmModal";
import Loader from "@/components/comman/Loader";
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
import { useToast } from "@/components/ui/use-toast";
import { QUERY_KEYS } from "@/lib/constants";
import {
  copyCourse,
  publishCourse,
} from "@/services/apiServices/courseManagement";
import { PublishCourseType } from "@/types/course";
import { AllCoursesResult } from "@/types/courseManagement";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Copy, EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const { toast } = useToast();
  const [versionData, setVersionData] = useState<VersionProps[]>([]);
  const [cohort, setCohort] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [singleCourse, setSingleCourse] = useState<AllCoursesResult | null>(
    null
  );
  const [course, setCourse] = useState<string | number>("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const pathName = location?.pathname?.split("/")?.[1];
  const handleCohort = (e: Event, id: number) => {
    e.preventDefault();
    setCohort(true);
    setCourse(id);
  };

  useEffect(() => {
    if (list?.length > 0) {
      const data = list?.map((item) => {
        const version = item?.version?.find((itm) => itm?.version === 1);
        return {
          id: item?.id,
          versionId: version?.id as number,
          status:
            item?.status === "COPY" ? "PUBLISHED" : (item?.status as string),
        };
      });
      setVersionData(data);
    }
  }, [list]);

  const { mutate: publishCourseFun, isPending: publishCoursePending } =
    useMutation({
      mutationFn: (data: PublishCourseType) => publishCourse(data),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.fetchAllCourse],
        });
        toast({
          title: "Success",
          description: "Course Published Successfully",
          variant: "success",
        });
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  const { mutate: copyCourseFun, isPending: copyCoursePending } = useMutation({
    mutationFn: (id: number) => copyCourse(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.fetchAllCourse] });
      toast({
        title: "Success",
        description: "Course Copied Successfully",
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const { mutate: deleteCourseFun, isPending: deleteCoursePending } =
    useMutation({
      mutationFn: (id: number) => deleteCourse(id),
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.fetchAllCourse],
        });
        toast({
          title: "Success",
          description: data?.data?.message,
          variant: "success",
        });
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });

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

  const handlePublish = (e: Event, id: number) => {
    e.preventDefault();
    const payload = {
      status: "PUBLISHED",
      id,
    };
    publishCourseFun(payload);
  };

  const handleCopy = (e: Event, id: number) => {
    console.log("id++++++1212", e, id);

    e.preventDefault();
    copyCourseFun(id);
  };

  const handleEdit = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: string | undefined,
    item: AllCoursesResult
  ) => {
    e.stopPropagation();
    if (item?.status === "HOLD") {
      navigate(
        `/${pathName}/create_course/${
          item?.id
        }?tab=${0}&step=${0}&version=${id}`
      );
    } else {
      if (item?.trainerId?.id) {
        toast({
          title: "First Course make Hold Status then You Can Edit",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Please Course make Duplicate then You Can Edit",
          variant: "destructive",
        });
      }
    }
  };

  const handleDeleteCourse = () => {
    deleteCourseFun(singleCourse ? singleCourse?.id : 0);
  };

  return (
    <>
      <CohortModal open={cohort} setOpen={setCohort} id={+course || 0} />
      <div className="grid xl:grid-cols-4 grid-cols-3 gap-5">
        {list?.map((item, i) => {
          const currentRecord = versionData?.find(
            (itm) => itm?.id === item?.id
          );
          console.log("item+++", item);
          console.log("currentRecord", currentRecord, currentRecord?.versionId);

          const versionOption =
            item?.version &&
            item?.version.map((itm) => {
              return {
                label: `V-${itm?.version}`,
                value: itm?.id.toString() || "",
              };
            });
          return (
            <Link
              to={`/${pathName}/employee-basic-course/${currentRecord?.versionId}`}
              key={i}
              className="border border-[#ddd] rounded-[5px] overflow-hidden"
            >
              <div className="relative h-[190px] overflow-hidden">
                <img
                  src={item?.bannerImage}
                  alt={"bannerImage"}
                  className="w-full"
                />
                <div className="absolute right-2 bottom-2">
                  <Badge className="bg-white text-black hover:bg-[#eee] font-calibri text-base font-normal px-2 py-0">
                    {item?.status === "COPY" ? "Hold" : item?.status || ""}
                  </Badge>
                </div>
              </div>
              <div className="p-2 h-[calc(100%-241px)]">
                <h5 className="text-base font-bold font-inter text-[#1D2026] mb-[19px] min-h-[48px] line-clamp-2">
                  {item?.title}
                </h5>
                <div className="flex items-center justify-between mb-[11px]">
                  <div>
                    <h6 className="text-sm leading-5 font-normal font-nunito">
                      Created By :{" "}
                      {item?.trainerId
                        ? item?.trainerId?.name
                        : item?.trainerCompanyId?.providerName || "-"}
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
                <div>
                  {item?.courseData?.map((item) => {
                    return (
                      <div className="flex items-center justify-between mb-2">
                        <Badge
                          variant="outline"
                          className={`bg-[#EDF0F4] border-[#EDF0F4] p-1 px-3 text-[#3A3A3A] text-xs font-Poppins font-normal`}
                        >
                          {item?.fetchPillar?.pillarName}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={`bg-[${
                            item?.fetchMaturity?.color
                          }] p-1 px-3 text-[${
                            item?.fetchMaturity?.maturityLevelName ===
                            "Beginning"
                              ? "white"
                              : "#3A3A3A"
                          }] text-xs font-Poppins font-normal`}
                        >
                          {item?.fetchMaturity?.maturityLevelName}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex items-center justify-between xl:gap-[7px] gap-[10px] py-[9px] xl:px-[13px] px-1 border-t">
                <Button
                  disabled={item?.status === "PUBLISHED"}
                  className="max-w-[90px] py-[6px] font-Poppins bg-[#58BA66] hover:bg-[#58BA66] h-auto w-full"
                  onClick={(e: any) =>
                    handlePublish(e, item?.currentVersion?.id as number)
                  }
                >
                  PUBLISH
                </Button>
                <Button
                  onClick={(e: any) =>
                    handleCohort(e, item?.currentVersion?.id as number)
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
                      <DropdownMenuItem
                        className="flex items-center gap-2 font-nunito"
                        onClick={(e: any) =>
                          handleCopy(e, currentRecord?.versionId as number)
                        }
                      >
                        <Copy className="w-4 h-4" />
                        <span>Copy</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="flex items-center gap-2 font-nunito"
                        onClick={(e) =>
                          handleEdit(
                            e,
                            currentRecord?.versionId?.toString(),
                            item
                          )
                        }
                      >
                        <Pencil className="w-4 h-4" />
                        <span>Edit</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="flex items-center gap-2 font-nunito"
                        onClick={(e: any) => {
                          e.preventDefault();
                          setIsDelete(true);
                          setSingleCourse(item);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </Link>
          );
        })}
      </div>
      <ConfirmModal
        open={isDelete}
        onClose={() => setIsDelete(false)}
        onDelete={handleDeleteCourse}
        value={singleCourse?.title || ""}
        isLoading={deleteCoursePending}
      />
      {publishCoursePending ||
        (copyCoursePending && (
          <div className="fixed w-full top-0 left-0 h-full z-50 flex justify-center items-center bg-[#00000050]">
            <Loader className="w-10 h-10 text-primary" />
          </div>
        ))}
    </>
  );
};

export default GridView;
