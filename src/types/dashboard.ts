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
