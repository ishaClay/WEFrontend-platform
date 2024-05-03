import api from "./api";

export const fetchQuestionList = (clientId: string) => {
    const url = `api/v1/question/list`;

    let params: any = {};
    params["clientId"] = clientId;

    return api({ url, params });
};


export const addAnswer = (data: any) => {
    const url = `api/v1/question/add-answer`;
    
    return api({ url, data, method: "post" });
};

export const updateAnswer = (data: any) => {
    const url = `api/v1/question/add-answer`;

    return api({ url, data, method: "put" });
};
