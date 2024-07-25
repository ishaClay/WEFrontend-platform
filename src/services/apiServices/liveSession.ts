import api from "./api";

export const updateLiveSession = ({data, id}: any) => {
    const url = `api/v1/livesessions/updateLivesession/${id}`;

    return api({ url, data, method: "put" });
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

export const getLiveSession = (id: string) => {
    const url = `api/v1/course/get/${id}`;
    return api({ url });
};