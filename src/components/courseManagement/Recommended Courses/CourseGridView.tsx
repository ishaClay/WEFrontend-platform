import Loader from "@/components/comman/Loader";
import { toast } from "@/components/ui/use-toast";
import { QUERY_KEYS } from "@/lib/constants";
import { fetchEnroll } from "@/services/apiServices/enroll";
import { CourseTime, IsOnline } from "@/types/allcourses";
import { ErrorType } from "@/types/Errors";
import { RecommendedCourses } from "@/types/RecommendedCourses";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import speed from "@/assets/images/Speed.png";
import diploma from "@/assets/images/diploma.png";
import fulltime from "@/assets/images/fulltime.png";
import online from "@/assets/images/online.png";
import time from "@/assets/images/time.png";
import unversity from "@/assets/images/unversity.png";
import atu from "@/assets/images/atu.png";

const CourseGridView = ({
  recommendeddata,
}: {
  recommendeddata: RecommendedCourses;
}) => {
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const queryClient = useQueryClient();
  const { mutate: enrollRequest, isPending } = useMutation({
    mutationFn: fetchEnroll,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.fetchbyrecommendedcourse],
      });
      toast({
        variant: "success",
        title: data?.data?.message,
      });
    },
    onError: (error: ErrorType) => {
      toast({
        variant: "destructive",
        title: error?.data?.message,
      });
    },
  });

  console.log("recommendeddata", recommendeddata);

  const handleEnrollementRequest = (id: number) => {
    enrollRequest({
      versionId: id,
      companyId: +userData?.query?.detailsid,
    });
  };
  return (
    <>
      <div
        className="h-full w-full border border-solid border-[#D9D9D9] rounded col-span-1 overflow-hidden"
        key={recommendeddata.id}
      >
        <div className="relative overflow-hidden h-[231px]">
          <img
            src={recommendeddata?.bannerImage}
            alt="course"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="">
          <div className="min-h-[291px] max-h-[335px] h-full sm:px-[19px] sm:py-[14px] p-3 flex flex-col justify-between">
            <div>
              <span
                dangerouslySetInnerHTML={{
                  __html: recommendeddata.description,
                }}
                className="font-inter lg:text-base text-sm line-clamp-2 mb-3"
              ></span>
              <h3 className="text-[#000000] text-[18px] font-calibri font-[600] sm:w-[100px] w-[80px] mb-3">
                €{recommendeddata.price}
              </h3>
              <div className="mb-3">
                <div className="flex items-center md:gap-4 sm:gap-3 gap-2 flex-wrap leading-[22px]">
                  {recommendeddata?.courseData?.map((item) => {
                    return (
                      <div className="flex gap-2 items-center">
                        <p
                          className={`bg-[${item?.fetchMaturity?.color}] text-[#000] py-[3px] px-[10px] rounded-full sm:text-base text-sm font-normal font-calibri leading-[22px]`}
                        >
                          {item?.fetchPillar?.pillarName}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div>
              <div className="grid grid-cols-5">
                <div className="gap-2 col-span-2">
                  <div className="flex items-center gap-1 mb-[2px]">
                    <img className="h-[16] w-[18px]" src={speed} alt="Course" />
                    <p className="text-xs leading-[22px] text-[#3A3A3A]">
                      Level-
                      {recommendeddata?.courseData?.[0]?.fetchMaturity
                        ?.maturityLevelName || "--"}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 mb-[2px]">
                    <img
                      className=" h-[16] w-[18px]"
                      src={fulltime}
                      alt="Course"
                    />
                    <p className="text-xs leading-[22px] text-[#3A3A3A]">
                      {recommendeddata.time === CourseTime.FullTime && (
                        <span>Full-time</span>
                      )}
                      {recommendeddata.time === CourseTime.PartTime && (
                        <span>Part-time</span>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 mb-[2px]">
                    <img className=" h-[16] w-[18px]" src={time} alt="Course" />
                    <p className="text-xs leading-[22px] text-[#3A3A3A]">
                      {recommendeddata.duration || "--"}
                    </p>
                  </div>
                </div>

                <div className="gap-2 col-span-3">
                  <div className="flex items-center gap-1 mb-[2px]">
                    <img
                      className=" h-[16] w-[18px] text-black"
                      src={diploma}
                      alt="Course"
                    />
                    <p className="text-xs leading-[22px] text-[#3A3A3A]">
                      {recommendeddata.otherInstitutionName || "--"}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 mb-[2px]">
                    <img
                      className=" h-[16] w-[18px]"
                      src={online}
                      alt="Course"
                    />
                    <p className="text-xs leading-[22px] text-[#3A3A3A]">
                      {recommendeddata.isOnline === IsOnline.Online && (
                        <span>Online</span>
                      )}
                      {recommendeddata.isOnline === IsOnline.InPerson && (
                        <span>InPerson</span>
                      )}
                      {recommendeddata.isOnline === IsOnline.Hybrid && (
                        <span>Hybrid</span>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 mb-[2px]">
                    <img
                      className=" h-[16] w-[18px]"
                      src={unversity}
                      alt="Course"
                    />
                    <p className="text-xs leading-[22px] text-[#3A3A3A]">
                      Atlantic Technological University
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t sm:py-[12px] sm:px-[15px] p-2.5 grid grid-cols-7 items-center xl:gap-0 gap-3">
            <div className="2xl:col-span-2 col-span-3">
              <img
                className="object-cover object-center"
                src={atu}
                alt="Course"
              />
            </div>
            <div className="2xl:col-span-5 col-span-4 xl:mr-0 ml-auto m-0 flex items-center 2xl:flex-row flex-col 2xl:gap-4 gap-2">
              <button className="w-[110px] h-[42px] bg-[#00778B] text-white rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-400">
                Inquire
              </button>
              <button
                // disabled={
                //   reCommendedCourses?.some(
                //     (item) => item?.id === recommendeddata?.id
                //   )
                //     ? true
                //     : false
                // }
                onClick={() => handleEnrollementRequest(recommendeddata.id)}
                className="group w-[110px] h-[42px] bg-[#64A70B] text-white rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-400 text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#64A70B]"
              >
                {isPending ? (
                  <Loader
                    containerClassName="h-auto"
                    className="group-hover:text-white"
                  />
                ) : (
                  "Enroll Now"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseGridView;
