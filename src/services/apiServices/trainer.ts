import { Trainer } from "@/types/Trainer";
import api from "./api";

export const registerTrainer = (data: Trainer) => {
  console.log(data)
  const url = `api/v1/user/register-trainer-company`;
  return api({ url, data, method: "post" });
};

export const getTrainer = async ({ id, keyword, limit, page }: { id: string, keyword: string, limit: number, page: number }) => {
  const url = `api/v1/trainer/list?trainerCompanyId=${id}&keyword=${keyword}&limit=${limit}&page=${page}`;
  const response = await api({ url });
  return response.data;
}

export const getTrainerById = async ({ id }: { id: string }) => {
  const url = `api/v1/trainer/get/${id}`;
  const response = await api({ url });
  return response.data;
}