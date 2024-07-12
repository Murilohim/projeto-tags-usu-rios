import { api } from "../api"

export const getAllTags = async () => {
    const response = await api.get('/tag')
    return response.data
}