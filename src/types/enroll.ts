
export interface enroll {
  id?: number;
  courseId: number;
  userId: number;
  trainerId: number;
}

export enum Enroll {
  default = 0,
  accept = 1,
  reject = 2,
  enquiry = 3,
}

export interface EnrollmentRequestsByIdResponse {
  data: Data;
  message: string;
}
export interface Data {
  id: number;
  request: number;
  enroll: number;
  createdAt: string;
  updatedAt: string;
  courseVersion: CourseVersion;
  company: Company;
  employee: (EmployeeEntity)[];
}
export interface CourseVersion {
  id: number;
  version: number;
  createdAt: string;
  updatedAt: string;
  course: Course;
}
export interface Company {
  id: number;
  companyId: string;
  name: string;
  address: string;
  county: string;
  soleTrader: boolean;
  sector: string;
  averageNumberOfEmployees: string;
  parentCompanyName: string;
  parentCompanyAddress: string;
  parentCompanyCounty: string;
  note?: null;
  status: string;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
  employee: (EmployeeEntity)[];
}
export interface EmployeeEntity {
  id: number;
  name?: string;
  email: string;
  status: string;
  employeeStatus: string;
  profileImage?: string;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
}

export interface Course {
  id: number;
  title: string;
  institute: string;
  instituteWebsite: string;
  instituteWebsite2: string;
  freeCourse: number;
  discout: number;
  discountApplicable: number;
  provider: number;
  ectsCredits?: null;
  fetCredits?: null;
  time: number;
  isOnline: number;
  universityAddress?: null;
  duration?: null;
  price?: null;
  instituteOther?: null;
  otherInstitutionName?: null;
  description?: null;
  bannerImage: string;
  keys?: null;
  courseData?: (null)[] | null;
  status: string;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
}
