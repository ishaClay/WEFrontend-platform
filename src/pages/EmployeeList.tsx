import delet from "@/assets/images/delet.svg";
import Loading from "@/components/comman/Error/Loading";
import Loader from "@/components/comman/Loader";
import { NewDataTable } from "@/components/comman/NewDataTable";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { RootState } from "@/redux/store";
import { deleteEmployee } from "@/services/apiServices/employee";
import { getMemberlist } from "@/services/apiServices/member";
import { EmployeeEntity } from "@/types/Invition";
import { TriangleDownIcon, TriangleUpIcon } from "@radix-ui/react-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Pencil } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import searchIcon from "/assets/icons/search.svg";

// import { useSelector } from "react-redux";

function CoursesAllocate() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { CompanyId } = useAppSelector((state: RootState) => state.user);
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const queryClient = useQueryClient();
  const companyId = CompanyId
    ? CompanyId
    : userData?.query
    ? userData?.query?.companyDetails?.id
    : userData?.companyDetails?.id;

  const navigate = useNavigate();

  const column: ColumnDef<EmployeeEntity>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 font-inter text-[15px] font-semibold h-[52px]"
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
      cell: ({ row }) => {
        return (
          <div
            className="font-normal font-inter text-[15px] cursor-pointer"
            onClick={() => {
              navigate(`/company/employeelist/${row.original.id}`);
            }}
          >
            #{row.index + 1}
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 font-inter text-[15px] font-semibold h-[52px]"
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
          <div className="flex items-center font-bold px-3">
            <Avatar>
              <AvatarImage src={row.original.profileImage} alt="Img" />
              <AvatarFallback>
                {row?.original?.name
                  ? // @ts-ignore
                    row?.original?.name?.charAt(0)
                  : row.original.email?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <p className={`font-bold px-3`}>{row.original.name}</p>
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
            className="p-0 font-inter text-[15px] font-semibold h-[52px]"
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
          <p className={`font-normal font-inter text-[15px] px-3`}>
            {row.original.email}
          </p>
        );
      },
    },
    {
      accessorKey: "number",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 font-inter text-[15px] font-semibold h-[52px]"
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
          <p className={`font-normal font-inter text-[15px] px-3`}>
            {/* {row.original.number} */}
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
            className="px-0 font-inter text-[15px] font-semibold"
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
                ? "bg-[#00778B] text-white h-[26px] w-[82px]"
                : "bg-[#0E9CFF] text-white h-[26px] w-[82px]"
            } font-normal px-3 rounded-full text-center leading-[26px] text-xs font-inter`}
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
            className="p-0 font-inter text-[15px] font-semibold h-[52px]"
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
                ? "bg-[#58BA66]"
                : row.original.employeeStatus === "Inactive"
                ? "bg-[#FF5252]"
                : "bg-[#FFD56A] text-white"
            }  font-normal w-[80px] h-[32px] text-sm font-inter leading-8 rounded-md text-center text-white`}
          >
            {row.original.employeeStatus === "IsNew"
              ? "Pending"
              : row.original.employeeStatus}
          </p>
        );
      },
    },

    {
      accessorKey: "action",
      header: "",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-[12px] ">
            <Button
              onClick={() =>
                navigate(`/company/employeelist/${row.original.id}`)
              }
              variant={"ghost"}
              className="p-0"
            >
              <Eye className="text-gray-200" />
            </Button>
            <Button
              onClick={() =>
                navigate(`/company/employeelist/edit/${row.original.id}`)
              }
              variant={"ghost"}
              className="p-0"
            >
              <Pencil className="text-gray-200 w-[20px]" />
            </Button>
            <Button
              onClick={() => handleDelete(+row.original.id)}
              variant={"ghost"}
              className="p-0"
            >
              <img src={delet} alt="" />
            </Button>
          </div>
        );
      },
    },
  ];
  const { data, isPending: employeDataPending } = useQuery({
    queryKey: [QUERY_KEYS.MemberList, { page, search }],
    queryFn: () => getMemberlist(page.toString(), "10", companyId, search),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.MemberList],
      });
    },
  });

  const handleDelete = (id: number) => {
    mutate(+id);
  };

  return (
    <div className="bg-[#f5f3ff]">
      <div className="bg-[#FFFFFF] rounded-[10px]">
        <div className="p-4 bg-[#FFFFFF] border-b border-[#D9D9D9] rounded-t-[10px] sm:flex block items-center justify-between">
          <div>
            <p className="text-[#000000] font-abhaya font-bold text-base pb-2.5">
              Team List
            </p>
            <p className="text-[#606060] text-[15px] font-abhaya leading-[16px] font-bold">
              The full list of team members working on your green initiatives
            </p>
          </div>
          <div className="block sm:mt-0 mt-4">
            <Link
              to="employeeinvition"
              className="p-[10px] bg-primary-button text-color font-abhaya text-sm rounded-sm"
            >
              Send Invitation
            </Link>
          </div>
        </div>

        <div className="flex bg-[#FFFFFF] ">
          <div className="m-4 relative">
            <Input
              placeholder={"Search by name, email etc."}
              value={search}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
              className="pl-[45px] border sm:w-[550px] w-[290px] rounded-[6px] placeholder:text-[15px] placeholder:text-[#A3A3A3] bg-primary-foreground h-[52px] placeholder:font-normal"
            />
            <img
              src={searchIcon}
              alt="searchIcon"
              className="absolute left-[18px] top-[18px]"
            />
          </div>
        </div>

        {employeDataPending ? (
          <Loader />
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

      <Loading isLoading={isPending} />
    </div>
  );
}

export default CoursesAllocate;
