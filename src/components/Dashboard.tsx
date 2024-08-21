import Companies from "@/assets/images/companies.svg";
import Total_courses from "@/assets/images/total_courses.svg";
import Trainers from "@/assets/images/trainers.svg";
import { useState } from "react";
import { Bar, Line } from "react-chartjs-2";

import { DataTable } from "@/components/comman/DataTable";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/use-redux";
import {
  getFirstInfirgraphicChart,
  getSmeDashboardData,
} from "@/services/apiServices/dashboard";
import { AssesmentDashboardData, DashboardData } from "@/types/dashboard";
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

const employeeData = [
  {
    ID: 1,
    CourseName:
      "Greening the emerald isle: Ireland's journey to carbon neutrality",
    Category: "Economics",
    Level: "Intermediate ",
    Rating: "5/5 ",
  },
  {
    ID: 2,
    CourseName:
      "Greening the emerald isle: Ireland's journey to carbon neutrality",
    Category: "Economics",
    Level: "Intermediate ",
    Rating: "5/5 ",
  },
  {
    ID: 3,
    CourseName:
      "Greening the emerald isle: Ireland's journey to carbon neutrality",
    Category: "Economics",
    Level: "Intermediate ",
    Rating: "5/5 ",
  },
  {
    ID: 4,
    CourseName:
      "Greening the emerald isle: Ireland's journey to carbon neutrality",
    Category: "Economics",
    Level: "Intermediate ",
    Rating: "5/5 ",
  },
  {
    ID: 5,
    CourseName:
      "Greening the emerald isle: Ireland's journey to carbon neutrality",
    Category: "Economics",
    Level: "Intermediate ",
    Rating: "5/5 ",
  },
];

const Dashboard = () => {
  const [page, setPage] = useState(0);
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const { clientId } = useAppSelector((state) => state.user);
  console.log("+++", page);
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
            {row.original?.ID}
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
            {row.original?.CourseName}
          </h6>
        );
      },
      meta: {
        className: "py-[15px]",
      },
    },
    {
      accessorKey: "Category",
      header: () => {
        return (
          <h5 className="font-medium xl:text-sm text-xs text-black font-inter">
            Category
          </h5>
        );
      },
      cell: ({ row }) => {
        return (
          <h6 className="text-xs font-inter text-black">
            {row.original?.Category}
          </h6>
        );
      },
      meta: {
        className: "py-[15px]",
      },
    },
    {
      accessorKey: "Level",
      header: () => {
        return (
          <h5 className="font-medium xl:text-sm text-xs text-black font-inter">
            Level
          </h5>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="flex items-center">
            <div className="w-3.5 h-3.5 bg-[#FFD56A] rounded-sm me-2"></div>
            <h6 className="text-xs font-inter text-black">
              {row.original?.Level}
            </h6>
          </div>
        );
      },
      meta: {
        className: "py-[15px]",
      },
    },
    {
      accessorKey: "Rating",
      header: () => {
        return (
          <h5 className="font-medium xl:text-sm text-xs text-black font-inter">
            Rating
          </h5>
        );
      },
      cell: ({ row }) => {
        return (
          <h6 className="text-xs font-inter text-black">
            {row.original?.Rating}
          </h6>
        );
      },
      meta: {
        className: "py-[15px]",
      },
    },
  ];

  const { data: firstInfirgraphicChart } = useQuery<AssesmentDashboardData>({
    queryKey: ["getFirstInfirgraphicChart"],
    queryFn: () =>
      getFirstInfirgraphicChart({
        userId: userData?.query?.id,
        clientId: clientId,
      }),
  });

  const { data: smeDashboardData } = useQuery<DashboardData>({
    queryKey: ["getSmeDashboardData"],
    queryFn: () => getSmeDashboardData({ userId: userData?.query?.detailsid }),
  });

  console.log("firstInfirgraphicChart", {
    smeDashboardData,
    firstInfirgraphicChart,
  });

  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        data: [50, 25, 37, 50, 15, 75, 90, 60, 30, 40, 50, 20],
        fill: false,
        borderColor: "rgba(14, 156, 255, 1)",
        tension: 0.1,
      },
    ],
  };
  const config: any = {
    type: "line",
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
      },

      layout: {
        padding: {
          top: 20,
          bottom: 0,
        },
      },
      scales: {
        y: {
          suggestedMin: 0,
          suggestedMax: 100,
          ticks: {
            stepSize: 25,
          },
        },
      },
    },
  };

  //secont bar graph

  const data1 = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "My First Dataset",
        data: [50, 25, 37, 50, 15, 75, 90, 60, 30, 20, 60, 30],
        backgroundColor: [
          "#0263FF",
          "#FF7723",
          "#8E30FF",

          "#A446AA",
          "#A98D46",
          "#7884FE",
          "#96E6E3",
          "#5EA9D6",
          "#4B16FF",
        ],
        borderColor: [
          "#0263FF",
          "#FF7723",
          "#8E30FF",
          "#A446AA",
          "#A98D46",
          "#7884FE",
          "#96E6E3",
          "#5EA9D6",
          "#4B16FF",
        ],
        borderWidth: 1,
      },
    ],
  };

  const config1 = {
    type: "bar",
    data: data1,
    options: {
      scales: {
        y: {
          suggestedMin: 0,
          suggestedMax: 100,
          ticks: {
            stepSize: 25,
          },
        },
      },
    },
  };

  const [activeButton, setActiveButton] = useState(null);
  console.log(activeButton);
  const handleClick = (buttonName: any) => {
    setActiveButton(buttonName);
  };
  return (
    <div className="rounded-xl">
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5 mb-10">
        <button
          className="col-span-1 xl:p-5 p-3 bg-[#FFFFFF] rounded-xl"
          onClick={() => handleClick("companies")}
        >
          <div className="bg-[#F5F7FF] w-[74px] h-[74px] rounded-full flex items-center justify-center mx-auto xl:mb-3 mb-2">
            <img src={Trainers} alt="" />
          </div>
          <h2 className="xl:pb-2.5 pb-1 xl:text-[32px] text-2xl xl:leading-10 leading-8 font-bold">
            {firstInfirgraphicChart?.data?.avTotalpoints}/
            {firstInfirgraphicChart?.data?.avTotalmaxpoint}
          </h2>
          <p className="text-base text-black font-calibri">Total Point</p>
        </button>

        <button
          className="col-span-1 xl:p-5 p-3 bg-[#FFFFFF] rounded-xl"
          onClick={() => handleClick("companies")}
        >
          <div className="bg-[#F5F7FF] w-[74px] h-[74px] rounded-full flex items-center justify-center mx-auto xl:mb-3 mb-2">
            <img src={Total_courses} alt="" />
          </div>
          <h2 className="xl:pb-2.5 pb-1 xl:text-[32px] text-2xl xl:leading-10 leading-8 font-bold">
            {firstInfirgraphicChart?.data?.avTotalquestionsattempted}/
            {firstInfirgraphicChart?.data?.avTotalquestionsavailable}
          </h2>
          <p className="text-base text-black font-calibri">Total Quesion</p>
        </button>

        <button
          className="col-span-1 xl:p-5 p-3 bg-[#FFFFFF] rounded-xl"
          onClick={() => handleClick("companies")}
        >
          <div className="bg-[#F5F7FF] w-[74px] h-[74px] rounded-full flex items-center justify-center mx-auto xl:mb-3 mb-2">
            <img src={Companies} alt="" />
          </div>
          <h2 className="xl:pb-2.5 pb-1 xl:text-[32px] text-2xl xl:leading-10 leading-8 font-bold">
            {smeDashboardData?.data?.upcomingCourses}
          </h2>
          <p className="text-base text-black font-calibri">Upcoming Courses</p>
        </button>
        <button
          className="col-span-1 xl:p-5 p-3 bg-[#FFFFFF] rounded-xl"
          onClick={() => handleClick("companies")}
        >
          <div className="bg-[#F5F7FF] w-[74px] h-[74px] rounded-full flex items-center justify-center mx-auto xl:mb-3 mb-2">
            <img src={Companies} alt="" />
          </div>
          <h2 className="xl:pb-2.5 pb-1 xl:text-[32px] text-2xl xl:leading-10 leading-8 font-bold">
            30
          </h2>
          <p className="text-base text-black font-calibri">Completed Courses</p>
        </button>
      </div>

      <div className="mb-10 bg-[#FFFFFF] rounded-lg shadow-sm">
        <div className="flex w-full">
          <div className=" w-full  m-4 bg-[#FFFFFF]">
            <div className="sm:flex block justify-between items-center">
              <h5 className="text-base font-nunito font-bold sm:pb-0 pb-3">
                Course Completion Trend
              </h5>
              <Button className="font-nunito font-semibold px-4 text-white bg-[#00778B] uppercase xl:h-12 h-10 xl:text-base text-sm">
                Export Report
              </Button>
            </div>

            <div className="">
              <Line className="!h-auto" data={data} options={config.options} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid xl:grid-cols-2 grid-cols-1 gap-5">
        <div className="col-span-1 bg-[#FFFFFF] rounded-xl shadow-sm">
          <div className="pt-6 px-4 pb-4">
            <div className="sm:flex block justify-between items-center">
              <h5 className="text-base font-nunito font-bold sm:pb-0 pb-3">
                Course Enrollment Trends Over Time
              </h5>
              <Button className="font-nunito font-semibold px-4 text-white bg-[#00778B] uppercase xl:h-12 h-10 xl:text-base text-sm">
                Export Report
              </Button>
            </div>

            <div className=" mt-[20px] ">
              <Bar data={data1} options={config1.options} />
            </div>
          </div>
        </div>
        <div className="col-span-1 bg-[#FFFFFF] rounded-xl shadow-sm">
          <div className="flex justify-between items-center px-5 py-6">
            <h5 className="  text-base font-nunito font-bold">Top 5 Courses</h5>
            <Button className="text-[#00778B] bg-transparent font-nunito hover:bg-transparent p-0 h-6">
              View All
            </Button>
          </div>

          <div className="">
            <div className="overflow-x-auto">
              <DataTable
                columns={column}
                data={employeeData}
                totalPages={employeeData?.length}
                setPage={setPage}
                rounded={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
