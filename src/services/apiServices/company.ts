import { Company } from "@/types/Company";
import api from "./api";

export const createCompany = (data: Company) => {
  const url = `api/v1/user/register-company`,
    method = "post";

  return api({ url, method, data });
};

export const updateCompany = (data: Company) => {
  const url = `api/v1/user/update-company`,
    method = "put";
  return api({ url, method, data });
};

export const getOneCompany = (id: string) => {
  const url = `api/v1/company/get/${id}`,
    method = "get";
  return api({ url, method });
};

export const checkOTP = (data: any) => {
  const url = `api/v1/user/check-otp`,
    method = "post";
  return api({ url, method, data });
};

export const getCompanyDetailsById = (company_num: number | undefined) => {
  const url = `api/v1/thirdparty/thirdparty?companyNumber=${company_num}`;
  return api({ url });
};
