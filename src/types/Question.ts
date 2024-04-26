import { Pillar } from "./Pillar";

export interface Option {
    name: string;
    point: number;
    optionId: string;
}

export interface QuestionType {
    id: number;
    title: string;
    maxPoint: number;
    options: Option[];
    deletedAt: string | null;
    createdAt: string;
    updatedAt: string;
    pillar: Pillar;
    hint: string;
}