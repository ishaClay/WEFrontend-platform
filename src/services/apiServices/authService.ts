import { ResetPasswordType } from "@/types/auth";
import api from "./api";


export const Login = (data: { email: string, password: string }): Promise<any> => {
    const url = `api/v1/user/login`,
        method = "post";

    return api({ url, method, data });
};

export const ResetPasswordApi = (data: { data: ResetPasswordType }): Promise<any> => {
    const url = `api/v1/user/reset-password`;
    const method = "post";
    return api({ url, method, data });
}

export const ResendOtp = async (data: { email: string }): Promise<any> => {
    const url = `api/v1/user/resend`;
    const method = "post";
    const res = await api({ url, method, data });
    return res.data
}