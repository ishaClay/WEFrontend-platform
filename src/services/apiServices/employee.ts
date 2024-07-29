import {
  EmployeeDetailsResponse,
  EmployeeResponse,
} from "@/types/employeeDetails";
import api from "./api";
import { EmployeeCourse } from "@/types/employee";

interface RegisterEmployee {
  name: string;
  email: string;
  password: string;
  cpassword: string;
  otp: number;
}

export const InviteSingleEmployee = async (data: any) => {
  const url = `api/v1/employee/invitation-employee-course`;
  const res = await api({ url, method: "post", data });
  return res.data;
};

export const EmployeeList = async (id: string, status: string) => {
  const url = `api/v1/employee/list?companyId=${id}&limit=1000000000&page=1&keyword&status=${status}`;
  const res = await api({ url });
  return res.data;
};

export const assignItemForEmployee = async ({
  data,
  masureId,
}: {
  data: {
    employeeId: string;
    startDate: Date | undefined;
    endDate: Date | undefined;
  };
  masureId: number;
}) => {
  const url = `api/v1/pillar/update-measures-items/${masureId}`;
  const res = await api({ url, method: "put", data });
  return res.data;
};

export const inviteSingleEmployeeDetail = async (
  id: string
): Promise<EmployeeDetailsResponse> => {
  const url = `api/v1/employee/get/${id}`;
  const res = await api({ url });
  return res.data.data;
};

export const employeeList = async (
  page: string,
  limit: string,
  id: number,
  keyword: string
) => {
  const url = `api/v1/company/get/${id}/employee`;
  const params = { page, limit, keyword };
  const res = await api({ url, params });
  return res.data;
};

export const updateEmployeeList = async (data: {
  id: number;
  item: Partial<EmployeeResponse>;
}) => {
  const url = `/api/v1/employee/update/${data.id}/permission`;
  const method = "patch";
  return api({ url, data: data?.item, method });
};

export const RegisterEmployee = async (data: RegisterEmployee) => {
  const url = `api/v1/user/register-employee`;
  const res = await api({ url, method: "post", data });
  return res.data;
};

export const deleteEmployee = async (id: number) => {
  const url = `api/v1/employee/delete/${id}`;
  const res = await api({ url, method: "delete" });
  return res.data;
};

export const getEmployeeWiseAction = async (id: number) => {
  const url = `api/v1/employee/getActions/${id}`;
  const res = await api({ url });
  return res.data;
};

export const getDashboardEmployeeCourse = async (
  id: number
): Promise<EmployeeCourse> => {
  const url = `api/v1/dashboard/employeeCourseCount/${id}`;
  const res = await api({ url });
  return res.data.data;
};
