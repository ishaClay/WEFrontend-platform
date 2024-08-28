import api from "./api"


export const getOneFeedback = async (courseId: string, id: string) => {
    const url = `api/v1/feedback/get/${courseId}/${id}`
    const res = await api({ url })
    return res.data
}

export const updateFeedback = async ({ id, data }: { id: number, data: any }) => {
    const url = `api/v1/feedback/update/${id}`
    const res = await api({ url, method: "put", data })
    return res.data
}