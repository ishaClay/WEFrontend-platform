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