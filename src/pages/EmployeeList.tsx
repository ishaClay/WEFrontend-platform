import { QUERY_KEYS } from "@/lib/constants";
import { getMemberlist } from "@/services/apiServices/member";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { TriangleDownIcon, TriangleUpIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { NewDataTable } from "@/components/comman/NewDataTable";
import { useState, ChangeEvent } from "react";
import searchIcon from "/assets/icons/search.svg";
import { Loader2 } from "lucide-react";
import delet from "@/assets/images/delet.svg";
import { Link } from "react-router-dom";
import { EmployeeEntity } from "@/types/Invition";

// import { useSelector } from "react-redux";

function CoursesAllocate() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  // const { UserId } = useSelector((state: any) => state.user);

  const column: ColumnDef<EmployeeEntity>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="px-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            ID
            <div className="flex flex-col">
              <TriangleUpIcon
                className="ml-1 h-[14px] w-[14px] text-[#A3A3A3]"
                viewBox="0,0,15,5"
              />
              <TriangleDownIcon
                className="ml-1 h-[14px] w-[14px] text-[#A3A3A3]"
                viewBox="0,5,15,15"
              />
            </div>
          </Button>
        );
      },
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="px-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Team Member
            <div className="flex flex-col">
              <TriangleUpIcon
                className="ml-1 h-[14px] w-[14px] text-[#A3A3A3]"
                viewBox="0,0,15,5"
              />
              <TriangleDownIcon
                className="ml-1 h-[14px] w-[14px] text-[#A3A3A3]"
                viewBox="0,5,15,15"
              />
            </div>
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div className=" w-20 font-bold px-3 flex items-center justify-center">
            <div className=" p-1 rounded-full">
              <img
                src={row.original.profileImage}
                alt=""
                className="object-cover"
              />
            </div>
            <p
              className={` w-20 h-8 font-bold px-3 flex items-center justify-center`}
            >
              {row.original.name}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="px-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email ID
            <div className="flex flex-col">
              <TriangleUpIcon
                className="ml-1 h-[14px] w-[14px] text-[#A3A3A3]"
                viewBox="0,0,15,5"
              />
              <TriangleDownIcon
                className="ml-1 h-[14px] w-[14px] text-[#A3A3A3]"
                viewBox="0,5,15,15"
              />
            </div>
          </Button>
        );
      },

      cell: ({ row }) => {
        return (
          <p
            className={` w-20 h-8 font-bold px-3 flex items-center justify-center `}
          >
            {row.original.email}
          </p>
        );
      },
    },
    {
      accessorKey: "mnumber",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="px-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Mobile Number
            <div className="flex flex-col">
              <TriangleUpIcon
                className="ml-1 h-[14px] w-[14px] text-[#A3A3A3]"
                viewBox="0,0,15,5"
              />
              <TriangleDownIcon
                className="ml-1 h-[14px] w-[14px] text-[#A3A3A3]"
                viewBox="0,5,15,15"
              />
            </div>
          </Button>
        );
      },

      cell: () => {
        return (
          <p
            className={` w-20 h-8 font-bold px-3 flex items-center justify-center `}
          >
            {/* {row.original.mnumber} */}
          </p>
        );
      },
    },

    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="px-0 ml-[20px]"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <div className="flex flex-col ">
              <TriangleUpIcon
                className="ml-1 h-[14px] w-[14px] text-[#A3A3A3]"
                viewBox="0,0,15,5"
              />
              <TriangleDownIcon
                className="ml-1 h-[14px] w-[14px] text-[#A3A3A3]"
                viewBox="0,5,15,15"
              />
            </div>
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <p
            className={`${
              row.original.status === "Registered"
                ? "bg-[#00778B] text-white h-[32px] w-[80px]"
                : "bg-[#0E9CFF] text-white h-[32px] w-[80px]"
            } w-20 h-8 font-bold px-3  flex items-center justify-center`}
          >
            {row.original.status}
          </p>
        );
      },
    },
    {
      accessorKey: "activity",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="px-0 "
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Activity
            <div className="flex flex-col">
              <TriangleUpIcon
                className="ml-1 h-[14px] w-[14px] text-[#A3A3A3]"
                viewBox="0,0,15,5"
              />
              <TriangleDownIcon
                className="ml-1 h-[14px] w-[14px] text-[#A3A3A3]"
                viewBox="0,5,15,15"
              />
            </div>
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <p
            className={`${
              row.original.employeeStatus === "Active"
                ? "text-[#58BA66]"
                : row.original.employeeStatus === "Inactive"
                ? "bg-[#FF5252] text-white"
                : "text-white"
            } w-20 h-8 font-bold px-3 flex items-center justify-center`}
          >
            {row.original.employeeStatus}
          </p>
        );
      },
    },

    {
      accessorKey: "action",
      header: "",
      cell: () => {
        return (
          <div className="flex items-center gap-[12px] ">
            <Button variant={"ghost"} className="p-0">
              <img src={delet} alt="" />
            </Button>
          </div>
        );
      },
    },
  ];
  const { data, isPending: employeDataPending } = useQuery({
    queryKey: [QUERY_KEYS.MemberList, { page, search }],
    queryFn: () => getMemberlist(page.toString(), "10", 435, search),
  });
  console.log(data, "column===");

  return (
    <div className="bg-[#f5f3ff]">
      <div className="bg-[#FFFFFF] rounded-[10px]">
        <div className="pl-[30px] h-[60px] bg-[#FFFFFF] border-b border-[#D9D9D9] rounded-t-[10px] flex items-center justify-between">
          <div>
            <p className="text-[#000000] text-[Calibri] font-bold">
              Team Member List
            </p>
            <p className="text-[#606060] text-[15px] font-abhaya leading-[16px]">
              The full list of team members working on your green initiatives
            </p>
          </div>
          <div>
            <Link
              to="employeeinvition"
              className="py-[10px] px-[20px] bg-primary-button text-color rounded-sm"
            >
              Send Invitation
            </Link>
          </div>
        </div>

        <div className="flex pl-[10px] w-[1230px] h-[70px] bg-[#FFFFFF] ">
          <div className="flex items-center py-4 relative">
            <Input
              placeholder={
                "Search by pilier, level, recommended, course name etc."
              }
              value={search}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
              className="py-[17px] pl-[39px] border w-[550px] rounded-[6px] ml-[23px] placeholder:text-[15px] placeholder:text-[#A3A3A3] bg-primary-foreground h-[52px] placeholder:font-normal"
            />
            <img
              src={searchIcon}
              alt="searchIcon"
              className="absolute left-10"
            />
          </div>
        </div>

        {employeDataPending ? (
          <span className="flex justify-center items-center py-10">
            <Loader2 className="w-5 h-5 animate-spin" />
          </span>
        ) : (
          <NewDataTable
            columns={column}
            data={data?.data || []}
            totalPages={data?.metadata?.totalPages || 1}
            setPage={setPage}
            inputbox={false}
            pagination={{ pageIndex: page, pageSize: 10 }}
          />
        )}
      </div>
    </div>
  );
}

export default CoursesAllocate;
