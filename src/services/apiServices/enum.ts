import api from "./api";

export const enumUpadate = (data: { path: number }, UserId: number) => {
  const url = `api/v1/companyPath/update-path/${UserId}`,
    method = "put";

  return api({ url, method, data });
};

export const enumApi = (id: string) => {
  const url = `api/v1/companyPath/get-path/${id}`;
  return api({ url });
};
