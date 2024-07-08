export interface GetSingleCourseByIdType {
  data: GetSingleCourseEntity;
}
export interface GetSingleCourseEntity {
  id: number;
  version: number;
  createdAt: string;
  updatedAt: string;
  course: CourseData;
  cohortGroups?: (CohortGroupsEntity)[] | null;
}
export interface CourseData {
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
  universityAddress?: null;
  duration: string;
  price: number;
  instituteOther: string;
  otherInstitutionName: string;
  description: string;
  bannerImage: string;
  keys?: null;
  courseData?: (CourseDataEntity)[] | null;
  certificate?: CertificateType | null;
  status: string;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
  nfqLeval: NfqLeval;
}
export interface CourseDataEntity {
  pillarId: number;
  maturityId: number;
}
export interface CertificateType {
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
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
}

export interface NfqLeval {
  id: number;
  leval: string;
  status: string;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
}
export interface CohortGroupsEntity {
  id: number;
  slotStartDate: SlotStartDateOrSlotEndDate;
  slotEndDate: SlotStartDateOrSlotEndDate;
}
export interface SlotStartDateOrSlotEndDate {
  date: string;
  month: string;
  year: string;
}

export interface PublishCourseType {
  id: number;
  status: string;
}