export interface AllCourse {
  id: number;
  title: string;
  institute: string;
  instituteWebsite: string;
  instituteWebsite2: string;
  freeCourse: freeCource;
  discout: Discout;
  discountApplicable: number;
  provider: Provider;
  ectsCredits: string;
  fetCredits: string;
  time: CourseTime;
  isOnline: IsOnline;
  duration: string;
  price: number;
  instituteOther: string;
  otherInstitutionName: string;
  description: string;
  bannerImage: string;
  page: number;
  cohortGroups: CohortData[],
  courseAlloted: courseAlloted[];
  courseData: [
    {
      pillarId: number;
      maturityId: number;
      fetchMaturity: {
        id: number;
        maturityLevelName: string;
        rangeStart: number;
        rangeEnd: number;
        color: string;
      };
      fetchPillar: {
        id: number;
        pillarName: string;
        checked: number;
      };
    }
  ];
  trainerCompanyId: {
    id: number;
  };
  trainerId: {
    id: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CohortData {
  id: number;
  slotEndDate: {
    date: string;
    month: string;
    year: string;
  };
  slotStartDate: {
    date: string;
    month: string;
    year: string;
  };
}

export interface courseAlloted {
  id: number;
  request: number;
  enroll: number;
  createdAt: string;
  updatedAt: string;
  user: UserData;
  course: {
    id: number;
  }
}
export interface UserData {
  id: number;
  name: string;
  email: string;
  password: string;
  role: number;
  lastLogin: string;
  lastLogout: string;
  pathStatus: number;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
}


// export enum CourseStatus {
//   Published = "PUBLISHED",
//   Hold = "HOLD",
// }

export enum freeCource {
  true = 1,
  false = 0,
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

export enum Provider {
  true = 1,
  false = 0,
}
export enum Discout {
  true = 1,
  false = 0,
}

export interface Pillarcourse {
  id: number;
  pillarName: string;
}
