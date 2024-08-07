import api from "./api";

// export const scheduleLiveSession = ({ data, id }: any) => {
//   const url = `api/v1/livesessions/update/${id}`;

//   return api({ url, data, method: "put" });
// };

export const scheduleLiveSession = ({ data, id }: any) => {
  const url = `api/v1/livesessions/liveSessionUpdate/${id}`;

  return api({ url, data, method: "put" });
};

export const scheduleUpdateLiveSession = ({ data, id }: any) => {
  const url = `api/v1/livesessions/updateZoomPortal/${id}`;
  return api({ url, data, method: "put" });
};

export const createLiveSection = async (data: any) => {
  const url = `api/v1/course/module/section/create`,
    method = "post";

  const res = await api({ url, method, data: [data] });
  return res;
};

export const getAllLiveSession = () => {
  const url = `api/v1/livesessions/list`;
  return api({ url });
};

export const getLiveSession = (id: string) => {
  const url = `api/v1/course/get/${id}`;
  return api({ url });
};

export const deleteLiveSessions = (id: string) => {
  const url = `api/v1/livesessions/liveSessionDelete/${id}`,
    method = "delete";

  return api({ url, method, data: {} });
};

export const getLiveSessionById = (id: string) => {
    const url = `api/v1/livesessions/get/${id}`;
    return api({ url });
  };