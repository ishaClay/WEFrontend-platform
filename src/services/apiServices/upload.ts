import api from "./api";


export const uploadImage = async (formData: FormData) => {
    const url = "upload/images";
    const method = "post";
    const response = await api({ url, method, data: formData, isFormData: true });
    return response;
}