import { useAppSelector } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { getCourseSlider } from "@/services/apiServices/courseSlider";
import { HomeCourseSlidersResponse } from "@/types/banner";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { SecondaryButton } from "../comman/Button/CustomButton";
import Loader from "../comman/Loader";

const FeaturedCourses = () => {
  const navigate = useNavigate();
  const [title, setTitle] = React.useState<string>("");
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
      <div className="hidden sm:block top-[178px]">
        <GrPrevious />
      </div>
    ),
    nextArrow: (
      <div className="hidden sm:block">
        <GrNext />
      </div>
    ),
    beforeChange: (current: number) => {
      setTitle(
        (clientwiseCourseslider?.data &&
          clientwiseCourseslider?.data[current]?.courseType) ||
          ""
      );
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
          prevArrow: <></>,
          nextArrow: <></>,
        },
      },
    ],
  };

  return (
    <div className="">
      <div className="xl:max-w-[1160px] max-w-full mx-auto md:my-[40px] my-0 xl:px-0 px-5 2xl:py-[30px] py-[24px] ">
        <div className="max-w-full flex items-center justify-between xl:flex-row flex-col xl:gap-0 sm:gap-10 gap-[42px]">
          {/* <div className="relative">
            <img
              className="w-[332px] h-[357px]"
              src="../assets/img/Group 1000001820.png"
            />
            <img
              className="absolute left-[14px] bottom-[2px]"
              src="../assets/img/Voltage.png"
            />
          </div> */}

          <div className="w-full courses_slider">
            {clientwiseCoursesliderPending ? (
              <Loader />
            ) : (
              <Slider {...settings}>
                {clientwiseCourseslider?.data?.map((item) => {
                  return (
                    // <div>
                    // 	<SliderData courseImage={item.courseImage} buttonTitle={item.buttonTitle} content={item.content} courseTitle={item.courseTitle} courseType ={item.courseType} />
                    // </div>

                    <div className="relative">
                      <div className="sm:h-[357px] h-auto flex sm:flex-row flex-col justify-between items-start">
                        <div className="sm:order-1 order-2 sm:mt-0 mt-3 w-[calc(100%-450px)] h-full flex flex-col justify-between">
                          <div>
                            <h5 className="text-2xl font-font-droid font-bold text-[#64A70B] capitalize xl:text-left text-center sm:mb-0 mb-4">
                              {title || "Featured Courses"}
                            </h5>
                          </div>
                          <div>
                            <h2 className="min-h-[40px] xl:leading-9 sm:leading-8 leading-6 xl:text-[32px] sm:text-3xl text-2xl font-bold font-droid pb-4 mt-5 truncate">
                              {item.courseTitle?.title}
                            </h2>

                            <p className="w-full mb-8 text-lg leading-5 pr-4 font-droid line-clamp-4">
                              {item.content}
                            </p>
                          </div>
                          {item?.courseTitle?.id && item.buttonTitle && (
                            <SecondaryButton
                              name={item.buttonTitle}
                              symbol={
                                <img src="../assets/img/Move Right.png" />
                              }
                              className="sm:w-[195px] w-full xl:h-[62px] bg-[#75BD43] h-[50px] flex items-center justify-center gap-[10px] font-font-droid font-normal text-lg"
                              onClick={() => {
                                navigate(
                                  `/feature-course/${item?.courseTitle?.id}`
                                );
                              }}
                            ></SecondaryButton>
                          )}
                        </div>

                        <div className="sm:order-2 order-1 w-[450px]">
                          <img
                            className="w-full h-[357px] object-cover"
                            src={item.courseImage}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Slider>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCourses;
