export interface AllCourseResponse {
  data: CourseEntity[];
}

export interface CourseEntity {
  id: number;
  version: number;
  createdAt: string;
  subtitle: string;
  rating: number;
  course: {
    id: number;
    bannerImage: string;
    courseData: {
      maturityId: number;
      pillarId: number;
    }[];
    createdAt: string;
    deletedAt: string;
    description: string;
    discountApplicable: number;
    discout: number;
    duration: string;
    ectsCredits: string;
    fetCredits: string;
    freeCourse: number;
    institute: string;
    instituteOther: string;
    instituteWebsite: string;
    instituteWebsite2: string;
    isOnline: number;
    keys: {
      key: string;
    }[];
    otherInstitutionName: string;
    price: number;
    provider: number;
    status: string;
    time: number;
    title: string;
    updatedAt: string;
  };
  data: {
    id: number;
    bannerImage: string;
    courseData: {
      maturityId: number;
      pillarId: number;
    }[];
    createdAt: string;
    deletedAt: string;
    description: string;
    discountApplicable: number;
    discout: number;
    duration: string;
    ectsCredits: string;
    fetCredits: string;
    freeCourse: number;
    institute: string;
    instituteOther: string;
    instituteWebsite: string;
    instituteWebsite2: string;
    isOnline: number;
    keys: {
      key: string;
    }[];
    module: any[];
    otherInstitutionName: string;
    price: number;
    provider: number;
    status: string;
    time: number;
    title: string;
    updatedAt: string;
  };
}

export interface CourseResponse {
  data?: DataEntity[];
  message: string;
}
export interface DataEntity {
  id: number;
  version: number;
  data: Data;
  createdAt: string;
  updatedAt: string;
  course: Course;
}
export interface Data {
  id: number;
  title: string;
  institute: string;
  instituteWebsite: string;
  instituteWebsite2?: string | null;
  freeCourse: number;
  discout: number;
  discountApplicable: number;
  provider: number;
  ectsCredits: string;
  fetCredits: string;
  time: number;
  isOnline: number;
  duration?: string | null;
  price?: number | null;
  instituteOther: string;
  otherInstitutionName: string;
  description: string;
  bannerImage: string;
  keys?: KeysEntity[] | null;
  courseData?: CourseDataEntity[] | null;
  status: string;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
  module?: null[] | null;
}
export interface KeysEntity {
  key: string;
}
export interface CourseDataEntity {
  pillarId: number;
  maturityId: number;
}
export interface Course {
  id: number;
  title: string;
  institute: string;
  instituteWebsite: string;
  instituteWebsite2?: string | null;
  freeCourse: number;
  discout: number;
  discountApplicable: number;
  provider: number;
  ectsCredits: string;
  fetCredits: string;
  time: number;
  isOnline: number;
  duration: string;
  price?: number | null;
  instituteOther: string;
  otherInstitutionName: string;
  description: string;
  bannerImage: string;
  keys?: KeysEntity[] | null;
  courseData?: CourseDataEntity[] | null;
  status: string;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
}

export interface AllCoursesResponse {
  data: (AllCoursesResult)[];
  message: string;
}
export interface AllCoursesResult {
  id: number;
  title: string;
  institute: string;
  instituteWebsite: string;
  instituteWebsite2: string;
  freeCourse: number;
  discout: number;
  discountApplicable: number;
  provider: number;
  ectsCredits?: string | null;
  fetCredits?: string | null;
  time: number;
  isOnline: number;
  universityAddress?: string | null;
  duration?: string | null;
  price?: number | null;
  instituteOther?: string | null;
  otherInstitutionName?: string | null;
  description?: string | null;
  bannerImage: string;
  keys?: string | null;
  courseData?: (CourseDataEntity | null)[] | null;
  status: string;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
  trainerId: TrainerId;
  trainerCompanyId: TrainerCompanyId;
  version?: (VersionEntity | null)[] | null;
  module?: (null)[] | null;
}
export interface CourseDataEntity {
  pillarId: number;
  maturityId: number;
}
export interface TrainerId {
  id: number;
  name?: null;
  surname?: null;
  gender?: null;
  ageRange?: null;
  email: string;
  phone?: null;
  currentHighestNFQ?: null;
  employmentStatus: string;
  foreignProvider?: null;
  providerAddress?: null;
  providerCity?: null;
  providerCounty?: null;
  attendedEvent?: null;
  providerName?: null;
  memberCompany?: null;
  occupationalCategory?: null;
  unemploymentTime?: null;
  countyOfResidence?: null;
  approved: boolean;
  status: number;
  rating: number;
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
  contactFirstName?: string | null;
  providerNotes: string;
  approved: boolean;
  pillarLimit: number;
  status: string;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
}
export interface VersionEntity {
  id: number;
  version: number;
  createdAt: string;
  updatedAt: string;
  data: Course1;
}
export interface Course1 {
  id: number;
  title: string;
  institute: string;
  instituteWebsite: string;
  instituteWebsite2: string;
  freeCourse: number;
  discout: number;
  discountApplicable: number;
  provider: number;
  ectsCredits?: string | null;
  fetCredits?: string | null;
  time: number;
  isOnline: number;
  universityAddress?: string | null;
  duration?: string | null;
  price?: number | null;
  instituteOther?: string | null;
  otherInstitutionName?: string | null;
  description?: string | null;
  bannerImage: string;
  keys?: string | null;
  courseData?: (CourseDataEntity1 | null)[] | null;
  trainerId: TrainerId;
  trainerCompanyId: TrainerCompanyId;
  status: string;
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}
export interface CourseDataEntity1 {
  pillarId: number;
  maturityId: number;
}
