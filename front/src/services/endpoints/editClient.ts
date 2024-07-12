import { api } from "../api"
import { ClientWithTags } from "./createClientsWithTags"

export const editClient = async (infos: {
    id: string,
    body: ClientWithTags
}) => {
    const { id, body } = infos
    const response = await api.put(`/client/${id}`, body)
    return response.data
}