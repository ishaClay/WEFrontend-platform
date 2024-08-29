import { Course } from "./course";

export interface AssesmentDashboardData {
    data: AssesmentDashboardResponse;
    message: string;
}
export interface AssesmentDashboardResponse {
    avTotalquestionsattempted: number;
    avTotalquestionsavailable: number;
    avTotalmaxpoint: number;
    avTotalpoints: number;
}


export interface DashboardData {
    data: DashboardDataResponse;
    message: string;
}
export interface DashboardDataResponse {
    lastAssessmentTakenOn: string;
    totalActionItems: TotalActionItems;
    pendingActionItems: number;
    supportTickets: SupportTickets;
    upcomingCourses: number;
    upcomingCoursesList: (Course)[];
}
export interface TotalActionItems {
    metric: number;
    report: Report;
}
export interface Report {
    completed: number;
    open: number;
    delayed: number;
}
export interface SupportTickets {
    open: OpenOrResolved;
    resolved: OpenOrResolved;
}
export interface OpenOrResolved {
    high: number;
    medium: number;
    low: number;
}

export interface SMEDashboard3Response {
    data: Data;
    message: string;
}
export interface Data {
    overView: OverView;
    courses?: (null)[] | null;
    employeePerformanceOverview: EmployeePerformanceOverview;
}
export interface OverView {
    totalCourse: number;
    completedCourse: number;
    onGoingCourse: number;
}
export interface EmployeePerformanceOverview {
    totalCourse: number;
    coursesCompletion?: null;
}

export interface EmployeeDashboardResponse {
    sessions: (SessionsEntity)[];
    upcomingSessionsCount: number;
}
export interface SessionsEntity {
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
    course: Course;
}

export interface SMEEnrollDashboardResponse {
    data: (DataEntity)[];
    message: string;
}
export interface DataEntity {
    month: string;
    enrollmentsCount: number;
}
