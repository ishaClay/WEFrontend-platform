import api from "./api";

export const createLiveSession = (data: any) => {
    console.log("data", data);
    
    const url = `api/v1/course/module/section/create`;

    return api({ url, data, method: "post" });
};


export const createLiveSection = async(data: any) => {
    const url = `api/v1/course/module/section/create`,
    method = "post";
    

    const res = await api({ url, method, data: [data]});
    return res
}

export const getALlLiveSession = () => {
    const url = `api/v1/livesessions/list`;
    return api({ url });
};