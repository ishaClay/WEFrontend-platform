/* eslint-disable @typescript-eslint/ban-ts-comment */
import Companies from "@/assets/images/companies.svg";
import Total_courses from "@/assets/images/total_courses.svg";
import Trainers from "@/assets/images/trainers.svg";
import { useState } from "react";

// import { getTraineeDashboardData } from "@/services/apiServices/dashboard";
import { getTrainerData } from "@/services/apiServices/dashboard";
import { TrainerEnrollDashboardResponse } from "@/types/dashboard";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import {
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  TimeScale,
  Title,
  Tooltip,
} from "chart.js";
import * as XLSX from "xlsx";
import { DataTable } from "./comman/DataTable";
import Loading from "./comman/Error/Loading";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  TimeScale,
  Legend,
  Tooltip
);

const DashboardTrainer = () => {
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const [contentType, setContentType] = useState("today");

  const {
    data: smeDashboardData,
    isLoading,
    isRefetching,
  } = useQuery<TrainerEnrollDashboardResponse>({
    queryKey: ["getTrainerDashboardData", { contentType }],
    queryFn: () =>
      getTrainerData({
        userId: userData?.query?.detailsid,
        contentType: contentType,
      }),
  });

  const column: ColumnDef<any>[] = [
    {
      accessorKey: "ID",
      header: () => {
        return (
          <h5 className="font-medium xl:text-sm text-xs text-black font-inter">
            ID
          </h5>
        );
      },
      cell: ({ row }) => {
        return (
          <h6 className="xl:text-[15px] text-xs font-inter text-black">
            {row.index + 1}
          </h6>
        );
      },
      meta: {
        className: "py-[15px]",
      },
    },
    {
      accessorKey: "CourseName",
      header: () => {
        return (
          <h5 className="font-medium xl:text-sm text-xs text-black font-inter">
            Course Name
          </h5>
        );
      },
      cell: ({ row }) => {
        return (
          <h6 className="xl:text-sm text-xs font-inter text-[#002A3A] xl:w-[80%] w-full line-clamp-2 leading-5">
            {row.original?.course?.title}
          </h6>
        );
      },
      meta: {
        className: "py-[15px]",
      },
    },
    {
      accessorKey: "CourseName",
      header: () => {
        return (
          <h5 className="font-medium xl:text-sm text-xs text-black font-inter">
            Enroll Company
          </h5>
        );
      },
      cell: ({ row }) => {
        return (
          <h6 className="xl:text-sm text-xs font-inter text-[#002A3A] xl:w-[80%] w-full line-clamp-2 leading-5">
            {row.original?.enrolledCompanies?.length}
          </h6>
        );
      },
      meta: {
        className: "py-[15px]",
      },
    },
    {
      accessorKey: "duration",
      header: () => {
        return (
          <h5 className="font-medium xl:text-sm text-xs text-black font-inter">
            Course Duration
          </h5>
        );
      },
      cell: ({ row }) => {
        return (
          <h6 className="text-xs font-inter text-black">
            {row.original?.course?.duration}
          </h6>
        );
      },
      meta: {
        className: "py-[15px]",
      },
    },
    {
      accessorKey: "status",
      header: () => {
        return (
          <h5 className="font-medium xl:text-sm text-xs text-black font-inter">
            Status
          </h5>
        );
      },
      cell: ({ row }) => {
        return (
          <h6 className="text-xs font-inter text-black">
            {row.original?.course?.status}
          </h6>
        );
      },
      meta: {
        className: "py-[15px]",
      },
    },
  ];

  console.log("smeDashboardData", smeDashboardData);

  const [activeButton, setActiveButton] = useState(null);
  console.log(activeButton);
  const handleClick = (buttonName: any) => {
    setActiveButton(buttonName);
  };

  const openSupportTicket =
    smeDashboardData?.data?.supportTicketsCount?.open &&
    Object.values(smeDashboardData?.data?.supportTicketsCount?.open).reduce(
      // @ts-ignore
      (a: number, b: number) => a + b,
      0
    );

  const resolveSupportTicket =
    smeDashboardData?.data?.supportTicketsCount?.resolved &&
    Object.values(smeDashboardData?.data?.supportTicketsCount?.resolved).reduce(
      // @ts-ignore
      (a: number, b: number) => a + b,
      0
    );

  const handleExport = () => {
    const formattedData: any =
      smeDashboardData?.data?.enrollmentsRequestsFigures?.map((item: any) => {
        const { enrolledCompanies, ...rest } = item;
        return {
          ...rest?.course,
          EnrolledCompanies: enrolledCompanies!
            .map((company: any) => company.name)
            .join(", "),
        };
      });

    // Create a new workbook and add the data
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Courses");

    // Generate buffer and download
    XLSX.writeFile(workbook, "courses_data.xlsx");
  };

  return (
    <div className="rounded-xl">
      <div className="mb-4 flex items-center justify-end">
        <Select value={contentType} onValueChange={(e) => setContentType(e)}>
          <SelectTrigger className="border sm:w-[264px] w-[200px] h-[42px] rounded mr-4 sm:my-0 my-3">
            <SelectValue placeholder="Pending" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="lastWeek">Last Week</SelectItem>
            <SelectItem value="lastMonth">Last Month</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5 mb-10">
        <button
          className="col-span-1 xl:p-5 p-3 bg-[#FFFFFF] rounded-xl"
          onClick={() => handleClick("companies")}
        >
          <div className="bg-[#F5F7FF] w-[74px] h-[74px] rounded-full flex items-center justify-center mx-auto xl:mb-3 mb-2">
            <img src={Trainers} alt="" />
          </div>
          <h2 className="xl:pb-2.5 pb-1 xl:text-[32px] text-2xl xl:leading-10 leading-8 font-bold">
            {smeDashboardData?.data?.publishedCoursesCount}
          </h2>
          <p className="text-base text-black font-calibri">
            Total Publish Course
          </p>
        </button>

        <button
          className="col-span-1 xl:p-5 p-3 bg-[#FFFFFF] rounded-xl"
          onClick={() => handleClick("companies")}
        >
          <div className="bg-[#F5F7FF] w-[74px] h-[74px] rounded-full flex items-center justify-center mx-auto xl:mb-3 mb-2">
            <img src={Total_courses} alt="" />
          </div>
          <h2 className="xl:pb-2.5 pb-1 xl:text-[32px] text-2xl xl:leading-10 leading-8 font-bold">
            {smeDashboardData?.data?.trainingProviderEnrollmentRequests}
          </h2>
          <p className="text-base text-black font-calibri">
            Total Enrollment Request
          </p>
        </button>

        <button
          className="col-span-1 xl:p-5 p-3 bg-[#FFFFFF] rounded-xl"
          onClick={() => handleClick("companies")}
        >
          <div className="bg-[#F5F7FF] w-[74px] h-[74px] rounded-full flex items-center justify-center mx-auto xl:mb-3 mb-2">
            <img src={Companies} alt="" />
          </div>
          <h2 className="xl:pb-2.5 pb-1 xl:text-[32px] text-2xl xl:leading-10 leading-8 font-bold">
            {smeDashboardData?.data?.pendingEnrollmentRequestsCount}
          </h2>
          <p className="text-base text-black font-calibri">
            Total Approve Enrollment
          </p>
        </button>
        <button
          className="col-span-1 xl:p-5 p-3 bg-[#FFFFFF] rounded-xl"
          onClick={() => handleClick("companies")}
        >
          <div className="bg-[#F5F7FF] w-[74px] h-[74px] rounded-full flex items-center justify-center mx-auto xl:mb-3 mb-2">
            <img src={Companies} alt="" />
          </div>
          <h2 className="xl:pb-2.5 pb-1 xl:text-[32px] text-2xl xl:leading-10 leading-8 font-bold">
            {smeDashboardData?.data?.trainersCount}
          </h2>
          <p className="text-base text-black font-calibri">
            Total Active Trainers
          </p>
        </button>
      </div>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 mb-10">
        <button
          className="col-span-1 xl:p-5 p-3 bg-[#FFFFFF] rounded-xl"
          onClick={() => handleClick("companies")}
        >
          <div className="bg-[#F5F7FF] w-[74px] h-[74px] rounded-full flex items-center justify-center mx-auto xl:mb-3 mb-2">
            <img src={Trainers} alt="" />
          </div>
          <h2 className="xl:pb-2.5 pb-1 xl:text-[32px] text-2xl xl:leading-10 leading-8 font-bold">
            {smeDashboardData?.data?.courseContentApprovalRequest}
          </h2>
          <p className="text-base text-black font-calibri">
            Total Recent Update Course
          </p>
        </button>

        <button
          className="col-span-1 xl:p-5 p-3 bg-[#FFFFFF] rounded-xl"
          onClick={() => handleClick("companies")}
        >
          <div className="bg-[#F5F7FF] w-[74px] h-[74px] rounded-full flex items-center justify-center mx-auto xl:mb-3 mb-2">
            <img src={Total_courses} alt="" />
          </div>
          <h2 className="xl:pb-2.5 pb-1 xl:text-[32px] text-2xl xl:leading-10 leading-8 font-bold">
            {smeDashboardData?.data?.trainerCompanyFeedbacksCount?.toFixed(2)}
          </h2>
          <p className="text-base text-black font-calibri">Trainer Feedback</p>
        </button>

        <button
          className="col-span-1 xl:p-5 p-3 bg-[#FFFFFF] rounded-xl"
          onClick={() => handleClick("companies")}
        >
          <div className="bg-[#F5F7FF] w-[74px] h-[74px] rounded-full flex items-center justify-center mx-auto xl:mb-3 mb-2">
            <img src={Companies} alt="" />
          </div>
          <h2 className="xl:pb-2.5 pb-1 xl:text-[32px] text-2xl xl:leading-10 leading-8 font-bold">
            {smeDashboardData?.data?.courseFeedbacksCount?.toFixed(2)}
          </h2>
          <p className="text-base text-black font-calibri">Course Feedback</p>
        </button>
      </div>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 mb-10">
        <button
          className="col-span-1 xl:p-5 p-3 bg-[#FFFFFF] rounded-xl"
          onClick={() => handleClick("companies")}
        >
          <div className="bg-[#F5F7FF] w-[74px] h-[74px] rounded-full flex items-center justify-center mx-auto xl:mb-3 mb-2">
            <img src={Trainers} alt="" />
          </div>
          <h2 className="xl:pb-2.5 pb-1 xl:text-[32px] text-2xl xl:leading-10 leading-8 font-bold">
            {openSupportTicket + resolveSupportTicket}
          </h2>
          <p className="text-base text-black font-calibri">
            Total Support Ticket
          </p>
        </button>

        <button
          className="col-span-1 xl:p-5 p-3 bg-[#FFFFFF] rounded-xl"
          onClick={() => handleClick("companies")}
        >
          <div className="bg-[#F5F7FF] w-[74px] h-[74px] rounded-full flex items-center justify-center mx-auto xl:mb-3 mb-2">
            <img src={Total_courses} alt="" />
          </div>
          <h2 className="xl:pb-2.5 pb-1 xl:text-[32px] text-2xl xl:leading-10 leading-8 font-bold">
            {openSupportTicket}
          </h2>
          <p className="text-base text-black font-calibri">
            Total Open Support Ticket
          </p>
        </button>

        <button
          className="col-span-1 xl:p-5 p-3 bg-[#FFFFFF] rounded-xl"
          onClick={() => handleClick("companies")}
        >
          <div className="bg-[#F5F7FF] w-[74px] h-[74px] rounded-full flex items-center justify-center mx-auto xl:mb-3 mb-2">
            <img src={Companies} alt="" />
          </div>
          <h2 className="xl:pb-2.5 pb-1 xl:text-[32px] text-2xl xl:leading-10 leading-8 font-bold">
            {resolveSupportTicket}
          </h2>
          <p className="text-base text-black font-calibri">
            Total Resolve Support Ticket
          </p>
        </button>
      </div>
      <div className="grid xl:grid-cols-1 grid-cols-1 gap-5">
        <div className="col-span-1 bg-[#FFFFFF] rounded-xl shadow-sm">
          <div className="flex justify-between items-center px-5 py-6">
            <h5 className="  text-base font-nunito font-bold">
              Enrollments Requests Figures
            </h5>
            <Button
              type="button"
              onClick={handleExport}
              className="text-[#00778B] bg-transparent font-nunito hover:bg-transparent p-0 h-6"
            >
              Export
            </Button>
          </div>

          <div className="">
            <div className="overflow-x-auto">
              <DataTable
                columns={column}
                data={smeDashboardData?.data?.enrollmentsRequestsFigures || []}
                rounded={false}
              />
            </div>
          </div>
        </div>
      </div>
      <Loading isLoading={isLoading || isRefetching} />
    </div>
  );
};

export default DashboardTrainer;
