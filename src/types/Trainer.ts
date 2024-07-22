export interface Trainer {
    id?: string,
    providerName: string,
    providerType: string,
    providerCity: string,
    providerCountry: string,
    surname: string,
    number: string,
    ProviderAddress: string,
    ProviderCountry: string,
    name: string,
    email: string,
    ProviderNotes: string,
}

export interface TrainersResponse {
    data?: (DataEntity)[] | null;
    metadata: Metadata;
    message: string;
}

export interface TrainersByIdResponse {
    data?: (DataEntity)
}
export interface DataEntity {
    id: number;
    name: string;
    email: string;
    phone: string;
    imageUrl: string;
    providerName: string;
    providerType: string;
    surname?: null;
    course: CourseDataResponse[];
    foreignProvider?: null;
    providerAddress?: string | null;
    providerCity: string;
    profileImage: string;
    providerCounty: string;
    providerNotes: string;
    approved: boolean;
    status: number;
    deletedAt?: null;
    rating: number;
    createdAt: string;
    updatedAt: string;
}
export interface Metadata {
    totalItems: number;
    currentPage: number;
    totalPages: number;
}


export enum TrainerStatus {
    Inactive = 0,
    Active = 1,
    Pending = 2,
}

export interface CourseDataResponse {
    id: number;
    title: string;
    institute: string;
    instituteWebsite: string;
    instituteWebsite2: string;
    freeCourse: number;
    discout: number;
    discountApplicable: number;
    provider: number;
    ectsCredits: string;
    fetCredits: string;
    time: number;
    isOnline: number;
    universityAddress: string;
    duration: string;
    price: number;
    instituteOther: string;
    otherInstitutionName: string;
    description: string;
    bannerImage: string;
    keys: string;
    courseData: (CourseDataEntity)[];
    status: string;
    deletedAt?: null;
    createdAt: string;
    updatedAt: string;
}

export interface CourseDataEntity {
    pillarId: number;
    maturityId: number;
    fetchMaturity: FetchMaturity;
    fetchPillar: FetchPillar;
}
export interface FetchMaturity {
    id: number;
    maturityLevelName: string;
    rangeStart: number;
    rangeEnd: number;
    color: string;
    deletedAt?: null;
    createdAt: string;
    updatedAt: string;
}
export interface FetchPillar {
    id: number;
    pillarName: string;
    deletedAt?: null;
    createdAt: string;
    updatedAt: string;
}
