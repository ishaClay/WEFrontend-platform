import { useAppSelector } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { getCourseSlider } from "@/services/apiServices/courseSlider";
import { HomeCourseSlidersResponse } from "@/types/banner";
import { useQuery } from "@tanstack/react-query";
import { GrNext, GrPrevious } from "react-icons/gr";
import Slider from "react-slick";
import { SecondaryButton } from "../comman/Button/CustomButton";

const FeaturedCourses = () => {
  const { clientId } = useAppSelector((state) => state.user);
  const {
    data: clientwiseCourseslider,
    isPending: clientwiseCoursesliderPending,
  } = useQuery<HomeCourseSlidersResponse>({
    queryKey: [QUERY_KEYS.clientwiseCourseSlider, clientId],
    queryFn: () => getCourseSlider(clientId.toString(), "Active"),
    enabled: !!clientId,
  });
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    fade: true,
    prevArrow: (
      <div className="hidden sm:block">
        <GrPrevious />
      </div>
    ),
    nextArrow: (
      <div className="hidden sm:block">
        <GrNext />
      </div>
    ),
  };
  return (
    <div className="bg-[#F7F8FC]">
      <div className="xl:max-w-[1160px] max-w-full mx-auto xl:px-0 px-5 2xl:py-[30px] py-[24px] xl:pb-6 pb-16">
        <div>
          <h5 className="text-2xl font-abhaya font-bold text-[#64A70B] xl:text-left text-center">
            Featured Courses
          </h5>
        </div>
        <div className="max-w-full xl:h-[517px] flex items-center justify-between xl:flex-row flex-col xl:gap-0 gap-10">
          <div className="md:block hidden relative">
            <img
              className="w-[332px] h-[357px]"
              src="../assets/img/Group 1000001820.png"
            />
            <img
              className="absolute left-[14px] bottom-[2px]"
              src="../assets/img/Voltage.png"
            />
          </div>

          <div className="max-w-[697px] w-full">
            <Slider {...settings}>
              {clientwiseCourseslider?.data?.map((item) => {
                return (
                  // <div>
                  // 	<SliderData courseImage={item.courseImage} buttonTitle={item.buttonTitle} content={item.content} courseTitle={item.courseTitle} courseType ={item.courseType} />
                  // </div>

                  <div className="relative">
                    <div className="w-[697px] h-[357px] flex justify-between items-center">
                      <div className="w-full">
                        <h2 className="w-[413px] min-h-[40px] xl:leading-9 leading-8 xl:text-[32px] text-3xl font-bold text-color font-abhaya pb-4">
                          {item.courseTitle}
                        </h2>

                        <p className="xl:w-[413px] mb-8 text-lg text-color leading-5 pr-4 font-abhaya line-clamp-3">
                          {item.content}
                        </p>

                        <SecondaryButton
                          name={item.buttonTitle}
                          symbol={<img src="../assets/img/Move Right.png" />}
                          className="w-[195px] xl:h-[62px] h-[50px] flex items-center justify-center gap-[10px] font-abhaya text-lg"
                        ></SecondaryButton>
                      </div>

                      <div>
                        <img
                          className="min-w-[274px] w-[274px] h-[357px] object-cover"
                          src={item.courseImage}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
      <div className="border border-spacing-3 button-color w-full h-3 mt-[34px]"></div>
    </div>
  );
};

export default FeaturedCourses;
