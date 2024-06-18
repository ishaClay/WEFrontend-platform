import api from "./api";

export const getCertificate = async () => {
    const url = `api/v1/certificate/list`;
    const res = await api({ url });
    return res.data;
}