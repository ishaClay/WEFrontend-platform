import { NewDataTable } from "@/components/comman/NewDataTable";
import { Switch } from "@/components/ui/switch";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import profile_img from "@/assets/images/face_1.jfif";

const employeePermissionData = [
  {
    id: 1,
    memberName: "Ankites Risher",
    editAction: "",
    selfAssessment: "",
    feedback: "",
  },
  {
    id: 2,
    memberName: "Liam Risher",
    editAction: "",
    selfAssessment: "",
    feedback: "",
  },
  {
    id: 3,
    memberName: "Ankites Risher",
    editAction: "",
    selfAssessment: "",
    feedback: "",
  },
  {
    id: 4,
    memberName: "Ankites Risher",
    editAction: "",
    selfAssessment: "",
    feedback: "",
  },
  {
    id: 5,
    memberName: "Ankites Risher",
    editAction: "",
    selfAssessment: "",
    feedback: "",
  },
];

function EmployeePermission() {
  const [page, setPage] = useState(0);
  console.log("++++", page);
  const column: ColumnDef<any>[] = [
    {
      accessorKey: "id",
      header: () => {
        return (
          <h5 className="font-medium xl:text-sm text-xs text-black font-inter">
            ID
          </h5>
        );
      },
      cell: ({ row }) => {
        return (
          <h6 className="xl:text-[15px] text-xs font-inter text-black">
            #{row.original?.id}
          </h6>
        );
      },
    },
    {
      accessorKey: "memberName",
      header: () => {
        return (
          <h5 className="font-medium xl:text-sm text-xs text-black font-inter">
            Team Member
          </h5>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img src={profile_img} alt="profile img" />
            </div>
            <h6 className="xl:text-[15px] text-xs font-inter text-black">
              {row.original?.memberName}
            </h6>
          </div>
        );
      },
    },
    {
      accessorKey: "editAction",
      header: () => {
        return (
          <h5 className="font-medium xl:text-sm text-xs text-black font-inter">
            Edit Action Item
          </h5>
        );
      },
      cell: () => {
        return <Switch />;
      },
      meta: {
        className: "text-center",
      },
    },
    {
      accessorKey: "selfAssessment",
      header: () => {
        return (
          <h5 className="font-medium xl:text-sm text-xs text-black font-inter">
            Retake Self-assessment
          </h5>
        );
      },
      cell: () => {
        return <Switch />;
      },
      meta: {
        className: "text-center",
      },
    },
    {
      accessorKey: "feedback",
      header: () => {
        return (
          <h5 className="font-medium xl:text-sm text-xs text-black font-inter">
            Share Feedback
          </h5>
        );
      },
      cell: () => {
        return <Switch />;
      },
      meta: {
        className: "text-center",
      },
    },
  ];
  return (
    <div className="bg-[#FFFFFF] rounded-xl mt-5">
      <div className="rounded-[10px]">
        <div className="p-5 border-b border-[#D9D9D9]">
          <p className="text-[#000000] font-abhaya font-bold">Team Settings</p>
        </div>

        <div className="overflow-x-auto">
          <NewDataTable
            columns={column}
            data={employeePermissionData}
            totalPages={employeePermissionData?.length}
            setPage={setPage}
            border={false}
          />
        </div>
      </div>
    </div>
  );
}

export default EmployeePermission;
