import api from "./api";

export const fetchFaqs = (value: string) => {
    const url = `api/v1/faq/list`
    let params: any = {}
    if (value) {
        params["targetAudience"] = value
    }
    return api({ url, params });
};