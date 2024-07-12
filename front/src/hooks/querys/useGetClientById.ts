import { useQuery } from "@tanstack/react-query"
import { getClientById } from "../../services/endpoints/getClientById"

export const useGetClientById = (id: string) => {
    return useQuery({
        queryKey: ["client-id", id],
        queryFn: () => getClientById(id),
        enabled: !!id
    })
}