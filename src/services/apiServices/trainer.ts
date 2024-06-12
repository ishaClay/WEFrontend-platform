import api from "./api";

export const registerTrainer = (data: any) => {
  const url = `api/v1/trainer/create`;
  return api({ url, data, method: "post" });
};
