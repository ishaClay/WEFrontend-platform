import api from "./api";

export const fetchEnroll = () => {
  const url = `api/v1/course/enroll`;
  const method = "post";
  return api({ url, method });
};
