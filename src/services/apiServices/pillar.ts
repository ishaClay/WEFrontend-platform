import { PillerResponse } from "@/types/Pillar";
import { AxiosResponse } from "axios";
import api from "./api";

export const fetchPillarList = () => {
    const url = `api/v1/pillar/list`;
    return api({ url });
};

export const fetchClientwisePillarList = async (
    id: string
): Promise<AxiosResponse<PillerResponse>> => {
    const url = `api/v1/pillar/list?clientId=${id}`;
    const res = await api({ url });
    return res;
};

export const fetchMaturityPillar = async (clientId: number, userId: number) => {
    const url = `api/v1/pillar/get-maturity-pillar?clientId=${clientId}&userId=${userId}`;
    const res = await api({ url });
    return res.data;
};

export const addMeasuresItems = (data: any) => {
    const url = `api/v1/pillar/add-measures-items`;
    return api({ url, data, method: "post" });
};

export const filterMaturityMeasures = async (
    clientId: string,
    userId: string,
    maturity: string,
    pillerId: string
) => {
    const url = `api/v1/pillar/filter-maturity?clientId=${clientId}&userId=${userId}&maturity=${maturity}&pillerId=${pillerId}`;

    const res = await api({ url });
    return res.data
};

export const getMeasuresItems = (userId: string, pillerId: string) => {
    const url = `api/v1/pillar/get-measures-item-byid?userId=${userId}&pillerId=${pillerId}`;

    return api({ url });
};

export const updatePillarCheckbox = ({ data, pillerId }: {
    data: {
        checked: number,
        clientId: number,
        userId: number,
    }, pillerId: number
}) => {
    const url = `api/v1/pillar/update-piller-checkbox/${pillerId}`;

    return api({ url, data, method: "put" });
};

export const getCheckedMeasures = (userId: string, clientId: string) => {
    const url = `api/v1/pillar/get-measures-items/${userId}?clientId=${clientId}`;
    return api({ url });
}

export const getDataByPillerId = async ({ pillerId, userId, clientId }: { pillerId: number, userId: number, clientId: number }) => {
    const url = `api/v1/question/get-question-assessment-scores?clientId=${clientId}&userId=${userId}&pillarId=${pillerId}`;
    const res = await api({ url });
    return res.data
}

export const getPillerWiseProgress = async (clientId: string, userId: string) => {
    const url = `api/v1/question/getPillarWiseProgress?clientId=${clientId}&userId=${userId}`;
    const res = await api({ url });
    return res.data
}

export const pillarLimit = async (compnyId?: string) => {
    const url = `api/v1/trainer-company/getcompny/${compnyId}`;
    const res = await api({ url });
    return res.data
}

export const pillarMaturity = async (data: { courseData: any, id: string, version: string }) => {
    const url = `api/v1/course/update-pillar-maturity/${data?.id}/${data?.version}`;
    const res = await api({ url, data: { courseData: data?.courseData }, method: "put" });
    return res.data
}

export const getActionItembyPiller = async (pillerId: number | null, userID: number) => {
    const url = `api/v1/pillar/get-measures-itemsByPiller/${pillerId}?userId=${userID}`;
    const res = await api({ url });
    return res.data
}

export const getItemHistory = async (id: number) => {
    const url = `api/v1/measurehistory/get-item-measureswise/${id}`;
    const res = await api({ url });
    return res.data
}

export const markComplate = async ({ id, data }: { id: number, data: any }) => {
    const url = `api/v1/pillar/action-item/mark-complete/${id}`;
    const res = await api({ url, method: "put", data });
    return res.data
}

export const deleteMeasuresItems = async (id: number) => {
    const url = `api/v1/pillar/delete-measures-items/${id}`;
    const res = await api({ url, method: "delete" });
    return res.data
}

export const assessmentQuestionScore = async (id: number) => {
    console.log("ididid", id);

    const url = `api/v1/assessmentquestionscore/list/${id}`;
    const res = await api({ url });
    return res.data
}