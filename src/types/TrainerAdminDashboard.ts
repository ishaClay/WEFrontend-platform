export type TrainerCourseOverviewResponse = {
  data: TrainerCourseOverview;
  message: string;
};
export type TrainerCourseOverview = {
  publishedCoursesCount: number;
  recentlyUpdatedCourse: number;
  courseFeedbacksCount: number;
};

// Support ticket
export type SupportTicketsCountResponse = {
  data: Data;
  message: string;
};
export type Data = {
  supportTicketsCount: SupportTicketsCount;
};
export type SupportTicketsCount = {
  total: TotalOrOpenOrResolvedOrInProcess;
  open: TotalOrOpenOrResolvedOrInProcess;
  resolved: TotalOrOpenOrResolvedOrInProcess;
  inProcess: TotalOrOpenOrResolvedOrInProcess;
};
export type TotalOrOpenOrResolvedOrInProcess = {
  high: number;
  medium: number;
  low: number;
};

// Enrollment request...
export type EnrollmentCountResponse = {
  data: EnrollmentCount;
  message: string;
};
export type EnrollmentCount = {
  total: number;
  pendingRequest: number;
  approvalRequests: number;
  rejectRequests: number;
  enquireRequests: number;
};

// trainer counts
export type TrainerCountResponse = {
  data: TrainerCount;
  message: string;
};
export type TrainerCount = {
  trainersCount: number;
  courseFeedBack: number;
};

// Enrollments figures

export type EnrollmentsRequestsFigureResponse = {
  data: EnrollmentsRequestsFigure;
  message: string;
};
export type EnrollmentsRequestsFigure = {
  enrollmentsRequestsFigures?: EnrollmentsRequestsFiguresEntity[];
};
export type EnrollmentsRequestsFiguresEntity = {
  course: Course;
  enrolledCompanies?: any[];
  enrolledEmployees?: any[];
};
export type Course = {
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
  certificate?: string | null;
  time: number;
  isOnline: number;
  universityAddress: string;
  duration: string;
  price: number;
  instituteOther: string;
  otherInstitutionName?: string | null;
  description: string;
  bannerImage?: string | null;
  keys: string;
  courseData?: CourseDataEntity[] | null;
  status: string;
  publishDate?: string | null;
  step: string;
  tab: string;
  creationCompleted: boolean;
  deletedAt?: null;
  minorUpdatedAt?: null;
  createdAt: string;
  updatedAt: string;
  courseEnroll?: CourseEnrollEntity[] | null;
};
export type CourseDataEntity = {
  pillarId: number;
  maturityId: number;
};
export type CourseEnrollEntity = {
  id: number;
  numberOfEmployee: string;
  price: number;
  request: number;
  isdiscounted: number;
  enroll: number;
  createdAt: string;
  deletedAt?: null;
  updatedAt: string;
  company: Company;
  employee?: (EmployeeEntity | null)[] | null;
  cohortGroup?: CohortGroup;
};
export type Company = {
  id: number;
  companyId?: string | null;
  name: string;
  address?: string | null;
  county?: string | null;
  soleTrader?: boolean | null;
  sector?: string | null;
  averageNumberOfEmployees?: string | null;
  parentCompanyName?: string | null;
  parentCompanyAddress?: string | null;
  parentCompanyCounty?: string | null;
  note?: null;
  status: string;
  profileImage?: string | null;
  maxEmployeeLimit: string;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
};
export type EmployeeEntity = {
  id: number;
  name: string;
  email: string;
  status: string;
  employeeStatus: string;
  gender?: string | null;
  ageRange?: string | null;
  phone?: string | null;
  nFQ?: null;
  employmentStatus?: string | null;
  memberCompany?: string | null;
  occupationalCategory?: string | null;
  unemploymentTime?: string | null;
  countyOfResidence?: string | null;
  attendedEvent?: string | null;
  profileImage?: string | null;
  isRegister: boolean;
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  editActionItem: boolean;
  retakeSelfAssessment: boolean;
  shareFeedback: boolean;
};

export type CohortGroup = {
  id: number;
  name: string;
  publish: number;
  slotStartDate: SlotStartDateOrSlotEndDate;
  slotEndDate: SlotStartDateOrSlotEndDate;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
};
export type SlotStartDateOrSlotEndDate = {
  date: string;
  year: string;
  month: string;
};
