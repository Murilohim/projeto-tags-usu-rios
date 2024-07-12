import { useQuery, } from "@tanstack/react-query"
import { getAllClientsWithTags } from "../../services/endpoints/getAllClientsWithTags"

export const useGetAllClients = (page: number, limit: number, sortOrder: string, search: string) => {
    return useQuery({
        queryKey: ["clients", page, limit, sortOrder, search],
        queryFn: () => getAllClientsWithTags({ page, limit, sortOrder, search }),

    })
}