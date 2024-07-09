import api from "./api";


export const InviteSingleEmployee = async (data: any) => {
    const url = `api/v1/employee/invitation-employee-course`;
    const res = await api({ url, method: "post", data });
    return res.data
}

export const EmployeeList = async (id: string, status: string) => {
    const url = `api/v1/employee/list?companyId=${id}&limit=1000000000&page=1&keyword&status=${status}`;
    const res = await api({ url });
    return res.data
}

export const assignItemForEmployee = async ({ data, masureId }: { data: { employeeId: string, startDate: Date | undefined, endDate: Date | undefined }, masureId: number }) => {
    const url = `api/v1/pillar/update-measures-items/${masureId}`;
    const res = await api({ url, method: "put", data });
    return res.data
}