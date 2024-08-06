import { useAppDispatch } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { setPath } from "@/redux/reducer/PathReducer";
import { fetchCourseAllCourse } from "@/services/apiServices/courseManagement";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import SelectMenu from "../comman/SelectMenu";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

const selectTraineeOption = [
  {
    label: "Select Trainee 1",
    value: "Select_Trainee_1",
  },
  {
    label: "Select Trainee 2",
    value: "Select_Trainee_2",
  },
  {
    label: "Select Trainee 3",
    value: "Select_Trainee_3",
  },
];
const AllocatedCertificateEmployeePage = () => {
  const Role = location.pathname.split("/")[1];
  const dispatch = useAppDispatch();
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const [selectCourse, setSelectCourse] = useState("");
  const [selectTrainee, setSelectTrainee] = useState("");
  const { data: fetchCourseAllCourseData } = useQuery({
    queryKey: [QUERY_KEYS.fetchAllCourse, { UserId: userData?.query?.id }],
    queryFn: () => fetchCourseAllCourse("", +userData?.query?.id, "PUBLISHED"),
    enabled: !!userData?.query?.id,
  });

  const courseOptions = fetchCourseAllCourseData?.data?.map((item) => {
    return {
      label: item?.title,
      value: item?.id?.toString(),
    };
  });

  const selectedCertificate = fetchCourseAllCourseData?.data?.find(
    (item) => item?.id?.toString() === selectCourse
  );

  console.log("selectedCertificate", selectedCertificate);

  return (
    <div className="bg-white">
      <div className="flex justify-between items-center border-b border-[#D9D9D9] p-4">
        <div className="">
          <h6 className="font-calibri text-base font-bold">
            Allocated Certificate
          </h6>
        </div>
        <div className="">
          <button
            onClick={() => {
              dispatch(
                setPath([
                  {
                    label: "Allocate Certificate",
                    link: `/${Role}/allocated-certificate`,
                  },
                ])
              );
            }}
            className="text-[16px] flex font-semibold items-center gap-[15px]"
          >
            <HiOutlineArrowNarrowLeft />
            Back
          </button>
        </div>
      </div>
      <div className="p-5">
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-8 ">
            {selectCourse && selectedCertificate ? (
              <div className="2xl:flex block gap-[30px]">
                <div className="relative 2xl:sticky static top-0 sm:min-h-[501px] min-h-[350px] h-full 2xl:max-w-[calc(100vw-391px)] max-w-full w-full 2xl:mb-0 mb-6">
                  <div className="h-full w-full">
                    <div className="flex justify-center">
                      <img
                        src={selectedCertificate?.certificate?.backgroundImage}
                        className="object-cover bg-transparent w-full max-h-[700px] h-full"
                        alt="Logo"
                      />
                    </div>
                    <div className="absolute top-1/2 -translate-y-1/2 w-full 2xl:px-20 xl:px-8 md:px-5 px-3">
                      <h4
                        className={`xl:text-[70px] md:text-[50px] sm:text-[38px] text-[28px] text-center font-semibold xl:pb-2 pb-0`}
                        style={{
                          color: selectedCertificate?.certificate?.primaryColor,
                          fontFamily:
                            selectedCertificate?.certificate?.primaryFont,
                        }}
                      >
                        {selectedCertificate?.certificate?.cretificateText}
                      </h4>
                      <div className="w-full text-center ">
                        <div
                          className="xl:pb-3 pb-1 xl:text-[30px] md:text-[26px] sm:text-[20px] text-base font-medium"
                          style={{
                            fontFamily:
                              selectedCertificate?.certificate?.secondaryFont,
                          }}
                        >
                          <h1 className="mb-2">OF PARTICIPATION</h1>
                          <h1>{selectedCertificate?.certificate?.title}</h1>
                        </div>

                        <div>
                          <h1
                            className={`!font-${selectedCertificate?.certificate?.primaryFont} font-medium lg:mt-[25px] md:mt-[10px] sm:mt-[8px] mt-[4px] xl:text-6xl md:text-5xl sm:text-3xl text-2xl`}
                            style={{
                              color:
                                selectedCertificate?.certificate?.primaryColor,
                              fontFamily:
                                selectedCertificate?.certificate?.primaryFont,
                            }}
                          >
                            Employe Name
                          </h1>
                          <div className="flex items-center justify-center md:mt-4 sm:mt-3 mt-1">
                            <span
                              className={`block w-2 h-2 rounded-full`}
                              style={{
                                backgroundColor:
                                  selectedCertificate?.certificate
                                    ?.primaryColor,
                              }}
                            ></span>
                            <div
                              className={`h-[2px] xl:max-w-[500px] md:max-w-[400px] sm:max-w-[280px] max-w-[220px] w-full`}
                              style={{
                                backgroundColor:
                                  selectedCertificate?.certificate
                                    ?.primaryColor,
                              }}
                            ></div>
                            <span
                              className={`block w-2 h-2 rounded-full`}
                              style={{
                                backgroundColor:
                                  selectedCertificate?.certificate
                                    ?.primaryColor,
                              }}
                            ></span>
                          </div>
                        </div>
                        <div className="sm:mt-5 mt-3">
                          <p
                            className={`xl:text-[24px] sm:text-[20px] text-base !font-${selectedCertificate?.certificate?.secondaryFont} tracking-tight max-w-[550px] w-full m-auto xl:leading-8 sm:leading-6 leading-5 line-clamp-2`}
                            style={{
                              fontFamily:
                                selectedCertificate?.certificate?.secondaryFont,
                            }}
                          >
                            {selectedCertificate?.certificate?.bodyText}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 justify-between">
                          <div className="flex items-end justify-between md:pt-3 pt-1 md:pr-6 pr-3">
                            <div>
                              <div className="">
                                {selectedCertificate?.certificate
                                  ?.administratorSignature ? (
                                  <img
                                    src={
                                      selectedCertificate?.certificate
                                        ?.administratorSignature
                                    }
                                    alt="logo"
                                    className="max-w-[120px] w-full min-h-[80px] max-h-[80px] m-auto h-full object-contain"
                                  />
                                ) : (
                                  <div className="max-w-[100px] w-full md:min-h-[80px] min-h-[50px] md:max-h-[80px] max-h-[50px] mx-auto h-full"></div>
                                )}
                              </div>
                              <div
                                className="border-t font-nunito font-medium xl:text-lg sm:text-base text-sm pt-2"
                                style={{
                                  borderColor:
                                    selectedCertificate?.certificate
                                      ?.primaryColor,
                                }}
                              >
                                <h2>
                                  {
                                    selectedCertificate?.certificate
                                      ?.administratorTitle
                                  }
                                </h2>
                                <h2>Head Of Marketing</h2>
                              </div>
                            </div>
                            {selectedCertificate?.certificate?.companyLogo && (
                              <div className="">
                                <img
                                  src={
                                    selectedCertificate?.certificate
                                      ?.companyLogo
                                  }
                                  className="md:w-full w-[80px]"
                                />
                              </div>
                            )}
                          </div>
                          <div className="flex items-end justify-between md:pt-3 pt-1 md:pl-6 pl-3">
                            <div className=" md:w-[100px] md:h-[100px] w-[60px] h-[60px] overflow-hidden">
                              {
                                <img
                                  src={
                                    selectedCertificate?.certificate
                                      ?.companyLogo1
                                  }
                                  alt="logo"
                                  className="max-w-[100px] md:w-full w-[80px] min-h-[50px] md:max-h-[100px] max-h-[50px] h-full object-contain"
                                />
                              }
                            </div>
                            <div>
                              <div className="overflow-hidden">
                                {selectedCertificate?.certificate
                                  ?.instructorSignature ? (
                                  <img
                                    src={
                                      selectedCertificate?.certificate
                                        ?.instructorSignature
                                    }
                                    alt="logo"
                                    className="max-w-[100px] w-full min-h-[80px] max-h-[80px] m-auto h-full"
                                  />
                                ) : (
                                  <div className="max-w-[100px] w-full md:min-h-[80px] min-h-[50px] md:max-h-[80px] max-h-[50px] mx-auto h-full"></div>
                                )}
                              </div>
                              {selectedCertificate?.certificate
                                ?.instructorTitle && (
                                <div
                                  className="border-t font-nunito font-medium xl:text-lg sm:text-base text-sm pt-2"
                                  style={{
                                    borderColor:
                                      selectedCertificate?.certificate
                                        ?.primaryColor,
                                  }}
                                >
                                  <h2>
                                    {
                                      selectedCertificate?.certificate
                                        ?.instructorTitle
                                    }
                                  </h2>
                                  <h2>Head Of Marketing</h2>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="flex items-center justify-center h-[200px] font-medium">
                Select Course
              </p>
            )}
          </div>
          <div className="col-span-4">
            <div className="border border-[#D9D9D9] rounded-lg mb-5">
              <div className="xl:p-4 p-2 border-b border-[#D9D9D9]">
                <h5 className="text-base font-bold font-calibri">
                  Trainee Details
                </h5>
              </div>
              <div className="xl:p-5 p-3">
                <div className="pb-3 flex flex-col gap-2">
                  <Label className="text-base text-[#515151] font-normal font-calibri">
                    Course Name
                  </Label>
                  <SelectMenu
                    option={courseOptions || []}
                    setValue={(data: string) => setSelectCourse(data)}
                    value={selectCourse}
                    className="text-[#A3A3A3] text-base font-calibri"
                    placeholder="Select Course"
                    containClassName="max-w-[476px]"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label className="text-base text-[#515151] font-normal font-calibri">
                    Select Trainee
                  </Label>
                  <SelectMenu
                    option={selectTraineeOption}
                    setValue={(data: string) => setSelectTrainee(data)}
                    value={selectTrainee}
                    className="text-[#A3A3A3] text-base font-calibri"
                    placeholder="Select Trainee"
                  />
                </div>
              </div>
            </div>
            <div className="border border-[#D9D9D9] rounded-lg mb-5">
              <div className="xl:p-4 p-2 border-b border-[#D9D9D9]">
                <h5 className="text-base font-bold font-calibri">Body</h5>
              </div>
              <div className="xl:p-5 p-3 border border-[#D9D9D9] xl:mx-4 mx-2 xl:my-3 my-2 rounded-lg">
                <Textarea
                  className="text-base text-[#A3A3A3] font-calibri line-clamp-4"
                  rows={5}
                >
                  Desription..
                </Textarea>
              </div>
            </div>
            <div className="">
              <Button className="uppercase w-full xl:h-14 h-11 xl:text-base text-sm font-nunito bg-[#58BA66] rounded-lg">
                issue certificate
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllocatedCertificateEmployeePage;
