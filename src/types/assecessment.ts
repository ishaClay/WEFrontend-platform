export interface AssecessmentCreation {
    section: string;
    title: string;
    percentage: string;
    timeBound: string;
    duration: string;
    question: QuestionCreation[]
}

export interface QuestionCreation {
    question: string,
    point: number,
    options: [{
        option: string;
    }],
    assessmentType: string,
    answer: string[] | string
}

export interface AssessmentById {
    data: Data;
    message: string;
}
export interface Data {
    id: number;
    title: string;
    passingPercentage: string;
    timeBound: number;
    timeDuration: string;
    deletedAt?: null;
    createdAt: string;
    updatedAt: string;
    moduleSection: ModuleSection;
}
export interface ModuleSection {
    id: number;
    title: string;
    information: string;
    documentType: number;
    url: string;
    uploadContent: string;
    attachment: string;
    duration?: null;
    formate?: null;
    position: number;
    readingTime: ReadingTime;
    isLive: number;
    deletedAt?: null;
    createdAt: string;
    updatedAt: string;
}
export interface ReadingTime {
    hour: number;
    minute: number;
    second: number;
}
