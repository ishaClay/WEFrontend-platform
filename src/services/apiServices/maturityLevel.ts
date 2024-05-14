import api from "./api";



export const fetchmaturityLevel = () => {
    const url = `api/v1/maturity-level/list`;
    return api({ url });
};

export const fetchClientwiseMaturityLevel = (id: string) => {
    const url = `api/v1/maturity-level/list?clientId=${id}`;
    return api({ url });
};