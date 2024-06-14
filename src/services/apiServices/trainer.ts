import api from "./api";

export const registerTrainer = (data: any ,clientId : number) => {
  const url = `api/v1/user/register-trainer-company`;
  return api({ url, data, method: "post" });
};
