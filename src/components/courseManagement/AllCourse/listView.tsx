import starImage from "@/assets/images/Vector.png";
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
import { RootState } from "@/redux/store";
import {
  copyCourse,
  deleteCourse,
  publishCourse,
  updateVersion,
} from "@/services/apiServices/courseManagement";
import { PublishCourseType } from "@/types/course";
import { AllCoursesResult } from "@/types/courseManagement";
import { ErrorType } from "@/types/Errors";
import { CourseDataEntity } from "@/types/Trainer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Combine, Copy, EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AllocatedCertificateModal } from "./AllocatedCertificateModal";
import CohortModal from "./CohortModal";
import ConfirmationModel from "./ConfirmationModel";
import { UserRole } from "@/types/UserRole";

const ListView = ({
  list,
  isLoading,
}: {
  list: AllCoursesResult[];
  isLoading?: boolean;
}) => {
  const { UserId, role } = useSelector((state: RootState) => state.user);
  const [cohort, setCohort] = useState(false);
  const [course, setCourse] = useState<string | number>("");
  const [open, setOpen] = useState<string>("");
  const [isDelete, setIsDelete] = useState(false);
  const [isOpen, setIsOpen] = useState<string>("");
  const [singleCourse, setSingleCourse] = useState<AllCoursesResult | null>(
    null
  );
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const pathName = location?.pathname?.split("/")?.[1];
  const userData = JSON.parse(localStorage.getItem("user") as string);
  // const queryClient = useQueryClient();
  const handleCohort = (e: Event, id: number) => {
    e.preventDefault();
    setCohort(true);
    setCourse(id);
  };

  const { mutate: updateVersionFun, isPending: updateVersionPending } =
    useMutation({
      mutationFn: updateVersion,
      onSuccess: () => {
        queryClient.refetchQueries({ queryKey: [QUERY_KEYS.fetchAllCourse] });
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });

  const handleChangeVersion = (versionId: string, item: AllCoursesResult) => {
    const payload = {
      mainCourseId: item?.currentVersion?.mainCourse?.id,
      versionId: +versionId,
      userId: +UserId,
    };
    updateVersionFun(payload);
  };

  const { mutate: publishCourseFun, isPending: publishCoursePending } =
    useMutation({
      mutationFn: (data: PublishCourseType) => publishCourse(data),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.fetchAllCourse],
        });
        setCourse("");
        toast({
          title: "Success",
          description: "Course Published Successfully",
          variant: "success",
        });
        setOpen("");
      },
      onError: (error: ErrorType) => {
        setCourse("");
        toast({
          title: "Error",
          description: error?.data?.message,
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

  const handlePublish = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {
    e.preventDefault();
    const payload = {
      status: userData?.query?.role === "3" ? "READYTOPUBLISH" : "PUBLISHED",
      id: +id,
    };
    const cohortCount =
      list?.find((item) => item?.currentVersion?.id === (+id || 0))
        ?.cohortGroups || 0;
    if (cohortCount > 0) {
      publishCourseFun(payload);
    } else {
      toast({
        title: "Please Create Cohort Group",
        variant: "destructive",
      });
    }
  };

  const copyPublish = (e: Event, id: number) => {
    e.stopPropagation();
    copyCourseFun(id);
  };

  const handleEdit = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: string | undefined,
    item: AllCoursesResult
  ) => {
    e.stopPropagation();
    if (item?.status !== "DRAFT") {
      navigate(
        `/${pathName}/create_course/${
          item?.id
        }?tab=${0}&step=${0}&version=${id}`
      );
    } else {
      if (item?.trainerId?.id) {
        toast({
          title: "First Course make DRAFT Status then You Can Edit",
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

  return list?.length > 0 && list ? (
    <div>
      <AllocatedCertificateModal
        isOpen={!!isOpen}
        onClose={() => setIsOpen("")}
        courseId={+isOpen}
      />
      <ConfirmationModel
        open={open}
        setOpen={setOpen}
        handleSubmit={(e, id) => handlePublish(e, id)}
        isLoader={publishCoursePending}
      />
      <CohortModal open={cohort} setOpen={setCohort} id={+course || 0} />
      {(isLoading || updateVersionPending) && (
        <div className="fixed w-full h-full top-0 left-0 z-50 flex justify-center items-center bg-[#00000033]">
          <Loader className="h-10 w-10" />
        </div>
      )}
      <div>
        {list.map((data: any, index: number) => {
          const versionOption =
            data?.version &&
            data?.version.map((itm: any) => {
              return {
                label: `V-${itm?.version}`,
                value: itm?.id.toString() || "",
              };
            });
          return (
            <>
              <Link
                to={`/${pathName}/employee-basic-course/${data?.currentVersion?.id}`}
                key={index}
                className="border rounded overflow-hidden grid grid-cols-9 mb-5"
              >
                <div className="2xl:col-span-7 xl:col-span-6 col-span-9 sm:flex block items-center">
                  <div className="sm:min-w-[267px] sm:w-[267px] sm:min-h-[220px] sm:h-[220px] w-full col-span-1">
                    <img
                      src={data?.bannerImage}
                      alt=""
                      className="w-full h-full"
                    />
                  </div>
                  <div className="col-span-3 xl:pl-4 p-3">
                    <h6 className="font-bold font-nunito text-base xl:pb-4 pb-3">
                      {data?.title}
                    </h6>
                    <div className="flex xl:pb-4 pb-3">
                      <p className="text-sm font-normal font-nunito xl:pr-[61px] pr-[35px] text-[#000000]">
                        Created By :{" "}
                        {data?.trainerId
                          ? data?.trainerId?.name
                          : data?.trainerCompanyId?.providerName || "--"}
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
                    <div className="flex flex-wrap items-center md:gap-5 gap-3">
                      {data?.courseData?.map((item: CourseDataEntity) => {
                        return (
                          <div className="">
                            <Badge
                              variant="outline"
                              className={`bg-[${item?.fetchMaturity?.color}] border-[#EDF0F4] p-1 px-3 text-[#3A3A3A] text-xs font-Poppins font-normal`}
                            >
                              {item?.fetchPillar?.pillarName}
                            </Badge>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="2xl:col-span-2 xl:col-span-3 col-span-9 flex items-center sm:justify-end justify-start relative p-4">
                  <div className="flex flex-row items-center xl:justify-end justify-center xl:gap-[7px] gap-[5px]">
                    <Button
                      disabled={data?.status === "PUBLISHED"}
                      className="xl:max-w-[90px] max-w-[85px] xl:py-[6px] py-[8px] font-Poppins bg-[#58BA66] hover:bg-[#58BA66] h-auto"
                      onClick={(
                        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                      ) => {
                        e.preventDefault();
                        setOpen(data?.currentVersion?.id);
                        setCourse(data?.id);
                      }}
                    >
                       {(+role === UserRole?.Trainee && data?.status === "DRAFT") ? "Ready to Publish" : "PUBLISH"}
                    </Button>
                    <Button
                      onClick={(e: any) =>
                        handleCohort(e, data?.currentVersion?.id as number)
                      }
                      className="xl:max-w-[90px] sm:text-sm text-xs w-auto xl:py-[6px] py-[8px] font-Poppins bg-[#000000] hover:bg-[#000000] h-auto"
                    >
                      + Cohort
                    </Button>
                    <div className="">
                      <SelectMenu
                        option={versionOption || []}
                        setValue={(e: string) => handleChangeVersion(e, data)}
                        value={data?.currentVersion?.id?.toString() || ""}
                        defaultValue={
                          data?.currentVersion?.id?.toString() || ""
                        }
                        containClassName="max-w-[62px]"
                        className="md:max-w-[62px] sm:max-w-[56px] max-w-[65px] h-auto py-[5px] px-2 font- w-full bg-[#00778B] text-white"
                        placeholder="V-01"
                      />
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild className="outline-none">
                        <EllipsisVertical />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-30">
                        <DropdownMenuGroup>
                          <DropdownMenuItem
                            className="flex items-center gap-2 font-nunito"
                            onClick={(e: any) =>
                              copyPublish(e, data?.currentVersion?.id as number)
                            }
                          >
                            <Copy className="w-4 h-4" />
                            <span>Copy</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) =>
                              handleEdit(
                                e,
                                data?.currentVersion?.id?.toString(),
                                data
                              )
                            }
                            className="flex items-center gap-2 font-nunito"
                          >
                            <Pencil className="w-4 h-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="flex items-center gap-2 font-nunito"
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsOpen(data?.id);
                            }}
                          >
                            <Combine className="w-4 h-4" />
                            <span>Allocate</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="flex items-center gap-2 font-nunito"
                            onClick={(e: any) => {
                              e.preventDefault();
                              setIsDelete(true);
                              setSingleCourse(data);
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="absolute w-[1px] h-32 left-0 top-0 bottom-0 bg-[#DDD] m-auto xl:block hidden"></div>
                </div>
              </Link>
            </>
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
    </div>
  ) : (
    <span className="py-10 block text-center">No data found</span>
  );
};

export default ListView;
