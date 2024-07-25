import { GetCertificate } from "@/types/certificate";
import api from "./api";

export const getCertificate = async () => {
  const url = `api/v1/certificate/list`;
  const res = await api({ url });
  return res.data;
};

export const certificateList = async (id: string): Promise<GetCertificate> => {
  const url = `api/v1/certificate/getByUser/${id}`;
  const res = await api({ url });
  return res.data;
};

export const getCertifications = async (id: string) => {
  const url = `api/v1/certificate/getByEmployee/${id}`;
  const res = await api({ url });
  return res.data;
};

export const fetchcertificate = async (id: string) => {
  const url = `api/v1/certificate/get/${id}`;
  const res = await api({ url });
  return res.data;
};

// export const Updatecertificate=async(data: { id: GetCertificate, item: any })=>{
//     const url=`api/v1/certificate/update/${data?.id}`
//     const method="patch";
//     const res=await api({url,method,data})
//     return res?.data;
// }

export const IssuedCertificateList = async ({ id, page, keyword }: { id: number, page: number, keyword: string }) => {
  const url = `api/v1/certificate/get-employee/${id}?page=${page}&limit=10&keyword=${keyword}`;
  const res = await api({ url });
  return res.data;
}
