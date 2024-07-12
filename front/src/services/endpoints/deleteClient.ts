import { api } from "../api"

export const deleteClient = async (id: string) => {
    const response = await api.delete(`/client/${id}`)
    return response.data
}