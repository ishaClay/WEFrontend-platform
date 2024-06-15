import { Trainer } from "@/types/Trainer";
import api from "./api";

export const registerTrainer = (data: Trainer) => {
  console.log(data)
  const url = `api/v1/user/register-trainer-company`;
  return api({ url, data, method: "post" });
};
