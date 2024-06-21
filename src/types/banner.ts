export interface GetHomeBannerResponse {
    data?: (DataEntity)[];
    message: string;
    clientData: boolean;
}
export interface DataEntity {
    id: number;
    banner: string;
    title: string;
    content: string;
    buttonTitle: string;
    buttonUrl: string;
    status: string;
    deletedAt?: null;
    createdAt: string;
    updatedAt: string;
}

export interface HomeCourseSlidersResponse {
    data?: (DataEntity)[];
    message: string;
    clientData: boolean;
}
export interface DataEntity {
    id: number;
    courseType: string;
    courseTitle: string;
    content: string;
    courseImage: string;
    buttonTitle: string;
    status: string;
    deletedAt?: null;
    createdAt: string;
    updatedAt: string;
}
