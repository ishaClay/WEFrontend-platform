import { DashboardFilterType } from "@/types/common";
import api from "./api";
import {
  EnrollmentCountResponse,
  EnrollmentsRequestsFigureResponse,
  SupportTicketsCountResponse,
  TrainerCountResponse,
  TrainerCourseOverviewResponse,
} from "@/types/TrainerAdminDashboard";

export const getFirstInfirgraphicChart = async ({
  userId,
  clientId,
}: {
  userId: string;
  clientId: string;
}) => {
  const url = `api/v1/question/get-total-Assessment-scores/${userId}?clientId=${clientId}`;
  const res = await api({ url });
  return res.data;
};

export const getSmeDashboardData = async ({ userId }: { userId: string }) => {
  const url = `api/v1/dashboard/compnyData/${userId}`;
  const res = await api({ url });
  return res.data;
};

export const getSmeUpcomingLiveSession = async ({
  userId,
}: {
  userId: string;
}) => {
  const url = `api/v1/livesessions/getCompanyupcomingLiveSession/${userId}`;
  const res = await api({ url });
  return res.data;
};

export const getDashbooardSme3 = async ({ userId }: { userId: string }) => {
  const url = `api/v1/dashboard/compnyCourseCount/${userId}`;
  const res = await api({ url });
  return res.data;
};

export const getEnrolledCourses = async () => {
  const url = `api/v1/course/enroll/trend`;
  const res = await api({ url });
  return res.data;
};

export const getUpcommingLiveSession = async ({
  userId,
}: {
  userId: string;
}) => {
  const url = `api/v1/dashboard/getemployeeLiveSession/${userId}`;
  const res = await api({ url });
  return res.data;
};

export const getTraineeData = async ({ userId }: { userId: string }) => {
  const url = `api/v1/dashboard/getTrainerDashboardCountData/${userId}`;
  const res = await api({ url });
  return res.data;
};

export const getTrainerData = async ({
  userId,
  contentType,
}: {
  userId: string;
  contentType: string;
}) => {
  const url = `api/v1/dashboard/trainerCompanyCourseCount/${userId}?contentRequest=${contentType}`;
  const res = await api({ url });
  return res.data;
};

export const getCourseCompletionData = async (companyId: number) => {
  const url = `api/v1/dashboard/course-completion?companyId=${companyId}`;
  const res = await api({ url });
  return res.data;
};

export const fetchTopCourseList = async () => {
  const url = `api/v1/course/top/list`;
  const res = await api({ url });
  return res.data;
};

export const fetchCourseOverview = async (
  userID: number,
  filter: DashboardFilterType
): Promise<TrainerCourseOverviewResponse> => {
  const url = `api/v1/dashboard/course-over-view/${userID}?filter=${
    filter === "today" ? "" : filter
  }`;
  const res = await api({ url });
  return res.data;
};

export const fetchEnrollmentCounts = async (
  userID: number,
  filter: DashboardFilterType
): Promise<EnrollmentCountResponse> => {
  const url = `api/v1/dashboard/get-enrollments/${userID}?filter=${
    filter === "today" ? "" : filter
  }`;
  const res = await api({ url });
  return res.data;
};

export const fetchSupportTicketsCounts = async (
  userID: number,
  filter: DashboardFilterType
): Promise<SupportTicketsCountResponse> => {
  const url = `api/v1/dashboard/get-support-ticket/${userID}?filter=${
    filter === "today" ? "" : filter
  }`;
  const res = await api({ url });
  return res.data;
};

export const fetchTrainerCounts = async (
  userID: number,
  filter: DashboardFilterType
): Promise<TrainerCountResponse> => {
  const url = `api/v1/dashboard/get-trainer/${userID}?filter=${
    filter === "today" ? "" : filter
  }`;
  const res = await api({ url });
  return res.data;
};

export const fetchEnrollmentFigures = async (
  userID: number,
  filter: DashboardFilterType
): Promise<EnrollmentsRequestsFigureResponse> => {
  const url = `api/v1/dashboard/get-enrollment-figure/${userID}?filter=${
    filter === "today" ? "" : filter
  }`;
  const res = await api({ url });
  return res.data;
};
