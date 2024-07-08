import starImage from "@/assets/images/Vector.png";
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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CohortModal from "./CohortModal";
import { copyCourse, publishCourse } from "@/services/apiServices/courseManagement";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants";
import { PublishCourseType } from "@/types/course";
import { useToast } from "@/components/ui/use-toast";
import Loader from "@/components/comman/Loader";

interface VersionProps {
  id: number;
  versionId: number;
  status: string;
}

const ListView = ({ list }: { list: AllCoursesResult[] }) => {
  const [versionData, setVersionData] = useState<VersionProps[]>([]);
  const [cohort, setCohort] = useState(false);
  const [course, setCourse] = useState<string | number>("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  // const queryClient = useQueryClient();
  const handleCohort = (id: number) => {
    setCohort(true);
    setCourse(id);
  };

  // useEffect(() => {
  //   if (list?.length > 0) {
  //     const data = list.map((item) => {
  //       const version = item?.version?.find(
  //         (itm) => itm?.data?.status === "Published" || itm?.version === 1
  //       );
  //       return {
  //         id: item?.id,
  //         versionId: version?.id as number,
  //         status: version?.data?.status as string,
  //       };
  //     });
  //     setVersionData(data);
  //   }
  // }, [list]);

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

  const { mutate: publishCourseFun, isPending: publishCoursePending } = useMutation({
    mutationFn: (data:PublishCourseType) => publishCourse(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.fetchAllCourse] });
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
    mutationFn: (id:number) => copyCourse(id),
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

  const handlePublish = (id: number) => {
    const payload = {
      status: "PUBLISHED",
      id
    }
    publishCourseFun(payload);
  }

  const copyPublish = (id: number) => {
    copyCourseFun(id);
  }

  return (
    <div>
      <CohortModal open={cohort} setOpen={setCohort} id={+course || 0} />
      <div>
        {list.map((data, index: number) => {
          const currentRecord = versionData?.find(
            (itm) => itm?.id === data?.id
          );


          const versionOption =
            data?.version &&
            data?.version.map((itm) => {
              return {
                label: `V-${itm?.version}`,
                value: itm?.id.toString() || "",
              };
            });
          return (
            <>
              <div
                key={index}
                className="border rounded overflow-hidden grid grid-cols-6 mb-5"
              >
                <div className="col-span-4 flex items-center">
                  <div className="xl:w-[267px] w-[200px] h-[170px] col-span-1">
                    <img
                      src={data?.bannerImage}
                      alt=""
                      className="w-full h-full"
                    />
                  </div>
                  <div className="col-span-3 xl:pl-4 pl-3">
                    <h6 className="font-bold font-nunito text-base xl:pb-4 pb-3">
                      {data?.title}
                    </h6>
                    <div className="flex xl:pb-4 pb-3">
                      <p className="text-sm font-normal font-nunito xl:pr-[61px] pr-[35px] text-[#000000]">
                        Created By :{" "}
                        {data?.trainerId
                          ? data?.trainerId?.name
                          : data?.trainerCompanyId?.providerName ||
                            "--"}
                      </p>
                      <div className="flex items-center">
                        <img
                          src={starImage}
                          alt=""
                          className="w-[16px] h-[16px]"
                        />
                        <p className="pl-1 font-semibold font-nunito text-sm mt-1">
                          0/5
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center xl:pb-4 pb-3">
                      <div className="text-sm font-normal font-nunito text-[#000] xl:pr-24 pr-16">
                        Module : {data?.module?.length || 0}
                      </div>
                      <div className="text-sm font-normal font-nunito text-[#000]">
                        Duration : {data?.duration || "--"}
                      </div>
                    </div>
                    <div className="">
                    {data?.courseData?.map((item) => {
                      return (
                        <div className="flex items-center justify-between mb-2">
                          <Badge
                            variant="outline"
                            className={`p-1 px-3 text-[#3A3A3A] text-xs font-Poppins font-normal`}
                          >
                            {item?.fetchPillar?.pillarName}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={`bg-[${item?.fetchMaturity?.color}] p-1 px-3 text-[${item?.fetchMaturity?.maturityLevelName === "Beginning" ? "white" : "#3A3A3A"}] text-xs font-Poppins font-normal`}
                          >
                            {item?.fetchMaturity?.maturityLevelName}
                          </Badge>
                        </div>
                      );
                    })}
                    </div>
                  </div>
                </div>
                <div className="col-span-2 flex items-center justify-end relative">
                  <div className="flex items-center xl:justify-end justify-center xl:flex-nowrap flex-wrap xl:gap-[7px] gap-[5px] py-[9px] xl:px-[13px] px-1">
                    <Button
                      disabled={data?.status === "PUBLISHED"}
                      className="xl:max-w-[90px] w-[45%] xl:py-[6px] py-[8px] font-Poppins bg-[#58BA66] hover:bg-[#58BA66] h-auto"
                      onClick={() => handlePublish(data?.currentVersion?.id as number)}
                    >
                      PUBLISHED
                    </Button>
                    <Button
                      onClick={() =>
                        handleCohort(currentRecord?.versionId as number)
                      }
                      className="xl:max-w-[90px] w-[45%] xl:py-[6px] py-[8px] font-Poppins bg-[#000000] hover:bg-[#000000] h-auto"
                    >
                      + Cohort
                    </Button>
                    <SelectMenu
                      option={versionOption || []}
                      setValue={(v: string) => handleChangeVersion(v, data?.id)}
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
                          <DropdownMenuItem className="flex items-center gap-2 font-nunito" 
                          onClick={() => copyPublish(currentRecord?.versionId as number)}>
                            <Copy className="w-4 h-4" />
                            <span>Copy</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              navigate(
                                `/${
                                  location?.pathname?.split("/")?.[1]
                                }/create_course/${
                                  data?.id
                                }?tab=${0}&step=${0}&version=${currentRecord?.versionId?.toString()}`
                              )
                            }
                            className="flex items-center gap-2 font-nunito"
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
                  <div className="absolute w-[1px] h-32 left-0 top-0 bottom-0 bg-[#DDD] m-auto"></div>
                </div>
              </div>
            </>
          );
        })}
      </div>
      {publishCoursePending || copyCoursePending && <div className="fixed w-full top-0 left-0 h-full z-50 flex justify-center items-center bg-[#00000050]">
        <Loader className="w-10 h-10 text-primary" />
      </div>}
    </div>
  );
};

export default ListView;
