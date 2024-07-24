export interface CertificateResponse {
  data?: DataEntity[] | null;
  pagination: Pagination;
  message: string;
}
export interface DataEntity {
  id: number;
  templateName: string;
  backgroundImage: string;
  logoImage: string;
  title: string;
  employeeName: string;
  bodyText: string;
  administratorTitle: string;
  administratorSignature: string;
  instructorTitle: string;
  instructorSignature: string;
}
export interface Pagination {
  totalItems: number;
  currentPage: number;
  totalPages: number;
  nextPage?: null;
  previousPage?: null;
}

export interface GetCertificate {
  data?: DataEntity[] | null;
  message: string;
}
export interface DataEntity {
  id: number;
  templateName: string;
  backgroundImage: string;
  logoImage: string;
  title: string;
  bodyText: string;
  administratorTitle: string;
  administratorSignature: string;
  instructorTitle: string;
  instructorSignature: string;
  cretificateText: string;
  companyLogo: string;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
}

export interface updateCertificate {
  user: number;
  templateName: string;
  backgroundImage: string;
  cretificateText:string;
  title: string;
  bodyText: string;
  administratorTitle: string;
  instructorTitle: string;
  instructorSignature: string;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
  companyLogo:string;
  message: string;
}
export interface IssuedCertificate {
  data?: certificateDataEntity[] | null;
  message: string;
}
export interface certificateDataEntity {
  id: number;
  certificatePdf?: null;
  status: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: null;
  employee: Employee;
  course: Course;
}
export interface Employee {
  id: number;
  name?: string | null;
  email: string;
  status: string;
  employeeStatus: string;
  profileImage?: null;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
  editActionItem: boolean;
  retakeSelfAssessment: boolean;
  shareFeedback: boolean;
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
  ectsCredits: string;
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
  courseData?: CourseDataEntity[] | null;
  status: string;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
}
export interface CourseDataEntity {
  pillarId: number;
  maturityId: number;
}
