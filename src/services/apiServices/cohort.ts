import api from "./api";

interface ICohortBody {
    timeSlot: {
        name: string;
        publish: number;
        slotStartDate: {
            date: string;
            month: string;
            year: string;
        };
        slotEndDate: {
            date: string;
            month: string;
            year: string;
        };
    }[];
    courseVersion: number;
}

export const createCohort = async (data: ICohortBody) => {
    const url = `api/v1/cohortgroup/create`;
    const method = "post";
    const res = await api({ url, method, data });
    return res.data
}

export const getCohortsByCourse = async (id: number) => {
    const url = `api/v1/cohortgroup/getByCourse?courseVersion=${id}`;
    const method = "get";
    const res = await api({ url, method });
    return res.data
}