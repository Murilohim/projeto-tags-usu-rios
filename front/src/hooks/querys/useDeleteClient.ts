import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteClient } from "../../services/endpoints/deleteClient";
import { errorToast, sucessToast } from "../../constants/toasts";

export const useDeleteClient = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: deleteClient,
        onSuccess(data) {
            queryClient.invalidateQueries({
                queryKey: ["clients"],
            });
            const message = data.message
            sucessToast(`${message || "Cliente deletado com sucesso"}`)
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError(error: any) {
            const message = error.response.data.message
            errorToast(`${message || "Erro ao deletar cliente"}`)
        },
    })
    return mutation;
}