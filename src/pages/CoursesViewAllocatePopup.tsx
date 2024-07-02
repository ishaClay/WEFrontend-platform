import InputWithLabel from "@/components/comman/InputWithLabel";
import Loader from "@/components/comman/Loader";
import Modal from "@/components/comman/Modal";
import TextAreaWithLabel from "@/components/comman/TextAreaWithLabel";
import { Button } from "@/components/ui/button";
import { QUERY_KEYS } from "@/lib/constants";
import { getImages } from "@/lib/utils";
import { fetchAllocatedCourseById } from "@/services/apiServices/allocatedcourse";
import { CourseTime, IsOnline } from "@/types/allocatedcourses";
import { AllocatedCourseById } from "@/types/enroll";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaStar } from "react-icons/fa";
import { MdOutlineGroup } from "react-icons/md";
import * as zod from "zod";
import course from "../assets/svgs/cource.svg";
import duration from "../assets/svgs/duration.svg";
import institute from "../assets/svgs/institute.svg";
import online from "../assets/svgs/online.svg";
import time from "../assets/svgs/time.svg";

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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "all",
  });

  const { data, isPending } = useQuery<AllocatedCourseById>({
    queryKey: [QUERY_KEYS.fetchbycourseallocateById, { openId }],
    queryFn: () => fetchAllocatedCourseById("11", openId as number),
    enabled: !!openId,
  });

  const courseData = data?.data && data?.data?.[0];

  console.log("errors", data);
  const showInviteForm = () => {
    setIsInvite(true);
  };

  const handleInviteEmployee = () => {
    // Logic to invite selected employees
  };

  const handleAllocation = () => {
    // Logic to invite selected employees
  };

  console.log("openId", openId);

  const handleClose = () => {
    onClose();
    setIsInvite(false);
    reset();
  };

  return (
    <Modal open={isOpen} onClose={handleClose} className="max-w-[800px] w-full">
      {isPending ? (
        <Loader />
      ) : (
        <div className="bg-white rounded-lg">
          <div className=" border-b-2 pb-[10px]">
            <div className="flex overflow-hidden rounded">
              <img
                className="w-[204px] h-[189px] rounded object-cover object-center"
                src={courseData?.course?.bannerImage}
                alt="Course"
              />

              <div className="flex flex-col ml-[15px]">
                <div className="flex items-start justify-between">
                  <span className="text-[#1D2026] text-xl font-bold">
                    {courseData?.course?.title}
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
                        {courseData?.course?.company?.employee?.length || 0}{" "}
                        Employee
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center flex-wrap gap-4 mt-[17px]">
                  <div className="flex items-center gap-1">
                    <img
                      className=" h-[16] w-[18px]"
                      src="/public/assets/img/timer.png"
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
                      {courseData?.course.time === CourseTime.FullTime && (
                        <span>Full-time</span>
                      )}
                      {courseData?.course.time === CourseTime.PartTime && (
                        <span>Part-time</span>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <img className=" h-[16] w-[18px]" src={online} alt="type" />
                    <p className="text-xs">
                      {courseData?.course.isOnline === IsOnline.Online && (
                        <span>Online</span>
                      )}
                      {courseData?.course.isOnline === IsOnline.InPerson && (
                        <span>InPerson</span>
                      )}
                      {courseData?.course.isOnline === IsOnline.Hybrid && (
                        <span>Hybrid</span>
                      )}
                      {courseData?.course.isOnline === IsOnline.Major && (
                        <span>Major</span>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <img
                      className=" h-[16] w-[18px]"
                      src={duration}
                      alt="Duration"
                    />
                    <p className="text-xs">{courseData?.course.duration}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <img
                      className=" h-[16] w-[18px]"
                      src={institute}
                      alt="institute"
                    />
                    <p className="text-xs">{courseData?.course.institute}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                    Send Invite
                  </Button>
                </div>
              </form>
            </div>
          ) : (
            <>
              <div className="flex items-center mt-[20px]">
                <h2 className="text-[15px] mb-2 ml-[25px] font-bold">
                  Employees
                </h2>
                <div className="flex items-center ml-[527px]">
                  <label className="font-bold mr-[10px]">Select All</label>
                  <input
                    type="checkbox"
                    className="h-[18px] w-[18px] rounded ml-[5px] mr-[5px]"
                    onChange={() => {}}
                  />
                </div>
              </div>
              <div className="p-4 ">
                {courseData?.course?.company?.employee.map((employee) => (
                  <div
                    key={employee.id}
                    className="flex items-center mb-2 border-b pb-2 border-[#D9D9D9]"
                  >
                    <img
                      src={employee.profileImage}
                      className="w-10 h-10 rounded-full border-[#D9D9D9]  border-2 mr-2 "
                    />
                    <span>{employee.name}</span>
                    <input
                      type="checkbox"
                      onChange={() => {}}
                      className="ml-[520px]  h-[18px] w-[18px] rounded"
                    />
                  </div>
                ))}
              </div>
              <div className="w-full flex items-center justify-between">
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
                  Edit Allocation
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </Modal>
  );
}

export default CourseViewAllocatePopup;
