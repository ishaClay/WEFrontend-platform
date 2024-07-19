
export interface enroll {
  versionId?: number;
  companyId?: number;
  numberOfEmployee?: number;
  price?: number;
  cohortGroupId?: number;
  isdiscounted?: number;
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
  cohortGroup: CohortGroupType[];
}
export interface CohortGroupType {
  id: number;
  name: string;
  publish: number;
  slotStartDate: SlotStartDateOrSlotEndDate;
  slotEndDate: SlotStartDateOrSlotEndDate;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
  company: EnrollRequestCompany[] | null;
  employee?: EmployeeType[] | null;
  cohortStatus: string;
}
export interface SlotStartDateOrSlotEndDate {
  date: string;
  month: string;
  year: string;
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
  courseData?: (CourseDataEntity)[] | null;
  status: string;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
}

export interface EnrolledCoursesType {
  id: number;
  version: number;
  course: Course;
  cohortGroup: CohortGroupType[];
  createdAt: string;
  updatedAt: string;
  numberOfEmployee: number;
  numberOfCompany: number;
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
export interface EmployeeType {
  id: number;
  name?: string | null;
  email: string;
  status: string;
  employeeStatus: string;
  profileImage?: null;
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  editActionItem: boolean;
  retakeSelfAssessment: boolean;
  shareFeedback: boolean;
  progress: number;
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
