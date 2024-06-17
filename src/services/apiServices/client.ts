import api from "./api";


export const fetchClientById = async (id: string) => {
    const url = `api/v1/client/get/${id}`;
    const res = await api({ url, method: "get" });
    console.log("res=====>", res.data);

    return res.data;
};
