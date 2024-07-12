import { api } from "../api";

export interface ClientWithTags {
    name: string | string[]
    email: string | string[]
    tagIds: string | string[]
}

export const createClientsWithTags = async (client: ClientWithTags) => {
    const response = await api.post("/client/client-tag-relation", client);
    return response
}