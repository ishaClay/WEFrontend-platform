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
