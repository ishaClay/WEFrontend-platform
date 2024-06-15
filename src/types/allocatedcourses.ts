export interface AllocatedCourse {
  id: number;
  request: number;
  enroll: number;
  courses?: AllocatedCourse[];
  course: {
    id: number;
    title: string;
    institute: string;
    instituteWebsite: string;
    instituteWebsite2: string;
    freeCourse: number;
    bannerImage: string;
    description: string;
    discout: number;
    discountApplicable: number;
    provider: number;
    ectsCredits: string;
    fetCredits: string;
    time: CourseTime;
    isOnline: IsOnline;
    duration: string;
    price: number;
    instituteOther: string;
    otherInstitutionName: string;
  };
}

export enum CourseTime {
  FullTime = 0,
  PartTime = 1,
}
export enum IsOnline {
  Online = 0,
  InPerson = 1,
  Hybrid = 2,
}
