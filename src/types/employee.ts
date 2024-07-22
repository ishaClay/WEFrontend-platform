export interface MeasuresItemsResponse {
    data?: (DataEntity)[] | null;
    metadata: Metadata;
    message: string;
}
export interface DataEntity {
    id: number;
    name?: null;
    email: string;
    status: string;
    employeeStatus: string;
    profileImage?: null;
    deletedAt?: null;
    createdAt: string;
    updatedAt: string;
    courseAllotedCount: number;
}
export interface Metadata {
    totalItems: number;
    currentPage: number;
    totalPages: number;
}


export interface EmployeeActionResponse {
    data: Data;
    message: string;
}
export interface Data {
    myActionItems: MyActionItems;
    measure?: (MeasureEntity)[] | null;
}
export interface MyActionItems {
    delayed: number;
    ontime: number;
    completed: number;
    assigned: number;
}
export interface MeasureEntity {
    id: number;
    measure: string;
    startDate: string;
    endDate: string;
    evidence?: null;
    iscompleted: number;
    empAssignDate?: null;
    createdAt: string;
    updatedAt: string;
    deletedAt?: null;
}
