import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MoveLeft } from "lucide-react";
import { useState } from "react";
import EnrollmentCourseList from "./EnrollmentCourseList";

const EnrollmentRequestPage = () => {
  const [statusFilter, setStatusFilter] = useState("0");

  return (
    <div className="bg-white">
      <div className="flex justify-between items-center py-2 px-4 border-b border-[#D9D9D9] mb-7">
        <div>
          <h6 className="text-base font-bold font-nunito">
            Enrollment Requests
          </h6>
          <p className="text-[#606060] text-[15px] font-abhaya leading-[15px]">
            Here are all the company requests to enroll in your courses
          </p>
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
              <SelectItem value="0">All</SelectItem>
              <SelectItem value="3">Pending</SelectItem>
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
