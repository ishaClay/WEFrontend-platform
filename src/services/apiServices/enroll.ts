import { enroll } from "@/types/enroll";
import api from "./api";

export const fetchEnroll = (data:enroll) => {
  const url = `api/v1/course/enroll`;
  const method = "post";
  return api({ url, method, data });
};
