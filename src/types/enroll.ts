
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


export interface FetchEnrollRequestDataType {
  id: number;
  request: number;
  enroll: number;
  createdAt: string;
  updatedAt: string;
  courseVersion: EnrollRequestCourseVersion;
  company: EnrollRequestCompany;
  employee?: EmployeeType[] | null;
}
export interface EmployeeType {
  id: number;
  name?: null;
  email: string;
  status: string;
  employeeStatus: string;
  profileImage?: null;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
}

export interface EnrollRequestCourseVersion {
  id: number;
  version: number;
  data?: null;
  createdAt: string;
  updatedAt: string;
  course: EnrollRequestCourse;
}
export interface EnrollRequestCourse {
  id: number;
  title: string;
  institute: string;
  instituteWebsite: string;
  instituteWebsite2: string;
  freeCourse: number;
  discout: number;
  discountApplicable: number;
  provider: number;
  ectsCredits?: string;
  fetCredits: string;
  time: number;
  isOnline: number;
  universityAddress: string;
  duration: string;
  price: number;
  instituteOther: string;
  otherInstitutionName: string;
  description: string;
  bannerImage: string;
  keys: string;
  courseData?: (CourseDataEntity)[] | null;
  status: string;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
  trainerCompanyId: TrainerCompanyId;
  trainerId?: null;
}
export interface CourseDataEntity {
  pillarId: number;
  maturityId: number;
  fetchMaturity: FetchMaturity;
  fetchPillar: FetchPillar;
}
export interface FetchMaturity {
  id: number;
  maturityLevelName: string;
  rangeStart: number;
  rangeEnd: number;
  color: string;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
}
export interface FetchPillar {
  id: number;
  pillarName: string;
  checked: number;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
}
export interface TrainerCompanyId {
  id: number;
  providerName: string;
  providerType: string;
  providerCity: string;
  providerCounty: string;
  contactSurname: string;
  contactTelephone: string;
  foreignProvider: boolean;
  providerAddress: string;
  providerCountry: string;
  contactFirstName?: null;
  providerNotes: string;
  approved: boolean;
  pillarLimit: number;
  status: string;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
}
export interface EnrollRequestCompany {
  id: number;
  companyId?: null;
  name: string;
  address?: null;
  county?: null;
  soleTrader?: null;
  sector?: null;
  averageNumberOfEmployees?: null;
  parentCompanyName?: null;
  parentCompanyAddress?: null;
  parentCompanyCounty?: null;
  note?: null;
  status: string;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
}
