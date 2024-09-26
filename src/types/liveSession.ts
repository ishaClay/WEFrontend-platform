export interface AllLivesessions {
  id: string;
  liveSecTitle: string;
  subtitle: string;
  liveSecinformation: string;
  numberOfEmployees: string;
  date: string;
  description: string;
  zoomApiBaseUrl: any;
  startTime: string;
  startAmPm: string;
  sessionDuration: any;
  sectionTime: LiveSessionSectionTime;
  position: number;
  isLive: number;
  deletedAt: any;
  createdAt: string;
  updatedAt: string;
  trainer: LiveSessionTrainer[];
  company?: any[];
  course?: any;
  employee: EmployeeLivesessionsEntity[];
}
export interface EmployeeLivesessionsEntity {
  id: number;
  name: string;
  email: string;
  status: string;
  employeeStatus: string;
  gender?: null;
  ageRange?: null;
  phone?: null;
  nFQ?: null;
  employmentStatus?: null;
  memberCompany?: null;
  occupationalCategory?: null;
  unemploymentTime?: null;
  countyOfResidence?: null;
  attendedEvent?: null;
  profileImage?: null;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
  editActionItem: boolean;
  retakeSelfAssessment: boolean;
  shareFeedback: boolean;
}


export interface LiveSessionSectionTime {
  hour: number;
  minute: number;
}

export interface LiveSessionTrainer {
  id: number;
  name: string;
  surname: any;
  gender: any;
  profileImage: any;
  ageRange: any;
  email: string;
  phone: any;
  currentHighestNFQ: any;
  employmentStatus: string;
  foreignProvider: any;
  providerAddress?: string;
  providerCity: string;
  providerCounty: string;
  attendedEvent: any;
  providerName: string;
  providerType: any;
  providerNotes: any;
  memberCompany: any;
  occupationalCategory: any;
  unemploymentTime: any;
  countyOfResidence: any;
  approved: boolean;
  editCourses: boolean;
  status: number;
  rating: number;
  deletedAt: any;
  createdAt: string;
  updatedAt: string;
}

export interface PermissionResponse {
  data: Data;
  message: string;
}
export interface Data {
  id: number;
  zoomPortal: number;
  createdAt: string;
  updatedAt: string;
}


export interface SingleLiveSession {
  data: Data;
  message: string;
}
export interface Data {
  id: number;
  platform: number;
  zoomApiBaseUrl: string;
  subtitle: string;
  description: string;
  date: string;
  startTime: string;
  startAmPm?: null;
  sessionDuration: number;
  position?: null;
  liveSecinformation: string;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
  employee?: (EmployeeEntity)[] | null;
  trainerOrganization: any;
  trainer: any;
  status: string;
  cohortGroup?: null;
}
export interface EmployeeEntity {
  id: number;
  name: string;
  email: string;
  status: string;
  employeeStatus: string;
  gender: string;
  ageRange: string;
  phone: string;
  nFQ?: null;
  employmentStatus: string;
  memberCompany: string;
  occupationalCategory: string;
  unemploymentTime: string;
  countyOfResidence: string;
  attendedEvent: string;
  profileImage?: null;
  isRegister: boolean;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
  editActionItem: boolean;
  retakeSelfAssessment: boolean;
  shareFeedback: boolean;
}
