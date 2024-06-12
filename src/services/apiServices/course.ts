import api from "./api";

// const url = `api/v1/course/recommended/${id}?page=${page}&limit=10&search=`;
export const fetchCourse = (user: number, client: number, page: number) => {
  // const url = `api/v1/course/recommended?page=${page}&limit=10&search=`;
  const url = `https://weidevapi.clay.in/api/v1/course/recommended?page=${page}&limit=10&search=`;
  const params = {
    user,
    client,
  };

  return api({ url, params });
};
