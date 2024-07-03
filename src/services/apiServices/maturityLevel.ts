import { MaturityLevelResponse } from "@/types/MaturityLavel";
import api from "./api";



export const fetchmaturityLevel = () => {
    const url = `api/v1/maturity-level/list`;
    return api({ url });
};

export const fetchClientwiseMaturityLevel = async (id: string): Promise<MaturityLevelResponse> => {
    const url = `api/v1/maturity-level/list?clientId=${id}`;
    const res = await api({ url });
    return res?.data;
};