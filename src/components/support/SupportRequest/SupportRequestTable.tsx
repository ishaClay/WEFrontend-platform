import delet from "@/assets/images/delet.svg";
import { ConfirmModal } from "@/components/comman/ConfirmModal";
import { NewDataTable } from "@/components/comman/NewDataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { QUERY_KEYS } from "@/lib/constants";
import {
  deleteSupportTicket,
  fetchSupportTicketList,
} from "@/services/apiServices/supportRequestServices";
import { ErrorType } from "@/types/Errors";
import { SupportRequest } from "@/types/SupportRequest";
import { TriangleDownIcon, TriangleUpIcon } from "@radix-ui/react-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Loader2 } from "lucide-react";
import moment from "moment";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SupportRequestTable = () => {
  const { toast } = useToast();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { UserId } = useSelector((state: any) => state.user);
  const queryClient = useQueryClient();
  const [openDelete, setOpenDelete] = useState<boolean | SupportRequest>(false);
  const { data: support_request_list, isPending: supportRequestPending } =
    useQuery({
      queryKey: [QUERY_KEYS.supportTicketList],
      queryFn: () =>
        fetchSupportTicketList(page.toString(), "10", UserId, search),
    });

  const column: ColumnDef<any>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
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
      accessorKey: "updatedat",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
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
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
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
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
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
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
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
          <p
            className={`${
              row.original.status === "Answered"
                ? "text-[#58BA66]"
                : row.original.status === "InProcess"
                ? "text-[#58BA66]"
                : "text-[#FFD56A]"
            } w-20 h-8 font-bold px-3 flex items-center justify-center`}
          >
            {row.original.status}
          </p>
        );
      },
    },
    {
      accessorKey: "assigntoname",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
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
          <Link to={`ticket-details/${row.original.id}`}>
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
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
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
            className={`${
              row.original.priority === "High"
                ? "bg-[#FF5252] hover:bg-[#FF5252]/80"
                : row.original.priority === "Medium"
                ? "bg-[#58BA66] hover:bg-[#58BA66]/80"
                : "bg-[#FFD56A] hover:bg-[#FFD56A]/80"
            } rounded-[6px] w-20 h-8 px-3 flex items-center justify-center`}
          >
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
              className="p-0"
            >
              <img src={delet} alt="" />
            </Button>
          </div>
        );
      },
    },
  ];

  const { mutate: delete_supportticket, isPending: deletePanding } =
    useMutation({
      mutationFn: (id: string) => deleteSupportTicket(id),
      onSuccess: () => {
        toast({ title: "Ticket delete Successfully" });
        setOpenDelete(false);
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.supportTicketList],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.supportTicketCount],
        });
      },
      onError: (error: ErrorType) => {
        toast({
          variant: "destructive",
          title: error.data.message,
        });
      },
    });

  const handleDelete = () => {
    delete_supportticket((openDelete as SupportRequest).id as string);
  };

  return (
    <div className="">
      {supportRequestPending ? (
        <span className="flex justify-center items-center py-10">
          <Loader2 className="w-5 h-5 animate-spin" />
        </span>
      ) : (
        <NewDataTable
          columns={column}
          data={support_request_list?.data.data || []}
          totalPages={support_request_list?.data?.metadata?.totalPages || 1}
          setPage={setPage}
          pagination={{ pageIndex: page, pageSize: 10 }}
          searchPlaceholder="Search by Requestor, Subject, Assign to etc."
          searchFilter={(e) => setSearch(e)}
        />
      )}

      <ConfirmModal
        open={openDelete as boolean}
        onClose={() => setOpenDelete(false)}
        onDelete={handleDelete}
        value={typeof openDelete === "boolean" ? "" : openDelete?.openbyname}
        isLoading={deletePanding}
      />
    </div>
  );
};

export default SupportRequestTable;
