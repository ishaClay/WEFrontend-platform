export interface AllCourseResponse {
  data: CourseEntity[];
}

export interface CourseEntity {
  id: number;
  version: number;
  createdAt: string;
  course: {
    id: number;
    bannerImage: string;
    courseData: {
      maturityId: number;
      pillarId: number;
    }[];
    createdAt: string;
    deletedAt: any;
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
    deletedAt: any;
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
