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
