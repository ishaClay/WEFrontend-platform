export interface EmployeeInvition {
    companyId:string;
    email:string[];
    csvUrl:string;
    invitationDetails:string;
}

export interface EmployeePayload {
    companyId:string;
    email:string[];
    csvUrl:string;
    invitationDetails:string;
}

export interface EmployeeEntity {
    id: string;
    name?: null;
    email: string;
    status: string;
    employeeStatus: string;
    profileImage?:string;
    deletedAt?: null;
    createdAt: string;
    updatedAt: string;
    courseAlloted?: null[] | null;
    courseAllotedCount: number;
  }
  