import api from "./api";
import { EmployeePayload } from "@/types/Invition";

export const getMemberlist = async (page:string,limit:string,userId:number|null,keyword:string) => {
  const url = `api/v1/employee/list`;
   let params:any={page,limit,companyId: userId,keyword}
  const res = await api({ url ,params});
  return res.data;
};


export const createEmployeeInvition = (data:EmployeePayload) => {    
    const url = `api/v1/employee/send-invitation`
    const method = "post";
    return api({ url, data, method });
}