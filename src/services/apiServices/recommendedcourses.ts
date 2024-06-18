import api from "./api";

export const fetchRecommendedCourses = (
  user: number,
  client: number,
  page: number,
  search: string
) => {
  const url = `https://weidevapi.clay.in/api/v1/course/recommended?page=${page}&limit=10&search=${search}`;
  const params = {
    user,
    client,
  };

  return api({ url, params });
};
