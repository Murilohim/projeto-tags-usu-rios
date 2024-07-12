import { api } from "../api";

export const getAllClientsWithTags = async (pagination: {
    page: number,
    limit: number,
    sortOrder: string
    search: string
}) => {
    const { page, limit, sortOrder, search } = pagination;
    const response = await api.get("/client_tag", {
        params: {
            page,
            limit,
            sortOrder,
            search
        }
    }
    );
    return response.data;
}