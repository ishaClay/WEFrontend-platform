import { DataTable } from "@/components/comman/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Search } from "lucide-react";
import { useState } from "react";

const data = [
  {
    id: 1,
    documentTitle: "User manual for Employee admin",
    type: "User Manual",
  },
  {
    id: 2,
    documentTitle: "User manual for Employee admin",
    type: "User Manual",
  },
  {
    id: 3,
    documentTitle: "User manual for Employee admin",
    type: "User Manual",
  },
  {
    id: 4,
    documentTitle: "User manual for Employee admin",
    type: "User Manual",
  },
  {
    id: 5,
    documentTitle: "User manual for Employee admin",
    type: "User Manual",
  },
];

const TrainingDocument = () => {
  const [page, setPage] = useState(0);
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
        className: "xl:w-[150px] w-[75px] py-[15px]",
      },
    },
    {
      accessorKey: "documentTitle",
      header: () => {
        return (
          <h5 className="font-medium xl:text-[15px] text-xs text-black font-calibri">
            Document Title
          </h5>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="flex items-center">
            <h6 className="xl:text-[15px] text-xs font-calibri text-[#00778B]">
              {row.original?.documentTitle}
            </h6>
          </div>
        );
      },
      meta: {
        className: "xl:w-[500px] w-[300px] py-[15px]",
      },
    },
    {
      accessorKey: "type",
      header: () => {
        return (
          <h5 className="font-medium xl:text-[15px] text-xs text-black font-calibri">
            Type
          </h5>
        );
      },
      cell: ({ row }) => {
        return (
          <h6 className="xl:text-[15px] text-xs font-calibri text-black line-clamp-2 xl:leading-6 leading-4 xl:w-[70%] w-full">
            {row.original?.type}
          </h6>
        );
      },
      meta: {
        className: "py-[15px]",
      },
    },
  ];
  return (
    <div className="bg-white rounded-xl">
      <div className="flex justify-between items-center border-b border-[#D9D9D9] p-4">
        <h6 className="font-calibri text-base font-bold">Training Document</h6>
      </div>
      <div className="p-5">
        <div className="border border-[#D9D9D9] flex items-center xl:w-[550px] w-[450px] px-4 xl:py-3 py-2 rounded-lg">
          <Search className="text-[#A3A3A3]" width={18} />
          <input
            className="outline-none xl:text-[15px] text-sm text-[#A3A3A3] font-inter px-3 w-full"
            placeholder="Search by name, course name, certificate name, etc."
          ></input>
        </div>
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

export default TrainingDocument;
