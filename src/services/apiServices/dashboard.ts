import api from "./api";


export const getFirstInfirgraphicChart = async ({ userId, clientId }: { userId: string, clientId: string }) => {
    const url = `api/v1/question/get-total-Assessment-scores/${userId}?clientId=${clientId}`;
    const res = await api({ url });
    return res.data
}

export const getSmeDashboardData = async ({ userId }: { userId: string }) => {
    const url = `api/v1/dashboard/compnyData/${userId}`;
    const res = await api({ url });
    return res.data
}

export const getDashbooardSme3 = async ({ userId }: { userId: string }) => {
    const url = `api/v1/dashboard/compnyCourseCount/${userId}`;
    const res = await api({ url });
    return res.data
}

export const getTraineeDashboardData = async ({ userId }: { userId: string }) => {
    const url = `api/v1/dashboard/TrainerDashboardCountData/${userId}`;
    const res = await api({ url });
    return res.data
}