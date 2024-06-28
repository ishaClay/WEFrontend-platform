import { DataTable } from "@/components/comman/DataTable";
import delet from "@/assets/images/delet.svg"
import { NewDataTable } from "@/components/comman/NewDataTable";
import { Button } from "@/components/ui/button";
import { QUERY_KEYS } from "@/lib/constants";
import { fetchSupportTicketList } from "@/services/apiServices/supportRequestServices";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Loader2, Search } from "lucide-react";
import { TriangleDownIcon, TriangleUpIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import { Badge } from "@/components/ui/badge";

const SupportRequestTable = () => {
  const [page, setPage] = useState(0);
  const { UserId } = useSelector((state: any) => state.user);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const { data: support_request_list, isPending: supportRequestPending } =
		useQuery({
			queryKey: [QUERY_KEYS.supportTicketList],
			queryFn: () =>
				fetchSupportTicketList(page.toString(), "10", UserId),
		});

  const column: ColumnDef<any>[] = [
    {
			accessorKey: "id",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() =>
							column.toggleSorting(column.getIsSorted() === "asc")
						}>
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
			accessorKey: "updatedat",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() =>
							column.toggleSorting(column.getIsSorted() === "asc")
						}>
						Last Updated
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
				return moment(row.original.updatedat).format("DD-MM-YYYY");
			},
		},
		{
			accessorKey: "openbyname",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() =>
							column.toggleSorting(column.getIsSorted() === "asc")
						}>
						Requestor
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
			cell: ({ row }: any) => {
				return (
					<Link
            to={`ticket-details/${row.original.id}`}
						className="text-[#00778B] cursor-pointer"
					>
						{row.original.openbyname}
					</Link>
				);
			},
		},
		{
			accessorKey: "subject",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() =>
							column.toggleSorting(column.getIsSorted() === "asc")
						}>
						Subject
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
			accessorKey: "status",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() =>
							column.toggleSorting(column.getIsSorted() === "asc")
						}>
						Status
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
					<Badge
						className={`${row.original.status === "Answered"
							? "bg-[#58BA66] hover:bg-[#58BA66]/80"
							: row.original.status === "InProcess"
								? "bg-[#0E9CFF] hover:bg-[#0E9CFF]/80"
								: "bg-[#FFA25E] hover:bg-[#FFA25E]/80"
							} w-20 h-8 px-3 flex items-center justify-center`}>
						{row.original.status}
					</Badge>
				);
			},
		},
		{
			accessorKey: "assigntoname",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() =>
							column.toggleSorting(column.getIsSorted() === "asc")
						}>
						Assign to
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
			cell: ({ row }: any) => {
				return (
					<Link
            to={`ticket-details/${row.original.id}`}
					>
						{row.original.assigntoname}
					</Link>
				);
			},
		},
		{
			accessorKey: "priority",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() =>
							column.toggleSorting(column.getIsSorted() === "asc")
						}>
						Priority
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
					<Badge
						className={`${row.original.priority === "High"
							? "bg-[#FF5252] hover:bg-[#FF5252]/80"
							: row.original.priority === "Normal"
								? "bg-[#58BA66] hover:bg-[#58BA66]/80"
								: "bg-[#FFD56A] hover:bg-[#FFD56A]/80"
							} w-20 h-8 px-3 flex items-center justify-center`}>
						{row.original.priority}
					</Badge>
				);
			},
		},
		{
			accessorKey: "action",
			header: "Action",
			cell: ({ row }: any) => {
				return (
					<div className="flex items-center gap-[12px] ">
						<Button
							onClick={() => {
								setOpenDelete(row?.original);
							}}
							variant={"ghost"}
							className="p-0">
							<img src={delet} alt="" />
						</Button>
					</div>
				);
			},
		},
  ];
  return (
      <div className="">
        {
          supportRequestPending ? <span className="flex justify-center items-center py-10"><Loader2 className="w-5 h-5 animate-spin" /></span> : 
          <NewDataTable
            columns={column}
            data={support_request_list?.data.data || []}
            totalCount={support_request_list?.data?.metadata?.totalItems}
            setPage={setPage}
            pagination={{ pageIndex: page, pageSize: 10 }}
            searchPlaceholder="Search by name, email, subject, status etc."
          />
      }
    </div>
  );
};

export default SupportRequestTable;
