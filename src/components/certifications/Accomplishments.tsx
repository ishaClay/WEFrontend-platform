import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants";
import { fetchCourseEnroll } from "@/services/apiServices/certificate";
import { useLocation, useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { chatDPColor } from "@/lib/utils";
import moment from "moment";
import { Loader2, MoveLeft } from "lucide-react";
import { useAppDispatch } from "@/hooks/use-redux";
import { setPath } from "@/redux/reducer/PathReducer";
const Accomplishments = () => {
  const params = useParams();
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const maturityLevelName = JSON.parse(localStorage.getItem("maturityLevelName") as string);  
  const localtion = useLocation();

  const { data: getEnrolledCourse, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.getenrolledcourse],
    queryFn: () => fetchCourseEnroll(String(localtion?.state) || "", userData?.query?.detailsid, params?.id || "")
  })
  const employeeData = getEnrolledCourse?.data?.employee?.[0];
  const employeeUserData = getEnrolledCourse?.data?.employee?.[0]?.userDetails;
  const startDate = getEnrolledCourse?.data?.cohortGroup?.slotStartDate;
  const endDate = getEnrolledCourse?.data?.cohortGroup?.slotEndDate;
  const sData = startDate?.month + "/" + startDate?.date + "/" + startDate?.year;
  const eData = endDate?.month + "/" + endDate?.date + "/" + endDate?.year;
  const dispatch = useAppDispatch();
  const pathName = location?.pathname?.split("/")[1];

  const handleDownload = () => {
    const pdfUrl = getEnrolledCourse?.data?.certificate?.title;
    const anchor = document.createElement("a");
    anchor.href = pdfUrl;
    anchor.download = "certificate.pdf";
    anchor.click();
  };
  return (
    <>
      <div className="bg-white flex justify-end p-7 border-b broder-[#dddddd33]">
        <Button
          variant="ghost"
          type="button"
          onClick={() =>
            dispatch(
              setPath([
                { label: "Certifications", link: `/${pathName}/certifications` },
              ])
            )
          }
          className="p-0 h-auto hover:bg-transparent text-black"
        >
          <MoveLeft /> Back
        </Button>
      </div>

      {isLoading ? <span className="flex items-center justify-center bg-white h-full">
        <Loader2 className="w-5 h-5 animate-spin" />
      </span> : getEnrolledCourse?.data ? <div className="lg:bg-white bg-transparent rounded-xl">
        <div className="grid grid-cols-9 bg-white sm:p-5 p-[15px] rounded-lg sm:gap-5 gap-[15px]">
          <div className="xl:col-span-4 col-span-9">
            <div className="flex shadow rounded-lg border border-[#dddddd33] xl:p-5 sm:p-4 p-2.5">
              <div className="sm:min-w-[100px] sm:w-[100px] sm:min-h-[100px] sm:h-[100px] min-w-[50px] min-h-[50px] w-[50px] h-[50px]">
                <Avatar className="w-full h-full">
                  <AvatarImage src={employeeData?.profileImage} />
                  <AvatarFallback className="rounded-[6px] text-[30px]" style={{ background: chatDPColor(employeeData?.[0]?.id) }}>
                    {employeeData?.[0]?.name ? employeeData?.[0]?.name?.charAt(0) : employeeUserData?.name ?
                      employeeUserData?.name?.charAt(0) : (employeeUserData?.fname || employeeUserData?.lname) ?
                        employeeUserData?.fname.charAt(0) + employeeUserData?.lname?.charAt(0) :
                        userData?.query?.email?.split("@")[0]?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="sm:pl-[15px] pl-[10px]">
                <h5 className="xl:text-lg md:text-base text-sm font-semibold font-inter leading-[22px]">
                  {employeeData?.[0]?.name ? employeeData?.[0]?.name : employeeUserData?.name ?
                    employeeUserData?.name : (employeeUserData?.fname || employeeUserData?.lname) ?
                      employeeUserData?.fname.charAt(0) + employeeUserData?.lname :
                      userData?.query?.email?.split("@")[0]}
                </h5>
                <p className="sm:text-sm text-xs font-normal font-inter leading-4 sm:pt-3 pt-[10px]">
                  {getEnrolledCourse?.data?.course?.title}
                </p>
                <div className="flex items-center sm:text-sm text-xs font-normal font-inter leading-4 sm:pt-3 pt-[10px]">
                  <p>Started : </p>
                  <span>{moment(new Date(sData)).format("DD MMM, YYYY")}</span>
                </div>
                <div className="flex items-center sm:text-sm text-xs font-normal font-inter leading-4 sm:pt-3 pt-[10px]">
                  <p>Completed : </p>
                  <span>{moment(new Date(eData)).format("DD MMM, YYYY")}</span>
                </div>
                <div className="flex items-center sm:text-sm text-xs font-normal font-inter leading-4 sm:pt-3 pt-[10px]">
                  <p>Sustainability Level : </p>
                  <span className="font-semibold ml-2">{maturityLevelName}</span>
                </div>
              </div>
            </div>

            <Button className="sm:uppercase capitalize bg-[#00778B] sm:text-base mt-10 text-sm font-normal font-calibri leading-5 py-[8px] h-auto w-auto sm:px-[19px] px-[12px]"
              onClick={handleDownload}>
              download certificate
            </Button>
          </div>
        </div>
      </div> : <span className="flex items-center justify-center bg-white h-full">No Certification Found</span>}
    </>
  );
};

export default Accomplishments;
