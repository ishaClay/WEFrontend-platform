import { GetCertificate } from "@/types/certificate";
import api from "./api";

export const getCertificate = async () => {
    const url = `api/v1/certificate/list`;
    const res = await api({ url });
    return res.data;
}

export const certificateList=async(id:string): Promise<GetCertificate>=>{
    const url=`api/v1/certificate/getByUser/${id}`
    const res=await api({url});
    return res.data;
}

export const fetchcertificate=async(id:string)=>{
     const url=`api/v1/certificate/get/${id}`
    const res=await api({url});
    return res.data;
}

// export const Updatecertificate=async(data: { id: GetCertificate, item: any })=>{
//     const url=`api/v1/certificate/update/${data?.id}`
//     const method="patch";
//     const res=await api({url,method,data})
//     return res?.data;
// }