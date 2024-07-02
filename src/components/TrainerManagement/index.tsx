import star from "@/assets/images/Vector.png";
import { cn } from "@/lib/utils";
import { getTrainer } from "@/services/apiServices/trainer";
import { DataEntity, TrainerStatus, TrainersResponse } from "@/types/Trainer";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDown, Eye, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import search from "../../assets/images/search.svg";
import { DataTable } from "../comman/DataTable";
import Input from "../comman/Input/Input";
import Loader from "../comman/Loader";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

const TrainerManagement = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [searchValue, setSearchValue] = useState("");
  const id = "13";
  const navigate = useNavigate();
  const colums: ColumnDef<DataEntity>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="gap-1 p-0 text-[15px] font-medium font-inter h-auto"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            ID
            <div className="flex flex-col">
              <ChevronsUpDown className="w-4 h-4 text-[#A3A3A3]" />
            </div>
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="text-[15px] font-medium">
            #{(row.index + 1).toString().padStart(2, "0")}
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
            className="p-0 gap-1 text-[15px] font-medium font-inter h-auto"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Trainer Name
            <div className="flex flex-col">
              <ChevronsUpDown className="w-4 h-4 text-[#A3A3A3]" />
            </div>
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-1">
            <Avatar className="w-8 h-8">
              <AvatarImage src={row.original?.imageUrl} />
              <AvatarFallback className="uppercase shadow-lg text-[12px]">
                {row?.original?.name?.[0]}
                {row?.original?.name?.[1]}
              </AvatarFallback>
            </Avatar>
            <p className="text-[15px] font-medium">{row.original.name}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "providerCounty",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 gap-1 text-[15px] font-medium font-inter h-auto"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Country
            <div className="flex flex-col">
              <ChevronsUpDown className="w-4 h-4 text-[#A3A3A3]" />
            </div>
          </Button>
        );
      },
    },
    {
      accessorKey: "providerName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 gap-1 text-[15px] font-medium font-inter h-auto"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Provider Name
            <div className="flex flex-col">
              <ChevronsUpDown className="w-4 h-4 text-[#A3A3A3]" />
            </div>
          </Button>
        );
      },
    },
    {
      accessorKey: "rating",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-1 gap-1 text-[15px] font-medium font-inter h-auto"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Rating
            <div className="flex flex-col">
              <ChevronsUpDown className="w-4 h-4 text-[#A3A3A3]" />
            </div>
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="flex items-center">
            <img src={star} alt="" className="w-4 h-4" />
            <p className="font-medium mt-0.5">{row.original.rating}/5</p>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 text-[15px] font-medium font-inter h-auto"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <div className="flex flex-col p-0">
              <ChevronsUpDown className="w-4 h-4 text-[#A3A3A3]" />
            </div>
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div
            className={cn(
              "text-[15px] font-medium px-[29px] py-[9px] text-center rounded-[6px]",
              TrainerStatus[row.original.status] === "Active"
                ? "bg-[#58BA66] text-white"
                : TrainerStatus[row.original.status] === "Inactive"
                ? "bg-[#FF5252] text-white"
                : "bg-[#FFA25E] text-white"
            )}
          >
            {TrainerStatus[row.original.status] || "N/A"}
          </div>
        );
      },
      meta: {
        className: "w-[100px]",
      },
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => {
        return (
          <div className="flex items-center 2xl:gap-[12px] gap-[7px]">
            <Button
              variant={"ghost"}
              onClick={() =>
                navigate(
                  `/trainer/trainer-management/details/${row?.original?.id}`
                )
              }
              className="p-0 gap-1 text-[15px] font-medium font-inter h-auto h-auto hover:bg-transparent"
            >
              <Eye className="text-[#A3A3A3] w-5" />
            </Button>
            <Button
              variant={"ghost"}
              className="p-0 gap-1 text-[15px] font-medium font-inter h-auto h-auto hover:bg-transparent"
            >
              <Pencil className="text-[#A3A3A3] w-4 h-4" />
            </Button>
            <Button
              variant={"ghost"}
              className="p-0 gap-1 text-[15px] font-medium font-inter h-auto h-auto hover:bg-transparent"
            >
              <Trash2 className="text-[#A3A3A3] w-4 h-4" />
            </Button>
          </div>
        );
      },
      meta: {
        className: "w-[100px]",
      },
    },
  ];

  const { data, isPending } = useQuery<TrainersResponse>({
    queryKey: ["trainer", { page, limit, searchValue, id }],
    queryFn: () => getTrainer({ page, limit, keyword: searchValue, id }),
  });

  return (
    <div>
      <div className="px-[14px] py-[10px] flex items-center justify-between border-b">
        <div>
          <h3 className="text-[16px] font-[700] font-nunito mb-1">
            Trainer Management
          </h3>
          <p className="text-[#606060] text-[15px]">The full list of all your enrolled trainers, with a quick-view of their details </p>
        </div>
        <Button
          type="button"
          onClick={() => navigate("/trainer/trainer-management/invitation")}
          className="bg-[#00778B] font-nunito px-5 text-[16px]"
        >
          INVITE TRAINER
        </Button>
      </div>
      <div>
        <div className="px-[15px] py-4">
          <div className="relative max-w-[550px] w-full">
            <Input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search by name, country, provider type, etc."
              className="py-[17px] pl-[39px] border !w-full rounded-[6px] placeholder:text-[15px] placeholder:text-[#A3A3A3] bg-primary-foreground h-[52px] placeholder:font-normal font-inter mr-[4px]"
              name={""}
              label={""}
            />
            <img
              src={search}
              alt=""
              className="absolute left-4 top-1/2 -translate-y-1/2"
            />
          </div>
        </div>
        {isPending ? (
          <Loader />
        ) : (
          <DataTable
            columns={colums}
            data={data?.data || []}
            totalPages={data?.metadata?.totalItems}
            pagination={{ pageIndex: page, pageSize: limit }}
            setPage={setPage}
            inputbox={false}
            searchPlaceholder="Search by client name, Region, contact number, etc."
          />
        )}
      </div>
    </div>
  );
};

export default TrainerManagement;
