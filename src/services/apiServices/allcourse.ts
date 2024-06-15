import api from "./api";

export const fetchAllCourse = (page: number) => {
  const url = `api/v1/course/list?page=${page}&limit=10&keyword=`;

  return api({ url });
};

export const fetchPillar = (id: string) => {
  const url = `api/v1/pillar/list/?clientId=${id}`;
  return api({ url });
};

export const fetchPillarCourse = (id: string) => {
  const url = `api/v1/course/list?page=1&limit=10&keyword=&pillarid=${id}`;
  return api({ url });
};
