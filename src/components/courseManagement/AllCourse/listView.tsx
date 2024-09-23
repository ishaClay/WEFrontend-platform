/* eslint-disable @typescript-eslint/ban-ts-comment */
import Course_image from "@/assets/images/Course_image.png";
import starImage from "@/assets/images/Vector.png";
import { ConfirmModal } from "@/components/comman/ConfirmModal";
import Loading from "@/components/comman/Error/Loading";
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
import { PermissionContext } from "@/context/PermissionContext";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { setPath } from "@/redux/reducer/PathReducer";
import { RootState } from "@/redux/store";
import {
  copyCourse,
  courseMinorendit,
  createNewVersion,
  deleteCourse,
  publishCourse,
  updateVersion,
} from "@/services/apiServices/courseManagement";
import { PublishCourseType } from "@/types/course";
import { AllCoursesResult, CourseDataEntity } from "@/types/courseManagement";
import { ErrorType } from "@/types/Errors";
import { UserRole } from "@/types/UserRole";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Combine, Copy, EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AllocatedCertificateModal } from "./AllocatedCertificateModal";
import CohortModal from "./CohortModal";
import ConfirmationModel from "./ConfirmationModel";

const ListView = ({
  list,
  isLoading,
}: {
  list: AllCoursesResult[];
  isLoading?: boolean;
}) => {
  const { permissions } = useContext(PermissionContext);
  const { UserId } = useSelector((state: RootState) => state.user);
  const [cohort, setCohort] = useState(false);
  const [course, setCourse] = useState<string | number>("");
  const [open, setOpen] = useState<string>("");
  const [isDelete, setIsDelete] = useState(false);
  const [isOpen, setIsOpen] = useState<string>("");
  const [singleCourse, setSingleCourse] = useState<AllCoursesResult | null>(
    null
  );
  const [selectedCourse, setSelectedCourse] = useState<AllCoursesResult | null>(
    null
  );
  const [isStatusLoading, setIsStatusLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const Role = location?.pathname?.split("/")?.[1];
  const pathName = location?.pathname?.split("/")?.[2];
  const dispatch = useAppDispatch();
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const { paths } = useAppSelector((state) => state.path);
  const handleCohort = (e: Event, id: number) => {
    e.preventDefault();
    setCohort(true);
    setCourse(id);
  };
  useEffect(() => {
    if (!cohort) {
      setCourse("");
    }
  }, [cohort]);

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
      onSuccess: (data) => {
        setIsStatusLoading(false);
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.fetchAllCourse],
        });
        setCourse("");
        if (data?.data?.data?.status === "UNPUBLISHED") {
          toast({
            title: "Success",
            description: "Course unpublished successfully",
            variant: "success",
          });
        } else {
          toast({
            title: "Success",
            description: "Course published successfully",
            variant: "success",
          });
        }
        setOpen("");
      },
      onError: (error: ErrorType) => {
        setIsStatusLoading(false);
        setCourse("");
        toast({
          title: "Error",
          description: error?.data?.message,
          variant: "destructive",
        });
      },
    });

  const { mutate: copyCourseFun, isPending: copyCoursePending } = useMutation({
    mutationFn: copyCourse,
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
        setIsDelete(false);
        setSingleCourse(null);
        toast({
          title: "Success",
          description: data?.data?.message,
          variant: "success",
        });
      },
      onError: (error: ErrorType) => {
        toast({
          title: "Error",
          description: error.data.message,
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
    if (
      +userData?.query?.role === UserRole?.Trainee ||
      (cohortCount > 0 && +userData?.query?.role === UserRole?.Trainer)
    ) {
      publishCourseFun(payload);
    } else {
      const singleCourse = list?.find(
        (item) => item?.currentVersion?.id === +id
      );
      if (singleCourse?.isOnline === 1) {
        publishCourseFun(payload);
      } else {
        toast({
          title: "Please Create Cohort Group",
          variant: "destructive",
        });
      }
    }
  };

  const { mutate: createNewVersionFun, isPending: createNewVersionPending } =
    useMutation({
      mutationFn: createNewVersion,
      onSuccess: (data) => {
        navigate(
          `/${Role}/create_course/${
            data?.data?.id
          }?tab=${0}&step=${0}&version=${data?.data?.currentVersion?.id}`
        );

        dispatch(
          setPath([
            ...paths,
            {
              label: "Edit Course",
              link: `/${Role}/create_course/${
                data?.data?.id
              }?tab=${0}&step=${0}&version=${data?.data?.currentVersion?.id}`,
            },
          ])
        );
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });

  const handleCopy = (e: Event, id: number) => {
    e.stopPropagation();
    // @ts-ignore
    copyCourseFun({ id, userId: userData?.query?.id || 0 });
  };

  const { mutate: courseMinorenditFun } = useMutation({
    mutationFn: courseMinorendit,
  });

  const handleEdit = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    item: AllCoursesResult,
    type?: string
  ) => {
    e.stopPropagation();
    if (
      item?.status === "DRAFT" ||
      item?.status === "PUBLISHED" ||
      item?.status === "UNPUBLISHED"
    ) {
      if (type === "editminor") {
        courseMinorenditFun(item?.id);
        if (+item?.step === 5) {
          navigate(
            `/${Role}/create_course/${item?.id}?tab=${
              +item?.tab === 4 ? 0 : item?.tab
            }&version=${item?.currentVersion?.id}&type=${type}`
          );
          dispatch(
            setPath([
              ...paths,
              {
                label: "Edit Course",
                link: `/${Role}/create_course/${item?.id}?tab=${
                  +item?.tab === 4 ? 0 : item?.tab
                }&version=${item?.currentVersion?.id}&type=${type}`,
              },
            ])
          );
        } else {
          navigate(
            `/${Role}/create_course/${item?.id}?tab=${
              +item?.tab === 4 ? 0 : item?.tab
            }&step=${+item?.step === 5 ? 0 : item?.step}&version=${
              item?.currentVersion?.id
            }&type=${type}`
          );
          dispatch(
            setPath([
              ...paths,
              {
                label: "Edit Course",
                link: `/${Role}/create_course/${item?.id}?tab=${
                  +item?.tab === 4 ? 0 : item?.tab
                }&step=${+item?.step === 5 ? 0 : item?.step}&version=${
                  item?.currentVersion?.id
                }&type=${type}`,
              },
            ])
          );
        }
      }

      if (type === "edit") {
        navigate(
          `/${Role}/create_course/${item?.id}?tab=${
            +item?.tab === 4 ? 0 : item?.tab
          }&step=${+item?.step === 5 ? 0 : item?.step}&version=${
            item?.currentVersion?.id
          }&type=${type}`
        );
        dispatch(
          setPath([
            ...paths,
            {
              label: "Edit Course",
              link: `/${Role}/create_course/${item?.id}?tab=${
                +item?.tab === 4 ? 0 : item?.tab
              }&step=${+item?.step === 5 ? 0 : item?.step}&version=${
                item?.currentVersion?.id
              }&type=${type}`,
            },
          ])
        );
      }

      if (type === "editWithNew") {
        createNewVersionFun({
          courseId: item?.id,
          version: item?.currentVersion?.version || 0,
          userId: +userData?.query?.id,
        });
      }
    } else {
      if (item?.trainerId?.id) {
        toast({
          title: "First Course make DRAFT Status then You Can Edit",
          variant: "destructive",
        });
      }
    }
  };

  const handleDeleteCourse = () => {
    deleteCourseFun(singleCourse ? singleCourse?.id : 0);
  };

  const handleChangeStatus = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    item: AllCoursesResult
  ) => {
    e.stopPropagation();
    setIsStatusLoading(true);
    const payload = {
      status: item.status === "PUBLISHED" ? "UNPUBLISHED" : "PUBLISHED",
      id: +item?.currentVersion?.id,
    };
    publishCourseFun(payload);
  };

  return list?.length > 0 && list ? (
    <div>
      <AllocatedCertificateModal
        isOpen={!!isOpen}
        onClose={() => setIsOpen("")}
        courseId={+isOpen}
        selectedCourse={selectedCourse}
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
        {list?.map((data: any, index: number) => {
          // const versionOption =
          //   data?.version &&
          //   data?.version.map((itm: any) => {
          //     return {
          //       label: `V-${itm?.version}`,
          //       value: itm?.id.toString() || "",
          //     };
          //   });

          const update =
            +userData?.query?.role === UserRole?.Trainer
              ? true
              : // : item?.trainerId?.id === +userData?.query?.detailsid
                // ? true
                permissions?.updateCourse;

          const isTrainee = +userData?.query?.role === UserRole?.Trainee;
          const isMyCoursesPath = pathName === "mycourses";
          const isPublished = data.status === "PUBLISHED";
          const versionOption =
            data?.version &&
            data?.version
              .filter((itm: any) => {
                if (isTrainee && isMyCoursesPath && isPublished) {
                  return itm.version === data?.currentVersion?.version;
                }
                return true;
              })
              .map((itm: any) => ({
                label: `V-${itm?.version}`,
                value: itm?.id.toString() || "",
              }));

          // const editOption =
          //   data?.trainerId?.id === +userData?.query?.detailsid
          //     ? (userData?.editCourses &&
          //         +userData?.query?.role !== UserRole.Trainee) ||
          //       data?.trainerId?.id === +userData?.query?.detailsid
          //     : userData?.editCourses ||
          //       +userData?.query?.role !== UserRole.Trainee;

          return (
            <Link
              to={`/${Role}/employee-basic-course/${data?.currentVersion?.id}`}
              key={index}
              onClick={() =>
                dispatch(
                  setPath([
                    { label: "Course Management", link: null },
                    { label: `${pathName}`, link: `/${Role}/${pathName}` },
                    { label: "Employee Basic Course", link: null },
                  ])
                )
              }
              className="border rounded overflow-hidden grid grid-cols-9 mb-5"
            >
              <div className="2xl:col-span-6 xl:col-span-6 col-span-9 sm:flex block items-center p-4">
                <div className="sm:min-w-[140px] sm:w-[140px] sm:min-h-[140px] sm:h-[140px] w-full rounded-md overflow-hidden col-span-1">
                  <img
                    src={data?.bannerImage || Course_image}
                    alt=""
                    className="object-cover w-full h-full static align-middle max-w-full inline-block inset-[50%_auto_auto_50%]"
                  />
                </div>
                <div className="col-span-3 xl:pl-4 p-3">
                  <h6 className="font-bold font-droid text-base xl:pb-4 pb-3">
                    {data?.title}
                  </h6>
                  <div className="flex xl:pb-4 pb-3">
                    <p className="text-sm font-normal font-droid xl:pr-[61px] pr-[35px] text-[#000000]">
                      Created By :{" "}
                      {data?.trainerId
                        ? (data?.trainerId?.contactFirstName || "") +
                            " " +
                            data?.trainerId?.contactSurname ||
                          data?.trainerId?.email?.split("@")[0]
                        : (data?.trainerCompanyId?.contactFirstName || "") +
                            " " +
                            data?.trainerCompanyId?.contactSurname ||
                          data?.trainerCompanyId?.email?.split("@")[0]}
                    </p>
                    <div className="flex items-center">
                      <img
                        src={starImage}
                        alt=""
                        className="w-[16px] h-[16px]"
                      />
                      <p className="pl-1 font-semibold font-droid text-sm mt-1">
                        {data?.feedBack?.avgRate}/5
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center xl:pb-4 pb-3">
                    <div className="text-sm font-normal font-droid text-[#000] xl:pr-24 pr-16">
                      Module : {data?.module?.length || 0}
                    </div>
                    <div className="text-sm font-normal font-droid text-[#000]">
                      Duration : {data?.duration || "00"}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center md:gap-5 gap-3">
                    {data?.courseData?.map((item: CourseDataEntity) => {
                      return (
                        <div className="">
                          <Badge
                            variant="outline"
                            className={`bg-[${item?.fetchMaturity?.color}] border-[#EDF0F4] p-1 px-3 text-[#3A3A3A] text-xs font-droid font-normal`}
                          >
                            {item?.fetchPillar?.pillarName}
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="2xl:col-span-3 xl:col-span-3 col-span-9 flex items-center sm:justify-end justify-start relative p-4">
                <div className="flex flex-row items-center xl:justify-end justify-center xl:gap-[7px] gap-[5px]">
                  <Button
                    disabled={
                      data?.status === "PUBLISHED" ||
                      data?.status === "EXPIRED" ||
                      data?.status === "READYTOPUBLISH" ||
                      (+userData?.query?.role === UserRole?.Trainee &&
                        data?.status === "READYTOPUBLISH")
                    }
                    className={`${
                      +userData?.query?.role === UserRole.Trainee
                        ? "xl:min-w-auto min-w-auto"
                        : "xl:max-w-[90px] max-w-[85px]"
                    } xl:py-[6px] py-[8px] font-droid bg-[#58BA66] hover:bg-[#58BA66] h-auto`}
                    onClick={(
                      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                    ) => {
                      e.preventDefault();
                      setOpen(data?.currentVersion?.id);
                      setCourse(data?.id);
                    }}
                  >
                    {data?.status === "PUBLISHED"
                      ? "Published"
                      : data?.status === "READYTOPUBLISH"
                      ? userData?.query?.role === "2"
                        ? "Publish"
                        : "Ready to Publish"
                      : "Publish"}
                  </Button>
                  {Role !== "trainee" && (
                    <Button
                      disabled={!update}
                      onClick={(e: any) =>
                        handleCohort(e, data?.currentVersion?.id as number)
                      }
                      className="xl:max-w-[90px] sm:text-sm text-xs w-auto xl:py-[6px] py-[8px] font-droid bg-[#000000] hover:bg-[#000000] h-auto"
                    >
                      + Cohort
                    </Button>
                  )}
                  {!(Role === "trainee" && pathName === "allcourse") && (
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
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild className="">
                      <EllipsisVertical />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-30">
                      <DropdownMenuGroup>
                        <DropdownMenuItem
                          className="flex items-center gap-2 font-droid"
                          onClick={(e: any) =>
                            handleCopy(e, data?.currentVersion?.id)
                          }
                        >
                          <Copy className="w-4 h-4" />
                          <span>Copy</span>
                        </DropdownMenuItem>
                        {data.status === "PUBLISHED" && (
                          <DropdownMenuItem
                            className="flex items-center gap-2 font-droid"
                            onClick={(e) => handleChangeStatus(e, data)}
                          >
                            <Pencil className="w-4 h-4" />
                            <span>
                              {data?.status === "UNPUBLISHED"
                                ? "Re-Publish"
                                : "Un-Publish"}
                            </span>
                          </DropdownMenuItem>
                        )}
                        {data.status === "READYTOPUBLISH" && (
                          <DropdownMenuItem
                            className="flex items-center gap-2 font-droid"
                            onClick={(e) => handleChangeStatus(e, data)}
                          >
                            <Pencil className="w-4 h-4" />
                            <span>Reject</span>
                          </DropdownMenuItem>
                        )}
                        {data.status === "PUBLISHED" && (
                          <DropdownMenuItem
                            className="flex items-center gap-2 font-droid"
                            onClick={(e) => handleEdit(e, data, "editminor")}
                          >
                            <Pencil className="w-4 h-4" />
                            <span>Edit minor</span>
                          </DropdownMenuItem>
                        )}
                        {["READYTOPUBLISH", "DRAFT"].includes(data.status) && (
                          <DropdownMenuItem
                            className="flex items-center gap-2 font-droid"
                            onClick={(e) => handleEdit(e, data, "edit")}
                          >
                            <Pencil className="w-4 h-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                        )}
                        {data.status === "PUBLISHED" && (
                          <DropdownMenuItem
                            className="flex items-center gap-2 font-droid"
                            onClick={(e) => handleEdit(e, data, "editWithNew")}
                          >
                            <Pencil className="w-4 h-4" />
                            <span>Edit new versions</span>
                          </DropdownMenuItem>
                        )}
                        {data.status === "PUBLISHED" && (
                          <DropdownMenuItem
                            className={`flex items-center gap-2 font-droid ${
                              +userData?.query?.role === UserRole.Trainee
                                ? "hidden"
                                : "flex"
                            }`}
                            disabled={data?.status !== "PUBLISHED"}
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsOpen(data?.currentVersion?.mainCourse?.id);
                              setSelectedCourse(data);
                            }}
                          >
                            <Combine className="w-4 h-4" />
                            <span>Allocate</span>
                          </DropdownMenuItem>
                        )}
                        {data.status !== "PUBLISHED" && (
                          <DropdownMenuItem
                            className={`items-center gap-2 font-droid ${
                              pathName === "trainee" &&
                              data?.trainerId?.id ===
                                +userData?.query?.detailsid
                                ? "flex"
                                : ""
                            }`}
                            onClick={(e: any) => {
                              e.stopPropagation();
                              setIsDelete(true);
                              setSingleCourse(data);
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="absolute w-[1px] h-32 left-0 top-0 bottom-0 bg-[#DDD] m-auto xl:block hidden"></div>
              </div>
            </Link>
          );
        })}
      </div>
      <Loading isLoading={createNewVersionPending || isStatusLoading} />
      <ConfirmModal
        open={isDelete}
        onClose={() => setIsDelete(false)}
        onDelete={handleDeleteCourse}
        value={singleCourse?.title || ""}
        isLoading={deleteCoursePending}
        message={`Do you want to delete ${
          singleCourse?.title || "this course"
        }?`}
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
