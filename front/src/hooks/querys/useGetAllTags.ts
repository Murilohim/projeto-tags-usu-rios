import { useQuery } from "@tanstack/react-query"
import { getAllTags } from "../../services/endpoints/getAllTags"

export const useGetAllTags = () => {
    return useQuery({
        queryKey: ["tag"],
        queryFn: getAllTags,
    })
}