import api from "./api";

export const fetchQuestionList = (clientId: string) => {
    const url = `api/v1/question/list`;

    let params: any = {};
    params["clientId"] = clientId;

    return api({ url, params });
};
