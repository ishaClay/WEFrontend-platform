export interface EmployeeDetailsResponse {
  id: number;
  name: string;
  email: string;
  status: string;
  employeeStatus: string;
  profileImage?: null;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
  employeeDetails: EmployeeDetails;
}
export interface EmployeeDetails {
  id: number;
  name: string;
  email: string;
  password: string;
  role: number;
  lastLogin?: null;
  isVerify: number;
  lastLogout?: null;
  pathStatus: number;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
}
