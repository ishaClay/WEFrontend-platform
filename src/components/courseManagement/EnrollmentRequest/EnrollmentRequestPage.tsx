import { useState } from "react";
import EnrollmentCourseList from "./EnrollmentCourseList";
import { MoveLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EnrollmentRequestPage = () => {
  const [statusFilter, setStatusFilter] = useState("0");
  console.log("statusFilter", statusFilter);

  return (
    <div className="bg-white">
      <div className="flex justify-between items-center py-2 px-4 border-b border-[#D9D9D9] mb-7">
        <div>
          <h6 className="text-base font-bold">Enrollment Requests</h6>
        </div>
        <div className="flex items-center">
          <Select
            value={statusFilter}
            onValueChange={(e) => setStatusFilter(e)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Pending" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Pending</SelectItem>
              <SelectItem value="1">Accepted</SelectItem>
              <SelectItem value="2">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex pl-5">
            <MoveLeft />
            <span className="text-base font-semibold pl-4">Back</span>
          </div>
        </div>
      </div>
      <EnrollmentCourseList status={statusFilter} />
    </div>
  );
};

export default EnrollmentRequestPage;
