import api from "./api";


export const fetchAssessment = (id: string) => {
    const url = `api/v1/question/get-assessment-scores/${id}`;

    return api({ url });
};