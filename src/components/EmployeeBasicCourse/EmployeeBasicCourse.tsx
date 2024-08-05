import { QUERY_KEYS } from "@/lib/constants";
import {
  fetchSingleCourse,
  getEmployeeSingeCourse,
} from "@/services/apiServices/courseSlider";
import { SingleCourseEmployeeResponse } from "@/types/employee";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, MoveLeft } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Modal from "../comman/Modal";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Feedback from "./feedback";
import Information from "./Information";
import Module from "./Module";
import ReviewModal from "./ReviewModal";
import { useAppDispatch } from "@/hooks/use-redux";
import { setPath } from "@/redux/reducer/PathReducer";

const EmployeeBasicCourse = () => {
  const [isOpenReviewModal, setIsOpenReviewModal] = useState(false);
  const location = useLocation();
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const pathName = location?.pathname?.split("/")[1];
  const courseById = location?.pathname?.split("/")[3];
  const dispatch = useAppDispatch();
  const { data: getSingleCourse } = useQuery({
    queryKey: [QUERY_KEYS.getSingleCourse, courseById],
    queryFn: () => fetchSingleCourse(courseById),
    enabled: !!courseById && userData?.query?.role !== "4",
  });

  const { data: fetchEmployeeSingeCourse } =
    useQuery<SingleCourseEmployeeResponse>({
      queryKey: [QUERY_KEYS.getSingleCourse],
      queryFn: () =>
        getEmployeeSingeCourse({
          courseId: courseById,
          userId: userData?.query?.detailsid,
        }),
      enabled: userData?.query?.role === "4",
    });

  const course =
    userData?.query?.role !== "4"
      ? getSingleCourse?.data
      : fetchEmployeeSingeCourse?.data;

  return (
    <>
      <Modal
        open={isOpenReviewModal}
        onClose={() => setIsOpenReviewModal(false)}
        className="lg:max-w-[610px] sm:max-w-[550px] max-w-[335px] lg:p-6 p-4 rounded-xl"
      >
        <ReviewModal />
      </Modal>
      <div className="bg-white rounded-b-xl h-[calc(100vh-170px)] overflow-y-auto">
        <div className="">
          <div className="sm:flex block justify-between items-center px-5 py-5">
            <h4 className="xl:text-[28px] md:text-[22px] text-[18px] leading-[normal] font-bold font-nunito text-black sm:pb-0 pb-3">
              {course?.course?.title}
            </h4>
            {/* {pathName !== "trainer" && (
              <Button
                className="bg-[#00778B] text-base lg:h-12 h-10 px-5 flex items-center"
                onClick={() => setIsOpenReviewModal(true)}
              >
                <PencilLine />
                Write a Review
              </Button>
            )} */}
          </div>
          <div className="">
            <Tabs defaultValue="information" className="w-full">
              <TabsList className="p-0 flex justify-between sm:items-center items-start sm:flex-row flex-col h-auto border-b">
                <div className="flex sm:order-1 order-2">
                  <TabsTrigger
                    value="information"
                    className="text-base font-nunito text-black data-[state=active]:text-[#00778B] data-[state=active]:border-[#00778B] border-b rounded-none border-transparent"
                  >
                    Information
                  </TabsTrigger>
                  <TabsTrigger
                    value="module"
                    className="text-base font-nunito text-black data-[state=active]:text-[#00778B] data-[state=active]:border-[#00778B] border-b rounded-none border-transparent"
                  >
                    Module
                  </TabsTrigger>
                  <TabsTrigger
                    value="feedback"
                    className="text-base font-nunito text-black data-[state=active]:text-[#00778B] data-[state=active]:border-[#00778B] border-b rounded-none border-transparent"
                  >
                    Feedback
                  </TabsTrigger>
                </div>
                <div className="w-full sm:order-2 order-1 px-5 sm:mb-0 mb-3 sm:flex block justify-end">
                  <div
                    className="flex pr-5 cursor-pointer text-black"
                    onClick={() =>
                      dispatch(
                        setPath([
                          { label: "Course Management", link: null },
                          {
                            label: "All Course",
                            link: `/${pathName}/allcourse`,
                          },
                        ])
                      )
                    }
                  >
                    <MoveLeft />
                    <span className="text-base font-semibold pl-4">Back</span>
                  </div>
                  {pathName !== "trainer" && pathName !== "trainee" && (
                    <Popover>
                      <PopoverTrigger className="flex items-center gap-5 text-base font-nunito text-black">
                        Modules Completed - 1/5 <ChevronDown width={18} />
                      </PopoverTrigger>
                      <PopoverContent className="w-[240px]">
                        <ul className="p-5">
                          <li className="flex items-center gap-4 pb-5 relative">
                            <div className="w-5 h-5 rounded-full border border-[#017285] relative">
                              <div className="w-3 h-3 rounded-full bg-[#017285] absolute top-0 bottom-0 left-0 right-0 m-auto"></div>
                            </div>
                            <div className="">
                              <h5 className="text-sm text-black font-nunito">
                                Chapter 1 - Intro
                              </h5>
                              <h6 className="text-sm text-[#606060] font-nunito">
                                Started
                              </h6>
                            </div>
                            <div className="absolute h-[40px] w-[1px] bg-[#D9D9D9] bottom-[-10px] left-[10px]"></div>
                          </li>
                          <li className="flex items-center gap-4 pb-5 relative">
                            <div className="w-5 h-5 rounded-full border border-[#D9D9D9] hover:border-[#017285] relative group">
                              <div className="w-3 h-3 rounded-full bg-white group-hover:bg-[#017285] absolute top-0 bottom-0 left-0 right-0 m-auto"></div>
                            </div>
                            <div className="">
                              <h5 className="text-sm text-black font-nunito">
                                Chapter 1 - Intro
                              </h5>
                              <h6 className="text-sm text-[#606060] font-nunito">
                                Started
                              </h6>
                            </div>
                            <div className="absolute h-[40px] w-[1px] bg-[#D9D9D9] bottom-[-10px] left-[10px]"></div>
                          </li>
                          <li className="flex items-center gap-4">
                            <div className="w-5 h-5 rounded-full border border-[#D9D9D9] hover:border-[#017285] relative group">
                              <div className="w-3 h-3 rounded-full bg-white group-hover:bg-[#017285] absolute top-0 bottom-0 left-0 right-0 m-auto"></div>
                            </div>
                            <div className="">
                              <h5 className="text-sm text-black font-nunito">
                                Chapter 1 - Intro
                              </h5>
                              <h6 className="text-sm text-[#606060] font-nunito">
                                Started
                              </h6>
                            </div>
                          </li>
                        </ul>
                      </PopoverContent>
                    </Popover>
                  )}
                </div>
              </TabsList>
              <TabsContent value="information" className="p-5">
                <Information data={course} />
              </TabsContent>
              <TabsContent value="module" className="p-5">
                <Module data={course} />
              </TabsContent>
              <TabsContent value="feedback" className="p-5">
                <Feedback />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeBasicCourse;
