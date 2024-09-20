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
