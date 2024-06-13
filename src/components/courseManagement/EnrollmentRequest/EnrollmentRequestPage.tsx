import React from "react";
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
  return (
    <div className="bg-white">
      <div className="flex justify-between items-center p-5 border-b border-[#D9D9D9] mb-7">
        <div>
          <h6 className="text-base font-bold">Enrollment Requests</h6>
        </div>
        <div className="flex items-center">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Pending" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Accepted">Accepted</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex pl-5">
            <MoveLeft />
            <span className="text-base font-semibold pl-4">Back</span>
          </div>
        </div>
      </div>
      <EnrollmentCourseList />
    </div>
  );
};

export default EnrollmentRequestPage;
