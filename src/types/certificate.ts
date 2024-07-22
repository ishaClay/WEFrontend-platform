export interface CertificateResponse {
    data?: (DataEntity)[] | null;
    pagination: Pagination;
    message: string;
}
export interface DataEntity {
    id: number;
    templateName: string;
    backgroundImage: string;
    logoImage: string;
    title: string;
    employeeName: string;
    bodyText: string;
    administratorTitle: string;
    administratorSignature: string;
    instructorTitle: string;
    instructorSignature: string;
}
export interface Pagination {
    totalItems: number;
    currentPage: number;
    totalPages: number;
    nextPage?: null;
    previousPage?: null;
}
export interface GetCertificate {
    data?: (DataEntity)[] | null;
    message: string;
  }
  export interface DataEntity {
    id: number;
    templateName: string;
    backgroundImage: string;
    logoImage: string;
    title: string;
    bodyText: string;
    administratorTitle: string;
    administratorSignature: string;
    instructorTitle: string;
    instructorSignature: string;
    deletedAt?: null;
    createdAt: string;
    updatedAt: string;
  }
  