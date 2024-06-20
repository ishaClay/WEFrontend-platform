import { DataTable } from "@/components/comman/DataTable";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Search } from "lucide-react";
import { useState } from "react";

const data = [
  {
    id: 1,
    lastUpdated: "22/05/2024",
    requestor: "Danila Raffel",
    subject: "How to customize the template?",
    status: "Open",
    assignTo: "Emilla",
  },
  {
    id: 2,
    lastUpdated: "22/05/2024",
    requestor: "Emila Wastson",
    subject: "How to customize the template?",
    status: "Open",
    assignTo: "Emilla",
  },
  {
    id: 3,
    lastUpdated: "22/05/2024",
    requestor: "Joseph Richard",
    subject: "How to set Horizontal nav",
    status: "Open",
    assignTo: "Emilla",
  },
  {
    id: 4,
    lastUpdated: "22/05/2024",
    requestor: "Danila Raffel",
    subject: "How to set Horizontal nav",
    status: "Open",
    assignTo: "Emilla",
  },
];

const SupportRequestTable = () => {
  const [page, setPage] = useState(0);
  console.log("page", page);

  const column: ColumnDef<any>[] = [
    {
      accessorKey: "id",
      header: () => {
        return (
          <h5 className="font-medium xl:text-[15px] text-xs text-black font-calibri">
            ID
          </h5>
        );
      },
      cell: ({ row }) => {
        return (
          <h6 className="xl:text-[15px] text-xs font-calibri text-black">
            #{row.original?.id}
          </h6>
        );
      },
      meta: {
        className: "py-[15px]",
      },
    },
    {
      accessorKey: "lastUpdated",
      header: () => {
        return (
          <h5 className="font-medium xl:text-[15px] text-xs text-black font-calibri">
            Last Updated
          </h5>
        );
      },
      cell: ({ row }) => {
        return (
          <h6 className="xl:text-[15px] text-xs font-calibri text-black">
            {row.original?.lastUpdated}
          </h6>
        );
      },
      meta: {
        className: "py-[15px]",
      },
    },
    {
      accessorKey: "requestor",
      header: () => {
        return (
          <h5 className="font-medium xl:text-[15px] text-xs text-black font-calibri">
            Requestor
          </h5>
        );
      },
      cell: ({ row }) => {
        return (
          <h6 className="xl:text-[15px] text-xs font-calibri text-[#00778B] line-clamp-2 xl:leading-6 leading-4 xl:w-[70%] w-full">
            {row.original?.requestor}
          </h6>
        );
      },
      meta: {
        className: "py-[15px]",
      },
    },
    {
      accessorKey: "subject",
      header: () => {
        return (
          <h5 className="font-medium xl:text-[15px] text-xs text-black font-calibri">
            Subject
          </h5>
        );
      },
      cell: ({ row }) => {
        return (
          <h6 className="xl:text-[15px] text-xs font-calibri text-black line-clamp-2">
            {row.original?.subject}
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
          <h5 className="font-medium xl:text-[15px] text-xs text-black font-calibri">
            Status
          </h5>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="">
            <Button className="xl:text-sm text-xs font-calibri text-[#FF5252] bg-transparent hover:bg-transparent font-bold p-0 me-3 xl:h-8 h-6">
              {row.original?.status}
            </Button>
            <Button className="xl:text-sm text-xs font-calibri text-[#58BA66] bg-transparent hover:bg-transparent font-bold p-0 me-3 xl:h-8 h-6">
              Answered
            </Button>
            <Button className="xl:text-sm text-xs font-calibri text-[#FBBC04] bg-transparent hover:bg-transparent font-bold p-0 xl:h-8 h-6">
              In Process
            </Button>
          </div>
        );
      },
      meta: {
        className: "py-[15px]",
      },
    },
    {
      accessorKey: "assignTo",
      header: () => {
        return (
          <h5 className="font-medium xl:text-[15px] text-xs text-black font-calibri">
            Assign To
          </h5>
        );
      },
      cell: ({ row }) => {
        return (
          <h6 className="xl:text-[15px] text-xs font-calibri text-black line-clamp-2">
            {row.original?.assignTo}
          </h6>
        );
      },
      meta: {
        className: "py-[15px]",
      },
    },
  ];
  return (
    <div className="">
      <div className="border border-[#D9D9D9] flex items-center xl:w-[550px] w-[450px] px-4 xl:py-3 py-2 rounded-lg mb-5 mx-5">
        <Search className="text-[#A3A3A3]" width={18} />
        <input
          className="outline-none xl:text-[15px] text-sm text-[#A3A3A3] font-inter px-3 w-full"
          placeholder="Search by name, email, subject, status etc."
        ></input>
      </div>

      <div className="">
        <DataTable
          columns={column}
          data={data}
          totalCount={data?.length}
          setPage={setPage}
          rounded={false}
        />
      </div>
    </div>
  );
};

export default SupportRequestTable;
