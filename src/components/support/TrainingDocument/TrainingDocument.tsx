import { DataTable } from "@/components/comman/DataTable";
import { QUERY_KEYS } from "@/lib/constants";
import { fetchDocument } from "@/services/apiServices/Document";
import {
  TrainingDocumentResponse,
  TrainingDocumentResult,
} from "@/types/TrainingDoc";
import { UserRole } from "@/types/UserRole";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Search } from "lucide-react";
import { useState } from "react";

const TrainingDocument = () => {
  const [page, setPage] = useState(1);
  console.log("page", page);
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const userRole = userData ? userData?.query?.role : null;
  const Role =
    UserRole.Trainer === +userRole
      ? 1
      : UserRole?.Trainee === +userRole
      ? 2
      : UserRole?.Company === +userRole
      ? 3
      : 4;

  const { data: document } = useQuery<TrainingDocumentResponse>({
    queryKey: [QUERY_KEYS.fetchDocument],
    queryFn: () => fetchDocument({ page, userId: "", role: Role }),
  });

  console.log("data", document);

  const column: ColumnDef<TrainingDocumentResult>[] = [
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
            <a
              href={row.original?.documentUrl}
              className="xl:text-[15px] text-xs font-calibri text-[#00778B]"
              target="_blank"
            >
              {row.original?.title}
            </a>
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
    <div className="lg:bg-white bg-transparent rounded-xl">
      <div className="border-b border-[#D9D9D9] p-4">
        <h6 className="font-nunito text-base font-bold">Training Document</h6>
        <p className="text-[#606060] text-[15px] font-abhaya leading-[16px]">
          Here’s the full list of training documents related to all your courses
        </p>
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
          data={document?.data || []}
          totalPages={document?.metadata?.totalPages}
          setPage={setPage}
          rounded={false}
        />
      </div>
    </div>
  );
};

export default TrainingDocument;
