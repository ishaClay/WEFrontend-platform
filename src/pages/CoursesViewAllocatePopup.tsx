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

  console.log("data", data);

  const courseData = data?.data && data?.data;

  console.log("errors", data);
  const showInviteForm = () => {
    setIsInvite(true);
  };

  function mergeArraysWithUniqueness(
    arr1: EmployeeEntity[],
    arr2: EmployeeEntity[]
  ) {
    const combinedObj: Record<number, EmployeeEntity> = {
      ...arr1.reduce((obj, item) => ({ ...obj, [item.id]: item }), {}),
    };

    arr2.forEach((item) => {
      combinedObj[item.id] = item;
    });
    return Object.values(combinedObj);
  }

  useEffect(() => {
    if (courseData) {
      courseData?.employee.forEach((item) => {
        setSelectedEmployee((prev) => {
          if (!prev.includes(item.id)) {
            return [...prev, item.id];
          }
          return prev;
        });
      });
    }
  }, [courseData]);

  const handleChange = (id: number) => {
    console.log("selectedEmployee", id);
    setSelectedEmployee((prev) => {
      if (!prev.includes(id)) {
        return [...prev, id];
      } else {
        return prev.filter((item) => item !== id);
      }
    });
  };

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

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      className="max-w-[800px] w-full overflow-y-auto max-h-full"
    >
      {isPending ? (
        <Loader />
      ) : (
        <div className="bg-white rounded-lg">
          <div className=" border-b-2 pb-[10px]">
            <div className="flex overflow-hidden rounded">
              <img
                className="w-[204px] h-[189px] rounded object-cover object-center"
                src={courseData?.courseVersion?.course?.bannerImage}
                alt="Course"
              />

              <div className="flex flex-col ml-[15px]">
                <div className="flex items-start justify-between">
                  <span className="text-[#1D2026] text-xl font-bold">
                    {courseData?.courseVersion?.course?.title}
                  </span>
                </div>

                <div>
                  <div className="flex items-center flex-wrap mt-[10px] ml-[2px] gap-4">
                    <div className="flex items-center gap-4">
                      <FaStar className="text-[#FD8E1F]" />
                      <span className="text-[#8C94A3] font-semibold leading-[22px] text-sm mt-0.5 ml-1">
                        RECOMMENDED
                      </span>
                    </div>
                    <p className="flex items-center gap-4">
                      <img
                        className="w-[18px]"
                        src={getImages("Social", false)}
                        alt="Image Alt Text"
                      />
                      Social
                    </p>
                    <p className="flex items-center gap-4">
                      <img
                        className="w-[20px]"
                        src={getImages("Technology & Innovation", false)}
                        alt="Image Alt Text"
                      />
                      Technology & Innovation
                    </p>
                    <div className="flex items-center gap-4">
                      <FaStar className="text-[#FBBC04] w-[12px] h-[11px]" />
                      <span className="text-[black] font-bold text-sm mt-0.5">
                        4.5
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <MdOutlineGroup />
                      <p className="text-[#A3A3A3] text-[13px]">
                        {courseData?.company?.employee?.length || 0} Employee
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center flex-wrap gap-4 mt-[17px]">
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
                      {courseData?.courseVersion?.course.time ===
                        CourseTime.FullTime && <span>Full-time</span>}
                      {courseData?.courseVersion?.course.time ===
                        CourseTime.PartTime && <span>Part-time</span>}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <img className=" h-[16] w-[18px]" src={online} alt="type" />
                    <p className="text-xs">
                      {courseData?.courseVersion?.course.isOnline ===
                        IsOnline.Online && <span>Online</span>}
                      {courseData?.courseVersion?.course.isOnline ===
                        IsOnline.InPerson && <span>InPerson</span>}
                      {courseData?.courseVersion?.course.isOnline ===
                        IsOnline.Hybrid && <span>Hybrid</span>}
                      {courseData?.courseVersion?.course.isOnline ===
                        IsOnline.Major && <span>Major</span>}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <img
                      className=" h-[16] w-[18px]"
                      src={duration}
                      alt="Duration"
                    />
                    <p className="text-xs">
                      {courseData?.courseVersion?.course.duration}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <img
                      className=" h-[16] w-[18px]"
                      src={institute}
                      alt="institute"
                    />
                    <p className="text-xs">
                      {courseData?.courseVersion?.course.institute}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            {isInvite ? (
              <div className="pt-[10px]">
                <h5 className="text-[16px] font-calibri font-bold leading-5 mb-[30px]">
                  Invite Team Member
                </h5>
                <form onSubmit={handleSubmit(handleInviteEmployee)}>
                  <div className="grid grid-cols-2 gap-x-[29px] gap-y-[18px]">
                    <div className="col-span-1">
                      <InputWithLabel
                        type="text"
                        label="First Name"
                        className="font-nunito mt-[8px] text-[#000000] text-[16px]"
                        placeholder="Enter First Name"
                        labelClassName="text-[#000000] text-[16px] font-nunito leading-[22px]"
                        {...register("fname")}
                        error={errors.fname?.message as string}
                      />
                    </div>
                    <div className="col-span-1">
                      <InputWithLabel
                        type="text"
                        label="Last Name"
                        placeholder="Enter Last Name"
                        className="font-nunito mt-[8px] text-[#000000] text-[16px]"
                        labelClassName="text-[#000000] text-[16px] font-nunito leading-[22px]"
                        {...register("lname")}
                        error={errors.lname?.message as string}
                      />
                    </div>
                    <div className="col-span-2">
                      <InputWithLabel
                        type="text"
                        label="Team Member Email"
                        placeholder="Enter email id"
                        className="font-nunito mt-[8px] text-[#000000] text-[16px]"
                        labelClassName="text-[#000000] text-[16px] font-nunito leading-[22px]"
                        {...register("email")}
                        error={errors.email?.message as string}
                      />
                    </div>
                    <div className="col-span-2">
                      <TextAreaWithLabel
                        label="Invitation Details"
                        placeholder="Enter Details"
                        className="font-nunito text-[#000000] text-[16px]"
                        labelClassName="text-[#000000] text-[16px] font-nunito leading-[22px]"
                        isLength={false}
                        {...register("message")}
                        error={errors.message?.message as string}
                      />
                    </div>
                  </div>
                  <div className="w-full flex items-center justify-end mt-[20px]">
                    <Button
                      type="submit"
                      className="bg-[#58BA66] text-white px-4 py-2 rounded mt-[5px]"
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
                  <h2 className="text-[15px] font-bold">Employees</h2>
                  <div className="flex items-center">
                    <label className="font-bold mr-[10px]">Select All</label>
                    <input
                      type="checkbox"
                      className="h-[18px] w-[18px] rounded"
                      onChange={() => {}}
                    />
                  </div>
                </div>
                <div className="p-4 max-h-[350px] overflow-auto">
                  {mergedArray &&
                    mergedArray?.length > 0 &&
                    mergedArray.map((employee) => (
                      <div
                        key={employee.id}
                        className="flex items-center justify-between mb-2 border-b pb-2 border-[#D9D9D9]"
                      >
                        <div className="flex items-center gap-[15px]">
                          <Avatar>
                            <AvatarImage src={employee.profileImage} />
                            <AvatarFallback>
                              {employee.name?.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span>{employee.name}</span>
                        </div>
                        <input
                          type="checkbox"
                          defaultChecked={
                            selectedEmployee?.length > 0
                              ? selectedEmployee.includes(employee.id)
                              : courseData?.employee?.includes(employee)
                          }
                          onChange={() => handleChange(employee.id)}
                          className="h-[18px] w-[18px] rounded"
                        />
                      </div>
                    ))}
                </div>
                <div className="w-full flex items-center justify-between mt-2">
                  <Button
                    type="button"
                    className="bg-[#00778B] text-white px-4 py-2 rounded mt-[5px]"
                    onClick={showInviteForm}
                  >
                    Invite Member
                  </Button>
                  <Button
                    type="button"
                    className="bg-[#58BA66] text-white px-4 py-2 rounded mt-[5px]"
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
      )}
    </Modal>
  );
}

export default CourseViewAllocatePopup;
