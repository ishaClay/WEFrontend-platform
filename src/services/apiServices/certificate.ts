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

export const fetchcertificate=async(id:string)=>{
    const url=`api/v1/certificate/get/${id}`
    const res=await api({url});
    return res.data;
}

export const Updatecertificate = ({data, id}: {data: GetCertificate, id: string}) => {
    const url = `api/v1/certificate/update/${id}`,
    method = "put";
    return api({ url, method, data });
};

export const IssuedCertificateList=async(id:number)=>{
    const url=`api/v1/certificate/get-employee/${id}`
    const res=await api({url});
    return res.data;
}
