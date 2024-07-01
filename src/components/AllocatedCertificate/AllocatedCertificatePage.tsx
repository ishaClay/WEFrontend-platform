import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../comman/DataTable";
import { Button } from "../ui/button";
import { useState } from "react";
import employee_Image_1 from "@/assets/images/face_1.jfif";
import employee_Image_2 from "@/assets/images/face_2.jfif";
import employee_Image_3 from "@/assets/images/face_3.jfif";
import employee_Image_4 from "@/assets/images/face_4.jfif";
import { Eye, FileSliders, Search, Trash2 } from "lucide-react";

const data = [
  {
    id: 1,
    employeeName: "Ankites Risher",
    employeeImage: employee_Image_1,
    courseName: "Certificate in the Sustainable Development Goals, Partners...",
    certificateTitle: "Course Completion Certificate 01",
    date: "01/01/2024",
    status: "Issued",
    action: "",
  },
  {
    id: 2,
    employeeName: "Liam Risher",
    employeeImage: employee_Image_2,
    courseName: "Certificate in the Sustainable Development Goals, Partners...",
    certificateTitle: "Course Completion Certificate 02",
    date: "01/01/2024",
    status: "Issued",
    action: "",
  },
  {
    id: 3,
    employeeName: "Honey Risher",
    employeeImage: employee_Image_3,
    courseName: "Certificate in the Sustainable Development Goals, Partners...",
    certificateTitle: "Course Completion Certificate 01",
    date: "01/01/2024",
    status: "Issued",
    action: "",
  },
  {
    id: 4,
    employeeName: "Oliver Noah",
    employeeImage: employee_Image_4,
    courseName: "Certificate in the Sustainable Development Goals, Partners...",
    certificateTitle: "Course Completion Certificate 02",
    date: "01/01/2024",
    status: "Issued",
    action: "",
  },
];

const AllocatedCertificatePage = () => {
  const [page, setPage] = useState(0);
  console.log("page", page);

  const column: ColumnDef<any>[] = [
    {
      accessorKey: "id",
      header: () => {
        return (
          <h5 className="font-medium 2xl:text-base text-xs text-black font-inter">
            ID
          </h5>
        );
      },
      cell: ({ row }) => {
        return (
          <h6 className="2xl:text-[15px] text-xs font-inter text-black">
            #{row.original?.id}
          </h6>
        );
      },
    },
    {
      accessorKey: "employeeName",
      header: () => {
        return (
          <h5 className="font-medium 2xl:text-base text-xs text-black font-inter">
            Employee Name
          </h5>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <img
              src={row.original?.employeeImage}
              alt="employeeImage"
              className="w-8 h-8 rounded-full"
            />
            <h6 className="2xl:text-[15px] text-xs font-inter text-black">
              {row.original?.employeeName}
            </h6>
          </div>
        );
      },
    },
    {
      accessorKey: "courseName",
      header: () => {
        return (
          <h5 className="font-medium 2xl:text-base text-xs text-black font-inter">
            Course Name
          </h5>
        );
      },
      cell: ({ row }) => {
        return (
          <h6 className="2xl:text-[15px] text-xs font-inter text-black line-clamp-2 2xl:leading-6 leading-4 2xl:w-[70%] w-full">
            {row.original?.courseName}
          </h6>
        );
      },
    },
    {
      accessorKey: "certificateTitle",
      header: () => {
        return (
          <h5 className="font-medium 2xl:text-base text-xs text-black font-inter">
            Certificate Title
          </h5>
        );
      },
      cell: ({ row }) => {
        return (
          <h6 className="2xl:text-[15px] text-xs font-inter text-black line-clamp-2">
            {row.original?.certificateTitle}
          </h6>
        );
      },
    },
    {
      accessorKey: "date",
      header: () => {
        return (
          <h5 className="font-medium 2xl:text-base text-xs text-black font-inter">
            Date
          </h5>
        );
      },
      cell: ({ row }) => {
        return (
          <h6 className="2xl:text-[15px] text-xs font-inter text-black line-clamp-2">
            {row.original?.date}
          </h6>
        );
      },
    },
    {
      accessorKey: "status",
      header: () => {
        return (
          <h5 className="font-medium 2xl:text-base text-xs text-black font-inter">
            Status
          </h5>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="">
            <Button className="bg-[#58BA66] px-4 2xl:h-8 h-7 2xl:text-sm text-xs">
              {row.original?.status}
            </Button>
            <Button className="bg-[#FFA25E] px-4 2xl:h-8 h-7 2xl:text-sm text-xs hidden">
              Pending
            </Button>
          </div>
        );
      },
    },
    {
      accessorKey: "action",
      header: () => {
        return (
          <h5 className="font-medium 2xl:text-base text-xs text-black font-inter">
            Action
          </h5>
        );
      },
      cell: () => {
        return (
          <div className="flex items-center">
            <Trash2 className="cursor-pointer text-[#A3A3A3]" width={18} />
            <Eye className="mx-2 cursor-pointer text-[#A3A3A3]" width={18} />
            <FileSliders className="cursor-pointer text-[#A3A3A3]" width={18} />
          </div>
        );
      },
    },
  ];

  return (
    <div className="bg-white rounded-lg">
      <div className="flex justify-between items-center border-b border-[#D9D9D9] p-4">
        <div>
          <h3 className="text-[16px] font-[700] font-nunito mb-1">
            Issued Certificates
          </h3>
          <p className="text-[#606060] text-[15px]">All the certificates awarded to trainees so far</p>
        </div>
        <div className="">
          <Button className="uppercase px-5 py-2 bg-[#00778B] xl:text-base text-sm text-white font-nunito">
            ISSUE A Certificate
          </Button>
        </div>
      </div>

      <div className="p-5">
        <div className="border border-[#D9D9D9] flex items-center 2xl:w-[550px] w-[450px] px-4 2xl:py-3 py-2 rounded-lg">
          <Search className="text-[#A3A3A3]" width={18} />
          <input
            className="outline-none text-[15px] text-[#A3A3A3] font-inter px-3"
            placeholder="Search by name, course name, certificate name, etc."
          ></input>
        </div>
      </div>

      <div className="">
        <DataTable
          columns={column}
          data={data}
          totalPages={data?.length}
          setPage={setPage}
          pagination={{ pageIndex: page, pageSize: 10 }}
          rounded={false}
        />
      </div>
    </div>
  );
};

export default AllocatedCertificatePage;
