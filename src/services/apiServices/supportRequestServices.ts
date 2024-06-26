import { SubmitPayload } from "@/types/SupportRequest";
import api from "./api";

export const fetchSupportTicketCompany = (id:string) => {    
    const url = `api/v1/support-ticket/getCompany-TrainerCompany?ClientId=${id}`
    return api({ url });
}

export const createSupportTicket = (data:SubmitPayload) => {    
    const url = `api/v1/support-ticket/create`
    const method = "post";
    return api({ url, data, method });
}