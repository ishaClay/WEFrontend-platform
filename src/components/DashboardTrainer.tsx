/* eslint-disable @typescript-eslint/ban-ts-comment */
import Companies from "@/assets/images/companies.svg";
import Total_courses from "@/assets/images/total_courses.svg";
import Trainers from "@/assets/images/trainers.svg";
import { useState } from "react";

// import { getTraineeDashboardData } from "@/services/apiServices/dashboard";
import FeedbackIcon from "@/assets/svgs/feedbackStar.svg";
import { QUERY_KEYS } from "@/lib/constants";
import {
  fetchCourseOverview,
  fetchEnrollmentCounts,
  fetchEnrollmentFigures,
  fetchSupportTicketsCounts,
  fetchTrainerCounts,
} from "@/services/apiServices/dashboard";
import { DashBoardCardItem, DashboardFilterType } from "@/types/common";
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
import { Loader2 } from "lucide-react";
import * as XLSX from "xlsx";
import DashboardCardWithDropdown from "./comman/DashboardCardWithDropdown";
import { DataTable } from "./comman/DataTable";
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
  const [courseFilter, setCourseFilter] =
    useState<DashboardFilterType>("today");
  const [supportTicketFilter, setSupportTicketFilter] =
    useState<DashboardFilterType>("today");
  const [trainerCountFilter, setTrainerCountFilter] =
    useState<DashboardFilterType>("today");
  const [enrollmentRequestFilter, setEnrollmentRequestFilter] =
    useState<DashboardFilterType>("today");
  const [enrollmentFiguresFilter, setEnrollmentFiguresFilter] =
    useState<DashboardFilterType>("today");

  const { data: courseOverviewData, isFetching: fetchingCourseOverview } =
    useQuery({
      queryKey: [
        QUERY_KEYS.trainerCourseOverview,
        { courseFilter, userid: userData?.query?.detailsid },
      ],
      queryFn: () =>
        fetchCourseOverview(userData?.query?.detailsid, courseFilter),
    });

  const { data: enrollmentRequestData, isFetching: fetchingEnrollmentRequest } =
    useQuery({
      queryKey: [
        QUERY_KEYS.trainerEnrollmentRequest,
        { enrollmentRequestFilter, userid: userData?.query?.detailsid },
      ],
      queryFn: () =>
        fetchEnrollmentCounts(
          userData?.query?.detailsid,
          enrollmentRequestFilter
        ),
    });

  const { data: supportTicketsData, isFetching: fetchingSupportTickets } =
    useQuery({
      queryKey: [
        QUERY_KEYS.trainerSupportTicketsDashboard,
        { supportTicketFilter, userid: userData?.query?.detailsid },
      ],
      queryFn: () =>
        fetchSupportTicketsCounts(
          userData?.query?.detailsid,
          supportTicketFilter
        ),
    });

  const { data: trainerCountData, isFetching: fetchingTrainerCount } = useQuery(
    {
      queryKey: [
        QUERY_KEYS.trainerCountDashboard,
        { trainerCountFilter, userid: userData?.query?.detailsid },
      ],
      queryFn: () =>
        fetchTrainerCounts(userData?.query?.detailsid, trainerCountFilter),
    }
  );

  const { data: enrollmentFiguresData, isFetching: fetchingEnrollmentFigures } =
    useQuery({
      queryKey: [
        QUERY_KEYS.enrollmentFiguresDashboard,
        { enrollmentFiguresFilter, userid: userData?.query?.detailsid },
      ],
      queryFn: () =>
        fetchEnrollmentFigures(
          userData?.query?.detailsid,
          enrollmentFiguresFilter
        ),
    });

  const column: ColumnDef<any>[] = [
    {
      accessorKey: "ID",
      header: () => {
        return (
          <h5 className="font-medium xl:text-sm text-xs text-black font-droid">
            #
          </h5>
        );
      },
      cell: ({ row }) => {
        return (
          <h6 className="xl:text-[15px] text-xs font-droid text-black">
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
          <h5 className="font-medium xl:text-sm text-xs text-black font-droid">
            Course Name
          </h5>
        );
      },
      cell: ({ row }) => {
        return (
          <h6 className="xl:text-sm text-xs font-droid text-[#002A3A] xl:w-[80%] w-full line-clamp-2 leading-5">
            {row.original?.course?.title}
          </h6>
        );
      },
      meta: {
        className: "py-[15px]",
      },
    },
    {
      accessorKey: "enrolled_companies",
      header: () => {
        return (
          <h5 className="font-medium xl:text-sm text-xs text-black font-droid">
            Enrolled Companies
          </h5>
        );
      },
      cell: ({ row }) => {
        return (
          <h6 className="xl:text-sm text-xs font-droid text-[#002A3A] xl:w-[80%] w-full line-clamp-2 leading-5">
            {row.original?.enrolledCompanies?.length}
          </h6>
        );
      },
      meta: {
        className: "py-[15px]",
      },
    },
    {
      accessorKey: "enrolled_employees",
      header: () => {
        return (
          <h5 className="font-medium xl:text-sm text-xs text-black font-droid">
            Enrolled Employees
          </h5>
        );
      },
      cell: ({ row }) => {
        return (
          <h6 className="text-xs font-droid text-black">
            {row.original?.enrolledEmployees?.length}
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
          <h5 className="font-medium xl:text-sm text-xs text-black font-droid">
            Course Duration
          </h5>
        );
      },
      cell: ({ row }) => {
        return (
          <h6 className="text-xs font-droid text-black">
            {row.original?.course?.duration}
          </h6>
        );
      },
      meta: {
        className: "py-[15px]",
      },
    },
  ];

  const handleExport = () => {
    const formattedData: any =
      enrollmentFiguresData?.data?.enrollmentsRequestsFigures?.map(
        (item, i) => {
          const { enrolledCompanies, ...rest } = item;
          const startDate =
            item.course.courseEnroll?.[0]?.cohortGroup?.slotStartDate;
          return {
            "#": i + 1,
            "Course Name": rest?.course?.title,
            "Enrolled Company": enrolledCompanies!
              .map((company: any) => company.name)
              .join(", "),
            "Enrolled Delegates": item.enrolledEmployees?.length || "-",
            "Start Date": startDate
              ? `${startDate?.date}/${startDate?.month}/${startDate?.year}`
              : "-",
            // moment(rest?.course?.publishDate).format("DD-MM-YYYY"),
          };
        }
      );

    // Create a new workbook and add the data
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Courses");

    // Generate buffer and download
    XLSX.writeFile(workbook, "courses_data.xlsx");
  };

  const courseOverviewItems: DashBoardCardItem[] = [
    {
      icon: Trainers,
      title: "Published courses",
      value: courseOverviewData?.data?.publishedCoursesCount || 0,
    },
    {
      icon: Trainers,
      title: "Recently updated courses",
      value: courseOverviewData?.data?.recentlyUpdatedCourse || 0,
    },
    {
      icon: FeedbackIcon,
      title: "Courses feedback",
      value: courseOverviewData?.data?.courseFeedbacksCount || 0,
    },
  ];

  const enrollmentsItems: DashBoardCardItem[] = [
    {
      icon: Total_courses,
      title: "Total",
      value: enrollmentRequestData?.data?.total || 0,
    },
    {
      icon: Companies,
      title: "Approved",
      value: enrollmentRequestData?.data?.approvalRequests || 0,
    },
    {
      icon: Companies,
      title: "Rejected",
      value: enrollmentRequestData?.data?.rejectRequests || 0,
    },
    {
      icon: Companies,
      title: "Pending",
      value: enrollmentRequestData?.data
        ? +enrollmentRequestData?.data?.pendingRequest +
          +enrollmentRequestData?.data?.enquireRequests
        : 0,
    },
  ];

  const trainerCountItems: DashBoardCardItem[] = [
    {
      icon: Companies,
      title: "Total active trainers",
      value: trainerCountData?.data?.trainersCount || 0,
    },
    {
      icon: FeedbackIcon,
      title: "Trainer feedback",
      value: trainerCountData?.data?.courseFeedBack || 0,
    },
  ];

  const supportTicketItems: DashBoardCardItem[] = [
    {
      icon: Total_courses,
      title: "Total",
      value: supportTicketsData?.data?.supportTicketsCount?.total
        ? supportTicketsData?.data?.supportTicketsCount?.total?.high +
          supportTicketsData?.data?.supportTicketsCount?.total?.low +
          supportTicketsData?.data?.supportTicketsCount?.total?.medium
        : 0,
    },
    {
      icon: Companies,
      title: "Open",
      value: supportTicketsData?.data?.supportTicketsCount?.open
        ? supportTicketsData?.data?.supportTicketsCount?.open?.high +
          supportTicketsData?.data?.supportTicketsCount?.open?.low +
          supportTicketsData?.data?.supportTicketsCount?.open?.medium
        : 0,
    },
    {
      icon: Companies,
      title: "In Progress",
      value: supportTicketsData?.data?.supportTicketsCount?.inProcess
        ? supportTicketsData?.data?.supportTicketsCount?.inProcess?.high +
          supportTicketsData?.data?.supportTicketsCount?.inProcess?.low +
          supportTicketsData?.data?.supportTicketsCount?.inProcess?.medium
        : 0,
    },
    {
      icon: Companies,
      title: "Answered",
      value: supportTicketsData?.data?.supportTicketsCount?.resolved
        ? supportTicketsData?.data?.supportTicketsCount?.resolved?.high +
          supportTicketsData?.data?.supportTicketsCount?.resolved?.low +
          supportTicketsData?.data?.supportTicketsCount?.resolved?.medium
        : 0,
    },
  ];

  return (
    <div className="rounded-xl">
      {/* <div className="mb-4 flex items-center justify-end">
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
      </div> */}
      <div className="flex items-center flex-wrap sm:flex-nowrap gap-5 mb-10">
        <div className="w-full xl:h-[297px] md:h-[277px] sm:h-[301px]">
          <h3 className="text-[22px] font-droid font-[500] mb-2">
            Course overview
          </h3>
          <DashboardCardWithDropdown
            isLoading={fetchingCourseOverview}
            value={courseFilter}
            items={courseOverviewItems}
            onChangeSelect={(e) => setCourseFilter(e)}
          />
        </div>
        <div className="w-full xl:h-[297px] md:h-[277px] sm:h-[301px]">
          <h3 className="text-[22px] font-droid font-[500] mb-2">
            Enrollments
          </h3>
          <DashboardCardWithDropdown
            isLoading={fetchingEnrollmentRequest}
            value={enrollmentRequestFilter}
            items={enrollmentsItems}
            onChangeSelect={(e) => setEnrollmentRequestFilter(e)}
            className="w-full lg:h-[calc(100%-41px)] h-[calc(100%-41px)]"
          />
        </div>
      </div>
      <div className="flex items-center flex-wrap sm:flex-nowrap gap-5 mb-10">
        <div className="w-full">
          <h3 className="text-[22px] font-droid font-[500] mb-2">Trainers</h3>
          <DashboardCardWithDropdown
            isLoading={fetchingTrainerCount}
            value={trainerCountFilter}
            items={trainerCountItems}
            onChangeSelect={(e) => setTrainerCountFilter(e)}
          />
        </div>
        <div className="w-full">
          <h3 className="text-[22px] font-droid font-[500] mb-2">
            Support tickets
          </h3>
          <DashboardCardWithDropdown
            isLoading={fetchingSupportTickets}
            value={supportTicketFilter}
            items={supportTicketItems}
            onChangeSelect={(e) => setSupportTicketFilter(e)}
            className="w-full"
          />
        </div>
      </div>

      <div className="grid xl:grid-cols-1 grid-cols-1 gap-5">
        <div className="col-span-1 bg-[#FFFFFF] rounded-xl shadow-sm">
          <div className="flex justify-between items-center px-5 py-6">
            <h5 className="  text-base font-droid font-bold">
              Course Enrollment Figures
            </h5>
            <div className="flex items-center gap-5">
              <Select
                value={enrollmentFiguresFilter}
                onValueChange={(e) =>
                  setEnrollmentFiguresFilter(e as DashboardFilterType)
                }
              >
                <SelectTrigger className="border sm:w-[264px] w-[200px] h-[42px] rounded mr-4 sm:my-0 my-3">
                  <SelectValue placeholder="Pending" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">Last Week</SelectItem>
                  <SelectItem value="month">Last Month</SelectItem>
                </SelectContent>
              </Select>
              <Button
                type="button"
                onClick={handleExport}
                className="bg-[#00778B] font-droid h-8"
                // disabled={isLoading}
              >
                Export
              </Button>
            </div>
          </div>

          <div className="">
            {fetchingEnrollmentFigures ? (
              <span className="flex justify-center py-[68px]">
                <Loader2 className="w-5 h-5 animate-spin" />
              </span>
            ) : (
              <div className="overflow-x-auto">
                <DataTable
                  columns={column}
                  data={
                    enrollmentFiguresData?.data?.enrollmentsRequestsFigures ||
                    []
                  }
                  rounded={false}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTrainer;
