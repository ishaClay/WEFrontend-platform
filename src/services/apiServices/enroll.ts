import { enroll, FetchEnrollRequestDataType } from "@/types/enroll";
import api from "./api";

export const fetchEnroll = (data:enroll) => {
  const url = `api/v1/course/enroll`;
  const method = "post";
  return api({ url, method, data });
};

export const fetchEnrollmentAccepted = async (id: string) : Promise<FetchEnrollRequestDataType | any> => {
  const url = `api/v1/course/course-enrollment-Accepted/${id}`;
  const res = await api({ url });
  return res?.data
};
