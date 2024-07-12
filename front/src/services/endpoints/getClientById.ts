import { api } from "../api"

export const getClientById = async (id: string) => {
    const response = await api.get(`/client_tag/${id}`)
    return response.data
}