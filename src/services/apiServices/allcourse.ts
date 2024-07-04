import api from "./api";

export const fetchAllCourse = (pillerId: string, search: string) => {
  const url = `api/v1/course/list?keyword=${search}&pillarid=${pillerId}`;

  return api({ url });
};

export const fetchPillar = (id: string) => {
  const url = `api/v1/pillar/list/?clientId=${id}`;
  return api({ url });
};

export const fetchPillarCourse = (id: number) => {
  const url = `api/v1/course/list?page=1&limit=10&keyword=&pillarid=${id}`;
  return api({ url });
};

export const courseStatusUpdate = async (id: number) => {
  const url = `api/v1/course/status/update/${id}`;
  const res = await api({ url, method: "post" });
  return res.data
}