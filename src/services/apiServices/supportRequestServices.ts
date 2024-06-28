import { SubmitPayload } from "@/types/SupportRequest";
import api from "./api";

export const fetchSupportTicketCompany = (id:string, role:string) => {    
    const url = `api/v1/support-ticket/getCompanyOrTrainerCompany?ClientId=${id}&role=${role}`
    return api({ url });
}

export const createSupportTicket = (data:SubmitPayload) => {    
    const url = `api/v1/support-ticket/create`
    const method = "post";
    return api({ url, data, method });
}

export const fetchSupportTicketCount = (userId: string) => {    
    const url = `api/v1/support-ticket/count?userId=${userId}`
    return api({ url });
};

export const fetchSupportTicketList = (page: string, limit: string, userId?: number | null) => {
    const url = `api/v1/support-ticket/list`
    let params: any = { page, limit, userId }
    return api({ url, params });
};