import api from "./api";


export const fetchDocument = async ({ page, userId, role }: { page: number, userId: string, role: number }) => {
    const url = `api/v1/document/list?page=${page}&limit=10&userId=${userId}&targetAudience=${role}&role=true`;
    const res = await api({ url });
    return res.data
}