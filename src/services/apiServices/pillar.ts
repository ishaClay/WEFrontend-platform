import { PillerResponse } from "@/types/Pillar";
import { AxiosResponse } from "axios";
import api from "./api";

export const fetchPillarList = () => {
    const url = `api/v1/pillar/list`;
    return api({ url });
};

export const fetchClientwisePillarList = async (id: string): Promise<AxiosResponse<PillerResponse>> => {
    const url = `api/v1/pillar/list?clientId=${id}`;
    const res = await api({ url });
    return res
};

export const fetchMaturityPillar = (clientId: number, userId: number) => {
    const url = `api/v1/pillar/get-maturity-pillar?clientId=${clientId}&userId=${userId}`;
    return api({ url });
};


export const addMeasuresItems = (data: any) => {
    const url = `api/v1/pillar/add-measures-items`;
    return api({ url, data, method: "post" });
};


export const filterMaturityMeasures = (clientId: any, userId: string, maturity: any, pillerId: string) => {
    const url = `api/v1/pillar/filter-maturity?clientId=${clientId}&userId=${userId}&maturity=${maturity}&pillerId=${pillerId}`

    return api({ url });
}


export const getMeasuresItems = (userId: string, pillerId: string) => {
    const url = `api/v1/pillar/get-measures-item-byid?userId=${userId}&pillerId=${pillerId}`

    return api({ url })
}


export const updatePillarCheckbox = (data: any, pillerId: string) => {

    const url = `api/v1/pillar/update-piller-checkbox/${pillerId}`;

    return api({ url, data: { checked: data }, method: "patch" });
}

export const getCheckedMeasures = (userId: string, clientId: string) => {
    const url = `api/v1/pillar/get-measures-items/${userId}&clientId=${clientId}`;
    return api({ url });
}

export const getDataByPillerId = async ({ pillerId, userId, clientId }: { pillerId: number, userId: number, clientId: number }) => {
    const url = `api/v1/question/get-question-assessment-scores?clientId=${clientId}&userId=${userId}&pillarId=${pillerId}`;
    const res = await api({ url });
    return res.data
}