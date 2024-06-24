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
    company: Company;
  };
}

export interface Company {
  id: number;
  companyId?: null;
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
  employee: Employee[];
}

export interface Employee {
  id: number;
  name: string;
  email: string;
  status: string;
  employeeStatus: string;
  profileImage: string;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
}


export enum CourseTime {
  FullTime = 0,
  PartTime = 1,
}
export enum IsOnline {
  Online = 0, InPerson = 1, Hybrid = 2, Major = 3
}
