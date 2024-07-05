import api from "./api";


export const InviteSingleEmployee = async (data: any) => {
    const url = `api/v1/employee/invitation-employee-course`;
    const res = await api({ url, method: "post", data });
    return res.data
}