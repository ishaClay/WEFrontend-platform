import { toast } from "@/components/ui/use-toast";
import { useAppSelector } from "@/hooks/use-redux";
import { fetchEnroll } from "@/services/apiServices/enroll";
import { AllCourse, CourseTime, IsOnline } from "@/types/allcourses";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { FaStar } from "react-icons/fa6";
import CohortModel from "./CohortModel";
import Modal from "@/components/comman/Modal";

type dataGridProps = {
  data: AllCourse[];
};

const CourseListPage = ({ data }: dataGridProps) => {
  const user = useAppSelector((state) => state.user);
  const [isCohortShow, setIsCohortShow] = useState(false);
  const { mutate: enrollRequest } = useMutation({
    mutationFn: fetchEnroll,
    onSuccess: (data) => {
      toast({
        variant: "success",
        title: data?.data?.message,
      });
    },
    onError: (data) => {
      toast({
        variant: "destructive",
        title: data?.message,
      });
    },
  });
  const handleEnroll = (id: number) => {
    enrollRequest({
      courseId: id,
      userId: parseInt(user.UserId),
      trainerId: 11,
    });
  };
  return (
    <>
      <Modal
        open={isCohortShow}
        onClose={() => setIsCohortShow(false)}
        className="w-[560px]"
      >
        <CohortModel />
      </Modal>
      {data?.map((allcourse: AllCourse) => {
        return (
          <>
            <div
              className="h-full w-full border border-solid border-[#D9D9D9] rounded grid grid-cols-8 items-center mb-6 xl:gap-8 gap-0"
              key={allcourse.id}
            >
              <div className="xl:col-span-2 col-span-3">
                <div className="flex items-center">
                  <div className="relative overflow-hidden max-w-[356px]">
                    <img
                      className="object-cover object-center w-full"
                      src="/public/assets/img/nature.png"
                      alt="Course"
                    />
                    <input
                      type="checkbox"
                      className="absolute top-0 right-0 mt-2 mr-2 h-[23px] w-[24px]"
                    />
                    <div className="flex items-center absolute bottom-[10px] left-5 w-30 bg-[#FFFFFF] rounded-full py-[6px] px-2">
                      <FaStar className="text-[#FD8E1F]" />
                      <span className="text-[#3A3A3A] font-normal font-Poppins text-xs mr-2 ml-1">
                        Advanced
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="xl:col-span-6 col-span-5 xl:flex items-center xl:justify-between justify-center">
                <div className="xl:text-left text-center">
                  <p className="text-base font-medium leading-[22px] font-inter xl:mb-3 line-clamp-3 text-[#1D2026]">
                    {allcourse.title}
                  </p>

                  <div>
                    <div className="flex items-center xl:justify-start justify-center gap-5 xl:mb-3">
                      <div className="flex items-center gap-1 leading-[22px]">
                        <img
                          className="inline-block w-[20px] h-[23px]"
                          src="/public/assets/img/def.png"
                          alt="Image Alt Text"
                        />
                        <p className="text-[#918A8A] text-base font-normal font-calibri">
                          {allcourse?.courseData?.[0]?.fetchPillar?.pillarName}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 mb-[2px]">
                        <img
                          className=" h-[16] w-[18px] text-black"
                          src="/public/assets/img/diploma.png"
                          alt="Course"
                        />
                        <p className="text-xs leading-[22px] text-[#3A3A3A]">
                          {allcourse.otherInstitutionName}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 mb-[2px]">
                        <img
                          className=" h-[16] w-[18px]"
                          src="/public/assets/img/online.png"
                          alt="Course"
                        />
                        <p className="text-xs leading-[22px] text-[#3A3A3A]">
                          {allcourse.isOnline === IsOnline.Online && (
                            <span>Online</span>
                          )}
                          {allcourse.isOnline === IsOnline.InPerson && (
                            <span>InPerson</span>
                          )}
                          {allcourse.isOnline === IsOnline.Hybrid && (
                            <span>Hybrid</span>
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 mb-[2px]">
                        <img
                          className=" h-[16] w-[18px]"
                          src="/public/assets/img/unversity.png"
                          alt="Course"
                        />
                        <p className="text-xs leading-[22px] text-[#3A3A3A]">
                          Atlantic Technological University
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center xl:justify-start justify-center gap-5">
                      <div className="flex items-center gap-1 leading-[22px]">
                        <img
                          className="inline-block w-[18px] h-[24px]"
                          src="/public/assets/img/abc.png"
                          alt="Image Alt Text"
                        />
                        <p className="text-[#918A8A] text-base font-normal font-calibri leading-[22px]">
                          Social
                        </p>
                      </div>
                      <div className="flex items-center gap-1 mb-[2px]">
                        <img
                          className="h-[16] w-[18px]"
                          src="/public/assets/img/timer.png"
                          alt="Course"
                        />
                        <p className="text-xs leading-[22px] text-[#3A3A3A]">
                          Level-
                          {
                            allcourse?.courseData?.[0]?.fetchMaturity
                              ?.maturityLevelName
                          }
                        </p>
                      </div>
                      <div className="flex items-center gap-1 mb-[2px]">
                        <img
                          className=" h-[16] w-[18px]"
                          src="/public/assets/img/fulltime.png"
                          alt="Course"
                        />
                        <p className="text-xs leading-[22px] text-[#3A3A3A]">
                          {allcourse.time === CourseTime.FullTime && (
                            <span>Full-time</span>
                          )}
                          {allcourse.time === CourseTime.PartTime && (
                            <span>Part-time</span>
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 mb-[2px]">
                        <img
                          className=" h-[16] w-[18px]"
                          src="/public/assets/img/time.png"
                          alt="Course"
                        />
                        <p className="text-xs leading-[22px] text-[#3A3A3A]">
                          {allcourse.duration}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="xl:py-[13px] pb-0 pt-[13px]  xl:px-9 px-0 items-center xl:border-l xl:border-[#DDD]">
                  <div className="flex xl:justify-end justify-center">
                    <div
                      className="customeCohortShadow rounded-[6px] p-[7px] border border-[#B6D8DF] bg-[#E4FBFF] w-[300px]"
                      onClick={() => setIsCohortShow(true)}
                    >
                      <div className="flex items-center justify-between pb-[6px]">
                        <p className="text-black text-xs">
                          <span className="font-medium text-xs font-inter">
                            Cohort 2 :
                          </span>{" "}
                        </p>
                        <p className="text-[#4285F4] text-[10px] font-inter font-medium">
                          Show all cohort
                        </p>
                      </div>
                      <div className="font-inter text-[10px] leading-3 text-[#000000] font-normal">
                        <span>Start Date : </span>
                        <span>22/5/2024 </span>
                        <span>End Date : </span>
                        <span>30/5/2024</span>
                      </div>
                    </div>
                  </div>
                  <div className="xl:text-right text-center mt-3">
                    <button
                      onClick={() => handleEnroll(allcourse?.id)}
                      className="2xl:px-[14px] xl:p-[10px] py-1 px-2 bg-[#64A70B] text-white rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-400 text-base"
                    >
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};

export default CourseListPage;
