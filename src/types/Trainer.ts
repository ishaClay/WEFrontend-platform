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
    number: string;
    imageUrl: string;
    providerName: string;
    providerType: string;
    surname?: null;
    foreignProvider?: null;
    providerAddress?: string | null;
    providerCity: string;
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