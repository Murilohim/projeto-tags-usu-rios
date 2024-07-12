import { api } from "../api"

export const createTag = async (tag: { name: string }) => {
    const response = await api.post('/tag', tag)
    return response.data
}