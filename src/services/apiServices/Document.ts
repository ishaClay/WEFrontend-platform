import api from "./api";


export const fetchDocument = async ({ page, userId, role, keyword }: { page: number, userId: string, role: number, keyword: string }) => {
    console.log("keyword", userId);

    const url = `api/v1/document/list?page=${page}&limit=10&targetAudience=${role}&role=true&keyword=${keyword}`;
    const res = await api({ url });
    return res.data
}