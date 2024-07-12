import { SubmitPayload } from "@/types/SupportRequest";
import api from "./api";

export const fetchSupportTicketCompany = (id: string, role: string) => {
    const url = `api/v1/support-ticket/getCompanyOrTrainerCompany?ClientId=${id}&role=${role}`
    return api({ url });
}

export const createSupportTicket = (data: SubmitPayload) => {
    const url = `api/v1/support-ticket/create`
    const method = "post";
    return api({ url, data, method });
}

export const fetchSupportTicketCount = (userId: string) => {
    const url = `api/v1/support-ticket/count?userId=${userId}`
    return api({ url });
};

export const fetchSupportTicketList = (page: string, limit: string, userId?: number | null, keyword?: string) => {
    const url = `api/v1/support-ticket/list`
    const params: any = { page, limit, userId, keyword }
    return api({ url, params });
};

export const deleteSupportTicket = (id: string) => {
    const url = `api/v1/support-ticket/delete/${id}`,
        method = "delete";
    return api({ url, method, data: {} });
}

export const fetchAssignTo = (id: string) => {
    const url = `api/v1/support-ticket/getCompany-TrainerCompany?ClientId=${id}`
    return api({ url });
}

export const getSingleSupportTicket = (id: string) => {
    const url = `api/v1/support-ticket/get/${id}`
    return api({ url });
}

export const updateSupportTicket = (data: { id: string, item: any }) => {
    const url = `api/v1/support-ticket/update/${data.id}`
    const method = "put";
    return api({ url, data: data?.item, method });
}