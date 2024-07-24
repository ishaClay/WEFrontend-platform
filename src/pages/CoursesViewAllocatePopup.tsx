import InputWithLabel from "@/components/comman/InputWithLabel";
import Loader from "@/components/comman/Loader";
import Modal from "@/components/comman/Modal";
import TextAreaWithLabel from "@/components/comman/TextAreaWithLabel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { QUERY_KEYS } from "@/lib/constants";
import { getImages } from "@/lib/utils";
import {
  allocateCourse,
  fetchAllocatedCourseById,
} from "@/services/apiServices/allocatedcourse";
import { InviteSingleEmployee } from "@/services/apiServices/employee";
import { CourseTime, IsOnline } from "@/types/allocatedcourses";
import { EmployeeEntity, EnrollmentRequestsByIdResponse } from "@/types/enroll";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { FaStar } from "react-icons/fa";
import { MdOutlineGroup } from "react-icons/md";
import * as zod from "zod";
import course from "@/assets/svgs/cource.svg";
import duration from "@/assets/svgs/duration.svg";
import institute from "@/assets/svgs/institute.svg";
import online from "@/assets/svgs/online.svg";
import time from "@/assets/svgs/time.svg";
import speed from "@/assets/images/Speed.png";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CourseViewAllocatePopupProps {
  isOpen: boolean;
  onClose: () => void;
  openId: number | null;
}

const schema = zod.object({
  fname: zod.string().min(1, { message: "First Name is required" }),
  lname: zod.string().min(1, { message: "Last Name is required" }),
  email: zod.string().email({ message: "Invalid Email" }),
  message: zod.string().optional(),
});

function CourseViewAllocatePopup({
  isOpen,
  onClose,
  openId,
}: CourseViewAllocatePopupProps) {
  const [isInvite, setIsInvite] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<number[]>([]);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "all",
  });

  const { data, isPending } = useQuery<EnrollmentRequestsByIdResponse>({
    queryKey: [QUERY_KEYS.fetchbycourseallocateById, { openId }],
    queryFn: () => fetchAllocatedCourseById(openId as number),
    enabled: !!openId,
  });

  const { mutate, isPending: isInvitePending } = useMutation({
    mutationFn: InviteSingleEmployee,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Employee invited successfully.",
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.fetchbycourseallocateById],
      });
      setIsInvite(false);
      reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const { mutate: allocate, isPending: isAllocatePending } = useMutation({
    mutationFn: allocateCourse,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Course Allocated successfully.",
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.fetchbycourseallocate],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.fetchbycourseallocate],
      });
      onClose();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const courseData = data?.data && data?.data;
  console.log("data+++", courseData);

  console.log("errors", data);
  const showInviteForm = () => {
    setIsInvite(true);
  };

  function mergeArraysWithUniqueness(
    arr1: EmployeeEntity[],
    arr2: EmployeeEntity[]
  ) {
    const combinedObj: Record<number, EmployeeEntity> = {
      ...arr1?.reduce((obj, item) => ({ ...obj, [item.id]: item }), {}),
    };

    arr2?.forEach((item) => {
      combinedObj[item.id] = item;
    });
    return Object.values(combinedObj);
  }

  useEffect(() => {
    if (courseData) {
      courseData?.employee?.forEach((item) => {
        setSelectedEmployee((prev) => {
          if (!prev.includes(item.id)) {
            return [...prev, item.id];
          }
          return prev;
        });
      });
    }
  }, [courseData]);

  const mergedArray =
    courseData &&
    mergeArraysWithUniqueness(
      courseData?.company?.employee,
      courseData?.employee
    );

  console.log("mergedArray", mergedArray);

  const handleInviteEmployee = (data: FieldValues) => {
    const payload = {
      email: data.email,
      firstName: data.fname,
      lastName: data.lname,
      companyId: courseData?.company?.id,
      csvUrl: "",
      invitationDetails: data.message,
      courseVersion: courseData?.courseVersion?.id,
    };

    mutate(payload);
  };

  const handleAllocation = () => {
    const payload = {
      companyId: courseData?.company?.id as number,
      enrollId: courseData?.id as number,
      employeeId: selectedEmployee,
    };
    allocate(payload);
  };

  console.log("openId", openId);

  const handleClose = () => {
    onClose();
    setIsInvite(false);
    reset();
  };

  const selectInviteEmployee = (employeeId: any) => {
    if (employeeId === "all") {
      if (selectedEmployee.length === mergedArray?.length) {
        setSelectedEmployee([]);
      } else {
        const allEmployeeIds = mergedArray?.map((employee: any) => employee.id);
        setSelectedEmployee(allEmployeeIds || []);
      }
    } else {
      if (selectedEmployee?.includes(employeeId)) {
        setSelectedEmployee(
          selectedEmployee?.filter((id) => id !== employeeId)
        );
      } else {
        setSelectedEmployee([...selectedEmployee, employeeId]);
      }
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      className="lg:max-w-[800px] md:max-w-[700px] sm:max-w-[580px] max-w-[350px] w-full overflow-y-auto max-h-full rounded-lg sm:p-[22px] p-[15px]"
    >
      {isPending ? (
        <Loader />
      ) : (
        <ScrollArea className="h-[500px]">
          <div className="bg-white rounded-lg">
            <div className="border-b-2 pb-[10px]">
              <div className="sm:flex block overflow-hidden rounded">
                <img
                  className="md:w-[204px] md:h-[192px] sm:w-[190px] sm:h-[170px] w-full h-[250px] rounded object-cover object-center"
                  src={courseData?.courseVersion?.course?.bannerImage}
                  alt="Course"
                />

                <div className="flex flex-col sm:ml-[15px] sm:mt-0 mt-3">
                  <div className="flex items-start justify-between">
                    <span className="text-[#1D2026] md:text-2xl text-lg font-bold">
                      {courseData?.courseVersion?.course?.title}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center flex-wrap sm:mt-[10px] mt-[6px] ml-[2px] md:gap-4 gap-2">
                      <div className="flex items-center gap-2">
                        <FaStar className="text-[#FD8E1F]" />
                        <span className="text-[#8C94A3] leading-[22px] text-sm">
                          RECOMMENDED
                        </span>
                      </div>
                      {/* {courseData?.courseVersion?.course?.courseData?.map((item) => {
                      return (
                        <div className="flex gap-2 items-center">
                          <p
                            className={`bg-[${item?.fetchMaturity?.color}] text-[#000] py-[3px] px-[10px] rounded-full text-base font-normal font-calibri leading-[22px]`}
                          >
                            {item?.fetchPillar?.pillarName}
                          </p>
                        </div>
                      );
                    })} */}
                      <p className="flex items-center gap-2">
                        <img
                          className="w-[18px]"
                          src={getImages("Social", false)}
                          alt="Image Alt Text"
                        />
                        Social
                      </p>
                      <p className="flex items-center gap-2">
                        <img
                          className="w-[20px]"
                          src={getImages("Technology & Innovation", false)}
                          alt="Image Alt Text"
                        />
                        Technology & Innovation
                      </p>
                      <div className="flex items-center gap-2">
                        <FaStar className="text-[#FBBC04] w-[12px] h-[11px]" />
                        <span className="text-[black] font-bold text-base mt-0.5">
                          4.5
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MdOutlineGroup />
                        <p className="text-[#A3A3A3] text-base">
                          {courseData?.numberOfEmployee || 0} Employee
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center flex-wrap md:gap-4 gap-2 mt-[17px]">
                    <div className="flex items-center gap-1">
                      <img
                        className=" h-[16] w-[18px]"
                        src={speed}
                        alt="Course"
                      />
                      <p className="text-xs">Level- Advanced</p>
                    </div>

                    <div className="flex items-center gap-1">
                      <img
                        className=" h-[16] w-[18px] text-black"
                        src={course}
                        alt="Course"
                      />
                      <p className="text-xs">Post Graduate Diploma</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <img className=" h-[16] w-[18px]" src={time} alt="time" />
                      <p className="text-xs">
                        {courseData?.courseVersion?.course?.time ===
                          CourseTime?.FullTime && <span>Full-time</span>}
                        {courseData?.courseVersion?.course.time ===
                          CourseTime?.PartTime && <span>Part-time</span>}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <img
                        className=" h-[16] w-[18px]"
                        src={online}
                        alt="type"
                      />
                      <p className="text-xs">
                        {courseData?.courseVersion?.course?.isOnline ===
                          IsOnline?.Online && <span>Online</span>}
                        {courseData?.courseVersion?.course?.isOnline ===
                          IsOnline?.InPerson && <span>InPerson</span>}
                        {courseData?.courseVersion?.course?.isOnline ===
                          IsOnline?.Hybrid && <span>Hybrid</span>}
                        {courseData?.courseVersion?.course?.isOnline ===
                          IsOnline?.Major && <span>Major</span>}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <img
                        className=" h-[16] w-[18px]"
                        src={duration}
                        alt="Duration"
                      />
                      <p className="text-xs">
                        {courseData?.courseVersion?.course?.duration}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <img
                        className=" h-[16] w-[18px]"
                        src={institute}
                        alt="institute"
                      />
                      <p className="text-xs">
                        {courseData?.courseVersion?.course?.institute}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              {isInvite ? (
                <div className="pt-[10px]">
                  <div className="mb-3">
                    <h5 className="text-[16px] font-calibri font-bold leading-5 pb-[6px]">
                      Invite Team Member
                    </h5>
                    <p className="text-[15px] text-[#606060] font-semibold">
                      Drop them an invite so they can join with their sleeves
                      rolled
                    </p>
                  </div>
                  <form onSubmit={handleSubmit(handleInviteEmployee)}>
                    <div className="grid grid-cols-2 gap-x-[29px] gap-y-[18px]">
                      <div className="sm:col-span-1 col-span-2">
                        <InputWithLabel
                          type="text"
                          label="First Name"
                          className="font-nunito mt-[8px] text-[#000000] sm:text-[16px] text-[14px] sm:h-[52px] h-[45px]"
                          placeholder="Enter First Name"
                          labelClassName="text-[#000000] !text-[16px] font-nunito leading-[22px]"
                          {...register("fname")}
                          error={errors?.fname?.message as string}
                        />
                      </div>
                      <div className="sm:col-span-1 col-span-2">
                        <InputWithLabel
                          type="text"
                          label="Last Name"
                          placeholder="Enter Last Name"
                          className="font-nunito mt-[8px] text-[#000000] sm:text-[16px] text-[14px] sm:h-[52px] h-[45px]"
                          labelClassName="text-[#000000] !text-[16px] font-nunito leading-[22px]"
                          {...register("lname")}
                          error={errors?.lname?.message as string}
                        />
                      </div>
                      <div className="col-span-2">
                        <InputWithLabel
                          type="text"
                          label="Team Member Email"
                          placeholder="Enter email id"
                          className="font-nunito mt-[8px] text-[#000000] sm:text-[16px] text-[14px] sm:h-[52px] h-[45px]"
                          labelClassName="text-[#000000] !text-[16px] font-nunito leading-[22px]"
                          {...register("email")}
                          error={errors?.email?.message as string}
                        />
                      </div>
                      <div className="col-span-2">
                        <TextAreaWithLabel
                          label="Invitation Details"
                          placeholder="Enter Details"
                          className="font-nunito text-[#000000] sm:text-[16px] text-[14px]"
                          labelClassName="text-[#000000] !text-[16px] font-nunito leading-[22px]"
                          isLength={false}
                          {...register("message")}
                          error={errors?.message?.message as string}
                        />
                      </div>
                    </div>
                    <div className="w-full flex items-center justify-end mt-[20px]">
                      <Button
                        type="submit"
                        className="bg-[#58BA66] text-white w-[100px] sm:h-[52px] h-[45px] rounded mt-[5px] text-base"
                      >
                        {isInvitePending ? (
                          <Loader containerClassName="h-auto" />
                        ) : (
                          "Send Invite"
                        )}
                      </Button>
                    </div>
                  </form>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between p-4 pb-0">
                    <h2 className="text-base font-bold">Employees</h2>
                    <div className="flex items-center">
                      <label className="font-bold mr-[10px]">Select All</label>
                      <input
                        type="checkbox"
                        name="all"
                        className="h-[18px] w-[18px] rounded"
                        checked={
                          selectedEmployee.length === mergedArray?.length
                        }
                        onChange={() => selectInviteEmployee("all")}
                      />
                    </div>
                  </div>
                  <div className="p-4 max-h-[350px] overflow-auto">
                    {mergedArray && mergedArray?.length > 0 ? (
                      mergedArray?.map((employee) => (
                        <div
                          key={employee.id}
                          className="flex items-center justify-between mb-2 border-b pb-2 border-[#D9D9D9]"
                        >
                          <div className="flex items-center gap-[15px]">
                            <Avatar>
                              <AvatarImage src={employee.profileImage} />
                              <AvatarFallback>
                                {employee.name?.charAt(0) ||
                                  employee.email?.charAt(0)?.toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <span>
                              {employee.name || employee.email.split("@")?.[0]}
                            </span>
                          </div>
                          <input
                            type="checkbox"
                            name="employee"
                            checked={selectedEmployee?.includes(employee?.id)}
                            onChange={() => selectInviteEmployee(employee?.id)}
                            className="h-[18px] w-[18px] rounded"
                          />
                        </div>
                      ))
                    ) : (
                      <span className="text-center block">No data found</span>
                    )}
                  </div>
                  <div className="w-full flex items-center justify-between mt-2">
                    <Button
                      type="button"
                      className="bg-[#00778B] text-white lg:w-[137px] w-[130px] lg:h-[52px] h-[45px] rounded mt-[5px] text-base"
                      onClick={showInviteForm}
                    >
                      Invite Member
                    </Button>
                    <Button
                      type="button"
                      className="bg-[#58BA66] text-white lg:w-[137px] w-[130px] lg:h-[52px] h-[45px] rounded mt-[5px] text-base"
                      onClick={handleAllocation}
                    >
                      {isAllocatePending ? (
                        <Loader containerClassName="h-auto" />
                      ) : (
                        "Edit Allocation"
                      )}
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </ScrollArea>
      )}
    </Modal>
  );
}

export default CourseViewAllocatePopup;
