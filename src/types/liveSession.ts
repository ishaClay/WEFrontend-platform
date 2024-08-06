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
