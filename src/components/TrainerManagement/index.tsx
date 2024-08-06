import star from "@/assets/images/Vector.png";
import { cn } from "@/lib/utils";
import { getTrainer } from "@/services/apiServices/trainer";
import { DataEntity, TrainerStatus } from "@/types/Trainer";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDown, Eye, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import search from "../../assets/images/search.svg";
import Input from "../comman/Input/Input";
import Loader from "../comman/Loader";
import { NewDataTable } from "../comman/NewDataTable";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { setPath } from "@/redux/reducer/PathReducer";
import { useAppDispatch } from "@/hooks/use-redux";
import { ConfirmModal } from "../comman/ConfirmModal";

const TrainerManagement = () => {
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const Role = location.pathname.split("/")[1];
  const limit = 10;
  const [searchValue, setSearchValue] = useState("");
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const id = userData?.query?.detailsid;
  const [openDelete, setOpenDelete] = useState<DataEntity | null>(null);
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
              <AvatarImage src={row.original?.profileImage || ""} />
              <AvatarFallback className="uppercase shadow-lg text-[12px]">
                {row?.original?.name?.[0] ||
                  row?.original?.email?.split("@")?.[0].charAt(0)}
                {row?.original?.name?.[1] ||
                  row?.original?.email?.split("@")?.[0].charAt(1)}
              </AvatarFallback>
            </Avatar>
            <p className="text-[15px] font-medium">
              {row.original.name || row?.original?.email?.split("@")?.[0]}
            </p>
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
      cell: ({ row }) => {
        const providerCounty = row?.original?.providerCounty;
        return <p>{providerCounty ?? "-"}</p>
      }
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
      cell: ({ row }) => {
        const providerName = row?.original?.providerName;
        return <p>{providerName ?? "-"}</p>
      }
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
              onClick={() => {
                dispatch(
                  setPath([
                    {
                      label: "Trainer Managment",
                      link: `/${Role}/trainer-management`,
                    },
                    {
                      label: "View Trainer Details",
                      link: `/${Role}/trainer-management/details/${row?.original?.id}`,
                    },
                  ])
                );
              }}
              className="p-0 gap-1 text-[15px] font-medium font-inter h-auto hover:bg-transparent"
            >
              <Eye className="text-[#A3A3A3] w-5" />
            </Button>
            <Button
              variant={"ghost"}
              type="button"
              onClick={() => {
                dispatch(
                  setPath([
                    {
                      label: "Trainer Managment",
                      link: `/${Role}/trainer-management`,
                    },
                    {
                      label: "Edit Trainer Details",
                      link: `/${Role}/trainer-management/edit/${row?.original?.id}`,
                    },
                  ])
                );
              }}
              className="p-0 gap-1 text-[15px] font-medium font-inter h-auto hover:bg-transparent"
            >
              <Pencil className="text-[#A3A3A3] w-4 h-4" />
            </Button>
            <Button
              onClick={() => setOpenDelete(row?.original)}
              variant={"ghost"}
              className="p-0 gap-1 text-[15px] font-medium font-inter h-auto hover:bg-transparent"
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

  const { data, isPending } = useQuery({
    queryKey: ["trainer", { page, limit, searchValue, id }],
    queryFn: () => getTrainer({ page, limit, keyword: searchValue, id }),
  });
  const handleDelete = () => {
    data(openDelete?.id);
  };
  return (
    <div>
      <div className="px-[14px] py-[10px] md:flex block items-center justify-between border-b">
        <div>
          <h3 className="text-[16px] font-[700] font-nunito mb-1">
            Trainer Management
          </h3>
          <p className="text-[#606060] text-[15px]">
            The full list of all your enrolled trainers, with a quick-view of
            their details{" "}
          </p>
        </div>
        <Button
          type="button"
          onClick={() => {
            dispatch(
              setPath([
                {
                  label: "Trainer Managment",
                  link: `/${Role}/trainer-management`,
                },

                {
                  label: "Invitation",
                  link: `/${Role}/trainer-management/invitation`,
                },
              ])
            );
          }}
          className="bg-[#00778B] font-nunito sm:px-5 px-4 sm:text-base text-sm md:mt-0 mt-3"
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
              className="py-[17px] pl-[39px] border !w-full rounded-[6px] placeholder:text-[15px] placeholder:text-[#A3A3A3] bg-primary-foreground sm:h-[52px] h-[46px] placeholder:font-normal font-inter mr-[4px]"
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
          <NewDataTable
            columns={colums}
            data={data?.data || []}
            totalPages={data?.metadata?.totalPages}
            pagination={{ pageIndex: page, pageSize: limit }}
            setPage={setPage}
            inputbox={false}
            searchPlaceholder="Search by client name, Region, contact number, etc."
          />
        )}
      </div>
      <ConfirmModal
        open={!!openDelete}
        onClose={() => setOpenDelete(null)}
        onDelete={() => handleDelete}
        value={openDelete?.name || ""}
        isLoading={isPending}
      />
    </div>
  );
};

export default TrainerManagement;
